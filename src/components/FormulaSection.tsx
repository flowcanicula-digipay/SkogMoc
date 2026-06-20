import { useTranslations } from 'next-intl';
import { stockImages } from '@/lib/stockImages';

export default function FormulaSection() {
  const t = useTranslations('home.formula');

  return (
    <div className="relative overflow-hidden px-6 py-32 sm:px-[6vw] sm:py-40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stockImages.formulaBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.35] grayscale"
      />
      <div className="absolute inset-0 bg-forest-950/70" />
      <div className="relative z-10 mx-auto max-w-5xl text-center text-linen-50">
        <h2 className="whitespace-pre-line font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
          {t('title')}
        </h2>
        <p className="mt-4 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-linen-50/80">
          {t('tag')}
        </p>

        <div className="mt-16 flex flex-wrap items-end justify-center gap-6 rounded-lg border border-linen-50/15 bg-forest-950/60 px-10 py-12 sm:gap-10">
          <div className="flex flex-col items-center gap-2.5">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-linen-50/70">
              {t('eyebrow1')}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-linen-50/50" />
          </div>
          <span className="font-display text-3xl font-extrabold sm:text-5xl">+</span>
          <div className="flex flex-col items-center gap-2.5">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-linen-50/70">
              {t('eyebrow2')}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-linen-50/50" />
          </div>
          <span className="font-display text-3xl font-extrabold sm:text-5xl">=</span>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-600 font-display text-sm font-bold tracking-widest text-amber-600 sm:h-20 sm:w-20 sm:text-base">
            SM
          </div>
          <span className="font-display text-3xl font-extrabold text-amber-600 sm:text-5xl">
            {t('result')}
          </span>
        </div>
      </div>
    </div>
  );
}
