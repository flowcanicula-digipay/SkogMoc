'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MessageCircle, PenTool, Layers, FileText, Wrench, KeyRound, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const STEPS = [
  { key: 'consultation', Icon: MessageCircle },
  { key: 'concept', Icon: PenTool },
  { key: 'development', Icon: Layers },
  { key: 'documentation', Icon: FileText },
  { key: 'installation', Icon: Wrench },
  { key: 'handover', Icon: KeyRound },
] as const;

// Wave points for the desktop roadmap path — alternating high/low so the
// route reads as a flowing journey rather than a flat list, the same
// "process roadmap" feel as the reference infographic the owner pointed to.
const VIEW_W = 1200;
const VIEW_H = 300;
const POINTS = [
  { x: 70, y: 230 },
  { x: 296, y: 80 },
  { x: 522, y: 230 },
  { x: 748, y: 80 },
  { x: 974, y: 230 },
  { x: 1130, y: 80 },
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
  const glowPathRef = useRef<SVGPathElement>(null);
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
      gsap.set([path, glowPathRef.current], { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(nodeRefs.current, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });
      gsap.set(cometRef.current, { opacity: 0 });

      const desktopTl = gsap.timeline({
        scrollTrigger: { trigger: container, start: 'top 75%', end: 'bottom 70%', scrub: 0.5 },
      });

      desktopTl
        .to([path, glowPathRef.current], { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0)
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
          scrollTrigger: { trigger: mobileLineRef.current, start: 'top 80%', end: 'bottom 75%', scrub: 0.5 },
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
    <div ref={containerRef} className="relative">
      {/* Desktop: flowing wave roadmap */}
      <div className="relative hidden py-14 sm:block">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          style={{ height: 'auto' }}
          aria-hidden="true"
        >
          <path d={wavePath} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forest-950/10" />
          <path
            ref={glowPathRef}
            d={wavePath}
            fill="none"
            stroke="#D98A2B"
            strokeWidth="6"
            strokeLinecap="round"
            className="opacity-30 blur-md"
          />
          <path
            ref={pathRef}
            d={wavePath}
            fill="none"
            stroke="#D98A2B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            ref={cometRef}
            r="7"
            fill="#D98A2B"
            style={{ filter: 'drop-shadow(0 0 8px rgba(217,138,43,0.85))' }}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0">
          {STEPS.map(({ key, Icon }, i) => {
            const pt = POINTS[i]!;
            const isTop = pt.y < VIEW_H / 2;
            const tone = i % 2 === 0 ? 'bg-amber-600' : 'bg-moss-500';
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
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-linen-50 shadow-lg shadow-forest-950/15 ${tone}`}
                >
                  <Icon size={22} strokeWidth={1.75} />
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
        <div className="absolute left-7 top-0 h-full w-px bg-forest-950/10" aria-hidden="true" />
        <div
          ref={mobileLineRef}
          className="absolute left-7 top-0 h-full w-px bg-amber-600"
          aria-hidden="true"
        />
        <ol className="flex flex-col gap-8">
          {STEPS.map(({ key, Icon }, i) => (
            <li
              key={key}
              ref={(el) => {
                mobileNodeRefs.current[i] = el;
              }}
              className="flex items-center gap-4"
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-linen-50 shadow-lg shadow-forest-950/15 ${
                  i % 2 === 0 ? 'bg-amber-600' : 'bg-moss-500'
                }`}
              >
                <Icon size={20} strokeWidth={1.75} />
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
