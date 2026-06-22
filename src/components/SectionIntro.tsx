'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionIntro({
  index,
  label,
  title,
  lead,
  note,
  className = '',
}: {
  index?: string;
  label: string;
  title: string;
  lead?: string;
  note?: string;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !titleRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const titleSplit = new SplitType(titleRef.current, { types: 'lines,words' });
    const leadSplit = leadRef.current ? new SplitType(leadRef.current, { types: 'lines' }) : null;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%' },
    });

    tl.from(ruleRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.5, ease: 'power3.out' }).from(
      titleSplit.words,
      { yPercent: 110, opacity: 0, ease: 'circ.out', duration: 0.9, stagger: 0.025 },
      '<0.1',
    );
    if (leadSplit) {
      tl.from(leadSplit.lines, { yPercent: 100, opacity: 0, ease: 'power3.out', duration: 0.7, stagger: 0.06 }, '<0.25');
    }
    if (noteRef.current) {
      tl.from(noteRef.current, { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' }, '<0.15');
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      titleSplit.revert();
      leadSplit?.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      <p className="flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
        <span ref={ruleRef} className="h-px w-8 bg-amber-600" aria-hidden="true" />
        {index ? `${index} — ${label}` : label}
      </p>
      <h2
        ref={titleRef}
        className="section-intro-split mt-5 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {lead && (
        <p ref={leadRef} className="section-intro-split mt-4 max-w-xl text-base leading-relaxed text-ink/80">
          {lead}
        </p>
      )}
      {note && (
        <p ref={noteRef} className="mt-6 max-w-2xl border-l-2 border-amber-600/40 pl-4 text-sm leading-relaxed text-ink/60">
          {note}
        </p>
      )}
    </div>
  );
}
