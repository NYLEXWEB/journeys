"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destinations: ["Kerala"],
    travelDates: "",
    travellers: "2 Travellers",
    journeyType: "Signature Journey",
    experiences: [] as string[],
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const experienceList = [
    "Backwater & Houseboat",
    "Hill Stations & Plantation Trails",
    "Nature & Wildlife Safaris",
    "Culture & Heritage Journeys",
    "Beaches & Coastal Escapes",
    "Culinary & Food Experiences",
    "Village & Community Encounters",
  ];

  const handleDestinationToggle = (dest: string) => {
    setFormData((prev) => {
      const exists = prev.destinations.includes(dest);
      if (exists) {
        if (prev.destinations.length === 1) return prev; // keep at least one
        return { ...prev, destinations: prev.destinations.filter((d) => d !== dest) };
      } else {
        return { ...prev, destinations: [...prev.destinations, dest] };
      }
    });
  };

  const handleExperienceToggle = (exp: string) => {
    setFormData((prev) => {
      const exists = prev.experiences.includes(exp);
      return {
        ...prev,
        experiences: exists
          ? prev.experiences.filter((e) => e !== exp)
          : [...prev.experiences, exp],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 bg-[#E9E0D2]/25 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#8B5E35]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#183D2B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold mb-2">
            <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
            <span>7. CONTACT US</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight">
            Begin your conversation with{" "}
            <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              Jibu Thomas.
            </span>
          </h2>
          <p className="mt-2 text-sm text-[#242424]/75 font-light">
            Direct WhatsApp, telephone, or complete the tailored enquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: 7.1 CONTACT DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8B5E35] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Sub-chapter 7.1 &bull; Contact Details</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#183D2B] font-light">
                Direct Access &amp; Concierge Touchpoints
              </h3>
              <p className="text-sm text-[#242424]/80 font-light mt-2 leading-relaxed">
                Connect directly with our team in Kerala. We respond personally to every traveler within 24 hours.
              </p>
            </div>

            {/* Direct WhatsApp Concierge Card */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#183D2B] text-[#FFFCF5] space-y-4 shadow-xl border border-[#25D366]/30 relative overflow-hidden group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <WhatsAppIcon className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium text-white flex items-center gap-2">
                    <span>Direct WhatsApp Concierge</span>
                  </h4>
                  <p className="text-xs text-[#E9E0D2]">Connect directly with Jibu Thomas</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFCF5]/85 leading-relaxed font-light">
                Prefer an unhurried, instant chat? Send us a message on WhatsApp to discuss travel dates,
                private chauffeur transfers, or scenic route options.
              </p>
              <a
                href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20plan%20a%20bespoke%20journey%20to%20Kerala."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md group-hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Contact Details List */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#183D2B]/5 text-[#8B5E35] shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B5E35] font-semibold">
                    Telephone &bull; Concierge
                  </p>
                  <a
                    href="tel:+919447000000"
                    className="font-serif text-lg text-[#183D2B] hover:text-[#8B5E35] transition-colors"
                  >
                    +91 (0) 9447 000 000
                  </a>
                  <p className="text-xs text-[#242424]/60 font-light">Direct desk in Kerala</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-[#E9E0D2]">
                <div className="p-2.5 rounded-xl bg-[#183D2B]/5 text-[#8B5E35] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B5E35] font-semibold">
                    Email Inquiries
                  </p>
                  <a
                    href="mailto:contact@journeysbyjibuthomas.com"
                    className="font-serif text-base sm:text-lg text-[#183D2B] hover:text-[#8B5E35] transition-colors"
                  >
                    contact@journeysbyjibuthomas.com
                  </a>
                  <p className="text-xs text-[#242424]/60 font-light">Detailed itinerary requests</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-[#E9E0D2]">
                <div className="p-2.5 rounded-xl bg-[#183D2B]/5 text-[#8B5E35] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B5E35] font-semibold">
                    Headquarters
                  </p>
                  <p className="font-serif text-base text-[#183D2B]">
                    Kochi, Kerala &bull; South India
                  </p>
                  <p className="text-xs text-[#242424]/60 font-light">
                    Serving Kerala, Tamil Nadu &amp; Karnataka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-[#E9E0D2]">
                <div className="p-2.5 rounded-xl bg-[#183D2B]/5 text-[#8B5E35] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B5E35] font-semibold">
                    Availability
                  </p>
                  <p className="text-xs sm:text-sm text-[#183D2B] font-medium">
                    Monday &ndash; Sunday &bull; 8:00 AM &ndash; 9:00 PM IST
                  </p>
                  <p className="text-xs text-[#242424]/60 font-light">24/7 active on-trip guest guardian desk</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 7.2 ENQUIRY FORM + PLAN YOUR JOURNEY CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white border border-[#E9E0D2] shadow-xl p-6 sm:p-10 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8B5E35] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sub-chapter 7.2 &bull; Enquiry Form</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#183D2B] font-light">
                  Tailored Travel Consultation Form
                </h3>
                <p className="text-xs sm:text-sm text-[#242424]/75 font-light mt-1">
                  Tell us where you wish to go, your dates, and what inspires you. We will craft your custom itinerary.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-[#183D2B]/5 border border-[#183D2B]/20 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#183D2B] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#E9E0D2]" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#183D2B]">
                    Thank You, {formData.fullName || "Friend"}!
                  </h4>
                  <p className="text-sm text-[#242424]/80 font-light max-w-md mx-auto leading-relaxed">
                    Your enquiry has been received directly by Jibu Thomas. We will review your travel preferences
                    and respond with a bespoke itinerary proposal within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-[#183D2B] text-[#183D2B] text-xs uppercase tracking-wider font-medium hover:bg-[#183D2B] hover:text-white transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Fiona Campbell"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm font-light text-[#242424] bg-[#FFFCF5]/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="fiona@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm font-light text-[#242424] bg-[#FFFCF5]/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Travellers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider">
                        Phone / WhatsApp (with country code) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7123 456789"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm font-light text-[#242424] bg-[#FFFCF5]/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider">
                        Number of Travellers
                      </label>
                      <select
                        value={formData.travellers}
                        onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm font-light text-[#242424] bg-[#FFFCF5]/50 transition-colors"
                      >
                        <option>Solo Traveller</option>
                        <option>2 Travellers (Couple / Friends)</option>
                        <option>3 to 4 Travellers (Family / Small Group)</option>
                        <option>5+ Travellers (Multi-generation Family)</option>
                      </select>
                    </div>
                  </div>

                  {/* Destination Selection (Kerala, Tamil Nadu, Karnataka) */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider block">
                      Destinations of Interest (Select All That Apply):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Kerala", "Tamil Nadu", "Karnataka"].map((dest) => {
                        const isSelected = formData.destinations.includes(dest);
                        return (
                          <button
                            type="button"
                            key={dest}
                            onClick={() => handleDestinationToggle(dest)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${isSelected
                                ? "bg-[#183D2B] text-white shadow-sm"
                                : "bg-[#E9E0D2]/50 text-[#242424] hover:bg-[#E9E0D2]"
                              }`}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {dest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Travel Dates & Journey Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider">
                        Approximate Travel Dates / Month
                      </label>
                      <input
                        type="text"
                        value={formData.travelDates}
                        onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                        placeholder="e.g. November 2026, approx 10 days"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm font-light text-[#242424] bg-[#FFFCF5]/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider">
                        Journey Preference
                      </label>
                      <select
                        value={formData.journeyType}
                        onChange={(e) => setFormData({ ...formData, journeyType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm font-light text-[#242424] bg-[#FFFCF5]/50 transition-colors"
                      >
                        <option>Signature Journeys (Select from 5 Curated Routes)</option>
                        <option>Bespoke Journey (100% Tailored from Scratch)</option>
                        <option>Romantic &amp; Honeymoon Escape</option>
                        <option>Family &amp; Senior-Friendly Holiday</option>
                        <option>Nature &amp; Wildlife Expedition</option>
                      </select>
                    </div>
                  </div>

                  {/* Desired Curated Experiences */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider block">
                      Desired Curated Experiences:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {experienceList.map((exp) => {
                        const isChecked = formData.experiences.includes(exp);
                        return (
                          <label
                            key={exp}
                            onClick={() => handleExperienceToggle(exp)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-colors ${isChecked
                                ? "bg-[#183D2B]/10 border-[#183D2B] text-[#183D2B] font-medium"
                                : "bg-[#FFFCF5] border-[#E9E0D2] text-[#242424]/80 hover:bg-[#E9E0D2]/30"
                              }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[10px] ${isChecked
                                  ? "bg-[#183D2B] text-white border-[#183D2B]"
                                  : "border-[#8B5E35]/40"
                                }`}
                            >
                              {isChecked && "✓"}
                            </span>
                            <span>{exp}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Personal Notes / Questions */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#183D2B] uppercase tracking-wider">
                      Tell Us About Your Vision &amp; Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details such as dietary needs, pacing preferences, must-see places, or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm font-light text-[#242424] bg-[#FFFCF5]/50 transition-colors"
                    />
                  </div>

                  {/* THE GRAND CTA BUTTONS */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#E9E0D2]" />
                      <span>{isSubmitting ? "Submitting Request..." : "PLAN YOUR JOURNEY [SUBMIT ENQUIRY]"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 py-1">
                      <div className="flex-1 h-[1px] bg-[#E9E0D2]" />
                      <span className="text-[10px] uppercase tracking-widest text-[#242424]/50 font-semibold">Or Instant WhatsApp</span>
                      <div className="flex-1 h-[1px] bg-[#E9E0D2]" />
                    </div>

                    <a
                      href={`https://wa.me/919447000000?text=${encodeURIComponent(
                        `Hello Jibu, I would like to plan a bespoke journey to South India.\n\nName: ${formData.fullName || "Traveller"
                        }\nDestinations: ${formData.destinations.join(", ")}\nDates: ${formData.travelDates || "Flexible"
                        }\nTravel Style: ${formData.journeyType}\nTravellers: ${formData.travellers}\nSpecial Notes: ${formData.message || "None"
                        }`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-95"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Send Enquiry via WhatsApp</span>
                    </a>

                    <p className="text-[11px] text-center text-[#242424]/60 font-light mt-2.5">
                      🔒 No obligations &bull; 100% Tailor-made &bull; Direct consultation with Jibu Thomas
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

