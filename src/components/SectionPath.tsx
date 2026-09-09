type Mode = "outer" | "inner";

const LINE_COLOR: Record<Mode, string> = {
  outer: "rgba(255,153,51,0.5)",
  inner: "rgba(184,147,91,0.5)",
};

const DOT_COLOR: Record<Mode, string> = {
  outer: "#FF9933",
  inner: "#B8935B",
};

const DOT_GLOW: Record<Mode, string> = {
  outer: "0 0 12px 2px rgba(255,153,51,0.45)",
  inner: "0 0 8px 1px rgba(184,147,91,0.4)",
};

/**
 * Halk, díszítő "ösvény"-szakasz két szekció között — a JourneyProgress
 * fő idővonalának mikro-visszhangja, magát az Om jelet nem ismétli meg.
 * A vonal színe a fenti szekcióból (from) az alattiba (to) fut át, a
 * középső pötty pedig az érkező (to) szekció hangját veszi fel — így
 * görgetés közben is érződik, mikor vált az oldal "külső" (safrán) és
 * "belső" (arany) hangneme között.
 */
export default function SectionPath({ from, to }: { from: Mode; to: Mode }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-10 w-px sm:h-12"
      style={{
        background: `linear-gradient(to bottom, transparent, ${LINE_COLOR[from]} 35%, ${LINE_COLOR[to]} 65%, transparent)`,
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full"
        style={{ background: DOT_COLOR[to], boxShadow: DOT_GLOW[to] }}
      />
    </div>
  );
}
