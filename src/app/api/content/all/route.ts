import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const db = await connectToDatabase();

    if (!db) {
      // Graceful fallback to static initial dataset if MongoDB is not configured
      return NextResponse.json({
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
      });
    }

    // Auto-seed initial content if collections are empty
    await seedInitialDataIfEmpty();

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
    ] = await Promise.all([
      HeroSlideModel.find().sort({ order: 1 }).lean(),
      DestinationModel.find().sort({ order: 1 }).lean(),
      ExperienceModel.find().sort({ order: 1 }).lean(),
      JourneyModel.find().sort({ order: 1 }).lean(),
      ReviewModel.find().sort({ order: 1 }).lean(),
      ContactInfoModel.findOne().lean(),
      FooterContentModel.findOne().lean(),
      ServiceModel.find().sort({ order: 1 }).lean(),
      JournalModel.find().sort({ order: 1 }).lean(),
    ]);

    return NextResponse.json({
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
    });
  } catch (err: any) {
    console.error("API /api/content/all error:", err);
    // Return resilient fallback data so public page never breaks
    return NextResponse.json({
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
    });
  }
}

