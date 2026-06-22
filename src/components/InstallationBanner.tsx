'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stockImages } from '@/lib/stockImages';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InstallationBanner({
  namespace = 'services.installation',
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);
  const containerRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const panels = container.querySelectorAll<HTMLElement>('[data-panel]');
    gsap.set(panels, { scale: 1, transformOrigin: 'center' });
    gsap.set(kickerRef.current, { opacity: 0, y: 10 });
    gsap.set(titleRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ scrollTrigger: { trigger: container, start: 'top 75%' } });
    tl.to(panels, {
      scale: 0,
      duration: 0.9,
      ease: 'power3.inOut',
      stagger: { each: 0.04, from: 'random' },
    })
      .to(kickerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.5')
      .to(titleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[64vh] min-h-[440px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stockImages.installation14}
        alt={t('title')}
        className="h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(22,35,28,0.92), rgba(22,35,28,0.15) 60%)',
        }}
      />
      <div className="absolute left-6 top-1/2 max-w-2xl -translate-y-1/2 sm:left-[6vw]">
        <p
          ref={kickerRef}
          className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-600"
        >
          {t('kicker')}
        </p>
        <h2
          ref={titleRef}
          className="mt-4 whitespace-pre-line font-display text-4xl font-extrabold leading-[1.05] text-linen-50 drop-shadow-lg sm:text-6xl lg:text-7xl"
        >
          {t('statement')}
        </h2>
      </div>
      <div className="absolute inset-0 z-40 grid grid-cols-6 grid-rows-3" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} data-panel className="scale-0 bg-forest-950" />
        ))}
      </div>
    </section>
  );
}
