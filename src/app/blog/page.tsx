import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BlogClient from "./BlogClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kerala Travel Blog & Journal | Stories by Jibu Thomas",
  description:
    "Expert travel stories, packing advice, destination guides, and slow travel perspectives from Kerala bespoke travel designer Jibu Thomas.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Kerala Travel Blog & Stories | Journeys by Jibu Thomas",
    description:
      "Authentic Kerala travel stories, destination insights, and itinerary guides curated by founder Jibu Thomas.",
    url: "https://journeysbyjibuthomas.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs text-[#8B5E35]">Loading Travel Journal...</div>}>
          <BlogClient />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
