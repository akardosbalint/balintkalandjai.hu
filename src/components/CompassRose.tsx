/**
 * Kis iránytű-rózsa — az útkeresés/navigáció motívuma, "úti fotóra
 * ragasztott matrica" jelleggel. Tisztán dekoratív, nem konkrét
 * kulturális/vallási szimbólum.
 */
export default function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="27" fill="none" stroke="#C1613C" strokeWidth="1.25" opacity="0.55" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#C1613C" strokeWidth="0.75" opacity="0.35" />
      <g stroke="#C1613C" strokeWidth="1" opacity="0.5">
        <line x1="32" y1="6" x2="32" y2="16" />
        <line x1="32" y1="48" x2="32" y2="58" />
        <line x1="6" y1="32" x2="16" y2="32" />
        <line x1="48" y1="32" x2="58" y2="32" />
      </g>
      <path
        d="M32 14 L38 32 L32 50 L26 32 Z"
        fill="#B8935B"
        opacity="0.75"
      />
      <circle cx="32" cy="32" r="2.5" fill="#8A3F26" />
    </svg>
  );
}
