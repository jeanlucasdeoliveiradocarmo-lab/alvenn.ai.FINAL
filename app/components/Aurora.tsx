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

const V = `#version 300 es
in vec2 position;
void main(){
  gl_Position=vec4(position,0.,1.);
}`;

const F = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 c0;
uniform vec3 c1;
uniform vec3 c2;
out vec4 fragColor;
void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  float wave=.48+.12*sin(uv.x*7.+uTime)+.07*sin(uv.x*13.-uTime*.7);
  float a=smoothstep(wave-.28,wave+.08,uv.y)*smoothstep(1.,.35,uv.y);
  vec3 c=mix(c0,c1,uv.x);
  c=mix(c,c2,.5+.5*sin(uv.x*5.+uTime));
  fragColor=vec4(c*a,a);
}`;

const DEFAULT_COLOR_STOPS = [
  '#01061b',
  '#0b42d2',
  '#55aaff',
];

type AuroraProps = {
  colorStops?: string[];
  speed?: number;
  blend?: number;
  amplitude?: number;
};

export default function Aurora({
  colorStops = DEFAULT_COLOR_STOPS,
  speed = 0.5,
}: AuroraProps) {
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

    const colors = colorStops.map(
      (color) => new Color(color),
    );

    const program = new Program(gl, {
      vertex: V,
      fragment: F,
      uniforms: {
        uTime: {
          value: 0,
        },
        uResolution: {
          value: [1, 1],
        },
        c0: {
          value: colors[0],
        },
        c1: {
          value: colors[1],
        },
        c2: {
          value: colors[2],
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

      program.uniforms.uResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ];
    };

    resize();

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(el);

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

      program.uniforms.uTime.value =
        elapsedTime * speed;

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

      if (gl.canvas.parentNode === el) {
        el.removeChild(gl.canvas);
      }

      gl
        .getExtension('WEBGL_lose_context')
        ?.loseContext();
    };
  }, [colorStops, speed]);

  return (
    <div
      ref={containerRef}
      className="webgl-container"
    />
  );
}
