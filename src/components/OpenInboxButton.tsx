"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  getMailProvider,
  SUBSCRIBED_DOMAIN_STORAGE_KEY,
  type MailProvider,
} from "@/lib/mail-providers";

/**
 * "Irány a postaládám" gomb a köszönőoldalon. A feliratkozó form a
 * sikeres feliratkozás után a böngészőfül sessionStorage-ába írja az
 * email cím DOMAINJÉT (nem a címet); ez alapján mutatunk a megfelelő
 * webmail felületre. Szándékosan nem URL-paraméter: azt a Google
 * Analytics az oldal-URL részeként rögzítené. Ha a domain ismeretlen,
 * vagy közvetlenül nyitották meg a /koszonom oldalt, nincs gomb.
 */
export default function OpenInboxButton() {
  const [provider, setProvider] = useState<MailProvider | null>(null);

  useEffect(() => {
    try {
      const domain = window.sessionStorage.getItem(SUBSCRIBED_DOMAIN_STORAGE_KEY);
      if (domain) setProvider(getMailProvider(domain));
    } catch {
      // Letiltott tárhely (pl. privát mód) — egyszerűen nincs gomb.
    }
  }, []);

  if (!provider) return null;

  return (
    <a
      href={provider.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("open_inbox", { provider: provider.name })}
      className="mt-6 inline-flex flex-col items-center rounded-full bg-saffron-500 px-8 py-3.5 font-medium text-forest-900 shadow-soft transition-colors duration-200 hover:bg-saffron-600 hover:shadow-glow-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-900/40 dark:focus-visible:ring-sand-50/50"
    >
      Irány a postaládám →
      <span className="text-xs font-normal text-forest-900/75">
        {provider.name} megnyitása
        <span className="sr-only"> (új lapon nyílik)</span>
      </span>
    </a>
  );
}
