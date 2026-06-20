import { useTranslations } from 'next-intl';
import { Armchair, Building2, Sofa, Trees } from 'lucide-react';

const SERVICES = [
  { key: 'furniture', Icon: Armchair, lead: true },
  { key: 'interior', Icon: Sofa, lead: false },
  { key: 'architecture', Icon: Building2, lead: false },
  { key: 'landscape', Icon: Trees, lead: false },
] as const;

export default function ServicesGrid({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-amber-100 bg-amber-100 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map(({ key, Icon, lead }, i) => (
        <div
          key={key}
          className={`group relative bg-linen-50 p-8 transition-colors duration-300 ${
            lead ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1 bg-forest-950' : ''
          }`}
        >
          {lead && (
            <span className="absolute right-6 top-6 rounded-full bg-amber-600 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-linen-50">
              {t('leadTag')}
            </span>
          )}
          <span
            className={`font-mono text-xs ${lead ? 'text-amber-100' : 'text-stone-600'}`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <Icon
            className={`mt-4 transition-transform duration-300 group-hover:translate-x-1 ${
              lead ? 'text-amber-600' : 'text-amber-600'
            }`}
            size={lead ? 36 : 28}
            strokeWidth={1.5}
          />
          <h3
            className={`mt-5 font-display ${lead ? 'text-2xl text-linen-50' : 'text-xl text-forest-950'}`}
          >
            {t(`${key}.title`)}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${lead ? 'text-linen-50/80' : 'text-ink/80'}`}
          >
            {t(`${key}.body`)}
          </p>
        </div>
      ))}
    </div>
  );
}
