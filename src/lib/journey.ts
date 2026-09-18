import { siteConfig } from "./site-config";

export const TOTAL_DAYS = siteConfig.journey.totalDays;

export function parseLocalDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateOnly(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export type JourneyPhase = "before" | "during" | "after";

export interface JourneyDayInfo {
  phase: JourneyPhase;
  day: number;
  daysUntilStart: number;
}

/**
 * Hányadik napnál tart az utazás `now`-hoz képest — kiemelve a
 * JourneyProgress komponensből, hogy a határeseteket (indulás előtt/
 * napján, utolsó nap, hazaérkezés utáni nap) unit teszttel lehessen
 * védeni. Lásd a JourneyProgress/Hero kommentjeit arról, hogy ez a
 * logika miért érzékeny (pl. "67 napja Rishikeshben..." HIBÁS, ha a
 * tulajdonos még nem is utazott el).
 */
export function getJourneyDayInfo(
  now: Date,
  startDate: string = siteConfig.journey.startDate,
  totalDays: number = TOTAL_DAYS
): JourneyDayInfo {
  const start = parseLocalDate(startDate);
  const diffDays = Math.round((dateOnly(now) - dateOnly(start)) / 86_400_000) + 1;

  if (diffDays < 1) {
    return { phase: "before", day: 0, daysUntilStart: 1 - diffDays };
  }
  if (diffDays > totalDays) {
    return { phase: "after", day: totalDays, daysUntilStart: 0 };
  }
  return { phase: "during", day: diffDays, daysUntilStart: 0 };
}
