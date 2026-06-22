import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProcessHero from '@/components/ProcessHero';
import ProcessTimeline from '@/components/ProcessTimeline';
import StorySection from '@/components/StorySection';
import ManifestoSection from '@/components/ManifestoSection';
import SectionIntro from '@/components/SectionIntro';
import BoldStatement from '@/components/BoldStatement';
import FinalCtaSection from '@/components/FinalCtaSection';

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

  return (
    <>
      <ProcessHero />

      <ManifestoSection namespace="process.manifesto" />

      
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <SectionIntro
            index="01"
            label={t('roadmap.kicker')}
            title={`${t('roadmap.titleEmphasis')} ${t('roadmap.titleSuffix')}`}
            className="mx-auto flex flex-col items-center [&_h2]:max-w-none [&_p]:justify-center"
          />
        </div>

        <div className="mt-16 sm:mt-20">
          <ProcessTimeline namespace="process" variant="centered" />
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-l-2 border-amber-600 pl-5 text-left sm:mt-20">
          <BoldStatement text={t('roadmap.statement')} className="text-xl sm:text-2xl" />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink/60">
          {t('timeline.note')}
        </p>
      </section>

      {/* Bold promising statement — same family as the pricing/portfolio
          pages' StorySection */}
      <StorySection namespace="process.statement" />



      <FinalCtaSection namespace="process.cta" />
    </>
  );
}
