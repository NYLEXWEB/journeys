"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Car,
  Hotel,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";

interface JourneyPackage {
  id: string;
  number: string;
  title: string;
  route: string;
  duration: string;
  image: string;
  video: string;
  imageAlt: string;
  tagline: string;
  highlights: string[];
}

const PACKAGES: JourneyPackage[] = [
  {
    id: "cultural-grand",
    number: "01",
    title: "The Grand Kerala Cultural Journey",
    route: "KANNUR · KASARAGOD · KOCHI",
    duration: "15 DAYS · 14 NIGHTS",
    image: "/images/generated/fort-kochi-heritage.jpg",
    video: "/video/video-5.mp4",
    imageAlt: "Cultural Kerala heritage and classical art performances",
    tagline: "Living temple rituals, ritual arts, and coastal spice ports.",
    highlights: ["Theyyam Ritual Arts", "Private Chauffeur", "Heritage Homestays"],
  },
  {
    id: "malabar-heritage",
    number: "02",
    title: "Malabar Heritage & Highland Trail",
    route: "WAYANAD · KANNUR · CALICUT",
    duration: "7 DAYS · 6 NIGHTS",
    image: "/images/generated/spice-gardens.jpg",
    video: "/video/video-1.mp4",
    imageAlt: "Organic spice plantations and ancient colonial trade routes",
    tagline: "Cardamom plantations, Malabar cuisine, and quiet forest sanctuaries.",
    highlights: ["Spice Estate Walks", "Culinary Masterclasses", "Colonial History"],
  },
  {
    id: "highlands-escape",
    number: "03",
    title: "Highland Tea & Backwaters Slow Living",
    route: "MUNNAR · ALLEPPEY · MARARI",
    duration: "8 DAYS · 7 NIGHTS",
    image: "/images/generated/tea-plantation-approach.jpg",
    video: "/video/video-2.mp4",
    imageAlt: "Misty tea estates overlooking tranquil waters",
    tagline: "Misty tea bungalows, private kettuvallam cruise, and quiet beaches.",
    highlights: ["Private Tea Bungalow", "Luxury Houseboat", "Ayurvedic Spa"],
  },
  {
    id: "monsoon-retreat",
    number: "04",
    title: "The Monsoon Kerala Experience",
    route: "ALAPPUZHA · KUMARAKOM · KOCHI",
    duration: "6 DAYS · 5 NIGHTS",
    image: "/images/generated/houseboat-backwaters.jpg",
    video: "/video/video-2.mp4",
    imageAlt: "Lush green monsoon backwaters with traditional boat",
    tagline: "Watch emerald rain ripple over tranquil canals from your veranda.",
    highlights: ["Monsoon Rejuvenation", "Canal Kayaking", "Fresh Seafood Feasts"],
  },
  {
    id: "coastal-ayurveda",
    number: "05",
    title: "Coastal Rejuvenation & Cliff Retreat",
    route: "VARKALA · KOVALAM · TRIVANDRUM",
    duration: "7 DAYS · 6 NIGHTS",
    image: "/images/generated/coastal-varkala.jpg",
    video: "/video/video-4.mp4",
    imageAlt: "Red laterite cliffs and pristine Arabian Sea shores",
    tagline: "Ayurvedic wellness, secluded red cliffs, and sunset ocean meditations.",
    highlights: ["Authentic Ayurveda", "Sunset Yoga", "Private Beach Access"],
  },
];

const SIGNATURE_SERVICES = [
  {
    id: "bespoke-itineraries",
    title: "Bespoke Itinerary Planning",
    tagline: "Designed around your vision and cadence",
    icon: Compass,
    description:
      "Every itinerary begins with a dedicated consultation. We sculpt each day around your personal interests, private tempo, and comfort.",
    image: "/images/generated/tea-plantation-approach.jpg",
  },
  {
    id: "private-chauffeur",
    title: "Private Chauffeur-Driven Journeys",
    tagline: "Comfortable, relaxed, and seamless road travel",
    icon: Car,
    description:
      "Travel in pristine, private air-conditioned vehicles with dedicated, courteous chauffeurs who ensure quiet comfort and spontaneous scenic stops.",
    image: "/images/generated/hero-kerala.jpg",
  },
  {
    id: "boutique-stays",
    title: "Handpicked Heritage Stays & Eco-Resorts",
    tagline: "Intimate properties rich in local soul",
    icon: Hotel,
    description:
      "From century-old tea planters' bungalows to private backwater villas, we choose accommodations with authentic architectural integrity.",
    image: "/images/generated/luxury-resort-stay.jpg",
  },
  {
    id: "cultural-encounters",
    title: "Authentic Cultural Encounters",
    tagline: "Meaningful connections with local masters",
    icon: Sparkles,
    description:
      "Walk through private spice groves, relish home-cooked banquets on banana leaves, and witness sacred temple arts with knowledgeable hosts.",
    image: "/images/generated/traditional-cuisine.jpg",
  },
];

export default function Experiences() {
  const [activePackageIndex, setActivePackageIndex] = useState(0);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Smooth debounced hover handler to prevent stutter during rapid cursor movement
  const handlePackageHover = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActivePackageIndex(index);
    }, 60); // 60ms calm buffer provides buttery luxury responsiveness
  };

  const handlePackageLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  // Play active video and warm up adjacent video smoothly
  useEffect(() => {
    PACKAGES.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        if (idx === activePackageIndex) {
          vid.play().catch(() => {});
        } else {
          // Pause inactive videos to keep CPU/GPU free and 100% fluid
          vid.pause();
        }
      }
    });
  }, [activePackageIndex]);

  const activePackage = PACKAGES[activePackageIndex];

  return (
    <section id="experiences" className="bg-[#FFFCF5] relative overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Part 1: Interactive Popular Packages (Silky Smooth GPU Crossfade)  */}
      {/* ------------------------------------------------------------------ */}
      <div id="journeys" className="relative py-16 sm:py-24 md:py-36 border-b border-[#E9E0D2]">
        {/* Pre-rendered GPU Accelerated Video Backgrounds (Zero Tearing / Zero Lag) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {PACKAGES.map((pkg, idx) => {
            const isActive = idx === activePackageIndex;
            return (
              <div
                key={pkg.id}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
                  isActive
                    ? "opacity-70 scale-100 z-10"
                    : "opacity-0 scale-105 z-0 pointer-events-none"
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={pkg.video}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={pkg.image}
                  className="w-full h-full object-cover object-center md:object-right filter contrast-[1.05] brightness-[0.95]"
                />
              </div>
            );
          })}

          {/* Calibrated Directional Gradients ensuring left copy legibility while leaving right backdrop vividly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5]/85 md:via-[#FFFCF5]/65 to-[#FFFCF5]/20 z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFCF5] via-transparent to-[#FFFCF5]/90 z-20 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading, Context & CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-5 sm:space-y-6"
            >
              <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block">
                Popular Packages
              </span>

              <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12] sm:leading-[1.08]">
                Our favourite long-form{" "}
                <span className="italic font-serif text-[#183D2B] font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
                  Journeys.
                </span>
              </h2>

              <p className="text-sm sm:text-lg text-[#242424]/85 font-light font-sans leading-relaxed">
                Hover over any journey to preview the live experience. Each itinerary is a bespoke starting point &mdash; we&apos;ll rebuild it around your pace, your dates, and the destinations that pull on you.
              </p>

              {/* Active Package Smooth Preview Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFCF5]/85 backdrop-blur-md border border-[#E9E0D2] shadow-sm space-y-2 min-h-[110px] sm:min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePackage.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-1.5 sm:space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-[#8B5E35] font-semibold tracking-wider uppercase">
                      <span>Currently Previewing:</span>
                      <span className="font-serif italic text-xs sm:text-sm text-[#183D2B]">
                        {activePackage.number} of 05
                      </span>
                    </div>
                    <p className="font-serif text-base sm:text-lg text-[#183D2B] font-medium leading-snug">
                      {activePackage.title}
                    </p>
                    <p className="text-xs text-[#242424]/80 font-sans leading-relaxed">
                      {activePackage.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activePackage.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-[#183D2B]/10 text-[#183D2B] font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <div className="pt-1 sm:pt-2">
                <Link
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#183D2B] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#8B5E35] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <span>Inquire About These Journeys</span>
                  <div className="p-1 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#183D2B] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: 100% Transparent List Items with Buttery Smooth Heading Highlight */}
            <div className="lg:col-span-7">
              <div className="space-y-0">
                {PACKAGES.map((pkg, index) => {
                  const isActive = index === activePackageIndex;
                  return (
                    <div
                      key={pkg.id}
                      onMouseEnter={() => handlePackageHover(index)}
                      onMouseLeave={handlePackageLeave}
                      onClick={() => setActivePackageIndex(index)}
                      className="group relative py-4 sm:py-6 bg-transparent border-b border-[#242424]/15 cursor-pointer select-none transition-colors duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-6">
                        {/* Number & Highlighted Heading */}
                        <div className="flex items-baseline gap-3 sm:gap-5 flex-1">
                          <span
                            className={`font-serif italic text-xl sm:text-2xl md:text-3xl font-light transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                              isActive
                                ? "text-[#8B5E35] scale-110 translate-x-1"
                                : "text-[#183D2B]/40 group-hover:text-[#183D2B]/75"
                            }`}
                          >
                            {pkg.number}
                          </span>

                          <div className="space-y-1">
                            <h3
                              className={`font-serif text-lg sm:text-2xl md:text-[27px] leading-snug transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isActive
                                  ? "text-[#183D2B] font-medium tracking-tight drop-shadow-sm translate-x-1 sm:translate-x-2"
                                  : "text-[#242424]/75 group-hover:text-[#183D2B] font-normal"
                              }`}
                            >
                              {pkg.title}
                            </h3>

                            {/* Active Softly Expanding Hairline Bar */}
                            <div
                              className={`h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isActive
                                  ? "w-16 sm:w-20 bg-[#8B5E35] opacity-100 translate-x-1 sm:translate-x-2"
                                  : "w-0 bg-transparent opacity-0 translate-x-0"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Location Tag, Duration & Arrow Action */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 pl-8 sm:pl-0 shrink-0">
                          <div className="space-y-0.5 text-left sm:text-right">
                            <span
                              className={`block text-[10px] sm:text-[11px] font-sans uppercase tracking-wider sm:tracking-widest font-medium transition-colors duration-500 ${
                                isActive ? "text-[#183D2B]" : "text-[#242424]/60"
                              }`}
                            >
                              {pkg.route}
                            </span>
                            <span
                              className={`block text-[9px] sm:text-[10px] font-sans uppercase tracking-wider transition-colors duration-500 ${
                                isActive ? "text-[#8B5E35] font-semibold" : "text-[#8B5E35]/70"
                              }`}
                            >
                              {pkg.duration}
                            </span>
                          </div>

                          <div
                            className={`p-2 sm:p-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isActive
                                ? "bg-[#183D2B] text-white shadow-md rotate-0 scale-105 sm:scale-110"
                                : "bg-black/5 text-[#242424]/40 group-hover:text-[#183D2B] group-hover:bg-[#183D2B]/10 -rotate-45"
                            }`}
                          >
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Part 2: Signature Services (Chauffeur, Stays, Activities)          */}
      {/* ------------------------------------------------------------------ */}
      <div className="py-16 sm:py-24 md:py-36 bg-[#E9E0D2]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-16 md:mb-20">
            <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Curated Services
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#183D2B] font-light tracking-tight">
              Crafted with Precision &amp; Discretion
            </h2>
            <div className="w-12 h-[1px] bg-[#8B5E35] my-3 sm:my-4" />
            <p className="text-sm sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed">
              Every detail is shaped with local knowledge, verified quality, and personal devotion.
            </p>
          </div>

          {/* 4 Clean Editorial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {SIGNATURE_SERVICES.map((srv, idx) => {
              return (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="group bg-[#FFFCF5] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E9E0D2] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>

                  <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-[#8B5E35] font-medium block">
                        {srv.tagline}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-[#183D2B] font-normal leading-snug">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#242424]/80 font-sans font-light leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E9E0D2]/60 flex items-center justify-between text-xs text-[#183D2B] font-medium">
                      <span>Boutique Care</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5E35] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
