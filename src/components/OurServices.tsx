"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Hotel,
  Users2,
  Camera,
  ShieldCheck,
  ArrowUpRight,
  ChevronDown,
  Check,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortVibe: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
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
    icon: Car,
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
    icon: Hotel,
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
    icon: Users2,
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
    icon: Camera,
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
    icon: ShieldCheck,
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
  const [activeServiceId, setActiveServiceId] = useState<string>("private-chauffeur");

  const toggleService = (id: string) => {
    setActiveServiceId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 bg-[#FFFCF5] relative overflow-hidden">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Editorial Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Fixed / Sticky Editorial Overview */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E35] shrink-0" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] text-[#183D2B] uppercase">
                OUR <span className="text-[#8B5E35]">SERVICES</span>
              </h2>
              <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
            </div>

            {/* Boutique Standards Badge */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E9E0D2] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8B5E35] font-semibold">
                <Sparkles className="w-4 h-4 text-[#8B5E35]" />
                <span>The Boutique Promise</span>
              </div>
              <p className="text-xs sm:text-sm text-[#242424]/75 font-light leading-relaxed">
                Direct personal accountability with Jibu Thomas. Real-time on-ground assistance and complete peace of mind.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#183D2B] font-semibold hover:text-[#8B5E35] transition-colors"
                >
                  <span>Consult with Jibu</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#E9E0D2]">&bull;</span>
                <a
                  href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider text-[#25D366] font-semibold hover:underline flex items-center gap-1"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Interactive Service Rows */}
          <div className="lg:col-span-7 space-y-4">
            {SERVICES_DATA.map((srv) => {
              const isOpen = activeServiceId === srv.id;
              const IconComponent = srv.icon;

              return (
                <div
                  key={srv.id}
                  className={`rounded-[1.8rem] transition-all duration-500 border ${
                    isOpen
                      ? "bg-white border-[#8B5E35]/40 shadow-[0_15px_40px_rgba(24,61,43,0.08)]"
                      : "bg-white/60 hover:bg-white border-[#E9E0D2] hover:border-[#8B5E35]/30 shadow-none"
                  }`}
                >
                  {/* Row Header - Clickable to expand */}
                  <button
                    onClick={() => toggleService(srv.id)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 pr-4">
                      <span className="font-serif italic text-xl sm:text-2xl text-[#8B5E35] font-light shrink-0">
                        {srv.number}
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif text-[#183D2B] font-light group-hover:text-[#8B5E35] transition-colors leading-snug">
                          {srv.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#242424]/70 font-light mt-1">
                          {srv.shortVibe}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? "bg-[#183D2B] text-white border-[#183D2B] rotate-180"
                          : "bg-white text-[#183D2B] border-[#E9E0D2] group-hover:border-[#183D2B]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expanded Content Drawer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-2 border-t border-[#E9E0D2]/60 space-y-6">
                          {/* Rich Service Photograph */}
                          <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden shadow-inner border border-[#E9E0D2]/50">
                            <Image
                              src={srv.image}
                              alt={srv.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                              <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold flex items-center gap-1.5">
                                <IconComponent className="w-3.5 h-3.5 text-[#E9E0D2]" />
                                <span>Pillar {srv.number} &bull; Verified Standard</span>
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-[#242424]/85 font-light leading-relaxed">
                            {srv.description}
                          </p>

                          {/* Curated Key Points */}
                          <div className="space-y-2.5">
                            <span className="text-[11px] uppercase tracking-wider text-[#183D2B] font-semibold block">
                              What is included:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {srv.points.map((pt, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="flex items-start gap-2 text-xs text-[#242424]/80 font-light"
                                >
                                  <Check className="w-3.5 h-3.5 text-[#8B5E35] shrink-0 mt-0.5" />
                                  <span>{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <a
                              href={`https://wa.me/919447000000?text=${encodeURIComponent(
                                `Hello Jibu, I would like to consult about ${srv.title}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                              <span>Enquire About This Service</span>
                            </a>
                            <Link
                              href="/contact"
                              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-[#183D2B]/30 text-[#183D2B] text-xs uppercase tracking-wider font-semibold hover:bg-[#183D2B] hover:text-white transition-all text-center"
                            >
                              <span>Plan Your Journey</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
