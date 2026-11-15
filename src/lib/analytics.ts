/**
 * Journeys by Jibu Thomas - Analytics & Conversion Tracking Utility
 *
 * Supports Google Analytics 4 (GA4), Google Tag Manager (GTM),
 * and custom bespoke travel conversion events.
 * Safe for server-side rendering (SSR) and respects privacy settings.
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
  [key: string]: any;
}

/**
 * Universal safe event dispatcher
 */
export function trackEvent(eventName: string, params: AnalyticsEventParams = {}): void {
  if (typeof window === "undefined") return;

  const eventPayload = {
    ...params,
    timestamp: new Date().toISOString(),
  };

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);
  }

  // Google Tag Manager dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
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
    event_label: "Plan Your Journey Submission",
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
  });
}

