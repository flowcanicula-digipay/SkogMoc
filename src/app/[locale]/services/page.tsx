import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ServicesGrid from '@/components/ServicesGrid';
import InstallationBanner from '@/components/InstallationBanner';
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
  const tNav = await getTranslations({ locale, namespace: 'common.nav' });

  const extendedItems = t.raw('extended.items') as {
    title: string;
    discipline: string;
    body: string;
  }[];

  return (
    <>
      <section className="border-b border-amber-100 bg-forest-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-100">
            {tNav('services')}
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
        <p className="font-mono text-sm text-amber-600">01 — {t('core.title')}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-forest-950 sm:text-4xl">
          {t('core.title')}
        </h2>
        <div className="mt-12">
          <ServicesGrid namespace="services.core" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-sm text-amber-600">02 — {t('installation.title')}</p>
        <div className="mt-8">
          <InstallationBanner namespace="services.installation" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-sm text-amber-600">03 — {t('extended.title')}</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl text-forest-950 sm:text-4xl">
            {t('extended.title')}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
            {t('extended.lead')}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {extendedItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-amber-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-600/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="font-mono text-xs text-stone-600 transition-colors group-hover:text-amber-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-forest-950">
                  {item.title}
                </p>
                <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  {item.discipline}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.body}</p>
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-amber-600 transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink/60">{t('extended.note')}</p>
      </section>
    </>
  );
}
