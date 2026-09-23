import { afterEach, describe, expect, it, vi } from "vitest";
import { SUBSCRIBE_EVENTS, trackEvent } from "./analytics";

describe("trackEvent", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("GA4 eseményt küld a gtag-en keresztül a megadott paraméterekkel", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    trackEvent(SUBSCRIBE_EVENTS.success, { form_location: "feliratkozas" });

    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", {
      form_location: "feliratkozas",
    });
  });

  it("nem dob hibát, ha a gtag nincs definiálva", () => {
    vi.stubGlobal("window", {});
    expect(() => trackEvent(SUBSCRIBE_EVENTS.error)).not.toThrow();
  });

  it("szerver oldalon (window nélkül) csendben nem csinál semmit", () => {
    expect(() => trackEvent(SUBSCRIBE_EVENTS.error)).not.toThrow();
  });
});
