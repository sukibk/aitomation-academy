import { Hero } from "./sections/hero";
import { SocialProof } from "./sections/social-proof";
import { VaultOffer } from "./sections/vault-offer";
import { WhatYouGet } from "./sections/what-you-get";
import { HowItWorks } from "./sections/how-it-works";
import { CommunityWins } from "./sections/community-wins";
import { FounderPricing } from "./sections/founder-pricing";
import { FAQ } from "./sections/faq";
import { FinalCTA } from "./sections/final-cta";
import { Footer } from "./sections/footer";
import { Navbar } from "./components/navbar";
import { StructuredData } from "@/components/structured-data";
import { homePageSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <StructuredData data={homePageSchema()} />
      <main className="min-h-screen bg-white bg-grid overflow-x-hidden">
        <Navbar />
        <Hero />
        <SocialProof />
        <VaultOffer />
        <WhatYouGet />
        <HowItWorks />
        <CommunityWins />
        <FounderPricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
