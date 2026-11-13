"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CurtainVideoRevealProps {
  videoSrc?: string;
  heightClass?: string;
}

export default function CurtainVideoReveal({
  videoSrc = "/video/video-1.mp4",
  heightClass = "h-[85vh] sm:h-[90vh] lg:h-[100vh]",
}: CurtainVideoRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

      // 2. Activate as user approaches bottom of AboutUs (spacer approaches viewport)
      const isApproaching = rect.top <= windowHeight * 1.5;

      // 3. Deactivate once Destinations has fully scrolled over the spacer
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
  }, [mounted]);

  // Ensure autoplay on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      if (isActive) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isActive]);

  const fixedVideoPortal =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 w-full h-[100dvh] pointer-events-none transition-opacity duration-700 ease-out overflow-hidden ${
              isActive ? "opacity-100 z-[5]" : "opacity-0 -z-50"
            }`}
            style={{
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
        className={`relative w-full ${heightClass} pointer-events-none flex items-center justify-center`}
      >
        {/* Subtle, luxury center brand tag */}
        <div className="text-center px-4 max-w-xl transition-all duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] uppercase tracking-[0.25em] font-medium shadow-lg mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Cinematic Pause</span>
          </div>
          <p className="text-white/95 text-lg sm:text-2xl md:text-3xl font-serif font-light italic drop-shadow-md">
            &ldquo;Where the mist-clad hills meet tranquil waters.&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}

