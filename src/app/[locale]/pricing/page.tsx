import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import PackageComparisonTable from '@/components/PackageComparisonTable';
import PricingFAQ from '@/components/PricingFAQ';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.pricing' });
  return { title: t('title'), description: t('description') };
}

const PACKAGES = ['consult', 'design', 'fullService'] as const;

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <section className="border-b border-amber-100 bg-forest-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-100">
            {tCommon('nav.pricing')}
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl text-linen-50 sm:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-linen-50/80">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-amber-100 bg-amber-100 sm:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <div key={pkg} className="flex flex-col bg-linen-50 p-8">
              <span className="font-mono text-xs text-stone-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 text-xs uppercase tracking-widest text-amber-600">
                {t(`packages.${pkg}.tagline`)}
              </p>
              <h3 className="mt-2 font-display text-2xl text-forest-950">
                {t(`packages.${pkg}.name`)}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                {t(`packages.${pkg}.description`)}
              </p>
              <p className="mt-6 font-mono text-sm text-amber-600">
                {t(`packages.${pkg}.price`)}
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-full border-2 border-amber-600 px-5 py-2.5 text-center text-sm font-medium text-amber-600 hover:bg-amber-100"
              >
                {tCommon('cta.getQuote')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-sm text-amber-600">{t('comparison.title')}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-forest-950 sm:text-4xl">
          {t('comparison.title')}
        </h2>
        <div className="mt-10">
          <PackageComparisonTable />
        </div>
        <p className="mt-6 text-sm text-ink/60">{t('comparison.note')}</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-sm text-amber-600">{t('faq.title')}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-forest-950 sm:text-4xl">
          {t('faq.title')}
        </h2>
        <div className="mt-10">
          <PricingFAQ />
        </div>
      </section>
    </>
  );
}
