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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {TILES.map(({ key, image }) => (
        <div
          key={key}
          className="group relative h-[46vh] min-h-[320px] overflow-hidden border border-forest-950/5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={t(`${key}.title`)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
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
  );
}
