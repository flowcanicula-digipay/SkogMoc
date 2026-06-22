'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { stockImages } from '@/lib/stockImages';
import TopoPattern from './TopoPattern';

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

  return (
    <div className="relative overflow-hidden bg-linen-50 px-6 py-24 sm:px-[6vw] sm:py-32">
      <TopoPattern className="right-0 top-0 h-auto w-[55%] text-forest-950 opacity-[0.08]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 sm:items-center">
        <div className="relative flex h-[320px] items-center overflow-hidden rounded-2xl sm:h-[460px]">
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
  );
}
