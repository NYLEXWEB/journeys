"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ArrowUpRight,
  BookOpen,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface JournalArticle {
  id: string;
  issueNumber: string;
  category: "Destination Guides" | "Travel Tips & Planning" | "Culture & Local Stories" | "Seasonal Travel Inspiration";
  categoryKey: "guides" | "tips" | "culture" | "seasons";
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
  fullContent: string[];
  takeaways: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "munnar-guide",
    issueNumber: "Dispatch 01",
    category: "Destination Guides",
    categoryKey: "guides",
    title: "The Discerning Traveller's Guide to Munnar & The High Ranges",
    subtitle: "Secret vantage points, colonial planters' bungalows, and unhurried highland trails.",
    readTime: "5 min read",
    date: "Destination Guide &bull; Highlands",
    image: "/images/generated/tea-plantation-approach.webp",
    summary:
      "Most visitors rush through Munnar on crowded tourist buses, missing its greatest treasures. Here is how we privately guide our guests to centuries-old tea planters' bungalows, private estate walks, and quiet sunrise ridges.",
    fullContent: [
      "Munnar's elevation (1,600 metres above sea level) once served as the summer sanctuary for British tea planters. The true magic of this region is found not in commercial market junctions, but in the private tea plantations that cascade down the rolling slopes of the Western Ghats.",
      "When we curate your stay in Munnar, we choose private heritage bungalows nestled deep within working estates. Wake up to the gentle hum of early morning mist, enjoy tea harvested from the slopes right outside your veranda, and walk with veteran estate managers who can identify every spice and birdcall.",
      "For those who wish to trek, we arrange sunrise expeditions to Top Station and Kolukkumalai — the world's highest organic tea estate — where clouds drift beneath your feet as dawn paints the sky in shades of amber and rose.",
    ],
    takeaways: [
      "Best Time: October through March for crisp mountain mornings",
      "Stay in authentic restored planters' bungalows away from town center",
      "Pack light layers: evenings in Munnar can drop to 10°C (50°F)",
    ],
  },
  {
    id: "travel-tips",
    issueNumber: "Dispatch 02",
    category: "Travel Tips & Planning",
    categoryKey: "tips",
    title: "Planning Your Kerala Holiday: Timing, Pacing & Slow Travel",
    subtitle: "Why fewer stops and generous pacing create far more meaningful memories.",
    readTime: "6 min read",
    date: "Travel Tips &bull; Practical Advice",
    image: "/images/generated/spice-gardens.webp",
    summary:
      "South India's roads wind through breathtaking hill gradients and lush village corridors. Understanding realistic travel times and avoiding over-packed itineraries is the secret to a rejuvenating holiday.",
    fullContent: [
      "The most common mistake first-time travelers make in Kerala is attempting to see six destinations in seven days. While distances on maps look modest, hill station routes and winding backwater highways require thoughtful, relaxed pacing.",
      "At Journeys by Jibu Thomas, our golden rule is at least two nights in every destination (and three in tea country or beach hideaways). This allows you to truly settle in, unpack once, and experience the dawn light and evening calm that defines each location.",
      "Always travel with a dedicated private chauffeur. South Indian driving requires seasoned local instincts. With a courteous, vetted chauffeur at the wheel, your transit time becomes a scenic pleasure rather than a stressful endurance.",
    ],
    takeaways: [
      "Plan for 2 to 3 nights per destination to avoid travel fatigue",
      "Always book a private chauffeur-driven vehicle for total flexibility",
      "Allow afternoon downtime for Ayurvedic therapies or quiet reading",
    ],
  },
  {
    id: "kettuvallam-culture",
    issueNumber: "Dispatch 03",
    category: "Culture & Local Stories",
    categoryKey: "culture",
    title: "Behind the Kettuvallam: Wooden Boat Crafting on Vembanad Lake",
    subtitle: "Meeting the generational carpenters who bind huge jackwood hulls without a single nail.",
    readTime: "4 min read",
    date: "Culture &bull; Living Traditions",
    image: "/images/generated/houseboat-backwaters.webp",
    summary:
      "Centuries before they carried travelers, kettuvallams transported rice and spices across Kerala's waterways. Discover how these majestic vessels are still handcrafted using ancestral methods.",
    fullContent: [
      "The word 'Kettuvallam' literally translates to 'boat with knots' (Kettu = tied, Vallam = boat). Astonishingly, these 100-foot-long vessels are built completely without iron nails. Veteran boat builders use planks of wild jackwood, stitching them tightly together with coir rope made from coconut husks.",
      "The hull is coated with black resin made from boiled cashew nutshells and fish oil, creating a natural waterproof seal that endures for decades. Thatch roofs made of bamboo and palm leaves ensure natural cooling even during warm tropical afternoons.",
      "When you board our private houseboats, you are stepping into a living testament to indigenous engineering. Your onboard chef will prepare meals over traditional hearths, filling the air with the aroma of roasted mustard seeds, curry leaves, and freshly pressed coconut milk.",
    ],
    takeaways: [
      "Zero iron nails: handcrafted with wild jackwood and coir rope",
      "Environmentally harmonious design adapted to slow water flow",
      "Private chefs serve freshly caught freshwater delicacies onboard",
    ],
  },
  {
    id: "seasonal-inspiration",
    issueNumber: "Dispatch 04",
    category: "Seasonal Travel Inspiration",
    categoryKey: "seasons",
    title: "The Magic of Monsoon: Rejuvenation, Waterways & Dramatic Skies",
    subtitle: "Why June through August is Kerala's best-kept secret for wellness and poetry.",
    readTime: "5 min read",
    date: "Seasonality &bull; Ayurveda",
    image: "/images/generated/coastal-varkala.webp",
    summary:
      "While many avoid rain, discerning travellers and wellness seekers arrive specifically during the Southwest monsoon (Edavappathi) when nature is radiant and Ayurveda is most potent.",
    fullContent: [
      "In traditional Ayurvedic medicine, the monsoon season opens the body's pores (Sweda Margas), making it the optimal physiological window for Panchakarma cleansing, herbal oil kizhi massage, and deep cellular rejuvenation.",
      "The landscape transforms into an electric spectrum of fifty greens. Waterfalls plunge off laterite cliffs with thunderous majesty, backwater lagoons swell with fresh currents, and temperatures hover at a cool, balmy 24°C.",
      "Sip warm spiced ginger tea on a colonial veranda while listening to rhythmic tropical downpours drumming against terracotta roof tiles — a sensation of peace unmatched anywhere else in India.",
    ],
    takeaways: [
      "Peak season for authentic Ayurvedic cures and Panchakarma therapies",
      "Dramatically fewer crowds and lush emerald greenery across all regions",
      "Exceptional rates at premium private luxury retreats and backwater resorts",
    ],
  },
];

export default function TravelJournal() {
  const leadArticle = JOURNAL_ARTICLES[0];
  const sideArticles = JOURNAL_ARTICLES.slice(1);

  return (
    <section id="blog" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] uppercase">
              <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
                TRAVEL{" "}
              </span>
              <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
                BLOG
              </span>
            </h2>
            <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline font-serif italic text-sm sm:text-base text-[#8B5E35] font-light">
              Stories &amp; Dispatches by Jibu Thomas
            </span>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E9E0D2] bg-white/80 hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              <span>Explore All Stories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* STYLISH EDITORIAL MAGAZINE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* FEATURED LEAD DISPATCH (Left Column) */}
          <Link href={`/blog/${leadArticle.id}`}
            className="lg:col-span-7 group rounded-[2.2rem] bg-white border border-[#E9E0D2] overflow-hidden cursor-pointer shadow-[0_12px_35px_rgba(24,61,43,0.06)] hover:shadow-[0_22px_55px_rgba(24,61,43,0.14)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Lead Image */}
            <div className="relative h-[280px] sm:h-[380px] w-full overflow-hidden">
              <Image
                src={leadArticle.image}
                alt={leadArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] tracking-wider shadow-sm">
                  Featured Dispatch
                </span>
                <span className="flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full text-[10px] text-white border border-white/20 backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-[#E9E0D2]" />
                  <span>{leadArticle.readTime}</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold">
                  {leadArticle.category}
                </span>
              </div>
            </div>

            {/* Lead Editorial Copy */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                  {leadArticle.issueNumber} &bull; Highlands
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#183D2B] font-light leading-snug group-hover:text-[#8B5E35] transition-colors">
                  {leadArticle.title}
                </h3>
                <p className="text-sm text-[#242424]/75 font-light leading-relaxed line-clamp-3">
                  {leadArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E9E0D2]/60 flex items-center justify-between">
                <span className="text-xs font-serif italic text-[#8B5E35]">
                  &ldquo;{leadArticle.subtitle}&rdquo;
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#183D2B] font-semibold group-hover:text-[#8B5E35] transition-colors shrink-0">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* 3 COMPANION DISPATCHES (Right Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
            {sideArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}
                className="group p-5 sm:p-6 rounded-[2rem] bg-white border border-[#E9E0D2] hover:border-[#8B5E35]/40 shadow-[0_8px_25px_rgba(24,61,43,0.05)] hover:shadow-[0_15px_35px_rgba(24,61,43,0.12)] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center"
              >
                {/* Thumbnail */}
                <div className="relative h-28 w-full sm:w-32 shrink-0 rounded-2xl overflow-hidden border border-[#E9E0D2]/50">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 130px"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#8B5E35] font-semibold">
                    <span>{article.issueNumber}</span>
                    <span>&bull;</span>
                    <span className="text-[#242424]/60">{article.readTime}</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-serif text-[#183D2B] font-light leading-snug group-hover:text-[#8B5E35] transition-colors line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-xs text-[#242424]/70 font-light line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>

                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#183D2B] font-medium group-hover:text-[#8B5E35] transition-colors">
                      <span>Read Story</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Blog Dispatches Banner on Mobile / Tablet */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#183D2B] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-[#8B5E35] transition-all"
          >
            <span>Read All Travel Blog Stories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        </div>
    </section>
  );
}
