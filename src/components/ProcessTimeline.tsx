'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stockImages } from '@/lib/stockImages';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { key: 'consultation', image: stockImages.roadmapConsultation },
  { key: 'concept', image: stockImages.roadmapConcept },
  { key: 'development', image: stockImages.roadmapDevelopment },
  { key: 'documentation', image: stockImages.roadmapDocumentation },
  { key: 'installation', image: stockImages.roadmapInstallation },
  { key: 'handover', image: stockImages.roadmapHandover },
] as const;

export default function ProcessTimeline({
  namespace,
  variant = 'default',
}: {
  namespace: string;
  variant?: 'default' | 'centered';
}) {
  const t = useTranslations(namespace);
  const isCentered = variant === 'centered';
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: STEPS.length, ease: 'none' }, 0);
      if (glowLineRef.current) {
        tl.fromTo(
          glowLineRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: STEPS.length, ease: 'none' },
          0
        );
      }
      if (cometRef.current) {
        tl.fromTo(
          cometRef.current,
          { top: '0%', opacity: 1 },
          { top: '100%', duration: STEPS.length, ease: 'none' },
          0
        );
      }

      STEPS.forEach((_, i) => {
        const at = i + 0.25;
        const marker = markerRefs.current[i];
        const text = textRefs.current[i];
        const number = numberRefs.current[i];
        const image = imageRefs.current[i];
        const fromX = i % 2 === 0 ? -56 : 56;

        if (marker) {
          tl.fromTo(
            marker,
            { scale: 0, rotate: -160, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.55, ease: 'back.out(2.6)' },
            at
          );
        }
        if (number) {
          tl.fromTo(
            number,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
            at + 0.05
          );
        }
        if (text) {
          tl.fromTo(
            text,
            { x: fromX, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            at + 0.1
          );
        }
        if (image) {
          tl.fromTo(
            image,
            { x: -fromX, opacity: 0, scale: 0.85, clipPath: 'inset(8% 8% 8% 8% round 1rem)' },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 1rem)',
              duration: 0.7,
              ease: 'power3.out',
            },
            at + 0.05
          );
        }
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'top 75%',
        end: 'bottom 65%',
        scrub: 0.6,
        animation: tl,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto py-10 ${isCentered ? 'max-w-5xl' : 'max-w-4xl'}`}
    >
      {/* center line track */}
      <div className="absolute left-6 top-0 h-full w-px bg-forest-950/10 sm:left-1/2 sm:-translate-x-1/2" />
      {/* glow trail behind the line */}
      <div
        ref={glowLineRef}
        className="absolute left-6 top-0 h-full w-[3px] origin-top bg-amber-600/40 blur-md sm:left-1/2 sm:-translate-x-1/2"
        style={{ transform: 'scaleY(0)' }}
      />
      {/* drawn progress line */}
      <div
        ref={lineRef}
        className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-amber-600 via-amber-600 to-moss-500 sm:left-1/2 sm:-translate-x-1/2"
        style={{ transform: 'scaleY(0)' }}
      />
      {/* comet tip */}
      <div
        ref={cometRef}
        className="absolute left-6 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600 opacity-0 shadow-[0_0_18px_6px_rgba(217,138,43,0.65)] sm:left-1/2"
      />

      <ol className={`relative flex flex-col ${isCentered ? 'gap-16 sm:gap-28' : 'gap-14 sm:gap-20'}`}>
        {STEPS.map(({ key: step, image }, i) => {
          const isRight = i % 2 === 1;
          return (
            <li
              key={step}
              className={`relative flex flex-col gap-6 sm:flex-row sm:items-center ${
                isRight ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* marker */}
              <div
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                className="absolute left-6 top-0 z-20 -translate-x-1/2 sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2"
              >
                <div className="process-marker-glow absolute inset-0 -m-2 rounded-full bg-amber-600/30" />
                <div className="process-marker-idle relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-600 bg-linen-50 text-amber-600 shadow-lg">
                  <Sparkle size={20} strokeWidth={1.75} />
                </div>
              </div>

              {/* spacer to clear the marker on mobile */}
              <div className="h-12 sm:hidden" />

              {/* mobile photo, above the text */}
              <div className="overflow-hidden rounded-2xl pl-16 sm:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={t(`steps.${step}.title`)}
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                />
              </div>

              {/* number + text */}
              <div
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className={
                  isCentered
                    ? 'px-16 text-center sm:w-1/2 sm:px-12'
                    : `pl-16 sm:w-1/2 sm:pl-0 ${
                        isRight ? 'sm:pl-16 sm:text-left' : 'sm:pr-16 sm:text-right'
                      }`
                }
              >
                <span
                  className={`inline-block overflow-hidden font-mono text-sm font-semibold tracking-wide text-amber-600 ${
                    isCentered ? 'sm:tracking-[0.15em]' : ''
                  }`}
                >
                  <span
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                    className="inline-block"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <h3
                  className={`font-display font-bold tracking-tight text-forest-950 ${
                    isCentered
                      ? 'mt-3 text-2xl sm:text-3xl'
                      : 'mt-2 text-xl sm:text-2xl'
                  }`}
                >
                  {t(`steps.${step}.title`)}
                </h3>
                <p
                  className={`leading-relaxed text-ink/80 ${
                    isCentered
                      ? 'mx-auto mt-3 max-w-sm text-base'
                      : 'mt-2 text-sm'
                  }`}
                >
                  {t(`steps.${step}.body`)}
                </p>
              </div>

              {/* desktop photo, opposite column from the text */}
              <div
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className="hidden sm:block sm:w-1/2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={t(`steps.${step}.title`)}
                  className={`aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ${
                    isRight ? 'sm:mr-auto sm:ml-16' : 'sm:ml-auto sm:mr-16'
                  } ${isCentered ? 'sm:max-w-md' : 'sm:max-w-sm'}`}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
