'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ElegantSelect from './ElegantSelect';
import { withBasePath } from '@/lib/assetPath';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Underline-only fields, transparent ground — the boutique-catalogue feel
// the boxed/bordered inputs didn't have. Weight and tracking carry the
// elegance rather than a serif face, since the brand's display font
// (Plus Jakarta Sans) was chosen specifically for its Vietnamese subset
// support — see CLAUDE.md's note on font selection.
const inputClass =
  'w-full border-0 border-b border-amber-100 bg-transparent px-0 py-3 text-[15px] font-light text-forest-950 placeholder:font-light placeholder:text-stone-600/40 transition-colors duration-300 focus:border-amber-600 focus:outline-none focus:ring-0';
const labelClass = 'mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-600';

export default function ProjectInquiryForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const projectTypeOptions = t.raw('projectType.options') as string[];

  useEffect(() => {
    const form = formRef.current;
    if (!form || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const fields = form.querySelectorAll('[data-field]');
    const tween = gsap.from(fields, {
      opacity: 0,
      y: 18,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.06,
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (status !== 'success' || !successRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    gsap.from(successRef.current, { opacity: 0, y: 16, scale: 0.97, duration: 0.6, ease: 'back.out(1.6)' });
    gsap.from(successRef.current.querySelector('[data-success-icon]'), {
      scale: 0,
      rotate: -45,
      duration: 0.7,
      ease: 'back.out(2.2)',
      delay: 0.1,
    });
  }, [status]);

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
      <div
        ref={successRef}
        className="rounded-2xl border border-amber-600/25 bg-gradient-to-br from-amber-100/50 via-white to-amber-100/30 p-10 text-center"
      >
        <span
          data-success-icon
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-amber-600 to-amber-700 shadow-[0_0_30px_rgba(217,138,43,0.45)]"
        >
          <CheckCircle2 size={28} className="text-linen-50" />
        </span>
        <p className="mt-5 font-display text-2xl font-bold text-forest-950">
          {t('success.title')}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/75">
          {t('success.body')}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
      <div data-field>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-forest-950 sm:text-3xl">
          {t('formTitle')}
        </h2>
        <span className="mt-5 block h-px w-16 bg-gradient-to-r from-amber-600 to-transparent" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
        <div data-field>
          <label className={labelClass} htmlFor="name">
            {t('name.label')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            placeholder={t('name.placeholder')}
            className={inputClass}
          />
        </div>
        <div data-field>
          <label className={labelClass} htmlFor="email">
            {t('email.label')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            placeholder={t('email.placeholder')}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
        <div data-field>
          <label className={labelClass} htmlFor="phone">
            {t('phone.label')}{' '}
            <span className="text-stone-600/70">({t('phone.hint')})</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={30}
            placeholder={t('phone.placeholder')}
            className={inputClass}
          />
        </div>
        <div data-field>
          <label className={labelClass} htmlFor="projectType">
            {t('projectType.label')}
          </label>
          <ElegantSelect
            id="projectType"
            name="projectType"
            options={projectTypeOptions.map((opt) => ({ value: opt, label: opt }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
        <div data-field>
          <label className={labelClass} htmlFor="propertyType">
            {t('propertyType.label')}
          </label>
          <input
            id="propertyType"
            name="propertyType"
            type="text"
            maxLength={80}
            placeholder={t('propertyType.placeholder')}
            className={inputClass}
          />
        </div>
        <div data-field>
          <label className={labelClass} htmlFor="plotArea">
            {t('plotArea.label')}
          </label>
          <input
            id="plotArea"
            name="plotArea"
            type="text"
            maxLength={60}
            placeholder={t('plotArea.placeholder')}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
        <div data-field>
          <label className={labelClass} htmlFor="province">
            {t('province.label')}
          </label>
          <input
            id="province"
            name="province"
            type="text"
            maxLength={80}
            placeholder={t('province.placeholder')}
            className={inputClass}
          />
        </div>
        <div data-field>
          <label className={labelClass} htmlFor="budgetRange">
            {t('budgetRange.label')}
          </label>
          <input
            id="budgetRange"
            name="budgetRange"
            type="text"
            maxLength={60}
            placeholder={t('budgetRange.placeholder')}
            className={inputClass}
          />
        </div>
      </div>

      <div data-field>
        <label htmlFor="wantsInstallation" className="flex cursor-pointer items-center gap-3">
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-sm">
            <input
              id="wantsInstallation"
              name="wantsInstallation"
              type="checkbox"
              className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-sm border border-amber-600/40 bg-linen-50 transition-colors duration-200 checked:border-amber-600"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath('/assets/images/portfolio/motifs/flag-vn.svg')}
              alt=""
              className="pointer-events-none h-3 w-4 scale-110 object-contain opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
            />
          </span>
          <span className="text-sm font-light text-forest-950">{t('wantsInstallation.label')}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
        <div data-field>
          <label className={labelClass} htmlFor="language">
            {t('language.label')}
          </label>
          <ElegantSelect
            id="language"
            name="language"
            options={[
              { value: 'en', label: 'English' },
              { value: 'vi', label: 'Tiếng Việt' },
              { value: 'ja', label: '日本語' },
            ]}
          />
        </div>
      </div>

      <div data-field>
        <label className={labelClass} htmlFor="notes">
          {t('notes.label')}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          maxLength={2000}
          placeholder={t('notes.placeholder')}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p data-field className="text-sm text-red-700">
          {t('error')}
        </p>
      )}

      <div data-field className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 py-1.5 pl-7 pr-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-linen-50 shadow-[0_0_24px_rgba(217,138,43,0.35)] transition-all duration-200 hover:brightness-110 disabled:opacity-60"
        >
          {status === 'submitting' ? '…' : t('submit')}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950 text-linen-50 transition-transform group-hover:translate-x-0.5">
            <ArrowRight size={16} />
          </span>
        </button>
        <p className="text-xs font-light text-stone-600">{t('privacy')}</p>
      </div>
    </form>
  );
}
