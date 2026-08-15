import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KIT_API_BASE = "https://api.kit.com/v4";

interface SubscribeBody {
  email?: string;
  firstName?: string;
  consent?: boolean;
}

/**
 * Szerver oldali proxy a Kit (korábban ConvertKit) API felé, hogy az
 * API kulcs soha ne kerüljön a böngészőbe.
 *
 * Két lépésben történik, a Kit v4 API dokumentált mintája szerint:
 *   1. POST /v4/subscribers — létrehozza/frissíti a feliratkozót
 *      (itt kerül be a keresztnév).
 *   2. POST /v4/forms/{formId}/subscribers — hozzáadja a megadott
 *      form-hoz, ami a Kit form saját beállítása alapján kiküldi a
 *      double opt-in megerősítő emailt.
 *
 * A double opt-in flow-t tehát a KIT_FORM_ID-hez tartozó form
 * beállítása vezérli — itt csak feliratkoztatunk, a megerősítő
 * emailt maga a Kit küldi automatikusan.
 */
export async function POST(request: Request) {
  let body: SubscribeBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Hibás kérés — próbáld frissíteni az oldalt." },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const firstName = body.firstName?.trim();
  const consent = body.consent === true;

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { message: "Adj meg egy érvényes email címet." },
      { status: 400 }
    );
  }

  if (!consent) {
    return NextResponse.json(
      {
        message:
          "Ehhez elfogadásra van szükség — pipáld ki, hogy küldhessünk neked levelet.",
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error(
      "Hiányzó KIT_API_KEY vagy KIT_FORM_ID environment variable."
    );
    return NextResponse.json(
      {
        message:
          "A feliratkozás jelenleg nem elérhető. Próbáld meg később, vagy írj emailt.",
      },
      { status: 500 }
    );
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  try {
    // 1. lépés: feliratkozó létrehozása/frissítése (itt kerül be a név)
    const subscriberRes = await fetch(`${KIT_API_BASE}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: email,
        first_name: firstName || undefined,
        state: "inactive",
      }),
    });

    if (!subscriberRes.ok) {
      const errorBody = await subscriberRes.json().catch(() => null);
      console.error("Kit API hiba (subscribers):", subscriberRes.status, errorBody);
      return errorResponse(subscriberRes.status);
    }

    // 2. lépés: hozzáadás a form-hoz — ez indítja a double opt-in emailt
    const formRes = await fetch(
      `${KIT_API_BASE}/forms/${formId}/subscribers`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ email_address: email }),
      }
    );

    if (!formRes.ok) {
      const errorBody = await formRes.json().catch(() => null);
      console.error("Kit API hiba (forms/subscribers):", formRes.status, errorBody);
      return errorResponse(formRes.status);
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

function errorResponse(status: number) {
  if (status === 429) {
    return NextResponse.json(
      {
        message:
          "Sokan iratkoznak fel most — várj egy percet, és próbáld újra.",
      },
      { status: 429 }
    );
  }

  if (status === 422 || status === 400) {
    return NextResponse.json(
      {
        message:
          "Ezzel az email címmel már regisztrálva vagy, vagy valami nem stimmel az adatokkal. Nézd meg a leveleid, hátha ott a megerősítő email.",
      },
      { status: 422 }
    );
  }

  return NextResponse.json(
    {
      message:
        "Valami elakadt nálunk a feliratkozásnál. Próbáld meg még egyszer egy perc múlva.",
    },
    { status: 502 }
  );
}
