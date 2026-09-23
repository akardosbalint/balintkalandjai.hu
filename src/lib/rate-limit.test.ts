import { describe, expect, it } from "vitest";
import { getClientIp, isRateLimited } from "./rate-limit";

describe("isRateLimited", () => {
  it("az első néhány kérést átengedi ugyanarról a kulcsról", () => {
    const key = `test-key-${Math.random()}`;
    expect(isRateLimited(key)).toBe(false);
    expect(isRateLimited(key)).toBe(false);
    expect(isRateLimited(key)).toBe(false);
    expect(isRateLimited(key)).toBe(false);
    expect(isRateLimited(key)).toBe(false);
  });

  it("a limit fölötti kérést blokkolja ugyanarról a kulcsról", () => {
    const key = `test-key-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(key)).toBe(false);
    }
    expect(isRateLimited(key)).toBe(true);
  });

  it("különböző kulcsok (IP-k) egymástól függetlenül számolnak", () => {
    const keyA = `test-key-a-${Math.random()}`;
    const keyB = `test-key-b-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      isRateLimited(keyA);
    }
    expect(isRateLimited(keyA)).toBe(true);
    expect(isRateLimited(keyB)).toBe(false);
  });
});

describe("getClientIp", () => {
  it("az x-forwarded-for első címét adja vissza", () => {
    const request = new Request("https://example.com", {
      headers: { "x-forwarded-for": "203.0.113.5, 70.41.3.18" },
    });
    expect(getClientIp(request)).toBe("203.0.113.5");
  });

  it("x-forwarded-for hiányában x-real-ip-re esik vissza", () => {
    const request = new Request("https://example.com", {
      headers: { "x-real-ip": "198.51.100.7" },
    });
    expect(getClientIp(request)).toBe("198.51.100.7");
  });

  it("mindkettő hiányában 'unknown'-t ad", () => {
    const request = new Request("https://example.com");
    expect(getClientIp(request)).toBe("unknown");
  });
});
