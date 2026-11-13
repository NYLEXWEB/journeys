"use client";

import React, { useState, useEffect } from "react";
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
  X,
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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Background Scroll Lock (Lenis + Body Freeze)
  useEffect(() => {
    if (selectedService) {
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
  }, [selectedService]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FFFCF5] relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
            <span>5. OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12]">
            Five pillars of{" "}
            <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              bespoke care.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#242424]/75 font-light leading-relaxed max-w-2xl">
            Every transfer, reservation, and encounter is coordinated by our in-house team in Kerala.
          </p>
        </div>

        {/* LUXURY EDITORIAL TILES - Spacious 3+2 Centered Responsive Grid */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-[1440px] mx-auto">
          {SERVICES_DATA.map((srv) => {
            return (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className="group relative w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] xl:w-[420px] h-[430px] sm:h-[480px] md:h-[510px] lg:h-[530px] rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden cursor-pointer shadow-[0_12px_35px_rgba(24,61,43,0.08)] hover:shadow-[0_24px_55px_rgba(24,61,43,0.22)] hover:-translate-y-1.5 transition-all duration-500 bg-[#183D2B] select-none border border-[#E9E0D2]/30"
              >
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-106"
                />

                {/* Subtle soft gradient only at the bottom for the action pill */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-500 group-hover:from-black/85" />

                {/* Bottom Overlay: Pillar Number & Minimalist View Details Button */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9E0D2]" />
                    <span className="font-serif italic text-sm text-[#E9E0D2] tracking-wide">
                      Pillar {srv.number}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-[#183D2B] text-white text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium backdrop-blur-md border border-white/30 transition-all duration-300 group-hover:bg-[#183D2B] group-hover:border-[#E9E0D2]/60 group-hover:scale-105 shadow-sm">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* LUXURY EDITORIAL SPLIT MODAL (Aman / Belmond Standard) */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
              onClick={() => setSelectedService(null)}
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
                  onClick={() => setSelectedService(null)}
                  className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 md:bg-black/10 hover:bg-[#183D2B] text-white md:text-[#183D2B] md:hover:text-white transition-all shadow-sm active:scale-90 backdrop-blur-sm cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Column: Full-Bleed Imagery */}
                <div className="md:w-[46%] relative h-56 sm:h-72 md:h-auto min-h-[220px] sm:min-h-[280px] md:min-h-full overflow-hidden bg-[#183D2B] shrink-0">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] uppercase font-semibold text-[#E9E0D2] tracking-wider border border-white/20">
                      Pillar {selectedService.number}
                    </span>
                  </div>
                </div>

                {/* Right Column: Editorial Narrative & Inclusions */}
                <div
                  data-lenis-prevent="true"
                  className="md:w-[54%] p-6 sm:p-9 lg:p-11 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6"
                >
                  <div className="space-y-4 pt-1 sm:pt-0">
                    <div className="inline-flex items-center gap-2 text-[#8B5E35] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#8B5E35]" />
                      <span>Bespoke Service Standard &bull; Kerala</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-light leading-snug">
                      {selectedService.title}
                    </h3>

                    <p className="font-serif italic text-xs sm:text-sm text-[#8B5E35]">
                      &ldquo;{selectedService.shortVibe}&rdquo;
                    </p>

                    <p className="text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed font-sans pt-1">
                      {selectedService.description}
                    </p>

                    {/* Inclusions */}
                    <div className="pt-4 border-t border-[#E9E0D2] space-y-2.5">
                      <h5 className="text-[11px] uppercase tracking-widest text-[#183D2B] font-semibold">
                        Service Standards &amp; Inclusions:
                      </h5>
                      <div className="space-y-2">
                        {selectedService.points.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#242424]/85 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E35] mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer with WhatsApp Enquiry */}
                  <div className="pt-5 border-t border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-[#242424]/60 font-serif italic">
                      Coordinated by our Kerala Desk
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href="#contact"
                        onClick={() => setSelectedService(null)}
                        className="text-[11px] uppercase tracking-wider text-[#183D2B]/75 hover:text-[#183D2B] font-medium hidden sm:inline"
                      >
                        Enquiry Form
                      </Link>
                      <a
                        href={`https://wa.me/919447000000?text=${encodeURIComponent(
                          `Hello Jibu, I am enquiring about your ${selectedService.title} service.`
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
