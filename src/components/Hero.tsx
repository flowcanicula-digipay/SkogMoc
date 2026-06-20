'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Link } from '@/i18n/navigation';

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

    const tl = gsap.timeline();
    tl.from(title.words, {
      yPercent: 120,
      ease: 'circ.out',
      duration: 1,
      stagger: 0.05,
    })
      .from(
        paragraph.words,
        {
          yPercent: 120,
          ease: 'circ.out',
          duration: 1,
          stagger: 0.02,
        },
        '<0.3',
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
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-forest-950">
      <Image
        src="/assets/images/hero/hero-bg.svg"
        alt={t('imageAlt')}
        fill
        priority
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-100">Skog Mộc</p>
        <h1
          ref={titleRef}
          className="hero-split mt-6 max-w-3xl font-display text-4xl leading-tight text-linen-50 sm:text-6xl"
        >
          {t('title')}
        </h1>
        <p
          ref={paragraphRef}
          className="hero-split mt-6 max-w-xl text-base leading-relaxed text-linen-50/80"
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
