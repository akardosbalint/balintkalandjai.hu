import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { siteConfig } from "@/lib/site-config";

describe("sitemap", () => {
  it("lists every indexable URL with an absolute loc and a lastmod", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toEqual([
      `${siteConfig.url}/`,
      `${siteConfig.url}/about`,
      `${siteConfig.url}/contact`,
      `${siteConfig.url}/privacy`,
    ]);

    for (const entry of entries) {
      expect(entry.url.startsWith("https://")).toBe(true);
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it("does not list the noindex legal template alias", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).not.toContain(`${siteConfig.url}/adatkezeles`);
  });

  it("gives the homepage the highest priority", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url === `${siteConfig.url}/`);
    const rest = entries.filter((e) => e.url !== `${siteConfig.url}/`);
    expect(home?.priority).toBe(1);
    for (const entry of rest) {
      expect(entry.priority ?? 0).toBeLessThan(1);
    }
  });
});
