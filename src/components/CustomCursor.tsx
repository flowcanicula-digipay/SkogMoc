'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary';
const SPARKLE_COLOR = '217, 138, 43';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || isCoarsePointer) return;

    document.documentElement.classList.add('custom-cursor-active');

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    let lastSpawn = 0;
    let lastX = -1;
    let lastY = -1;
    const liveSparkles = new Set<HTMLDivElement>();

    const spawnSparkle = (x: number, y: number) => {
      const el = document.createElement('div');
      el.className = 'pointer-events-none fixed z-[9998]';
      const size = 3 + Math.random() * 4;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = '50%';
      el.style.background = `radial-gradient(circle, rgba(${SPARKLE_COLOR}, 0.95), rgba(${SPARKLE_COLOR}, 0))`;
      el.style.transform = 'translate(-50%, -50%)';
      el.style.willChange = 'transform, opacity';
      document.body.appendChild(el);
      liveSparkles.add(el);

      gsap.to(el, {
        x: (Math.random() - 0.5) * 36,
        y: -18 - Math.random() * 28,
        opacity: 0,
        scale: 0,
        duration: 0.7 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => {
          el.remove();
          liveSparkles.delete(el);
        },
      });
    };

    const onMove = (e: MouseEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const movedFar = lastX < 0 || dx * dx + dy * dy > 36;
      const now = performance.now();
      if (movedFar && now - lastSpawn > 45 && liveSparkles.size < 24) {
        spawnSparkle(e.clientX, e.clientY);
        lastSpawn = now;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(ring, { scale: 1.9, opacity: 0.5, duration: 0.35, ease: 'power3.out' });
        gsap.to(dot, { scale: 0.4, duration: 0.35, ease: 'power3.out' });
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' });
        gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power3.out' });
      }
    };

    const onDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.18, ease: 'power2.out' });
    };
    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'back.out(2.4)' });
    };

    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };
    const onEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseenter', onEnterWindow);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseenter', onEnterWindow);
      liveSparkles.forEach((el) => el.remove());
      liveSparkles.clear();
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-amber-600/70 shadow-[0_0_18px_4px_rgba(217,138,43,0.25)]"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-amber-600 shadow-[0_0_8px_2px_rgba(217,138,43,0.7)]"
      />
    </>
  );
}
