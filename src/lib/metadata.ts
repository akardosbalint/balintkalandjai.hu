import { siteConfig } from "./site-config";

/**
 * Next.js NEM egyesíti mélyen az openGraph/twitter objektumokat a
 * szülő (layout) és egy adott oldal metadata-ja között — ha egy oldal
 * felülírja bármelyiket, a teljes objektum lecserélődik. Ezért minden
 * oldalnak explicit meg kell adnia a közös mezőket (siteName, locale,
 * type, card) is, nem csak a saját title/description/url-t — ezt a
 * két helpert erre használjuk.
 */
export function buildOpenGraph({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    title,
    description,
    url: path,
    siteName: siteConfig.brandName,
    locale: "hu_HU" as const,
    type: "website" as const,
  };
}

export function buildTwitter({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
  };
}
