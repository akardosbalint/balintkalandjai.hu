// A Google Consent Mode default script (layout.tsx) és a téma-inicializáló
// FOUC-script inline fut, nonce-infrastruktúra (middleware) nélkül — ezért a
// CSP itt 'unsafe-inline'-t enged a script-src/style-src-ben ahelyett, hogy
// nonce-okat vezetnénk be (ami saját, a Next.js-ben is ismert CSP-nonce XSS
// kockázati kategóriát nyitna meg). Enélkül is érdemi védelmet ad a többi
// direktíva (frame-ancestors, object-src, base-uri, form-action).
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/adatkezeles",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/aszf",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/gyik",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
