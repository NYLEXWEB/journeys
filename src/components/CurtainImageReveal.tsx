"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CurtainImageRevealProps {
  imageSrc?: string;
  alt?: string;
  heightClass?: string;
  tag?: string;
  quote?: string;
  subQuote?: string;
  portalZIndex?: number;
}

export default function CurtainImageReveal({
  imageSrc = "/images/generated/hero-kerala.jpg",
  alt = "Curated Kerala Landscape",
  heightClass = "h-[100vh] sm:h-[100vh] lg:h-[100vh]",
  tag = "Curated Perspective",
  quote = "“Travel is the art of seeing what others only glance at.”",
  subQuote,
  portalZIndex = 6,
}: CurtainImageRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!spacerRef.current) return;
      const rect = spacerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      // 1. Only activate once scrolled past Hero
      const isPastHero = scrollY > windowHeight * 0.6;

      // 2. Activate as user approaches spacer
      const isApproaching = rect.top <= windowHeight * 1.5;

      // 3. Deactivate once following section has fully scrolled over the spacer
      const isCovered = rect.bottom < -100;

      const active = isPastHero && isApproaching && !isCovered;
      setIsActive(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [mounted]);

  const fixedImagePortal =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 w-full h-[100dvh] pointer-events-none transition-opacity duration-700 ease-out overflow-hidden ${
              isActive ? "opacity-100" : "opacity-0 -z-50"
            }`}
            style={{
              zIndex: isActive ? portalZIndex : -50,
              transform: "translateZ(0)",
              willChange: "opacity",
            }}
            aria-hidden="true"
          >
            {/* Background Image with Fixed Fullscreen Cover */}
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover select-none"
              loading="eager"
            />
            {/* Subtle luxury editorial gradient overlay matching brand identity */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#183D2B]/20 via-transparent to-[#183D2B]/35 pointer-events-none" />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {fixedImagePortal}

      {/* Transparent Scroll Window / Spacer that uncovers the fixed image */}
      <div
        ref={spacerRef}
        className={`relative w-full ${heightClass} pointer-events-none flex items-center justify-center`}
      >
        {/* Subtle, luxury center brand tag */}
        <div className="text-center px-4 max-w-xl transition-all duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] uppercase tracking-[0.25em] font-medium shadow-lg mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{tag}</span>
          </div>
          <p className="text-white/95 text-lg sm:text-2xl md:text-3xl font-serif font-light italic drop-shadow-md">
            {quote}
          </p>
          {subQuote && (
            <p className="text-white/80 text-xs sm:text-sm tracking-[0.2em] uppercase mt-2 font-sans font-light drop-shadow-sm">
              {subQuote}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
