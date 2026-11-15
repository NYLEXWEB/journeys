import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JournalClient from "./JournalClient";

export const metadata: Metadata = {
  title: "Kerala Travel Guide & Journal | Dispatches by Jibu Thomas",
  description:
    "Honest, expert guidance on planning your trip to Kerala and South India. Best times to visit, ideal itinerary lengths, stay comparisons, and slow travel advice by founder Jibu Thomas.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "Kerala Travel Guide & Journal | Journeys by Jibu Thomas",
    description:
      "Expert editorial guides to Kerala: Munnar vs Wayanad, houseboat etiquette, monsoon travel, and family advice by a local founder.",
    url: "https://journeysbyjibuthomas.com/journal",
  },
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <JournalClient />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

