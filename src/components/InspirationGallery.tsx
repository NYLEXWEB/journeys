"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles } from "lucide-react";

export default function InspirationGallery() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    caption: string;
    category: string;
  } | null>(null);

  const galleryItems = [
    {
      id: 1,
      category: "Tea Plantations",
      caption: "Endless rolling green carpets in the morning mist of Munnar",
      src: "/images/generated/hero-kerala.jpg",
      span: "md:col-span-2 md:row-span-2",
      aspect: "aspect-[4/3] md:aspect-[16/11]",
    },
    {
      id: 2,
      category: "Emerald Backwaters",
      caption: "Traditional kettuvallam houseboats gliding down tranquil canals",
      src: "/images/generated/houseboat-backwaters.jpg",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square",
    },
    {
      id: 3,
      category: "Tropical Coastlines",
      caption: "Secluded sandy shores framed by red laterite cliffs of Varkala",
      src: "/images/generated/coastal-varkala.jpg",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square",
    },
    {
      id: 4,
      category: "Heritage & Living Arts",
      caption: "Chinese fishing nets at sunset in historic Fort Kochi",
      src: "/images/generated/fort-kochi-heritage.jpg",
      span: "md:col-span-1 md:row-span-2",
      aspect: "aspect-[3/4] md:aspect-auto md:h-full",
    },
    {
      id: 5,
      category: "Mountain Trails",
      caption: "Highland tea estates and misty walkways of the Western Ghats",
      src: "/images/generated/tea-plantation-approach.jpg",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square",
    },
    {
      id: 6,
      category: "Traditional Cuisine",
      caption: "Authentic Kerala Sadhya feast served on fresh banana leaf",
      src: "/images/generated/traditional-cuisine.jpg",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square",
    },
    {
      id: 7,
      category: "Boutique Stays",
      caption: "Lakeside eco-luxury resorts set amidst serene tropical greenery",
      src: "/images/generated/luxury-resort-stay.jpg",
      span: "md:col-span-2 md:row-span-1",
      aspect: "aspect-[16/9] md:aspect-[21/9]",
    },
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 md:py-36 bg-[#FFFCF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block">
            Visual Storytelling
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.1]">
            Moments That{" "}
            <span className="italic font-serif text-[#183D2B] underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              Stay With You
            </span>
          </h2>
          <div className="w-12 h-[1px] bg-[#8B5E35] mx-auto my-4" />
          <p className="text-base sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed">
            Quiet stillness, living heritage, and lush landscapes that make a journey through South
            India truly unforgettable.
          </p>
        </motion.div>

        {/* Desktop Editorial Photo Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() =>
                setSelectedImage({
                  src: item.src,
                  caption: item.caption,
                  category: item.category,
                })
              }
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#E9E0D2] ${item.span} ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-108"
              />

              {/* Minimal Subtle Zoom Icon & Category on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                <div className="self-end p-2.5 rounded-full bg-white/20 backdrop-blur-md">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#E9E0D2] font-semibold">
                    {item.category}
                  </span>
                  <p className="font-serif text-lg text-white mt-1">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Fluid Responsive Grid (Clean, Professional, No Huge Sticky Scroll) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setSelectedImage({
                  src: item.src,
                  caption: item.caption,
                  category: item.category,
                })
              }
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-[#E9E0D2] group active:scale-[0.98] transition-transform"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent flex items-end p-4 text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2]">
                    {item.category}
                  </span>
                  <p className="font-serif text-sm text-white/95 line-clamp-1">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full bg-[#183D2B] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 text-[#FFFCF5] bg-[#183D2B]">
                <span className="text-xs uppercase tracking-widest text-[#E9E0D2] font-semibold">
                  {selectedImage.category}
                </span>
                <p className="font-serif text-xl sm:text-2xl mt-1 text-white">
                  {selectedImage.caption}
                </p>
                <p className="text-xs text-[#FFFCF5]/70 mt-2 font-sans tracking-wide">
                  Journeys by Jibu Thomas &mdash; Boutique Travel Design &amp; Destination Management
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
