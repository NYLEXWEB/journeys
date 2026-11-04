"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add lenis classes to html element for 100% smooth momentum scroll
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Smooth scroll on anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.hash && target.hash.startsWith("#") && target.origin === window.location.origin) {
        const elem = document.querySelector(target.hash);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem, { offset: -20, duration: 1.5 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Handle BFCache (Back-Forward Cache) restoration smoothly
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        lenis.start();
        lenis.resize();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("pageshow", handlePageShow);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

