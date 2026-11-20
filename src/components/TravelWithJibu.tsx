"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  CalendarCheck,
  Map,
  HandHeart,
} from "lucide-react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import ScrollReveal from "./ScrollReveal";

export interface JourneyItem {
  id: string;
  number: string;
  title: string;
  route: string;
  duration: string;
  shortVibe: string;
  overview: string;
  highlights: string[];
  image: string;
}

export const SIGNATURE_JOURNEYS: JourneyItem[] = [
  {
    id: "kerala-discovery",
    number: "01",
    title: "Kerala Discovery Journeys",
    route: "KOCHI · MUNNAR · THEKKADY · ALLEPPEY · MARARI",
    duration: "10 Days · 9 Nights",
    shortVibe: "Misty tea hills, fragrant spice groves & serene backwaters.",
    overview:
      "A quintessential introduction to God's Own Country. Designed with relaxed pacing, traverse colonial Fort Kochi, high-altitude tea plantations in Munnar, Periyar elephant reserves, a private luxury houseboat night in Alleppey, and golden shores in Marari.",
    highlights: [
      "Private Tea Planter's Bungalow",
      "Overnight Kettuvallam Cruise",
      "Beachfront Cottage Retreat",
      "Private Chauffeur Throughout",
    ],
    image: "/images/generated/houseboat-backwaters.webp",
  },
  {
    id: "romantic-escapes",
    number: "02",
    title: "Romantic Kerala Escapes",
    route: "FORT KOCHI · MUNNAR · KUMARAKOM · VARKALA",
    duration: "8 Days · 7 Nights",
    shortVibe: "Intimate, secluded sanctuaries curated for couples & honeymoons.",
    overview:
      "Far from standard group tours, this romantic escape embraces quiet privacy. Candlelit dinners overlooking mist-kissed valleys, private sunset cruises on Vembanad Lake, authentic couple's Ayurvedic rejuvenations, and cliffside ocean dinners.",
    highlights: [
      "Private Plunge Pool Villas",
      "Sunset Vembanad Wine & Dine",
      "Couples Ayurvedic Therapies",
      "Secluded Cliffside Hideaways",
    ],
    image: "/images/generated/coastal-varkala.webp",
  },
  {
    id: "family-holidays",
    number: "03",
    title: "Family Holiday Journeys",
    route: "WAYANAD · THEKKADY · ALLEPPEY · KOVALAM",
    duration: "9 Days · 8 Nights",
    shortVibe: "Multi-generational comfort with engaging wildlife and nature.",
    overview:
      "Crafted specifically for families traveling with children or grandparents. Spacious private vehicles, gentle travel distances, interconnected luxury rooms, interactive spice farm walks, bamboo canoe excursions, and relaxed beach days.",
    highlights: [
      "Senior-Friendly Ground Floor Stays",
      "Interactive Village Farm Walks",
      "Spacious Family Chauffeur Van",
      "Special Dietary Coordination",
    ],
    image: "/images/services/family-senior-friendly.webp",
  },
  {
    id: "nature-wildlife",
    number: "04",
    title: "Nature & Wildlife Journeys",
    route: "PERIYAR · WAYANAD · SILENT VALLEY · NAGARHOLE",
    duration: "11 Days · 10 Nights",
    shortVibe: "Deep wilderness expeditions across bio-diverse corridors.",
    overview:
      "For naturalists and conservation enthusiasts. Accompanied by expert forest guides, venture deep into tropical evergreen reserves for silent lake rafting, canopy treks, night walks seeking amphibians, and dawn safaris tracking wildlife.",
    highlights: [
      "Silent Bamboo Lake Rafting",
      "Certified Naturalist Guides",
      "Eco-Conscious Treehouse Stays",
      "Endemic Birdwatching Expeditions",
    ],
    image: "/images/generated/hero-kerala.webp",
  },
  {
    id: "south-india-heritage",
    number: "05",
    title: "South India Heritage Journeys",
    route: "FORT KOCHI · MADURAI · TANJORE · MYSORE · HAMPI",
    duration: "14 Days · 13 Nights",
    shortVibe: "Monumental ancient Dravidian temples, palaces & living rituals.",
    overview:
      "Connect the maritime spice trade of Kerala with the breathtaking architectural wonders of Tamil Nadu and Karnataka. Marvel at Madurai's sculpted temple towers, the grandeur of Mysore Palace, and the 14th-century boulder ruins of Hampi.",
    highlights: [
      "VIP Access to Living Temples",
      "Royal Mysore Palace Exploration",
      "UNESCO Hampi Sunset Walks",
      "Private Architectural Historian",
    ],
    image: "/images/generated/fort-kochi-heritage.webp",
  },
];

export interface BespokePillarItem {
  id: string;
  number: string;
  title: string;
  shortVibe: string;
  overview: string;
  details: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const BESPOKE_PILLARS: BespokePillarItem[] = [
  {
    id: "planning",
    number: "01",
    title: "Personalised Holiday Planning",
    shortVibe: "Direct one-on-one consultation with Jibu Thomas to understand your vision.",
    overview:
      "Rather than automated forms or rigid brochures, Jibu Thomas consults with you directly to understand your preferred tempo, dietary preferences, physical comfort, accommodation tastes, and budget.",
    details: [
      "Direct consultation with Lead Designer Jibu Thomas",
      "Tailoring around your exact flight schedules and dates",
      "Pacing considerations for families or seniors",
      "Honest guidance on seasonal weather and crowds",
    ],
    icon: CalendarCheck,
  },
  {
    id: "itinerary-design",
    number: "02",
    title: "Custom Itinerary Design",
    shortVibe: "Handcrafted day-by-day plan built from scratch for your private cadence.",
    overview:
      "We design every single day with breathing room, logical travel distances, and handpicked stays that reflect local soul. No rushed early morning departures unless you want to catch sunrise over tea estates.",
    details: [
      "Day-by-day bespoke schedule with seamless transfers",
      "Private air-conditioned chauffeur vehicle dedicated to you",
      "Curated local dining and authentic culinary recommendations",
      "Flexibility to adjust your daily pace on the ground",
    ],
    icon: Map,
  },
  {
    id: "experiences",
    number: "03",
    title: "Tailor-Made Travel Experiences",
    shortVibe: "Exclusive private access, heritage stays & authentic cultural encounters.",
    overview:
      "From secluded tea bungalows in Munnar to private country boat rides in backwater canals, your journey is filled with personal touches that standard tourists never get to see.",
    details: [
      "Private entry permits and VIP monument access",
      "Exclusive encounters with local artisans and historians",
      "24/7 dedicated Kerala ground support team",
      "Handpicked boutique resorts personally inspected by Jibu",
    ],
    icon: HandHeart,
  },
];

export default function TravelWithJibu() {
  const content = useWebsiteContent();
  const signatureJourneys: JourneyItem[] =
    content.journeys && content.journeys.length > 0
      ? content.journeys
      : SIGNATURE_JOURNEYS;

  const [activeTab, setActiveTab] = useState<"signature" | "bespoke">("signature");

  return (
    <section id="journeys" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-5 border-b border-[#E9E0D2]">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E35] animate-pulse shrink-0" />
              <h2 className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl font-sans font-light tracking-[0.1em] sm:tracking-[0.12em] uppercase">
                <span className="text-[#183D2B]">
                  TRAVEL WITH{" "}
                </span>
                <span className="text-[#8B5E35]">
                  JIBU
                </span>
              </h2>
              <span className="h-[1.5px] w-8 min-[400px]:w-12 sm:w-20 bg-[#8B5E35]/40 shrink-0" />
            </div>

            {/* Tab Selector */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E9E0D2] shadow-sm self-start md:self-end max-w-full overflow-x-auto no-scrollbar">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveTab("signature")}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans transition-all cursor-pointer whitespace-nowrap ${activeTab === "signature"
                  ? "bg-[#183D2B] text-white shadow-sm font-medium scale-[1.02]"
                  : "text-[#242424]/75 hover:text-[#183D2B]"
                  }`}
              >
                Signature Journeys (5)
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveTab("bespoke")}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans transition-all cursor-pointer whitespace-nowrap ${activeTab === "bespoke"
                  ? "bg-[#183D2B] text-white shadow-sm font-medium scale-[1.02]"
                  : "text-[#242424]/75 hover:text-[#183D2B]"
                  }`}
              >
                Bespoke Journeys (3)
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Tab 1: SIGNATURE JOURNEYS (Pure Visual Portals, Frameless) */}
        {activeTab === "signature" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
            {signatureJourneys.map((j, idx) => (
              <ScrollReveal key={j.id} delay={idx * 0.06}>
                <Link
                  href={`/journeys#${j.id}`}
                  className="group relative h-[440px] sm:h-[480px] lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#8B5E35]/60 hover:-translate-y-2 transition-all duration-500 bg-[#183D2B] select-none hover:shadow-[0_12px_28px_rgba(24,61,43,0.08)] block"
                >
                  {/* Full Image */}
                  <Image
                    src={j.image}
                    alt={j.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

                  {/* Top Duration Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] flex items-center gap-1 border border-white/60 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Clock className="w-3 h-3 text-[#8B5E35]" />
                      {j.duration}
                    </span>
                  </div>

                  {/* Bottom Overlay: Title, Route & "View Details" */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col justify-end space-y-2">
                    <p className="text-[11px] font-sans text-[#E9E0D2] tracking-wider uppercase flex items-center gap-1 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5">
                      <MapPin className="w-3 h-3 text-[#E9E0D2]" />
                      <span className="line-clamp-1">{j.route}</span>
                    </p>

                    <h3 className="text-xl sm:text-2xl font-sans text-white font-light leading-snug group-hover:text-[#E9E0D2] group-hover:translate-x-0.5 transition-all duration-300">
                      {j.title}
                    </h3>

                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#E9E0D2] group-hover:text-white transition-colors duration-300">
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Tab 2: BESPOKE JOURNEYS (3 Clean Cards) */}
        {activeTab === "bespoke" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {BESPOKE_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="group rounded-2xl sm:rounded-3xl bg-white border border-[#E9E0D2] shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between space-y-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif italic text-2xl text-[#8B5E35]">{p.number}</span>
                      <div className="p-2 rounded-xl bg-[#183D2B]/5 text-[#8B5E35]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-serif text-[#183D2B] font-medium">{p.title}</h3>
                    <p className="text-xs text-[#242424]/75 font-light mt-1 leading-relaxed">
                      {p.shortVibe}
                    </p>
                  </div>

                  {/* VIEW MORE DETAILS BUTTON */}
                  <Link prefetch={true} href="/journeys#bespoke"
                    className="w-full py-2 px-3 rounded-full bg-[#183D2B]/5 hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-[11px] uppercase tracking-wider font-medium transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <span>View More Details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
