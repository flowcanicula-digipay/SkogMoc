'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const PLACEHOLDER_COUNT = 6;
const DISCIPLINES = ['architecture', 'interior', 'furniture', 'landscape'] as const;

export default function PortfolioGrid({ limit }: { limit?: number }) {
  const t = useTranslations('portfolio');
  const [filter, setFilter] = useState<(typeof DISCIPLINES)[number] | 'all'>('all');

  const items = Array.from({ length: limit ?? PLACEHOLDER_COUNT }, (_, i) => ({
    id: i,
    discipline: DISCIPLINES[i % DISCIPLINES.length],
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
            className="group flex aspect-[4/5] flex-col items-center justify-center rounded-2xl border border-amber-100 bg-amber-100/40 p-6 text-center"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600">
              {t(`filters.${item.discipline}`)}
            </span>
            <p className="mt-3 font-display text-lg text-forest-950">
              {t('comingSoon.title')}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink/70">
        {t('comingSoon.body')}
      </p>
    </div>
  );
}
