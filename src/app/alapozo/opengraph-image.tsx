import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Nirmana Meditációs Alapozó — Nem kell megvilágosodnod ahhoz, hogy békére lelj";
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage(
    "Nem kell megvilágosodnod ahhoz, hogy békére lelj.",
    "Nirmana Meditációs Alapozó — Ingyenes 7 napos útmutató"
  );
}
