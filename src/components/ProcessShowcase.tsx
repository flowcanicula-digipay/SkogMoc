import { useTranslations } from 'next-intl';
import { stockImages } from '@/lib/stockImages';

const STEPS = [
  { key: 'step1', image: stockImages.processConsultation },
  { key: 'step2', image: stockImages.processConcept },
  { key: 'step3', image: stockImages.processDevelopment },
  { key: 'step4', image: stockImages.processDocumentation },
] as const;

export default function ProcessShowcase() {
  const t = useTranslations('home.process');

  return (
    <div>
      {STEPS.map(({ key, image }, i) => (
        <div
          key={key}
          className={`grid grid-cols-1 items-center gap-10 border-b border-amber-100 py-14 last:border-none sm:grid-cols-2 sm:gap-16 ${
            i % 2 === 1 ? 'sm:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div>
            <span className="font-display text-2xl font-light text-stone-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 inline-block border-b-2 border-forest-950 pb-4 font-display text-3xl font-bold text-forest-950 sm:text-4xl">
              {t(`${key}.title`)}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80">
              {t(`${key}.body`)}
            </p>
          </div>
          <div className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={t(`${key}.title`)}
              className="h-72 w-full object-cover shadow-2xl"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
