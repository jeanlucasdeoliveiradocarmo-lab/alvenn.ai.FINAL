'use client';

import dynamic from 'next/dynamic';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

const ColorBends = dynamic(
  () => import('./ColorBends'),
  {
    ssr: false,
  },
);

const Aurora = dynamic(
  () => import('./Aurora'),
  {
    ssr: false,
  },
);

const GradientBlinds = dynamic(
  () => import('./GradientBlinds'),
  {
    ssr: false,
  },
);

type WebGLVariant =
  | 'color-bends'
  | 'aurora'
  | 'gradient-blinds';

type DeferredWebGLProps = {
  variant: WebGLVariant;
};

type NavigatorWithPerformanceHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

function canRunWebGL() {
  const navigatorWithHints =
    navigator as NavigatorWithPerformanceHints;

  if (
    window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  ) {
    return false;
  }

  if (navigatorWithHints.connection?.saveData) {
    return false;
  }

  if (
    navigatorWithHints.deviceMemory &&
    navigatorWithHints.deviceMemory <= 4
  ) {
    return false;
  }

  if (
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4
  ) {
    return false;
  }

  return true;
}

export default function DeferredWebGL({
  variant,
}: DeferredWebGLProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] =
    useState(false);

  useEffect(() => {
    const host = hostRef.current;

    if (!host || !canRunWebGL()) {
      return;
    }

    let delayId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        observer.disconnect();

        delayId = window.setTimeout(
          () => {
            setShouldRender(true);
          },
          variant === 'color-bends' ? 1200 : 150,
        );
      },
      {
        rootMargin:
          variant === 'color-bends'
            ? '0px'
            : '500px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(host);

    return () => {
      observer.disconnect();

      if (delayId !== null) {
        window.clearTimeout(delayId);
      }
    };
  }, [variant]);

  return (
    <div
      ref={hostRef}
      className="deferred-webgl-host"
      aria-hidden="true"
    >
      {shouldRender &&
      variant === 'color-bends' ? (
        <ColorBends
          colors={[
            '#ff5c7a',
            '#8a5cff',
            '#00ffd1',
          ]}
          rotation={46}
          speed={0.6}
          scale={0.5}
          frequency={0.9}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
        />
      ) : null}

      {shouldRender && variant === 'aurora' ? (
        <Aurora
          colorStops={[
            '#01061b',
            '#0b42d2',
            '#55aaff',
          ]}
          blend={0.55}
          amplitude={1.2}
          speed={0.55}
        />
      ) : null}

      {shouldRender &&
      variant === 'gradient-blinds' ? (
        <GradientBlinds
          gradientColors={[
            '#02030a',
            '#0638ba',
            '#5ba9ff',
          ]}
          blindCount={10}
        />
      ) : null}
    </div>
  );
}
