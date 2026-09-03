import { siteConfig } from "@/lib/site-config";
import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = `Gyakori kérdések — ${siteConfig.brandName}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage(
    "Gyakori kérdések",
    "Mi ez, ingyenes-e, és hogyan iratkozhatsz le."
  );
}
