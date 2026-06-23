import { useTranslations } from 'next-intl';
import { Check, Minus } from 'lucide-react';
import { withBasePath } from '@/lib/assetPath';

const ICONS_DIR = withBasePath('/assets/images/pricing/motifs');

const PACKAGES = ['consult', 'design', 'fullService'] as const;

const ICONS: Record<(typeof PACKAGES)[number], string> = {
  consult: `${ICONS_DIR}/pricing-consult.svg`,
  design: `${ICONS_DIR}/pricing-design.svg`,
  fullService: `${ICONS_DIR}/pricing-fullservice.svg`,
};

// Inclusion depth by package tier — structural, not pricing — confirmed per-project in consultation.
const INCLUDES: Record<(typeof PACKAGES)[number], boolean[]> = {
  consult: [true, true, false, false, false, false],
  design: [true, true, true, true, true, false],
  fullService: [true, true, true, true, true, true],
};

export default function PackageComparisonTable() {
  const t = useTranslations('pricing');
  const items = t.raw('included.items') as string[];

  return (
    <div className="overflow-x-auto rounded-2xl border border-amber-100">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-amber-100 bg-linen-50">
            <th className="py-5 pl-6 pr-4 font-mono text-xs uppercase tracking-widest text-stone-600">
              {t('included.title')}
            </th>
            {PACKAGES.map((pkg) => (
              <th key={pkg} className="px-4 py-5 text-center">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICONS[pkg]} alt="" className="h-full w-full object-contain" />
                </span>
                <span className="mt-2 block font-display text-sm font-bold text-forest-950 sm:text-base">
                  {t(`packages.${pkg}.name`)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item} className="border-b border-amber-100/60 odd:bg-linen-50/50">
              <td className="py-4 pl-6 pr-4 text-ink/80">{item}</td>
              {PACKAGES.map((pkg) => (
                <td key={pkg} className="px-4 py-4 text-center">
                  {INCLUDES[pkg][i] ? (
                    <Check className="mx-auto text-amber-600" size={18} strokeWidth={2.5} />
                  ) : (
                    <Minus className="mx-auto text-stone-600/40" size={16} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
