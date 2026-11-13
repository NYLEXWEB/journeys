import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Destinations from "@/components/Destinations";
import CuratedExperiences from "@/components/CuratedExperiences";
import TravelWithJibu from "@/components/TravelWithJibu";
import OurServices from "@/components/OurServices";
import TravelJournal from "@/components/TravelJournal";
import GoogleReviews from "@/components/GoogleReviews";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StackingSection from "@/components/StackingSection";
import AssetPreloader from "@/components/AssetPreloader";

// Auto-sync uploaded loading screen background image into public directory
try {
  const loadingBgSrc =
    "C:/Users/hnith/.gemini/antigravity/brain/36c02f30-c454-4f2b-854c-03b740c50939/.user_uploaded/media_1794576340271_981bc8e6.jpg";
  const loadingBgDest = path.join(process.cwd(), "public", "images", "loading-screen-bg.jpg");
  if (fs.existsSync(loadingBgSrc)) {
    fs.copyFileSync(loadingBgSrc, loadingBgDest);
  }
} catch (err) {
  // Silent fallback
}

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
          {/* HOME Cover: Cinematic Hero (Sticky Pin Curtain) */}
          <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
            <Hero />
          </div>

          {/* 1. ABOUT US: Page 1 */}
          <StackingSection zIndex={10} isFirst={true}>
            <AboutUs />
          </StackingSection>

          {/* 2. DESTINATIONS: Page 2 */}
          <StackingSection zIndex={12}>
            <Destinations />
          </StackingSection>

          {/* 3. CURATED EXPERIENCES: Page 3 */}
          <StackingSection zIndex={14}>
            <CuratedExperiences />
          </StackingSection>

          {/* 4. TRAVEL WITH JIBU: Page 4 */}
          <StackingSection zIndex={16}>
            <TravelWithJibu />
          </StackingSection>

          {/* 5. OUR SERVICES: Page 5 */}
          <StackingSection zIndex={18}>
            <OurServices />
          </StackingSection>

          {/* 6. TRAVEL JOURNAL: Page 6 */}
          <StackingSection zIndex={20}>
            <TravelJournal />
          </StackingSection>

          {/* Authentic Google Reviews & Guest Stories: Page 7 */}
          <StackingSection zIndex={22}>
            <GoogleReviews />
          </StackingSection>

          {/* 7. CONTACT US: Page 8 */}
          <StackingSection zIndex={24}>
            <ContactUs />
          </StackingSection>
        </main>

        {/* Structured Brand Footer: Page 9 */}
        <StackingSection zIndex={26} isFooter={true}>
          <Footer />
        </StackingSection>

        {/* Floating Minimalist WhatsApp Concierge */}
        <FloatingWhatsApp />
      </div>
    </SmoothScroll>
  );
}
