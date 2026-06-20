// TODO: replace placeholder portfolio cards with real projects
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
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
  const t = await getTranslations({ locale, namespace: 'meta.portfolio' });
  return { title: t('title'), description: t('description') };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <section className="border-b border-amber-100 bg-forest-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-100">
            {tCommon('nav.portfolio')}
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
        <PortfolioGrid />
      </section>
    </>
  );
}
