"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="about" className="py-20 sm:py-28 md:py-36 bg-[#FFFCF5] relative overflow-hidden">
      {/* Delicate background aura */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E9E0D2]/25 rounded-full blur-3xl pointer-events-none -mr-36" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#183D2B]/5 rounded-full blur-3xl pointer-events-none -ml-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3 Organic Floating Staggered Photos (Reference Image 3 aesthetic) */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg mx-auto lg:max-w-none h-[420px] sm:h-[500px] md:h-[560px]"
            >
              {/* Photo 1: Top-Left Card (Tea hills & high ranges) */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 w-[58%] h-[56%] rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(24,61,43,0.14)] border-4 border-white z-10 group"
              >
                <Image
                  src="/images/generated/tea-plantation-approach.jpg"
                  alt="Munnar rolling tea plantations in morning mist"
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-medium">
                    Western Ghats
                  </p>
                  <p className="font-serif text-sm text-white/95">Tea Hills &amp; Mist</p>
                </div>
              </motion.div>

              {/* Photo 2: Center-Right Overlapping Card (Fort Kochi / Heritage sunset) */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute top-16 right-0 w-[56%] h-[60%] rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.18)] border-4 border-white z-20 group"
              >
                <Image
                  src="/images/generated/fort-kochi-heritage.jpg"
                  alt="Historic Fort Kochi heritage Chinese fishing nets at twilight"
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-medium">
                    Fort Kochi
                  </p>
                  <p className="font-serif text-sm text-white/95">Heritage &amp; Living Arts</p>
                </div>
              </motion.div>

              {/* Photo 3: Bottom-Left Overlapping Card (Backwaters houseboat) */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-6 sm:left-10 w-[52%] h-[46%] rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(24,61,43,0.18)] border-4 border-white z-30 group"
              >
                <Image
                  src="/images/generated/houseboat-backwaters.jpg"
                  alt="Traditional luxury kettuvallam on emerald backwaters"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-medium">
                    Alleppey
                  </p>
                  <p className="font-serif text-sm text-white/95">Tranquil Waterways</p>
                </div>
              </motion.div>

              {/* Floating Quality Seal Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-3 right-4 sm:right-6 z-40 bg-[#183D2B] text-[#FFFCF5] p-4 rounded-2xl shadow-2xl border border-[#8B5E35]/40 backdrop-blur-md max-w-[190px] hidden sm:block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#8B5E35]" />
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#E9E0D2] font-semibold">
                    100% Bespoke
                  </span>
                </div>
                <p className="font-serif italic text-xs leading-snug text-[#FFFCF5]/90">
                  Every booking is a personal note between us &amp; local partners.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Narrative (Preserved content with reference design elevated) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-7 lg:pl-4"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Who We Are &bull; Kerala &amp; South India</span>
            </div>

            {/* Headline with italic accent word */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#183D2B] font-light leading-[1.12] tracking-tight">
              Kerala, experienced{" "}
              <span className="italic font-normal text-[#183D2B] font-serif underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
                Differently.
              </span>
            </h2>

            {/* Story copy */}
            <div className="space-y-5 text-[#242424]/85 font-sans text-base sm:text-lg leading-relaxed font-light">
              <p className="text-lg sm:text-xl text-[#183D2B] font-serif italic border-l-2 border-[#8B5E35] pl-4 py-1 leading-relaxed">
                &ldquo;We believe Kerala can be experienced differently. Not through rushed
                itineraries or mass-market packages, but through the people, food, traditions, and
                everyday rhythm that make this place what it is.&rdquo;
              </p>

              <p>
                Welcome to <strong>Journeys by Jibu Thomas</strong>, a boutique travel design and
                destination management company based in Kerala, India. We specialise in personalised
                holidays, privately curated journeys, and authentic travel experiences across Kerala
                and South India.
              </p>

              <p className="text-sm sm:text-base text-[#242424]/80">
                Every experience we offer is something we have personally vetted. We grew up here. We
                know who to call, which private plantation door to knock on, and what is genuinely
                worth your time. Nothing on our itineraries is something we would not choose for
                ourselves.
              </p>
            </div>

            {/* Premium CTA Button & Team Signature */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-[#E9E0D2]">
              <Link
                href="#approach"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#183D2B] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#122e20] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 w-fit"
              >
                <span>Read Our Process</span>
                <div className="p-1 rounded-full bg-white/10 group-hover:bg-[#8B5E35] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>

              <div className="text-left sm:text-right">
                <p className="font-serif italic text-lg text-[#183D2B]">
                  Jibu Thomas &amp; Team
                </p>
                <p className="text-xs text-[#8B5E35] font-sans uppercase tracking-widest">
                  Boutique Travel Designers
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E9E0D2]/60">
              <div className="space-y-0.5">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#183D2B]">
                  100%
                </span>
                <p className="text-[11px] font-sans uppercase tracking-wider text-[#242424]/70">
                  Custom Tailored
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#8B5E35]">
                  Private
                </span>
                <p className="text-[11px] font-sans uppercase tracking-wider text-[#242424]/70">
                  Chauffeur &amp; Guide
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#507C7B]">
                  Owner-Led
                </span>
                <p className="text-[11px] font-sans uppercase tracking-wider text-[#242424]/70">
                  Personal Care
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
