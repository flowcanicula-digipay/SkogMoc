import { useTranslations } from 'next-intl';
import { Armchair, Building2, Sofa, Trees } from 'lucide-react';

const SERVICES = [
  { key: 'furniture', Icon: Armchair },
  { key: 'architecture', Icon: Building2 },
  { key: 'interior', Icon: Sofa },
  { key: 'landscape', Icon: Trees },
] as const;

export default function ServicesGrid({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-amber-100 bg-amber-100 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map(({ key, Icon }, i) => (
        <div key={key} className="bg-linen-50 p-8">
          <span className="font-mono text-xs text-stone-600">
            {String(i + 1).padStart(2, '0')}
          </span>
          <Icon className="mt-4 text-amber-600" size={28} strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-xl text-forest-950">
            {t(`${key}.title`)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            {t(`${key}.body`)}
          </p>
        </div>
      ))}
    </div>
  );
}
