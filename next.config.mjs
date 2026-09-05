/** @type {import('next').NextConfig} */
const nextConfig = {
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
