"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Clock,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { trackWhatsAppClick, trackCTAClick, trackJourneyView } from "@/lib/analytics";

interface JourneyItem {
  id: string;
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
    id: "classic-kerala",
    title: "The Classic Kerala Rhythm",
    subtitle: "From Colonial Spice Ports to Tea Valleys & Silent Backwaters",
    duration: "10 to 12 Days",
    pace: "Relaxed & Immersive",
    category: "classic",
    image: "/images/generated/tea-plantation-approach.jpg",
    route: ["Kochi", "Munnar Highlands", "Thekkady Spices", "Kumarakom", "Alleppey Backwaters"],
    overview:
      "The quintessential introduction to Kerala. Balanced carefully so you never spend exhausting long days on the road. Begin in historical Fort Kochi, climb into the cool misty tea gardens of Munnar, descend to the spice hills of Periyar, and conclude with silent backwater canals on a private kettuvallam.",
    highlights: [
      "Colonial spice warehouse walk with a local architectural historian",
      "Private sunrise tea tasting with a third-generation Munnar planter",
      "Guided cardamom & pepper trail in organic spice forests",
      "Overnight on a hand-crafted private eco-houseboat with your own chef",
    ],
    stayStyle: "Characterful Heritage Bungalows & Waterfront Boutique Retreats",
    bestFor: "First-time visitors to Kerala, couples, and discerning families",
  },
  {
    id: "slow-kerala",
    title: "Slow Living & Heritage Sanctuaries",
    subtitle: "Untouched Malabar, Ancient Ancestral Estates & Silent Waterways",
    duration: "12 to 14 Days",
    pace: "Very Slow & Restorative",
    category: "slow",
    image: "/images/generated/luxury-resort-stay.jpg",
    route: ["Calicut Coast", "Wayanad Rainforest", "Kannur Weavers", "Neeleshwar Sanctuary"],
    overview:
      "Designed for travellers who believe staying longer in fewer places reveals the true soul of a destination. Journey off the tourist trail into Northern Kerala (Malabar), home to ancient spice trade ports, matrilineal ancestral homes, serene uncrowded backwaters, and pristine coconut-fringed shorelines.",
    highlights: [
      "Exclusive stay at an 80-year-old restored plantation manor house",
      "Private evening sacred grove visit to witness authentic Theyyam rituals",
      "Hands-on Mopila & Syrian Christian cooking classes with village elders",
      "Uninterrupted days by secluded beaches with zero souvenir hawkers",
    ],
    stayStyle: "Centuries-old Restored Tharavadu Homestays & Coastal Eco-Sanctuaries",
    bestFor: "Return travellers, writers, slow-travel seekers, and couples",
  },
  {
    id: "nature-wildlife",
    title: "Highland Mist & Wildlife Wilderness",
    subtitle: "Cloud Forests, Shola Grasslands & Elephant Sanctuaries",
    duration: "8 to 10 Days",
    pace: "Active & Nature-Focused",
    category: "nature",
    image: "/images/generated/hero-kerala.jpg",
    route: ["Kochi", "Anamalai Foothills", "Munnar Peaks", "Periyar Tiger Reserve"],
    overview:
      "A deep immersion into the biological wonder of the Western Ghats, one of the eight hottest biodiversity hotspots on earth. Trek through high-altitude shola-grassland ecosystems, cruise pristine forest lakes, and observe wild elephants and hornbills with naturalist guides.",
    highlights: [
      "Private dawn birdwatching expedition with a certified ornithologist",
      "Guided bamboo rafting and jungle hike in Periyar National Park",
      "Walk among the cloud forests of Meesapulimala",
      "Stays tucked inside organic cardamom plantations and canopy retreats",
    ],
    stayStyle: "Eco-Luxe Forest Lodges & High-Altitude Plantation Cottages",
    bestFor: "Nature enthusiasts, birdwatchers, hikers, and active families",
  },
  {
    id: "south-india",
    title: "The Grand South India Odyssey: Kerala & Tamil Nadu",
    subtitle: "Living Chola Temples, Chettinad Mansions & Backwater Stillness",
    duration: "14 to 16 Days",
    pace: "Cultural & Comprehensive",
    category: "south-india",
    image: "/images/generated/fort-kochi-heritage.jpg",
    route: ["Kochi", "Munnar", "Madurai", "Chettinad", "Thanjavur", "Kumarakom"],
    overview:
      "A cross-peninsular master route connecting the lush tropical serenity of Kerala with the towering stone temple architecture and palatial grandeur of Tamil Nadu. Experience two starkly distinct cultures, languages, and culinary worlds linked by a scenic passage through the Western Ghats.",
    highlights: [
      "Private dawn tour of Madurai's Meenakshi Sundareswarar Temple",
      "Stay inside a 100-room heritage Chettinad merchant mansion",
      "Private viewing of UNESCO World Heritage Great Living Chola Temples",
      "Return across the high passes to the tranquil Kerala backwaters",
    ],
    stayStyle: "Palatial Chettinad Mansions, Heritage Hotels & Kerala Water Villas",
    bestFor: "Architecture lovers, culture enthusiasts, and global explorers",
  },
  {
    id: "culture-cuisine",
    title: "Spices, Flavours & Forgotten Ports",
    subtitle: "An Epicurean & Cultural Passage Across South India",
    duration: "9 to 11 Days",
    pace: "Leisurely & Gastronomic",
    category: "culture",
    image: "/images/generated/spice-gardens.jpg",
    route: ["Fort Kochi", "Kuttanad Backwaters", "Alleppey", "Marari Coast"],
    overview:
      "Kerala has drawn traders from Rome, China, and Arabia for three millennia for one treasure: spices. This culinary-led journey introduces you to the master cooks, organic spice farmers, and authentic home kitchens across Jewish, Syrian Christian, Dutch, and coastal communities.",
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

  const filteredJourneys =
    selectedCategory === "all"
      ? JOURNEYS
      : JOURNEYS.filter((j) => j.category === selectedCategory);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-4">
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
              src="/images/jibu-portrait.jpg"
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
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: "all", label: "All Journeys" },
          { id: "classic", label: "Classic Kerala" },
          { id: "slow", label: "Slow & Heritage" },
          { id: "nature", label: "Highlands & Wildlife" },
          { id: "south-india", label: "Kerala & Tamil Nadu" },
          { id: "culture", label: "Cuisine & Culture" },
        ].map((tab) => (
          <button
            key={tab.id}
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

      {/* Journeys Listing */}
      <div className="space-y-12 sm:space-y-16">
        {filteredJourneys.map((journey, idx) => (
          <article
            key={journey.id}
            id={journey.id}
            className="p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#E9E0D2] shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Image & Key Attributes Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-inner group">
                <Image
                  src={journey.image}
                  alt={journey.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-md font-semibold tracking-wider uppercase border border-white/30">
                    {journey.duration}
                  </span>
                  <span className="font-serif italic drop-shadow">
                    {journey.pace}
                  </span>
                </div>
              </div>

              {/* Route Path Flow */}
              <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] space-y-2.5">
                <span className="text-[10px] uppercase tracking-widest text-[#8B5E35] font-semibold block">
                  Curated Route Flow
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#183D2B]">
                  {journey.route.map((stop, sIdx) => (
                    <React.Fragment key={stop}>
                      <span className="px-3 py-1 rounded-full bg-white border border-[#E9E0D2]">
                        {stop}
                      </span>
                      {sIdx < journey.route.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Content & Inquiry Details Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#8B5E35]" />
                  <span>Journey Idea {idx + 1}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light leading-tight">
                  {journey.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#8B5E35] font-serif italic">
                  {journey.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
                {journey.overview}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs uppercase tracking-widest text-[#183D2B] font-semibold block">
                  Signature Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {journey.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 text-xs text-[#242424]/85 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stay Style & Best For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E9E0D2] text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                    Handpicked Accommodation
                  </span>
                  <span className="text-[#183D2B] font-medium block mt-0.5">
                    {journey.stayStyle}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                    Ideal For
                  </span>
                  <span className="text-[#183D2B] font-medium block mt-0.5">
                    {journey.bestFor}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={`/plan-your-journey?journey=${encodeURIComponent(journey.title)}`}
                  onClick={() => trackCTAClick("Inquire About This Journey", `/plan-your-journey?journey=${journey.title}`, "journeys_page")}
                  className="px-6 py-3.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md flex items-center gap-2"
                >
                  <span>Inquire About This Journey</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919447000000?text=${encodeURIComponent(`Hello Jibu, I am interested in customizing the "${journey.title}" (${journey.duration}). Could you share your thoughts?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("journeys_page_card", journey.title)}
                  className="px-5 py-3.5 rounded-full bg-white border border-[#E9E0D2] hover:border-[#25D366] text-[#183D2B] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>Consult via WhatsApp</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* The 4-Step Bespoke Process */}
      <section className="p-8 sm:p-14 rounded-[3rem] bg-white border border-[#E9E0D2] shadow-sm space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8B5E35] font-semibold block">
            HOW WE WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#183D2B] font-light">
            The Bespoke Planning Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#242424]/75 font-light leading-relaxed">
            Your holiday will not be picked from a catalogue. Here is how Jibu Thomas personally designs every route.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "The Conversation",
              desc: "We start by learning about you: who you are travelling with, your pace, your curiosities, and how you like your mornings to feel.",
            },
            {
              step: "02",
              title: "The Route Blueprint",
              desc: "Jibu drafts a day-by-day outline designed to avoid rush hours and long travel days, leaving room for spontaneous village detours.",
            },
            {
              step: "03",
              title: "Handpicked Stays",
              desc: "We pair your route with characterful heritage bungalows, private tea estate houses, and boutique waterfront retreats we know personally.",
            },
            {
              step: "04",
              title: "Private Chauffeur Care",
              desc: "From the moment you land, you are in the trusted hands of a courteous, dedicated private chauffeur and Jibu's 24/7 on-ground support.",
            },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] space-y-3">
              <span className="text-2xl font-serif font-bold text-[#8B5E35]/40 block">
                {item.step}
              </span>
              <h3 className="text-base font-serif font-bold text-[#183D2B]">
                {item.title}
              </h3>
              <p className="text-xs text-[#242424]/75 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#183D2B] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FFFCF5]">
              Ready to create a journey that feels like yours?
            </h3>
            <p className="text-xs sm:text-sm text-[#E9E0D2]/80 font-light max-w-xl">
              Tell us your approximate dates and travel style. Jibu Thomas will personally respond with ideas within two hours.
            </p>
          </div>
          <Link
            href="/plan-your-journey"
            className="px-8 py-4 rounded-full bg-[#8B5E35] hover:bg-[#a06d3f] text-white text-xs uppercase tracking-widest font-semibold transition-all shrink-0 shadow-lg"
          >
            Plan Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
