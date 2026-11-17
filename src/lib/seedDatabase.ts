import { HeroSlideModel } from "@/models/HeroSlide";
import { DestinationModel } from "@/models/Destination";
import { ExperienceModel } from "@/models/Experience";
import { JourneyModel } from "@/models/Journey";
import { ReviewModel } from "@/models/Review";
import { ContactInfoModel } from "@/models/ContactInfo";
import { FooterContentModel } from "@/models/FooterContent";
import { ServiceModel } from "@/models/Service";
import { JournalModel } from "@/models/Journal";
import { FAQModel } from "@/models/FAQ";
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
  INITIAL_FAQS,
} from "./seedData";

let hasCheckedSeed = false;

/**
 * Automatically seeds the database if collections are currently empty.
 * Runs only once per server runtime lifecycle to eliminate network round-trip overhead.
 */
export async function seedInitialDataIfEmpty(): Promise<void> {
  if (hasCheckedSeed) return;

  try {
    // Fast check on main collection to avoid 10 separate round-trips
    const destCount = await DestinationModel.estimatedDocumentCount();
    if (destCount > 0) {
      hasCheckedSeed = true;
      return;
    }

    // If completely empty, seed in parallel
    await Promise.all([
      DestinationModel.insertMany(INITIAL_DESTINATIONS),
      HeroSlideModel.insertMany(INITIAL_HERO_SLIDES),
      ExperienceModel.insertMany(INITIAL_EXPERIENCES),
      JourneyModel.insertMany(INITIAL_JOURNEYS),
      ReviewModel.insertMany(INITIAL_REVIEWS),
      ContactInfoModel.create(INITIAL_CONTACT_INFO),
      FooterContentModel.create(INITIAL_FOOTER_CONTENT),
      ServiceModel.insertMany(INITIAL_SERVICES),
      JournalModel.insertMany(INITIAL_JOURNAL),
      FAQModel.insertMany(INITIAL_FAQS),
    ]);

    hasCheckedSeed = true;
    console.log("[Seed] Initial collections seeded successfully in parallel.");
  } catch (err) {
    console.warn("Initial data seed check warning:", err);
  }
}
