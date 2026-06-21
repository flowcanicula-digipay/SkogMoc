'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { stockImages } from '@/lib/stockImages';

const PLACEHOLDER_COUNT = 12;
const DISCIPLINES = ['furniture', 'interior', 'architecture', 'landscape'] as const;
// Furniture design, making, and installation make up most of our real project work —
// weight the placeholder grid the same way so it doesn't misrepresent the studio's focus.
const ITEM_DISCIPLINES = [
  'furniture',
  'furniture',
  'interior',
  'furniture',
  'furniture',
  'architecture',
  'furniture',
  'landscape',
] as const;
const PLACEHOLDER_IMAGES = [
  stockImages.installation1,
  stockImages.installation2,
  stockImages.installation3,
  stockImages.installation4,
  stockImages.installation5,
  stockImages.installation6,
  stockImages.installation7,
  stockImages.installation8,
  stockImages.installation9,
  stockImages.installation10,
  stockImages.installation11,
  stockImages.installation12,
  stockImages.installation13,
  stockImages.installation14,
  stockImages.installation15,
  stockImages.installation16,
  stockImages.installation17,
  stockImages.installation18,
  stockImages.installation19,
  stockImages.installation20,
  stockImages.installation21,
  stockImages.installation22,
  stockImages.installation23,
  stockImages.installation24,
  stockImages.installation25,
  stockImages.installation26,
  stockImages.installation27,
];

export default function PortfolioGrid({ limit }: { limit?: number }) {
  const t = useTranslations('portfolio');
  const [filter, setFilter] = useState<(typeof DISCIPLINES)[number] | 'all'>('all');

  const items = Array.from({ length: limit ?? PLACEHOLDER_COUNT }, (_, i) => ({
    id: i,
    discipline: ITEM_DISCIPLINES[i % ITEM_DISCIPLINES.length],
    image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
  })).filter((item) => filter === 'all' || item.discipline === filter);

  return (
    <div>
      {!limit && (
        <div className="mb-10 flex flex-wrap gap-3">
          {(['all', ...DISCIPLINES] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFilter(d)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                filter === d
                  ? 'border-amber-600 bg-amber-600 text-linen-50'
                  : 'border-amber-100 text-ink/70 hover:border-amber-600 hover:text-amber-600'
              }`}
            >
              {t(`filters.${d}`)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-2xl border border-amber-100 p-6 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-950/55" />
            <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-amber-100">
              {t(`filters.${item.discipline}`)}
            </span>
            <p className="relative z-10 mt-3 font-display text-lg text-linen-50">
              {t('comingSoon.title')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
