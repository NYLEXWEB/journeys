import React from "react";
import type { Metadata } from "next";
import ContactPage from "@/app/contact/page";

export const metadata: Metadata = {
  title: "Plan Your Journey | Bespoke Kerala Travel Atelier",
  description:
    "Begin your bespoke Kerala journey consultation with founder Jibu Thomas. Tailored itineraries, handpicked stays, and unhurried South India holidays.",
  alternates: {
    canonical: "/plan-your-journey",
  },
  openGraph: {
    title: "Plan Your Journey | Journeys by Jibu Thomas",
    description:
      "Share your travel dates and dreams. Jibu Thomas personally designs every private itinerary from a blank canvas.",
    url: "https://journeysbyjibuthomas.com/plan-your-journey",
  },
};

export default function PlanYourJourneyPage() {
  return <ContactPage />;
}
