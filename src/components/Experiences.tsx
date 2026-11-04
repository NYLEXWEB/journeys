"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Car, Hotel, Sparkles, Users, CalendarCheck } from "lucide-react";

export default function Experiences() {
  const experiences = [
    {
      id: "bespoke-planning",
      title: "Bespoke Holiday Planning",
      tagline: "Designed around your vision and cadence",
      icon: Compass,
      description:
        "Every itinerary begins with a conversation. We thoughtfully craft each day to match your personal interests, whether you wish to explore ancient spice hills, cruise the backwaters, or simply unwind in secluded luxury at your own pace.",
      image: "/images/generated/tea-plantation-approach.jpg",
      imageAlt: "Serene terraced tea gardens in misty morning light",
      highlights: ["Tailored daily pace", "Private consultations", "Flexible dates"],
    },
    {
      id: "chauffeur-journeys",
      title: "Private Chauffeur-Driven Journeys",
      tagline: "Comfortable, relaxed, and seamless road journeys",
      icon: Car,
      description:
        "Travel across Kerala and South India in private, pristine air-conditioned comfort with a dedicated, professional chauffeur. Enjoy scenic mountain roads, village detours, and spontaneous viewpoints without the stress of navigating unfamiliar routes.",
      image: "/images/generated/hero-kerala.jpg",
      imageAlt: "Scenic mountain landscape of Kerala's Western Ghats",
      highlights: ["Experienced local drivers", "Premium private vehicles", "Complete privacy"],
    },
    {
      id: "curated-stays",
      title: "Carefully Selected Accommodation",
      tagline: "Hand-picked boutique heritage hotels and eco-resorts",
      icon: Hotel,
      description:
        "From tranquil plantation bungalows nestled in tea estates to heritage homestays, private pool villas, and luxury thatched houseboats, we recommend properties that celebrate their surroundings and offer warm, genuine hospitality.",
      image: "/images/generated/luxury-resort-stay.jpg",
      imageAlt: "Boutique Kerala luxury resort with lakeside infinity pool",
      highlights: ["Authentic architecture", "Intimate boutique settings", "Verified quality"],
    },
    {
      id: "local-experiences",
      title: "Authentic Local Experiences",
      tagline: "Cultural encounters and culinary discoveries",
      icon: Sparkles,
      description:
        "Experience Kerala through the eyes of those who know it best. Walk through private cardamom and pepper plantations, witness Kathakali and classical arts, relish home-cooked sadhya feasts on banana leaves, and canoe through serene village canals.",
      image: "/images/generated/spice-gardens.jpg",
      imageAlt: "Lush pepper vines and cardamom spice garden in Kerala",
      highlights: ["Private estate walks", "Traditional culinary tasting", "Artisan crafts"],
    },
    {
      id: "family-special-interest",
      title: "Family Holidays & Special Interest Journeys",
      tagline: "Memorable getaways designed for every generation",
      icon: Users,
      description:
        "Whether planning a multi-generational family retreat, a bird-watching expedition in Periyar, an architectural exploration of Fort Kochi, or a photography voyage, we balance activities to delight every member of your travelling party.",
      image: "/images/generated/houseboat-backwaters.jpg",
      imageAlt: "Traditional luxury kettuvallam on emerald palm-fringed backwaters",
      highlights: ["Multi-generational pacing", "Specialised themes", "Spacious accommodations"],
    },
    {
      id: "travel-coordination",
      title: "End-to-End Travel Coordination",
      tagline: "Unobtrusive care and effortless continuity",
      icon: CalendarCheck,
      description:
        "From the moment your plane touches down in Kochi or Trivandrum to your departure, every transfer, check-in, and activity is thoughtfully verified. Enjoy total relaxation knowing your journey is looked after by an experienced team.",
      image: "/images/generated/fort-kochi-heritage.jpg",
      imageAlt: "Golden sunset over Fort Kochi Chinese fishing nets",
      highlights: ["Dedicated trip contact", "Seamless transitions", "Complete peace of mind"],
    },
  ];

  return (
    <section id="experiences" className="py-24 sm:py-32 bg-[#FFFCF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-24">
          <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
            Curated Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight mt-2 mb-4">
            Our Signature Experiences
          </h2>
          <div className="w-12 h-[1px] bg-[#8B5E35] my-4" />
          <p className="text-base sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed">
            Every element of your trip is coordinated with refined expertise, ensuring your time in Kerala and South India is spent immersed in comfort, authenticity, and discovery.
          </p>
        </div>

        {/* Alternating Editorial Sections */}
        <div className="space-y-24 sm:space-y-32">
          {experiences.map((exp, index) => {
            const isReversed = index % 2 !== 0;
            const Icon = exp.icon;

            return (
              <div
                key={exp.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? "lg:col-start-6" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-[#E9E0D2] group">
                    <Image
                      src={exp.image}
                      alt={exp.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white/90">
                      <span className="text-xs uppercase tracking-widest font-sans text-[#E9E0D2]">
                        0{index + 1} &mdash; Journeys by Jibu Thomas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Content Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? "lg:col-start-1" : ""
                  }`}
                >
                  <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#E9E0D2]/50 text-[#183D2B] text-xs font-medium">
                    <Icon className="w-3.5 h-3.5 text-[#8B5E35]" />
                    <span>{exp.tagline}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#183D2B] font-light leading-snug">
                    {exp.title}
                  </h3>

                  <p className="text-[#242424]/80 font-sans text-base leading-relaxed font-light">
                    {exp.description}
                  </p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs font-sans tracking-wide px-3 py-1 rounded-md bg-[#FFFCF5] border border-[#8B5E35]/30 text-[#183D2B]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#8B5E35] hover:text-[#183D2B] transition-colors group"
                    >
                      <span>Inquire About This Experience</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
