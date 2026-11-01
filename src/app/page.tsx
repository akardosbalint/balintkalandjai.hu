import Hero from "@/components/Hero";
import Story from "@/components/Story";
import WhatYouGet from "@/components/WhatYouGet";
import SecondCTA from "@/components/SecondCTA";
import StickyCTA from "@/components/StickyCTA";
import SectionPath from "@/components/SectionPath";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.brandName,
        description: siteConfig.description,
        inLanguage: "hu",
        publisher: {
          "@id": `${siteConfig.url}/#author`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#author`,
        name: siteConfig.ownerFullName,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/kardos-balint-profil.jpg`,
        jobTitle: "Jógaoktató-jelölt (RYT-500)",
        sameAs: [
          siteConfig.social.tiktok,
          siteConfig.social.instagram,
          siteConfig.social.youtube,
          siteConfig.social.facebook,
        ],
      },
    ],
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <SectionPath from="outer" to="inner" />
      <Story />
      <SectionPath from="inner" to="inner" />
      <WhatYouGet />
      <SectionPath from="inner" to="outer" />
      <SecondCTA />
      <StickyCTA />
    </main>
  );
}
