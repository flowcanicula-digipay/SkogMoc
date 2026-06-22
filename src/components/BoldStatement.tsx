'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BoldStatement({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const split = new SplitType(ref.current, { types: 'lines,words' });
    const tween = gsap.from(split.words, {
      yPercent: 110,
      opacity: 0,
      ease: 'circ.out',
      duration: 0.8,
      stagger: 0.02,
      scrollTrigger: { trigger: ref.current, start: 'top 88%' },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, []);

  return (
    <p
      ref={ref}
      className={`bold-statement-split font-display font-extrabold tracking-tight text-forest-950 ${className}`}
    >
      {text}
    </p>
  );
}
