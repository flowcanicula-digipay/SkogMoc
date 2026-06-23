import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
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
  return buildPageMetadata({ locale, namespace: 'meta.home', path: '' });
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

      {/*
        01 Services — given the same sticky-pin/cover treatment as Expertise
        below, but mirrored: `sticky bottom-0` instead of `top-0`, so scrolling
        back UP out of Expertise, this section re-covers it from below instead
        of just scrolling away. z-20 keeps it above Expertise's z-0 regardless
        of DOM order. The spacer above the sticky panel (not padding on it —
        see ExpertiseSection.tsx's note on the Chromium sticky-height bug)
        provides the dwell scroll room the stuck state needs to be visible
        for more than an instant.
      */}
      <div className="relative z-20">
        <div className="h-[20vh] sm:h-[26vh]" aria-hidden="true" />
        <div className="sticky bottom-0 bg-linen-50 pt-24">
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
        </div>
      </div>

      {/* Expertise — pinned via CSS sticky, lowest z-index on the page, so
          the sections immediately before and after both slide over and cover
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

      {/* Final CTA — full-bleed, dramatic word reveal, see FinalCtaSection.tsx */}
      <FinalCtaSection />
    </>
  );
}
