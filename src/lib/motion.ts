/**
 * Központi "motion nyelvtan" — minden animált komponens innen veszi az
 * időzítést/easing-et, hogy az oldal egyetlen, összefüggő rendszerként
 * mozogjon, ne komponensenként egyedi, esetlegesen eltérő számokkal.
 *
 * Az EASE.smooth a korábban is használt egyedi bezier ([0.22, 1, 0.36, 1]) —
 * ez a márka "lélegző", nem tolakodó animációs hangneme; innentől mindenhol
 * ugyanez fut belépő animációkra. Az EASE.exit gyorsabb, "expo-out" jellegű
 * görbe mikro-interakciókhoz (hover/tap visszajelzés), ahol a válasznak
 * azonnalinak kell éreznie magát.
 */
export const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
};

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  slower: 1.3,
};

/** Spring-fizika gombokhoz/kártyákhoz — puhább, "tapintható" válasz a lineáris CSS transitionnel szemben. */
export const SPRING = {
  hover: { type: "spring", stiffness: 420, damping: 28, mass: 0.6 } as const,
  tap: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 } as const,
};

export const STAGGER = {
  gap: 0.12,
  delayChildren: 0.05,
};

/** Belépő fade+slide-up — a legtöbb szöveges elem alapanimációja. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
};

/** Tisztán fade, elmozdulás nélkül — dekoratív/háttér elemekhez. */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slower, ease: EASE.smooth },
  },
};

/**
 * Szülő elem egy lépcsőzött ("stagger") reveal-hez — a gyerekek (fadeUp
 * variant) egymás után, kis csúszással jelennek meg, nem egyszerre.
 */
export function staggerContainer(gap: number = STAGGER.gap) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: gap,
        delayChildren: STAGGER.delayChildren,
      },
    },
  };
}
