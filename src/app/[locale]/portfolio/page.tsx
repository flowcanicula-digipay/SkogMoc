// TODO: replace placeholder portfolio cards with real projects
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import PortfolioHero from '@/components/PortfolioHero';
import ManifestoSection from '@/components/ManifestoSection';
import PortfolioLocations from '@/components/PortfolioLocations';
import StorySection from '@/components/StorySection';
import PortfolioGrid from '@/components/PortfolioGrid';
import BoldStatement from '@/components/BoldStatement';
import FinalCtaSection from '@/components/FinalCtaSection';
import SectionIntro from '@/components/SectionIntro';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    namespace: 'meta.portfolio',
    path: 'portfolio',
    imagePath: '/assets/images/installations/installation-grand-1.jpg',
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'portfolio' });

  return (
    <>
      <PortfolioHero />

      <ManifestoSection namespace="portfolio.manifesto" />

      <PortfolioLocations />

      {/* Positioning statement — honest about the furniture-heavy track
          record without contradicting the general-practice identity */}
      <StorySection namespace="portfolio.statement" />

      {/* The work — filterable grid, still placeholder photography */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionIntro
          index="01"
          label={t('gridIntro.kicker')}
          title={t('gridIntro.title')}
          lead={t('gridIntro.lead')}
        />
        <Reveal className="mt-12">
          <PortfolioGrid />
        </Reveal>
        <BoldStatement
          text={t('note.body')}
          className="mx-auto mt-14 max-w-2xl text-center text-2xl sm:text-3xl"
        />
      </section>

      <FinalCtaSection namespace="portfolio.cta" />
    </>
  );
}
