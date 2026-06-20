'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { stockImages } from '@/lib/stockImages';

const TILES = [
  { key: 'furniture', image: stockImages.furniture },
  { key: 'interior', image: stockImages.interior },
  { key: 'architecture', image: stockImages.architecture },
  { key: 'landscape', image: stockImages.landscape },
] as const;

export default function PhotoServiceGrid({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* Mobile: simple stacked cards, no hover-expand */}
      <div className="grid grid-cols-1 sm:hidden">
        {TILES.map(({ key, image }) => (
          <div
            key={key}
            className="relative h-[46vh] min-h-[320px] overflow-hidden border border-forest-950/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={t(`${key}.title`)} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-linen-50">
              <span className="inline-block border-b border-linen-50/70 pb-1 font-display text-xl font-bold uppercase tracking-wide">
                {t(`${key}.title`)}
              </span>
              <p className="mt-2 text-sm text-linen-50/85">{t(`${key}.body`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: expanding panel row, opens to color on hover */}
      <div className="hidden h-[58vh] min-h-[420px] w-full overflow-hidden sm:flex">
        {TILES.map(({ key, image }, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;

          return (
            <button
              key={key}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={{ flexGrow: isActive ? 27 : 1 }}
              className="relative h-full overflow-hidden border-r border-forest-950/10 text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-r-0 focus:outline-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={t(`${key}.title`)}
                className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                  isDimmed ? 'scale-100 grayscale' : 'scale-105 grayscale-0'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 overflow-hidden whitespace-nowrap text-linen-50">
                <span
                  className={`inline-block border-b border-linen-50/70 pb-1 font-display uppercase tracking-wide transition-all duration-500 ${
                    isActive ? 'text-2xl font-extrabold' : 'text-base font-bold'
                  }`}
                >
                  {t(`${key}.title`)}
                </span>
                <p
                  className={`mt-2 max-w-xs whitespace-normal text-sm text-linen-50/85 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {t(`${key}.body`)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
