export default function SquiggleAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 44C16 18 34 6 52 10C68 13 70 30 58 36C48 41 38 33 42 24C45 17 54 14 60 19"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M58 36C66 40 74 46 80 56"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M80 56C84 50 90 49 95 53C91 60 84 62 80 56Z"
        fill="currentColor"
      />
    </svg>
  );
}
