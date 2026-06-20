import { useTranslations } from 'next-intl';

export default function InstallationBanner({
  namespace = 'home.installation',
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);

  return (
    <div className="rounded-2xl bg-moss-500 px-8 py-12 text-linen-50 sm:px-14 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-linen-50/70">
        Furniture · Installation
      </p>
      <h3 className="mt-4 max-w-2xl font-display text-2xl sm:text-3xl">{t('title')}</h3>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-linen-50/85">{t('body')}</p>
    </div>
  );
}
