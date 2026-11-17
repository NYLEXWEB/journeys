import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { seedInitialDataIfEmpty } from "@/lib/seedDatabase";
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
import { HeroSlideModel } from "@/models/HeroSlide";
import { DestinationModel } from "@/models/Destination";
import { ExperienceModel } from "@/models/Experience";
import { JourneyModel } from "@/models/Journey";
import { ReviewModel } from "@/models/Review";
import { ContactInfoModel } from "@/models/ContactInfo";
import { FooterContentModel } from "@/models/FooterContent";
import { ServiceModel } from "@/models/Service";
import { JournalModel } from "@/models/Journal";
import { AboutModel } from "@/models/About";
import { FAQModel } from "@/models/FAQ";

export interface WebsiteContentData {
  isLiveDb: boolean;
  heroSlides: any[];
  destinations: any[];
  experiences: any[];
  journeys: any[];
  reviews: any[];
  contactInfo: any;
  footerContent: any;
  services: any[];
  journal: any[];
  about: any;
  faqs: any[];
}

export const FALLBACK_CONTENT: WebsiteContentData = {
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

// In-memory server-side cache
let cachedContent: WebsiteContentData | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 300000; // 5 minutes cache (instantly invalidated whenever Admin updates content)

export function invalidateContentCache() {
  cachedContent = null;
  lastFetchTime = 0;
  try {
    revalidatePath("/", "layout");
  } catch {
    // Graceful fallback outside request scope
  }
}

/**
 * Directly queries MongoDB on the server with connection caching & smart TTL.
 * Delivers sub-millisecond responses on repeated visits and eliminates
 * client-side fetching delay or image flickering completely.
 */
export async function getLiveWebsiteContent(): Promise<WebsiteContentData> {
  const now = Date.now();
  if (cachedContent && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedContent;
  }

  try {
    const db = await connectToDatabase();

    if (!db) {
      if (!cachedContent) {
        cachedContent = FALLBACK_CONTENT;
        lastFetchTime = now;
      }
      return cachedContent || FALLBACK_CONTENT;
    }

    // Fast check once per runtime
    await seedInitialDataIfEmpty().catch(() => {});

    const [
      heroSlides,
      destinations,
      experiences,
      journeys,
      reviews,
      contactInfoDoc,
      footerContentDoc,
      services,
      journal,
      aboutDoc,
      faqs,
    ] = await Promise.all([
      HeroSlideModel.find().sort({ order: 1, slideId: 1 }).lean(),
      DestinationModel.find().sort({ order: 1 }).lean(),
      ExperienceModel.find().sort({ order: 1 }).lean(),
      JourneyModel.find().sort({ order: 1 }).lean(),
      ReviewModel.find().sort({ order: 1 }).lean(),
      ContactInfoModel.findOne().lean(),
      FooterContentModel.findOne().lean(),
      ServiceModel.find().sort({ order: 1 }).lean(),
      JournalModel.find().sort({ order: 1 }).lean(),
      AboutModel.findOne().lean(),
      FAQModel.find().sort({ order: 1 }).lean(),
    ]);

    const result: WebsiteContentData = {
      isLiveDb: true,
      heroSlides: heroSlides.length ? heroSlides : INITIAL_HERO_SLIDES,
      destinations: destinations.length ? destinations : INITIAL_DESTINATIONS,
      experiences: experiences.length ? experiences : INITIAL_EXPERIENCES,
      journeys: journeys.length ? journeys : INITIAL_JOURNEYS,
      reviews: reviews.length ? reviews : INITIAL_REVIEWS,
      contactInfo: contactInfoDoc || INITIAL_CONTACT_INFO,
      footerContent: footerContentDoc || INITIAL_FOOTER_CONTENT,
      services: services.length ? services : INITIAL_SERVICES,
      journal: journal.length ? journal : INITIAL_JOURNAL,
      about: aboutDoc || INITIAL_ABOUT,
      faqs: faqs.length ? faqs : INITIAL_FAQS,
    };

    const serialized = JSON.parse(JSON.stringify(result));
    cachedContent = serialized;
    lastFetchTime = now;

    return serialized;
  } catch (err: any) {
    console.error("[getLiveWebsiteContent] Error:", err.message);
    if (!cachedContent) {
      cachedContent = FALLBACK_CONTENT;
      lastFetchTime = now;
    }
    return cachedContent || FALLBACK_CONTENT;
  }
}
