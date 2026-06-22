'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Link } from '@/i18n/navigation';
import { stockImages } from '@/lib/stockImages';
import TopoPattern from './TopoPattern';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCtaSection({ namespace = 'home.cta' }: { namespace?: string }) {
  const t = useTranslations(namespace);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !titleRef.current || !bodyRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const title = new SplitType(titleRef.current!, { types: 'lines,words' });
      const body = new SplitType(bodyRef.current!, { types: 'lines' });
      gsap.set(title.words, { transformOrigin: '50% 100%' });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      });

      tl.from(accentRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.9,
        ease: 'power3.out',
      })
        .from(
          kickerRef.current,
          { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' },
          '<0.1',
        )
        .from(
          title.words,
          {
            scale: 4,
            yPercent: 70,
            rotationZ: () => gsap.utils.random(-22, 22),
            opacity: 0,
            filter: 'blur(18px)',
            ease: 'back.out(1.5)',
            duration: 1.3,
            stagger: { each: 0.07, from: 'random' },
          },
          '<0.15',
        )
        .from(
          body.lines,
          { yPercent: 110, opacity: 0, ease: 'power3.out', duration: 0.8, stagger: 0.08 },
          '<0.55',
        )
        .from(
          buttonRef.current,
          { scale: 0.6, opacity: 0, ease: 'back.out(2.2)', duration: 0.9 },
          '<0.2',
        );

      // background drifts toward its resting scale as the section travels
      // through the viewport — a slow reveal rather than a static photo
      gsap.fromTo(
        imageRef.current,
        { scale: 1.22 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );

      return () => {
        title.revert();
        body.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[48vh] items-center justify-center overflow-hidden bg-forest-950 px-6 py-20 sm:px-[6vw] sm:py-28"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={stockImages.ctaBg}
        alt=""
        aria-hidden="true"
        // The source photo is a cool, neon-saturated twilight shot — graded
        // here (darkened, warmed, slightly desaturated) so the skyline reads
        // as backdrop rather than competing with the brand's forest/amber
        // palette and the linen-50 text sitting on top of it.
        style={{ filter: 'brightness(0.6) contrast(1.12) saturate(0.85) sepia(0.18)' }}
        className="absolute inset-0 h-full w-full scale-[1.22] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/85 to-forest-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(217,138,43,0.2),transparent_60%)]" />
      <TopoPattern className="left-0 bottom-0 h-auto w-[55%] text-amber-600 opacity-20" flip />

      {/* floating amber glows — a quiet nod to lantern-lit Vietnamese nights,
          paired with the skyline photo rather than illustrating it literally */}
      <div
        aria-hidden="true"
        className="lantern-float absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-amber-600/70 blur-[2px] sm:left-[22%]"
      />
      <div
        aria-hidden="true"
        className="lantern-float-slow absolute right-[20%] top-[38%] h-2 w-2 rounded-full bg-amber-600/60 blur-[2px] sm:right-[24%]"
      />
      <div
        aria-hidden="true"
        className="lantern-float absolute right-[30%] top-[20%] h-1.5 w-1.5 rounded-full bg-amber-100/70 blur-[1px]"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <span ref={accentRef} className="h-8 w-[3px] bg-amber-600" aria-hidden="true" />
        <p
          ref={kickerRef}
          className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-600"
        >
          {t('kicker')}
        </p>
        <h2
          ref={titleRef}
          className="final-cta-split mt-4 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.02] tracking-tight text-linen-50"
        >
          {t('title')}
        </h2>
        <p
          ref={bodyRef}
          className="final-cta-split mt-5 max-w-xl text-base font-medium leading-relaxed text-linen-50/80"
        >
          {t('body')}
        </p>
        <Link
          ref={buttonRef}
          href="/contact"
          className="mt-9 inline-block rounded-full bg-amber-600 px-9 py-4 text-sm font-bold tracking-wide text-linen-50 shadow-[0_0_30px_rgba(217,138,43,0.35)] transition-colors hover:bg-amber-700"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
