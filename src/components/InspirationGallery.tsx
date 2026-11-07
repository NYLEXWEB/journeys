"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryPhoto {
  id: number;
  title: string;
  location: string;
  coordinates: string;
  category: "all" | "highlands" | "backwaters" | "coastal" | "heritage";
  categoryLabel: string;
  src: string;
  description: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    title: "Misty Sunrise over Rolling Tea Highlands",
    location: "Munnar, Western Ghats",
    coordinates: "10.0889° N, 77.0595° E",
    category: "highlands",
    categoryLabel: "Highlands",
    src: "/images/generated/tea-plantation-approach.jpg",
    description: "Centuries of high-altitude tea cultivation nestled into cool mountain ridges.",
  },
  {
    id: 2,
    title: "Traditional Kettuvallam on Palm Waterways",
    location: "Alleppey & Kumarakom",
    coordinates: "9.4981° N, 76.3388° E",
    category: "backwaters",
    categoryLabel: "Backwaters",
    src: "/images/generated/houseboat-backwaters.jpg",
    description: "Unhurried journeys through emerald canals where time dissolves into water ripples.",
  },
  {
    id: 3,
    title: "Dramatic Red Cliffs & Arabian Sea Swell",
    location: "Varkala Cliffside",
    coordinates: "8.7379° N, 76.7163° E",
    category: "coastal",
    categoryLabel: "Coastlines",
    src: "/images/generated/coastal-varkala.jpg",
    description: "Secluded golden shores framed by striking mineral-rich cliffs at golden hour.",
  },
  {
    id: 4,
    title: "Colonial Spice Corridors & Sunset Waters",
    location: "Fort Kochi Heritage",
    coordinates: "9.9658° N, 76.2421° E",
    category: "heritage",
    categoryLabel: "Heritage",
    src: "/images/generated/fort-kochi-heritage.jpg",
    description: "Centuries of maritime history, Chinese fishing nets, and antique spice warehouses.",
  },
  {
    id: 5,
    title: "Private Lakeside Eco-Resort Sanctuary",
    location: "Vembanad Lake",
    coordinates: "9.6175° N, 76.4300° E",
    category: "backwaters",
    categoryLabel: "Backwaters",
    src: "/images/generated/luxury-resort-stay.jpg",
    description: "Boutique architecture celebrating indigenous timber and serene lakeside reflection.",
  },
  {
    id: 6,
    title: "Organic Cardamom & Pepper Plantation Trails",
    location: "Wayanad Hills",
    coordinates: "11.6854° N, 76.1320° E",
    category: "highlands",
    categoryLabel: "Highlands",
    src: "/images/generated/spice-gardens.jpg",
    description: "Quiet forest estates where cardamom, pepper vines, and coffee blossom in harmony.",
  },
  {
    id: 7,
    title: "Authentic Kerala Sadhya Culinary Feast",
    location: "Traditional Family Kitchen",
    coordinates: "Central Kerala",
    category: "heritage",
    categoryLabel: "Heritage",
    src: "/images/generated/traditional-cuisine.jpg",
    description: "A banquet of over twenty seasonal curries and treats served on fresh banana leaf.",
  },
  {
    id: 8,
    title: "Western Ghats Highland Wilderness Ridge",
    location: "Kolukkumalai & Top Station",
    coordinates: "10.0760° N, 77.2185° E",
    category: "highlands",
    categoryLabel: "Highlands",
    src: "/images/generated/hero-kerala.jpg",
    description: "Untouched panoramic expanses where clouds drift beneath your feet at dawn.",
  },
];

export default function InspirationGallery() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "highlands" | "backwaters" | "coastal" | "heritage"
  >("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);

  const currentPhoto =
    activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev === 0 ? filteredPhotos.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev === filteredPhotos.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-36 bg-[#FFFCF5] relative overflow-hidden">
      {/* Delicate background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#E9E0D2]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block"
          >
            Visual Anthology
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-4xl md:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12] sm:leading-[1.08]"
          >
            Moments That{" "}
            <span className="italic font-serif text-[#183D2B] underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              Stay With You.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed max-w-2xl mx-auto"
          >
            A curation of quiet stillness, living heritage, and scenic splendours captured across
            South India.
          </motion.p>
        </div>

        {/* Minimalist Filter Navigation Bar with Pill Indicator */}
        <div className="flex items-center justify-center mb-10 sm:mb-16 px-1">
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#E9E0D2]/45 border border-[#E9E0D2] shadow-sm max-w-full overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "All Moments" },
              { id: "highlands", label: "Highlands" },
              { id: "backwaters", label: "Backwaters" },
              { id: "coastal", label: "Coastlines" },
              { id: "heritage", label: "Living Arts" },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                    isActive ? "text-[#FFFCF5]" : "text-[#242424] hover:text-[#183D2B]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="galleryTabPill"
                      className="absolute inset-0 bg-[#183D2B] rounded-full shadow-sm -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flawless Architectural Editorial Grid (Symmetrical, Precision Aligned) */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                onClick={() => setActiveLightboxIndex(index)}
                className="group relative bg-white p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-[#E9E0D2] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with Consistent Golden Editorial Ratio (4:5) */}
                <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[#183D2B]/5">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Mask for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Header Tags inside Image Frame */}
                  <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between text-white z-10">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-sans uppercase tracking-widest font-medium">
                      {photo.categoryLabel}
                    </span>

                    <span className="font-serif italic text-xs sm:text-sm text-[#E9E0D2] drop-shadow-sm">
                      № 0{photo.id}
                    </span>
                  </div>

                  {/* Bottom Information Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white space-y-1 sm:space-y-1.5 z-10">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-[#E9E0D2]">
                      <MapPin className="w-3 h-3 text-[#8B5E35]" />
                      <span>{photo.location}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-normal leading-snug text-white group-hover:text-[#E9E0D2] transition-colors">
                      {photo.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-white/80 font-sans font-light line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.description}
                    </p>
                  </div>

                  {/* Micro Zoom Pill appearing on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] sm:text-xs font-sans uppercase tracking-wider flex items-center gap-2 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>View Full Frame</span>
                    </div>
                  </div>
                </div>

                {/* Delicate Bottom Card Footer with Geographic Coordinates */}
                <div className="pt-2.5 sm:pt-3 px-1 flex items-center justify-between text-[10px] sm:text-[11px] font-sans text-[#242424]/60">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-tight">{photo.coordinates}</span>
                  <span className="font-serif italic text-[#8B5E35]">Journeys Archive</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* High-End Full-Screen Lightbox Modal with Arrows & Metadata */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left / Right Arrow Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full bg-[#183D2B] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row max-h-[92dvh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Column */}
              <div className="relative aspect-[4/3] md:aspect-auto md:w-3/5 w-full h-[260px] sm:h-[400px] md:h-[580px] shrink-0">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* Editorial Description Column */}
              <div className="p-5 sm:p-8 md:p-9 md:w-2/5 flex flex-col justify-between text-[#FFFCF5] bg-[#183D2B]">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold">
                      {currentPhoto.categoryLabel}
                    </span>
                    <span className="font-serif italic text-[#8B5E35] text-xs sm:text-sm">
                      № 0{currentPhoto.id} of 0{filteredPhotos.length}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white leading-snug">
                    {currentPhoto.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#E9E0D2]/90">
                    <MapPin className="w-3.5 h-3.5 text-[#8B5E35]" />
                    <span>{currentPhoto.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-[#FFFCF5]/85 font-light leading-relaxed pt-2 border-t border-white/10">
                    {currentPhoto.description}
                  </p>
                </div>

                <div className="pt-5 sm:pt-6 border-t border-white/10 space-y-3 mt-4 sm:mt-6">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-sans text-[#FFFCF5]/60">
                    <span className="font-mono text-[9px] sm:text-[10px]">{currentPhoto.coordinates}</span>
                    <span>Curated by Jibu Thomas</span>
                  </div>

                  <Link
                    href="#contact"
                    onClick={() => setActiveLightboxIndex(null)}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#8B5E35] hover:bg-[#734b28] text-white text-xs uppercase tracking-wider font-medium transition-colors"
                  >
                    <span>Inquire About This Destination</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
