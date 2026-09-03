import Hero from "@/components/Hero";
import Story from "@/components/Story";
import WhatYouGet from "@/components/WhatYouGet";
import SocialProof from "@/components/SocialProof";
import SecondCTA from "@/components/SecondCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Story />
      <WhatYouGet />
      <SocialProof />
      <SecondCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
