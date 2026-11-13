import { DestinationModel } from "@/models/Destination";
import { HeroSlideModel } from "@/models/HeroSlide";
import { ExperienceModel } from "@/models/Experience";
import { JourneyModel } from "@/models/Journey";
import { ReviewModel } from "@/models/Review";
import { ContactInfoModel } from "@/models/ContactInfo";
import { FooterContentModel } from "@/models/FooterContent";
import { ServiceModel } from "@/models/Service";
import { JournalModel } from "@/models/Journal";
import {
  INITIAL_DESTINATIONS,
  INITIAL_HERO_SLIDES,
  INITIAL_EXPERIENCES,
  INITIAL_JOURNEYS,
  INITIAL_REVIEWS,
  INITIAL_CONTACT_INFO,
  INITIAL_FOOTER_CONTENT,
  INITIAL_SERVICES,
  INITIAL_JOURNAL,
} from "./seedData";

/**
 * Server-only: seeds the database if collections are currently empty.
 */
export async function seedInitialDataIfEmpty(): Promise<void> {
  try {
    const destCount = await DestinationModel.countDocuments();
    if (destCount === 0) {
      await DestinationModel.insertMany(INITIAL_DESTINATIONS);
      console.log("Seeded initial destinations.");
    }

    const heroCount = await HeroSlideModel.countDocuments();
    if (heroCount === 0) {
      await HeroSlideModel.insertMany(INITIAL_HERO_SLIDES);
      console.log("Seeded initial hero slides.");
    }

    const expCount = await ExperienceModel.countDocuments();
    if (expCount === 0) {
      await ExperienceModel.insertMany(INITIAL_EXPERIENCES);
      console.log("Seeded initial experiences.");
    }

    const journeyCount = await JourneyModel.countDocuments();
    if (journeyCount === 0) {
      await JourneyModel.insertMany(INITIAL_JOURNEYS);
      console.log("Seeded initial journeys.");
    }

    const reviewCount = await ReviewModel.countDocuments();
    if (reviewCount === 0) {
      await ReviewModel.insertMany(INITIAL_REVIEWS);
      console.log("Seeded initial reviews.");
    }

    const contactCount = await ContactInfoModel.countDocuments();
    if (contactCount === 0) {
      await ContactInfoModel.create(INITIAL_CONTACT_INFO);
      console.log("Seeded initial contact info.");
    }

    const footerCount = await FooterContentModel.countDocuments();
    if (footerCount === 0) {
      await FooterContentModel.create(INITIAL_FOOTER_CONTENT);
      console.log("Seeded initial footer content.");
    }

    const serviceCount = await ServiceModel.countDocuments();
    if (serviceCount === 0) {
      await ServiceModel.insertMany(INITIAL_SERVICES);
      console.log("Seeded initial services.");
    }

    const journalCount = await JournalModel.countDocuments();
    if (journalCount === 0) {
      await JournalModel.insertMany(INITIAL_JOURNAL);
      console.log("Seeded initial journal dispatches.");
    }
  } catch (err) {
    console.error("Initial data seed check warning:", err);
  }
}

