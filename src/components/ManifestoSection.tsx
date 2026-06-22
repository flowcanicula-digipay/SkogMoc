'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import TopoPattern from './TopoPattern';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function RoofMotif() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 right-[6%] h-auto w-[34%] text-moss-500 opacity-[0.12] sm:right-[10%]"
      viewBox="0 0 400 220"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2">
        <path d="M20 200 Q60 120 130 96 Q150 60 200 60 Q250 60 270 96 Q340 120 380 200" />
        <path d="M60 200 Q90 140 150 120 Q170 90 200 90 Q230 90 250 120 Q310 140 340 200" />
        <line x1="200" y1="60" x2="200" y2="20" />
        <circle cx="200" cy="16" r="4" />
      </g>
    </svg>
  );
}

export default function ManifestoSection({ namespace = 'home.manifesto' }: { namespace?: string }) {
  const t = useTranslations(namespace);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !titleRef.current ||
      !captionRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const title = new SplitType(titleRef.current, { types: 'lines,words' });
    const caption = new SplitType(captionRef.current, { types: 'lines' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });
    tl.from(title.words, {
      yPercent: 120,
      rotationZ: () => gsap.utils.random(-6, 6),
      opacity: 0,
      ease: 'circ.out',
      duration: 0.9,
      stagger: 0.025,
    }).from(
      caption.lines,
      { yPercent: 100, opacity: 0, ease: 'power3.out', duration: 0.7, stagger: 0.08 },
      '<0.3',
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      title.revert();
      caption.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linen-50 px-6 py-20 sm:px-[6vw] sm:py-28"
    >
      <TopoPattern className="right-0 top-0 h-auto w-[60%] text-forest-950 opacity-[0.07]" />
      <TopoPattern flip className="left-0 bottom-0 h-auto w-[45%] text-moss-500 opacity-[0.06]" />
      <RoofMotif />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="font-mono text-sm uppercase tracking-wide text-amber-600">
          — {t('eyebrow')}
        </p>

        <h2
          ref={titleRef}
          className="manifesto-split mt-5 max-w-4xl font-display text-[clamp(1.875rem,5.2vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-forest-950"
        >
          {t.rich('title', {
            accent: (chunks) => <span className="text-amber-600">{chunks}</span>,
          })}
        </h2>

        <p
          ref={captionRef}
          className="manifesto-split mt-8 max-w-md font-display text-base italic leading-relaxed text-stone-600"
        >
          {t('caption')}
        </p>
      </div>
    </section>
  );
}
