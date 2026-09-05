import { siteConfig } from "@/lib/site-config";
import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = `${siteConfig.brandName} — ${siteConfig.description}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage(
    "31 éven keresztül lemaradtam a saját életemről.",
    "67 nap Rishikeshben — élőben dokumentálva"
  );
}
