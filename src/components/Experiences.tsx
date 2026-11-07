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
  Clock,
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
  const activePackage = PACKAGES[activePackageIndex];
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play video smoothly when active package changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activePackageIndex]);

  return (
    <section id="experiences" className="bg-[#FFFCF5] relative overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Part 1: Interactive Popular Packages (High Visibility Cinematic)    */}
      {/* ------------------------------------------------------------------ */}
      <div id="journeys" className="relative py-20 sm:py-28 md:py-36 border-b border-[#E9E0D2]">
        {/* Highly Visible Cinematic Background Video & Image Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePackage.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Cinematic Video Loop */}
              <video
                ref={videoRef}
                src={activePackage.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={activePackage.image}
                className="w-full h-full object-cover object-center md:object-right filter contrast-[1.05] brightness-[0.95]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Calibrated Directional Gradients ensuring left copy legibility while leaving right backdrop vividly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFCF5] via-[#FFFCF5]/85 md:via-[#FFFCF5]/65 to-[#FFFCF5]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFCF5] via-transparent to-[#FFFCF5]/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading, Context & CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block">
                Popular Packages
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08]">
                Our favourite long-form{" "}
                <span className="italic font-serif text-[#183D2B] font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
                  Journeys.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#242424]/85 font-light font-sans leading-relaxed">
                Hover over any journey to preview the live experience. Each itinerary is a bespoke starting point &mdash; we&apos;ll rebuild it around your pace, your dates, and the destinations that pull on you.
              </p>

              {/* Active Package Information Pill */}
              <div className="p-5 rounded-2xl bg-[#FFFCF5]/75 backdrop-blur-md border border-[#E9E0D2] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8B5E35] font-semibold tracking-wider uppercase">
                  <span>Currently Previewing:</span>
                  <span className="font-serif italic text-sm text-[#183D2B]">
                    {activePackage.number} of 05
                  </span>
                </div>
                <p className="font-serif text-lg text-[#183D2B] font-medium leading-snug">
                  {activePackage.title}
                </p>
                <p className="text-xs text-[#242424]/80 font-sans leading-relaxed">
                  {activePackage.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activePackage.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#183D2B]/10 text-[#183D2B] font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#183D2B] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#8B5E35] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <span>Inquire About These Journeys</span>
                  <div className="p-1 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#183D2B] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: 100% Transparent List Items with Highlighted Headings (As User Requested) */}
            <div className="lg:col-span-7">
              <div className="space-y-0">
                {PACKAGES.map((pkg, index) => {
                  const isActive = index === activePackageIndex;
                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      onMouseEnter={() => setActivePackageIndex(index)}
                      onClick={() => setActivePackageIndex(index)}
                      className="group relative py-5 sm:py-6 bg-transparent border-b border-[#242424]/15 cursor-pointer transition-all duration-300 select-none"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
                        {/* Number & Highlighted Heading */}
                        <div className="flex items-baseline gap-4 sm:gap-5 flex-1">
                          <span
                            className={`font-serif italic text-2xl sm:text-3xl font-light transition-all duration-300 shrink-0 ${
                              isActive
                                ? "text-[#8B5E35] scale-110 translate-x-1"
                                : "text-[#183D2B]/40 group-hover:text-[#183D2B]"
                            }`}
                          >
                            {pkg.number}
                          </span>

                          <div className="space-y-1">
                            <h3
                              className={`font-serif text-xl sm:text-2xl md:text-[27px] transition-all duration-300 leading-snug ${
                                isActive
                                  ? "text-[#183D2B] font-medium tracking-tight drop-shadow-sm translate-x-1"
                                  : "text-[#242424]/80 group-hover:text-[#183D2B] font-normal"
                              }`}
                            >
                              {pkg.title}
                            </h3>

                            {/* Active subtle indicator bar */}
                            {isActive && (
                              <motion.div
                                layoutId="packageActiveLine"
                                className="h-[2px] w-16 bg-[#8B5E35] rounded-full"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Location Tag, Duration & Arrow Action */}
                        <div className="flex items-center gap-4 sm:gap-6 pl-10 sm:pl-0 self-end sm:self-center shrink-0">
                          <div className="space-y-0.5 text-left sm:text-right">
                            <span
                              className={`block text-[11px] font-sans uppercase tracking-widest font-medium transition-colors ${
                                isActive ? "text-[#183D2B]" : "text-[#242424]/60"
                              }`}
                            >
                              {pkg.route}
                            </span>
                            <span
                              className={`block text-[10px] font-sans uppercase tracking-wider transition-colors ${
                                isActive ? "text-[#8B5E35] font-semibold" : "text-[#8B5E35]/75"
                              }`}
                            >
                              {pkg.duration}
                            </span>
                          </div>

                          <div
                            className={`p-2.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-[#183D2B] text-white shadow-md rotate-0 scale-110"
                                : "bg-black/5 text-[#242424]/40 group-hover:text-[#183D2B] group-hover:bg-white -rotate-45"
                            }`}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
      <div className="py-20 sm:py-28 md:py-36 bg-[#E9E0D2]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-14 sm:mb-20">
            <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Curated Services
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight">
              Crafted with Precision &amp; Discretion
            </h2>
            <div className="w-12 h-[1px] bg-[#8B5E35] my-4" />
            <p className="text-base sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed">
              Every detail is shaped with local knowledge, verified quality, and personal devotion.
            </p>
          </div>

          {/* 4 Clean Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SIGNATURE_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="group bg-[#FFFCF5] rounded-3xl overflow-hidden border border-[#E9E0D2] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-3 left-3 p-2.5 rounded-full bg-[#FFFCF5]/90 backdrop-blur-md text-[#183D2B] shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-sans uppercase tracking-widest text-[#8B5E35] font-medium block">
                        {srv.tagline}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#183D2B] font-normal leading-snug">
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
