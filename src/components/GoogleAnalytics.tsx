import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * A gtag.js betöltése és konfigurálása. A Google Consent Mode
 * "default" (elutasítva) beállítását — aminek MINDIG meg kell
 * előznie ezt, még hydration előtt — a layout.tsx-ben lévő
 * beforeInteractive script végzi, mert a Next.js App Router csak
 * onnan garantálja a helyes befecskendezési sorrendet.
 */
export default function GoogleAnalytics() {
  const gaId = siteConfig.analytics.googleMeasurementId;
  if (!gaId) return null;

  return (
    <>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
