import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { stockImages } from '@/lib/stockImages';
import Hero from '@/components/Hero';
import ManifestoSection from '@/components/ManifestoSection';
import Reveal from '@/components/Reveal';
import SectionIntro from '@/components/SectionIntro';
import StorySection from '@/components/StorySection';
import ImageBanner from '@/components/ImageBanner';
import PhotoServiceGrid from '@/components/PhotoServiceGrid';
import ExpertiseSection from '@/components/ExpertiseSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import FormulaSection from '@/components/FormulaSection';
import PortfolioGrid from '@/components/PortfolioGrid';
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
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return { title: t('title'), description: t('description') };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <Hero />

      <ManifestoSection />

      {/* Full-bleed image banner */}
      <ImageBanner image={stockImages.banner} alt={t('banner.title')} title={t('banner.title')} />

      {/* 01 Services — furniture leads, photo grid */}
      <section className="pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionIntro
            index="01"
            label={tCommon('nav.services')}
            title={t('services.title')}
            lead={t('services.lead')}
          />
        </div>
        <Reveal as="div" className="mt-12 w-full">
          <PhotoServiceGrid namespace="services.core" />
        </Reveal>
      </section>

      {/* Expertise — pinned via CSS sticky; StorySection slides up and covers
          it (see ExpertiseSection.tsx and StorySection.tsx z-index/scrub) */}
      <ExpertiseSection />

      {/* Statement */}
      <StorySection />

      {/* 02 Process */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionIntro
          index="02"
          label={tCommon('nav.process')}
          title={t('process.title')}
          lead={t('process.lead')}
        />
        <div className="mt-12">
          <ProcessTimeline namespace="process" />
        </div>
      </section>

      {/* Formula — design + install */}
      <Reveal as="section">
        <FormulaSection />
      </Reveal>

      {/* 03 Portfolio teaser */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionIntro
            index="03"
            label={tCommon('nav.portfolio')}
            title={t('portfolio.title')}
            lead={t('portfolio.lead')}
          />
          <Link
            href="/portfolio"
            className="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700"
          >
            {t('portfolio.viewAll')} →
          </Link>
        </div>
        <Reveal as="div" className="mt-12">
          <PortfolioGrid limit={3} />
        </Reveal>
        <div className="mt-8 max-w-2xl border-l-2 border-amber-600 pl-5">
          <BoldStatement text={t('portfolio.honestNote')} className="text-xl sm:text-2xl" />
        </div>
      </section>

      {/* Final CTA */}
      <Reveal as="section" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-2xl bg-forest-950 px-8 py-16 text-center sm:px-16">
          <h2 className="font-display text-3xl font-bold text-linen-50 sm:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-linen-50/80">
            {t('cta.body')}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-medium text-linen-50 hover:bg-amber-700"
          >
            {t('cta.button')}
          </Link>
        </div>
      </Reveal>
    </>
  );
}
