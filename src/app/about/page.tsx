import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Compass, UserCheck, Heart, ShieldCheck, ArrowLeft, ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";

export const metadata = {
  title: "About Us | Journeys by Jibu Thomas",
  description: "Learn about Journeys by Jibu Thomas, our two decades of destination craftsmanship, travel philosophy, and bespoke boutique standards in Kerala and South India.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Editorial Top Bar / Breadcrumb */}
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35] hover:text-[#183D2B] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <header className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 border-b border-[#E9E0D2]">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
            <span>ABOUT JOURNEYS BY JIBU THOMAS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08] max-w-4xl">
            South India, experienced with{" "}
            <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              soul, depth &amp; unhurried grace.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed max-w-3xl">
            We are an independent boutique travel atelier based in Kerala. For over twenty years, we have designed privately chauffeured journeys that steer discerning travellers away from crowded tourist circuits into authentic, living encounters.
          </p>

          {/* Quick jump navigation */}
          <div className="mt-10 flex flex-wrap gap-2.5 sm:gap-3">
            {[
              { id: "story", label: "01 · Our Founding Story" },
              { id: "jibu", label: "02 · Meet Jibu Thomas" },
              { id: "philosophy", label: "03 · Travel Philosophy" },
              { id: "why-us", label: "04 · Boutique Standards" },
            ].map((anchor) => (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                className="px-4 py-2 rounded-full border border-[#E9E0D2] bg-white/70 hover:bg-[#183D2B] hover:text-[#FFFCF5] hover:border-[#183D2B] text-xs uppercase tracking-wider text-[#183D2B] transition-all duration-300 font-medium shadow-sm"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </header>

        {/* CHAPTER 1: OUR STORY */}
        <section id="story" className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-[#E9E0D2] scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(24,61,43,0.12)] border border-[#E9E0D2]">
              <Image
                src="/images/generated/tea-plantation-approach.jpg"
                alt="Kerala Western Ghats tea highlands"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold">
                  Munnar &bull; Western Ghats
                </span>
                <p className="font-serif italic text-base text-white/95 mt-1">
                  &ldquo;A path carved away from tourist buses.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
                <Compass className="w-4 h-4 text-[#8B5E35]" />
                <span>Chapter 01</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#183D2B] font-light leading-tight">
                Born from an intimate knowledge of Kerala&apos;s quiet corners.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
                <p>
                  Journeys by Jibu Thomas was founded out of a clear realization: mass commercial tourism was diluting the magic of South India. Discerning travellers were being herded into standard souvenir shops, crowded boat jetties, and rushed one-night hotel stops.
                </p>
                <p>
                  We grew up along Kerala&apos;s backwaters and traversed the spice-scented mountain passes of the Western Ghats. We realized that true luxury is not gold-plated faucets; it is having the right door unlocked, meeting a third-generation spice grower, and sitting on a veranda listening to the mist settle across tea slopes.
                </p>
                <p>
                  Every journey we craft is built from a blank sheet of paper. We never sell fixed tour packages; we tailor routes around flight times, interests, and natural rhythms.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#E9E0D2] shadow-sm">
                  <div className="text-2xl font-serif text-[#183D2B] font-light">20+ Years</div>
                  <div className="text-xs text-[#242424]/70 mt-1 uppercase tracking-wider">Destination Craftsmanship</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E9E0D2] shadow-sm">
                  <div className="text-2xl font-serif text-[#183D2B] font-light">100% Bespoke</div>
                  <div className="text-xs text-[#242424]/70 mt-1 uppercase tracking-wider">No Packaged Group Tours</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 2: MEET JIBU THOMAS */}
        <section id="jibu" className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-[#E9E0D2] scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
                <UserCheck className="w-4 h-4 text-[#8B5E35]" />
                <span>Chapter 02</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#183D2B] font-light leading-tight">
                Direct personal accountability from Jibu Thomas.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
                <p>
                  In a world of corporate booking engines and detached call centres, Jibu Thomas offers something increasingly rare: direct personal oversight. When you contact our atelier, you speak directly with Jibu and his close-knit operations team in Kerala.
                </p>
                <p>
                  With more than two decades immersed in South Indian hospitality, Jibu maintains intimate personal relationships with boutique resort owners, heritage bungalow custodians, private boat captains, and master naturalists.
                </p>
                <p>
                  During your stay, Jibu is personally reachable via WhatsApp for real-time adjustments, weather advisories, or spontaneous culinary recommendations.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20plan%20a%20private%20journey."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp Jibu Directly</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#183D2B] font-semibold hover:text-[#8B5E35] transition-colors"
                >
                  <span>Or use enquiry form</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(24,61,43,0.12)] border border-[#E9E0D2] order-1 lg:order-2">
              <Image
                src="/images/generated/fort-kochi-heritage.jpg"
                alt="Fort Kochi heritage architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold">
                  Heritage Craftsmanship
                </span>
                <p className="font-serif italic text-base text-white/95 mt-1">
                  &ldquo;Every journey carries my personal name and guarantee.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 3: TRAVEL PHILOSOPHY */}
        <section id="philosophy" className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-[#E9E0D2] scroll-mt-28">
          <div className="space-y-4 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
              <Heart className="w-4 h-4 text-[#8B5E35]" />
              <span>Chapter 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#183D2B] font-light leading-tight">
              The four pillars of our travel philosophy.
            </h2>
            <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
              We design itineraries according to timeless principles of slow, respectful exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                number: "01",
                title: "Unhurried Cadence",
                desc: "We mandate at least two nights in each destination (and three in highland plantations). You unpack once, adjust to the tropical light, and experience the stillness of dawn and dusk.",
              },
              {
                number: "02",
                title: "Living Heritage, Not Staged Shows",
                desc: "We avoid sanitized commercial performances. Instead, we connect you with authentic temple ritual arts, family kitchen cooking lessons, and generational artisans working in their village workshops.",
              },
              {
                number: "03",
                title: "Bespoke Freedom",
                desc: "With your private vehicle and seasoned chauffeur at your disposal, you set the daily pace. Stop for fragrant filter coffee at a hillside stall or linger at a forest viewpoint without a rigid tour schedule.",
              },
              {
                number: "04",
                title: "Conscious Respect",
                desc: "We work exclusively with locally owned heritage properties, independent naturalists, and community hosts, ensuring your travel spend directly benefits and preserves South India's delicate ecosystems.",
              },
            ].map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 sm:p-8 rounded-[2rem] bg-white border border-[#E9E0D2] shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-serif italic text-2xl text-[#8B5E35] block mb-3">
                  Pillar {pillar.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#183D2B] font-light mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#242424]/75 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER 4: BOUTIQUE STANDARDS */}
        <section id="why-us" className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-28">
          <div className="space-y-4 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#8B5E35]" />
              <span>Chapter 04</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#183D2B] font-light leading-tight">
              The boutique standards you can count on.
            </h2>
            <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
              Every detail is engineered to protect your peace of mind from touchdown to takeoff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Zero Cookie-Cutter Routes",
                desc: "No re-used templates. Each itinerary is designed around your travel dates, flight times, walking ability, and specific culinary or cultural interests.",
              },
              {
                title: "Immaculate Fleet & Chauffeurs",
                desc: "Air-conditioned, late-model vehicles stocked with bottled water, hand towels, and quiet, verified chauffeurs who drive with serene care.",
              },
              {
                title: "No Hidden Commissions",
                desc: "We never steer our guests to tourist commission emporiums or forced shopping stops. Every recommendation is made purely on genuine merit.",
              },
              {
                title: "Personally Inspected Stays",
                desc: "Jibu Thomas personally inspects every tea bungalow, heritage homestay, and kettuvallam for hygiene, bedding quality, water pressure, and hospitality.",
              },
              {
                title: "24/7 Local Concierge",
                desc: "Our operations desk in Kerala monitors your progress in real time. Road advisories, monsoon checks, and flight updates are handled proactively.",
              },
              {
                title: "Direct WhatsApp Line",
                desc: "Have a question while browsing local bazaars or want an impromptu dining spot? Jibu is a quick WhatsApp message away throughout your journey.",
              },
            ].map((std, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#E9E0D2]/25 border border-[#E9E0D2]/60 hover:bg-white transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-[#183D2B] mb-3" />
                <h4 className="text-lg font-serif text-[#183D2B] font-medium mb-1.5">{std.title}</h4>
                <p className="text-xs sm:text-sm text-[#242424]/75 font-light leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action Card */}
          <div className="mt-16 p-8 sm:p-12 rounded-[2.5rem] bg-[#183D2B] text-[#FFFCF5] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-[#E9E0D2] font-semibold">
                Start Your Conversation
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-light">
                Ready to craft your private South Indian escape?
              </h3>
              <p className="text-xs sm:text-sm text-[#FFFCF5]/75 font-light">
                Reach out to Jibu Thomas for an unhurried, thoughtful consultation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20plan%20a%20journey."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp Jibu</span>
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold border border-white/20 transition-all"
              >
                <span>Plan Your Journey</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
