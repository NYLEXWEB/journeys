"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const HERO_VIDEOS = [
  { id: 1, src: "/video/video-1.mp4", label: "Tea Highlands" },
  { id: 2, src: "/video/video-2.mp4", label: "Emerald Backwaters" },
  { id: 4, src: "/video/video-4.mp4", label: "Tropical Coastlines" },
  { id: 5, src: "/video/video-5.mp4", label: "Living Traditions" },
];

const DISPLAY_DURATION = 4000; // 4 seconds per video

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Timer to advance video every 4 seconds with smooth cross-fade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, DISPLAY_DURATION);

    return () => clearInterval(timer);
  }, []);

  // Ensure active video is playing and pre-warm playback safely
  useEffect(() => {
    HERO_VIDEOS.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        if (idx === currentIndex) {
          try {
            if (vid.readyState >= 1) {
              vid.currentTime = 0;
            }
          } catch { }
          vid.play().catch(() => { });
        } else if (idx === (currentIndex + 1) % HERO_VIDEOS.length) {
          // Warm up next video right before cross-fade
          vid.play().catch(() => { });
        }
      }
    });
  }, [currentIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#183D2B]"
    >
      {/* 5 Seamless Cross-Fading Background Videos */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_VIDEOS.map((video, idx) => {
          const isActive = idx === currentIndex;
          return (
            <video
              key={video.id}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={video.src}
              muted
              playsInline
              loop
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-95 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            />
          );
        })}

        {/* Editorial Gradients & Atmospheric Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#183D2B]/85 via-[#183D2B]/28 to-black/55 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-black/20 pointer-events-none" />
      </div>

      {/* Hero Content - Clean & Cinematic */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FFFCF5] pt-28 pb-20">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[1.08] mb-6 sm:mb-8 text-balance drop-shadow-md">
          Discover Kerala &amp; South India,{" "}
          <span className="italic font-normal text-[#E9E0D2] font-serif">
            Your Way.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl font-light text-[#FFFCF5]/95 leading-relaxed font-sans tracking-wide drop-shadow-sm">
          Thoughtfully curated journeys, authentic experiences, and
          unforgettable discoveries across South India.
        </p>
      </div>

      {/* Gentle Scroll Indicator */}
      <div className="hidden sm:flex absolute bottom-4 right-8 z-30 text-white/70 items-center gap-2 pointer-events-none">
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2]/90">
          Scroll
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#E9E0D2]" />
      </div>
    </section>
  );
}
