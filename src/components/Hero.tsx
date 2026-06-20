'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Link } from '@/i18n/navigation';
import TopoPattern from './TopoPattern';
import { stockImages } from '@/lib/stockImages';

export default function Hero() {
  const t = useTranslations('home.hero');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !titleRef.current ||
      !paragraphRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const title = new SplitType(titleRef.current, { types: 'lines,words' });
    const paragraph = new SplitType(paragraphRef.current, { types: 'lines,words' });

    gsap.set(title.words, { transformOrigin: '50% 100%' });

    const tl = gsap.timeline();
    tl.from(title.words, {
      scale: 5,
      yPercent: 60,
      rotationZ: () => gsap.utils.random(-30, 30),
      opacity: 0,
      filter: 'blur(24px)',
      ease: 'back.out(1.4)',
      duration: 1.4,
      stagger: { each: 0.09, from: 'random' },
    })
      .from(
        paragraph.words,
        {
          yPercent: 120,
          ease: 'circ.out',
          duration: 1,
          stagger: 0.02,
        },
        '<0.6',
      )
      .from(
        buttonsRef.current,
        {
          x: -20,
          opacity: 0,
          ease: 'power2.out',
          duration: 0.8,
        },
        '<0.3',
      );

    return () => {
      tl.kill();
      title.revert();
      paragraph.revert();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-forest-950 px-6 pb-28 pt-6 sm:px-[6vw]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stockImages.heroBg}
        alt={t('imageAlt')}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/85 to-forest-950/60" />
      <span className="absolute right-0 top-0 h-32 w-2.5 bg-amber-600" aria-hidden="true" />
      <TopoPattern className="right-0 top-0 h-auto w-[60%] text-amber-600 opacity-40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-100">Skog Mộc</p>
        <h1
          ref={titleRef}
          className="mt-10 max-w-4xl font-display text-[clamp(2.75rem,9vw,6.5rem)] font-extrabold leading-[0.98] tracking-tight text-linen-50"
        >
          {t('title')}
        </h1>
        <p
          ref={paragraphRef}
          className="hero-split mt-7 max-w-xl text-base leading-relaxed text-linen-50/70"
        >
          {t('subtitle')}
        </p>
        <div ref={buttonsRef} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-amber-600 px-7 py-3 text-sm font-medium text-linen-50 hover:bg-amber-700"
          >
            {t('cta')}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border-2 border-linen-50/60 px-7 py-3 text-sm font-medium text-linen-50 hover:border-amber-600 hover:text-amber-600"
          >
            {t('secondaryCta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
