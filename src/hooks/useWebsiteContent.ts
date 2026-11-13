"use client";

import { useState, useEffect } from "react";
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
} from "@/lib/seedData";

let globalContentCache: any = null;
let fetchPromise: Promise<any> | null = null;
const listeners = new Set<(content: any) => void>();

export function mutateWebsiteContent(newContent: any) {
  globalContentCache = newContent;
  listeners.forEach((listener) => listener(newContent));
}

export function useWebsiteContent() {
  const [content, setContent] = useState(
    globalContentCache || {
      heroSlides: INITIAL_HERO_SLIDES,
      destinations: INITIAL_DESTINATIONS,
      experiences: INITIAL_EXPERIENCES,
      journeys: INITIAL_JOURNEYS,
      reviews: INITIAL_REVIEWS,
      contactInfo: INITIAL_CONTACT_INFO,
      footerContent: INITIAL_FOOTER_CONTENT,
      services: INITIAL_SERVICES,
      journal: INITIAL_JOURNAL,
    }
  );

  useEffect(() => {
    listeners.add(setContent);

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
    } else if (globalContentCache) {
      setContent(globalContentCache);
    }

    return () => {
      listeners.delete(setContent);
    };
  }, []);

  return content;
}

