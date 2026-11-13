"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortVibe: string;
  image: string;
  description: string;
  points: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "private-chauffeur",
    number: "01",
    title: "Private Chauffeur-Driven Journeys",
    shortVibe: "Pristine AC fleet with seasoned, courteous private chauffeurs.",
    image: "/images/services/private-chauffeur.jpg",
    description:
      "Travel through South India in immaculate, air-conditioned private vehicles. Our chauffeurs know every scenic mountain pass, quiet tea stall, and tranquil detour. Drive in quiet comfort and stop whenever a vista catches your eye.",
    points: [
      "Pristine, late-model premium SUVs, sedans, and luxury family vans",
      "Courteous, verified chauffeurs with years of accident-free experience",
      "Complete flexibility for spontaneous viewpoints and village photo stops",
      "Complimentary cold mineral water, refreshing towels, and Wi-Fi",
    ],
  },
  {
    id: "handpicked-stays",
    number: "02",
    title: "Handpicked Stays & Accommodation",
    shortVibe: "Heritage tea bungalows, private houseboats & boutique eco-resorts.",
    image: "/images/services/handpicked-stays.jpg",
    description:
      "We strictly avoid soulless concrete chain hotels. Instead, we place you in authentic heritage planters' bungalows nestled inside tea estates, private backwater kettuvallams, and secluded eco-resorts overlooking cliff vistas.",
    points: [
      "Century-old colonial tea planters' bungalows in the Western Ghats",
      "Private luxury kettuvallams with personal chefs on Vembanad Lake",
      "Intimate eco-resorts and barefoot luxury coastal boutique stays",
      "Personally inspected by Jibu Thomas for hygiene, ambiance, and warmth",
    ],
  },
  {
    id: "family-senior-friendly",
    number: "03",
    title: "Family & Senior-Friendly Holidays",
    shortVibe: "Unhurried schedules, ground-floor rooms & gentle pacing.",
    image: "/images/services/family-senior-friendly.jpg",
    description:
      "Traveling with children or elderly grandparents requires specialized care. We craft itineraries with shorter driving segments, accessible ground-floor rooms, gentle walking trails, tailored dietary requests, and multi-bedroom private family villas.",
    points: [
      "Thoughtfully spaced schedules without early morning exhaustion",
      "Ground-floor, step-free rooms and accessible vehicle boarding",
      "Special dietary coordination (mild spices, vegetarian, allergies)",
      "Engaging hands-on activities: pottery, canoe rides & spice garden walks",
    ],
  },
  {
    id: "special-interest",
    number: "04",
    title: "Special Interest Travel",
    shortVibe: "Birdwatching, culinary masterclasses, architecture & Ayurveda.",
    image: "/images/services/special-interest.jpg",
    description:
      "Whether your passion lies in birdwatching endemic Western Ghats avifauna, documenting Dravidian temple architecture, learning regional culinary secrets, or undergoing an authentic Ayurvedic Panchakarma cure under master physicians.",
    points: [
      "Ornithology & birdwatching expeditions with certified naturalists",
      "Culinary masterclasses and spice trade historical trails",
      "Authentic Ayurvedic wellness regimens at certified vaidyasala retreats",
      "Photography, textile, and living temple architecture explorations",
    ],
  },
  {
    id: "end-to-end",
    number: "05",
    title: "End-to-End Travel Coordination",
    shortVibe: "Airport meet-and-greet, private transfers & 24/7 care desk.",
    image: "/images/services/end-to-end.jpg",
    description:
      "From warm airport meet-and-greets at Kochi, Trivandrum, or Bangalore to seamless luggage handling, pre-arranged entry permits, private boat charters, and instant WhatsApp support, our dedicated Kerala coordination desk handles every detail.",
    points: [
      "Warm VIP airport arrival meet-and-greet and luggage coordination",
      "All entrance permits, private boat hires, and monument admissions arranged",
      "Real-time WhatsApp concierge with Jibu Thomas throughout your stay",
      "On-ground logistics team monitoring road conditions and weather in real time",
    ],
  },
];

export default function OurServices() {
  const [activeId, setActiveId] = useState<string>("private-chauffeur");

  const activeService =
    SERVICES_DATA.find((item) => item.id === activeId) || SERVICES_DATA[0];

  return (
    <section
      id="services"
      className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-hidden"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] uppercase">
            <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
              OUR{" "}
            </span>
            <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
              SERVICES
            </span>
          </h2>
          <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
        </div>

        {/* Mobile / Tablet Horizontal Navigation (< lg) */}
        <div className="lg:hidden mb-5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
            {SERVICES_DATA.map((srv) => {
              const isActive = srv.id === activeId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveId(srv.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#183D2B] text-white shadow-sm font-medium"
                      : "bg-white text-[#242424]/75 border border-[#E9E0D2] hover:text-[#183D2B]"
                  }`}
                >
                  <span className="text-[#8B5E35] mr-1.5 font-mono">{srv.number}</span>
                  {srv.title.split(" ")[0]} {srv.title.split(" ")[1] || ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Architectural Services Directory (Desktop >= lg) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between border-y border-[#E9E0D2]/70 divide-y divide-[#E9E0D2]/60">
            {SERVICES_DATA.map((srv) => {
              const isActive = srv.id === activeId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveId(srv.id)}
                  className={`group w-full text-left py-4.5 px-4 transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? "bg-[#183D2B]/[0.035] pl-6"
                      : "hover:bg-black/[0.015] hover:pl-5"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#183D2B]" />
                  )}
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-xs tracking-wider transition-colors shrink-0 ${
                        isActive ? "text-[#8B5E35] font-medium" : "text-[#8B5E35]/70"
                      }`}
                    >
                      {srv.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-medium transition-colors leading-snug ${
                          isActive
                            ? "text-[#183D2B]"
                            : "text-[#242424]/85 group-hover:text-[#183D2B]"
                        }`}
                      >
                        {srv.title}
                      </h3>
                      <p className="text-xs text-[#242424]/60 font-light mt-1 truncate">
                        {srv.shortVibe}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Refined Active Service Showcase Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E9E0D2] rounded-2xl p-5 sm:p-7 shadow-[0_8px_30px_rgba(24,61,43,0.03)] h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex flex-col justify-between h-full space-y-5"
                >
                  {/* Service Photograph */}
                  <div className="relative h-52 sm:h-60 w-full rounded-xl overflow-hidden border border-[#E9E0D2]/50">
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Summary & Description */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs text-[#8B5E35] font-medium">
                        {activeService.number}
                      </span>
                      <span className="text-[#E9E0D2]">&bull;</span>
                      <p className="text-xs text-[#242424]/60 font-light truncate">
                        {activeService.shortVibe}
                      </p>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#183D2B] leading-snug">
                      {activeService.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Curated Inclusions */}
                  <div className="pt-3.5 border-t border-[#E9E0D2]/60">
                    <span className="text-[11px] uppercase tracking-wider text-[#183D2B] font-medium block mb-2">
                      Key Inclusions
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#242424]/75 font-light">
                      {activeService.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#8B5E35] select-none leading-none mt-0.5">
                            —
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Minimal Text Action Links */}
                  <div className="pt-3.5 border-t border-[#E9E0D2]/60 flex items-center justify-between gap-4 text-xs font-medium tracking-wide">
                    <a
                      href={`https://wa.me/919447000000?text=${encodeURIComponent(
                        `Hello Jibu, I would like to consult about ${activeService.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#183D2B] hover:text-[#8B5E35] transition-colors"
                    >
                      Enquire via WhatsApp &rarr;
                    </a>
                    <Link
                      href="/contact"
                      className="text-[#8B5E35] hover:text-[#183D2B] transition-colors"
                    >
                      Plan Your Journey &rarr;
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
