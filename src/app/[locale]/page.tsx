import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { stockImages } from '@/lib/stockImages';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import StorySection from '@/components/StorySection';
import ImageBanner from '@/components/ImageBanner';
import PhotoServiceGrid from '@/components/PhotoServiceGrid';
import Collage from '@/components/Collage';
import ProcessShowcase from '@/components/ProcessShowcase';
import FormulaSection from '@/components/FormulaSection';
import PortfolioGrid from '@/components/PortfolioGrid';

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

      {/* Statement */}
      <StorySection />

      {/* Full-bleed image banner */}
      <ImageBanner image={stockImages.banner} alt={t('banner.title')} title={t('banner.title')} />

      {/* 01 Services — furniture leads, photo grid */}
      <Reveal className="mx-auto max-w-7xl px-6 pt-24">
        <p className="font-mono text-sm text-amber-600">01 — {tCommon('nav.services')}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-forest-950 sm:text-4xl">
          {t('services.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
          {t('services.lead')}
        </p>
      </Reveal>
      <Reveal className="mt-12">
        <PhotoServiceGrid namespace="services.core" />
      </Reveal>

      {/* Collage */}
      <Reveal>
        <Collage />
      </Reveal>

      {/* 02 Process */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-sm text-amber-600">02 — {tCommon('nav.process')}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-forest-950 sm:text-4xl">
          {t('process.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
          {t('process.lead')}
        </p>
        <div className="mt-12">
          <ProcessShowcase />
        </div>
      </Reveal>

      {/* Formula — design + install */}
      <Reveal>
        <FormulaSection />
      </Reveal>

      {/* 03 Portfolio teaser */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-amber-600">
              03 — {tCommon('nav.portfolio')}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-forest-950 sm:text-4xl">
              {t('portfolio.title')}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
              {t('portfolio.lead')}
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            {t('portfolio.viewAll')} →
          </Link>
        </div>
        <div className="mt-12">
          <PortfolioGrid limit={3} />
        </div>
      </Reveal>

      {/* Final CTA */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
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
