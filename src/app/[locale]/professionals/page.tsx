import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProfessionalsHero from '@/components/ProfessionalsHero';
import ProfessionalInquiryForm from '@/components/ProfessionalInquiryForm';
import Reveal from '@/components/Reveal';

const MOTIFS_DIR = '/assets/images/professionals/motifs';

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
    <>
      <ProfessionalsHero />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-amber-600/20 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(217,138,43,0.25)] sm:p-10">
              <ProfessionalInquiryForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} as="div">
            <aside className="space-y-10">
              {/* TODO: temporary stock placeholder — replace with real studio/site photography */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-amber-600/25 shadow-[0_20px_45px_-20px_rgba(217,138,43,0.35)]">
                <Image
                  src="/assets/images/professionals/professionals-bg.jpg"
                  alt=""
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/0 to-transparent" />
                <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-100/30" aria-hidden="true" />
              </div>

              <div className="rounded-2xl border border-amber-600/20 bg-white p-7 shadow-[0_20px_40px_-25px_rgba(217,138,43,0.25)]">
                <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-amber-600">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${MOTIFS_DIR}/blueprint-seal.svg`} alt="" className="h-5 w-5" />
                  {t('sidebar.direct.title')}
                </p>
                <div className="mt-4 space-y-2.5">
                  <a
                    href="mailto:thuyken52914@yahoo.com.vn"
                    className="flex items-center gap-2.5 text-sm text-ink/80 transition-colors hover:text-amber-600"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${MOTIFS_DIR}/blueprint-seal.svg`} alt="" className="h-4 w-4 opacity-80" />
                    thuyken52914@yahoo.com.vn
                  </a>
                  <a
                    href="tel:+84903333729"
                    className="flex items-center gap-2.5 text-sm text-ink/80 transition-colors hover:text-amber-600"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${MOTIFS_DIR}/luban-ruler.svg`} alt="" className="h-4 w-4 opacity-80" />
                    +84 90 333 37 29
                  </a>
                </div>
                <span className="mt-5 block h-px w-full bg-gradient-to-r from-amber-600/30 via-amber-600/10 to-transparent" />
                <p className="mt-4 flex items-start gap-2.5 text-sm text-ink/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${MOTIFS_DIR}/watch-drum.svg`} alt="" className="mt-0.5 h-5 w-5 shrink-0" />
                  {t('sidebar.hours')}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-600/20 bg-white p-7 shadow-[0_20px_40px_-25px_rgba(217,138,43,0.25)]">
                <p className="font-mono text-xs uppercase tracking-widest text-amber-600">
                  {t('sidebar.next.title')}
                </p>
                <ol className="mt-4 space-y-4">
                  {[t('sidebar.next.step1'), t('sidebar.next.step2')].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-amber-600 to-amber-700 font-mono text-[11px] font-bold text-linen-50 shadow-sm">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink/80">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="flex items-start gap-2.5 text-sm text-ink/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${MOTIFS_DIR}/compass-seal.svg`} alt="" className="mt-0.5 h-5 w-5 shrink-0" />
                {t('sidebar.trust')}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
