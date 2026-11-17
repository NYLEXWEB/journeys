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

/**
 * Directly queries MongoDB on the server with connection caching.
 * Returns fully serialized plain JSON content so Server Components
 * can immediately render live UploadThing cloud assets without any
 * client-side fetching delay or image flickering.
 */
export async function getLiveWebsiteContent(): Promise<WebsiteContentData> {
  try {
    const db = await connectToDatabase();

    if (!db) {
      return FALLBACK_CONTENT;
    }

    // Auto-seed if database is fresh
    await seedInitialDataIfEmpty().catch((err) => {
      console.warn("Auto-seed check failed:", err.message);
    });

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

    // Serialize all ObjectIds and Dates to plain JSON primitives
    return JSON.parse(JSON.stringify(result));
  } catch (err: any) {
    console.error("[getLiveWebsiteContent] Failed to fetch content:", err.message);
    return FALLBACK_CONTENT;
  }
}
