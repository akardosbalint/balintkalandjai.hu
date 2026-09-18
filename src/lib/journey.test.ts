import { describe, expect, it } from "vitest";
import { getJourneyDayInfo, parseLocalDate } from "./journey";

// Rögzített, a valós site-config.ts-től független dátumokkal tesztelünk,
// hogy a teszt ne szakadjon el, ha valaki a jövőben módosítja az utazás
// tényleges dátumait.
const START = "2026-09-28";
const TOTAL_DAYS = 67;

function day(offset: number) {
  const d = new Date(parseLocalDate(START));
  d.setDate(d.getDate() + offset);
  return d;
}

describe("getJourneyDayInfo", () => {
  it("indulás előtt 'before' fázist ad, helyes hátralévő nappal", () => {
    const info = getJourneyDayInfo(day(-1), START, TOTAL_DAYS);
    expect(info).toEqual({ phase: "before", day: 0, daysUntilStart: 1 });
  });

  it("indulás napján (1. nap) 'during' fázist ad", () => {
    const info = getJourneyDayInfo(day(0), START, TOTAL_DAYS);
    expect(info).toEqual({ phase: "during", day: 1, daysUntilStart: 0 });
  });

  it("egy köztes napon a helyes napszámot adja", () => {
    const info = getJourneyDayInfo(day(29), START, TOTAL_DAYS);
    expect(info).toEqual({ phase: "during", day: 30, daysUntilStart: 0 });
  });

  it("az utolsó (67.) napon még 'during'", () => {
    const info = getJourneyDayInfo(day(TOTAL_DAYS - 1), START, TOTAL_DAYS);
    expect(info).toEqual({ phase: "during", day: TOTAL_DAYS, daysUntilStart: 0 });
  });

  it("a 67. nap utáni első napon már 'after', a nap-szám a totalDays-en marad", () => {
    const info = getJourneyDayInfo(day(TOTAL_DAYS), START, TOTAL_DAYS);
    expect(info).toEqual({ phase: "after", day: TOTAL_DAYS, daysUntilStart: 0 });
  });

  it("jóval indulás előtt a hátralévő napok száma pontos", () => {
    const info = getJourneyDayInfo(day(-10), START, TOTAL_DAYS);
    expect(info).toEqual({ phase: "before", day: 0, daysUntilStart: 10 });
  });

  it("jóval a visszaérkezés után is 'after' marad, nem megy tovább a számláló", () => {
    const info = getJourneyDayInfo(day(TOTAL_DAYS + 30), START, TOTAL_DAYS);
    expect(info).toEqual({ phase: "after", day: TOTAL_DAYS, daysUntilStart: 0 });
  });
});
