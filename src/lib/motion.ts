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
