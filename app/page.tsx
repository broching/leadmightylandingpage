import { LandingNav } from "./_components/landing-nav";
import { Band } from "./_components/band";
import { BlueprintHero } from "./_components/blueprint-hero";
import { LogoStrip } from "./_components/logo-strip";
import { PlatformSection } from "./_components/platform-section";
import { ProductsSection } from "./_components/products-section";
import { TeamNote } from "./_components/team-note";
import { PrinciplesSection } from "./_components/principles-section";
import { ContactSection } from "./_components/contact-section";
import { SiteFooter } from "./_components/site-footer";

export default function LandingPage() {
  return (
    <main>
      <LandingNav />

      {/* Each band shifts shade + texture, so the page reads as a set of drawings. */}
      <Band variant="grid">
        <BlueprintHero />
        <LogoStrip />
      </Band>

      <Band variant="dots">
        <PlatformSection />
      </Band>

      <Band variant="grid">
        <ProductsSection />
      </Band>

      <Band variant="dots">
        <TeamNote />
      </Band>

      <Band variant="grid">
        <PrinciplesSection />
      </Band>

      <Band variant="dots">
        <ContactSection />
      </Band>

      <SiteFooter />
    </main>
  );
}
