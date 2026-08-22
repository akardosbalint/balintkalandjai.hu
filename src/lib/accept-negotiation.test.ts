import { describe, expect, it } from "vitest";
import { prefersMarkdown } from "./accept-negotiation";

describe("prefersMarkdown", () => {
  it("returns false when there is no Accept header", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown(undefined)).toBe(false);
    expect(prefersMarkdown("")).toBe(false);
  });

  it("serves markdown for a bare Accept: text/markdown", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
  });

  it("serves markdown when it has a higher q-value than text/html", () => {
    expect(prefersMarkdown("text/markdown;q=0.9, text/html;q=0.8")).toBe(true);
  });

  it("serves html when text/html has the higher q-value", () => {
    expect(prefersMarkdown("text/markdown;q=0.5, text/html;q=0.9")).toBe(false);
  });

  it("serves html for a plain browser Accept header (no markdown mentioned)", () => {
    expect(
      prefersMarkdown(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ),
    ).toBe(false);
  });

  it("serves html for a bare wildcard Accept header", () => {
    expect(prefersMarkdown("*/*")).toBe(false);
  });

  it("does not serve markdown when explicitly rejected with q=0", () => {
    expect(prefersMarkdown("text/markdown;q=0, text/html")).toBe(false);
  });

  it("prefers markdown over html when both are equally weighted by a wildcard, but markdown is explicit", () => {
    // text/markdown explicit (implicit q=1) beats the */* wildcard match for text/html.
    expect(prefersMarkdown("text/markdown, */*;q=0.1")).toBe(true);
  });

  it("is case-insensitive on the media type", () => {
    expect(prefersMarkdown("TEXT/MARKDOWN")).toBe(true);
  });
});
