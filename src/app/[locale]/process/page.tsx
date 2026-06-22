import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProcessTimeline from '@/components/ProcessTimeline';
import SectionIntro from '@/components/SectionIntro';
import BoldStatement from '@/components/BoldStatement';

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

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'process' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <section className="border-b border-amber-100 bg-forest-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-100">
            {tCommon('nav.process')}
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl text-linen-50 sm:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-linen-50/80">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <SectionIntro
            label={t('roadmap.kicker')}
            title={`${t('roadmap.titleEmphasis')} ${t('roadmap.titleSuffix')}`}
            className="mx-auto flex flex-col items-center [&_h2]:max-w-none [&_p]:justify-center"
          />
        </div>

        <div className="mt-16 sm:mt-20">
          <ProcessTimeline namespace="process" variant="centered" />
        </div>

        <BoldStatement
          text={t('roadmap.statement')}
          className="mx-auto mt-16 max-w-2xl text-center text-xl sm:mt-20 sm:text-2xl"
        />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink/60">
          {t('timeline.note')}
        </p>
      </section>
    </>
  );
}
