"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  trackEvent,
  trackWhatsAppClick,
  trackPhoneCallClick,
} from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPathnameRef = useRef<string | null>(null);
  const pageStartTimeRef = useRef<number>(Date.now());

  // 1. Automatic Page View Tracking on navigation
  useEffect(() => {
    // Exclude admin pages from public visitor analytics
    if (pathname && pathname.startsWith("/admin")) {
      return;
    }

    const now = Date.now();
    // Record duration of previous page if applicable
    if (lastPathnameRef.current && lastPathnameRef.current !== pathname) {
      const durationSeconds = Math.round((now - pageStartTimeRef.current) / 1000);
      if (durationSeconds > 1 && durationSeconds < 3600) {
        trackEvent("page_duration", {
          category: "engagement",
          duration: durationSeconds,
          elementText: `Spent ${durationSeconds}s on ${lastPathnameRef.current}`,
        });
      }
    }

    lastPathnameRef.current = pathname;
    pageStartTimeRef.current = now;

    // Small delay to ensure document.title is updated
    const timer = setTimeout(() => {
      trackEvent("page_view", {
        category: "navigation",
        elementText: document.title || pathname,
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  // 2. Universal Click & Conversion Tracking
  useEffect(() => {
    let lastClickTime = 0;
    let lastClickText = "";

    const handleGlobalClick = (e: MouseEvent) => {
      // Don't track admin actions
      if (window.location.pathname.startsWith("/admin")) return;

      const target = (e.target as HTMLElement)?.closest(
        "button, a, [role='button'], [data-track]"
      ) as HTMLElement | null;

      if (!target) return;

      const href = (target as HTMLAnchorElement).href || "";
      const rawText = (
        target.getAttribute("data-track") ||
        target.getAttribute("aria-label") ||
        target.innerText ||
        target.getAttribute("title") ||
        ""
      ).trim();

      // Clean button text
      const cleanText = rawText.replace(/\s+/g, " ").slice(0, 80);

      // Prevent duplicate rapid click events on same element (within 500ms)
      const now = Date.now();
      if (now - lastClickTime < 500 && lastClickText === cleanText) {
        return;
      }
      lastClickTime = now;
      lastClickText = cleanText;

      // Check WhatsApp Concierge Click
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        const source = target.getAttribute("data-source") || cleanText || "Link";
        trackWhatsAppClick(source);
        return;
      }

      // Check Telephone Call Click
      if (href.startsWith("tel:")) {
        const phone = href.replace("tel:", "");
        trackPhoneCallClick(phone, cleanText || "Direct Call");
        return;
      }

      // Track high-value Button or CTA Click
      if (cleanText && cleanText.length > 1) {
        trackEvent("button_click", {
          category: "engagement",
          elementText: cleanText,
          elementLocation: target.tagName.toLowerCase(),
          destinationUrl: href ? href.replace(window.location.origin, "") : undefined,
        });
      }
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}
