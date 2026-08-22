import { describe, expect, it } from "vitest";
import robots from "./robots";
import { siteConfig } from "@/lib/site-config";

describe("robots", () => {
  it("allows crawling and points at the sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);

    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule.userAgent).toBe("*");
    expect(rule.allow).toBe("/");
  });

  it("disallows the noindex legal template alias and the API routes", () => {
    const result = robots();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule.disallow).toContain("/adatkezeles");
    expect(rule.disallow).toContain("/api/");
  });
});
