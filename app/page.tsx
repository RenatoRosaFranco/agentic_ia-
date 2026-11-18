import { AboutSection } from "./components/about-section";
import { AudienceSection } from "./components/audience-section";
import { ExampleSection } from "./components/workflows-section";
import { ActivitiesSection } from "./components/path-section";
import { InstructorSection } from "./components/instructor-section";
import { EditionSection } from "./components/pilot-section";
import { FaqSection } from "./components/faq-section";
import { WhatsappSection } from "./components/whatsapp-section";
import { HeroSection } from "./components/hero-section";
import { TakeawaysSection } from "./components/outcomes-section";
import { PreRegistrationProvider } from "./components/pre-registration";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <PreRegistrationProvider>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <HeroSection />
        <ActivitiesSection />
        <TakeawaysSection />
        <ExampleSection />
        <AudienceSection />
        <AboutSection />
        <EditionSection />
        <InstructorSection />
        <FaqSection />
        <WhatsappSection />
      </main>
      <SiteFooter />
    </PreRegistrationProvider>
  );
}
