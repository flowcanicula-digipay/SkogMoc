'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const ICONS_DIR = '/assets/images/pricing/motifs';

const PACKAGES = ['consult', 'design', 'fullService'] as const;

const ICONS: Record<(typeof PACKAGES)[number], string> = {
  consult: `${ICONS_DIR}/pricing-consult.svg`,
  design: `${ICONS_DIR}/pricing-design.svg`,
  fullService: `${ICONS_DIR}/pricing-fullservice.svg`,
};

// Same inclusion depth as PackageComparisonTable — structural, not pricing,
// confirmed per-project in consultation. Kept here too so each card can show
// its own feature list without round-tripping through the table component.
const INCLUDES: Record<(typeof PACKAGES)[number], boolean[]> = {
  consult: [true, true, false, false, false, false],
  design: [true, true, true, true, true, false],
  fullService: [true, true, true, true, true, true],
};

export default function PricingPackages() {
  const t = useTranslations('pricing');
  const tCommon = useTranslations('common');
  const items = t.raw('included.items') as string[];
  const [selected, setSelected] = useState<(typeof PACKAGES)[number]>('design');

  return (
    <div role="radiogroup" className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:items-start">
      {PACKAGES.map((pkg, i) => {
        const isFeatured = pkg === 'design';
        const isSelected = selected === pkg;
        return (
          <div
            key={pkg}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            onClick={() => setSelected(pkg)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelected(pkg);
              }
            }}
            className={`group relative flex h-full flex-col rounded-2xl border p-8 text-left transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
              isSelected
                ? 'border-amber-600 bg-forest-950 shadow-[0_20px_50px_-15px_rgba(217,138,43,0.35)] sm:-translate-y-2'
                : 'border-amber-100 bg-white hover:-translate-y-1 hover:border-amber-600/60 hover:shadow-lg'
            }`}
          >
            {isFeatured && (
              <span className="absolute -top-3 left-8 rounded-full bg-amber-600 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-linen-50 shadow-md">
                {t('packages.design.badge')}
              </span>
            )}

            <div className="flex items-center justify-between">
              <span
                className={`font-mono text-xs ${isSelected ? 'text-amber-100/70' : 'text-stone-600'}`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full p-2 transition-colors ${
                  isSelected ? 'bg-amber-600/15' : 'bg-amber-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICONS[pkg]} alt="" className="h-full w-full object-contain" />
              </span>
            </div>

            <p
              className={`mt-5 text-xs font-semibold uppercase tracking-widest ${
                isSelected ? 'text-amber-600' : 'text-amber-600'
              }`}
            >
              {t(`packages.${pkg}.tagline`)}
            </p>
            <h3
              className={`mt-2 font-display text-2xl font-bold ${
                isSelected ? 'text-linen-50' : 'text-forest-950'
              }`}
            >
              {t(`packages.${pkg}.name`)}
            </h3>
            <p
              className={`mt-4 text-sm leading-relaxed ${
                isSelected ? 'text-linen-50/75' : 'text-ink/75'
              }`}
            >
              {t(`packages.${pkg}.description`)}
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {items.map((item, idx) =>
                INCLUDES[pkg][idx] ? (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-sm leading-snug ${
                      isSelected ? 'text-linen-50/85' : 'text-ink/80'
                    }`}
                  >
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${isSelected ? 'text-amber-600' : 'text-amber-600'}`}
                    />
                    {item}
                  </li>
                ) : null,
              )}
            </ul>

            <p
              className={`mt-8 font-mono text-sm ${isSelected ? 'text-amber-100' : 'text-amber-600'}`}
            >
              {t(`packages.${pkg}.price`)}
            </p>

            <Link
              href="/contact"
              onClick={(e) => e.stopPropagation()}
              className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-bold transition-colors ${
                isSelected
                  ? 'bg-amber-600 text-linen-50 hover:bg-amber-700'
                  : 'border-2 border-amber-600 text-amber-600 hover:bg-amber-100'
              }`}
            >
              {tCommon('cta.getQuote')}
              <ArrowRight size={15} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
