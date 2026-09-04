'use client';

import dynamic from 'next/dynamic';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

const ContactSection = dynamic(
  () => import('./ContactSection'),
  {
    ssr: false,
  },
);

export default function DeferredContactSection() {
  const placeholderRef =
    useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] =
    useState(false);

  useEffect(() => {
    const placeholder = placeholderRef.current;

    if (!placeholder) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '1000px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(placeholder);

    return () => observer.disconnect();
  }, []);

  if (shouldRender) {
    return <ContactSection />;
  }

  return (
    <div
      id="contato"
      ref={placeholderRef}
      className="deferred-contact-placeholder section-dark"
      aria-hidden="true"
    />
  );
}
