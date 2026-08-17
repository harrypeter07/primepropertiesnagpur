import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Parallax3DTransition } from "@/components/sections/Parallax3DTransition";
import { PropertyTypesGrid } from "@/components/sections/PropertyTypesGrid";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { WhyChooseBhoomi } from "@/components/sections/WhyChooseBhoomi";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DarkStatsBand } from "@/components/sections/DarkStatsBand";
import { InsightsBlog } from "@/components/sections/InsightsBlog";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <Parallax3DTransition />
      <PropertyTypesGrid />
      <FeaturedListings />
      <WhyChooseBhoomi />
      <HowItWorks />
      <DarkStatsBand />
      <InsightsBlog />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
