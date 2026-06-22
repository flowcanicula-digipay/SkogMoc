'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { stockImages } from '@/lib/stockImages';

const TILES = [
  { key: 'furniture', image: stockImages.furniture, focalPoint: '0%' },
  { key: 'interior', image: stockImages.interior, focalPoint: '50%' },
  { key: 'architecture', image: stockImages.architecture, focalPoint: '70%' },
  { key: 'landscape', image: stockImages.landscape, focalPoint: '100%' },
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

      {/* Desktop: full-bleed grayscale row, panel grows and colorizes on hover */}
      <div className="hidden h-[80vh] min-h-[520px] w-full overflow-hidden sm:flex">
        {TILES.map(({ key, image, focalPoint }, i) => {
          const isActive = active === i;

          return (
            <button
              key={key}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={{
                flexGrow: isActive ? 60 : 1,
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 12%), url(${image})`,
                backgroundPosition: `0 0, ${focalPoint}`,
                backgroundSize: 'auto, cover',
                filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                transition:
                  'filter 1.4s cubic-bezier(0.22,1,0.36,1), flex-grow 2.2s cubic-bezier(0.22,1,0.36,1)',
              }}
              className="relative flex h-full w-0 min-w-0 items-end overflow-hidden px-6 pb-6 text-left focus:outline-none"
            >
              <div className="overflow-hidden whitespace-nowrap text-linen-50">
                <h3 className="font-display text-xl font-extrabold uppercase tracking-wide">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 max-w-xs whitespace-normal text-sm text-linen-50/85">
                  {t(`${key}.body`)}
                </p>
                <div
                  className={`mt-3 h-px bg-linen-50/70 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? 'w-16' : 'w-8'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
