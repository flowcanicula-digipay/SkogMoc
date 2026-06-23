'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function PrivacyHeader() {
  const t = useTranslations('privacy');
  const ruleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !introRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const title = new SplitType(titleRef.current, { types: 'lines,words' });
    const intro = new SplitType(introRef.current, { types: 'lines' });

    const tl = gsap.timeline();
    tl.from(ruleRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.5, ease: 'power3.out' })
      .from(title.words, { yPercent: 110, opacity: 0, ease: 'circ.out', duration: 0.8, stagger: 0.025 }, '<0.1')
      .from(metaRef.current, { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out' }, '<0.2')
      .from(intro.lines, { yPercent: 100, opacity: 0, ease: 'power3.out', duration: 0.7, stagger: 0.06 }, '<0.1');

    return () => {
      tl.kill();
      title.revert();
      intro.revert();
    };
  }, []);

  return (
    <div>
      <span ref={ruleRef} className="block h-px w-8 bg-amber-600" aria-hidden="true" />
      <h1
        ref={titleRef}
        className="privacy-header-split mt-5 font-display text-4xl font-extrabold tracking-tight text-forest-950"
      >
        {t('title')}
      </h1>
      <p ref={metaRef} className="mt-3 text-sm text-stone-600">
        {t('lastUpdated')}
      </p>
      <p
        ref={introRef}
        className="privacy-header-split mt-8 text-base leading-relaxed text-ink/80"
      >
        {t('intro')}
      </p>
    </div>
  );
}
