import { useTranslations } from 'next-intl';
import { Instagram, Facebook } from 'lucide-react';
import { Link } from '@/i18n/navigation';

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
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Skog Mộc</p>
            <p className="mt-3 max-w-xs text-sm text-stone-600">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex gap-4">
              {/* TODO: add social URLs */}
              <Instagram size={18} className="text-stone-600" />
              <Facebook size={18} className="text-stone-600" />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-stone-600">
              {t('nav.home')}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-linen-50/90 hover:text-amber-600"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-stone-600">
              {t('footer.address')}
            </p>
            <p className="mt-4 text-sm text-linen-50/90">
              Lô 35 đường số 9, KCN Tam Phước, Biên Hòa, Vietnam
            </p>
            <p className="mt-2 text-sm text-linen-50/90">thuy@tnpgr.vn</p>
            <p className="mt-2 text-sm text-linen-50/90">+84 90 333 37 29</p>
            {/* TODO: add trust badges */}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-forest-800 pt-6 text-xs text-stone-600 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Skog Mộc. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-amber-600">
            {t('footer.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
