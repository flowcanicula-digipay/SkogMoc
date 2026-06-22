import type { SVGProps } from 'react';

// Custom flat-line icon set for Skog Mộc by TNP — drop-in replacements for
// the generic lucide-react glyphs used on the services pages, drawn at the
// same 24x24/currentColor/round-cap convention as lucide so they can sit
// next to lucide icons (ArrowRight, Check, etc.) without looking mismatched.
export type StudioIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number | string;
};

function base({ size = 24, strokeWidth = 1.5, ...props }: StudioIconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  };
}

/** Core discipline: custom furniture design & fabrication — a joined chair. */
export function FurnitureIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 4v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4" />
      <path d="M6 9h12" />
      <path d="M7 14v6M17 14v6" />
    </svg>
  );
}

/** Core discipline: interior design — a furnished room with a window. */
export function InteriorIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 21V8.5L12 3l9 5.5V21" />
      <path d="M3 21h18" />
      <rect x="9.5" y="8.5" width="5" height="5" rx="0.6" />
      <path d="M6 21v-6h4v6" />
    </svg>
  );
}

/** Core discipline: architecture — a building elevation. */
export function ArchitectureIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3.5" width="14" height="17" rx="1" />
      <path d="M9 8h1.4M13.6 8H15M9 12h1.4M13.6 12H15M9 16h1.4M13.6 16H15" />
      <path d="M10.5 20.5V17h3v3.5" />
    </svg>
  );
}

/** Core discipline: landscape design — a tree on graded ground. */
export function LandscapeIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 7.5 10h2.3L6 16h5v5h2v-5h5l-3.8-6H16Z" />
      <path d="M2.5 20.5h19" />
    </svg>
  );
}

/** Extended network: architectural technologist — technical drawing tools. */
export function ArchTechnologistIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20 14.5 9.5l2.5 2.5L6.5 22.5Z" />
      <path d="m13 9 2-2 2.5 2.5-2 2" />
      <path d="M17.5 3.5 20.5 6.5" />
      <path d="m16.2 4.8 2.5 2.5" />
      <path d="M4 20H2.5v-1.5" />
    </svg>
  );
}

/** Extended network: spatial / interior designer — a drafting compass. */
export function SpatialDesignerIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v3.2" />
      <path d="M12 6.2 6.5 20.5h3.1L12 14l2.4 6.5h3.1Z" />
      <circle cx="12" cy="3" r="1.4" />
    </svg>
  );
}

/** Extended network: building surveyor — a clipboard with a pass check. */
export function BuildingSurveyorIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2.7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V4" />
      <path d="m8.5 13 2.3 2.3L15.5 10.5" />
    </svg>
  );
}

/** Extended network: town planner — a parcel/site plan with a pin. */
export function TownPlannerIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6.5 9 4l6 2.5 6-2.5v13L15 19.5 9 17l-6 2.5Z" />
      <path d="M9 4v13M15 6.5v13" />
      <circle cx="9" cy="10.5" r="1.4" />
    </svg>
  );
}

/** Extended network: production designer — a scale model / massing study. */
export function ProductionDesignerIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 19V9l5-3 5 3v10" />
      <path d="M9 22V13l5-3 5 3v9" />
      <path d="M4 19h5M9 22h10" />
    </svg>
  );
}

/** Extended network: historic-buildings inspector — a classical column. */
export function HistoricBuildingsIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 3.5h16M4 21.5h16" />
      <path d="M7.5 6v13M12 6v13M16.5 6v13" />
      <path d="M3 6 12 2l9 4" />
    </svg>
  );
}

/** Extended network: structural engineer — a load beam under bracing. */
export function StructuralEngineerIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 19h18" />
      <path d="M5 19v-5.5l7-5.5 7 5.5V19" />
      <path d="M9 19v-3.2l3-2.4 3 2.4V19" />
    </svg>
  );
}
