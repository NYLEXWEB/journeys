"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface HeroSlide {
  id: number;
  src: string;
  word: string;
  subWord: string;
  tag: string;
  location: string;
  description: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    src: "/video/video-1.mp4",
    word: "Highlands",
    subWord: "Untouched.",
    tag: "Highlands",
    location: "Munnar & Western Ghats",
    description:
      "Misty tea estates and tranquil hill trails carved into South India's highest peaks.",
  },
  {
    id: 2,
    src: "/video/video-2.mp4",
    word: "Sanctuary",
    subWord: "Unhurried.",
    tag: "Waterways",
    location: "Alleppey & Kumarakom",
    description:
      "Slow, sunlit canals and private luxury houseboats where time quietly dissolves into emerald backwater rhythms.",
  },
  {
    id: 4,
    src: "/video/video-4.mp4",
    word: "Coastlines",
    subWord: "Timeless.",
    tag: "Shores",
    location: "Varkala & Arabian Sea",
    description:
      "Red laterite cliffs, golden shores, and the gentle swell of coastal breezes framed by secluded luxury hideaways.",
  },
  {
    id: 5,
    src: "/video/video-5.mp4",
    word: "Traditions",
    subWord: "Living.",
    tag: "Heritage",
    location: "Fort Kochi & Malabar",
    description:
      "Centuries of ritual arts, spice trail architecture, and authentic local encounters far beyond commercial guidebooks.",
  },
];

const SLIDE_DURATION = 5500; // 5.5 seconds per slide

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Advance slides automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  // Video playback synchronization
  useEffect(() => {
    HERO_SLIDES.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        if (idx === currentIndex) {
          try {
            if (vid.readyState >= 1) {
              vid.currentTime = 0;
            }
          } catch {}
          vid.play().catch(() => {});
        } else if (idx === (currentIndex + 1) % HERO_SLIDES.length) {
          vid.play().catch(() => {});
        }
      }
    });
  }, [currentIndex]);

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#183D2B]"
    >
      {/* Background Videos with Seamless Cross-fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <video
              key={slide.id}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={slide.src}
              muted
              playsInline
              loop
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-90 z-10 scale-100" : "opacity-0 z-0 pointer-events-none scale-105"
              } transition-transform duration-[6000ms] ease-out`}
            />
          );
        })}

        {/* Editorial Atmospheric Gradients - keeping center view open */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      </div>

      {/* 
        BOTTOM BAR CONTENT:
        1. Left: Heading (Compact, bold, aligned on the exact same horizontal line)
        2. Center: Invisible Anchor / Spacer where the floating Navbar capsule sits
        3. Right: Explore Journeys action button (matching height, on the exact same line)
        All 3 on the exact same line, moving up together on scroll!
      */}
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 inset-x-0 z-30 px-4 sm:px-8 lg:px-12 pointer-events-none">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Heading - compact & bold, vertically centered */}
          <div className="flex-1 flex items-center justify-start pointer-events-auto min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 h-[48px] sm:h-[54px]"
              >
                <span className="w-2 h-2 rounded-full bg-[#8B5E35] shrink-0" />
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-extrabold tracking-tight text-white leading-none select-none whitespace-nowrap drop-shadow-md">
                  {currentSlide.word}{" "}
                  <span className="italic font-normal font-serif text-[#E9E0D2]">
                    {currentSlide.subWord}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center: Invisible Anchor / Spacer for the floating Navbar capsule */}
          <div
            id="hero-navbar-anchor"
            className="shrink-0 h-[48px] sm:h-[54px] w-[300px] sm:w-[500px] md:w-[560px] pointer-events-none"
          />

          {/* Right: Explore Journeys CTA Button - matching height, on same line */}
          <div className="flex-1 flex items-center justify-end pointer-events-auto">
            <Link
              href="#destinations"
              className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 h-[48px] sm:h-[54px] rounded-full bg-white hover:bg-[#8B5E35] text-[#183D2B] hover:text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>Explore Journeys</span>
              <div className="w-6 h-6 rounded-full bg-[#183D2B] group-hover:bg-white text-white group-hover:text-[#8B5E35] flex items-center justify-center transition-colors shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
