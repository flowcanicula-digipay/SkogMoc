'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stockImages } from '@/lib/stockImages';
import TopoPattern from './TopoPattern';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  { key: 'word1', image: stockImages.collage1 },
  { key: 'word2', image: stockImages.collage3 },
] as const;

export default function Collage() {
  const t = useTranslations('home.collage');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const rows = section.querySelectorAll<HTMLElement>('[data-row]');
    const triggers = Array.from(rows).map((row, i) =>
      ScrollTrigger.create({
        trigger: row,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      }),
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-linen-50 px-6 py-24 sm:px-[6vw] sm:py-32"
    >
      <TopoPattern className="right-0 top-0 h-auto w-[55%] text-forest-950 opacity-[0.06]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 sm:items-center">
        <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-2xl sm:h-[520px]">
          {items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.key}
              src={item.image}
              alt={t(item.key)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                active === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <ul className="border-y border-forest-950/10">
          {items.map((item, i) => (
            <li
              key={item.key}
              data-row
              className="flex items-baseline gap-6 border-b border-forest-950/10 py-8 last:border-b-0"
            >
              <span
                className={`font-mono text-sm transition-colors duration-300 ${
                  active === i ? 'text-amber-600' : 'text-stone-600'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`font-display transition-all duration-300 ${
                  active === i
                    ? 'text-3xl font-extrabold text-forest-950 underline decoration-amber-600 decoration-2 underline-offset-8 sm:text-5xl'
                    : 'text-xl font-medium text-stone-600 sm:text-2xl'
                }`}
              >
                {t(item.key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
