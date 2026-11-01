import { NextResponse } from "next/server";
import { EMAIL_MAX_LENGTH, EMAIL_REGEX, FIRST_NAME_MAX_LENGTH } from "@/lib/validation";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";
import { ALLOWED_SENDER_FORMS, type SenderFormId } from "@/lib/sender";

const SENDER_API_BASE = "https://stats.sender.net";
const BAD_REQUEST_MESSAGE = "Hibás kérés — próbáld frissíteni az oldalt.";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown): string | undefined | null {
  if (value === undefined || value === null) return undefined;
  return typeof value === "string" ? value : null;
}

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

  // Honeypot védelem: valódi látogató sosem tölti ki
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const rawFormId = optionalString(body.formId);
  const rawEmail = optionalString(body.email);
  const rawFirstName = optionalString(body.firstName);

  if (rawEmail === null || rawFirstName === null || rawFormId === null) {
    return NextResponse.json({ message: BAD_REQUEST_MESSAGE }, { status: 400 });
  }

  const formId = rawFormId?.trim();
  if (!formId || !ALLOWED_SENDER_FORMS.includes(formId as SenderFormId)) {
    return NextResponse.json(
      { message: "Érvénytelen űrlap azonosító." },
      { status: 400 }
    );
  }

  const email = rawEmail?.trim().toLowerCase();
  const firstName = rawFirstName?.trim() || "";
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
          "Ehhez elfogadásra van szükség — pipáld ki a jelölőnégyzetet.",
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

  const referer = request.headers.get("referer") || siteConfig.url;

  try {
    const senderPayload = {
      email,
      firstname: firstName,
      site_visit: true,
      url: referer,
    };

    const senderResponse = await fetch(`${SENDER_API_BASE}/forms/${formId}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(senderPayload),
    });

    const responseData = await senderResponse.json().catch(() => null);

    if (senderResponse.ok) {
      return NextResponse.json(
        { ok: true, message: responseData?.message || "Sikeres feliratkozás!" },
        { status: 200 }
      );
    }

    if (senderResponse.status === 422) {
      const errorMsg =
        responseData?.message ||
        responseData?.errors?.email ||
        "Nem sikerült feliratkozni ezzel az email címmel — ellenőrizd, hogy helyesen írtad-e be.";
      return NextResponse.json({ message: errorMsg }, { status: 422 });
    }

    if (senderResponse.status === 429) {
      return NextResponse.json(
        { message: "Sokan iratkoznak fel most — várj egy percet, és próbáld újra." },
        { status: 429 }
      );
    }

    console.error("Sender.net API hiba:", senderResponse.status, responseData);
    return NextResponse.json(
      { message: "Valami elakadt a feliratkozásnál. Próbáld meg újra egy perc múlva." },
      { status: 502 }
    );
  } catch (error) {
    console.error("Nem sikerült elérni a Sender.net API-t:", error);
    return NextResponse.json(
      {
        message:
          "Nem sikerült kapcsolódni a feliratkozó szolgáltatáshoz. Próbáld meg még egyszer.",
      },
      { status: 502 }
    );
  }
}
