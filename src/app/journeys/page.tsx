import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JourneysClient from "./JourneysClient";

export const metadata: Metadata = {
  title: "Bespoke Kerala & South India Journeys | Journeys by Jibu Thomas",
  description:
    "Privately curated, slow-paced journeys across Kerala and South India. Personally designed by founder Jibu Thomas around your pace, preferences, and curiosities.",
  alternates: {
    canonical: "/journeys",
  },
  openGraph: {
    title: "Bespoke Kerala Journeys | Journeys by Jibu Thomas",
    description:
      "Explore handcrafted travel itineraries across Kerala, Tamil Nadu, and South India. Bespoke routes, handpicked boutique stays, and dedicated private chauffeurs.",
    url: "https://journeysbyjibuthomas.com/journeys",
  },
};

export default function JourneysPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <JourneysClient />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
