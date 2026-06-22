'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Charm } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import HcmcLocator from './HcmcLocator';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// A brush-script "Ông Đồ" calligraphy flourish for the destination label
// only — the road's homecoming punchline, not a site-wide type change.
// Verified to carry a `vietnamese` subset before adding (see CLAUDE.md's
// font-selection note).
const charm = Charm({ subsets: ['latin', 'vietnamese'], weight: '700', variable: '--font-charm' });

const MOTIFS_DIR = '/assets/images/portfolio/motifs';

// Faint hand-drawn-style line doodles scattered behind the ribbon — a
// sketchbook texture in the spirit of street-food doodle sheets, hand-built
// as simple line art (not traced from any reference) so it stays original.
type DoodleProps = { className?: string; style?: CSSProperties };

function LanternDoodle({ className = '', style }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 90" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="30" y1="2" x2="30" y2="10" />
      <ellipse cx="30" cy="40" rx="22" ry="30" />
      <line x1="9" y1="28" x2="51" y2="28" />
      <line x1="9" y1="52" x2="51" y2="52" />
      <line x1="30" y1="70" x2="30" y2="82" />
      <line x1="24" y1="82" x2="36" y2="82" />
    </svg>
  );
}

function PhoBowlDoodle({ className = '', style }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 70" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 28 Q45 50 80 28" />
      <path d="M6 28h78c0 16-17 30-39 30S6 44 6 28Z" />
      <path d="M55 6 65 24M65 6 55 24" strokeLinecap="round" />
    </svg>
  );
}

function CycloDoodle({ className = '', style }: DoodleProps) {
  return (
    <svg viewBox="0 0 110 70" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="22" cy="50" r="14" />
      <circle cx="88" cy="50" r="14" />
      <path d="M22 50 45 22h20M65 22 88 50M45 22 38 50h-16" />
      <path d="M45 22q12-14 24 0" />
    </svg>
  );
}

function SunSwirlDoodle({ className = '', style }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="30" cy="30" r="10" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = 30 + Math.cos(angle) * 16;
        const y1 = 30 + Math.sin(angle) * 16;
        const x2 = 30 + Math.cos(angle) * 26;
        const y2 = 30 + Math.sin(angle) * 26;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeLinecap="round" />;
      })}
    </svg>
  );
}

const DOODLES = [
  { Doodle: LanternDoodle, left: '6%', top: '8%', size: 46, rotate: -8 },
  { Doodle: SunSwirlDoodle, left: '94%', top: '6%', size: 40, rotate: 6 },
  { Doodle: PhoBowlDoodle, left: '92%', top: '72%', size: 64, rotate: 4 },
  { Doodle: CycloDoodle, left: '3%', top: '70%', size: 72, rotate: -4 },
];

// Real locations + a final "Your Place" stop — the road keeps going.
// Traced as one elongated lean, not a repeating zigzag: a single S-bend
// echoing Vietnam's own coastline silhouette (narrow through the middle,
// bulging at each end) rather than a literal traced map outline.
const VIEW_W = 1200;
const VIEW_H = 340;

function generateNodes(count: number) {
  const amp = 120;
  const midY = VIEW_H / 2;
  const marginX = 70;
  const k = 5.5;
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const sig = 1 / (1 + Math.exp(-k * (t - 0.5)));
    return {
      x: Math.round(marginX + t * (VIEW_W - marginX * 2)),
      y: Math.round(midY + amp - sig * amp * 2),
    };
  });
}

// Vietnamese cultural motifs, floating at the midpoint of each road segment
// between stops — decorative ambience for the journey, not tied to any one
// specific address. Each one is unique, no repeats. Flag/bánh mì/phở/lotus/
// cơm tấm/coffee are real open-licensed vector art (Twemoji, CC-BY 4.0);
// nón lá is a hand-built flat icon in the same style, since no equivalent
// exists in that set.
const MOTIFS = [
  { src: `${MOTIFS_DIR}/flag-vn.svg`, alt: 'Vietnam flag' },
  { src: `${MOTIFS_DIR}/banh-mi.svg`, alt: 'Bánh mì' },
  { src: `${MOTIFS_DIR}/pho.svg`, alt: 'Phở' },
  { src: `${MOTIFS_DIR}/com-tam.svg`, alt: 'Cơm tấm' },
  { src: `${MOTIFS_DIR}/lotus.svg`, alt: 'Lotus flower' },
  { src: `${MOTIFS_DIR}/coffee.svg`, alt: 'Vietnamese iced coffee' },
  { src: `${MOTIFS_DIR}/non-la.svg`, alt: 'Nón lá' },
];

function buildRoadPath(nodes: { x: number; y: number }[]) {
  const [first, ...rest] = nodes;
  let d = `M ${first!.x},${first!.y}`;
  let prev = first!;
  for (const p1 of rest) {
    const dx = (p1.x - prev.x) / 2;
    d += ` C ${prev.x + dx},${prev.y} ${p1.x - dx},${p1.y} ${p1.x},${p1.y}`;
    prev = p1;
  }
  return d;
}

export default function PortfolioLocations() {
  const t = useTranslations('portfolio.locations');
  const items = t.raw('items') as string[];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGCircleElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const motifRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobilePinRefs = useRef<(HTMLLIElement | null)[]>([]);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  const stops = [...items, t('destination')];
  const nodes = generateNodes(stops.length);
  const gapCount = stops.length - 1;
  // One unique motif per road segment — falls back to cycling only if there
  // are ever more segments than motifs available.
  const motifGaps = Array.from({ length: gapCount }, (_, i) => MOTIFS[i % MOTIFS.length]!);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const road = roadRef.current;
    if (!wrapper || !road || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const length = road.getTotalLength();
      gsap.set([road, lineRef.current], { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(pinRefs.current, { opacity: 0, y: 16, scale: 0.5, transformOrigin: '50% 100%' });
      gsap.set(motifRefs.current, { opacity: 0, scale: 0.4 });
      gsap.set(cometRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: 'top 75%', end: 'bottom 65%', scrub: 0.5 },
      });

      tl.to([road, lineRef.current], { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0).to(
        cometRef.current,
        { motionPath: { path: road, align: road, alignOrigin: [0.5, 0.5] }, opacity: 1, duration: 1, ease: 'none' },
        0,
      );

      nodes.forEach((_, i) => {
        const at = i / (nodes.length - 1);
        tl.to(pinRefs.current[i]!, { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: 'back.out(2.6)' }, Math.max(0, at - 0.05));
      });
      motifGaps.forEach((_, i) => {
        const at = (i + 0.5) / (nodes.length - 1);
        tl.to(motifRefs.current[i]!, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)' }, Math.max(0, at - 0.04));
      });

      if (mobileLineRef.current) {
        gsap.set(mobileLineRef.current, { scaleY: 0, transformOrigin: 'top' });
        gsap.set(mobilePinRefs.current, { opacity: 0, x: -14 });
        const mobileTl = gsap.timeline({
          scrollTrigger: { trigger: mobileLineRef.current, start: 'top 80%', end: 'bottom 75%', scrub: 0.5 },
        });
        mobileTl.to(mobileLineRef.current, { scaleY: 1, duration: 1, ease: 'none' }, 0);
        stops.forEach((_, i) => {
          const at = i / (stops.length - 1);
          mobileTl.to(mobilePinRefs.current[i]!, { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }, Math.max(0, at - 0.05));
        });
      }
    }, wrapper);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roadPath = buildRoadPath(nodes);

  return (
    <div ref={wrapperRef} className={`relative mx-auto max-w-7xl px-6 py-16 sm:py-24 ${charm.variable}`}>
      {/* Vietnam's own coastline, faint, behind the whole section — a real
          administrative-boundary map (mapsvg.com / Wikimedia, CC-BY-SA),
          tinted to a flat silhouette via a brightness filter rather than
          edited pixel-by-pixel, so nothing here is traced by hand. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/portfolio/vietnam-outline.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-full w-auto max-w-none opacity-[0.1]"
        style={{ filter: 'brightness(0)', objectFit: 'contain' }}
      />

      <div className="relative flex items-center justify-center gap-3">
        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-amber-600">
          {t('title')}
        </p>
        <HcmcLocator />
      </div>

      {/* Desktop: illustrated winding road */}
      <div className="relative mt-10 hidden py-12 sm:block">
        {/* faint sketchbook-doodle texture, behind everything else */}
        <div className="pointer-events-none absolute inset-0 text-stone-600/30" aria-hidden="true">
          {DOODLES.map(({ Doodle, left, top, size, rotate }, i) => (
            <Doodle
              key={i}
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

        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="relative w-full" style={{ height: 'auto' }} aria-hidden="true">
          <defs>
            <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D98A2B" />
              <stop offset="50%" stopColor="#E2703A" />
              <stop offset="100%" stopColor="#DA251D" />
            </linearGradient>
          </defs>
          {/* soft shadow, offset slightly below the ribbon for lift */}
          <path
            d={roadPath}
            fill="none"
            stroke="#16231C"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.08"
            transform="translate(0, 8)"
          />
          {/* the ribbon road itself */}
          <path
            ref={roadRef}
            d={roadPath}
            fill="none"
            stroke="url(#ribbonGradient)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* a thin highlight running along the top edge, for a glossy
              ribbon feel rather than a literal painted road */}
          <path
            ref={lineRef}
            d={roadPath}
            fill="none"
            stroke="#FFE8B8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
            transform="translate(0, -5)"
          />
          <circle
            ref={cometRef}
            r="7"
            fill="#FFCD00"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,205,0,0.9))' }}
          />
        </svg>

        {/* cultural motifs floating along the route */}
        <div className="pointer-events-none absolute inset-0">
          {motifGaps.map(({ src, alt }, i) => {
            const a = nodes[i]!;
            const b = nodes[i + 1]!;
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 50;
            return (
              <div
                key={`${src}-${i}`}
                ref={(el) => {
                  motifRefs.current[i] = el;
                }}
                className="lantern-float-slow absolute flex h-12 w-12 items-center justify-center rounded-full border border-amber-100 bg-white p-2 shadow-md"
                style={{
                  left: `${(mx / VIEW_W) * 100}%`,
                  top: `${(my / VIEW_H) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className="h-full w-full object-contain" />
              </div>
            );
          })}
        </div>

        {/* location pins + destination pin */}
        <div className="pointer-events-none absolute inset-0">
          {nodes.map((pt, i) => {
            const isLast = i === nodes.length - 1;
            const isTop = pt.y < VIEW_H / 2;
            return (
              <div
                key={i}
                ref={(el) => {
                  pinRefs.current[i] = el;
                }}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${(pt.x / VIEW_W) * 100}%`,
                  top: `${(pt.y / VIEW_H) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {isLast ? (
                  <span className="flex h-11 w-11 animate-pulse items-center justify-center rounded-full bg-amber-600 p-1.5 shadow-lg shadow-amber-600/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${MOTIFS_DIR}/viet-home.svg`}
                      alt="Your future home"
                      className="h-full w-full object-contain"
                    />
                  </span>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`${MOTIFS_DIR}/viet-pin.svg`}
                    alt=""
                    className="h-9 w-9 drop-shadow-lg"
                  />
                )}
                <span
                  className={`absolute ${isTop ? 'top-full mt-3' : 'bottom-full mb-3'} whitespace-nowrap text-center`}
                >
                  <span
                    style={isLast ? { fontFamily: 'var(--font-charm)' } : undefined}
                    className={
                      isLast
                        ? 'block text-2xl font-bold text-amber-600 sm:text-3xl'
                        : 'block font-display text-sm font-bold text-forest-950 sm:text-base'
                    }
                  >
                    {stops[i]}
                  </span>
                  {isLast && (
                    <span className="mt-0.5 block max-w-[10rem] text-xs leading-snug text-ink/60">
                      {t('destinationNote')}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: straight drawn line, same stops in order */}
      <div className="relative mt-10 sm:hidden">
        <div className="absolute left-7 top-0 h-full w-px bg-forest-950/10" aria-hidden="true" />
        <div ref={mobileLineRef} className="absolute left-7 top-0 h-full w-px bg-amber-600" aria-hidden="true" />
        <ol className="flex flex-col gap-8">
          {stops.map((stop, i) => {
            const isLast = i === stops.length - 1;
            return (
              <li
                key={stop}
                ref={(el) => {
                  mobilePinRefs.current[i] = el;
                }}
                className="flex items-center gap-4"
              >
                {isLast ? (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-600 p-1.5 shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${MOTIFS_DIR}/viet-home.svg`}
                      alt="Your future home"
                      className="h-full w-full object-contain"
                    />
                  </span>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`${MOTIFS_DIR}/viet-pin.svg`}
                    alt=""
                    className="h-9 w-9 shrink-0 drop-shadow-lg"
                  />
                )}
                <span>
                  <span
                    style={isLast ? { fontFamily: 'var(--font-charm)' } : undefined}
                    className={
                      isLast
                        ? 'block text-2xl font-bold text-amber-600'
                        : 'block font-display text-base font-bold text-forest-950'
                    }
                  >
                    {stop}
                  </span>
                  {isLast && <span className="block text-xs text-ink/60">{t('destinationNote')}</span>}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-10 text-center text-sm text-ink/60">{t('note')}</p>
    </div>
  );
}
