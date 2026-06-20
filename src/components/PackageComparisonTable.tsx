import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

const PACKAGES = ['consult', 'design', 'fullService'] as const;

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
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-amber-100">
            <th className="py-4 pr-4 font-mono text-xs uppercase tracking-widest text-stone-600">
              {t('included.title')}
            </th>
            {PACKAGES.map((pkg) => (
              <th
                key={pkg}
                className="px-4 py-4 font-display text-base text-forest-950"
              >
                {t(`packages.${pkg}.name`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item} className="border-b border-amber-100/60">
              <td className="py-4 pr-4 text-ink/80">{item}</td>
              {PACKAGES.map((pkg) => (
                <td key={pkg} className="px-4 py-4 text-center">
                  {INCLUDES[pkg][i] && (
                    <Check className="mx-auto text-amber-600" size={18} />
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
