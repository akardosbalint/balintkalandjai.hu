import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/dashboard",
        "/dashboard/*",
        "/api/*",
        "/koszonom",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
