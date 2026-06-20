'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImageBanner({
  image,
  alt,
  title,
}: {
  image: string;
  alt: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const panels = container.querySelectorAll<HTMLElement>('[data-panel]');
    gsap.set(panels, { scale: 1, transformOrigin: 'center' });
    gsap.set(titleRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
      },
    });
    tl.to(panels, {
      scale: 0,
      duration: 0.9,
      ease: 'power3.inOut',
      stagger: { each: 0.04, from: 'random' },
    }).to(titleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[70vh] min-h-[420px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} className="h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(22,35,28,0.9), rgba(22,35,28,0) 43%)',
        }}
      />
      <h2
        ref={titleRef}
        className="absolute left-6 top-1/2 max-w-2xl -translate-y-1/2 whitespace-pre-line font-display text-4xl font-extrabold leading-[1.05] text-linen-50 drop-shadow-lg sm:left-[6vw] sm:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      <div className="absolute inset-0 z-40 grid grid-cols-6 grid-rows-3" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} data-panel className="scale-0 bg-forest-950" />
        ))}
      </div>
    </div>
  );
}
