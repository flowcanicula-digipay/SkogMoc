import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.privacy' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: true },
  };
}

const SECTIONS = ['s01', 's02', 's03', 's04', 's05', 's06'] as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl text-forest-950">{t('title')}</h1>
      <p className="mt-3 text-sm text-stone-600">
        {t('lastUpdated') === 'TODO' ? 'Last updated: TODO' : t('lastUpdated')}
      </p>
      <p className="mt-8 text-base leading-relaxed text-ink/80">{t('intro')}</p>

      <div className="mt-12 space-y-12">
        {SECTIONS.map((s) => (
          <div key={s} className="flex gap-6">
            <span className="font-display text-4xl text-amber-100">{s.slice(1)}</span>
            <div>
              <h2 className="font-display text-xl text-forest-950">{t(`${s}.heading`)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{t(`${s}.body`)}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-16 inline-block text-sm font-medium text-amber-600 hover:text-amber-700"
      >
        ← {t('backHome')}
      </Link>
    </section>
  );
}
