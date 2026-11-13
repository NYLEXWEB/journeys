"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { DESTINATIONS_DATA, DestinationCategory } from "@/components/Destinations";
import {
  MapPin,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Sparkles,
  Compass,
  SlidersHorizontal,
} from "lucide-react";

export default function DestinationsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>("all");

  const filteredDestinations =
    selectedCategory === "all"
      ? DESTINATIONS_DATA
      : DESTINATIONS_DATA.filter((d) => d.stateCategory === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/#destinations"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35] hover:text-[#183D2B] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </Link>
        </div>

        {/* Directory Header */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#E9E0D2]">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
            <span>COMPLETE DESTINATION DIRECTORY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08] max-w-4xl">
            Sixteen destinations,{" "}
            <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              unlocked with intimacy.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed max-w-3xl">
            From the mist-shrouded peaks of Munnar to the sacred island waters of Rameswaram and the boulder ruins of Hampi. Every destination below is personally vetted, privately chauffeured, and tailored to your travel cadence.
          </p>

          {/* State Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {[
              { id: "all" as const, label: "All Destinations (16)" },
              { id: "kerala" as const, label: "Kerala (8)" },
              { id: "tamil-nadu" as const, label: "Tamil Nadu (4)" },
              { id: "karnataka" as const, label: "Karnataka (4)" },
            ].map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer shadow-sm ${
                    active
                      ? "bg-[#183D2B] text-[#FFFCF5] shadow-md"
                      : "bg-white text-[#183D2B] border border-[#E9E0D2] hover:border-[#183D2B]/40"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Jump Links Bar */}
          <div className="mt-6 pt-6 border-t border-[#E9E0D2]/60">
            <div className="text-[11px] uppercase tracking-widest text-[#8B5E35] font-semibold mb-3 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Quick Jump to Destination:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredDestinations.map((dest) => (
                <a
                  key={dest.id}
                  href={`#${dest.id}`}
                  className="px-3 py-1.5 rounded-full bg-[#E9E0D2]/30 hover:bg-[#183D2B] hover:text-white text-xs font-serif text-[#183D2B] transition-all border border-[#E9E0D2]/70"
                >
                  {dest.name}
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* DESTINATIONS LIST - EDITORIAL SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16 sm:space-y-24">
          {filteredDestinations.map((dest, idx) => (
            <article
              key={dest.id}
              id={dest.id}
              className="scroll-mt-32 p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#E9E0D2] shadow-[0_15px_45px_rgba(24,61,43,0.06)] hover:shadow-[0_25px_60px_rgba(24,61,43,0.12)] transition-shadow duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual Image Column */}
                <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] lg:h-[460px] rounded-[2rem] overflow-hidden shadow-md border border-[#E9E0D2]/60">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* State badge overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#183D2B] shadow-sm">
                      {dest.state}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] uppercase tracking-widest text-[#E9E0D2] font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E9E0D2]" />
                      <span>{dest.region}</span>
                    </span>
                    <p className="font-serif italic text-sm sm:text-base text-white/95 mt-1">
                      {dest.shortVibe}
                    </p>
                  </div>
                </div>

                {/* Editorial Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E9E0D2]/70 pb-4">
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#8B5E35] font-semibold">
                        Destination {String(idx + 1).padStart(2, "0")} &bull; {dest.state}
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light mt-1">
                        {dest.name}
                      </h2>
                    </div>
                    <span className="text-xs font-serif italic text-[#8B5E35] hidden sm:inline">
                      {dest.region}
                    </span>
                  </div>

                  {/* Overview Text */}
                  <p className="text-sm sm:text-base text-[#242424]/85 font-light leading-relaxed">
                    {dest.overview}
                  </p>

                  {/* Curated Highlights */}
                  <div className="space-y-3 pt-1">
                    <span className="text-[11px] uppercase tracking-widest text-[#183D2B] font-semibold block">
                      Curated Highlights &amp; Private Access:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {dest.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-xs text-[#242424]/85 font-medium"
                        >
                          <Check className="w-4 h-4 text-[#8B5E35] shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={`https://wa.me/919447000000?text=${encodeURIComponent(
                        `Hello Jibu, I would like to consult with you about planning a bespoke journey to ${dest.name} (${dest.state}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                    <Link
                      href={`/contact?destination=${encodeURIComponent(dest.name)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#183D2B]/30 hover:bg-[#183D2B] hover:text-white text-[#183D2B] text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                    >
                      <span>Plan Itinerary</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Bottom Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#183D2B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-[#E9E0D2] font-semibold">
                Can&apos;t find your specific destination?
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                We design custom journeys to any point in South India.
              </h3>
              <p className="text-xs sm:text-sm text-[#FFFCF5]/75 font-light">
                Tell us where you want to go. Our Kerala logistics desk arranges private vehicles, passes, and boutique stays.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold hover:bg-[#a06d3f] transition-all shadow-md shrink-0"
            >
              Start Custom Consultation
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
