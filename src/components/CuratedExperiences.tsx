"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Waves,
  Mountain,
  Trees,
  Landmark,
  Sun,
  UtensilsCrossed,
  Users2,
  ArrowUpRight,
  X,
  Check,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  idealDuration: string;
  locations: string;
  description: string;
  highlights: string[];
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "backwaters",
    number: "01",
    title: "Backwater & Houseboat Experiences",
    image: "/images/generated/houseboat-backwaters.jpg",
    icon: Waves,
    idealDuration: "1 to 3 Nights",
    locations: "Alleppey · Kumarakom · Vembanad Lake",
    description:
      "Drift gently along secluded lagoons of Alleppey and Kumarakom on your private traditional kettuvallam. Handcrafted from indigenous jackwood planks bound with coir ropes without nails, your boat is staffed with a private captain and dedicated chef serving freshly prepared local delicacies.",
    highlights: [
      "Exclusive private houseboats with air-conditioned staterooms",
      "Personal onboard chef crafting customized local banquets",
      "Narrow canal exploration in open wooden country canoes",
      "Quiet sunset mooring away from commercial tourist boat lines",
    ],
  },
  {
    id: "hill-stations",
    number: "02",
    title: "Hill Stations & Plantation Trails",
    image: "/images/generated/tea-plantation-approach.jpg",
    icon: Mountain,
    idealDuration: "3 to 5 Days",
    locations: "Munnar · Wayanad · Ooty · Coorg",
    description:
      "Step into the timeless world of colonial tea and cardamom estates nestled across the dramatic peaks of Munnar, Wayanad, and Coorg. Wake up to crisp mountain air in century-old British tea planters' bungalows and walk private plantation ridges with senior estate naturalists.",
    highlights: [
      "Stays in restored heritage tea planters' bungalows",
      "Private tea tasting sessions & factory heritage tours",
      "Guided highland ridge treks with sunrise cloud views",
      "Fragrant cardamom and Arabica coffee estate walks",
    ],
  },
  {
    id: "nature-wildlife",
    number: "03",
    title: "Nature & Wildlife Experiences",
    image: "/images/generated/hero-kerala.jpg",
    icon: Trees,
    idealDuration: "2 to 4 Days",
    locations: "Thekkady · Wayanad · Periyar · Nagarhole",
    description:
      "Immerse yourself in the bio-diverse Western Ghats. Venture into Periyar Tiger Reserve for silent bamboo rafting and tranquil lake safaris. Discover endemic bird species and wild elephants bathing at dawn, escorted by tribal trackers.",
    highlights: [
      "Silent lake boat safaris in Periyar National Park",
      "Guided bamboo rafting through untouched jungle shores",
      "Endemic birdwatching with seasoned wildlife naturalists",
      "Canopy walks exploring bioluminescent flora and fauna",
    ],
  },
  {
    id: "culture-heritage",
    number: "04",
    title: "Culture & Heritage Journeys",
    image: "/images/generated/fort-kochi-heritage.jpg",
    icon: Landmark,
    idealDuration: "3 to 6 Days",
    locations: "Fort Kochi · Kannur · Madurai · Mysore · Hampi",
    description:
      "Witness the divine spectacle of Theyyam ritual dances in sacred temple groves of northern Kerala, appreciate classical Kathakali, and walk through centuries of maritime history in Fort Kochi, Jew Town, Madurai, and Hampi.",
    highlights: [
      "Privately arranged access to authentic village Theyyam rituals",
      "Classical Kathakali & Kalaripayattu martial arts demonstrations",
      "Guided walks through 16th-century colonial spice warehouses",
      "Exploration of ancient Dravidian temple architecture",
    ],
  },
  {
    id: "beaches-coastal",
    number: "05",
    title: "Beaches & Coastal Escapes",
    image: "/images/generated/coastal-varkala.jpg",
    icon: Sun,
    idealDuration: "3 to 5 Days",
    locations: "Varkala · Marari · Kovalam · Bekal",
    description:
      "From the dramatic red laterite cliffs of Varkala to the crowd-free golden sands of Marari and the calm crescent bays of Kovalam. Unwind in boutique seaside eco-resorts with restorative Ayurvedic treatments and ocean sunsets.",
    highlights: [
      "Secluded luxury beachfront villas away from crowds",
      "Sunset yoga pavilions overlooking the Arabian Sea",
      "Traditional Ayurvedic rejuvenation treatments",
      "Leisurely coastal walks along tranquil fishing villages",
    ],
  },
  {
    id: "culinary-food",
    number: "06",
    title: "Culinary & Local Food Experiences",
    image: "/images/generated/traditional-cuisine.jpg",
    icon: UtensilsCrossed,
    idealDuration: "Custom Integrated",
    locations: "Central Kerala · Fort Kochi · Calicut · Chettinad",
    description:
      "Embark on a sensory exploration of South India's spice coast. Partake in an authentic vegetarian Kerala Sadhya on fresh banana leaves, and learn regional cooking secrets during private masterclasses with local families.",
    highlights: [
      "Traditional Kerala Sadhya feast served on fresh banana leaves",
      "Private hands-on cooking masterclasses with regional home chefs",
      "Guided spice plantation walks tasting fresh pepper & vanilla",
      "Seafood culinary journeys in authentic coastal fishing harbors",
    ],
  },
  {
    id: "village-community",
    number: "07",
    title: "Village & Community Experiences",
    image: "/images/generated/spice-gardens.jpg",
    icon: Users2,
    idealDuration: "Full / Half Day",
    locations: "Kumbalangi · Aymanam · Wayanad · Alleppey Countryside",
    description:
      "Experience the gentle cadence of rural Kerala. Travel by wooden canoe to meet village women spinning coir ropes from coconut husks, watch generational handloom weavers, and share conversations with village elders.",
    highlights: [
      "Intimate visits to generational coir & handloom artisans",
      "Slow-paced country boat canoe rides through tiny village canals",
      "Organic farm visits with local farming families",
      "Conscious interactions that directly support local communities",
    ],
  },
];

export default function CuratedExperiences() {
  const content = useWebsiteContent();
  const experiencesData: ExperienceItem[] =
    content.experiences && content.experiences.length > 0
      ? content.experiences
      : EXPERIENCES_DATA;

  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  // Background Scroll Lock when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [selectedExp]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedExp(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="experiences" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-visible">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] uppercase">
            <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
              CURATED{" "}
            </span>
            <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
              EXPERIENCES
            </span>
          </h2>
          <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
        </div>

        {/* 
          PURE VISUAL TILES
          Desktop / Tablet: Clean Multi-Column Luxury Grid (Completely static, no stacking)
        */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {experiencesData.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              className="group relative h-[480px] lg:h-[520px] rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden cursor-pointer shadow-[0_12px_35px_rgba(24,61,43,0.08)] hover:shadow-[0_25px_50px_rgba(24,61,43,0.2)] hover:-translate-y-1.5 transition-all duration-500 select-none bg-[#183D2B]"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

              <div className="absolute top-5 left-5 z-10">
                <span className="font-serif italic text-lg sm:text-xl text-[#E9E0D2] drop-shadow-sm">
                  {exp.number}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7 flex flex-col justify-end space-y-3">
                <h3 className="font-serif text-2xl sm:text-[25px] text-white font-light leading-snug group-hover:text-[#E9E0D2] transition-colors duration-300">
                  {exp.title}
                </h3>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#E9E0D2] group-hover:text-white transition-colors duration-300">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 
          MOBILE ONLY: Sticky Stacking Card Deck
          (Each image fixes in place, next image slides up on top and fixes)
        */}
        <div className="sm:hidden flex flex-col relative">
          {experiencesData.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              style={{
                top: `calc(75px + ${idx * 6}px)`,
                zIndex: idx + 5,
              }}
              className={`sticky group relative h-[70vh] min-h-[420px] max-h-[520px] rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_-8px_30px_rgba(0,0,0,0.35)] select-none bg-[#183D2B] border border-white/10 ${idx === EXPERIENCES_DATA.length - 1 ? "mb-0" : "mb-6"
                }`}
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              <div className="absolute top-5 left-5 z-10">
                <span className="font-serif italic text-lg text-[#E9E0D2] drop-shadow-sm">
                  {exp.number}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col justify-end space-y-3">
                <h3 className="font-serif text-2xl text-white font-light leading-snug">
                  {exp.title}
                </h3>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#E9E0D2]">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 
          LUXURY EDITORIAL SPLIT MODAL (Aman / Belmond Standard)
          High-end two-column presentation with zero background scroll leakage
        */}
        <AnimatePresence>
          {selectedExp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
              onClick={() => setSelectedExp(null)}
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
                {/* Floating Close Button */}
                <button
                  onClick={() => setSelectedExp(null)}
                  className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 md:bg-black/10 hover:bg-[#183D2B] text-white md:text-[#183D2B] md:hover:text-white transition-all shadow-sm active:scale-90 backdrop-blur-sm cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Column: Breathtaking Full-Bleed Portrait Image */}
                <div className="md:w-[46%] relative h-48 sm:h-64 md:h-auto min-h-[190px] sm:min-h-[260px] md:min-h-full overflow-hidden bg-[#183D2B] shrink-0">
                  <Image
                    src={selectedExp.image}
                    alt={selectedExp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] tracking-wider">
                      Theme {selectedExp.number}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] uppercase font-medium text-white tracking-wider flex items-center gap-1 border border-white/15">
                      <Clock className="w-3 h-3 text-[#E9E0D2]" />
                      {selectedExp.idealDuration}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E9E0D2]" />
                      Key Locations
                    </span>
                    <p className="text-xs sm:text-sm font-sans text-white/90 tracking-wide font-light">
                      {selectedExp.locations}
                    </p>
                  </div>
                </div>

                {/* Right Column: Editorial Narrative & Inclusions */}
                <div
                  data-lenis-prevent="true"
                  className="md:w-[54%] p-6 sm:p-9 lg:p-11 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6"
                >
                  <div className="space-y-4 pt-1 sm:pt-0">
                    <div className="inline-flex items-center gap-2 text-[#8B5E35] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#8B5E35]" />
                      <span>Curated Experiences &bull; South India</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#183D2B] font-light leading-snug">
                      {selectedExp.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans pt-1">
                      {selectedExp.description}
                    </p>

                    {/* Curated Inclusions */}
                    <div className="pt-4 border-t border-[#E9E0D2] space-y-2.5">
                      <h5 className="text-[11px] uppercase tracking-widest text-[#183D2B] font-semibold">
                        Bespoke Inclusions We Arrange:
                      </h5>
                      <div className="space-y-2">
                        {selectedExp.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#242424]/85 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E35] mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer with Official WhatsApp Enquiry */}
                  <div className="pt-5 border-t border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-[#242424]/60 font-serif italic">
                      Privately tailored around your dates &amp; pace.
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href="#contact"
                        onClick={() => setSelectedExp(null)}
                        className="text-[11px] uppercase tracking-wider text-[#183D2B]/75 hover:text-[#183D2B] font-medium hidden sm:inline"
                      >
                        Enquiry Form
                      </Link>
                      <a
                        href={`https://wa.me/919447000000?text=${encodeURIComponent(
                          `Hello Jibu, I would like to enquire about the ${selectedExp.title} experience (${selectedExp.locations}).`
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
      </div>
    </section>
  );
}
