/**
 * Kis "útjelző" ikon — egy gyűrű és egy pont, mint egy pont a
 * túraútvonal-térképen. A szekció-előcímkék elé kerül, hogy az oldal
 * úgy olvasson, mint egymást követő állomások egy úton.
 * `currentColor`-t használ, a szülő szövegszíne határozza meg.
 */
export default function WaypointMarker({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="7"
        cy="7"
        r="5.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.55"
      />
      <circle cx="7" cy="7" r="2" fill="currentColor" />
    </svg>
  );
}
