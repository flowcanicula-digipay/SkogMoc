'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stockImages } from '@/lib/stockImages';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PLACEHOLDER_COUNT = 12;
const DISCIPLINES = ['architecture', 'furniture', 'interior', 'landscape'] as const;
// We're a general architecture practice, but furniture design, making, and
// installation make up most of our real project track record — weight the
// placeholder grid the same way so it doesn't misrepresent the studio's focus.
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
  const gridRef = useRef<HTMLDivElement>(null);

  const items = Array.from({ length: limit ?? PLACEHOLDER_COUNT }, (_, i) => ({
    id: i,
    discipline: ITEM_DISCIPLINES[i % ITEM_DISCIPLINES.length],
    image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
  })).filter((item) => filter === 'all' || item.discipline === filter);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cards = grid.querySelectorAll<HTMLElement>('[data-card]');
    const tween = gsap.from(cards, {
      opacity: 0,
      y: 56,
      scale: 0.94,
      duration: 0.8,
      ease: 'power3.out',
      stagger: { each: 0.08, grid: 'auto', from: 'start' },
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, limit]);

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

      <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            data-card
            className="group relative flex aspect-[4/5] flex-col items-end overflow-hidden rounded-2xl border border-amber-100 p-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent transition-opacity duration-500 group-hover:from-forest-950/90" />

            <div className="relative z-10 flex w-full items-end justify-between gap-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber-100">
                  {t(`filters.${item.discipline}`)}
                </span>
                <span
                  className="mt-2 block h-0.5 w-8 origin-left scale-x-0 bg-amber-600 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </div>
              <span className="flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-linen-50 text-forest-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
