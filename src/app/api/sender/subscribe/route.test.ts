import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";

function makeRequest(body: unknown, ip = "192.168.1.100") {
  return new Request("http://localhost:3000/api/sender/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
      referer: "https://balintkalandjai.hu/",
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/sender/subscribe", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("400-at ad, ha a JSON szintaktikailag hibás", async () => {
    const res = await POST(makeRequest("nem-json", "10.0.0.1"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toContain("Hibás kérés");
  });

  it("400-at ad, ha a formId érvénytelen", async () => {
    const res = await POST(
      makeRequest(
        { formId: "invalid-id", email: "test@example.com", consent: true },
        "10.0.0.2"
      )
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toContain("Érvénytelen űrlap azonosító");
  });

  it("400-at ad, ha hiányzik vagy hibás az email", async () => {
    const res = await POST(
      makeRequest(
        { formId: "en5vrE", email: "nem-email", consent: true },
        "10.0.0.3"
      )
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toContain("Adj meg egy érvényes email címet");
  });

  it("400-at ad, ha nincs bepipálva a hozzájárulás", async () => {
    const res = await POST(
      makeRequest(
        { formId: "en5vrE", email: "test@example.com", consent: false },
        "10.0.0.4"
      )
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toContain("Ehhez elfogadásra van szükség");
  });

  it("Honeypot esetén 200 OK-t ad vissza upstream hívás nélkül", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const res = await POST(
      makeRequest(
        {
          formId: "en5vrE",
          email: "bot@example.com",
          consent: true,
          website: "http://spam.org",
        },
        "10.0.0.5"
      )
    );
    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("Sikeresen továbbítja a feliratkozást a Sender.net felé", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          message: "You have successfully subscribed",
          subscriber_id: "test123",
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      )
    );

    const res = await POST(
      makeRequest(
        {
          formId: "en5vrE",
          email: "teszt@example.com",
          firstName: "Bálint",
          consent: true,
        },
        "10.0.0.6"
      )
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("Kezeli a 422-es Sender validációs hibát", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          message: "Email address is invalid",
        }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      )
    );

    const res = await POST(
      makeRequest(
        {
          formId: "eERn80",
          email: "teszt@example.com",
          consent: true,
        },
        "10.0.0.7"
      )
    );

    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.message).toBe("Email address is invalid");
  });
});
