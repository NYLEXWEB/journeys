import mongoose from "mongoose";
import { HeroSlideModel } from "../src/models/HeroSlide";
import { DestinationModel } from "../src/models/Destination";
import { ExperienceModel } from "../src/models/Experience";
import { JourneyModel } from "../src/models/Journey";
import { ReviewModel } from "../src/models/Review";
import { ContactInfoModel } from "../src/models/ContactInfo";
import { FooterContentModel } from "../src/models/FooterContent";
import { ServiceModel } from "../src/models/Service";
import { JournalModel } from "../src/models/Journal";
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
} from "../src/lib/seedData";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("ERROR: MONGODB_URI is not set in environment!");
    process.exit(1);
  }

  console.log("--------------------------------------------------");
  console.log("Connecting to MongoDB Atlas...");
  const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
  console.log("Target URI:", maskedUri);

  await mongoose.connect(uri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 15000,
  });

  console.log("SUCCESS: Connected to MongoDB database:", mongoose.connection.name);
  console.log("--------------------------------------------------");

  // 1. Seed Collections if empty
  console.log("Checking and seeding collections...");

  const destCount = await DestinationModel.countDocuments();
  if (destCount === 0) {
    await DestinationModel.insertMany(INITIAL_DESTINATIONS);
    console.log(`+ Seeded ${INITIAL_DESTINATIONS.length} initial destinations.`);
  } else {
    console.log(`- Destinations already present: ${destCount} documents.`);
  }

  const heroCount = await HeroSlideModel.countDocuments();
  if (heroCount === 0) {
    await HeroSlideModel.insertMany(INITIAL_HERO_SLIDES);
    console.log(`+ Seeded ${INITIAL_HERO_SLIDES.length} initial hero slides.`);
  } else {
    console.log(`- Hero slides already present: ${heroCount} documents.`);
  }

  const expCount = await ExperienceModel.countDocuments();
  if (expCount === 0) {
    await ExperienceModel.insertMany(INITIAL_EXPERIENCES);
    console.log(`+ Seeded ${INITIAL_EXPERIENCES.length} initial experiences.`);
  } else {
    console.log(`- Experiences already present: ${expCount} documents.`);
  }

  const journeyCount = await JourneyModel.countDocuments();
  if (journeyCount === 0) {
    await JourneyModel.insertMany(INITIAL_JOURNEYS);
    console.log(`+ Seeded ${INITIAL_JOURNEYS.length} initial journeys.`);
  } else {
    console.log(`- Journeys already present: ${journeyCount} documents.`);
  }

  const reviewCount = await ReviewModel.countDocuments();
  if (reviewCount === 0) {
    await ReviewModel.insertMany(INITIAL_REVIEWS);
    console.log(`+ Seeded ${INITIAL_REVIEWS.length} initial reviews.`);
  } else {
    console.log(`- Reviews already present: ${reviewCount} documents.`);
  }

  const contactCount = await ContactInfoModel.countDocuments();
  if (contactCount === 0) {
    await ContactInfoModel.create(INITIAL_CONTACT_INFO);
    console.log("+ Seeded initial contact concierge info.");
  } else {
    console.log(`- Contact info already present: ${contactCount} documents.`);
  }

  const footerCount = await FooterContentModel.countDocuments();
  if (footerCount === 0) {
    await FooterContentModel.create(INITIAL_FOOTER_CONTENT);
    console.log("+ Seeded initial footer & social links.");
  } else {
    console.log(`- Footer content already present: ${footerCount} documents.`);
  }

  const serviceCount = await ServiceModel.countDocuments();
  if (serviceCount === 0) {
    await ServiceModel.insertMany(INITIAL_SERVICES);
    console.log(`+ Seeded ${INITIAL_SERVICES.length} initial services.`);
  } else {
    console.log(`- Services already present: ${serviceCount} documents.`);
  }

  const journalCount = await JournalModel.countDocuments();
  if (journalCount === 0) {
    await JournalModel.insertMany(INITIAL_JOURNAL);
    console.log(`+ Seeded ${INITIAL_JOURNAL.length} initial journal dispatches.`);
  } else {
    console.log(`- Journal dispatches already present: ${journalCount} documents.`);
  }

  console.log("--------------------------------------------------");
  console.log("FINAL DATABASE VERIFICATION:");

  const finalDest = await DestinationModel.countDocuments();
  const finalHero = await HeroSlideModel.countDocuments();
  const finalExp = await ExperienceModel.countDocuments();
  const finalJourneys = await JourneyModel.countDocuments();
  const finalReviews = await ReviewModel.countDocuments();
  const finalContact = await ContactInfoModel.countDocuments();
  const finalFooter = await FooterContentModel.countDocuments();
  const finalServices = await ServiceModel.countDocuments();
  const finalJournal = await JournalModel.countDocuments();

  console.log(`- Destinations:     ${finalDest} items`);
  console.log(`- Hero Slides:      ${finalHero} items`);
  console.log(`- Experiences:      ${finalExp} items`);
  console.log(`- Journeys:         ${finalJourneys} items`);
  console.log(`- Google Reviews:   ${finalReviews} items`);
  console.log(`- Contact Concierge:${finalContact} items`);
  console.log(`- Footer & Socials: ${finalFooter} items`);
  console.log(`- Services:         ${finalServices} items`);
  console.log(`- Travel Journal:   ${finalJournal} items`);

  console.log("--------------------------------------------------");
  console.log("Testing CRUD operations (Create, Read, Update, Delete)...");

  // Test temporary document in Destination
  const testId = "test-destination-probe";
  const created = await DestinationModel.create({
    id: testId,
    name: "Verification Probe",
    state: "Kerala",
    stateCategory: "kerala",
    region: "Test Region",
    image: "/images/tea-plantation.jpg",
    shortVibe: "Temporary test vibe.",
    overview: "Overview probe for CRUD test.",
    highlights: ["Highlight 1", "Highlight 2"],
  });
  console.log("  [CRUD: CREATE] Successfully created test destination:", created.name);

  const found = await DestinationModel.findOne({ id: testId });
  if (!found) throw new Error("CRUD READ failed");
  console.log("  [CRUD: READ]   Successfully read test destination from DB.");

  await DestinationModel.updateOne({ id: testId }, { shortVibe: "Updated test vibe." });
  const updated = await DestinationModel.findOne({ id: testId });
  if (updated?.shortVibe !== "Updated test vibe.") throw new Error("CRUD UPDATE failed");
  console.log("  [CRUD: UPDATE] Successfully updated test destination in DB.");

  await DestinationModel.deleteOne({ id: testId });
  const deleted = await DestinationModel.findOne({ id: testId });
  if (deleted) throw new Error("CRUD DELETE failed");
  console.log("  [CRUD: DELETE] Successfully deleted test probe from DB.");

  console.log("--------------------------------------------------");
  console.log("ALL DATABASE TESTS PASSED 100%!");
  await mongoose.disconnect();
  console.log("Disconnected cleanly.");
}

main().catch((err) => {
  console.error("SEED/VERIFY ERROR:", err);
  process.exit(1);
});

