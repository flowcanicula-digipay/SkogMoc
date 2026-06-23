import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { withBasePath } from '@/lib/assetPath';

// TODO: replace with the real production domain before launch (see CLAUDE.md
// Owner Action Items #2) — kept as one constant so SchemaJsonLd.tsx and every
// page's metadata resolve the same placeholder instead of drifting apart.
export const SITE_URL = 'https://skogmoc-todo.vn';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  vi: 'vi_VN',
  ja: 'ja_JP',
};

const DEFAULT_OG_IMAGE = '/assets/images/stock/hero-bg.jpg';

/**
 * Builds title/description/keywords/openGraph/twitter/alternates (canonical +
 * hreflang) for a page from its `meta.<namespace>` translation keys. Centralized
 * because `metadataBase` does not auto-prepend `basePath` for any of these
 * fields (same gap as the favicon/manifest bug) — `withBasePath()` here keeps
 * GitHub Pages' `/SkogMoc` sub-path and Hostinger/Vercel's root path both correct.
 */
export async function buildPageMetadata({
  locale,
  namespace,
  path,
  imagePath = DEFAULT_OG_IMAGE,
  robots,
}: {
  locale: string;
  namespace: string;
  path: string;
  imagePath?: string;
  robots?: Metadata['robots'];
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t('title');
  const description = t('description');

  let keywords: string[] | undefined;
  try {
    keywords = t.raw('keywords') as string[];
  } catch {
    keywords = undefined;
  }

  const cleanPath = path ? `/${path}/` : '/';
  const localePath = (l: string) => withBasePath(`/${l}${cleanPath}`);
  const ogImageUrl = `${SITE_URL}${withBasePath(imagePath)}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: localePath(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l)])),
        'x-default': localePath(routing.defaultLocale),
      },
    },
    openGraph: {
      title,
      description,
      url: localePath(locale),
      siteName: 'Skog Mộc by TNP',
      locale: OG_LOCALE[locale as Locale],
      type: 'website',
      images: [{ url: ogImageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    ...(robots ? { robots } : {}),
  };
}
