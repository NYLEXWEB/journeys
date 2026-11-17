"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";

/**
 * Ultra-lightweight luxury navigation progress indicator.
 * Provides immediate (<30ms) feedback when navigating between routes,
 * ensuring the user never feels like they are waiting in limbo.
 */
function NavigationProgressBarInner() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Complete progress whenever the pathname changes
  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setNavigating(false);
      setProgress(0);
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Listen to link clicks globally for immediate feedback
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, downloads, new tabs, and hash-only links on current page
      if (
        href.startsWith("http") &&
        !href.startsWith(window.location.origin)
      ) {
        return;
      }
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }
      if (href.startsWith("#")) {
        return;
      }

      // Check if it's the exact same pathname and hash
      try {
        const url = new URL(href, window.location.href);
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash
        ) {
          return;
        }
      } catch {
        return;
      }

      // Start the progress indicator immediately
      setNavigating(true);
      setProgress(25);

      const t1 = setTimeout(() => setProgress(65), 120);
      const t2 = setTimeout(() => setProgress(85), 350);

      const tFail = setTimeout(() => {
        setNavigating(false);
        setProgress(0);
      }, 4000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(tFail);
      };
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, []);

  if (!navigating && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none h-[2.5px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#183D2B] transition-all duration-200 ease-out shadow-[0_0_8px_rgba(139,94,53,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? "width 150ms ease-out, opacity 200ms ease-out" : "width 200ms ease-out",
        }}
      />
    </div>
  );
}

export default function NavigationProgressBar() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressBarInner />
    </Suspense>
  );
}
