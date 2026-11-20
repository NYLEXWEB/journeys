"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect mobile touch devices (phones, tablets, touchscreens)
    // Mobile browsers (iOS Safari, Android Chrome) have native 120Hz/60Hz hardware-accelerated
    // momentum scrolling on the GPU compositor thread. Hijacking touch with Lenis causes input lag,
    // rubber-band glitches, and severe frame drops. We allow clean native touch on mobile,
    // while running silky Lenis momentum scrolling exclusively for desktop mouse wheels.
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 1024);

    if (isTouchDevice) {
      // Native touch scroll: zero input lag, 120fps native performance
      return;
    }

    // Add lenis classes to html element for desktop
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Never hijack touch gestures
      infinite: false,
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Smooth scroll on anchor link clicks (only when on the same page)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (
        target &&
        target.hash &&
        target.hash.startsWith("#") &&
        target.origin === window.location.origin &&
        (target.pathname === window.location.pathname || target.pathname === "")
      ) {
        const elem = document.querySelector(target.hash);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, { offset: -20, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // If page arrived with a hash (e.g. from another page linking to /#destinations), scroll to it smoothly
    if (window.location.hash) {
      setTimeout(() => {
        try {
          const initialTarget = document.querySelector(window.location.hash);
          if (initialTarget) {
            lenis.scrollTo(initialTarget as HTMLElement, { offset: -20, duration: 1.0 });
          }
        } catch {}
      }, 300);
    }

    // Handle BFCache (Back-Forward Cache) restoration smoothly
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        lenis.start();
        lenis.resize();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    // Stop Lenis when modal is open, resume when closed
    const observer = new MutationObserver(() => {
      const isLocked =
        document.body.classList.contains("modal-open") ||
        document.body.style.overflow === "hidden" ||
        document.documentElement.classList.contains("modal-open");
      if (isLocked) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class", "style"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("pageshow", handlePageShow);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
