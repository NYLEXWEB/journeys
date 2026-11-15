"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Waves,
  Mountain,
  Trees,
  Landmark,
  Sun,
  UtensilsCrossed,
  Users2,
  ArrowUpRight,
} from "lucide-react";
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

  return (
    <section id="experiences" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-visible">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
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

          <Link
            href="/experiences"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E9E0D2] bg-white/80 hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm self-start sm:self-auto"
          >
            <span>Explore All Experiences</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 
          PURE VISUAL TILES
          Desktop / Tablet: Clean Multi-Column Luxury Grid (Completely static, no stacking)
        */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {experiencesData.map((exp) => (
            <Link
              key={exp.id}
              href="/experiences"
              className="group relative h-[480px] lg:h-[520px] rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden cursor-pointer border border-white/10 hover:border-[#8B5E35]/60 hover:-translate-y-2 transition-all duration-500 select-none bg-[#183D2B] hover:shadow-[0_12px_30px_rgba(24,61,43,0.08)] block"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

              <div className="absolute top-5 left-5 z-10">
                <span className="font-serif italic text-lg sm:text-xl text-[#E9E0D2] drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1 block">
                  {exp.number}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7 flex flex-col justify-end space-y-3">
                <h3 className="font-serif text-2xl sm:text-[25px] text-white font-light leading-snug group-hover:text-[#E9E0D2] group-hover:translate-x-0.5 transition-all duration-300">
                  {exp.title}
                </h3>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#E9E0D2] group-hover:text-white transition-colors duration-300">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 
          MOBILE ONLY: Sticky Stacking Card Deck
        */}
        <div className="sm:hidden flex flex-col relative">
          {experiencesData.map((exp, idx) => (
            <Link
              key={exp.id}
              href="/experiences"
              style={{
                top: `calc(75px + ${idx * 6}px)`,
                zIndex: idx + 5,
              }}
              className={`sticky group relative h-[70vh] min-h-[420px] max-h-[520px] rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_-4px_20px_rgba(0,0,0,0.18)] select-none bg-[#183D2B] border border-white/15 block ${
                idx === experiencesData.length - 1 ? "mb-0" : "mb-6"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
