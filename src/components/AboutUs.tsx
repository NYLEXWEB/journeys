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
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

export default function AboutUs() {
  const content = useWebsiteContent();
  const about = content?.about || {};

  const [activeTab, setActiveTab] = useState<"story" | "jibu" | "philosophy" | "whyUs">("story");
  const tabs = [
    { id: "story", label: "Our Story", icon: Compass, number: "01" },
    { id: "jibu", label: "Meet Jibu Thomas", icon: UserCheck, number: "02" },
    { id: "philosophy", label: "Our Travel Philosophy", icon: Heart, number: "03" },
    { id: "whyUs", label: "Why Travel With Us", icon: ShieldCheck, number: "04" },
  ] as const;

  const topicConfig = {
    story: {
      badge: about.storyBadge || "Our Story • Founding Vision",
      title: about.storyTitle || "The Founding Vision of Journeys by Jibu Thomas",
      quote: about.storyQuote || "South India, experienced with soul, depth, and unhurried grace.",
      image: about.storyImage || "/images/generated/tea-plantation-approach.webp",
    },
    jibu: {
      badge: about.jibuBadge || "Biography • Jibu Thomas",
      title: about.jibuTitle || "Two Decades of Destination Craftsmanship",
      quote: about.jibuSubtitle || "Direct personal accountability for every journey that carries my name.",
      image: about.jibuImage || "/images/generated/fort-kochi-heritage.webp",
    },
    philosophy: {
      badge: about.philosophyBadge || "Philosophy • The Four Pillars",
      title: about.philosophyTitle || "How We Approach Every Single Itinerary",
      quote: about.philosophyQuote || "Generous pacing, living heritage, and conscious respect for local hosts.",
      image: "/images/generated/houseboat-backwaters.webp",
    },
    whyUs: {
      badge: about.whyUsBadge || "Standards • Why Travel With Us",
      title: about.whyUsTitle || "The Discerning Boutique Difference",
      quote: about.whyUsQuote || "No middle-tier sales reps, no hidden commissions, pristine standards.",
      image: "/images/generated/luxury-resort-stay.webp",
    },
  };

  return (
    <section id="about" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#E9E0D2]/25 rounded-full blur-3xl pointer-events-none -mr-40" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
            <h2 className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.1em] sm:tracking-[0.12em] uppercase">
              <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
                ABOUT{" "}
              </span>
              <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
                US
              </span>
            </h2>
            <span className="h-[1.5px] w-8 min-[400px]:w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent shrink-0" />
          </div>
          <p className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-[0.22em] text-[#8B5E35]">
            Personally planned &bull; Locally known &bull; Privately travelled
          </p>
        </div>

        {/* Tab Navigation Pill Bar with smooth mobile horizontal scroll */}
        <div className="w-full overflow-x-auto no-scrollbar mb-6 sm:mb-8 pb-1">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#E9E0D2]/40 border border-[#E9E0D2] w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  suppressHydrationWarning
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
                  src={about.storyImage || "/images/generated/tea-plantation-approach.webp"}
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
                    {about.storyQuote || "Rooted in South India's timeless rhythm."}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                  {about.storyBadge || "Sub-chapter 1.1 • Our Story"}
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light leading-snug">
                  {about.storyTitle || "A bespoke path away from crowded tour buses."}
                </h3>
                <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
                  {about.storyDescription || "Journeys by Jibu Thomas was created to show South India differently. We grew up along these waterways and highland ridges, unlocking private tea bungalows, quiet family kitchens, and secret viewpoints."}
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
                  src={about.jibuImage || "/images/generated/fort-kochi-heritage.webp"}
                  alt="Jibu Thomas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183D2B] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold">
                    {about.jibuBadge || "Founder • Lead Travel Designer"}
                  </span>
                  <h4 className="font-serif text-2xl text-white">Jibu Thomas</h4>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                  Sub-chapter 1.2 &bull; Meet Jibu Thomas
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light leading-snug">
                  {about.jibuTitle || "Two decades of personal destination craftsmanship."}
                </h3>
                <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed">
                  {about.jibuDescription || "Jibu personally reviews your travel style, inspects every boutique stay, and briefs your private chauffeur. When you travel, his personal WhatsApp line is with you 24/7."}
                </p>

                <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 py-3 border-y border-[#E9E0D2]">
                  {(about.jibuStats && about.jibuStats.length > 0 ? about.jibuStats : [
                    { value: "20+ Yrs", label: "Experience" },
                    { value: "100%", label: "Tailored" },
                    { value: "Direct", label: "Concierge" },
                  ]).map((st: any, sIdx: number) => (
                    <React.Fragment key={sIdx}>
                      {sIdx > 0 && <div className="w-[1px] h-8 bg-[#E9E0D2]" />}
                      <div>
                        <p className="font-serif text-2xl text-[#183D2B] font-light">{st.value}</p>
                        <p className="text-[10px] text-[#8B5E35] uppercase tracking-wider">{st.label}</p>
                      </div>
                    </React.Fragment>
                  ))}
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

        </div>
    </section>
  );
}
