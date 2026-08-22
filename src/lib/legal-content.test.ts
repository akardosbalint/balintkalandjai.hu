import { describe, expect, it } from "vitest";
import { legalEffectiveDate, legalEffectiveDateIso, legalSections } from "./legal-content";
import { siteConfig } from "./site-config";

describe("legal content", () => {
  it("formats the Hungarian effective date from the ISO source of truth", () => {
    expect(legalEffectiveDateIso).toBe("2026-08-15");
    expect(legalEffectiveDate).toBe("2026. augusztus 15.");
  });

  it("has non-empty sections with a heading and at least one paragraph", () => {
    expect(legalSections.length).toBeGreaterThan(0);
    for (const section of legalSections) {
      expect(section.heading.length).toBeGreaterThan(0);
      expect(section.paragraphs.length).toBeGreaterThan(0);
    }
  });

  it("names the data controller's contact email in the first section", () => {
    expect(legalSections[0].paragraphs.join(" ")).toContain(siteConfig.email);
  });
});
