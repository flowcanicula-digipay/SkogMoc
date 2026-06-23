import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import PricingHero from '@/components/PricingHero';
import StorySection from '@/components/StorySection';
import ManifestoSection from '@/components/ManifestoSection';
import SectionIntro from '@/components/SectionIntro';
import Reveal from '@/components/Reveal';
import BoldStatement from '@/components/BoldStatement';
import PricingPackages from '@/components/PricingPackages';
import PackageComparisonTable from '@/components/PackageComparisonTable';
import PricingFAQ from '@/components/PricingFAQ';
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
  return buildPageMetadata({ locale, namespace: 'meta.pricing', path: 'pricing' });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return (
    <>
      <PricingHero />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionIntro
          index="01"
          label={t('packages.kicker')}
          title={t('packages.title')}
          lead={t('packages.lead')}
        />
        <Reveal className="mt-12">
          <PricingPackages />
        </Reveal>

        <div className="mt-16 max-w-2xl border-l-2 border-amber-600 pl-5">
          <BoldStatement text={t('bold.text')} className="text-xl sm:text-2xl" />
        </div>
      </section>

      {/* Bold promising statement — same family as the portfolio page's
          StorySection */}
      <StorySection namespace="pricing.statement" />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionIntro
          index="02"
          label={t('comparison.title')}
          title={t('comparison.title')}
          note={t('comparison.note')}
        />
        <Reveal className="mt-10">
          <PackageComparisonTable />
        </Reveal>
      </section>

      <ManifestoSection namespace="pricing.manifesto" />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionIntro index="03" label={t('faq.title')} title={t('faq.title')} />
        <Reveal className="mt-10">
          <PricingFAQ />
        </Reveal>
      </section>

      <FinalCtaSection namespace="pricing.cta" />
    </>
  );
}
