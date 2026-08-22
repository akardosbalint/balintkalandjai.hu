import { describe, expect, it } from "vitest";
import {
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  serializeJsonLd,
} from "./structured-data";
import { siteConfig } from "./site-config";

describe("buildPersonJsonLd", () => {
  it("identifies as a Person, not an Organization", () => {
    // Site is legally a private individual (see legal-content.ts / /privacy) —
    // an Organization node here would misstate the entity.
    const data = buildPersonJsonLd();
    expect(data["@type"]).toBe("Person");
    expect(data["@context"]).toBe("https://schema.org");
    expect(data.name).toBe(siteConfig.ownerFullName);
    expect(data.url).toBe(siteConfig.url);
    expect(data.sameAs).toContain(siteConfig.social.tiktok);
  });

  it("carries a contactPoint with the public email, no home address", () => {
    const data = buildPersonJsonLd();
    expect(data.contactPoint["@type"]).toBe("ContactPoint");
    expect(data.contactPoint.email).toBe(siteConfig.email);
    expect(JSON.stringify(data)).not.toContain(siteConfig.ownerAddress);
  });
});

describe("buildWebSiteJsonLd", () => {
  it("identifies as a WebSite authored by the same Person", () => {
    const data = buildWebSiteJsonLd();
    expect(data["@type"]).toBe("WebSite");
    expect(data.url).toBe(siteConfig.url);
    expect(data.author.name).toBe(siteConfig.ownerFullName);
  });
});

describe("serializeJsonLd", () => {
  it("escapes '<' so embedded content can never close the surrounding <script> tag", () => {
    const serialized = serializeJsonLd({ evil: "</script><script>alert(1)</script>" });
    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script>");
  });

  it("round-trips as valid JSON once unescaped", () => {
    const data = buildPersonJsonLd();
    const serialized = serializeJsonLd(data);
    const parsed = JSON.parse(serialized.replace(/\\u003c/g, "<"));
    expect(parsed).toEqual(data);
  });
});
