"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRealtimeAssetLoader } from "@/hooks/useRealtimeAssetLoader";

export default function AssetPreloader() {
  const { progress, isLoading, isComplete } = useRealtimeAssetLoader();

  // Freeze background scrolling completely while preloading assets
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [isLoading]);

  // Completely unmount once fade-out completes
  if (isComplete) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="realtime-asset-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ width: "100vw", height: "100vh" }}
          aria-live="polite"
          aria-busy={isLoading}
        >
          {/* =========================================================================
              RESPONSIVE TRAVEL-THEMED BACKGROUND IMAGE
              Desktop: Fullscreen 100vw x 100vh landscape cover, center-aligned
              Mobile: Portrait-optimized framing, tailored position
              ========================================================================= */}
          <div className="absolute inset-0 z-0 preloader-bg-responsive transition-all duration-700" />

          {/* Luxury Atmospheric Gradient Overlay (Forest Green & Warm Sand Sheen) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#183D2B]/80 via-[#183D2B]/65 to-[#183D2B]/85 backdrop-blur-[2px]" />

          {/* Delicate Warm Radial Glow behind the content */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(233,224,210,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* =========================================================================
              CENTERED MINIMALISTIC LOADER CONTENT
              - NO LOGO (completely removed)
              - NO PERCENTAGE NUMBERS (no 72%, 80%, 100%)
              - "Preparing Your Journey..." Text
              - Minimalist sleek animated progress bar
              ========================================================================= */}
          <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-md w-full">
            {/* Elegant Luxury Editorial Loading Text */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#FFFCF5] font-light tracking-[0.06em] leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            >
              Preparing Your Journey...
            </motion.h2>

            {/* Minimalist Real-Time Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-56 sm:w-64 lg:w-72 mt-8 sm:mt-10"
            >
              {/* Progress Track */}
              <div className="relative w-full h-[2.5px] bg-[#FFFCF5]/20 rounded-full overflow-hidden shadow-inner">
                {/* Active Progress Bar (Driven strictly by actual asset load events) */}
                <div
                  className="h-full bg-gradient-to-r from-[#E9E0D2] via-[#FFFCF5] to-[#E9E0D2] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,252,245,0.7)]"
                  style={{
                    width: `${Math.max(4, Math.round(progress * 100))}%`,
                  }}
                />

                {/* Subtle Luxury Shimmer Traveling Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
