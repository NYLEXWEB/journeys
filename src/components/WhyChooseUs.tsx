"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Shield,
  Compass,
  HeartHandshake,
  CheckCircle2,
  ArrowUpRight,
  Star,
} from "lucide-react";

export default function WhyChooseUs() {
  const differentiators = [
    {
      number: "01",
      title: "Personally Designed, Never Mass-Produced",
      description:
        "We do not sell pre-packaged group tours or rigid itineraries. Every single journey is custom-curated from a blank canvas to honor your personal style, preferences, and pace.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Local Knowledge, Meaningful Discoveries",
      description:
        "Based in Kerala, our roots and lifelong relationships allow us to unlock quiet plantation trails, authentic dining spots, and private cultural encounters far removed from commercial tourism.",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Private, Flexible & Comfortable",
      description:
        "Travel in immaculate private vehicles with dedicated chauffeurs who prioritize your safety, comfort, and rhythm. Stop whenever a picturesque view or village tea stall catches your eye.",
      icon: Shield,
    },
    {
      number: "04",
      title: "Thoughtful Attention to Detail",
      description:
        "From room orientations capturing the sunrise to dietary considerations and smooth check-ins, our boutique scale ensures meticulous care across every single reservation.",
      icon: HeartHandshake,
    },
    {
      number: "05",
      title: "Transparent & Considered Guidance",
      description:
        "We recommend accommodations and experiences because they are genuinely right for you — not because of commercial commissions. Honest guidance and integrity guide every suggestion.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-36 bg-[#FFFCF5] relative overflow-hidden">
      {/* Subtle organic background curve */}
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-[#E9E0D2]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ------------------------------------------------------------------ */}
        {/* Top Part: "Quiet numbers, loud stories" (Reference Image 2)        */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-24 md:mb-28">
          {/* Left Column: Editorial Headline & Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5 sm:space-y-7"
          >
            <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block">
              By The Numbers &bull; The Boutique Promise
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12] sm:leading-[1.1]">
              Quiet numbers,{" "}
              <span className="italic font-serif text-[#183D2B] font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
                loud stories.
              </span>
            </h2>

            <p className="text-sm sm:text-lg text-[#242424]/85 font-light font-sans leading-relaxed">
              We don&apos;t run at scale. We run at depth &mdash; every booking is a personal collaboration
              between us, our guests, and our local hosts, which is why our volume stays boutique and
              the stories remain unforgettable.
            </p>

            {/* CTA Button & Social Proof Avatars */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2 sm:pt-3">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#183D2B] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#122e20] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-fit"
              >
                <span>Start Planning</span>
                <div className="p-1 rounded-full bg-white/10 group-hover:bg-[#8B5E35] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>

              {/* Loved by travelers badge */}
              <div className="flex items-center gap-3">
                {/* 4 Overlapping Avatar Circles */}
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#183D2B] text-[#FFFCF5] font-serif text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm">
                    A
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8B5E35] text-[#FFFCF5] font-serif text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm">
                    S
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#507C7B] text-[#FFFCF5] font-serif text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm">
                    M
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#242424] text-[#FFFCF5] font-serif text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm">
                    P
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[#8B5E35]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#8B5E35] text-[#8B5E35]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-xs text-[#183D2B] font-medium">
                    Loved by 100+ discerning travellers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Two Overlapping Rounded Floating Cards (Reference Image 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative h-[300px] sm:h-[380px] md:h-[460px]"
          >
            {/* Back Card: Traditional Houseboat in Backwaters */}
            <motion.div
              whileHover={{ y: -6, rotate: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute top-0 right-1 sm:right-6 w-[72%] sm:w-[65%] h-[78%] sm:h-[75%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border-2 sm:border-4 border-white z-10 group"
            >
              <Image
                src="/images/generated/houseboat-backwaters.jpg"
                alt="Luxury houseboat gliding on Kerala backwaters"
                fill
                sizes="(max-width: 768px) 70vw, 35vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 text-white">
                <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-[#E9E0D2]">
                  Private Stay
                </span>
                <p className="font-serif text-xs sm:text-sm">Alleppey Backwaters</p>
              </div>
            </motion.div>

            {/* Front Card: Organic Plantation Walk & Wildlife Encounter */}
            <motion.div
              whileHover={{ y: -6, rotate: -1 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-1 sm:bottom-2 left-1 sm:left-6 w-[70%] sm:w-[62%] h-[72%] sm:h-[70%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(24,61,43,0.22)] border-2 sm:border-4 border-white z-20 group"
            >
              <Image
                src="/images/generated/spice-gardens.jpg"
                alt="Spice garden walk in Kerala"
                fill
                sizes="(max-width: 768px) 68vw, 35vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 text-white">
                <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-[#E9E0D2]">
                  Authentic Immersion
                </span>
                <p className="font-serif text-xs sm:text-sm">Spice Hills of Wayanad</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Bottom Part: 5 Pillars / Why Discerning Travellers Choose Us        */}
        {/* ------------------------------------------------------------------ */}
        <div className="pt-10 sm:pt-16 border-t border-[#E9E0D2]">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Our Five Pillars
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-[#183D2B] font-light">
              Why Discerning Travellers Choose Us
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {differentiators.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E9E0D2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-2xl sm:text-3xl text-[#183D2B] group-hover:text-[#8B5E35] transition-colors">
                        {item.number}
                      </span>
                      <div className="p-2 sm:p-2.5 rounded-full bg-[#E9E0D2]/40 text-[#183D2B] group-hover:bg-[#183D2B] group-hover:text-[#FFFCF5] transition-colors">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl md:text-2xl text-[#183D2B] font-normal leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#242424]/80 font-sans font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#E9E0D2]/50 flex items-center justify-between text-[11px] text-[#507C7B]">
                    <span>Journeys Philosophy</span>
                    <span className="font-serif italic text-[#8B5E35]">Vetted</span>
                  </div>
                </motion.div>
              );
            })}

            {/* Quick Consultation Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#183D2B] text-[#FFFCF5] shadow-lg flex flex-col justify-between space-y-4 border border-[#8B5E35]/40"
            >
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#E9E0D2] font-semibold block">
                  Private Consultation
                </span>
                <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-light text-white leading-snug">
                  Travel, Tailored Around You.
                </h4>
                <p className="text-xs sm:text-sm text-[#FFFCF5]/80 font-sans font-light leading-relaxed">
                  Have specific dates or curiosity about off-the-beaten-path regions? Let us sculpt a
                  custom route for your party.
                </p>
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center justify-between w-full p-3 sm:p-3.5 rounded-full bg-[#8B5E35] hover:bg-[#734b28] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <span>Speak with Jibu Thomas</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
