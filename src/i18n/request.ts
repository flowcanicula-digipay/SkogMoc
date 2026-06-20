import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

function isSupportedLocale(value: string | undefined): value is Locale {
  return routing.locales.includes(value as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
