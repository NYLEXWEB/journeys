import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Destinations from "@/components/Destinations";
import CuratedExperiences from "@/components/CuratedExperiences";
import TravelWithJibu from "@/components/TravelWithJibu";
import OurServices from "@/components/OurServices";
import TravelJournal from "@/components/TravelJournal";
import GoogleReviews from "@/components/GoogleReviews";
import FAQ from "@/components/FAQ";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StackingSection from "@/components/StackingSection";
import CurtainVideoReveal from "@/components/CurtainVideoReveal";
import CurtainImageReveal from "@/components/CurtainImageReveal";
import AssetPreloader from "@/components/AssetPreloader";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Real-time Website Asset Preloader & Luxury Loading Screen */}
      <AssetPreloader />

      <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
        {/* Editorial Navigation with Exact Site Hierarchy Mega-menus */}
        <Navbar />

        {/* Main Content Flow */}
        <main className="flex-1 relative">
          {/* HOME Cover: Cinematic Hero */}
          <div className="relative z-0 min-h-screen w-full overflow-hidden">
            <Hero />
          </div>

          {/* 1. ABOUT US: Page 1 */}
          <StackingSection zIndex={10} isFirst={true}>
            <AboutUs />
          </StackingSection>

          {/* Fixed Background Video Curtain Reveal between About Us & Destinations */}
          <CurtainVideoReveal slot={1} videoSrc="/video/video-1.mp4" portalZIndex={5} />

          {/* 2. DESTINATIONS: Page 2 */}
          <StackingSection zIndex={12}>
            <Destinations />
          </StackingSection>

          {/* 3. CURATED EXPERIENCES: Page 3 */}
          <StackingSection zIndex={14}>
            <CuratedExperiences />
          </StackingSection>

          {/* Fixed Background Image Curtain Reveal between Curated Experiences & Travel With Jibu */}
          <CurtainImageReveal
            imageSrc="/images/generated/hero-kerala.webp"
            alt="Misty Western Ghats and Emerald Waterways of Kerala"
            portalZIndex={6}
          />

          {/* 4. TRAVEL WITH JIBU: Page 4 */}
          <StackingSection zIndex={16}>
            <TravelWithJibu />
          </StackingSection>

          {/* 5. OUR SERVICES: Page 5 */}
          <StackingSection zIndex={18}>
            <OurServices />
          </StackingSection>

          {/* Fixed Background Video Curtain Reveal between Our Services & Travel Blog */}
          <CurtainVideoReveal slot={2} videoSrc="/video/video-4.mp4" portalZIndex={7} />

          {/* 6. TRAVEL BLOG: Page 6 */}
          <StackingSection zIndex={20}>
            <TravelJournal />
          </StackingSection>

          {/* Authentic Google Reviews & Guest Stories: Page 7 */}
          <StackingSection zIndex={22} disableScale={true}>
            <GoogleReviews />
          </StackingSection>

          {/* 7. FREQUENTLY ASKED QUESTIONS: Page 8 (100% Admin Editable Accordion) */}
          <StackingSection zIndex={23} disableOverlap={true}>
            <FAQ />
          </StackingSection>

          {/* 8. CONTACT US: Page 9 */}
          <StackingSection zIndex={24} disableOverlap={true}>
            <ContactUs />
          </StackingSection>
        </main>

        {/* Structured Brand Footer: Page 10 */}
        <StackingSection zIndex={26} isFooter={true}>
          <Footer />
        </StackingSection>

        {/* Floating Minimalist WhatsApp Concierge */}
        <FloatingWhatsApp />
      </div>
    </SmoothScroll>
  );
}
