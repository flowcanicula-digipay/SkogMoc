'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { stockImages } from '@/lib/stockImages';
import TopoPattern from './TopoPattern';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioHero() {
  const t = useTranslations('portfolio.hero');
  const tNav = useTranslations('common.nav');
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
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
    tl.from(imageRef.current, { scale: 1.2, opacity: 0, duration: 1.8, ease: 'power2.out' })
      .from(
        accentRef.current,
        { scaleY: 0, transformOrigin: 'top', duration: 0.9, ease: 'power3.out' },
        '<0.2',
      )
      .from(kickerRef.current, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '<0.1')
      .from(
        title.words,
        {
          scale: 5,
          yPercent: 60,
          rotationZ: () => gsap.utils.random(-30, 30),
          opacity: 0,
          filter: 'blur(24px)',
          ease: 'back.out(1.4)',
          duration: 1.4,
          stagger: { each: 0.09, from: 'random' },
        },
        '<0.2',
      )
      .from(paragraph.words, { yPercent: 120, ease: 'circ.out', duration: 1, stagger: 0.02 }, '<0.6')
      .from(buttonsRef.current, { x: -20, opacity: 0, ease: 'power2.out', duration: 0.8 }, '<0.3');

    const parallax = gsap.to(imageRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });

    return () => {
      tl.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
      title.revert();
      paragraph.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[64vh] items-end overflow-hidden bg-forest-950 px-6 pb-14 pt-28 sm:min-h-[72vh] sm:px-[6vw] sm:pb-16"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={stockImages.installation14}
        alt={t('imageAlt')}
        className="absolute inset-0 h-full w-full scale-110 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/35 to-forest-950/10" />
      <span ref={accentRef} className="absolute right-0 top-0 h-32 w-2.5 bg-amber-600" aria-hidden="true" />
      <TopoPattern className="right-0 top-0 h-auto w-[55%] text-amber-600 opacity-30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p
          ref={kickerRef}
          className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-600"
        >
          {tNav('portfolio')}
        </p>
        <h1
          ref={titleRef}
          className="portfolio-hero-split mt-5 max-w-3xl font-display text-[clamp(2.25rem,7.2vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-linen-50"
        >
          {t('title')}
        </h1>
        <p
          ref={paragraphRef}
          className="portfolio-hero-split mt-6 max-w-xl text-base leading-relaxed text-linen-50/70"
        >
          {t('subtitle')}
        </p>
        <div ref={buttonsRef} className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            className="group flex items-center gap-3 rounded-full bg-amber-600 py-1.5 pl-6 pr-1.5 text-sm font-bold text-linen-50 transition-colors hover:bg-amber-700"
          >
            {t('cta')}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950 text-linen-50 transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </Link>
          <Link
            href="/services"
            className="border-b border-linen-50/50 pb-1 text-sm font-medium text-linen-50 hover:border-linen-50 hover:text-white"
          >
            {t('secondaryCta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
