"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRealtimeAssetLoader } from "@/hooks/useRealtimeAssetLoader";

export default function AssetPreloader() {
  const { progress: realProgress, isLoading } = useRealtimeAssetLoader();

  // Initialize consistently between SSR and client initial hydration (no mismatch)
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const animFrameRef = useRef<number | null>(null);

  // Freeze background scrolling while preloading
  useEffect(() => {
    if (hasFinished) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [hasFinished]);

  // Smooth progress interpolator: ensures continuous progression
  // tracking real network assets while guaranteeing a polished luxury feel
  useEffect(() => {
    if (hasFinished) return;

    let currentVal = 0;
    const startTime = performance.now();
    // Minimum 1.3s smooth glide so the animation is graceful and visible
    const minGlideDuration = 1300;

    const updateInterval = () => {
      const elapsed = performance.now() - startTime;
      const timeRatio = Math.min(1, elapsed / minGlideDuration);

      // Target from both time pacing and actual real network asset loader
      const networkTarget = Math.round(realProgress * 100);
      const timeTarget = Math.round(timeRatio * 100);

      // Combined target: tracks network progress while keeping smooth animation
      const combinedTarget = Math.max(timeTarget, networkTarget);

      if (currentVal < combinedTarget) {
        const step = Math.max(0.7, (combinedTarget - currentVal) * 0.12);
        currentVal = Math.min(100, currentVal + step);
        setDisplayProgress(currentVal);
      }

      if (currentVal < 100 || isLoading) {
        animFrameRef.current = requestAnimationFrame(updateInterval);
      } else {
        // Reached 100% and all network assets are complete
        setDisplayProgress(100);
        // Brief pause at 100% so the user sees the completed state
        setTimeout(() => {
          setShouldFadeOut(true);
          setTimeout(() => {
            setHasFinished(true);
          }, 700);
        }, 350);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateInterval);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [realProgress, isLoading, hasFinished]);

  if (hasFinished) {
    return null;
  }

  const pctInt = Math.min(100, Math.max(0, Math.round(displayProgress)));

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none bg-[#FFFCF5] px-6 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shouldFadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ width: "100vw", height: "100vh" }}
      aria-live="polite"
      aria-busy={!shouldFadeOut}
    >
      {/* Soft Luxury Warm Radial Ambient Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(233,224,210,0.4)_0%,transparent_75%)]" />

      {/* Center Stage: Minimalist Logo + Progress Bar */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full">
        {/* Official Brand Logo */}
        <div className="relative w-56 sm:w-64 h-20 sm:h-22 mb-7 sm:mb-9 flex items-center justify-center">
          <Image
            src="/images/logo.webp"
            alt="Journeys by Jibu Thomas"
            width={256}
            height={88}
            priority
            sizes="(max-width: 768px) 220px, 260px"
            className="w-auto h-16 sm:h-20 object-contain drop-shadow-sm"
          />
        </div>

        {/* Clearly Visible Minimalist Progress Bar */}
        <div className="w-full flex flex-col items-center">
          {/* Progress Track */}
          <div className="w-full h-2 sm:h-2.5 bg-[#E9E0D2] rounded-full p-[2px] border border-[#D8C7B5] shadow-inner overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5E35] via-[#183D2B] to-[#8B5E35] relative overflow-hidden transition-all duration-150 ease-out shadow-[0_0_10px_rgba(24,61,43,0.3)]"
              style={{ width: `${pctInt}%` }}
            >
              {/* Subtle Shimmer Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
            </div>
          </div>

          {/* Percentage & Status Label */}
          <div className="flex items-center justify-between w-full mt-3 px-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B5E35] font-sans font-medium">
              {pctInt < 100 ? "Loading Experiences" : "Welcome to Journeys"}
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold text-[#183D2B] tabular-nums tracking-wider">
              {pctInt}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
