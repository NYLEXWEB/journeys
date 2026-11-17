/**
 * Journeys by Jibu Thomas - Analytics & Conversion Tracking Utility
 *
 * Supports Self-Contained Serverless Analytics (MongoDB),
 * Google Analytics 4 (GA4), and Bespoke Travel Conversion Events.
 * Safe for server-side rendering (SSR) and zero external API dependencies.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type EventCategory =
  | "engagement"
  | "conversion"
  | "lead"
  | "navigation"
  | "itinerary";

export interface AnalyticsEventParams {
  category?: EventCategory;
  label?: string;
  value?: number;
  elementText?: string;
  elementLocation?: string;
  source?: string;
  ctaText?: string;
  destinationUrl?: string;
  location?: string;
  [key: string]: any;
}

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "server-visitor";
  try {
    let id = localStorage.getItem("jibu_visitor_id");
    if (!id) {
      id = "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
      localStorage.setItem("jibu_visitor_id", id);
    }
    return id;
  } catch {
    return "guest_" + Math.random().toString(36).slice(2, 8);
  }
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  try {
    let id = sessionStorage.getItem("jibu_session_id");
    if (!id) {
      id = "s_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
      sessionStorage.setItem("jibu_session_id", id);
    }
    return id;
  } catch {
    return "sess_" + Math.random().toString(36).slice(2, 8);
  }
}

/**
 * Universal safe event dispatcher - sends to self-contained analytics API
 * and optionally Google Analytics / GTM if present.
 */
export function trackEvent(eventName: string, params: AnalyticsEventParams = {}): void {
  if (typeof window === "undefined") return;

  const eventPayload = {
    ...params,
    timestamp: new Date().toISOString(),
  };

  // 1. Google Analytics 4 (optional fallback)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);
  }

  // 2. Google Tag Manager dataLayer (optional fallback)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
  }

  // 3. Self-Contained Native Analytics API (Zero API setup required)
  try {
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    let type: "pageview" | "click" | "lead" | "conversion" = "click";

    if (eventName === "page_view") {
      type = "pageview";
    } else if (eventName === "generate_lead" || params.category === "lead") {
      type = "lead";
    } else if (
      eventName === "whatsapp_click" ||
      eventName === "phone_call_click" ||
      params.category === "conversion"
    ) {
      type = "conversion";
    }

    const elementText =
      params.elementText ||
      params.ctaText ||
      params.label ||
      (eventName === "whatsapp_click"
        ? `WhatsApp Concierge (${params.source || "Direct"})`
        : eventName === "phone_call_click"
        ? `Phone Call (${params.phoneNumber || params.source || ""})`
        : eventName);

    const payload = {
      type,
      eventName,
      visitorId,
      sessionId,
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer || "Direct",
      elementText: String(elementText).trim().slice(0, 200),
      elementLocation: params.location || params.source || "",
      category: params.category || "engagement",
      screen: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    };

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/track", blob);
    } else {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (e) {
    // Silent fail so user flow is 100% uninterrupted
  }

  // Development logger
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Track]: ${eventName}`, eventPayload);
  }
}

/**
 * High-value conversion event: WhatsApp Concierge click
 */
export function trackWhatsAppClick(source: string, prefillMessage?: string): void {
  trackEvent("whatsapp_click", {
    category: "conversion",
    source,
    elementText: `WhatsApp Concierge (${source})`,
    prefillMessage: prefillMessage?.slice(0, 50),
  });
}

/**
 * High-value conversion event: Telephone call click
 */
export function trackPhoneCallClick(phoneNumber: string, source: string): void {
  trackEvent("phone_call_click", {
    category: "conversion",
    phoneNumber,
    source,
    elementText: `Call Phone: ${phoneNumber}`,
  });
}

/**
 * Primary conversion event: Plan Your Journey Form Submission
 */
export function trackEnquirySubmitted(params: {
  fullName: string;
  travelDates?: string;
  preferredPace?: string;
  guestsCount?: string;
}): void {
  trackEvent("generate_lead", {
    category: "lead",
    elementText: "Plan Your Journey Submission",
    ...params,
  });
}

/**
 * Form interaction start event
 */
export function trackFormStart(formName: string): void {
  trackEvent("form_start", {
    category: "engagement",
    formName,
    elementText: `Started Form: ${formName}`,
  });
}

/**
 * Navigation / CTA click event
 */
export function trackCTAClick(ctaText: string, destinationUrl: string, location: string): void {
  trackEvent("cta_click", {
    category: "navigation",
    ctaText,
    destinationUrl,
    location,
    elementText: ctaText,
  });
}

/**
 * Destination viewed event
 */
export function trackDestinationView(destinationId: string, title: string): void {
  trackEvent("view_item", {
    category: "engagement",
    item_id: destinationId,
    item_name: title,
    item_category: "Destination",
    elementText: `Viewed Destination: ${title}`,
  });
}

/**
 * Journey / Itinerary viewed event
 */
export function trackJourneyView(journeyId: string, title: string): void {
  trackEvent("view_item", {
    category: "itinerary",
    item_id: journeyId,
    item_name: title,
    item_category: "Bespoke Journey",
    elementText: `Viewed Journey: ${title}`,
  });
}
