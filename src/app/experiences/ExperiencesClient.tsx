"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Clock,
  Compass,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";

export interface Experience {
  id: string;
  number?: string;
  title: string;
  category: "backwaters" | "plantations" | "nature" | "heritage" | "coastal" | "culinary" | "wellness" | "family";
  categoryLabel: string;
  location: string;
  duration: string;
  timing: string;
  image: string;
  leadQuote: string;
  description: string;
  highlights: string[];
  insiderTip: string;
}

export const ALL_EXPERIENCES: Experience[] = [
  {
    id: "backwaters",
    number: "01",
    title: "Backwater & Houseboat Experiences",
    category: "backwaters",
    categoryLabel: "Backwaters & Waterways",
    location: "Alleppey · Kumarakom · Vembanad Lake",
    duration: "1 to 3 Nights",
    timing: "Overnight Charters & Daytime Silent Cruises",
    image: "/images/generated/houseboat-backwaters.webp",
    leadQuote: "“Drifting into silent village canals where commercial tourist motorboats cannot fit.”",
    description:
      "Drift gently along secluded lagoons of Alleppey and Kumarakom on your private traditional kettuvallam. Handcrafted from indigenous jackwood planks bound with coconut coir rope without a single iron nail, your boat is staffed with a private captain and dedicated chef serving freshly prepared local coastal delicacies.",
    highlights: [
      "Exclusive private houseboats with air-conditioned staterooms",
      "Personal onboard chef crafting customized local banquets",
      "Narrow canal exploration in open wooden country canoes",
      "Quiet sunset mooring away from commercial tourist boat lines",
    ],
    insiderTip: "Opt for a dawn canoe paddle when the water is like glass and village coir workers begin their morning cadence.",
  },
  {
    id: "hill-stations",
    number: "02",
    title: "Hill Stations & Plantation Trails",
    category: "plantations",
    categoryLabel: "Highlands & Plantations",
    location: "Munnar · Wayanad · Ooty · Coorg",
    duration: "3 to 5 Days",
    timing: "Sunrise to Sunset Trails",
    image: "/images/generated/tea-plantation-approach.webp",
    leadQuote: "“Misty high-altitude tea trails carved into South India's grandest peaks.”",
    description:
      "Step into the timeless world of colonial tea and cardamom estates nestled across the dramatic peaks of Munnar, Wayanad, and Coorg. Wake up to crisp mountain air in century-old British tea planters' bungalows and walk private plantation ridges with senior estate naturalists.",
    highlights: [
      "Stays in restored heritage tea planters' bungalows",
      "Private tea tasting sessions & factory heritage tours",
      "Guided highland ridge treks with sunrise cloud views",
      "Fragrant cardamom and Arabica coffee estate walks",
    ],
    insiderTip: "Pack a warm fleece jacket for Munnar; high-elevation temperatures drop delightfully below 14°C at night.",
  },
  {
    id: "nature-wildlife",
    number: "03",
    title: "Nature & Wildlife Sanctuaries",
    category: "nature",
    categoryLabel: "Wildlife & Nature",
    location: "Thekkady · Wayanad · Periyar · Nagarhole",
    duration: "2 to 4 Days",
    timing: "Dawn Safaris & Lake Rafting",
    image: "/images/generated/hero-kerala.webp",
    leadQuote: "“Silent lake boat safaris and deep rainforest corridors in the Western Ghats.”",
    description:
      "Immerse yourself in the bio-diverse Western Ghats, one of the world's eight hottest biodiversity hotspots. Venture into Periyar Tiger Reserve for silent bamboo rafting and tranquil lake safaris. Discover endemic bird species and wild elephants bathing at dawn, escorted by veteran tribal trackers.",
    highlights: [
      "Silent lake boat safaris in Periyar National Park",
      "Guided bamboo rafting through untouched jungle shores",
      "Endemic birdwatching with seasoned wildlife naturalists",
      "Canopy walks exploring bioluminescent flora and fauna",
    ],
    insiderTip: "Wear earthy, neutral clothing and comfortable walking shoes for forest hikes.",
  },
  {
    id: "culture-heritage",
    number: "04",
    title: "Culture & Living Heritage Journeys",
    category: "heritage",
    categoryLabel: "Culture & Heritage",
    location: "Fort Kochi · Kannur · Madurai · Mysore · Hampi",
    duration: "3 to 6 Days",
    timing: "Morning History Walks & Evening Temple Rituals",
    image: "/images/generated/fort-kochi-heritage.webp",
    leadQuote: "“Three thousand years of global sea trade carved into timber, stone, and ancient alleys.”",
    description:
      "Witness the divine spectacle of Theyyam ritual dances in sacred temple groves of northern Kerala, appreciate classical Kathakali, and walk through centuries of maritime history in Fort Kochi, Jew Town, Madurai, and Hampi.",
    highlights: [
      "Privately arranged access to authentic village Theyyam rituals",
      "Classical Kathakali & Kalaripayattu martial arts demonstrations",
      "Guided walks through 16th-century colonial spice warehouses",
      "Exploration of ancient Dravidian temple architecture",
    ],
    insiderTip: "Theyyam rituals run through the cooler night and early morning hours; we arrange exclusive private viewing coordinates.",
  },
  {
    id: "beaches-coastal",
    number: "05",
    title: "Coastal Sanctuaries & Quiet Shores",
    category: "coastal",
    categoryLabel: "Coastal & Sea",
    location: "Marari · Varkala · Bekal · Neeleshwar",
    duration: "2 to 5 Days",
    timing: "Unhurried Oceanfront Cadence",
    image: "/images/generated/coastal-varkala.webp",
    leadQuote: "“Secluded barefoot luxury along coconut-fringed shores untouched by mass tourism.”",
    description:
      "Unwind by the tranquil Arabian Sea. From the red laterite ocean cliffs of Varkala to secluded beachfront cottages in Marari and untouched golden shores in Neeleshwar, escape commercial beach parties for peaceful coastal living.",
    highlights: [
      "Private thatched beachfront villas tucked under palm groves",
      "Sunrise walks along quiet fishing shores observing artisanal catamarans",
      "Freshly prepared coastal seafood grilled with garden spices",
      "Sunset yoga and Ayurvedic warm oil massages with ocean breezes",
    ],
    insiderTip: "Marari beach is strictly free of motorized watersports, making it Kerala's quietest stretch for reading and restorative rest.",
  },
  {
    id: "culinary-spice",
    number: "06",
    title: "Culinary Traditions & Spice Trails",
    category: "culinary",
    categoryLabel: "Culinary & Flavours",
    location: "Central Kerala · Malabar · Syrian Christian Hearths",
    duration: "Half Day to 3 Days",
    timing: "Morning Markets to Evening Home Kitchens",
    image: "/images/generated/spice-gardens.webp",
    leadQuote: "“Kerala's genuine culinary soul lives beside home hearths, not luxury resort buffets.”",
    description:
      "Journey deep into the aromas that drew Phoenicians, Romans, and Arabs to the Malabar coast. Walk certified organic cardamom and black pepper estates with master cultivators, and sit down inside traditional ancestral kitchens for heirloom cooking sessions.",
    highlights: [
      "Private cooking masterclasses with Syrian Christian and Mappila home cooks",
      "Authentic Karimeen Pollichathu roasted inside charred banana leaves",
      "Tasting fresh organic green pepper, cinnamon bark, and vanilla beans straight from the vine",
      "Traditional Kerala Sadya served on tender plantain leaves with 24 distinct preparations",
    ],
    insiderTip: "We adjust heat levels individually so you enjoy genuine depth of flavor without overwhelming chilli.",
  },
  {
    id: "ayurveda-wellness",
    number: "07",
    title: "Authentic Ayurveda & Holistic Wellness",
    category: "wellness",
    categoryLabel: "Ayurveda & Wellness",
    location: "Certified Traditional Vaidyasalas · Kerala",
    duration: "3 to 14 Days",
    timing: "Physician Consultations & Daily Therapy Sessions",
    image: "/images/generated/luxury-resort-stay.webp",
    leadQuote: "“Not an unverified spa rub, but a 5,000-year-old living science of natural rejuvenation.”",
    description:
      "Kerala is the global cradle of authentic Ayurveda. We bypass commercial hotel beauty salons to connect you with lineage-trained Ayurvedic Vaidyas (physicians). Receive pulse diagnosis (Nadi Pariksha) and customized treatments tailored strictly to your individual dosha balance.",
    highlights: [
      "Personal consultation with senior, lineage-trained Ayurvedic doctors",
      "Authentic four-hand synchronized medicated warm oil massage (Abhyanga)",
      "Continuous stream of warm medicinal herbal oils over the third eye (Shirodhara)",
      "Prescribed sattvic nutritional meals prepared from therapeutic organic herbs",
    ],
    insiderTip: "For genuine Panchakarma rejuvenation, we recommend reserving at least 7 consecutive unhurried nights.",
  },
  {
    id: "family-tailored",
    number: "08",
    title: "Family & Multi-Generational Travel",
    category: "family",
    categoryLabel: "Family & Senior Care",
    location: "All South India · Flexible Gentle Pacing",
    duration: "7 to 12 Days",
    timing: "Customized Daily Departure Hours",
    image: "/images/services/family-senior-friendly.webp",
    leadQuote: "“Comfortable pacing, step-free rooms, and spacious private vehicles for every generation.”",
    description:
      "Travelling with children or elderly grandparents requires thoughtful attention. We curate itineraries with shorter driving segments, accessible ground-floor rooms, gentle walking paths, special dietary accommodations, and spacious luxury family vans.",
    highlights: [
      "Spacious, premium AC vans with ample luggage space and baby seats",
      "Ground-floor rooms, elevators, and step-free accommodation verified in person",
      "Interactive experiences: pottery making, village canoe rides, and spice farms",
      "24/7 direct WhatsApp concierge with Jibu Thomas for peace of mind",
    ],
    insiderTip: "We intentionally design 2-3 night stays at each location so families unpack once and never feel rushed.",
  },
];

export default function ExperiencesClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Smoothly scroll to target experience if arrived with a hash (e.g. /experiences#backwaters)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      setActiveCategory("all");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const filtered =
    activeCategory === "all"
      ? ALL_EXPERIENCES
      : ALL_EXPERIENCES.filter((e) => e.category === activeCategory);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
      {/* Return to Home Breadcrumb */}
      <div>
        <Link
          href="/#experiences"
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
          <span>CURATED LOCAL ACCESS &bull; PRIVATE PERSPECTIVES</span>
        </div>
        <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08]">
          Curated Experiences,{" "}
          <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
            Beyond the Tourist Track.
          </span>
        </h1>
        <p className="text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed pt-2">
          Real luxury in Kerala is access: meeting the tea planter at dawn, drifting into silent village canals where houseboats cannot fit, and sitting down in a family home kitchen. Jibu Thomas personally selects every guide, elder, and naturalist we partner with.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: "all", label: "All Experiences (8)" },
          { id: "backwaters", label: "Backwaters" },
          { id: "plantations", label: "Tea & Highlands" },
          { id: "nature", label: "Wildlife & Nature" },
          { id: "heritage", label: "Heritage & Culture" },
          { id: "coastal", label: "Coastal" },
          { id: "culinary", label: "Culinary" },
          { id: "wellness", label: "Ayurveda" },
          { id: "family", label: "Family Care" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            suppressHydrationWarning
            onClick={() => setActiveCategory(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === tab.id
                ? "bg-[#183D2B] text-[#FFFCF5] shadow-md"
                : "bg-white border border-[#E9E0D2] text-[#242424]/75 hover:border-[#183D2B] hover:text-[#183D2B]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div className="space-y-12 sm:space-y-16">
        {filtered.map((exp) => (
          <article
            key={exp.id}
            id={exp.id}
            className="scroll-mt-32 p-5 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-[#E9E0D2] shadow-[0_15px_45px_rgba(24,61,43,0.06)] hover:shadow-[0_25px_60px_rgba(24,61,43,0.12)] transition-shadow duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual Image Column */}
              <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] lg:h-[460px] rounded-[2rem] overflow-hidden shadow-md border border-[#E9E0D2]/60">
                <Image
                  src={exp.image || "/images/generated/houseboat-backwaters.webp"}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#183D2B] shadow-sm">
                    {exp.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-[#E9E0D2] font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E9E0D2]" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Editorial Details Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#8B5E35] font-semibold mb-2">
                    {exp.number && <span>Pillar {exp.number}</span>}
                    {exp.number && <span>&bull;</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light leading-snug">
                    {exp.title}
                  </h2>
                  <p className="font-serif italic text-sm text-[#8B5E35] mt-2">
                    {exp.leadQuote}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#242424]/85 font-light leading-relaxed">
                  {exp.description}
                </p>

                {/* Inclusions / Highlights */}
                <div className="pt-2 border-t border-[#E9E0D2]/70 space-y-3">
                  <h3 className="text-xs uppercase tracking-widest text-[#183D2B] font-bold">
                    Signature Inclusions:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {exp.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#242424]/80">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insider Tip Box */}
                {exp.insiderTip && (
                  <div className="p-4 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] text-xs text-[#242424]/80 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#183D2B] font-semibold">Jibu&apos;s Insider Note: </strong>
                      <span>{exp.insiderTip}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/plan-your-journey?experience=${encodeURIComponent(exp.title)}`}
                    onClick={() => trackCTAClick("Inquire About This Experience", `/plan-your-journey?experience=${exp.title}`, "experiences_page")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md active:scale-95"
                  >
                    <span>Inquire About This Experience</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/919447000000?text=${encodeURIComponent(`Hello Jibu, I am interested in including "${exp.title}" (${exp.location}) in our Kerala itinerary.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("experiences_page_card", exp.title)}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#E9E0D2] hover:border-[#25D366] text-[#183D2B] text-xs uppercase tracking-widest font-semibold transition-all shadow-sm active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
