"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_HERO_SLIDES,
  INITIAL_DESTINATIONS,
  INITIAL_EXPERIENCES,
  INITIAL_JOURNEYS,
  INITIAL_REVIEWS,
  INITIAL_CONTACT_INFO,
  INITIAL_FOOTER_CONTENT,
  INITIAL_SERVICES,
  INITIAL_JOURNAL,
  INITIAL_ABOUT,
  INITIAL_FAQS,
} from "@/lib/seedData";

export const DEFAULT_FALLBACK_CONTENT = {
  isLiveDb: false,
  heroSlides: INITIAL_HERO_SLIDES,
  destinations: INITIAL_DESTINATIONS,
  experiences: INITIAL_EXPERIENCES,
  journeys: INITIAL_JOURNEYS,
  reviews: INITIAL_REVIEWS,
  contactInfo: INITIAL_CONTACT_INFO,
  footerContent: INITIAL_FOOTER_CONTENT,
  services: INITIAL_SERVICES,
  journal: INITIAL_JOURNAL,
  about: INITIAL_ABOUT,
  faqs: INITIAL_FAQS,
};

let globalContentCache: any = null;
let fetchPromise: Promise<any> | null = null;
const listeners = new Set<(content: any) => void>();

export function mutateWebsiteContent(newContent: any) {
  globalContentCache = newContent;
  listeners.forEach((listener) => listener(newContent));
}

const WebsiteContentContext = createContext<any>(null);

export function WebsiteContentProvider({
  initialContent,
  children,
}: {
  initialContent?: any;
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<any>(() => {
    if (initialContent) {
      globalContentCache = initialContent;
      return initialContent;
    }
    return globalContentCache || DEFAULT_FALLBACK_CONTENT;
  });

  useEffect(() => {
    if (initialContent) {
      globalContentCache = initialContent;
      setContent(initialContent);
    }
  }, [initialContent]);

  useEffect(() => {
    listeners.add(setContent);
    return () => {
      listeners.delete(setContent);
    };
  }, []);

  return (
    <WebsiteContentContext.Provider value={content}>
      {children}
    </WebsiteContentContext.Provider>
  );
}

export function useWebsiteContent() {
  const contextValue = useContext(WebsiteContentContext);

  const [content, setContent] = useState(
    contextValue || globalContentCache || DEFAULT_FALLBACK_CONTENT
  );

  useEffect(() => {
    listeners.add(setContent);

    // If not wrapped in WebsiteContentProvider and globalContentCache is not populated yet
    if (!contextValue && !globalContentCache) {
      if (!fetchPromise) {
        fetchPromise = fetch("/api/content/all")
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data) {
              globalContentCache = data;
              mutateWebsiteContent(data);
            }
            return data;
          })
          .catch(() => null);
      }
    }

    return () => {
      listeners.delete(setContent);
    };
  }, [contextValue]);

  return contextValue || content;
}
