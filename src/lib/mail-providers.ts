/**
 * "Irány a postaládám" gomb a köszönőoldalon: a feliratkozáskor megadott
 * email cím DOMAINJE alapján (a teljes címet sosem tároljuk) a megfelelő
 * webmail kezdőoldalára visz. Ismeretlen (pl. céges) domainnél nincs gomb —
 * ott nem tudhatjuk, hol olvassa a látogató a leveleit.
 */
export interface MailProvider {
  /** Megjelenített név, és ez megy a GA4 eseménybe is (a domain nem). */
  name: string;
  url: string;
}

const GMAIL: MailProvider = { name: "Gmail", url: "https://mail.google.com/mail/u/0/#inbox" };
const OUTLOOK: MailProvider = { name: "Outlook", url: "https://outlook.live.com/mail/" };
const YAHOO: MailProvider = { name: "Yahoo Mail", url: "https://mail.yahoo.com/" };
const ICLOUD: MailProvider = { name: "iCloud Mail", url: "https://www.icloud.com/mail" };
const PROTON: MailProvider = { name: "Proton Mail", url: "https://mail.proton.me/" };
const FREEMAIL: MailProvider = { name: "Freemail", url: "https://freemail.hu/" };
const CITROMAIL: MailProvider = { name: "Citromail", url: "https://citromail.hu/" };
const GMX: MailProvider = { name: "GMX", url: "https://www.gmx.net/" };
const AOL: MailProvider = { name: "AOL Mail", url: "https://mail.aol.com/" };

const PROVIDERS_BY_DOMAIN: Record<string, MailProvider> = {
  "gmail.com": GMAIL,
  "googlemail.com": GMAIL,
  "outlook.com": OUTLOOK,
  "outlook.hu": OUTLOOK,
  "hotmail.com": OUTLOOK,
  "hotmail.hu": OUTLOOK,
  "live.com": OUTLOOK,
  "live.hu": OUTLOOK,
  "msn.com": OUTLOOK,
  "yahoo.com": YAHOO,
  "ymail.com": YAHOO,
  "icloud.com": ICLOUD,
  "me.com": ICLOUD,
  "mac.com": ICLOUD,
  "proton.me": PROTON,
  "protonmail.com": PROTON,
  "pm.me": PROTON,
  "freemail.hu": FREEMAIL,
  "citromail.hu": CITROMAIL,
  "gmx.net": GMX,
  "gmx.de": GMX,
  "gmx.com": GMX,
  "aol.com": AOL,
};

/** Egy email címből vagy puszta domainből a webmail szolgáltató, ha ismert. */
export function getMailProvider(emailOrDomain: string): MailProvider | null {
  const domain = emailOrDomain.trim().toLowerCase().split("@").pop();
  if (!domain) return null;
  return PROVIDERS_BY_DOMAIN[domain] ?? null;
}

/** Az email cím domainje (a "@" utáni rész), kisbetűsítve — a cím többi része nélkül. */
export function getEmailDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 0) return null;
  const domain = email.slice(at + 1).trim().toLowerCase();
  return domain || null;
}

/** sessionStorage kulcs: a feliratkozó form ide írja a domaint, a köszönőoldal innen olvassa. */
export const SUBSCRIBED_DOMAIN_STORAGE_KEY = "subscribed-email-domain";
