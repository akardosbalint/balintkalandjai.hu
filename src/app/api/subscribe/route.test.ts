import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function makeRequest(body: unknown, ip = `1.2.3.${Math.floor(Math.random() * 250)}`) {
  return new Request("https://example.com/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validBody = {
  email: "teszt@example.com",
  firstName: "Teszt",
  consent: true,
};

describe("POST /api/subscribe", () => {
  beforeEach(() => {
    process.env.MAILERLITE_API_KEY = "test-key";
    process.env.MAILERLITE_GROUP_ID = "test-group";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.MAILERLITE_API_KEY;
    delete process.env.MAILERLITE_GROUP_ID;
  });

  it("400-at ad hibás JSON body esetén", async () => {
    const request = new Request("https://example.com/api/subscribe", {
      method: "POST",
      headers: { "x-forwarded-for": "10.0.0.1" },
      body: "not json",
    });
    const res = await POST(request);
    expect(res.status).toBe(400);
  });

  it("400-at ad érvénytelen email esetén", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "nem-email" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.message).toMatch(/érvényes email/);
  });

  it("400-at ad hiányzó consent esetén", async () => {
    const res = await POST(makeRequest({ ...validBody, consent: false }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.message).toMatch(/elfogadás/);
  });

  it("honeypot kitöltése esetén színlelt sikert ad, és nem hívja a MailerLite-ot", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest({ ...validBody, website: "http://spam.example" }));

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("500-at ad, ha hiányoznak a MailerLite env változók", async () => {
    delete process.env.MAILERLITE_API_KEY;
    delete process.env.MAILERLITE_GROUP_ID;

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });

  it("sikeres MailerLite hívás esetén ok:true-t ad, és a helyes payloadot küldi", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 })
    );
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://connect.mailerlite.com/api/subscribers");
    expect(init.headers.Authorization).toBe("Bearer test-key");
    const sentBody = JSON.parse(init.body);
    expect(sentBody).toEqual({
      email: "teszt@example.com",
      fields: { name: "Teszt" },
      groups: ["test-group"],
    });
  });

  it("422 MailerLite választ 422-vel és barátságos üzenettel ad tovább", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: "duplicate" }), { status: 422 })
    );
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(422);
  });

  it("429 MailerLite választ 429-cel ad tovább", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 429 })
    );
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
  });

  it("a saját rate limit lezárja az 5. kérés utánit ugyanarról az IP-ről", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 })
    );
    vi.stubGlobal("fetch", fetchSpy);

    const ip = `9.9.9.${Math.floor(Math.random() * 250)}`;
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(validBody, ip));
      expect(res.status).toBe(200);
    }

    const limited = await POST(makeRequest(validBody, ip));
    expect(limited.status).toBe(429);
  });
});
