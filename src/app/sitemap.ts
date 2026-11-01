import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: "2026-09-26",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/adatkezeles`,
      lastModified: "2026-09-25",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/aszf`,
      lastModified: "2026-09-25",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/alapozo`,
      lastModified: "2026-10-31",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/alapozo/bonusz`,
      lastModified: "2026-10-31",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/gyik`,
      lastModified: "2026-09-26",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
