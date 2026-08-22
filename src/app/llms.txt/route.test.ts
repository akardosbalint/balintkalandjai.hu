import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { siteConfig } from "@/lib/site-config";

describe("GET /llms.txt", () => {
  it("serves markdown with a when-to-use section and links to key pages", async () => {
    const response = GET();
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );

    const body = await response.text();
    expect(body).toMatch(/^# /);
    expect(body).toContain("when to use this");
    expect(body).toContain(`${siteConfig.url}/`);
    expect(body).toContain(`${siteConfig.url}/about`);
    expect(body).toContain(`${siteConfig.url}/contact`);
    expect(body).toContain(`${siteConfig.url}/privacy`);
    expect(body).toContain(`${siteConfig.url}/sitemap.xml`);
  });
});
