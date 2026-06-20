import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.process' });
  return { title: t('title'), description: t('description') };
}

const STEPS = [
  'consultation',
  'concept',
  'development',
  'documentation',
  'installation',
  'handover',
] as const;

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'process' });

  return (
    <>
      <section className="border-b border-amber-100 bg-forest-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl text-linen-50 sm:text-5xl">{t('hero.title')}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-linen-50/80">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="divide-y divide-amber-100 border-y border-amber-100">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-[80px_1fr_2fr]"
            >
              <span className="font-mono text-sm text-amber-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-xl text-forest-950">
                {t(`steps.${step}.title`)}
              </h2>
              <p className="text-sm leading-relaxed text-ink/80">{t(`steps.${step}.body`)}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink/60">{t('timeline.note')}</p>
      </section>
    </>
  );
}
