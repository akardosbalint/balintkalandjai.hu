import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

function request(pathname: string, accept?: string) {
  const headers = accept ? { Accept: accept } : undefined;
  return new NextRequest(new URL(pathname, "https://example.com"), { headers });
}

describe("middleware content negotiation", () => {
  it("passes through untouched when Accept does not prefer markdown", () => {
    const response = middleware(request("/", "text/html"));
    // NextResponse.next() carries this internal marker instead of a body.
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("serves 200 markdown for a known route when Accept: text/markdown", async () => {
    const response = middleware(request("/about", "text/markdown"));
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
    expect(await response.text()).toMatch(/^# /);
  });

  it("serves 404 markdown with recovery links for an unknown route when Accept: text/markdown", async () => {
    const response = middleware(request("/nope", "text/markdown"));
    expect(response.status).toBe(404);
    expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
    expect(await response.text()).toContain("/nope");
  });

  it("never intercepts paths that look like static assets", () => {
    const response = middleware(request("/images/logo.png", "text/markdown"));
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});
