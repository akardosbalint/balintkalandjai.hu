import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("POST /api/stripe/checkout-session", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  it("503-at és fallback fizetési linket ad, ha nincs STRIPE_SECRET_KEY", async () => {
    delete process.env.STRIPE_SECRET_KEY;

    const req = new NextRequest("http://localhost:3000/api/stripe/checkout-session", {
      method: "POST",
    });

    const res = await POST(req);
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.error).toBe("STRIPE_NOT_CONFIGURED");
    expect(json.fallbackUrl).toContain("donate.stripe.com");
  });
});
