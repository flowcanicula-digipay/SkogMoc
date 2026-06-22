'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { stockImages } from '@/lib/stockImages';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Small gold dust motes drifting around the hero — purely decorative, sized
// and placed by hand rather than randomly generated so they stay readable
// against the dark backdrop instead of clustering.
const SPARKLES = [
  { left: '10%', top: '20%', size: 5, delay: '0s' },
  { left: '90%', top: '16%', size: 3, delay: '0.5s' },
  { left: '16%', top: '76%', size: 4, delay: '1s' },
  { left: '88%', top: '70%', size: 6, delay: '0.2s' },
  { left: '50%', top: '14%', size: 3, delay: '1.5s' },
  { left: '94%', top: '48%', size: 4, delay: '0.8s' },
] as const;

export default function ProfessionalsHero() {
  const t = useTranslations('professionals.hero');
  const tNav = useTranslations('common.nav');
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLSpanElement>(null);

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

    // background-clip: text needs actual text content on the element it's
    // applied to — SplitType moves the title's text into nested word
    // spans, so the shimmer class goes on those words, not the <h1> itself
    // (see ContactHero.tsx for the bug this avoids).
    title.words?.forEach((word) => word.classList.add('gold-shimmer-text'));

    gsap.set(title.words, { transformOrigin: '50% 100%' });

    const tl = gsap.timeline();
    tl.from(imageRef.current, { scale: 1.18, opacity: 0, duration: 1.8, ease: 'power2.out' })
      .from(
        accentRef.current,
        { scaleY: 0, transformOrigin: 'top', duration: 0.9, ease: 'power3.out' },
        '<0.2',
      )
      .from(kickerRef.current, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '<0.1')
      .from(
        title.words,
        {
          scale: 4.5,
          yPercent: 60,
          rotationZ: () => gsap.utils.random(-24, 24),
          opacity: 0,
          filter: 'blur(20px)',
          ease: 'back.out(1.4)',
          duration: 1.3,
          stagger: { each: 0.07, from: 'random' },
        },
        '<0.2',
      )
      .from(dividerRef.current, { scaleX: 0, duration: 0.7, ease: 'power3.out' }, '<0.3')
      .from(paragraph.words, { yPercent: 120, ease: 'circ.out', duration: 0.9, stagger: 0.018 }, '<0.2');

    const parallax = gsap.to(imageRef.current, {
      yPercent: 12,
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
      className="relative overflow-hidden bg-forest-950 px-6 py-24 sm:px-[6vw] sm:py-32"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={stockImages.installation25}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-950/80 to-forest-950/95" />
      {/* radial gold glow, the page's "magical" ambient light source */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,138,43,0.22),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(217,138,43,0.14),transparent_55%)]"
      />
      <span ref={accentRef} className="absolute right-0 top-0 h-32 w-2.5 bg-amber-600" aria-hidden="true" />

      {SPARKLES.map(({ left, top, size, delay }, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="sparkle-pulse pointer-events-none absolute rounded-full bg-amber-100"
          style={{
            left,
            top,
            width: size,
            height: size,
            animationDelay: delay,
            boxShadow: '0 0 8px 2px rgba(217,138,43,0.6)',
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <p
          ref={kickerRef}
          className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-amber-600"
        >
          {tNav('professionals')}
        </p>
        <h1
          ref={titleRef}
          className="professionals-hero-split mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,6.5vw,5rem)] font-extrabold leading-[1.04] tracking-tight text-amber-100"
        >
          {t('title')}
        </h1>
        <span
          ref={dividerRef}
          className="mx-auto mt-7 block h-px w-24 bg-gradient-to-r from-transparent via-amber-600 to-transparent"
          aria-hidden="true"
        />
        <p
          ref={paragraphRef}
          className="professionals-hero-split mx-auto mt-7 max-w-xl text-base leading-relaxed text-linen-50/75"
        >
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}
