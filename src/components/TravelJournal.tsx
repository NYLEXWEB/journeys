"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  X,
  BookOpen,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface JournalArticle {
  id: string;
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
    category: "Destination Guides",
    categoryKey: "guides",
    title: "The Discerning Traveller's Guide to Munnar & The High Ranges",
    subtitle: "Secret vantage points, colonial planters' bungalows, and unhurried highland trails.",
    readTime: "5 min read",
    date: "Destination Guide &bull; Highlands",
    image: "/images/generated/tea-plantation-approach.jpg",
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
    category: "Travel Tips & Planning",
    categoryKey: "tips",
    title: "Planning Your Kerala Holiday: Timing, Pacing & Slow Travel",
    subtitle: "Why fewer stops and generous pacing create far more meaningful memories.",
    readTime: "6 min read",
    date: "Travel Tips &bull; Practical Advice",
    image: "/images/generated/spice-gardens.jpg",
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
    category: "Culture & Local Stories",
    categoryKey: "culture",
    title: "Behind the Kettuvallam: Wooden Boat Crafting on Vembanad Lake",
    subtitle: "Meeting the generational carpenters who bind huge jackwood hulls without a single nail.",
    readTime: "4 min read",
    date: "Culture &bull; Living Traditions",
    image: "/images/generated/houseboat-backwaters.jpg",
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
    category: "Seasonal Travel Inspiration",
    categoryKey: "seasons",
    title: "The Magic of Kerala Monsoons & Winter Highland Escapes",
    subtitle: "From lush green rejuvenation to golden coastal winters: choosing your ideal season.",
    readTime: "5 min read",
    date: "Seasonal Inspiration &bull; Weather",
    image: "/images/generated/coastal-varkala.jpg",
    summary:
      "Kerala is a year-round destination, but each season reveals a completely different mood. Here is our insider breakdown to help you match your holiday to the optimal month.",
    fullContent: [
      "The Winter Season (October to March) is the most popular time to visit South India. The skies are clear, the coastal waters are calm, and the hill stations of Munnar and Wayanad enjoy crisp, invigorating weather with sunny afternoons and cool evenings.",
      "The Monsoon Season (June to August), known locally as Edavappathi, is Kerala's best-kept secret for wellness seekers. In traditional Ayurvedic medicine, the monsoon is the optimal time for cleansing treatments, as the pores of the skin open up and the atmosphere is dust-free and moist.",
      "Watching torrential tropical rain transform the paddy fields into emerald mirrors from the dry veranda of your private heritage villa or houseboat is an intensely romantic, therapeutic experience that commercial brochures often overlook.",
    ],
    takeaways: [
      "Oct – March: Ideal for sightseeing, beach retreats & hill treks",
      "June – Aug: The golden season for authentic Ayurvedic Panchakarma",
      "April – May: Warmer coastal days, perfect for cool highland escapes",
    ],
  },
];

export default function TravelJournal() {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  // Background Scroll Lock (Lenis + Body Freeze)
  useEffect(() => {
    if (activeArticle) {
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
  }, [activeArticle]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveArticle(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="journal" className="py-20 sm:py-28 bg-[#FFFCF5] relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
            <span>6. TRAVEL JOURNAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12]">
            Stories, insights &amp;{" "}
            <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              local wisdom.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#242424]/75 font-light leading-relaxed max-w-2xl">
            Destination guides, practical planning advice, and living cultural narratives.
          </p>
        </div>

        {/* 4 Pure Visual Editorial Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {JOURNAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group relative h-[420px] sm:h-[460px] rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(24,61,43,0.06)] hover:shadow-[0_20px_45px_rgba(24,61,43,0.18)] transition-all duration-700 bg-[#183D2B] select-none"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

              {/* Top Badges */}
              <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] tracking-wider">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm text-[10px] text-white border border-white/15">
                  <Clock className="w-3 h-3 text-[#E9E0D2]" />
                  {article.readTime}
                </span>
              </div>

              {/* Bottom Overlay: Title & Read Article */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col justify-end space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-serif text-white font-light leading-snug group-hover:text-[#E9E0D2] transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#E9E0D2] group-hover:text-white transition-colors duration-300">
                    <span>Read Story</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LUXURY EDITORIAL SPLIT MODAL (Aman / Belmond Standard) */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
              onClick={() => setActiveArticle(null)}
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
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 md:bg-black/10 hover:bg-[#183D2B] text-white md:text-[#183D2B] md:hover:text-white transition-all shadow-sm active:scale-90 backdrop-blur-sm cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Column: Full-Bleed Imagery */}
                <div className="md:w-[44%] relative h-48 sm:h-64 md:h-auto min-h-[190px] sm:min-h-[260px] md:min-h-full overflow-hidden bg-[#183D2B] shrink-0">
                  <Image
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-semibold text-[#183D2B] tracking-wider">
                      {activeArticle.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] uppercase font-medium text-white tracking-wider flex items-center gap-1 border border-white/15">
                      <Clock className="w-3 h-3 text-[#E9E0D2]" />
                      {activeArticle.readTime}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
                    <p className="font-serif italic text-xs sm:text-sm text-[#E9E0D2]">
                      &ldquo;{activeArticle.subtitle}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right Column: Editorial Text & Insights */}
                <div
                  data-lenis-prevent="true"
                  className="md:w-[56%] p-6 sm:p-9 lg:p-11 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6"
                >
                  <div className="space-y-4 pt-1 sm:pt-0">
                    <div className="inline-flex items-center gap-2 text-[#8B5E35] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold">
                      <BookOpen className="w-3.5 h-3.5 text-[#8B5E35]" />
                      <span>{activeArticle.date}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-light leading-snug">
                      {activeArticle.title}
                    </h3>

                    <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans">
                      {activeArticle.fullContent.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>

                    {/* Key Travel Insights Box */}
                    <div className="pt-4 border-t border-[#E9E0D2] space-y-2.5">
                      <h5 className="text-[11px] uppercase tracking-widest text-[#183D2B] font-semibold flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#8B5E35]" />
                        <span>Key Travel Insights:</span>
                      </h5>
                      <div className="space-y-2">
                        {activeArticle.takeaways.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#242424]/85 font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5E35] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer with WhatsApp Enquiry */}
                  <div className="pt-5 border-t border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-[#242424]/60 font-serif italic">
                      Tailored journeys across Kerala
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href="#contact"
                        onClick={() => setActiveArticle(null)}
                        className="text-[11px] uppercase tracking-wider text-[#183D2B]/75 hover:text-[#183D2B] font-medium hidden sm:inline"
                      >
                        Enquiry Form
                      </Link>
                      <a
                        href={`https://wa.me/919447000000?text=${encodeURIComponent(
                          `Hello Jibu, I was reading about "${activeArticle.title}" and would love to plan a tailored journey.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-current" />
                        <span>WhatsApp Enquiry</span>
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
