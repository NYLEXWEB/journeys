"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function OurApproach() {
  const steps = [
    {
      number: "01",
      title: "Dream a little.",
      eyebrow: "Initial Vision",
      description:
        "Tell us where you want to go, what you enjoy, and your preferred rhythm. That's all we need to begin sculpting a journey tailored around your individuality.",
      icon: Compass,
      image: "/images/generated/tea-plantation-approach.jpg",
      imageAlt: "Misty tea slopes of Munnar",
      highlight: "Personal Conversation",
    },
    {
      number: "02",
      eyebrow: "Bespoke Curation",
      title: "Shape the journey.",
      description:
        "We consult with you directly. Our Kerala team adjusts everything — the boutique heritage stays, private chauffeurs, secret vantage points, and the pace until it fits you flawlessly.",
      icon: Sparkles,
      image: "/images/generated/spice-gardens.jpg",
      imageAlt: "Organic spice gardens and plantation walk",
      highlight: "Hand-Crafted Itinerary",
    },
    {
      number: "03",
      eyebrow: "Seamless Execution",
      title: "Confirm & unwind.",
      description:
        "We coordinate every transfer, accommodation, and private encounter. You simply arrive in South India — every host is vetted, and our team is by your side at every turn.",
      icon: ShieldCheck,
      image: "/images/generated/luxury-resort-stay.jpg",
      imageAlt: "Luxury lakeside resort stay",
      highlight: "Peace of Mind",
    },
  ];

  return (
    <section id="approach" className="py-16 sm:py-24 md:py-36 bg-[#FFFCF5] relative overflow-hidden">
      {/* Subtle organic gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#E9E0D2]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Reference Image 1: Minimal, Editorial & Classy) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-10 sm:mb-16 md:mb-20"
        >
          <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block mb-2 sm:mb-3">
            The Process
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12] sm:leading-[1.1]">
            How a{" "}
            <span className="italic font-serif text-[#183D2B] font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              Journeys
            </span>{" "}
            trip comes together.
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-lg text-[#242424]/80 font-light font-sans leading-relaxed max-w-2xl">
            We don&apos;t build cookie-cutter tours. Here is how our collaborative, unhurried planning
            process brings your bespoke holiday to life.
          </p>
        </motion.div>

        {/* 3 Step Columns with Top Hairline Rule */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, idx) => {
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pt-6 sm:pt-8 border-t border-[#E9E0D2] flex flex-col justify-between transition-all duration-300"
              >
                {/* Top Step Header with Large Italic Number */}
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="font-serif italic text-4xl sm:text-6xl text-[#183D2B] group-hover:text-[#8B5E35] transition-colors duration-300 font-light select-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#183D2B] font-normal mb-2 sm:mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>

                  {/* Body Description */}
                  <p className="text-xs sm:text-base text-[#242424]/80 font-sans font-light leading-relaxed mb-5 sm:mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Micro Visual Card with Hover Zoom */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 border border-[#E9E0D2]/70 mt-2">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/95">
                    <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-[#E9E0D2] font-medium">
                      {step.highlight}
                    </span>
                    <span className="text-xs font-serif italic text-white/80">Journeys</span>
                  </div>
                </div>

                {/* Subtle bottom accent line that glows on hover */}
                <div className="w-full h-0.5 bg-transparent group-hover:bg-[#8B5E35]/60 transition-all duration-500 mt-5 sm:mt-6 rounded-full" />
              </motion.div>
            );
          })}
        </div>

        {/* Process Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-[#E9E0D2] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg sm:text-2xl text-[#183D2B]">
              Ready to sculpt your South India itinerary?
            </h4>
            <p className="text-xs sm:text-sm text-[#242424]/70 font-sans">
              No commitments. A simple, thoughtful conversation with our destination specialists.
            </p>
          </div>

          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#183D2B] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#122e20] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 shrink-0 w-full sm:w-auto"
          >
            <span>Start Planning With Us</span>
            <div className="p-1 rounded-full bg-white/10 group-hover:bg-[#8B5E35] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
