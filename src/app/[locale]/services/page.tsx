import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ServicesHero from '@/components/ServicesHero';
import ManifestoSection from '@/components/ManifestoSection';
import PhotoServiceGrid from '@/components/PhotoServiceGrid';
import StorySection from '@/components/StorySection';
import InstallationBanner from '@/components/InstallationBanner';
import ServicesProcessStrip from '@/components/ServicesProcessStrip';
import ExtendedServicesShowcase from '@/components/ExtendedServicesShowcase';
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
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return { title: t('title'), description: t('description') };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      <ServicesHero />

      <ManifestoSection namespace="services.manifesto" />

      {/* 01 — Core disciplines, full-bleed interactive row to match the
          home page's intensity rather than the old static tile grid */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <SectionIntro
          index="01"
          label={t('core.kicker')}
          title={t('core.title')}
          lead={t('core.lead')}
        />
      </section>
      <Reveal as="div" className="mt-12 w-full">
        <PhotoServiceGrid namespace="services.core" />
      </Reveal>

      {/* Positioning statement — architecture-led identity, real locations */}
      <StorySection namespace="services.statement" />

      {/* 02 — Furniture installation, a direct service — full-bleed bold statement */}
      <InstallationBanner namespace="services.installation" />

      {/* 03 — How it works, compact teaser linking to /process */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionIntro
          index="03"
          label={t('process.kicker')}
          title={t('process.title')}
          lead={t('process.lead')}
        />
        <Reveal className="mt-12">
          <ServicesProcessStrip />
        </Reveal>
      </section>

      {/* 04 — Extended specialist network */}
      <section className="relative overflow-hidden mx-auto max-w-7xl px-6 py-24">
        <SectionIntro
          index="04"
          label={t('extended.kicker')}
          title={t('extended.title')}
          lead={t('extended.lead')}
        />
        <Reveal className="mt-12">
          <ExtendedServicesShowcase namespace="services.extended" />
        </Reveal>

        <div className="mt-14 max-w-2xl border-l-2 border-amber-600 pl-5">
          <BoldStatement text={t('proof.text')} className="text-xl sm:text-2xl" />
        </div>
      </section>

      <FinalCtaSection namespace="services.cta" />
    </>
  );
}
