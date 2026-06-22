'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Fraunces } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stockImages } from '@/lib/stockImages';
import TopoPattern from './TopoPattern';
import {
  ArchTechnologistIcon,
  SpatialDesignerIcon,
  BuildingSurveyorIcon,
  TownPlannerIcon,
  ProductionDesignerIcon,
  HistoricBuildingsIcon,
  StructuralEngineerIcon,
} from './icons/StudioIcons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Scoped to this section only — an editorial serif counterpoint to the
// rest of the site's Plus Jakarta Sans / Montserrat, for a more elegant
// register on the specialist-network captions. Verified to carry a
// `vietnamese` subset before adding (see CLAUDE.md's font-selection note).
const fraunces = Fraunces({
  subsets: ['latin', 'vietnamese'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  variable: '--font-fraunces',
});

// Order matches services.extended.items 1:1 in every locale file — see
// CLAUDE.md's "Additional professional services offered" list. Generic
// editorial stock photos (no real project claims) chosen for a Southeast
// Asian setting, same stopgap status as the rest of stockImages.ts.
const IMAGES = [
  stockImages.expertiseArchitecturalDesign,
  stockImages.expertiseSpatialPlanning,
  stockImages.extendedBuildingSurveyor,
  stockImages.landscape,
  stockImages.extendedProductionDesigner,
  stockImages.extendedHistoricBuildings,
  stockImages.extendedStructuralEngineer,
];

const ICONS = [
  ArchTechnologistIcon,
  SpatialDesignerIcon,
  BuildingSurveyorIcon,
  TownPlannerIcon,
  ProductionDesignerIcon,
  HistoricBuildingsIcon,
  StructuralEngineerIcon,
];

type ExtendedItem = { title: string; discipline: string; body: string };

export default function ExtendedServicesShowcase({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const [active, setActive] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGSVGElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = t.raw('items') as ExtendedItem[];

  // Same slow drifting background as the home page's expertise panel —
  // gsap.fromTo on the topo pattern, scrubbed to scroll position.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pattern = patternRef.current;
    if (!wrapper || !pattern || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tween = gsap.fromTo(
      pattern,
      { yPercent: -8, rotate: 0 },
      {
        yPercent: 8,
        rotate: -4,
        ease: 'none',
        scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Caption copy gets its own small reveal — a soft blur-to-focus lift,
  // staggered headline → rule → discipline → body — every time the active
  // item changes, independent of the image crossfade underneath it.
  useEffect(() => {
    if (active === null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const node = captionRefs.current[active];
    if (!node) return;

    const targets = node.querySelectorAll<HTMLElement>('[data-cap]');
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 14, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', stagger: 0.08 },
    );

    return () => {
      tween.kill();
    };
  }, [active]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${fraunces.variable}`}>
      <TopoPattern
        ref={patternRef}
        className="right-0 top-0 h-auto w-[55%] text-forest-950 opacity-[0.08]"
      />
      <div className="relative z-10 grid gap-12 sm:grid-cols-2 sm:items-center">
        {/* List — left column, reversed from the home page's expertise panel */}
        <ul>
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <li
                key={item.title}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`flex cursor-default items-baseline justify-between gap-6 border-b py-5 outline-none transition-colors duration-300 first:border-t ${
                  isActive ? 'border-forest-950' : 'border-forest-950/15'
                }`}
              >
                <span className="font-mono text-sm text-stone-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={isActive ? { fontFamily: 'var(--font-fraunces)' } : undefined}
                  className={`text-right transition-all duration-300 ${
                    isActive
                      ? 'text-2xl italic font-medium text-forest-950 sm:text-3xl'
                      : 'font-display text-base font-medium text-stone-600 sm:text-lg'
                  }`}
                >
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Image panel — right column, same crossfade treatment as Our
            Expertise: idle big title, swap to photo + caption on hover */}
        <div className="relative h-[360px] overflow-hidden rounded-2xl sm:h-[500px]">
          <h3
            style={{ fontFamily: 'var(--font-fraunces)' }}
            className={`absolute inset-0 flex items-center justify-center text-center italic text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] text-forest-950 transition-opacity duration-500 ${
              active === null ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {t('title')}
          </h3>

          {items.map(({ title, discipline, body }, i) => {
            const Icon = ICONS[i];
            const isActive = active === i;
            return (
              <div
                key={title}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={!isActive}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES[i]}
                  alt={title}
                  className={`h-full w-full rounded-2xl object-cover shadow-xl transition-transform duration-700 ease-out ${
                    isActive ? 'scale-100' : 'scale-105'
                  }`}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-forest-950/95 via-forest-950/25 to-transparent" />
                <div
                  ref={(el) => {
                    captionRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 bottom-0 p-7 sm:p-9"
                >
                  {Icon && (
                    <span
                      data-cap
                      className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-amber-600/50 text-amber-100"
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </span>
                  )}
                  <p
                    data-cap
                    style={{ fontFamily: 'var(--font-fraunces)' }}
                    className="text-xl font-medium leading-tight text-linen-50 sm:text-2xl"
                  >
                    {title}
                  </p>
                  <span data-cap className="mt-3 block h-px w-10 bg-amber-500/70" aria-hidden="true" />
                  <p
                    data-cap
                    style={{ fontFamily: 'var(--font-fraunces)' }}
                    className="mt-2 italic tracking-wide text-amber-100/90"
                  >
                    {discipline}
                  </p>
                  <p data-cap className="mt-3 max-w-sm text-sm leading-relaxed text-linen-50/80">
                    {body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
