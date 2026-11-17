"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

interface CurtainImageRevealProps {
  imageSrc?: string;
  alt?: string;
  heightClass?: string;
  portalZIndex?: number;
}

export default function CurtainImageReveal({
  imageSrc = "/images/generated/hero-kerala.webp",
  alt = "Curated Kerala Landscape",
  heightClass = "h-[75vh] sm:h-[85vh] lg:h-[95vh]",
  portalZIndex = 6,
}: CurtainImageRevealProps) {
  const content = useWebsiteContent();
  const effectiveImageSrc = content?.about?.curtainImage || imageSrc;

  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Butter-smooth, zero-lag visibility tracking using native IntersectionObserver.
  // 100% compositor thread execution: eliminates synchronous scroll listeners,
  // getBoundingClientRect() calls, and mobile layout thrashing completely.
  useEffect(() => {
    if (!spacerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        // 30% margin top and bottom so image is rendered and ready BEFORE the spacer enters view
        rootMargin: "30% 0px 30% 0px",
        threshold: 0,
      }
    );

    observer.observe(spacerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  const fixedImagePortal =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 w-full h-[100dvh] pointer-events-none overflow-hidden transition-opacity duration-300 ease-out ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"
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
              src={effectiveImageSrc}
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

      {/* Transparent Scroll Window / Spacer that uncovers the fixed background image */}
      <div
        ref={spacerRef}
        className={`relative w-full ${heightClass} pointer-events-none`}
        aria-hidden="true"
      />
    </>
  );
}
