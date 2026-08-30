interface TrailDividerProps {
  className?: string;
  color?: string;
  flip?: boolean;
}

/**
 * Kanyargó, pontozott ösvény-elválasztó a fejezetek (szekciók) között —
 * az "útkeresés" szó szerinti vizuális megfelelője: az oldal olvasása
 * maga is egy útvonal bejárása. A középső, nagyobb pont egy-egy
 * "állomást" jelöl az úton.
 */
export default function TrailDivider({
  className = "",
  color = "#C1613C",
  flip = false,
}: TrailDividerProps) {
  return (
    <div
      className={`pointer-events-none relative mx-auto max-w-5xl px-6 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className={`h-8 w-full sm:h-12 ${flip ? "-scale-y-100" : ""}`}
        focusable="false"
      >
        <path
          d="M0,30 Q50,4 100,30 T200,30 T300,30 T400,30"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="0.5 10"
          opacity="0.4"
        />
        <circle cx="100" cy="30" r="2.5" fill={color} opacity="0.45" />
        <circle
          cx="200"
          cy="30"
          r="4"
          fill="#B8935B"
          opacity="0.85"
          className="animate-breathe-slow"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <circle cx="300" cy="30" r="2.5" fill={color} opacity="0.45" />
      </svg>
    </div>
  );
}
