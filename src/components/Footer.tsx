import { useTranslations } from 'next-intl';
import { Instagram, Facebook } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import TopoPattern from './TopoPattern';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/pricing', key: 'pricing' },
  { href: '/process', key: 'process' },
  { href: '/professionals', key: 'professionals' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="border-t border-amber-100 bg-forest-950 text-linen-50">
      <div className="relative overflow-hidden px-6 py-20 sm:px-[6vw]">
        <TopoPattern className="right-0 top-0 hidden h-auto w-[28%] text-stone-600 opacity-30 lg:block" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <h2 className="whitespace-pre-line font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-linen-50">
              {t('footer.ctaTitle')}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-linen-50/70">
              {t('footer.ctaBody')}
            </p>
            <a
              href="mailto:thuy@tnpgr.vn"
              className="mt-6 inline-block border-b border-linen-50/40 text-lg text-linen-50 hover:border-amber-600 hover:text-amber-600"
            >
              thuy@tnpgr.vn
            </a>

            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
              <Link
                href="/contact"
                className="border-b border-stone-600 pb-1 text-sm text-linen-50/90 hover:border-amber-600 hover:text-amber-600"
              >
                {t('cta.startProject')}
              </Link>
              <Link
                href="/professionals"
                className="border-b border-stone-600 pb-1 text-sm text-linen-50/90 hover:border-amber-600 hover:text-amber-600"
              >
                {t('nav.professionals')}
              </Link>
            </div>

            <div className="mt-10 flex gap-5">
              {/* TODO: add social URLs */}
              <Instagram size={18} className="text-stone-600 hover:text-amber-600" />
              <Facebook size={18} className="text-stone-600 hover:text-amber-600" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 text-sm text-linen-50/70 lg:items-end lg:text-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo/logo-mark-light.png" alt="Skog Mộc by TNP" className="h-12 w-12" />
            <p className="max-w-[14rem] font-display text-base text-linen-50">
              {t('footer.tagline')}
            </p>
            <p>{t('footer.address')}</p>
            <p>Lô 35 đường số 9, KCN Tam Phước, Biên Hòa, Vietnam</p>
            <p>+84 90 333 37 29</p>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-800 px-6 py-6 sm:px-[6vw]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-xs text-stone-600 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Skog Mộc. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <Link key={item.key} href={item.href} className="hover:text-amber-600">
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <Link href="/privacy" className="hover:text-amber-600">
            {t('footer.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
