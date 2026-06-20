'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import TopoPattern from './TopoPattern';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StorySection() {
  const t = useTranslations('home.statement');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      !bodyRef.current ||
      !leadRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const title = new SplitType(titleRef.current, { types: 'lines,words' });
    const body = new SplitType(bodyRef.current, { types: 'lines' });
    const lead = new SplitType(leadRef.current, { types: 'lines' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });
    tl.from(title.words, {
      yPercent: 120,
      ease: 'circ.out',
      duration: 1,
      stagger: 0.04,
    })
      .from(
        body.lines,
        { yPercent: 100, opacity: 0, ease: 'power3.out', duration: 0.8, stagger: 0.08 },
        '<0.3',
      )
      .from(
        lead.lines,
        { yPercent: 100, opacity: 0, ease: 'power3.out', duration: 0.8, stagger: 0.08 },
        '<0.2',
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      title.revert();
      body.revert();
      lead.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-forest-950 px-6 py-28 sm:px-[8vw] sm:py-36"
    >
      <TopoPattern className="right-0 top-0 h-auto w-[55%] text-linen-50 opacity-[0.06]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
        <h2
          ref={titleRef}
          className="story-split max-w-xl whitespace-pre-line font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-linen-50"
        >
          {t('title')}
        </h2>
        <div className="max-w-md text-right">
          <p
            ref={bodyRef}
            className="story-split font-display text-lg font-semibold leading-relaxed text-linen-50"
          >
            {t('body')}
          </p>
          <p ref={leadRef} className="story-split mt-6 text-base leading-relaxed text-linen-50/60">
            {t('lead')}
          </p>
        </div>
      </div>
    </div>
  );
}
