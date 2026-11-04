import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import OurApproach from "@/components/OurApproach";
import Experiences from "@/components/Experiences";
import Destinations from "@/components/Destinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import InspirationGallery from "@/components/InspirationGallery";
import GoogleReviews from "@/components/GoogleReviews";
import PlanYourJourney from "@/components/PlanYourJourney";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
        {/* Editorial Navigation */}
        <Navbar />

        {/* Main Content Flow */}
        <main className="flex-1">
          {/* Full-screen Cinematic 5-Video Hero */}
          <Hero />

          {/* Brand Story & Philosophy */}
          <BrandStory />

          {/* Our Approach (Three Pillars) */}
          <OurApproach />

          {/* Signature Experiences */}
          <Experiences />

          {/* Minimal Destinations Portfolio */}
          <Destinations />

          {/* Why Discerning Travellers Choose Us */}
          <WhyChooseUs />

          {/* Pure Visual Inspiration Gallery */}
          <InspirationGallery />

          {/* Authentic 100% Google Reviews Section */}
          <GoogleReviews />

          {/* Tailored Consultation Enquiry Form & WhatsApp CTA */}
          <PlanYourJourney />
        </main>

        {/* Brand Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
