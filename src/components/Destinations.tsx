"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState<"all" | "kerala" | "beyond">("all");

  const destinations = [
    {
      name: "Munnar",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/tea-plantation-approach.jpg",
    },
    {
      name: "Alleppey",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/houseboat-backwaters.jpg",
    },
    {
      name: "Fort Kochi",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/fort-kochi-heritage.jpg",
    },
    {
      name: "Wayanad",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/spice-gardens.jpg",
    },
    {
      name: "Thekkady",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/hero-kerala.jpg",
    },
    {
      name: "Kumarakom",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/houseboat-backwaters.jpg",
    },
    {
      name: "Varkala",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/coastal-varkala.jpg",
    },
    {
      name: "Kovalam",
      region: "Kerala",
      category: "kerala",
      image: "/images/generated/coastal-varkala.jpg",
    },
    {
      name: "Tamil Nadu",
      region: "Beyond Kerala",
      category: "beyond",
      image: "/images/generated/fort-kochi-heritage.jpg",
    },
    {
      name: "Karnataka",
      region: "Beyond Kerala",
      category: "beyond",
      image: "/images/generated/luxury-resort-stay.jpg",
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    if (activeCategory === "all") return true;
    return dest.category === activeCategory;
  });

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-[#FFFCF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
              Destination Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight">
              Discover Kerala &amp; South India
            </h2>
            <p className="text-base sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed">
              From the tranquil lagoons of Alleppey to the mist-draped peaks of the Western Ghats and the heritage corridors of South India.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#E9E0D2]/50 border border-[#E9E0D2] self-start md:self-end">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${activeCategory === "all"
                  ? "bg-[#183D2B] text-[#FFFCF5] shadow-sm"
                  : "text-[#242424] hover:text-[#183D2B]"
                }`}
            >
              All Destinations
            </button>
            <button
              onClick={() => setActiveCategory("kerala")}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${activeCategory === "kerala"
                  ? "bg-[#183D2B] text-[#FFFCF5] shadow-sm"
                  : "text-[#242424] hover:text-[#183D2B]"
                }`}
            >
              Kerala
            </button>
            <button
              onClick={() => setActiveCategory("beyond")}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${activeCategory === "beyond"
                  ? "bg-[#183D2B] text-[#FFFCF5] shadow-sm"
                  : "text-[#242424] hover:text-[#183D2B]"
                }`}
            >
              Beyond Kerala
            </button>
          </div>
        </div>

        {/* Minimal Magazine Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredDestinations.map((dest) => (
            <Link
              key={dest.name}
              href="#contact"
              className="group block bg-[#FFFCF5] rounded-2xl overflow-hidden border border-[#E9E0D2]/80 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Region Badge */}
                <div className="absolute top-4 left-4 bg-[#FFFCF5]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-sans font-medium text-[#183D2B] flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3 h-3 text-[#8B5E35]" />
                  <span>{dest.region}</span>
                </div>

                {/* Clean Destination Name & Action on Hover */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-sm">
                      {dest.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#E9E0D2] font-medium group-hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore
                    </span>
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-[#8B5E35] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
