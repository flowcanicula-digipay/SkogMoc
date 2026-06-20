'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const LABELS: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  ja: '日本語',
};

export default function LanguageSwitcher({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = variant === 'dark';

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function selectLocale(loc: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: loc });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isDark ? 'text-linen-50 hover:bg-forest-800' : 'text-forest-950 hover:bg-amber-100'
        }`}
      >
        <Globe className="h-4 w-4 text-amber-600" aria-hidden="true" />
        <span>{LABELS[locale]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isDark ? 'text-stone-600' : 'text-stone-600'} ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-amber-100 bg-white py-1 shadow-lg"
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => selectLocale(loc)}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm transition-colors duration-150 ${
                  loc === locale
                    ? 'text-amber-600 font-medium'
                    : 'text-ink hover:bg-amber-100'
                }`}
              >
                {LABELS[loc]}
                {loc === locale && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
