"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
} from 'react';

import {
  Color,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

import './ColorBends.css';

const MAX_COLORS = 8;
const DEFAULT_COLORS: string[] = [];

const fragmentShader = `#define MAX_COLORS 8
uniform vec2 uCanvas;uniform float uTime,uSpeed;uniform vec2 uRot;uniform int uColorCount;uniform vec3 uColors[MAX_COLORS];uniform int uTransparent;uniform float uScale,uFrequency,uWarpStrength;uniform vec2 uPointer;uniform float uMouseInfluence,uParallax,uNoise;uniform int uIterations;uniform float uIntensity,uBandWidth;varying vec2 vUv;
void main(){float t=uTime*uSpeed;vec2 p=vUv*2.-1.;p+=uPointer*uParallax*.1;vec2 rp=vec2(p.x*uRot.x-p.y*uRot.y,p.x*uRot.y+p.y*uRot.x);vec2 q=vec2(rp.x*(uCanvas.x/uCanvas.y),rp.y);q/=max(uScale,.0001);q/=.5+.2*dot(q,q);q+=.2*cos(t)-7.56;q+=(uPointer-rp)*uMouseInfluence*.2;for(int j=0;j<5;j++){if(j>=uIterations-1)break;vec2 rr=sin(1.5*(q.yx*uFrequency)+2.*cos(q*uFrequency));q+=(rr-q)*.15;}vec3 col=vec3(0);float a=1.;if(uColorCount>0){vec2 s=q;vec3 sumCol=vec3(0);float cover=0.;for(int i=0;i<MAX_COLORS;++i){if(i>=uColorCount)break;s-=.01;vec2 r=sin(1.5*(s.yx*uFrequency)+2.*cos(s*uFrequency));float m0=length(r+sin(5.*r.y*uFrequency-3.*t+float(i))/4.);float k=clamp(uWarpStrength,0.,1.);float km=pow(k,.3);float gain=1.+max(uWarpStrength-1.,0.);vec2 warped=s+(r-s)*k*gain;float m1=length(warped+sin(5.*warped.y*uFrequency-3.*t+float(i))/4.);float m=mix(m0,m1,km);float w=1.-exp(-uBandWidth/exp(uBandWidth*m));sumCol+=uColors[i]*w;cover=max(cover,w);}col=clamp(sumCol,0.,1.);a=uTransparent>0?cover:1.;}else{vec2 s=q;for(int k=0;k<3;++k){s-=.01;vec2 r=sin(1.5*(s.yx*uFrequency)+2.*cos(s*uFrequency));float m0=length(r+sin(5.*r.y*uFrequency-3.*t+float(k))/4.);float kb=clamp(uWarpStrength,0.,1.);float km=pow(kb,.3);float gain=1.+max(uWarpStrength-1.,0.);vec2 warped=s+(r-s)*kb*gain;float m1=length(warped+sin(5.*warped.y*uFrequency-3.*t+float(k))/4.);col[k]=1.-exp(-uBandWidth/exp(uBandWidth*mix(m0,m1,km)));}a=uTransparent>0?max(max(col.r,col.g),col.b):1.;}col*=uIntensity;if(uNoise>.0001){float n=fract(sin(dot(gl_FragCoord.xy+vec2(uTime),vec2(12.9898,78.233)))*43758.5453123);col+=(n-.5)*uNoise;col=clamp(col,0.,1.);}vec3 rgb=uTransparent>0?col*a:col;gl_FragColor=vec4(rgb,a);}`;

const vertexShader = `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.);}`;

type ColorBendsProps = {
  className?: string;
  style?: CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
};

export default function ColorBends({
  className = '',
  style,
  rotation = 90,
  speed = 0.2,
  colors = DEFAULT_COLORS,
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.15,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rotationRef = useRef<number>(rotation);
  const autoRotateRef = useRef<number>(autoRotate);
  const pointerTargetRef = useRef<Vector2>(new Vector2());
  const pointerCurrentRef = useRef<Vector2>(new Vector2());

  useEffect(() => {
    const el = containerRef.current as HTMLDivElement | null;

    if (!el) {
      return;
    }

    const scene = new Scene();
    const camera = new OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0,
      1,
    );
    const geometry = new PlaneGeometry(2, 2);

    const colorValues = Array.from(
      { length: MAX_COLORS },
      () => new Vector3(),
    );

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uCanvas: {
          value: new Vector2(1, 1),
        },
        uTime: {
          value: 0,
        },
        uSpeed: {
          value: speed,
        },
        uRot: {
          value: new Vector2(1, 0),
        },
        uColorCount: {
          value: 0,
        },
        uColors: {
          value: colorValues,
        },
        uTransparent: {
          value: transparent ? 1 : 0,
        },
        uScale: {
          value: scale,
        },
        uFrequency: {
          value: frequency,
        },
        uWarpStrength: {
          value: warpStrength,
        },
        uPointer: {
          value: new Vector2(),
        },
        uMouseInfluence: {
          value: mouseInfluence,
        },
        uParallax: {
          value: parallax,
        },
        uNoise: {
          value: noise,
        },
        uIterations: {
          value: iterations,
        },
        uIntensity: {
          value: intensity,
        },
        uBandWidth: {
          value: bandWidth,
        },
      },
      premultipliedAlpha: true,
      transparent: true,
    });

    materialRef.current = material;

    scene.add(new Mesh(geometry, material));

    const renderer = new WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true,
    });

    rendererRef.current = renderer;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0, transparent ? 0 : 1);

    Object.assign(renderer.domElement.style, {
      width: '100%',
      height: '100%',
      display: 'block',
    });

    el.appendChild(renderer.domElement);

    const resize = () => {
      const width = el.clientWidth || 1;
      const height = el.clientHeight || 1;

      const isSmallScreen = window.matchMedia(
        '(max-width: 768px)',
      ).matches;

      const maximumDpr = isSmallScreen ? 1 : 1.25;

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          maximumDpr,
        ),
      );

      renderer.setSize(width, height, false);

      material.uniforms.uCanvas.value.set(
        width,
        height,
      );
    };

    resize();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver(resize);
      resizeObserverRef.current.observe(el);
    } else {
      window.addEventListener('resize', resize);
    }

    let isIntersecting = false;
    let elapsedTime = 0;
    let previousFrameTime: number | null = null;
    let previousRenderTime = 0;

    const isSmallScreen = window.matchMedia(
      '(max-width: 768px)',
    ).matches;

    const frameInterval =
      1000 / (isSmallScreen ? 24 : 30);

    const canRender = () =>
      isIntersecting &&
      document.visibilityState === 'visible';

    const loop = (time: number) => {
      animationFrameRef.current = null;

      if (!canRender()) {
        return;
      }

      if (
        time - previousRenderTime <
        frameInterval
      ) {
        animationFrameRef.current =
          requestAnimationFrame(loop);

        return;
      }

      previousRenderTime = time;

      const deltaTime =
        previousFrameTime === null
          ? 0
          : (time - previousFrameTime) * 0.001;

      previousFrameTime = time;
      elapsedTime += deltaTime;

      material.uniforms.uTime.value = elapsedTime;

      const radians =
        (((rotationRef.current % 360) +
          autoRotateRef.current * elapsedTime) *
          Math.PI) /
        180;

      material.uniforms.uRot.value.set(
        Math.cos(radians),
        Math.sin(radians),
      );

      pointerCurrentRef.current.lerp(
        pointerTargetRef.current,
        Math.min(1, deltaTime * 8),
      );

      material.uniforms.uPointer.value.copy(
        pointerCurrentRef.current,
      );

      renderer.render(scene, camera);

      if (canRender()) {
        animationFrameRef.current =
          requestAnimationFrame(loop);
      }
    };

    const startAnimation = () => {
      if (
        canRender() &&
        animationFrameRef.current === null
      ) {
        previousFrameTime = null;
        animationFrameRef.current =
          requestAnimationFrame(loop);
      }
    };

    const stopAnimation = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current = null;
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

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === 'visible' &&
        isIntersecting
      ) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    );

    return () => {
      intersectionObserver.disconnect();

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      );

      stopAnimation();

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener('resize', resize);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }

      materialRef.current = null;
      rendererRef.current = null;
    };
  }, [
    bandWidth,
    frequency,
    intensity,
    iterations,
    mouseInfluence,
    noise,
    parallax,
    scale,
    speed,
    transparent,
    warpStrength,
  ]);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;

    if (!material) {
      return;
    }

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;

    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value =
      mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;
    material.uniforms.uIterations.value = iterations;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uBandWidth.value = bandWidth;

    const parsedColors = colors
      .filter(Boolean)
      .slice(0, MAX_COLORS)
      .map((color) => new Color(color));

    for (
      let index = 0;
      index < MAX_COLORS;
      index += 1
    ) {
      const color = parsedColors[index];

      if (color) {
        material.uniforms.uColors.value[index].set(
          color.r,
          color.g,
          color.b,
        );
      } else {
        material.uniforms.uColors.value[index].set(
          0,
          0,
          0,
        );
      }
    }

    material.uniforms.uColorCount.value =
      parsedColors.length;

    material.uniforms.uTransparent.value =
      transparent ? 1 : 0;

    if (renderer) {
      renderer.setClearColor(
        0,
        transparent ? 0 : 1,
      );
    }
  }, [
    rotation,
    autoRotate,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    iterations,
    intensity,
    bandWidth,
    colors,
    transparent,
  ]);

  useEffect(() => {
    const el =
      containerRef.current as HTMLDivElement | null;

    if (!el) {
      return;
    }

    const move = (event: PointerEvent) => {
      const bounds =
        el.getBoundingClientRect();

      pointerTargetRef.current.set(
        ((event.clientX - bounds.left) /
          (bounds.width || 1)) *
          2 -
          1,
        -(
          ((event.clientY - bounds.top) /
            (bounds.height || 1)) *
            2 -
          1
        ),
      );
    };

    el.addEventListener(
      'pointermove',
      move,
      {
        passive: true,
      },
    );

    return () =>
      el.removeEventListener(
        'pointermove',
        move,
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className={`color-bends-container ${className}`}
      style={style}
    />
  );
}
