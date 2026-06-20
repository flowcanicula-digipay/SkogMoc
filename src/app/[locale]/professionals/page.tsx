import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProfessionalInquiryForm from '@/components/ProfessionalInquiryForm';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.professionals' });
  return { title: t('title'), description: t('description') };
}

export default async function ProfessionalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'professionals' });

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-amber-600">
        {t('hero.title')}
      </p>
      <h1 className="mt-6 max-w-2xl font-display text-4xl text-forest-950 sm:text-5xl">
        {t('hero.title')}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80">
        {t('hero.subtitle')}
      </p>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">
        <ProfessionalInquiryForm />

        <aside className="space-y-10 border-t border-amber-100 pt-10 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {/* TODO: temporary stock placeholder — replace with real studio/site photography */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/assets/images/professionals/professionals-bg.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-stone-600">
              {t('sidebar.direct.title')}
            </p>
            <p className="mt-3 text-sm text-ink/80">thuy@tnpgr.vn</p>
            <p className="mt-1 text-sm text-ink/80">+84 90 333 37 29</p>
            <p className="mt-4 text-sm text-ink/60">{t('sidebar.hours')}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-stone-600">
              {t('sidebar.next.title')}
            </p>
            <ol className="mt-3 space-y-2 text-sm text-ink/80">
              <li>1. {t('sidebar.next.step1')}</li>
              <li>2. {t('sidebar.next.step2')}</li>
            </ol>
          </div>

          <p className="text-sm text-ink/60">{t('sidebar.trust')}</p>
        </aside>
      </div>
    </section>
  );
}
