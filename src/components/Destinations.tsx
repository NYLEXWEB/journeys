"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  X,
  Sparkles,
  Check,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface DestinationItem {
  id: string;
  name: string;
  state: "Kerala" | "Tamil Nadu" | "Karnataka";
  stateCategory: "kerala" | "tamil-nadu" | "karnataka";
  region: string;
  image: string;
  shortVibe: string;
  overview: string;
  highlights: string[];
}

export type DestinationCategory = "all" | "kerala" | "tamil-nadu" | "karnataka";

export interface CategoryOption {
  id: DestinationCategory;
  label: string;
  count: number;
}

export const DESTINATIONS_DATA: DestinationItem[] = [
  // --- KERALA (8 DESTINATIONS) ---
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Western Ghats Highlands",
    image: "/images/generated/tea-plantation-approach.jpg",
    shortVibe: "Misty tea hills & colonial plantation bungalows.",
    overview:
      "Perched high in the Western Ghats at 1,600 metres, Munnar is South India's premier highland retreat. Endless emerald tea plantations, cool mountain air, and private heritage planters' bungalows nestled in cloud-shrouded valleys.",
    highlights: ["Private Tea Estate Walks", "Top Station Sunrise Vistas", "Restored Colonial Bungalows"],
  },
  {
    id: "wayanad",
    name: "Wayanad",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Northern Rainforest Ghats",
    image: "/images/generated/spice-gardens.jpg",
    shortVibe: "Ancient caves, cardamom valleys & quiet forest hideaways.",
    overview:
      "A lush highland paradise in northern Kerala known for its ancient Edakkal caves, dense bio-diverse rainforests, organic cardamom plantations, and secluded eco-resorts tucked beneath the canopy.",
    highlights: ["Cardamom Plantation Treks", "Edakkal Cave Heritage", "Wildlife & Bird Sanctuaries"],
  },
  {
    id: "thekkady",
    name: "Thekkady",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Periyar Wildlife Sanctuary",
    image: "/images/generated/hero-kerala.jpg",
    shortVibe: "Spice-scented breezes & wild elephant lake safaris.",
    overview:
      "Home to the famous Periyar Tiger Reserve. Experience gentle morning boat safaris across Periyar Lake, fragrant spice walks with botanists, and tranquil rainforest bamboo rafting.",
    highlights: ["Lake Boat Safaris", "Fragrant Spice Farm Walks", "Rainforest Bamboo Rafting"],
  },
  {
    id: "alleppey",
    name: "Alleppey",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Emerald Central Backwaters",
    image: "/images/generated/houseboat-backwaters.jpg",
    shortVibe: "Private luxury houseboats & tranquil palm canals.",
    overview:
      "The undisputed heart of the backwaters. Glide through narrow palm-shaded village canals on a private, handcrafted wooden kettuvallam with your personal chef preparing coastal banquets.",
    highlights: ["Private Luxury Kettuvallam Cruise", "Narrow Village Canoe Rides", "Sunset Lagoon Dining"],
  },
  {
    id: "kumarakom",
    name: "Kumarakom",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Vembanad Lake Sanctuary",
    image: "/images/generated/luxury-resort-stay.jpg",
    shortVibe: "Lakeside luxury, bird sanctuaries & quiet wellness.",
    overview:
      "Set against the vast expanses of Vembanad Lake, Kumarakom offers world-class migratory birdwatching, serene lakeside luxury retreats, and authentic Ayurvedic therapies.",
    highlights: ["Vembanad Bird Sanctuary", "Lakeside Sunset Cruises", "Authentic Ayurvedic Spas"],
  },
  {
    id: "fort-kochi",
    name: "Fort Kochi",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Colonial Maritime Port",
    image: "/images/generated/fort-kochi-heritage.jpg",
    shortVibe: "Antique spice avenues, Chinese fishing nets & art cafes.",
    overview:
      "A living museum of Portuguese, Dutch, and British history. Stroll through Jew Town antique shops, art galleries, and witness centuries-old Kathakali dramatic arts by the sea.",
    highlights: ["Chinese Fishing Nets at Twilight", "Jew Town & Synagogue", "Kathakali Performance Arts"],
  },
  {
    id: "varkala",
    name: "Varkala",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Southern Red Cliff Coast",
    image: "/images/generated/coastal-varkala.jpg",
    shortVibe: "Dramatic laterite cliffs, Arabian Sea sunsets & coastal quiet.",
    overview:
      "Unique red cliffs dropping dramatically into golden sand shores. Ideal for quiet seaside rejuvenation, gentle ocean breezes, and uncrowded coastal relaxation.",
    highlights: ["Laterite Cliff-top Walks", "Secluded Papanasam Beach", "Coastal Yoga & Ayurveda"],
  },
  {
    id: "kovalam",
    name: "Kovalam",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Historic Crescent Beach",
    image: "/images/generated/hero-kerala.jpg",
    shortVibe: "Striped lighthouse, calm swimming bays & seaside luxury.",
    overview:
      "Kerala's iconic vintage seaside destination featuring three crescent-shaped bays, a famous striped lighthouse, and secluded luxury five-star cliffside resorts.",
    highlights: ["Lighthouse Beach Vistas", "Calm Arabian Sea Swimming", "Luxury Cliffside Spas"],
  },

  // --- TAMIL NADU (4 DESTINATIONS) ---
  {
    id: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    stateCategory: "tamil-nadu",
    region: "Nilgiri Blue Mountains",
    image: "/images/generated/tea-plantation-approach.jpg",
    shortVibe: "Heritage toy train, eucalyptus forests & botanical gardens.",
    overview:
      "The Queen of Hill Stations in the Nilgiris. Ride the UNESCO World Heritage mountain toy train, stroll through century-old botanical gardens, and explore quiet Toda tribal settlements.",
    highlights: ["UNESCO Mountain Toy Train", "Centuries-Old Botanical Gardens", "Quiet Nilgiri Tea Ridges"],
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    state: "Tamil Nadu",
    stateCategory: "tamil-nadu",
    region: "Palani Cloud Hills",
    image: "/images/generated/spice-gardens.jpg",
    shortVibe: "Star-shaped lake, pine forests & pillar rock vistas.",
    overview:
      "Nestled in the Palani Hills, Kodaikanal is prized for its cool alpine climate, tranquil star-shaped lake, fragrant pine forests, and dramatic cliff viewpoints.",
    highlights: ["Tranquil Star Lake Boating", "Fragrant Pine Forest Walks", "Pillar Rocks Vistas"],
  },
  {
    id: "madurai",
    name: "Madurai",
    state: "Tamil Nadu",
    stateCategory: "tamil-nadu",
    region: "Ancient Temple Heartland",
    image: "/images/generated/fort-kochi-heritage.jpg",
    shortVibe: "Dravidian gopuram towers, night ceremonies & jasmine bazaars.",
    overview:
      "One of the oldest continuously inhabited cities in the world. Marvel at the soaring sculpted gopurams of Meenakshi Amman Temple and witness the sacred nightly divine procession.",
    highlights: ["Meenakshi Amman Temple", "Nightly Bedchamber Procession", "Fragrant Jasmine Flower Market"],
  },
  {
    id: "rameswaram",
    name: "Rameswaram",
    state: "Tamil Nadu",
    stateCategory: "tamil-nadu",
    region: "Sacred Island & Pamban Straits",
    image: "/images/generated/coastal-varkala.jpg",
    shortVibe: "Iconic ocean cantilever bridge, 1,000-pillar temple corridors.",
    overview:
      "A sacred island city connected to mainland India by the engineering marvel of Pamban Sea Bridge. Famous for Ramanathaswamy Temple's record-setting pillared corridors and sacred theertham wells.",
    highlights: ["Historic Pamban Sea Bridge", "Ramanathaswamy Pillar Corridors", "Ghost Town of Dhanushkodi"],
  },

  // --- KARNATAKA (4 DESTINATIONS) ---
  {
    id: "coorg",
    name: "Coorg",
    state: "Karnataka",
    stateCategory: "karnataka",
    region: "Kodagu Coffee Highlands",
    image: "/images/generated/spice-gardens.jpg",
    shortVibe: "Arabica coffee estates, cascading waterfalls & Kodava cuisine.",
    overview:
      "Known as the Scotland of India. Misty slopes cloaked in Arabica coffee and black pepper vines, private estate stays, and authentic Kodava hospitality and cuisine.",
    highlights: ["Private Coffee Estate Stays", "Abbey & Iruppu Waterfalls", "Traditional Kodava Banquets"],
  },
  {
    id: "mysore",
    name: "Mysore",
    state: "Karnataka",
    stateCategory: "karnataka",
    region: "Royal Heritage City",
    image: "/images/generated/fort-kochi-heritage.jpg",
    shortVibe: "Illuminated royal palace, sandalwood markets & silk weaving.",
    overview:
      "The city of royal palaces and sandalwood. Visit the opulent Mysore Palace illuminated by 100,000 bulbs, browse vibrant Devaraja fruit and spice markets, and see heritage silk weaving.",
    highlights: ["Opulent Illuminated Palace", "Historic Devaraja Market", "Heritage Sandalwood Artisans"],
  },
  {
    id: "chikmagalur",
    name: "Chikmagalur",
    state: "Karnataka",
    stateCategory: "karnataka",
    region: "Birthplace of Indian Coffee",
    image: "/images/generated/tea-plantation-approach.jpg",
    shortVibe: "Mullayanagiri peaks, bababudan coffee hills & mountain streams.",
    overview:
      "The birthplace of coffee in India. Dramatic mountain peaks including Karnataka's highest summit Mullayanagiri, remote coffee trails, and crisp, fresh mountain air.",
    highlights: ["Mullayanagiri Peak Treks", "Heritage Coffee Plantation Walks", "Mountain Stream Hideaways"],
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    stateCategory: "karnataka",
    region: "UNESCO Vijayanagara Empire",
    image: "/images/generated/fort-kochi-heritage.jpg",
    shortVibe: "Ancient stone boulder empire, chariot temples & Tungabhadra River.",
    overview:
      "A UNESCO World Heritage marvel. Surreal landscapes of giant granite boulders strewn across the ruins of the 14th-century Vijayanagara Empire, stone chariots, and sacred river ghats.",
    highlights: ["UNESCO Vijayanagara Ruins", "Vittala Stone Chariot Temple", "Tungabhadra Coracle Rides"],
  },
];

export default function Destinations() {
  const [selectedDest, setSelectedDest] = useState<DestinationItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>("all");
  const [viewMode, setViewMode] = useState<"flow" | "grid">("flow");

  const categories: CategoryOption[] = useMemo(
    () => [
      { id: "all", label: "All Destinations", count: DESTINATIONS_DATA.length },
      {
        id: "kerala",
        label: "Kerala",
        count: DESTINATIONS_DATA.filter((d) => d.stateCategory === "kerala").length,
      },
      {
        id: "tamil-nadu",
        label: "Tamil Nadu",
        count: DESTINATIONS_DATA.filter((d) => d.stateCategory === "tamil-nadu").length,
      },
      {
        id: "karnataka",
        label: "Karnataka",
        count: DESTINATIONS_DATA.filter((d) => d.stateCategory === "karnataka").length,
      },
    ],
    []
  );

  const filteredDestinations = useMemo(() => {
    if (selectedCategory === "all") return DESTINATIONS_DATA;
    return DESTINATIONS_DATA.filter((d) => d.stateCategory === selectedCategory);
  }, [selectedCategory]);

  // Seamless duplicated tracks dynamically computed based on active category
  const { trackOne, trackTwo } = useMemo(() => {
    const items = filteredDestinations;
    if (items.length === 0) return { trackOne: [], trackTwo: [] };

    if (items.length >= 8) {
      // Split into 2 rows, pad each row to ensure >= 8 items before doubling for seamless -50% CSS looping
      const mid = Math.ceil(items.length / 2);
      const row1Base = items.slice(0, mid);
      const row2Base = items.slice(mid);

      const padRow = (arr: DestinationItem[]) => {
        let repeated = [...arr];
        while (repeated.length < 8) {
          repeated = [...repeated, ...arr];
        }
        return [...repeated, ...repeated];
      };

      return {
        trackOne: padRow(row1Base),
        trackTwo: padRow(row2Base),
      };
    } else {
      // For 4 items (Tamil Nadu / Karnataka)
      let rep1 = [...items];
      while (rep1.length < 8) {
        rep1 = [...rep1, ...items];
      }
      const reversed = [...items].slice().reverse();
      let rep2 = [...reversed];
      while (rep2.length < 8) {
        rep2 = [...rep2, ...reversed];
      }
      return {
        trackOne: [...rep1, ...rep1],
        trackTwo: [...rep2, ...rep2],
      };
    }
  }, [filteredDestinations]);

  // Dynamic header info matching the active selection
  const headerInfo = useMemo(() => {
    switch (selectedCategory) {
      case "kerala":
        return {
          countPhrase: "Eight iconic locations in Kerala,",
          subText: "Misty highlands, emerald backwaters & serene coastal cliffs.",
        };
      case "tamil-nadu":
        return {
          countPhrase: "Four iconic locations in Tamil Nadu,",
          subText: "Heritage Nilgiri ridges, ancient temple cities & sacred straits.",
        };
      case "karnataka":
        return {
          countPhrase: "Four iconic locations in Karnataka,",
          subText: "Arabica coffee highlands, royal palaces & boulder-strewn UNESCO ruins.",
        };
      case "all":
      default:
        return {
          countPhrase: "Sixteen iconic locations,",
          subText: "Kerala • Tamil Nadu • Karnataka. Continuous panoramic showcase.",
        };
    }
  }, [selectedCategory]);

  // Background Scroll Lock (Freeze background when modal is open)
  useEffect(() => {
    if (selectedDest) {
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
  }, [selectedDest]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDest(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderDestinationCard = (
    dest: DestinationItem,
    indexKey: string,
    isGrid: boolean = false
  ) => (
    <Link
      key={indexKey}
      href={`/destinations#${dest.id}`}
      className={`group relative ${
        isGrid
          ? "w-full h-[380px] sm:h-[420px]"
          : "w-[280px] sm:w-[340px] md:w-[380px] h-[340px] sm:h-[390px] shrink-0 mx-2.5 sm:mx-3.5"
      } rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(24,61,43,0.08)] hover:shadow-[0_20px_50px_rgba(24,61,43,0.22)] transition-all duration-700 bg-[#183D2B] select-none`}
    >
      {/* Full Image */}
      <Image
        src={dest.image}
        alt={dest.name}
        fill
        sizes={
          isGrid
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            : "(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
        }
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
      />

      {/* Ambient Dark Gradient for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

      {/* Top State Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#183D2B] shadow-sm">
          {dest.state}
        </span>
      </div>

      {/* Bottom Overlay: Title & Minimal "View Details" */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col justify-end space-y-2">
        <span className="text-[10px] sm:text-[11px] font-sans text-[#E9E0D2] tracking-wide flex items-center gap-1.5 opacity-90">
          <MapPin className="w-3 h-3 text-[#E9E0D2]" />
          <span>{dest.region}</span>
        </span>

        <h3 className="text-2xl sm:text-3xl font-serif text-white font-light leading-snug group-hover:text-[#E9E0D2] transition-colors duration-300">
          {dest.name}
        </h3>

        <div className="pt-1">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#E9E0D2] group-hover:text-white transition-colors duration-300">
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#FFFCF5] relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E9E0D2]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E35] shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] text-[#183D2B] uppercase">
              DESTINATIONS
            </h2>
            <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">


            {/* View Mode Toggle: Flow vs Grid */}
            <div className="flex items-center p-1 rounded-full bg-[#E9E0D2]/40 border border-[#E9E0D2]">
              <button
                onClick={() => setViewMode("flow")}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  viewMode === "flow"
                    ? "bg-[#183D2B] text-[#FFFCF5] shadow-sm"
                    : "text-[#183D2B]/70 hover:text-[#183D2B]"
                }`}
                title="Continuous Panoramic Showcase"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Showcase</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#183D2B] text-[#FFFCF5] shadow-sm"
                    : "text-[#183D2B]/70 hover:text-[#183D2B]"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Kerala, Tamil Nadu, Karnataka, All) */}
        <div className="pt-6 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2.5 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? "bg-[#183D2B] text-[#FFFCF5] shadow-lg shadow-[#183D2B]/15 scale-[1.02]"
                    : "bg-[#E9E0D2]/30 text-[#183D2B]/80 hover:text-[#183D2B] hover:bg-[#E9E0D2]/60 border border-[#E9E0D2]/50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? "bg-white/20 text-[#FFFCF5]"
                      : "bg-[#183D2B]/10 text-[#183D2B]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        DESTINATION CARDS DISPLAY:
        Mode 1: Continuous Panoramic Flow (Marquee)
        Mode 2: Editorial Responsive Grid View
      */}
      <AnimatePresence mode="wait">
        {viewMode === "flow" ? (
          <motion.div
            key={`flow-${selectedCategory}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full overflow-hidden space-y-5 sm:space-y-6"
          >
            {/* TRACK 1 (Moving Left) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-left flex py-1">
                {trackOne.map((dest, idx) =>
                  renderDestinationCard(dest, `row1-${dest.id}-${idx}`, false)
                )}
              </div>
            </div>

            {/* TRACK 2 (Moving Right) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-right flex py-1">
                {trackTwo.map((dest, idx) =>
                  renderDestinationCard(dest, `row2-${dest.id}-${idx}`, false)
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${selectedCategory}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {filteredDestinations.map((dest) =>
                renderDestinationCard(dest, `grid-${dest.id}`, true)
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explore Full Directory CTA Button */}
      <div className="mt-12 sm:mt-16 text-center px-4 relative z-10">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span>View the Full Destinations Directory</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Modal: Destination Details (Luxury Editorial Split Modal with WhatsApp Enquiry) */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
            onClick={() => setSelectedDest(null)}
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
                onClick={() => setSelectedDest(null)}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 md:bg-black/10 hover:bg-[#183D2B] text-white md:text-[#183D2B] md:hover:text-white transition-all shadow-sm active:scale-90 backdrop-blur-sm cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Full-Bleed Image */}
              <div className="md:w-[46%] relative h-48 sm:h-64 md:h-auto min-h-[190px] sm:min-h-[260px] md:min-h-full overflow-hidden bg-[#183D2B] shrink-0">
                <Image
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] tracking-wider">
                    {selectedDest.state} &bull; {selectedDest.region}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
                  <h3 className="font-serif text-3xl sm:text-4xl leading-tight font-light text-white">
                    {selectedDest.name}
                  </h3>
                </div>
              </div>

              {/* Right Column: Editorial Overview & Highlights */}
              <div
                data-lenis-prevent="true"
                className="md:w-[54%] p-6 sm:p-9 lg:p-11 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6"
              >
                <div className="space-y-4 pt-1 sm:pt-0">
                  <div className="inline-flex items-center gap-2 text-[#8B5E35] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5E35]" />
                    <span>Destination Guide &bull; {selectedDest.state}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-light leading-snug">
                    Discover {selectedDest.name}
                  </h3>

                  <p className="font-serif italic text-xs sm:text-sm text-[#8B5E35]">
                    &ldquo;{selectedDest.shortVibe}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans pt-1">
                    {selectedDest.overview}
                  </p>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-[#E9E0D2] space-y-2.5">
                    <h5 className="text-[11px] uppercase tracking-widest text-[#183D2B] font-semibold">
                      Curated Highlights We Arrange:
                    </h5>
                    <div className="space-y-2">
                      {selectedDest.highlights.map((h, i) => (
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
                    Private Chauffeur &amp; Handpicked Stays
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="#contact"
                      onClick={() => setSelectedDest(null)}
                      className="text-[11px] uppercase tracking-wider text-[#183D2B]/75 hover:text-[#183D2B] font-medium hidden sm:inline"
                    >
                      Enquiry Form
                    </Link>
                    <a
                      href={`https://wa.me/919447000000?text=${encodeURIComponent(
                        `Hello Jibu, I would like to enquire about traveling to ${selectedDest.name}, ${selectedDest.state}.`
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
    </section>
  );
}
