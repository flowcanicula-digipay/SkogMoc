import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-forest-950 px-6 py-24 text-center">
      <svg
        width="120"
        height="90"
        viewBox="0 0 120 90"
        className="text-amber-600"
        aria-hidden="true"
      >
        <path
          d="M10 80 L10 40 L60 15 L110 40 L110 80 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line x1="10" y1="80" x2="110" y2="80" stroke="currentColor" strokeWidth="2" />
      </svg>

      <p className="mt-8 font-display text-[clamp(6rem,20vw,12rem)] leading-none text-linen-50">
        {t('title')}
      </p>
      <p className="mt-2 font-display text-2xl text-amber-100">{t('tagline')}</p>
      <p className="mx-auto mt-6 max-w-md text-base text-linen-50/70">{t('body')}</p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-amber-600 px-7 py-3 text-sm font-medium text-linen-50 hover:bg-amber-700"
        >
          {t('goHome')}
        </Link>
        <Link
          href="/contact"
          className="rounded-full border-2 border-linen-50/60 px-7 py-3 text-sm font-medium text-linen-50 hover:border-amber-600 hover:text-amber-600"
        >
          {t('contact')}
        </Link>
      </div>
    </div>
  );
}
