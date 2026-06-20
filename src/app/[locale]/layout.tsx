import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans, Montserrat, Inter_Tight } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import SmoothScroll from '@/components/SmoothScroll';
import '../globals.css';

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-display',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const interMono = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://example-skogmoc-todo.vn'),
};

// Next dev's HMR relies on inline <script> tags and eval()-based source maps,
// both of which a strict `script-src 'self'` blocks — silently killing all
// client JS (hydration, GSAP, etc.) when testing via `npm run dev`. The
// production static export doesn't use either, so only the dev script-src is
// relaxed; the shipped CSP stays exactly as strict as documented.
const isDev = process.env.NODE_ENV === 'development';

const csp = [
  "default-src 'none'",
  isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://formspree.io",
  "img-src 'self' data: https://images.pexels.com",
  "base-uri 'self'",
  "form-action https://formspree.io",
].join('; ');

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${displayFont.variable} ${montserrat.variable} ${interMono.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <body className="bg-linen-50 text-ink font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <SchemaJsonLd />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
