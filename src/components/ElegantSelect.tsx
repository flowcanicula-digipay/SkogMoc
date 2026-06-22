'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

type Option = { value: string; label: string };

// A custom listbox, not a native <select> — browsers render the native
// dropdown's option list with OS chrome that can't be styled, which is
// what made the form's selects feel generic. A hidden input keeps the
// chosen value submitting normally with the rest of the form.
//
// The option panel is rendered through a portal into document.body rather
// than as a normal absolutely-positioned child. The form's field-entrance
// animation (ProjectInquiryForm's gsap.from on [data-field]) leaves a
// lingering CSS transform on every field wrapper for GPU acceleration, and
// any transform — even a no-op one — creates a new stacking context. That
// trapped the panel's z-index inside its own field's stacking context, so
// later sibling fields (their own, separately-transformed stacking
// contexts, painted after in DOM order) showed through on top of it. A
// portal sidesteps the whole ancestor-stacking-context problem.
export default function ElegantSelect({
  id,
  name,
  options,
  defaultValue,
}: {
  id?: string;
  name: string;
  options: Option[];
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? options[0]?.value ?? '');
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      return;
    }

    const updateRect = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      if (r) {
        setRect({ top: r.bottom + window.scrollY + 8, left: r.left + window.scrollX, width: r.width });
      }
    };

    updateRect();
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);
    return () => {
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [open]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between border-0 border-b bg-transparent py-3 text-left text-[15px] font-light transition-colors duration-300 focus:outline-none ${
          open ? 'border-amber-600' : 'border-amber-100'
        } text-forest-950`}
      >
        <span>{selected?.label}</span>
        <ChevronDown
          size={15}
          className={`text-amber-600/70 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {mounted &&
        open &&
        rect &&
        createPortal(
          <ul
            role="listbox"
            style={{ position: 'absolute', top: rect.top, left: rect.left, width: rect.width }}
            className="z-50 max-h-64 overflow-auto rounded-xl border border-amber-600/30 bg-white py-1.5 shadow-[0_24px_60px_-12px_rgba(217,138,43,0.5)] ring-1 ring-black/5"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(e) => {
                      // mousedown (not click) so selection commits before the
                      // document-level outside-click listener can race it
                      e.preventDefault();
                      setValue(opt.value);
                      setOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? 'bg-amber-100/50 font-medium text-amber-700'
                        : 'text-forest-950/85 hover:bg-amber-100/60 hover:text-amber-700'
                    }`}
                  >
                    {opt.label}
                    {isSelected && <Check size={14} className="shrink-0 text-amber-600" />}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}
