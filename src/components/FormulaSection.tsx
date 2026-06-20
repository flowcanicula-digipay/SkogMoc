'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stockImages } from '@/lib/stockImages';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FormulaSection() {
  const t = useTranslations('home.formula');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const callouts = section.querySelectorAll<HTMLElement>('[data-callout]');
    const connectors = section.querySelectorAll<HTMLElement>('[data-connector]');
    const tokens = section.querySelectorAll<HTMLElement>('[data-token]');

    gsap.set(connectors, { scaleY: 0 });
    gsap.set(callouts, { opacity: 0, y: 6 });
    gsap.set(tokens, { opacity: 0, y: 16 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 70%' },
    });
    tl.from(titleRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      .from(panelRef.current, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '<0.2')
      .to(tokens, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '<0.2')
      .to(connectors, { scaleY: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '<0.1')
      .to(callouts, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '<0.1');

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-forest-950 px-6 py-24 sm:px-[6vw] sm:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stockImages.formulaBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.35] grayscale"
      />
      <div className="absolute inset-0 bg-forest-950/70" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 sm:items-center">
        <h2
          ref={titleRef}
          className="whitespace-pre-line font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] text-linen-50"
        >
          {t('title')}
        </h2>

        <div
          ref={panelRef}
          className="rounded-2xl border border-linen-50/15 bg-forest-950/60 px-6 py-10 sm:px-10 sm:py-12"
        >
          <div
            className="grid items-center justify-center gap-x-3 sm:gap-x-6"
            style={{ gridTemplateColumns: 'repeat(7, auto)', gridTemplateRows: 'auto auto auto' }}
          >
            {/* ( */}
            <span
              data-token
              className="col-start-1 row-start-2 text-center font-display text-2xl font-extrabold text-linen-50/40 sm:text-4xl"
            >
              (
            </span>

            {/* DESIGN -> D */}
            <div className="col-start-2 row-start-1 flex flex-col items-center pb-2">
              <span
                data-callout
                className="text-center text-[9px] uppercase tracking-[0.2em] text-linen-50/70 sm:text-[10px]"
              >
                {t('eyebrow1')}
              </span>
              <span data-connector className="mt-1.5 h-5 w-px origin-top bg-linen-50/30" />
              <span data-callout className="mt-1 h-1.5 w-1.5 rounded-full bg-linen-50/50" />
            </div>
            <span
              data-token
              className="col-start-2 row-start-2 text-center font-display text-3xl font-extrabold text-linen-50 sm:text-5xl"
            >
              D
            </span>

            {/* + -> Skog Mộc */}
            <span
              data-token
              className="col-start-3 row-start-2 text-center font-display text-2xl font-extrabold text-linen-50/60 sm:text-4xl"
            >
              +
            </span>
            <div className="col-start-3 row-start-3 flex flex-col items-center pt-2">
              <span data-callout className="h-1.5 w-1.5 rounded-full bg-amber-600/70" />
              <span data-connector className="mt-1 h-5 w-px origin-bottom bg-amber-600/40" />
              <span
                data-callout
                className="mt-1.5 text-center text-[9px] uppercase tracking-[0.2em] text-amber-600/80 sm:text-[10px]"
              >
                Skog Mộc
              </span>
            </div>

            {/* INSTALL -> I */}
            <div className="col-start-4 row-start-1 flex flex-col items-center pb-2">
              <span
                data-callout
                className="text-center text-[9px] uppercase tracking-[0.2em] text-linen-50/70 sm:text-[10px]"
              >
                {t('eyebrow2')}
              </span>
              <span data-connector className="mt-1.5 h-5 w-px origin-top bg-linen-50/30" />
              <span data-callout className="mt-1 h-1.5 w-1.5 rounded-full bg-linen-50/50" />
            </div>
            <span
              data-token
              className="col-start-4 row-start-2 text-center font-display text-3xl font-extrabold text-linen-50 sm:text-5xl"
            >
              I
            </span>

            {/* ) */}
            <span
              data-token
              className="col-start-5 row-start-2 text-center font-display text-2xl font-extrabold text-linen-50/40 sm:text-4xl"
            >
              )
            </span>

            {/* = */}
            <span
              data-token
              className="col-start-6 row-start-2 text-center font-display text-2xl font-extrabold text-linen-50/60 sm:text-4xl"
            >
              =
            </span>

            {/* DONE -> ready to live in */}
            <span
              data-token
              className="col-start-7 row-start-2 text-center font-display text-3xl font-extrabold text-amber-600 sm:text-5xl"
            >
              {t('result')}
            </span>
            <div className="col-start-7 row-start-3 flex flex-col items-center pt-2">
              <span data-callout className="h-1.5 w-1.5 rounded-full bg-amber-600/70" />
              <span data-connector className="mt-1 h-5 w-px origin-bottom bg-amber-600/40" />
              <span
                data-callout
                className="mt-1.5 whitespace-nowrap text-center text-[9px] uppercase tracking-[0.2em] text-amber-600/80 sm:text-[10px]"
              >
                {t('resultCaption')}
              </span>
            </div>
          </div>
        </div>

        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-linen-50/80 sm:col-span-2">
          {t('tag')}
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-linen-50/70 sm:col-span-2">
          {t('note')}
        </p>
      </div>
    </div>
  );
}
