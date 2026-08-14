import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeBody {
  email?: string;
  firstName?: string;
  consent?: boolean;
}

/**
 * Szerver oldali proxy a MailerLite API felé, hogy az API kulcs
 * soha ne kerüljön a böngészőbe. A double opt-in flow-t a MailerLite
 * fiók / csoport beállítása vezérli (Settings → Subscribers →
 * Double opt-in) — itt csak feliratkoztatunk, a megerősítő emailt
 * a MailerLite küldi automatikusan.
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

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    console.error(
      "Hiányzó MAILERLITE_API_KEY vagy MAILERLITE_GROUP_ID environment variable."
    );
    return NextResponse.json(
      {
        message:
          "A feliratkozás jelenleg nem elérhető. Próbáld meg később, vagy írj emailt.",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          fields: firstName ? { name: firstName } : undefined,
          groups: [groupId],
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const errorBody = await response.json().catch(() => null);
    console.error("MailerLite API hiba:", response.status, errorBody);

    if (response.status === 429) {
      return NextResponse.json(
        {
          message:
            "Sokan iratkoznak fel most — várj egy percet, és próbáld újra.",
        },
        { status: 429 }
      );
    }

    if (response.status === 422) {
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
  } catch (error) {
    console.error("Nem sikerült elérni a MailerLite API-t:", error);
    return NextResponse.json(
      {
        message:
          "Nem sikerült kapcsolódni a feliratkozó szolgáltatáshoz. Próbáld meg még egyszer.",
      },
      { status: 502 }
    );
  }
}
