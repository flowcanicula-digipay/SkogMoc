'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-lg border border-amber-100 bg-white px-4 py-3 text-sm text-ink placeholder:text-stone-600/60 focus:border-amber-600 focus:outline-none';
const labelClass = 'mb-2 block text-sm font-medium text-forest-950';

export default function ProjectInquiryForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  const projectTypeOptions = t.raw('projectType.options') as string[];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-amber-100 bg-amber-100/40 p-8 text-center">
        <p className="font-display text-xl text-forest-950">Thank you</p>
        <p className="mt-2 text-sm text-ink/80">
          We&apos;ve received your inquiry and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            {t('name.label')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            {t('email.label')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="phone">
            {t('phone.label')}{' '}
            <span className="text-stone-600">({t('phone.hint')})</span>
          </label>
          <input id="phone" name="phone" type="tel" maxLength={30} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="projectType">
            {t('projectType.label')}
          </label>
          <select id="projectType" name="projectType" required className={inputClass}>
            {projectTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="propertyType">
            {t('propertyType.label')}
          </label>
          <input
            id="propertyType"
            name="propertyType"
            type="text"
            maxLength={80}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="plotArea">
            {t('plotArea.label')}
          </label>
          <input id="plotArea" name="plotArea" type="text" maxLength={60} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="province">
            {t('province.label')}
          </label>
          <input id="province" name="province" type="text" maxLength={80} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="budgetRange">
            {t('budgetRange.label')}
          </label>
          <input
            id="budgetRange"
            name="budgetRange"
            type="text"
            maxLength={60}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="wantsBuildConnection"
          name="wantsBuildConnection"
          type="checkbox"
          className="h-4 w-4 rounded border-amber-100 text-amber-600 focus:ring-amber-600"
        />
        <label htmlFor="wantsBuildConnection" className="text-sm text-forest-950">
          {t('wantsBuildConnection.label')}
        </label>
      </div>

      <div>
        <label className={labelClass} htmlFor="language">
          {t('language.label')}
        </label>
        <select id="language" name="language" className={inputClass}>
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">
          {t('notes.label')}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          maxLength={2000}
          className={inputClass}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-700">
          Something went wrong sending your inquiry. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-full bg-amber-600 px-7 py-3 text-sm font-medium text-linen-50 hover:bg-amber-700 disabled:opacity-60"
      >
        {status === 'submitting' ? '…' : t('submit')}
      </button>
      <p className="text-xs text-stone-600">{t('privacy')}</p>
    </form>
  );
}
