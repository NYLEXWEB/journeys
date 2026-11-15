import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ExperiencesClient from "./ExperiencesClient";

export const metadata: Metadata = {
  title: "Curated Kerala Experiences | Journeys by Jibu Thomas",
  description:
    "Authentic, privately guided Kerala experiences curated by founder Jibu Thomas. Culinary trails, temple rituals, tea plantations, and quiet backwater exploration.",
  alternates: {
    canonical: "/experiences",
  },
  openGraph: {
    title: "Curated Kerala Experiences | Journeys by Jibu Thomas",
    description:
      "Deep local access, behind-the-scenes cultural encounters, and private nature expeditions across Kerala and South India.",
    url: "https://journeysbyjibuthomas.com/experiences",
  },
};

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <ExperiencesClient />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

