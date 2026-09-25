import { NextResponse } from "next/server";
import { EMAIL_MAX_LENGTH, EMAIL_REGEX, FIRST_NAME_MAX_LENGTH } from "@/lib/validation";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

const KIT_API_BASE = "https://api.kit.com/v4";

/** Sima JSON objektum-e (nem null, nem tömb, nem primitív). */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Opcionális szöveges mező kiolvasása: hiányzó mező → `undefined`, nem
 * string érték → `null` (hibás kérés). A `request.json()` bármilyen
 * érvényes JSON-t visszaadhat, ezért a típust futásidőben ellenőrizzük —
 * enélkül pl. `{"email": 123}` kezeletlen TypeError-t (500) dobott.
 */
function optionalString(value: unknown): string | undefined | null {
  if (value === undefined || value === null) return undefined;
  return typeof value === "string" ? value : null;
}

const BAD_REQUEST_MESSAGE = "Hibás kérés — próbáld frissíteni az oldalt.";

/** Egy sikertelen Kit API válaszból épít barátságos, magyar hibaüzenetet. */
async function kitErrorResponse(response: Response, context: string) {
  const errorBody = await response.json().catch(() => null);
  console.error(`Kit API hiba (${context}):`, response.status, errorBody);

  if (response.status === 429) {
    return NextResponse.json(
      { message: "Sokan iratkoznak fel most — várj egy percet, és próbáld újra." },
      { status: 429 }
    );
  }

  if (response.status === 422) {
    return NextResponse.json(
      {
        message:
          "Nem sikerült feliratkoztatni ezzel az email címmel — ellenőrizd, hogy helyesen írtad-e be.",
      },
      { status: 422 }
    );
  }

  // 401/403 (hibás/lejárt API kulcs) és 404 (hibás form ID) egyaránt
  // üzemeltetői konfigurációs hiba, nem a látogató rontott el semmit —
  // ezért felé csak az általános üzenet megy, a részletek a szerver logba.
  return NextResponse.json(
    {
      message:
        "Valami elakadt a feliratkozásnál. Próbáld meg még egyszer egy perc múlva.",
    },
    { status: 502 }
  );
}

/**
 * Szerver oldali proxy a Kit (korábban ConvertKit) API felé, hogy az API
 * kulcs soha ne kerüljön a böngészőbe. Két lépésben történik:
 * 1. a feliratkozó létrehozása/frissítése (upsert — ha az email már
 *    létezik, nem hibázik, csak frissíti az adatait),
 * 2. hozzáadása a KIT_FORM_ID által azonosított formhoz — ez indítja el
 *    a Kit oldalán beállított double opt-in / üdvözlő szekvenciát.
 * A tényleges double opt-in beállítás (Kit fiók → az adott form
 * beállításai) Kit oldali konfiguráció, itt csak feliratkoztatunk.
 */
export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        message:
          "Sokan iratkoznak fel most erről a helyről — várj egy percet, és próbáld újra.",
      },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: BAD_REQUEST_MESSAGE }, { status: 400 });
  }

  if (!isPlainObject(body)) {
    return NextResponse.json({ message: BAD_REQUEST_MESSAGE }, { status: 400 });
  }

  // Honeypot: valódi látogató sosem tölti ki (a mező a form UI-ban rejtve
  // van), bot viszont gyakran igen. Ilyenkor színlelt sikert adunk vissza —
  // a Kit-et nem hívjuk meg —, hogy a botnak ne legyen jelzés, mit érdemes
  // máshogy próbálnia.
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const rawEmail = optionalString(body.email);
  const rawFirstName = optionalString(body.firstName);

  if (rawEmail === null || rawFirstName === null) {
    return NextResponse.json({ message: BAD_REQUEST_MESSAGE }, { status: 400 });
  }

  const email = rawEmail?.trim().toLowerCase();
  const firstName = rawFirstName?.trim();
  const consent = body.consent === true;

  if (!email || email.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { message: "Adj meg egy érvényes email címet." },
      { status: 400 }
    );
  }

  if (!consent) {
    return NextResponse.json(
      {
        message:
          "Ehhez elfogadásra van szükség — pipáld ki, hogy küldhessek neked hangfelvételt.",
      },
      { status: 400 }
    );
  }

  if (firstName && firstName.length > FIRST_NAME_MAX_LENGTH) {
    return NextResponse.json(
      { message: `A keresztnév legfeljebb ${FIRST_NAME_MAX_LENGTH} karakter lehet.` },
      { status: 400 }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("Hiányzó KIT_API_KEY vagy KIT_FORM_ID environment variable.");
    return NextResponse.json(
      {
        message:
          `A feliratkozás jelenleg nem elérhető. Próbáld meg később, vagy írj a ${siteConfig.email} címre.`,
      },
      { status: 500 }
    );
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  try {
    const subscriberResponse = await fetch(`${KIT_API_BASE}/subscribers`, {
      method: "POST",
      headers: kitHeaders,
      body: JSON.stringify({
        email_address: email,
        first_name: firstName || undefined,
      }),
    });

    if (!subscriberResponse.ok) {
      return await kitErrorResponse(subscriberResponse, "subscribers");
    }

    const formResponse = await fetch(
      `${KIT_API_BASE}/forms/${formId}/subscribers`,
      {
        method: "POST",
        headers: kitHeaders,
        body: JSON.stringify({ email_address: email }),
      }
    );

    if (!formResponse.ok) {
      return await kitErrorResponse(formResponse, "forms/subscribers");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Nem sikerült elérni a Kit API-t:", error);
    return NextResponse.json(
      {
        message:
          "Nem sikerült kapcsolódni a feliratkozó szolgáltatáshoz. Próbáld meg még egyszer.",
      },
      { status: 502 }
    );
  }
}
