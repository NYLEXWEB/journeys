"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Clock,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  HandHeart,
  Map,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { trackWhatsAppClick, trackCTAClick, trackJourneyView } from "@/lib/analytics";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

interface JourneyItem {
  id: string;
  aliases?: string[];
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  pace: string;
  category: "classic" | "slow" | "nature" | "culture" | "south-india";
  image: string;
  route: string[];
  overview: string;
  highlights: string[];
  stayStyle: string;
  bestFor: string;
}

const JOURNEYS: JourneyItem[] = [
  {
    id: "kerala-discovery",
    aliases: ["classic-kerala"],
    number: "01",
    title: "Kerala Discovery Journeys",
    subtitle: "From Colonial Spice Ports to Tea Valleys & Silent Backwaters",
    duration: "10 Days · 9 Nights",
    pace: "Relaxed & Immersive",
    category: "classic",
    image: "/images/generated/tea-plantation-approach.webp",
    route: ["Fort Kochi", "Munnar Highlands", "Thekkady Spices", "Kumarakom", "Alleppey Backwaters", "Marari Coast"],
    overview:
      "A quintessential introduction to God's Own Country. Designed with relaxed pacing so you never spend exhausting long days on the road. Begin in historical Fort Kochi, climb into the cool misty tea gardens of Munnar, descend to the spice hills of Periyar, and conclude with silent backwater canals on a private kettuvallam and barefoot ocean sunsets.",
    highlights: [
      "Colonial spice warehouse walk with a local architectural historian",
      "Private sunrise tea tasting with a third-generation Munnar planter",
      "Guided cardamom & pepper trail in organic spice forests",
      "Overnight on a hand-crafted private eco-houseboat with your own chef",
      "Private chauffeur throughout in pristine air-conditioned comfort",
    ],
    stayStyle: "Characterful Heritage Planters' Bungalows & Waterfront Boutique Retreats",
    bestFor: "First-time visitors to Kerala, couples, and discerning families",
  },
  {
    id: "romantic-escapes",
    aliases: ["slow-kerala"],
    number: "02",
    title: "Romantic Kerala Escapes",
    subtitle: "Intimate Sanctuaries, Candlelit Lagoon Dining & Cliffside Ocean Views",
    duration: "8 Days · 7 Nights",
    pace: "Very Slow & Restorative",
    category: "slow",
    image: "/images/generated/coastal-varkala.webp",
    route: ["Fort Kochi", "Munnar Highlands", "Vembanad Lake", "Varkala Cliffside Hideaways"],
    overview:
      "Far from standard group tours, this romantic escape embraces quiet privacy. Candlelit dinners overlooking mist-kissed valleys, private sunset cruises on Vembanad Lake, authentic couple's Ayurvedic rejuvenations, and cliffside ocean dinners with the whisper of Arabian Sea waves.",
    highlights: [
      "Private plunge pool villas nestled inside tea plantations and coastal cliffs",
      "Private sunset Vembanad boat cruise with chilled drinks and artisanal bites",
      "Couples synchronized Ayurvedic herbal rejuvenation treatments",
      "Secluded dining under the stars arranged away from public view",
    ],
    stayStyle: "Intimate Private Villas, Restored Heritage Tharavadu & Cliff Sanctuaries",
    bestFor: "Honeymoons, anniversaries, couples, and slow-living seekers",
  },
  {
    id: "family-holidays",
    aliases: ["family-senior"],
    number: "03",
    title: "Family Holiday Journeys",
    subtitle: "Multi-Generational Comfort with Gentle Pacing & Engaging Nature",
    duration: "9 Days · 8 Nights",
    pace: "Gentle & Engaging",
    category: "nature",
    image: "/images/services/family-senior-friendly.webp",
    route: ["Fort Kochi", "Wayanad Rainforest", "Thekkady", "Alleppey Backwaters", "Kovalam Shores"],
    overview:
      "Crafted specifically for families travelling with children or senior grandparents. Spacious private vehicles, gentle travel distances, interconnected luxury rooms, interactive spice farm walks, bamboo canoe excursions, and relaxed days where everyone unwinds comfortably.",
    highlights: [
      "Senior-friendly ground-floor, step-free rooms verified personally",
      "Interactive village farm walks and pottery workshops for children",
      "Spacious luxury family chauffeur van with child seats and Wi-Fi",
      "Special dietary coordination (mild spices, allergies, and children's preferences)",
    ],
    stayStyle: "Spacious Multi-Bedroom Estate Villas & Waterfront Family Resorts",
    bestFor: "Families with young children, teenagers, or elderly grandparents",
  },
  {
    id: "nature-wildlife",
    aliases: ["beyond-usual"],
    number: "04",
    title: "Nature & Wildlife Journeys",
    subtitle: "Cloud Forests, Shola Grasslands & Deep Bio-diverse Corridors",
    duration: "11 Days · 10 Nights",
    pace: "Active & Nature-Focused",
    category: "nature",
    image: "/images/generated/hero-kerala.webp",
    route: ["Periyar Tiger Reserve", "Wayanad Rainforest", "Silent Valley", "Nagarhole Wilderness"],
    overview:
      "For naturalists and conservation enthusiasts. Accompanied by certified forest naturalists, venture deep into tropical evergreen reserves for silent lake rafting, canopy treks, night walks seeking endemic amphibians, and dawn safaris tracking wild elephants and birdlife.",
    highlights: [
      "Silent dawn bamboo lake rafting through Periyar National Park",
      "Escorted walks with former tribal poachers turned conservation wardens",
      "Night walks exploring bioluminescent flora and endemic frogs",
      "Eco-conscious treehouse stays and canopy lodges perched over streams",
    ],
    stayStyle: "Eco-Luxe Forest Lodges & High-Altitude Plantation Cottages",
    bestFor: "Nature enthusiasts, birdwatchers, photographers, and active hikers",
  },
  {
    id: "south-india-heritage",
    aliases: ["south-india"],
    number: "05",
    title: "South India Heritage Journeys",
    subtitle: "Living Chola Temples, Chettinad Mansions & Backwater Stillness",
    duration: "14 to 16 Days",
    pace: "Cultural & Comprehensive",
    category: "south-india",
    image: "/images/generated/fort-kochi-heritage.webp",
    route: ["Fort Kochi", "Munnar", "Madurai", "Chettinad", "Thanjavur", "Kumarakom"],
    overview:
      "A cross-peninsular master route connecting the lush tropical serenity of Kerala with the towering Dravidian stone temple architecture and palatial grandeur of Tamil Nadu. Experience two starkly distinct cultures, languages, and culinary worlds linked by a scenic passage through the Western Ghats.",
    highlights: [
      "Private dawn tour of Madurai's Meenakshi Sundareswarar Temple",
      "Stay inside a 100-room heritage Chettinad merchant mansion with teak pillars",
      "Private viewing of UNESCO World Heritage Great Living Chola Temples",
      "Return across the high passes to the tranquil Kerala backwaters",
    ],
    stayStyle: "Palatial Chettinad Mansions, Heritage Hotels & Kerala Water Villas",
    bestFor: "Architecture lovers, culture enthusiasts, and global explorers",
  },
  {
    id: "culture-cuisine",
    number: "06",
    title: "Spices, Flavours & Forgotten Ports",
    subtitle: "An Epicurean & Cultural Passage Across South India",
    duration: "9 to 11 Days",
    pace: "Leisurely & Gastronomic",
    category: "culture",
    image: "/images/generated/spice-gardens.webp",
    route: ["Fort Kochi", "Kuttanad Backwaters", "Alleppey", "Marari Coast"],
    overview:
      "Kerala has drawn traders from Rome, China, and Arabia for three millennia for one treasure: spices. This culinary-led journey introduces you to master cooks, organic spice farmers, and authentic home kitchens across Jewish, Syrian Christian, Dutch, and coastal communities.",
    highlights: [
      "Market-to-table culinary walk through Mattancherry spice bazaar",
      "Traditional multi-course feast (Sadya) served on fresh banana leaves",
      "Fishing with traditional cast nets alongside local backwater fishers",
      "Sunset coastal seafood dinner prepared on a secluded beach",
    ],
    stayStyle: "Historic Boutique Villas & Farm-to-Table Coastal Sanctuaries",
    bestFor: "Food lovers, cultural explorers, and culinary couples",
  },
];

export default function JourneysClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Smoothly scroll to target journey or bespoke section on arrival with hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      setSelectedCategory("all");
      setTimeout(() => {
        let el = document.getElementById(hash);
        // Also check aliases if primary ID was not found directly
        if (!el) {
          const matched = JOURNEYS.find(
            (j) => j.id === hash || (j.aliases && j.aliases.includes(hash))
          );
          if (matched) {
            el = document.getElementById(matched.id);
          }
        }
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const content = useWebsiteContent();
  const journeysData = content.journeys?.length ? content.journeys : JOURNEYS;

  const filteredJourneys =
    selectedCategory === "all"
      ? journeysData
      : journeysData.filter((j: any) => j.category === selectedCategory);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* Return to Home Breadcrumb */}
      <div>
        <Link
          href="/#travel-with-jibu"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35] hover:text-[#183D2B] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </Link>
      </div>

      {/* Editorial Header */}
      <header className="max-w-4xl space-y-4 pb-4 border-b border-[#E9E0D2]">
        <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
          <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
          <span>BESPOKE ITINERARIES &bull; FOUNDER-CURATED ROUTES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08]">
          Journeys,{" "}
          <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
            Never Packages.
          </span>
        </h1>
        <p className="text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed pt-2">
          We do not offer pre-packaged, fixed-departure group bus tours. Every journey below is a proven, thoughtfully paced framework personally refined by Jibu Thomas over two decades — adapted completely to your preferred travel dates, pace, and interests.
        </p>

        {/* Founder Quote Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#8B5E35]/30">
            <Image
              src={content.about?.jibuImage || "/images/travel-with-jibu-reference.webp"}
              alt="Jibu Thomas - Founder"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1.5">
            <p className="font-serif italic text-base sm:text-lg text-[#183D2B] leading-snug">
              &ldquo;The biggest mistake people make in Kerala is rushing between destinations. Kerala is meant to be absorbed slowly — one sunrise tea, one spice breeze, and one quiet boat channel at a time.&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35] font-semibold pt-1">
              <span>Jibu Thomas</span>
              <span>&bull;</span>
              <span>Founder &amp; Bespoke Travel Designer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: "all", label: "All Journeys (6)" },
          { id: "classic", label: "Classic Kerala" },
          { id: "slow", label: "Slow & Romantic" },
          { id: "nature", label: "Highlands & Wildlife" },
          { id: "south-india", label: "Kerala & Tamil Nadu" },
          { id: "culture", label: "Cuisine & Culture" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            suppressHydrationWarning
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-[#183D2B] text-[#FFFCF5] shadow-md"
                : "bg-white border border-[#E9E0D2] text-[#242424]/75 hover:border-[#183D2B] hover:text-[#183D2B]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Journeys Showcase List */}
      <div className="space-y-16 sm:space-y-24">
        {filteredJourneys.map((journey: any) => (
          <article
            key={journey.id}
            id={journey.id}
            className="scroll-mt-32 p-5 sm:p-10 lg:p-14 rounded-[2rem] sm:rounded-[3rem] bg-white border border-[#E9E0D2] shadow-[0_15px_45px_rgba(24,61,43,0.06)] hover:shadow-[0_25px_60px_rgba(24,61,43,0.12)] transition-shadow duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Visual Side */}
              <div className="lg:col-span-5 relative h-[360px] sm:h-[440px] lg:h-[500px] rounded-[2.2rem] overflow-hidden shadow-md border border-[#E9E0D2]/60">
                <Image
                  src={journey.image || "/images/generated/fort-kochi-heritage.webp"}
                  alt={journey.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Top Duration Badge */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#183D2B] shadow-sm flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8B5E35]" />
                    {journey.duration}
                  </span>
                </div>

                {/* Bottom Route Preview */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold block mb-1">
                    Route Flow:
                  </span>
                  <p className="text-xs text-white/90 font-serif leading-snug">
                    {Array.isArray(journey.route)
                      ? journey.route.join(" → ")
                      : (journey.route || "")}
                  </p>
                </div>
              </div>

              {/* Editorial Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#8B5E35] font-semibold mb-2">
                    <span>Journey {journey.number}</span>
                    <span>&bull;</span>
                    <span>Pace: {journey.pace || "Relaxed & Immersive"}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light leading-snug">
                    {journey.title}
                  </h2>
                  {(journey.subtitle || journey.shortVibe) && (
                    <p className="font-serif italic text-sm text-[#8B5E35] mt-2">
                      &ldquo;{journey.subtitle || journey.shortVibe}&rdquo;
                    </p>
                  )}
                </div>

                <p className="text-sm sm:text-base text-[#242424]/85 font-light leading-relaxed">
                  {journey.overview}
                </p>

                {/* Signature Highlights */}
                <div className="pt-2 border-t border-[#E9E0D2]/70 space-y-3">
                  <h3 className="text-xs uppercase tracking-widest text-[#183D2B] font-bold">
                    Signature Inclusions:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(Array.isArray(journey.highlights) ? journey.highlights : []).map((hl: any, hIdx: number) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#242424]/80">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stay Style & Suitability */}
                <div className="p-4 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                      Handpicked Accommodation
                    </span>
                    <span className="text-[#183D2B] font-medium block mt-0.5">
                      {journey.stayStyle || "Boutique Heritage & Luxury Retreats"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                      Ideal For
                    </span>
                    <span className="text-[#183D2B] font-medium block mt-0.5">
                      {journey.bestFor || "Couples, families & discerning travellers"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/plan-your-journey?journey=${encodeURIComponent(journey.title)}`}
                    onClick={() => trackCTAClick("Inquire About This Journey", `/plan-your-journey?journey=${journey.title}`, "journeys_page")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md active:scale-95"
                  >
                    <span>Inquire About This Journey</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/919447000000?text=${encodeURIComponent(`Hello Jibu, I am interested in customizing the "${journey.title}" (${journey.duration}). Could you share your recommendations?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("journeys_page_card", journey.title)}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#E9E0D2] hover:border-[#25D366] text-[#183D2B] text-xs uppercase tracking-widest font-semibold transition-all shadow-sm active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    <span>Consult via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* DEDICATED BESPOKE JOURNEYS SECTION */}
      <section id="bespoke" className="scroll-mt-32 p-8 sm:p-14 lg:p-16 rounded-[3rem] bg-[#FFFCF5] border border-[#E9E0D2] shadow-sm space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-4 h-4 text-[#8B5E35]" />
            <span>BESPOKE TAILORING &bull; ZERO PACKAGES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light">
            Crafted from a Blank Canvas.
          </h2>
          <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
            Every bespoke journey is sculpted around your arrival flight, travel companions, dietary preferences, and personal cadence. Here are the three pillars that govern our work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-7 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-3xl text-[#8B5E35]">01</span>
              <div className="p-2.5 rounded-2xl bg-[#183D2B]/5 text-[#8B5E35]">
                <Map className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-serif text-[#183D2B] font-medium">
              100% Tailor-Made Itineraries
            </h3>
            <p className="text-xs sm:text-sm text-[#242424]/75 font-light leading-relaxed">
              No off-the-shelf templates. We build each route around your exact dates, flight timings, pace, and specific curiosities.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-3xl text-[#8B5E35]">02</span>
              <div className="p-2.5 rounded-2xl bg-[#183D2B]/5 text-[#8B5E35]">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-serif text-[#183D2B] font-medium">
              Unhurried, Mindful Cadence
            </h3>
            <p className="text-xs sm:text-sm text-[#242424]/75 font-light leading-relaxed">
              We insist on at least 2 to 3 nights per destination. You unpack once, absorb the local rhythm, and return home genuinely rejuvenated.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-3xl text-[#8B5E35]">03</span>
              <div className="p-2.5 rounded-2xl bg-[#183D2B]/5 text-[#8B5E35]">
                <HandHeart className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-serif text-[#183D2B] font-medium">
              Direct Founder Care with Jibu
            </h3>
            <p className="text-xs sm:text-sm text-[#242424]/75 font-light leading-relaxed">
              You speak directly with founder Jibu Thomas. His personal WhatsApp line remains active with you 24/7 throughout your travels.
            </p>
          </div>
        </div>

        {/* Bespoke Action Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#183D2B] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FFFCF5]">
              Begin your bespoke journey consultation
            </h3>
            <p className="text-xs sm:text-sm text-[#E9E0D2]/80 font-light max-w-xl">
              Tell us your approximate dates and travel ideas. Jibu Thomas will personally respond with recommendations within a few hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/plan-your-journey"
              className="px-8 py-4 rounded-full bg-[#8B5E35] hover:bg-[#a06d3f] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg active:scale-95"
            >
              Plan Your Journey
            </Link>
            <a
              href="https://wa.me/919447000000?text=Hello%20Jibu,%20I%20am%20interested%20in%20planning%20a%20bespoke%20journey%20to%20Kerala."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold transition-all border border-white/20 flex items-center gap-2 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Jibu</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
