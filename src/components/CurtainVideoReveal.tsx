"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CurtainVideoRevealProps {
  videoSrc?: string;
  heightClass?: string;
  tag?: string;
  quote?: string;
  subQuote?: string;
  portalZIndex?: number;
  isFullCover?: boolean;
}

export default function CurtainVideoReveal({
  videoSrc = "/video/video-1.mp4",
  heightClass,
  tag = "Cinematic Pause",
  quote = "“Where the mist-clad hills meet tranquil waters.”",
  subQuote,
  portalZIndex = 5,
  isFullCover = false,
}: CurtainVideoRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // For isFullCover = true: Use IntersectionObserver to play/pause video cleanly
  useEffect(() => {
    if (!isFullCover || !videoRef.current) return;
    const videoEl = videoRef.current;
    videoEl.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (spacerRef.current) {
      observer.observe(spacerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isFullCover, mounted]);

  // For isFullCover = false: Use scroll handler for fixed background curtain portal
  useEffect(() => {
    if (isFullCover) return;

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

      if (videoRef.current) {
        if (active) {
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (!videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isFullCover, mounted]);

  // Ensure autoplay on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      if (isFullCover || isActive) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isActive, isFullCover]);

  // ---------------------------------------------------------------------------
  // 1. SINGLE SCREEN COVER MODE (Full Viewport Screen Cover)
  // ---------------------------------------------------------------------------
  if (isFullCover) {
    const finalHeight = heightClass || "h-[100dvh]";
    return (
      <div
        ref={spacerRef}
        className={`relative w-full ${finalHeight} min-h-[600px] overflow-hidden flex items-center justify-center bg-[#0d1f16]`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle luxury editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#183D2B]/40 via-black/20 to-[#183D2B]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Centered luxury editorial tag and quote */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] uppercase tracking-[0.25em] font-medium shadow-lg mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{tag}</span>
          </div>
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light italic drop-shadow-[0_2px_15px_rgba(0,0,0,0.65)] leading-tight sm:leading-snug">
            {quote}
          </p>
          {subQuote && (
            <p className="text-white/85 text-xs sm:text-sm tracking-[0.25em] uppercase mt-3 font-sans font-light drop-shadow">
              {subQuote}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. FIXED BACKGROUND CURTAIN REVEAL MODE (Transparent Scroll Window)
  // ---------------------------------------------------------------------------
  const fallbackHeight = heightClass || "h-[100vh] sm:h-[100vh] lg:h-[100vh]";
  const fixedVideoPortal =
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
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
            {/* Subtle luxury editorial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#183D2B]/15 via-transparent to-[#183D2B]/25 pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {fixedVideoPortal}

      {/* Transparent Scroll Window / Spacer that uncovers the fixed video */}
      <div
        ref={spacerRef}
        className={`relative w-full ${fallbackHeight} pointer-events-none flex items-center justify-center`}
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
