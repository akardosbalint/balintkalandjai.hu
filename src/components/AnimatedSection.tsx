import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}

/**
 * Lassú, "lélegző" fade-in-up, amint a szekció a képernyőre ér.
 * Szándékosan visszafogott: a téma a nyugalom, nem a figyelemfelkeltés.
 *
 * Tisztán CSS (`.reveal`, lásd globals.css), scroll-driven animációval —
 * NEM Framer Motion `initial={{ opacity: 0 }}` + `whileInView`. Az a
 * szerver-HTML-be is `opacity:0`-t renderelt, így JS nélkül (vagy amíg a
 * JS be nem töltődött, pl. lassú in-app böngészőben) a hero alatti TELJES
 * tartalom — a második feliratkozó formmal együtt — láthatatlan maradt.
 * Most a tartalom alapból látható; ahol a böngésző támogatja az
 * `animation-timeline: view()`-t és nincs csökkentett mozgás kérve, ott
 * görgetésre úszik be, máshol animáció nélkül, azonnal megjelenik.
 */
export default function AnimatedSection({
  children,
  className,
  as: Component = "section",
}: AnimatedSectionProps) {
  return (
    <Component className={className ? `reveal ${className}` : "reveal"}>
      {children}
    </Component>
  );
}
