import Hero from "@/components/Hero";
import Story from "@/components/Story";
import WhatYouGet from "@/components/WhatYouGet";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import SecondCTA from "@/components/SecondCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Story />
      <WhatYouGet />
      <SocialProof />
      <FAQ />
      <SecondCTA />
      <Footer />
      <StickyMobileCTA />
      <ExitIntentPopup />
    </main>
  );
}
