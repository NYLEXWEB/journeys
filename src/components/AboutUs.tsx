"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  UserCheck,
  Heart,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  X,
  Award,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState<"story" | "jibu" | "philosophy" | "whyUs">("story");
  const [modalTopic, setModalTopic] = useState<"story" | "jibu" | "philosophy" | "whyUs" | null>(null);

  // Background Scroll Lock (Lenis + Body Freeze)
  useEffect(() => {
    if (modalTopic) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [modalTopic]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalTopic(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const tabs = [
    { id: "story", label: "Our Story", icon: Compass, number: "01" },
    { id: "jibu", label: "Meet Jibu Thomas", icon: UserCheck, number: "02" },
    { id: "philosophy", label: "Our Travel Philosophy", icon: Heart, number: "03" },
    { id: "whyUs", label: "Why Travel With Us", icon: ShieldCheck, number: "04" },
  ] as const;

  const topicConfig = {
    story: {
      badge: "Our Story &bull; Founding Vision",
      title: "The Founding Vision of Journeys by Jibu Thomas",
      quote: "South India, experienced with soul, depth, and unhurried grace.",
      image: "/images/generated/tea-plantation-approach.jpg",
    },
    jibu: {
      badge: "Biography &bull; Jibu Thomas",
      title: "Two Decades of Destination Craftsmanship",
      quote: "Direct personal accountability for every journey that carries my name.",
      image: "/images/generated/fort-kochi-heritage.jpg",
    },
    philosophy: {
      badge: "Philosophy &bull; The Four Pillars",
      title: "How We Approach Every Single Itinerary",
      quote: "Generous pacing, living heritage, and conscious respect for local hosts.",
      image: "/images/generated/houseboat-backwaters.jpg",
    },
    whyUs: {
      badge: "Standards &bull; Why Travel With Us",
      title: "The Discerning Boutique Difference",
      quote: "No middle-tier sales reps, no hidden commissions, pristine standards.",
      image: "/images/generated/luxury-resort-stay.jpg",
    },
  };

  return (
    <section id="about" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#E9E0D2]/25 rounded-full blur-3xl pointer-events-none -mr-40" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] uppercase">
              <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
                ABOUT{" "}
              </span>
              <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
                US
              </span>
            </h2>
            <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
          </div>
          <p className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-[0.22em] text-[#8B5E35]">
            Personally planned &bull; Locally known &bull; Privately travelled
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#E9E0D2]/40 border border-[#E9E0D2] mb-6 sm:mb-8 max-w-fit overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#183D2B] text-[#FFFCF5] shadow-sm font-medium"
                    : "text-[#242424]/75 hover:text-[#183D2B] hover:bg-white/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#E9E0D2]" : "text-[#8B5E35]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Tab Panels */}
        <AnimatePresence mode="wait">
          {/* TAB 1: OUR STORY */}
          {activeTab === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/images/generated/tea-plantation-approach.jpg"
                  alt="Munnar tea highlands"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold">
                    Western Ghats &bull; Kerala
                  </span>
                  <p className="font-serif italic text-sm text-white/95">
                    Rooted in South India&apos;s timeless rhythm.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                  Sub-chapter 1.1 &bull; Our Story
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light leading-snug">
                  A bespoke path away from crowded tour buses.
                </h3>
                <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
                  Journeys by Jibu Thomas was created to show South India differently. We grew up along these waterways and highland ridges, unlocking private tea bungalows, quiet family kitchens, and secret viewpoints.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/about#story"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>View More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-[#183D2B]/20 text-[#183D2B] text-xs uppercase tracking-widest font-semibold hover:bg-[#183D2B]/5 transition-all"
                  >
                    <span>Plan Your Journey</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: MEET JIBU THOMAS */}
          {activeTab === "jibu" && (
            <motion.div
              key="jibu"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-[#183D2B]">
                <Image
                  src="/images/generated/fort-kochi-heritage.jpg"
                  alt="Jibu Thomas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183D2B] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold">
                    Founder &bull; Lead Travel Designer
                  </span>
                  <h4 className="font-serif text-2xl text-white">Jibu Thomas</h4>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                  Sub-chapter 1.2 &bull; Meet Jibu Thomas
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light leading-snug">
                  Two decades of personal destination craftsmanship.
                </h3>
                <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
                  Jibu personally reviews your travel style, inspects every boutique stay, and briefs your private chauffeur. When you travel, his personal WhatsApp line is with you 24/7.
                </p>

                <div className="flex items-center gap-6 py-3 border-y border-[#E9E0D2]">
                  <div>
                    <p className="font-serif text-2xl text-[#183D2B] font-light">20+ Yrs</p>
                    <p className="text-[10px] text-[#8B5E35] uppercase tracking-wider">Experience</p>
                  </div>
                  <div className="w-[1px] h-8 bg-[#E9E0D2]" />
                  <div>
                    <p className="font-serif text-2xl text-[#183D2B] font-light">100%</p>
                    <p className="text-[10px] text-[#8B5E35] uppercase tracking-wider">Tailored</p>
                  </div>
                  <div className="w-[1px] h-8 bg-[#E9E0D2]" />
                  <div>
                    <p className="font-serif text-2xl text-[#183D2B] font-light">Direct</p>
                    <p className="text-[10px] text-[#8B5E35] uppercase tracking-wider">Concierge</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/about#jibu"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>View More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-[#183D2B]/20 text-[#183D2B] text-xs uppercase tracking-widest font-semibold hover:bg-[#183D2B]/5 transition-all"
                  >
                    <span>Talk With Jibu</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: OUR TRAVEL PHILOSOPHY */}
          {activeTab === "philosophy" && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { num: "01", title: "Unhurried Cadence", desc: "Generous 2-3 night stays to truly absorb South India's rhythm without rush." },
                  { num: "02", title: "Authentic Soul", desc: "Generational spice growers, boat crafters & genuine temple heritage." },
                  { num: "03", title: "Privately Tailored", desc: "Zero cookie-cutter packages. Sculpted from a blank canvas for you." },
                  { num: "04", title: "Conscious Respect", desc: "Honouring fragile ecosystems & patronizing family-run heritage stays." },
                ].map((p) => (
                  <div key={p.num} className="p-6 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-serif italic text-2xl text-[#8B5E35]">{p.num}</span>
                    <h4 className="font-serif text-lg text-[#183D2B] mt-2 mb-1">{p.title}</h4>
                    <p className="text-xs text-[#242424]/75 font-light leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                    href="/about#philosophy"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>View More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 4: WHY TRAVEL WITH US */}
          {activeTab === "whyUs" && (
            <motion.div
              key="whyUs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: "100% Tailor-Made", desc: "Every route is custom-built around your arrival flights and personal cadence." },
                  { title: "Private Chauffeurs", desc: "Immaculate AC fleet with courteous, veteran professional drivers." },
                  { title: "Personally Inspected Stays", desc: "Vetted planters' bungalows & boutique eco-resorts with soul." },
                  { title: "Zero Hidden Commissions", desc: "Honest recommendations selected because they are genuinely exceptional." },
                  { title: "24/7 On-Ground Care", desc: "Direct WhatsApp concierge with Jibu from touchdown to departure." },
                  { title: "Generational Local Access", desc: "Quiet canal detours and private plantation ridges off guidebooks." },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-serif text-base text-[#183D2B] font-medium mb-1">{item.title}</h4>
                    <p className="text-xs text-[#242424]/75 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                    href="/about#why-us"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>View More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LUXURY EDITORIAL SPLIT MODAL (Aman / Belmond Standard) */}
        <AnimatePresence>
          {modalTopic && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
              onClick={() => setModalTopic(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
                className="relative max-w-4xl lg:max-w-5xl w-full max-h-[90vh] md:max-h-[85vh] rounded-[2rem] sm:rounded-[2.8rem] bg-[#FFFCF5] border border-[#E9E0D2] shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row"
              >
                {/* Floating Close Button */}
                <button
                  onClick={() => setModalTopic(null)}
                  className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 md:bg-black/10 hover:bg-[#183D2B] text-white md:text-[#183D2B] md:hover:text-white transition-all shadow-sm active:scale-90 cursor-pointer backdrop-blur-sm"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Column: Atmospheric Visual Image */}
                <div className="md:w-[44%] relative h-48 sm:h-64 md:h-auto min-h-[190px] sm:min-h-[260px] md:min-h-full overflow-hidden bg-[#183D2B] shrink-0">
                  <Image
                    src={topicConfig[modalTopic].image}
                    alt={topicConfig[modalTopic].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] tracking-wider">
                      {topicConfig[modalTopic].badge}
                    </span>
                  </div>

                  {/* Bottom Image Quote */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
                    <p className="font-serif italic text-xs sm:text-sm text-[#E9E0D2]">
                      &ldquo;{topicConfig[modalTopic].quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right Column: Editorial Narrative & Standards */}
                <div
                  data-lenis-prevent="true"
                  className="md:w-[56%] p-6 sm:p-9 lg:p-11 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6"
                >
                  <div className="space-y-4 pt-1 sm:pt-0">
                    <div className="inline-flex items-center gap-2 text-[#8B5E35] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#8B5E35]" />
                      <span>About Journeys by Jibu Thomas</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-light leading-snug">
                      {topicConfig[modalTopic].title}
                    </h3>

                    {/* TOPIC SPECIFIC CONTENT */}
                    {modalTopic === "story" && (
                      <div className="space-y-3 pt-1 text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans">
                        <p>
                          We founded Journeys by Jibu Thomas out of a conviction that travel in South India had lost its intimacy. Mass packages were funneling guests into identical tourist shops, hurried schedules, and impersonal chain hotels.
                        </p>
                        <p>
                          Having spent our entire lives in Kerala, we knew the real treasures: the sunrise mist over high-altitude tea plantations, the aroma of freshly ground cardamom in Wayanad, and the gentle quiet of Vembanad Lake at dusk.
                        </p>
                        <p>
                          We built a boutique DMC that operates at depth rather than scale. Every journey is sculpted from a blank canvas around your style, pacing, and dietary needs, supported by vetted private chauffeurs and genuine local hosts.
                        </p>
                      </div>
                    )}

                    {modalTopic === "jibu" && (
                      <div className="space-y-3 pt-1 text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans">
                        <p>
                          With more than twenty years devoted to destination management in South India, Jibu Thomas has personally guided and curated journeys for travelers from the UK, Europe, Australia, and North America.
                        </p>
                        <p>
                          &ldquo;I believe in being directly accountable for every trip that carries my name,&rdquo; says Jibu. Rather than passing your details to sales reps, Jibu consults directly on your itinerary. He ensures vehicle cleanliness, selects room orientations for morning light, and stays reachable on WhatsApp 24/7 during your stay.
                        </p>
                        <div className="pt-3 border-t border-[#E9E0D2] flex items-center gap-6">
                          <div>
                            <p className="font-serif text-xl text-[#183D2B]">20+ Yrs</p>
                            <p className="text-[10px] text-[#8B5E35] uppercase">In Destination</p>
                          </div>
                          <div className="w-[1px] h-7 bg-[#E9E0D2]" />
                          <div>
                            <p className="font-serif text-xl text-[#183D2B]">Direct</p>
                            <p className="text-[10px] text-[#8B5E35] uppercase">WhatsApp Line</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {modalTopic === "philosophy" && (
                      <div className="space-y-3 pt-1 text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans">
                        <p>
                          <strong>1. Unhurried Cadence:</strong> We allocate generous 2-3 night stays at each property so you unpack once, settle in, and experience the quiet magic of dawn and dusk.
                        </p>
                        <p>
                          <strong>2. Authentic Soul:</strong> From traditional sadhya meals on fresh banana leaves to meeting generational boat crafters, we prioritize living heritage over tourist traps.
                        </p>
                        <p>
                          <strong>3. Conscious Sustainability:</strong> We support family-run heritage homestays and community-first initiatives, ensuring travel benefits the land and people who host you.
                        </p>
                      </div>
                    )}

                    {modalTopic === "whyUs" && (
                      <div className="space-y-3 pt-1 text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans">
                        <p>
                          <strong>Zero Cookie-Cutter Itineraries:</strong> Every booking is crafted from scratch to match your flight times, preferences, and personal style.
                        </p>
                        <p>
                          <strong>Pristine Vehicle Standards:</strong> Air-conditioned, impeccably sanitized late-model vehicles with bottled water, wet towels, and calm, courteous chauffeurs.
                        </p>
                        <p>
                          <strong>No Hidden Commissions:</strong> We recommend hotels and experiences because they are genuinely right for you, never because of commercial arrangements.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Footer with WhatsApp Jibu */}
                  <div className="pt-5 border-t border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-[#242424]/60 font-serif italic">
                      Direct consultation with Jibu Thomas
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href="#contact"
                        onClick={() => setModalTopic(null)}
                        className="text-[11px] uppercase tracking-wider text-[#183D2B]/75 hover:text-[#183D2B] font-medium hidden sm:inline"
                      >
                        Enquiry Form
                      </Link>
                      <a
                        href={`https://wa.me/919447000000?text=${encodeURIComponent(
                          `Hello Jibu, I would like to consult with you about planning a bespoke South India journey.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-current" />
                        <span>WhatsApp Jibu</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
