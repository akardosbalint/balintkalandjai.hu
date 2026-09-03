import { siteConfig } from "@/lib/site-config";
import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = `Általános Szerződési Feltételek — ${siteConfig.brandName}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage(
    "Általános Szerződési Feltételek",
    "A hírlevél-szolgáltatás igénybevételének feltételei."
  );
}
