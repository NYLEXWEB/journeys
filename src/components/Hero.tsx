"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Compass, Pause, Play } from "lucide-react";

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
    tag: "01 · Highlands",
    location: "Munnar & Western Ghats",
    description:
      "Misty tea estates and tranquil hill trails carved into South India's highest peaks. Privately traversed at your own cadence.",
  },
  {
    id: 2,
    src: "/video/video-2.mp4",
    word: "Sanctuary",
    subWord: "Unhurried.",
    tag: "02 · Waterways",
    location: "Alleppey & Kumarakom",
    description:
      "Slow, sunlit canals and private luxury houseboats where time quietly dissolves into emerald backwater rhythms.",
  },
  {
    id: 4,
    src: "/video/video-4.mp4",
    word: "Coastlines",
    subWord: "Timeless.",
    tag: "03 · Shores",
    location: "Varkala & Arabian Sea",
    description:
      "Red laterite cliffs, golden shores, and the gentle swell of coastal breezes framed by secluded luxury hideaways.",
  },
  {
    id: 5,
    src: "/video/video-5.mp4",
    word: "Traditions",
    subWord: "Living.",
    tag: "04 · Heritage",
    location: "Fort Kochi & Malabar",
    description:
      "Centuries of ritual arts, spice trail architecture, and authentic local encounters far beyond commercial guidebooks.",
  },
];

const SLIDE_DURATION = 5500; // 5.5 seconds per slide for a comfortable reading rhythm

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Advance slides automatically unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#183D2B]"
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

        {/* Editorial Atmospheric Gradients */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#183D2B] via-[#183D2B]/35 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-black/25 pointer-events-none" />
        {/* Subtle radial warmth for depth */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />
      </div>

      {/* Hero Content with Smooth Synchronized Transitions */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FFFCF5] pt-32 pb-28 sm:pt-36 sm:pb-32 flex flex-col items-center justify-center min-h-screen">
        {/* Animated Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-4xl"
          >
            {/* Elegant Micro Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs uppercase tracking-[0.25em] text-[#E9E0D2] mb-6 sm:mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E35] animate-pulse" />
              <span>{currentSlide.location}</span>
            </div>

            {/* Single-Word Punchy Headline with Italic Accent */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight leading-[0.95] mb-5 sm:mb-7 text-[#FFFCF5] drop-shadow-lg select-none">
              {currentSlide.word}
              <span className="italic font-normal text-[#E9E0D2] font-serif ml-3 sm:ml-4">
                {currentSlide.subWord}
              </span>
            </h1>

            {/* 1-2 Line Poetic Description */}
            <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-[#FFFCF5]/90 leading-relaxed font-sans tracking-wide drop-shadow-sm mb-9 sm:mb-11">
              {currentSlide.description}
            </p>

            {/* Action Buttons with Premium Hover Effects */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <Link
                href="#journeys"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-[#FFFCF5] text-[#183D2B] text-xs sm:text-sm font-medium tracking-wider uppercase shadow-xl hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <span>Explore Journeys</span>
                <div className="p-1 rounded-full bg-[#183D2B] text-[#FFFCF5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/25 text-[#FFFCF5] text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-white/50 w-full sm:w-auto"
              >
                <Compass className="w-4 h-4 text-[#E9E0D2]" />
                <span>Craft Bespoke Trip</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Bottom Progress Indicator & Video Switcher */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Slide Navigation Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`group relative text-left py-2 px-3 sm:px-4 rounded-full transition-all duration-300 flex items-center gap-2.5 ${
                    isActive
                      ? "bg-white/15 backdrop-blur-md border border-white/30 text-white"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent"
                  }`}
                  aria-label={`Jump to ${slide.word} slide`}
                >
                  <span className="text-[11px] font-sans uppercase tracking-wider font-medium">
                    {slide.tag}
                  </span>

                  {/* Animated Progress Bar on Active Tab */}
                  {isActive && (
                    <span className="relative w-8 sm:w-12 h-1 bg-white/20 rounded-full overflow-hidden block">
                      <motion.span
                        key={`bar-${currentIndex}`}
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "100%" : "100%" }}
                        transition={{
                          duration: SLIDE_DURATION / 1000,
                          ease: "linear",
                        }}
                        className="absolute inset-y-0 left-0 bg-[#E9E0D2] rounded-full"
                      />
                    </span>
                  )}
                </button>
              );
            })}

            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors backdrop-blur-sm ml-1"
              aria-label={isPaused ? "Play slide progression" : "Pause slide progression"}
              title={isPaused ? "Play slides" : "Pause slides"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Gentle Scroll Indicator */}
          <div className="hidden md:flex items-center gap-2 text-white/70">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#E9E0D2]">
              Scroll to explore
            </span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#E9E0D2]" />
          </div>
        </div>
      </div>
    </section>
  );
}
