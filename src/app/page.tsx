import About from "@/components/About";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import CorporateFocus from "@/components/CorporateFocus";
import CourtCta from "@/components/CourtCta";
import Faq from "@/components/Faq";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Marquee from "@/components/Marquee";
import PracticeAreas from "@/components/PracticeAreas";
import Principles from "@/components/Principles";

// Render on each request so images dropped into public/images are picked up.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <CorporateFocus />
        <PracticeAreas />
        <Approach />
        <Principles />
        <CourtCta />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
