"use client";

import {
  useEffect,
  useRef,
} from 'react';

import {
  Color,
  Mesh,
  Program,
  Renderer,
  Triangle,
} from 'ogl';

import './webgl.css';

const V = `attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main(){
  vUv=uv;
  gl_Position=vec4(position,0.,1.);
}`;

const F = `precision highp float;
varying vec2 vUv;
uniform float time;
uniform vec2 mouse;
uniform vec3 ca;
uniform vec3 cb;
uniform float count;
float hash(vec2 p){
  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);
}
void main(){
  float stripe=fract(vUv.x*count);
  float edge=smoothstep(.05,.55,stripe);
  float spot=smoothstep(.65,0.,distance(vUv,mouse));
  vec3 grad=mix(ca,cb,vUv.x);
  vec3 col=grad*(.15+edge*.65+spot*.7);
  col+=(hash(gl_FragCoord.xy+time)-.5)*.05;
  gl_FragColor=vec4(col,1.);
}`;

const DEFAULT_GRADIENT_COLORS = [
  '#02030a',
  '#5ba9ff',
];

type GradientBlindsProps = {
  gradientColors?: string[];
  blindCount?: number;
};

export default function GradientBlinds({
  gradientColors =
    DEFAULT_GRADIENT_COLORS,
  blindCount = 10,
}: GradientBlindsProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el =
      containerRef.current as HTMLDivElement | null;

    if (!el) {
      return;
    }

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(
        window.devicePixelRatio,
        1.25,
      ),
    });

    const gl = renderer.gl;

    el.appendChild(gl.canvas);

    const geometry = new Triangle(gl);

    const firstColor =
      gradientColors[0] ?? '#02030a';

    const lastColor =
      gradientColors.at(-1) ?? '#5ba9ff';

    const program = new Program(gl, {
      vertex: V,
      fragment: F,
      uniforms: {
        time: {
          value: 0,
        },
        mouse: {
          value: [0.55, 0.5],
        },
        ca: {
          value: new Color(firstColor),
        },
        cb: {
          value: new Color(lastColor),
        },
        count: {
          value: blindCount,
        },
      },
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    const resize = () => {
      renderer.setSize(
        el.clientWidth,
        el.clientHeight,
      );
    };

    resize();

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(el);

    const move = (
      event: PointerEvent,
    ) => {
      const rect =
        el.getBoundingClientRect();

      program.uniforms.mouse.value = [
        (event.clientX - rect.left) /
          rect.width,
        1 -
          (event.clientY - rect.top) /
            rect.height,
      ];
    };

    el.addEventListener(
      'pointermove',
      move,
    );

    let animationFrameId:
      | number
      | null = null;

    let isIntersecting = false;
    let elapsedTime = 0;

    let previousFrameTime:
      | number
      | null = null;

    let previousRenderTime = 0;

    const frameInterval = 1000 / 30;

    const loop = (time: number) => {
      animationFrameId = null;

      if (isIntersecting !== true) {
        return;
      }

      if (
        time - previousRenderTime <
        frameInterval
      ) {
        animationFrameId =
          requestAnimationFrame(loop);

        return;
      }

      previousRenderTime = time;

      if (previousFrameTime !== null) {
        elapsedTime +=
          (time - previousFrameTime) *
          0.001;
      }

      previousFrameTime = time;

      program.uniforms.time.value =
        elapsedTime;

      renderer.render({
        scene: mesh,
      });

      if (isIntersecting === true) {
        animationFrameId =
          requestAnimationFrame(loop);
      }
    };

    const startAnimation = () => {
      if (
        isIntersecting === true &&
        animationFrameId === null
      ) {
        previousFrameTime = null;

        animationFrameId =
          requestAnimationFrame(loop);
      }
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(
          animationFrameId,
        );

        animationFrameId = null;
      }

      previousFrameTime = null;
      previousRenderTime = 0;
    };

    const intersectionObserver =
      new IntersectionObserver(
        ([entry]) => {
          isIntersecting =
            entry?.isIntersecting === true;

          if (isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        },
        {
          threshold: 0.01,
        },
      );

    intersectionObserver.observe(el);

    return () => {
      intersectionObserver.disconnect();
      stopAnimation();
      resizeObserver.disconnect();

      el.removeEventListener(
        'pointermove',
        move,
      );

      if (gl.canvas.parentNode === el) {
        el.removeChild(gl.canvas);
      }

      gl
        .getExtension('WEBGL_lose_context')
        ?.loseContext();
    };
  }, [gradientColors, blindCount]);

  return (
    <div
      ref={containerRef}
      className="webgl-container"
    />
  );
}
