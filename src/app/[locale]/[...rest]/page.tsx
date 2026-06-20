import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// The only static param generated here is `404`, giving each locale a real
// prerendered 404 page (out/en/404/index.html etc) for Apache's ErrorDocument
// to point to. Arbitrary unmatched paths are never prerendered — Apache
// catches those at the HTTP layer and serves this page instead.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, rest: ['404'] }));
}

export default function CatchAll() {
  notFound();
}
