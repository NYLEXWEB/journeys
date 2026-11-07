"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

interface DestinationItem {
  name: string;
  region: string;
  category: "kerala" | "beyond";
  image: string;
  tagline: string;
}

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState<"all" | "kerala" | "beyond">("all");

  const destinations: DestinationItem[] = [
    {
      name: "Munnar",
      region: "Highlands & Western Ghats",
      category: "kerala",
      image: "/images/generated/tea-plantation-approach.jpg",
      tagline: "High-altitude tea trails, misty morning ridges & cool air.",
    },
    {
      name: "Alleppey",
      region: "Central Kerala Backwaters",
      category: "kerala",
      image: "/images/generated/houseboat-backwaters.jpg",
      tagline: "Private kettuvallam cruises on tranquil palm-fringed canals.",
    },
    {
      name: "Fort Kochi",
      region: "Heritage Coastal Port",
      category: "kerala",
      image: "/images/generated/fort-kochi-heritage.jpg",
      tagline: "Colonial spice avenues, antique quarters & Chinese fishing nets.",
    },
    {
      name: "Wayanad",
      region: "Bio-Diverse Northern Hills",
      category: "kerala",
      image: "/images/generated/spice-gardens.jpg",
      tagline: "Ancient caves, cardamom valleys & peaceful forest hideaways.",
    },
    {
      name: "Thekkady",
      region: "Periyar Wildlife Sanctuary",
      category: "kerala",
      image: "/images/generated/hero-kerala.jpg",
      tagline: "Lush spice plantations, elephant corridors & jungle walks.",
    },
    {
      name: "Kumarakom",
      region: "Vembanad Lake Sanctuaries",
      category: "kerala",
      image: "/images/generated/houseboat-backwaters.jpg",
      tagline: "Quiet lakeside luxury resorts and world-class bird sanctuaries.",
    },
    {
      name: "Varkala",
      region: "Southern Cliff Coastline",
      category: "kerala",
      image: "/images/generated/coastal-varkala.jpg",
      tagline: "Dramatic red laterite cliffs, sunset viewpoints & warm waters.",
    },
    {
      name: "Tamil Nadu",
      region: "Beyond Kerala &bull; Chettinad",
      category: "beyond",
      image: "/images/generated/fort-kochi-heritage.jpg",
      tagline: "Grand Dravidian temple architecture, palaces & spice heritage.",
    },
    {
      name: "Karnataka",
      region: "Beyond Kerala &bull; Coorg & Kabini",
      category: "beyond",
      image: "/images/generated/luxury-resort-stay.jpg",
      tagline: "Coffee plantation estates and pristine Nagarhole tiger reserves.",
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    if (activeCategory === "all") return true;
    return dest.category === activeCategory;
  });

  return (
    <section id="destinations" className="py-20 sm:py-28 md:py-36 bg-[#FFFCF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-3"
          >
            <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block">
              Destination Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.1]">
              Discover Kerala &amp;{" "}
              <span className="italic font-serif text-[#183D2B] underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
                South India
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed">
              From the tranquil lagoons of Alleppey to the mist-draped peaks of the Western Ghats and
              the ancient cultural corridors beyond.
            </p>
          </motion.div>

          {/* Filter Pills with Animated Selection */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#E9E0D2]/50 border border-[#E9E0D2] self-start md:self-end">
            {(
              [
                { id: "all", label: "All Regions" },
                { id: "kerala", label: "Kerala" },
                { id: "beyond", label: "Beyond Kerala" },
              ] as const
            ).map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                    isActive ? "text-[#FFFCF5]" : "text-[#242424] hover:text-[#183D2B]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#183D2B] rounded-full shadow-sm -z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Magazine Destination Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <motion.div
                layout
                key={dest.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href="#contact"
                  className="group block bg-white rounded-3xl overflow-hidden border border-[#E9E0D2] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  {/* Image Container with Zoom & Gradient */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Region Pill */}
                    <div className="absolute top-4 left-4 bg-[#FFFCF5]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-sans font-medium text-[#183D2B] flex items-center gap-1.5 shadow-sm">
                      <MapPin className="w-3 h-3 text-[#8B5E35]" />
                      <span>{dest.region}</span>
                    </div>

                    {/* Bottom Card Title & Reveal Details */}
                    <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-sm group-hover:text-[#E9E0D2] transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-white/80 font-sans font-light line-clamp-1">
                          {dest.tagline}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-[#8B5E35] transition-colors shrink-0 shadow-md">
                        <ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
