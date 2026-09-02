import { siteConfig } from "@/lib/site-config";
import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = `Adatkezelési tájékoztató — ${siteConfig.brandName}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage(
    "Adatkezelési tájékoztató",
    "Milyen adatokat kezelünk, milyen jogalapon, és milyen jogaid vannak."
  );
}
