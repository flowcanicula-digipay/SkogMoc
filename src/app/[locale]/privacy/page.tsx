import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import PrivacyHeader from '@/components/PrivacyHeader';
import TopoPattern from '@/components/TopoPattern';
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
    <section className="relative mx-auto max-w-3xl overflow-hidden px-6 py-24">
      <TopoPattern className="right-0 top-0 h-auto w-[60%] text-forest-950 opacity-[0.05]" />

      <div className="relative z-10">
        <PrivacyHeader />

        <div className="mt-12 space-y-12">
          {SECTIONS.map((s, i) => (
            <Reveal key={s} delay={i * 0.06}>
              <div className="flex gap-6">
                <span className="font-display text-4xl text-amber-100">{s.slice(1)}</span>
                <div>
                  <h2 className="font-display text-xl text-forest-950">{t(`${s}.heading`)}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">{t(`${s}.body`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={SECTIONS.length * 0.06}>
          <Link
            href="/"
            className="mt-16 inline-block text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            ← {t('backHome')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
