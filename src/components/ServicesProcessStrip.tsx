'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const ICONS_DIR = '/assets/images/services/motifs';
const PORTFOLIO_MOTIFS_DIR = '/assets/images/portfolio/motifs';

// Full-color, hand-built motifs (not stock pictograms) — nón lá in
// conversation for the site visit, a lotus bud breaking open for the
// concept, stacked tile-roof eaves for development iterations, a stamped
// scroll (dấu mộc red seal) for documentation, crossed mallet + chisel for
// the "Mộc" furniture install, and a key with a roof-shaped bow for handover.
const STEPS = [
  { key: 'consultation', icon: `${ICONS_DIR}/consultation.svg` },
  { key: 'concept', icon: `${ICONS_DIR}/concept.svg` },
  { key: 'development', icon: `${ICONS_DIR}/development.svg` },
  { key: 'documentation', icon: `${ICONS_DIR}/documentation.svg` },
  { key: 'installation', icon: `${ICONS_DIR}/installation.svg` },
  { key: 'handover', icon: `${ICONS_DIR}/handover.svg` },
] as const;

// Faint cultural texture floating behind the ribbon, reusing the same
// open-licensed motif set as the portfolio page's road so the two roadmap
// sections read as one family of components.
const TEXTURE_MOTIFS = [
  { src: `${PORTFOLIO_MOTIFS_DIR}/lotus.svg`, left: '6%', top: '14%', size: 38, rotate: -6 },
  { src: `${PORTFOLIO_MOTIFS_DIR}/non-la.svg`, left: '94%', top: '12%', size: 34, rotate: 8 },
  { src: `${PORTFOLIO_MOTIFS_DIR}/coffee.svg`, left: '92%', top: '78%', size: 36, rotate: -4 },
  { src: `${PORTFOLIO_MOTIFS_DIR}/flag-vn.svg`, left: '4%', top: '80%', size: 34, rotate: 5 },
] as const;

// Wave points for the desktop roadmap path — alternating high/low so the
// route reads as a flowing journey rather than a flat list, the same
// "process roadmap" feel as the portfolio page's illustrated road.
const VIEW_W = 1200;
const VIEW_H = 320;
const POINTS = [
  { x: 70, y: 240 },
  { x: 296, y: 90 },
  { x: 522, y: 240 },
  { x: 748, y: 90 },
  { x: 974, y: 240 },
  { x: 1130, y: 90 },
];

function buildWavePath() {
  const [first, ...rest] = POINTS;
  let d = `M ${first!.x},${first!.y}`;
  let prev = first!;
  for (const p1 of rest) {
    const dx = (p1.x - prev.x) / 2;
    d += ` C ${prev.x + dx},${prev.y} ${p1.x - dx},${p1.y} ${p1.x},${p1.y}`;
    prev = p1;
  }
  return d;
}

export default function ServicesProcessStrip() {
  const t = useTranslations('services.process');
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const highlightRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileNodeRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const length = path.getTotalLength();
      gsap.set([path, highlightRef.current], { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(nodeRefs.current, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });
      gsap.set(cometRef.current, { opacity: 0 });

      // end is intentionally generous (bottom 95%) — with a tight end like
      // "bottom 70%" the timeline only finishes once the section has
      // scrolled most of the way past the sticky header, so the
      // last (highest-sitting) node would pop in already tucked behind it.
      // Finishing the reveal earlier keeps every node's pop-in on screen,
      // below the fixed nav.
      const desktopTl = gsap.timeline({
        scrollTrigger: { trigger: container, start: 'top 75%', end: 'bottom 95%', scrub: 0.5 },
      });

      desktopTl
        .to([path, highlightRef.current], { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0)
        .to(
          cometRef.current,
          {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            opacity: 1,
            duration: 1,
            ease: 'none',
          },
          0,
        );

      STEPS.forEach((_, i) => {
        const at = i / (STEPS.length - 1);
        desktopTl.to(
          nodeRefs.current[i]!,
          { opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(2.4)' },
          Math.max(0, at - 0.06),
        );
      });

      // Mobile fallback — straight drawn line, same stagger logic
      if (mobileLineRef.current) {
        gsap.set(mobileLineRef.current, { scaleY: 0, transformOrigin: 'top' });
        gsap.set(mobileNodeRefs.current, { opacity: 0, x: -16 });

        const mobileTl = gsap.timeline({
          scrollTrigger: { trigger: mobileLineRef.current, start: 'top 90%', end: 'bottom 50%', scrub: 0.5 },
        });
        mobileTl.to(mobileLineRef.current, { scaleY: 1, duration: 1, ease: 'none' }, 0);
        STEPS.forEach((_, i) => {
          const at = i / (STEPS.length - 1);
          mobileTl.to(
            mobileNodeRefs.current[i]!,
            { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' },
            Math.max(0, at - 0.05),
          );
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const wavePath = buildWavePath();

  return (
    <div ref={containerRef} className="relative scroll-mt-28">
      {/* Desktop: illustrated ribbon roadmap, same family as the portfolio
          page's winding road. Extra top padding (vs. the portfolio road)
          gives the highest-sitting nodes (concept/documentation/handover)
          clearance from the sticky header once scrolled into view. */}
      <div className="relative hidden py-16 pt-24 sm:block">
        {/* faint cultural texture, behind everything else */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true">
          {TEXTURE_MOTIFS.map(({ src, left, top, size, rotate }, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="absolute"
              style={{
                left,
                top,
                width: size,
                height: size,
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
              }}
            />
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="relative w-full"
          style={{ height: 'auto' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="serviceRibbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D98A2B" />
              <stop offset="50%" stopColor="#B86F1C" />
              <stop offset="100%" stopColor="#4F7A52" />
            </linearGradient>
          </defs>
          {/* soft shadow, offset slightly below the ribbon for lift */}
          <path
            d={wavePath}
            fill="none"
            stroke="#16231C"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.08"
            transform="translate(0, 7)"
          />
          {/* the ribbon road itself */}
          <path
            ref={pathRef}
            d={wavePath}
            fill="none"
            stroke="url(#serviceRibbonGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* glossy top-edge highlight */}
          <path
            ref={highlightRef}
            d={wavePath}
            fill="none"
            stroke="#FFE8B8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
            transform="translate(0, -4)"
          />
          <circle
            ref={cometRef}
            r="7"
            fill="#FFCD00"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,205,0,0.9))' }}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0">
          {STEPS.map(({ key, icon }, i) => {
            const pt = POINTS[i]!;
            const isTop = pt.y < VIEW_H / 2;
            const ring = i % 2 === 0 ? 'ring-amber-600' : 'ring-moss-500';
            return (
              <div
                key={key}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="pointer-events-auto relative flex flex-col items-center"
                style={{
                  position: 'absolute',
                  left: `${(pt.x / VIEW_W) * 100}%`,
                  top: `${(pt.y / VIEW_H) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-linen-50 p-2.5 shadow-lg shadow-forest-950/20 ring-2 ${ring}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt="" className="h-full w-full object-contain" />
                </div>
                <span
                  className={`absolute ${isTop ? 'top-full mt-3' : 'bottom-full mb-3'} whitespace-nowrap text-center`}
                >
                  <span className="block font-mono text-[10px] text-stone-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-bold text-forest-950 sm:text-base">
                    {t(`steps.${key}`)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: straight drawn line, same node order */}
      <div className="relative sm:hidden">
        <div className="absolute left-8 top-0 h-full w-px bg-forest-950/10" aria-hidden="true" />
        <div
          ref={mobileLineRef}
          className="absolute left-8 top-0 h-full w-px bg-amber-600"
          aria-hidden="true"
        />
        <ol className="flex flex-col gap-8">
          {STEPS.map(({ key, icon }, i) => (
            <li
              key={key}
              ref={(el) => {
                mobileNodeRefs.current[i] = el;
              }}
              className="flex items-center gap-4"
            >
              <span
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linen-50 p-2.5 shadow-lg shadow-forest-950/20 ring-2 ${
                  i % 2 === 0 ? 'ring-amber-600' : 'ring-moss-500'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt="" className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block font-mono text-[10px] text-stone-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-0.5 block font-display text-base font-bold text-forest-950">
                  {t(`steps.${key}`)}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <Link
        href="/process"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700 sm:mt-24"
      >
        {t('cta')}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
