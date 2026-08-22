import { siteConfig } from "./site-config";

/**
 * JSON-LD identity data for the homepage/site.
 *
 * Uses Person (not Organization) as the @type: siteConfig.ownerAddress /
 * the /privacy page are explicit that this runs as a private individual,
 * not a registered business, so an Organization node would misstate the
 * entity. contactPoint carries the one channel that's already public
 * (email) — the home address stays out of site-wide structured data.
 */
export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.ownerFullName,
    url: siteConfig.url,
    description: siteConfig.description,
    image: `${siteConfig.url}/images/kardos-balint-profil.jpg`,
    sameAs: [siteConfig.social.tiktok],
    email: siteConfig.email,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer support",
      url: `${siteConfig.url}/contact`,
    },
  } as const;
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "hu-HU",
    author: {
      "@type": "Person",
      name: siteConfig.ownerFullName,
      url: siteConfig.url,
    },
  } as const;
}

/** Serialized for a <script type="application/ld+json"> tag, with "<" escaped so JSON content can never close the tag early. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
