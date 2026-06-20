import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import ServicesGrid from '@/components/ServicesGrid';
import HowItWorks from '@/components/HowItWorks';
import InstallationBanner from '@/components/InstallationBanner';
import PortfolioGrid from '@/components/PortfolioGrid';
import SquiggleAccent from '@/components/SquiggleAccent';

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

      {/* 01 About */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <p className="font-mono text-sm text-amber-600">01 — {tCommon('nav.home')}</p>
          <div>
            <h2 className="relative inline-block font-display text-3xl text-forest-950 sm:text-4xl">
              {t('about.title')}
              <SquiggleAccent className="absolute -right-12 -top-6 h-12 w-16 text-moss-500 sm:-right-16 sm:h-14 sm:w-20" />
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
              {t('about.body')}
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['point1', 'point2', 'point3', 'point4'].map((p) => (
                <li
                  key={p}
                  className="border-l-2 border-amber-600 pl-4 text-sm leading-relaxed text-ink/80"
                >
                  {t(`about.${p}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* 02 Services — furniture leads */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-sm text-amber-600">02 — {tCommon('nav.services')}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-forest-950 sm:text-4xl">
          {t('services.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
          {t('services.lead')}
        </p>
        <div className="mt-12">
          <ServicesGrid namespace="services.core" />
        </div>
      </Reveal>

      {/* 03 Process */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-sm text-amber-600">03 — {tCommon('nav.process')}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-forest-950 sm:text-4xl">
          {t('process.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
          {t('process.lead')}
        </p>
        <div className="mt-12">
          <HowItWorks />
        </div>
      </Reveal>

      {/* Installation */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
        <InstallationBanner />
      </Reveal>

      {/* 04 Portfolio teaser */}
      <Reveal className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-amber-600">
              04 — {tCommon('nav.portfolio')}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl text-forest-950 sm:text-4xl">
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
          <h2 className="font-display text-3xl text-linen-50 sm:text-4xl">
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
