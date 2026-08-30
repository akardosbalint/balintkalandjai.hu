/**
 * "ॐ" (óm) jel — a jóga/meditáció legismertebb szimbóluma. Valódi
 * Devanagari betűtípus-glifusként jelenik meg (nem kézzel rajzolt SVG
 * útvonal), hogy a forma biztosan pontos és letisztult legyen; a
 * legtöbb operációs rendszer alapból tartalmaz ehhez megfelelő
 * betűtípust, ezért nincs szükség külön betűtípus-betöltésre.
 */
export default function OmMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block select-none leading-none ${className}`}
      style={{
        fontFamily:
          "'Noto Sans Devanagari','Nirmala UI','Kohinoor Devanagari','Devanagari Sangam MN','Arial Unicode MS',sans-serif",
      }}
    >
      ॐ
    </span>
  );
}
