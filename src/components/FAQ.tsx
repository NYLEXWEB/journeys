"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare, ArrowUpRight } from "lucide-react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export default function FAQ() {
  const content = useWebsiteContent();
  const faqs: FAQItem[] = content?.faqs && content.faqs.length > 0 ? content.faqs : [];

  // Track currently expanded question (null = all collapsed, or id = open)
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 md:py-32 bg-[#FFFCF5] relative overflow-hidden"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#183D2B]/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#8B5E35]/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] uppercase">
              <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
                FREQUENTLY ASKED{" "}
              </span>
              <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
                QUESTIONS
              </span>
            </h2>
            <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-serif italic text-sm sm:text-base text-[#8B5E35] font-light">
              Clear Guidance &bull; Practical Travel Advice
            </span>
          </div>
        </div>

        {/* Lead Subtitle / Editorial Note */}
        <p className="text-sm sm:text-base text-[#242424]/75 font-light leading-relaxed max-w-2xl mb-10 sm:mb-12">
          Everything you need to know before stepping into God&rsquo;s Own Country with Jibu Thomas.
          Direct answers regarding private chauffeurs, pacing, houseboats, and our planning philosophy.
        </p>

        {/* 5-Question Luxury Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            const itemNumber = (index + 1).toString().padStart(2, "0");

            return (
              <motion.div
                key={faq.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl sm:rounded-[1.6rem] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#183D2B]/30 shadow-[0_12px_35px_rgba(24,61,43,0.08)]"
                    : "bg-white/80 hover:bg-white border-[#E9E0D2] hover:border-[#8B5E35]/40 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Header Row: Question + Right-Side Arrow Button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
                    {/* Index Number */}
                    <span
                      className={`font-serif italic text-sm sm:text-base transition-colors shrink-0 ${
                        isOpen ? "text-[#8B5E35]" : "text-[#8B5E35]/70 group-hover:text-[#8B5E35]"
                      }`}
                    >
                      {itemNumber}
                    </span>

                    <div className="space-y-1">
                      {faq.category && (
                        <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8B5E35]">
                          {faq.category}
                        </span>
                      )}
                      <h3
                        className={`text-base sm:text-lg md:text-xl font-medium tracking-tight transition-colors leading-snug ${
                          isOpen
                            ? "text-[#183D2B] font-semibold"
                            : "text-[#242424] group-hover:text-[#183D2B]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Right-Side Arrow Indicator */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#183D2B] border-[#183D2B] text-white rotate-180 shadow-sm"
                        : "bg-[#FFFCF5] border-[#E9E0D2] text-[#183D2B] group-hover:border-[#183D2B] group-hover:bg-[#183D2B]/5"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Expandable Downwards Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 md:px-7 md:pb-8 pt-0 border-t border-[#E9E0D2]/50 text-[#242424]/85 text-xs sm:text-sm md:text-[15px] font-light leading-relaxed">
                        <div className="pt-4 flex items-start gap-3">
                          <span className="text-[#8B5E35] font-serif text-lg leading-none select-none mt-0.5">
                            &ldquo;
                          </span>
                          <p className="flex-1">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Editorial Assistance Box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-[#183D2B] to-[#122A1E] text-white border border-[#8B5E35]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#E9E0D2] font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-[#B87D4B]" />
              Still have a specific question?
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-light text-[#FFFCF5]">
              Speak directly with Jibu Thomas
            </h4>
            <p className="text-xs sm:text-sm text-[#FFFCF5]/75 font-light max-w-xl">
              No call centres or middle-tier agents. Get authentic answers tailored to your travel dates, pace, and private group.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/919447000000?text=Hello%20Jibu,%20I%20have%20a%20question%20regarding%20planning%20a%20Kerala%20journey."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#183D2B] border border-white/30 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              <span>Plan Your Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
