import Hero from "@/components/Hero";
import Story from "@/components/Story";
import WhatYouGet from "@/components/WhatYouGet";
import SecondCTA from "@/components/SecondCTA";
import StickyCTA from "@/components/StickyCTA";
import SectionPath from "@/components/SectionPath";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
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
