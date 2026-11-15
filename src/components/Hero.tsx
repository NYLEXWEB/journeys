"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

interface HeroSlide {
  id?: number;
  slideId?: number;
  src: string;
  word: string;
  subWord: string;
  tag: string;
  location: string;
  description: string;
}

const STATIC_HERO_SLIDES: HeroSlide[] = [
  {
    slideId: 1,
    src: "/video/video-1.mp4",
    word: "Highlands",
    subWord: "Untouched.",
    tag: "Highlands",
    location: "Munnar & Western Ghats",
    description:
      "Misty tea estates and tranquil hill trails carved into South India's highest peaks.",
  },
  {
    slideId: 2,
    src: "/video/video-2.mp4",
    word: "Sanctuary",
    subWord: "Unhurried.",
    tag: "Waterways",
    location: "Alleppey & Kumarakom",
    description:
      "Slow, sunlit canals and private luxury houseboats where time quietly dissolves into emerald backwater rhythms.",
  },
  {
    slideId: 4,
    src: "/video/video-4.mp4",
    word: "Coastlines",
    subWord: "Timeless.",
    tag: "Shores",
    location: "Varkala & Arabian Sea",
    description:
      "Red laterite cliffs, golden shores, and the gentle swell of coastal breezes framed by secluded luxury hideaways.",
  },
  {
    slideId: 5,
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
  const content = useWebsiteContent();
  const heroSlides: HeroSlide[] =
    content.heroSlides && content.heroSlides.length > 0
      ? content.heroSlides
      : STATIC_HERO_SLIDES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Advance slides automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Video playback synchronization
  useEffect(() => {
    heroSlides.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        if (idx === currentIndex) {
          try {
            if (vid.readyState >= 1) {
              vid.currentTime = 0;
            }
          } catch {}
          vid.play().catch(() => {});
        } else if (idx === (currentIndex + 1) % heroSlides.length) {
          vid.play().catch(() => {});
        }
      }
    });
  }, [currentIndex, heroSlides]);

  const currentSlide = heroSlides[currentIndex] || heroSlides[0];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#183D2B]"
    >
      {/* Background Videos with Seamless Cross-fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <video
              key={slide.slideId || slide.id || idx}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={slide.src || `/video/video-${(idx % 4) + 1}.mp4`}
              muted
              playsInline
              loop
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-90 z-10 scale-100 animate-ken-burns" : "opacity-0 z-0 pointer-events-none scale-105"
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
        1. Left: Heading (Compact, bold)
        2. Center: Invisible Anchor / Spacer where the floating Navbar capsule sits
        3. Right: Plan Your Journey action button
        - On Desktop / Tablet (md and up): All 3 on the exact same horizontal line!
        - On Mobile (< md): Two-tier adaptive layout (Heading & CTA on top row, centered Navbar below), with zero horizontal scroll!
        All moving up together smoothly on scroll!
      */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 inset-x-0 z-30 px-3 sm:px-6 md:px-8 lg:px-12 pointer-events-none">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center md:justify-between gap-2.5 sm:gap-3 md:gap-4">
          
          {/* Mobile Top Row / Desktop Left: Heading & Mobile Plan Button */}
          <div className="w-full md:w-auto md:flex-1 flex items-center justify-between md:justify-start pointer-events-auto min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.slideId || currentSlide.id || currentIndex}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1.5 sm:gap-2 h-[38px] sm:h-[44px] md:h-[54px]"
              >
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#8B5E35] shrink-0 animate-pulse-subtle shadow-[0_0_8px_rgba(139,94,53,0.8)]" />
                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-sans font-extrabold tracking-tight text-white leading-none select-none whitespace-nowrap drop-shadow-md">
                  {currentSlide.word}{" "}
                  <span className="italic font-normal font-serif text-[#E9E0D2]">
                    {currentSlide.subWord}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Mobile-only compact Plan CTA button */}
            <Link
              href="/contact"
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#183D2B] text-[10px] font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>Plan</span>
              <ArrowUpRight className="w-3 h-3 text-[#183D2B]" />
            </Link>
          </div>

          {/* Center: Invisible Anchor / Spacer for the floating Navbar capsule */}
          <div
            id="hero-navbar-anchor"
            className="shrink-0 h-[44px] sm:h-[48px] md:h-[54px] w-full max-w-[320px] sm:max-w-[420px] md:w-[460px] lg:w-[540px] pointer-events-none"
          />

          {/* Desktop Right: Primary Plan Your Journey CTA Button - matching height, on same line */}
          <div className="hidden md:flex flex-1 items-center justify-end pointer-events-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 h-[48px] sm:h-[54px] rounded-full bg-white hover:bg-[#8B5E35] text-[#183D2B] hover:text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_8px_25px_rgba(255,255,255,0.22)] hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shrink-0 border border-white/40"
            >
              <span>Plan Your Journey</span>
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
