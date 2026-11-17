"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

interface CurtainVideoRevealProps {
  slot?: 1 | 2;
  videoSrc?: string;
  heightClass?: string;
  portalZIndex?: number;
}

export default function CurtainVideoReveal({
  slot,
  videoSrc = "/video/video-1.webm",
  heightClass = "h-[75vh] sm:h-[85vh] lg:h-[95vh]",
  portalZIndex = 5,
}: CurtainVideoRevealProps) {
  const content = useWebsiteContent();
  const effectiveVideoSrc =
    slot === 1
      ? content?.about?.curtainVideo1 || videoSrc
      : slot === 2
      ? content?.about?.curtainVideo2 || videoSrc
      : videoSrc;

  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        const isVisible = entry.isIntersecting;
        setIsActive(isVisible);

        if (videoRef.current) {
          if (isVisible) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      {
        // 30% margin top and bottom so video is ready and playing BEFORE the spacer enters view
        rootMargin: "30% 0px 30% 0px",
        threshold: 0,
      }
    );

    observer.observe(spacerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  const fixedVideoPortal =
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
            <video
              ref={videoRef}
              src={effectiveVideoSrc}
              poster={slot === 1 ? "/video/video-1-poster.webp" : slot === 2 ? "/video/video-4-poster.webp" : undefined}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover select-none"
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
      {fixedVideoPortal}

      {/* Transparent Scroll Window / Spacer that uncovers the fixed background video */}
      <div
        ref={spacerRef}
        className={`relative w-full ${heightClass} pointer-events-none`}
        aria-hidden="true"
      />
    </>
  );
}
