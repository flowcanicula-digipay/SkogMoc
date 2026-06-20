import { useTranslations } from 'next-intl';

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;

export default function HowItWorks() {
  const t = useTranslations('home.process');

  return (
    <div className="divide-y divide-amber-100 border-y border-amber-100">
      {STEPS.map((step, i) => (
        <div
          key={step}
          className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-[80px_1fr_2fr]"
        >
          <span className="font-mono text-sm text-amber-600">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-lg text-forest-950">
            {t(`${step}.title`)}
          </h3>
          <p className="text-sm leading-relaxed text-ink/80">
            {t(`${step}.body`)}
          </p>
        </div>
      ))}
    </div>
  );
}
