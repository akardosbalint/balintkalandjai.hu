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
    process.env.KIT_API_KEY = "test-key";
    process.env.KIT_FORM_ID = "test-form";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.KIT_API_KEY;
    delete process.env.KIT_FORM_ID;
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

  it.each([
    ["null", null],
    ["tömb", []],
    ["szám", 42],
  ])("400-at ad, ha a JSON body nem objektum (%s)", async (_label, body) => {
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it.each([
    ["email: szám", { ...validBody, email: 123 }],
    ["firstName: objektum", { ...validBody, firstName: { x: 1 } }],
  ])("400-at ad nem string mező esetén (%s), nem dob kivételt", async (_label, body) => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("400-at ad túl hosszú email esetén, és nem hívja a Kit API-t", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(
      makeRequest({ ...validBody, email: `${"a".repeat(250)}@example.com` })
    );
    expect(res.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("400-at ad túl hosszú keresztnév esetén", async () => {
    const res = await POST(makeRequest({ ...validBody, firstName: "x".repeat(101) }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.message).toMatch(/keresztnév/);
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

  it("honeypot kitöltése esetén színlelt sikert ad, és nem hívja a Kit API-t", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest({ ...validBody, website: "http://spam.example" }));

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("500-at ad, ha hiányoznak a Kit env változók", async () => {
    delete process.env.KIT_API_KEY;
    delete process.env.KIT_FORM_ID;

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });

  it("sikeres feliratkozás esetén ok:true-t ad, és a két Kit hívást a helyes payloaddal küldi", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 })
    );
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);

    expect(fetchSpy).toHaveBeenCalledTimes(2);

    const [subscriberUrl, subscriberInit] = fetchSpy.mock.calls[0];
    expect(subscriberUrl).toBe("https://api.kit.com/v4/subscribers");
    expect(subscriberInit.headers["X-Kit-Api-Key"]).toBe("test-key");
    expect(JSON.parse(subscriberInit.body)).toEqual({
      email_address: "teszt@example.com",
      first_name: "Teszt",
    });

    const [formUrl, formInit] = fetchSpy.mock.calls[1];
    expect(formUrl).toBe("https://api.kit.com/v4/forms/test-form/subscribers");
    expect(formInit.headers["X-Kit-Api-Key"]).toBe("test-key");
    expect(JSON.parse(formInit.body)).toEqual({
      email_address: "teszt@example.com",
    });
  });

  it("422 Kit választ 422-vel ad tovább, és nem hívja meg a form endpointot", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ errors: ["invalid"] }), { status: 422 })
    );
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(422);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("429 Kit választ 429-cel ad tovább", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 429 })
    );
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
  });

  it("502-t ad, ha a subscriber-hívás sikeres, de a form-hoz adás elbukik", async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ errors: ["not found"] }), { status: 404 })
      );
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
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
