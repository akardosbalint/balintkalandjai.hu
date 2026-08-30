import Hero from "@/components/Hero";
import Story from "@/components/Story";
import WhatYouGet from "@/components/WhatYouGet";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import SecondCTA from "@/components/SecondCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import TrailDivider from "@/components/TrailDivider";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Story />
      <TrailDivider color="#C1613C" />
      <WhatYouGet />
      <TrailDivider color="#2E3B2C" flip />
      <SocialProof />
      <TrailDivider color="#B8935B" />
      <FAQ />
      <TrailDivider color="#C1613C" flip />
      <SecondCTA />
      <Footer />
      <StickyMobileCTA />
      <ExitIntentPopup />
    </main>
  );
}
