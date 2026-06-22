'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

export default function PricingFAQ() {
  const t = useTranslations('pricing.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-amber-100 rounded-2xl border border-amber-100 bg-white px-6 sm:px-8">
      {QUESTIONS.map((q, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-semibold text-forest-950">
                {t(`${q}.question`)}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-amber-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="pb-5 max-w-2xl text-sm leading-relaxed text-ink/80">
                {t(`${q}.answer`)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
