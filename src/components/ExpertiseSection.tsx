'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stockImages } from '@/lib/stockImages';
import TopoPattern from './TopoPattern';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS = [
  { key: 'architecturalDesign', image: stockImages.expertiseArchitecturalDesign },
  { key: 'furnitureDesign', image: stockImages.expertiseFurnitureDesign },
  { key: 'materialSelection', image: stockImages.expertiseMaterialSelection },
  { key: 'spatialPlanning', image: stockImages.expertiseSpatialPlanning },
  { key: 'installation', image: stockImages.processInstallation },
] as const;

export default function ExpertiseSection() {
  const t = useTranslations('home.expertise');
  const [active, setActive] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGSVGElement>(null);

  // The panel is `sticky top-0` and sits at the lowest z-index of any
  // section on the page (no explicit z-index = 0, vs. z-10/z-20 on its
  // neighbours) — so as the page scrolls, the *next* section (StorySection)
  // slides up and visually covers it while it stays pinned, and scrolling
  // back up, the *previous* section ("01 Services", pinned to the viewport
  // bottom in page.tsx) slides back down to re-cover it. The dwell scroll
  // room that makes the pin/cover effect last more than a single frame
  // comes from the fixed-height spacer sibling below the panel, not padding
  // on the panel itself — see page.tsx's matching note on the Chromium
  // sticky-height bug this avoids.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const panel = parallaxRef.current;
    if (!wrapper || !panel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
      if (patternRef.current) {
        gsap.fromTo(
          patternRef.current,
          { yPercent: -6, rotate: 0 },
          {
            yPercent: 6,
            rotate: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="sticky top-0 overflow-hidden bg-linen-50 px-6 py-24 sm:px-[6vw] sm:py-32">
        <TopoPattern
          ref={patternRef}
          className="right-0 top-0 h-auto w-[55%] text-forest-950 opacity-[0.08]"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 sm:items-center">
          <div className="relative h-[320px] overflow-hidden rounded-2xl sm:h-[460px]">
            <div ref={parallaxRef} className="absolute inset-x-0 -top-[10%] flex h-[120%] items-center">
              <h2
                className={`font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.02] text-forest-950 transition-opacity duration-500 ${
                  active === null ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {t('title')}
              </h2>
              {ITEMS.map(({ key, image }, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={key}
                  src={image}
                  alt={t(`items.${key}`)}
                  className={`absolute inset-0 h-full w-full rounded-2xl object-cover shadow-xl transition-opacity duration-500 ${
                    active === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
          <ul>
            {ITEMS.map(({ key }, i) => {
              const isActive = active === i;
              return (
                <li
                  key={key}
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
                    className={`text-right font-display transition-all duration-300 ${
                      isActive
                        ? 'text-2xl font-bold text-forest-950 sm:text-3xl'
                        : 'text-lg font-medium text-stone-600 sm:text-xl'
                    }`}
                  >
                    {t(`items.${key}`)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="h-[34vh] sm:h-[40vh]" aria-hidden="true" />
    </div>
  );
}
