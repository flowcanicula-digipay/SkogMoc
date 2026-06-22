'use client';

import { useEffect, useRef, type ReactNode, type Ref } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tween = gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
