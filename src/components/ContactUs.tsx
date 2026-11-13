"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { INITIAL_CONTACT_INFO } from "@/lib/seedData";

export default function ContactUs() {
  const content = useWebsiteContent();
  const contact = content.contactInfo || INITIAL_CONTACT_INFO;

  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: "",
    travelDates: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8B5E35]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] uppercase">
              <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
                PLAN YOUR{" "}
              </span>
              <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
                JOURNEY
              </span>
            </h2>
            <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
          </div>
          <p className="font-serif italic text-sm sm:text-base text-[#8B5E35]">
            &ldquo;Your Kerala journey should feel like yours.&rdquo;
          </p>
        </div>

        {/* Minimal 2-Column Compact Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Contact & Link to Full Planner */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct WhatsApp Card */}
            <div className="p-5 sm:p-6 rounded-[2rem] bg-white border border-[#E9E0D2] shadow-sm space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8B5E35] font-semibold block">
                    Fastest Response
                  </span>
                  <span className="font-serif text-lg text-[#183D2B]">WhatsApp Concierge</span>
                </div>
              </div>

              <p className="text-xs text-[#242424]/75 font-light leading-relaxed break-words">
                {contact.consultationNote || "Connect directly with Jibu Thomas for instant advice, route feasibility, and quick date inquiries."}
              </p>

              <a
                href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(contact.whatsappPrefill || "Hello Jibu, I would like to consult about a journey to Kerala.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>{contact.displayPhone || contact.phoneNumber}</span>
              </a>
            </div>

            {/* Direct Telephone & Atelier Details */}
            <div className="p-5 sm:p-6 rounded-[2rem] bg-white border border-[#E9E0D2] shadow-sm space-y-3 text-xs text-[#242424]/80">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8B5E35] shrink-0" />
                <a href={`tel:${contact.phoneNumber.replace(/[^0-9+]/g, "")}`} className="hover:text-[#183D2B] font-medium">
                  {contact.displayPhone || contact.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8B5E35] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#183D2B] break-all">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#8B5E35] shrink-0" />
                <span className="break-words">{contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#8B5E35] shrink-0" />
                <span>{contact.officeHours}</span>
              </div>
            </div>

            {/* Link to Full Comprehensive Bespoke Planner */}
            <div className="p-5 rounded-2xl bg-[#183D2B]/5 border border-[#183D2B]/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-serif text-[#183D2B] font-medium block">
                  Detailed Itinerary Planning?
                </span>
                <span className="text-[11px] text-[#242424]/70 font-light">
                  Submit specific flight, stay &amp; dietary preferences
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-[11px] uppercase tracking-wider font-semibold transition-all shrink-0 shadow-sm"
              >
                <span>Full Planner</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Streamlined 4-Field Consultation Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-7 lg:p-8 rounded-[2.2rem] bg-white border border-[#E9E0D2] shadow-[0_12px_40px_rgba(24,61,43,0.06)]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#183D2B]/10 text-[#183D2B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#183D2B]">Thank You</h3>
                  <p className="text-sm text-[#242424]/75 font-light max-w-md mx-auto leading-relaxed">
                    Your enquiry has been delivered directly to Jibu Thomas. We will respond within two hours with preliminary ideas.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: "", contactInfo: "", travelDates: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#8B5E35] hover:underline font-semibold pt-2"
                  >
                    <span>Send Another Enquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] placeholder-[#242424]/40 focus:outline-none focus:border-[#183D2B] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                        WhatsApp or Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+44 7700 900077 or email"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] placeholder-[#242424]/40 focus:outline-none focus:border-[#183D2B] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                      Approximate Travel Dates / Month
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. November 2026, 10–12 days"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] placeholder-[#242424]/40 focus:outline-none focus:border-[#183D2B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                      Dream Destinations or Travel Style
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. We are interested in tea plantations in Munnar, backwater houseboats, and gentle village walks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] placeholder-[#242424]/40 focus:outline-none focus:border-[#183D2B] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Sending Request...</span>
                      ) : (
                        <>
                          <span>Send My Journey Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-[#242424]/60 font-light mt-2.5">
                      No spam, no automated cold calls. Direct consultation with Jibu Thomas.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
