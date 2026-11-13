"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sparkles,
  ArrowUpRight,
  Clock,
  MapPin,
  X,
  Check,
  CalendarCheck,
  Map,
  HandHeart,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

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
    image: "/images/generated/houseboat-backwaters.jpg",
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
    image: "/images/generated/coastal-varkala.jpg",
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
    image: "/images/services/family-senior-friendly.jpg",
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
    image: "/images/generated/hero-kerala.jpg",
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
    image: "/images/generated/fort-kochi-heritage.jpg",
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
  const [activeTab, setActiveTab] = useState<"signature" | "bespoke">("signature");
  const [selectedJourney, setSelectedJourney] = useState<JourneyItem | null>(null);
  const [selectedBespoke, setSelectedBespoke] = useState<BespokePillarItem | null>(null);

  // Background Scroll Lock
  useEffect(() => {
    const isAnyOpen = selectedJourney || selectedBespoke;
    if (isAnyOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [selectedJourney, selectedBespoke]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedJourney(null);
        setSelectedBespoke(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="journeys" className="py-16 sm:py-24 bg-[#FFFCF5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E35] shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] text-[#183D2B] uppercase">
              TRAVEL WITH <span className="text-[#8B5E35]">JIBU</span>
            </h2>
            <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#E9E0D2]/50 border border-[#E9E0D2] self-start md:self-end">
            <button
              onClick={() => setActiveTab("signature")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${activeTab === "signature"
                  ? "bg-[#183D2B] text-white shadow-sm font-medium"
                  : "text-[#242424]/75 hover:text-[#183D2B]"
                }`}
            >
              Signature Journeys (5)
            </button>
            <button
              onClick={() => setActiveTab("bespoke")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${activeTab === "bespoke"
                  ? "bg-[#183D2B] text-white shadow-sm font-medium"
                  : "text-[#242424]/75 hover:text-[#183D2B]"
                }`}
            >
              Bespoke Journeys (3)
            </button>
          </div>
        </div>

        {/* Tab 1: SIGNATURE JOURNEYS (Pure Visual Portals, Frameless) */}
        {activeTab === "signature" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SIGNATURE_JOURNEYS.map((j) => (
              <div
                key={j.id}
                onClick={() => setSelectedJourney(j)}
                className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-700 bg-[#183D2B] select-none"
              >
                {/* Full Image */}
                <Image
                  src={j.image}
                  alt={j.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

                {/* Top Duration Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8B5E35]" />
                    {j.duration}
                  </span>
                </div>

                {/* Bottom Overlay: Title, Route & "View Details" */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col justify-end space-y-2">
                  <p className="text-[11px] font-sans text-[#E9E0D2] tracking-wider uppercase flex items-center gap-1 opacity-90">
                    <MapPin className="w-3 h-3 text-[#E9E0D2]" />
                    <span className="line-clamp-1">{j.route}</span>
                  </p>

                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium leading-snug group-hover:text-[#E9E0D2] transition-colors">
                    {j.title}
                  </h3>

                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#E9E0D2] group-hover:text-white transition-colors">
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: BESPOKE JOURNEYS (3 Clean Cards) */}
        {activeTab === "bespoke" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {BESPOKE_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="group rounded-2xl sm:rounded-3xl bg-white border border-[#E9E0D2] shadow-sm hover:shadow-lg transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between space-y-4"
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
                  <button
                    onClick={() => setSelectedBespoke(p)}
                    className="w-full py-2 px-3 rounded-full bg-[#183D2B]/5 hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-[11px] uppercase tracking-wider font-medium transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <span>View More Details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Signature Journey Details (Luxury Split Modal) */}
        <AnimatePresence>
          {selectedJourney && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
              onClick={() => setSelectedJourney(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
                className="relative max-w-4xl lg:max-w-5xl w-full max-h-[90vh] md:max-h-[85vh] rounded-[2rem] sm:rounded-[2.8rem] bg-[#FFFCF5] border border-[#E9E0D2] shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedJourney(null)}
                  className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 md:bg-black/10 hover:bg-[#183D2B] text-white md:text-[#183D2B] md:hover:text-white transition-all shadow-sm active:scale-90 backdrop-blur-sm cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Column: Full-Bleed Image */}
                <div className="md:w-[46%] relative h-48 sm:h-64 md:h-auto min-h-[190px] sm:min-h-[260px] md:min-h-full overflow-hidden bg-[#183D2B] shrink-0">
                  <Image
                    src={selectedJourney.image}
                    alt={selectedJourney.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8B5E35]" />
                      {selectedJourney.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
                    <p className="text-[11px] font-sans text-[#E9E0D2] tracking-wider uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E9E0D2]" />
                      {selectedJourney.route}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl leading-snug font-light text-white">
                      {selectedJourney.title}
                    </h3>
                  </div>
                </div>

                {/* Right Column: Editorial Overview & Inclusions */}
                <div
                  data-lenis-prevent="true"
                  className="md:w-[54%] p-6 sm:p-9 lg:p-11 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6"
                >
                  <div className="space-y-4 pt-1 sm:pt-0">
                    <div className="inline-flex items-center gap-2 text-[#8B5E35] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#8B5E35]" />
                      <span>Signature Journey &bull; South India</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-light leading-snug">
                      {selectedJourney.title}
                    </h3>

                    <p className="font-serif italic text-xs sm:text-sm text-[#8B5E35]">
                      &ldquo;{selectedJourney.shortVibe}&rdquo;
                    </p>

                    <p className="text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans pt-1">
                      {selectedJourney.overview}
                    </p>

                    {/* Inclusions */}
                    <div className="pt-4 border-t border-[#E9E0D2] space-y-2.5">
                      <h5 className="text-[11px] uppercase tracking-widest text-[#183D2B] font-semibold">
                        Signature Inclusions We Arrange:
                      </h5>
                      <div className="space-y-2">
                        {selectedJourney.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#242424]/85 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E35] mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer with WhatsApp Enquiry */}
                  <div className="pt-5 border-t border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-[#242424]/60 font-serif italic">
                      Fully customizable for your dates
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href="#contact"
                        onClick={() => setSelectedJourney(null)}
                        className="text-[11px] uppercase tracking-wider text-[#183D2B]/75 hover:text-[#183D2B] font-medium hidden sm:inline"
                      >
                        Enquiry Form
                      </Link>
                      <a
                        href={`https://wa.me/919447000000?text=${encodeURIComponent(
                          `Hello Jibu, I would like to enquire about the ${selectedJourney.title} itinerary (${selectedJourney.duration}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-current" />
                        <span>WhatsApp Enquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal: Bespoke Pillar Details */}
        <AnimatePresence>
          {selectedBespoke && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
              onClick={() => setSelectedBespoke(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
                className="relative max-w-xl w-full max-h-[85vh] overflow-y-auto no-scrollbar rounded-[2.5rem] bg-[#FFFCF5] border border-[#E9E0D2] shadow-2xl p-6 sm:p-9 space-y-5"
              >
                <button
                  onClick={() => setSelectedBespoke(null)}
                  className="absolute top-5 right-5 p-2.5 rounded-full bg-black/10 hover:bg-[#183D2B] text-[#183D2B] hover:text-white transition-all shadow-sm active:scale-90"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                    Bespoke Pillar {selectedBespoke.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#183D2B] mt-1">
                    {selectedBespoke.title}
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-[#8B5E35] mt-1">
                    &ldquo;{selectedBespoke.shortVibe}&rdquo;
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#242424]/85 font-light leading-relaxed">
                  {selectedBespoke.overview}
                </p>

                <div className="pt-3 border-t border-[#E9E0D2] space-y-2.5">
                  <span className="text-[11px] uppercase tracking-widest text-[#183D2B] font-semibold block">
                    What We Take Care Of:
                  </span>
                  <div className="space-y-2">
                    {selectedBespoke.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#242424]/85 font-light">
                        <Check className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-[#242424]/60 font-serif italic">
                    Direct WhatsApp with Jibu Thomas
                  </span>
                  <a
                    href={`https://wa.me/919447000000?text=${encodeURIComponent(
                      `Hello Jibu, I would like to consult with you regarding ${selectedBespoke.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Jibu</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
