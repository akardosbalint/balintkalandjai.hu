import { describe, expect, it } from "vitest";
import { getMarkdownForPath } from "./markdown-content";
import { siteConfig } from "./site-config";

describe("getMarkdownForPath", () => {
  it.each(["/", "/about", "/contact", "/privacy", "/adatkezeles"])(
    "returns 200 markdown for known route %s",
    (pathname) => {
      const result = getMarkdownForPath(pathname);
      expect(result.status).toBe(200);
      expect(result.body).toMatch(/^# /);
      expect(result.body.length).toBeGreaterThan(100);
    },
  );

  it("returns 404 markdown with recovery links for an unknown path", () => {
    const result = getMarkdownForPath("/this-does-not-exist");
    expect(result.status).toBe(404);
    expect(result.body).toContain("404");
    expect(result.body).toContain("/this-does-not-exist");
    expect(result.body).toContain(`${siteConfig.url}/sitemap.xml`);
    expect(result.body).toContain(`${siteConfig.url}/llms.txt`);
    expect(result.body).toContain(`${siteConfig.url}/`);
  });

  it("home and privacy markdown reference the brand and key facts", () => {
    expect(getMarkdownForPath("/").body).toContain(siteConfig.brandName);
    expect(getMarkdownForPath("/privacy").body).toContain(siteConfig.email);
    expect(getMarkdownForPath("/adatkezeles").body).toEqual(
      getMarkdownForPath("/privacy").body,
    );
  });
});
