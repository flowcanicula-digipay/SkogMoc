'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { withBasePath } from '@/lib/assetPath';

// Avoids the SSR-only "useLayoutEffect does nothing on the server" warning
// during static export, while still running synchronously before paint in
// the browser — that's what hides the header before it can flash visible.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/pricing', key: 'pricing' },
  { href: '/process', key: 'process' },
  { href: '/professionals', key: 'professionals' },
] as const;

export default function Header() {
  const t = useTranslations('common.nav');
  const tCta = useTranslations('common.cta');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isHome = pathname === '/';
  const isServices = pathname.startsWith('/services');
  const isPortfolio = pathname.startsWith('/portfolio');
  const isPricing = pathname.startsWith('/pricing');
  const isProcess = pathname.startsWith('/process');
  const isContact = pathname.startsWith('/contact');
  const isProfessionals = pathname.startsWith('/professionals');
  // These pages all open with a full GSAP intro hero — the header stays
  // hidden until that hero settles, then makes a visibly delayed entrance
  // rather than competing with it. Services, Portfolio, Pricing, and
  // Process's hero timelines run a beat longer (kicker + two-line
  // headline), so they get a longer, more noticeable gap. Contact and
  // Professionals' heroes are shorter, single-line reveals, so they get a
  // shorter gap.
  const heroDelay = isHome
    ? 2.8
    : isContact || isProfessionals
      ? 2.6
      : isServices || isPortfolio || isPricing || isProcess
        ? 3.4
        : null;

  useIsomorphicLayoutEffect(() => {
    if (heroDelay === null || !headerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.set(headerRef.current, { y: -80, opacity: 0 });
    const tween = gsap.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay: heroDelay,
      ease: 'power3.out',
    });

    return () => {
      tween.kill();
    };
  }, [heroDelay]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b-2 border-amber-600 bg-forest-950"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath('/assets/logo/logo-mark-light.png')}
            alt="Skog Mộc by TNP"
            className="h-10 w-10 transition-opacity group-hover:opacity-80"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base tracking-[0.08em] text-linen-50">
              SKOG MỘC
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600">
              by TNP &mdash; Design Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          {NAV_ITEMS.map((item, i) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <span key={item.key} className="flex items-center">
                {i > 0 && <span className="mx-3 h-3 w-px bg-forest-800" aria-hidden="true" />}
                <Link
                  href={item.href}
                  className={`group relative py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive ? 'text-amber-600' : 'text-stone-600 hover:text-linen-50'
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-600 transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </span>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher variant="dark" />
          <Link
            href="/contact"
            className="rounded-full border border-amber-600 bg-amber-600 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-linen-50 transition-colors hover:bg-amber-700"
          >
            {tCta('startProject')}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-linen-50 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-forest-800 bg-forest-950 px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-stone-600 hover:text-amber-600"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full border border-amber-600 bg-amber-600 px-5 py-2.5 text-center text-xs font-medium uppercase tracking-[0.1em] text-linen-50"
            >
              {tCta('startProject')}
            </Link>
            <LanguageSwitcher variant="dark" />
          </nav>
        </div>
      )}
    </header>
  );
}
