"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    travelMonth: "",
    duration: "7 to 10 days",
    travellers: "2 Adults",
    states: ["Kerala"],
    experiences: ["Backwater & Houseboat", "Hill Stations & Tea Trails"],
    accommodationTier: "Heritage Bungalows & Luxury Boutique",
    dietaryNotes: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-fill destination if passed via URL query
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dest = params.get("destination");
      if (dest) {
        setFormData((prev) => ({
          ...prev,
          message: `I am interested in curating an itinerary featuring ${dest}.`,
        }));
      }
    }
  }, []);

  const handleStateToggle = (st: string) => {
    setFormData((prev) => {
      const exists = prev.states.includes(st);
      if (exists) {
        if (prev.states.length === 1) return prev;
        return { ...prev, states: prev.states.filter((s) => s !== st) };
      }
      return { ...prev, states: [...prev.states, st] };
    });
  };

  const handleExpToggle = (exp: string) => {
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
      window.scrollTo({ top: 200, behavior: "smooth" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35] hover:text-[#183D2B] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#E9E0D2]">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
            <span>BESPOKE JOURNEY PLANNER &bull; ATELIER CONSULTATION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08] max-w-4xl">
            Let us craft your journey,{" "}
            <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              from a blank canvas.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed max-w-3xl">
            Every itinerary is personally curated by Jibu Thomas. Share your preliminary thoughts below or contact us directly on WhatsApp.
          </p>

          {/* Instant WhatsApp Pill Card */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-[#E9E0D2] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8B5E35] font-semibold block">
                  Prefer a Direct Voice or Chat?
                </span>
                <span className="text-sm font-serif text-[#183D2B]">
                  Connect immediately with Jibu on WhatsApp
                </span>
              </div>
            </div>

            <a
              href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20plan%20a%20private%20journey%20to%20South%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp Jibu Directly</span>
            </a>
          </div>
        </header>

        {/* Content Section: Form & Details */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8">
              {isSubmitted ? (
                <div className="p-8 sm:p-14 rounded-[2.5rem] bg-white border border-[#E9E0D2] shadow-xl text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-[#183D2B]/10 text-[#183D2B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#183D2B]">
                    Your Journey Details Have Been Received
                  </h2>
                  <p className="text-sm sm:text-base text-[#242424]/80 font-light leading-relaxed max-w-lg mx-auto">
                    Thank you, {formData.fullName || "valued guest"}. Jibu Thomas is personally reviewing your dates and preferences. You will receive a thoughtful response within two hours.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/"
                      className="px-8 py-3.5 rounded-full bg-[#183D2B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8B5E35] transition-all"
                    >
                      Return to Homepage
                    </Link>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3.5 rounded-full border border-[#E9E0D2] text-[#183D2B] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-all"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#E9E0D2] shadow-[0_15px_45px_rgba(24,61,43,0.06)] space-y-8"
                >
                  {/* Step 1: Contact Details */}
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8B5E35] font-semibold block">
                      01 &bull; Your Information
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Eleanor & David Vance"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="eleanor@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                          WhatsApp or Telephone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+44 7700 900077"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                          Country of Residence
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. United Kingdom / USA / Australia"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Trip Timing & Travellers */}
                  <div className="space-y-4 pt-6 border-t border-[#E9E0D2]">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8B5E35] font-semibold block">
                      02 &bull; Timing &amp; Party Size
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                          Estimated Month / Year
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dec 2026 / Jan 2027"
                          value={formData.travelMonth}
                          onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                          Trip Duration
                        </label>
                        <select
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
                        >
                          <option>5 to 7 days</option>
                          <option>7 to 10 days</option>
                          <option>10 to 14 days</option>
                          <option>14 to 21 days</option>
                          <option>Over 3 weeks</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold block mb-1.5">
                          Party Size
                        </label>
                        <select
                          value={formData.travellers}
                          onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
                        >
                          <option>Solo Traveller</option>
                          <option>Couple (2 Adults)</option>
                          <option>Small Family (3–4)</option>
                          <option>Multi-Generational Family (5+)</option>
                          <option>Private Group of Friends</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Destinations of Interest */}
                  <div className="space-y-4 pt-6 border-t border-[#E9E0D2]">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8B5E35] font-semibold block">
                      03 &bull; Regions You Wish to Traverse
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {["Kerala", "Tamil Nadu", "Karnataka"].map((st) => {
                        const isSelected = formData.states.includes(st);
                        return (
                          <button
                            type="button"
                            key={st}
                            onClick={() => handleStateToggle(st)}
                            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#183D2B] text-white shadow-sm"
                                : "bg-[#FFFCF5] text-[#183D2B] border border-[#E9E0D2] hover:border-[#183D2B]"
                            }`}
                          >
                            {isSelected ? `✓ ${st}` : `+ ${st}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Experiences */}
                  <div className="space-y-4 pt-6 border-t border-[#E9E0D2]">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8B5E35] font-semibold block">
                      04 &bull; Preferred Experiences
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "Backwater & Houseboat",
                        "Hill Stations & Tea Trails",
                        "Nature & Wildlife Safaris",
                        "Culture & Temple Heritage",
                        "Beaches & Coastal Hideaways",
                        "Culinary & Village Cooking",
                        "Authentic Ayurvedic Rejuvenation",
                        "Gentle Walking & Nature Hikes",
                      ].map((exp) => {
                        const checked = formData.experiences.includes(exp);
                        return (
                          <button
                            type="button"
                            key={exp}
                            onClick={() => handleExpToggle(exp)}
                            className={`p-3 rounded-xl text-left text-xs transition-all flex items-center justify-between border cursor-pointer ${
                              checked
                                ? "bg-[#183D2B]/5 border-[#183D2B] text-[#183D2B] font-semibold"
                                : "bg-[#FFFCF5] border-[#E9E0D2] text-[#242424]/75 hover:border-[#8B5E35]"
                            }`}
                          >
                            <span>{exp}</span>
                            {checked && <Check className="w-3.5 h-3.5 text-[#183D2B]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 5: Notes & Questions */}
                  <div className="space-y-4 pt-6 border-t border-[#E9E0D2]">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8B5E35] font-semibold block">
                      05 &bull; Personal Vision &amp; Special Requests
                    </span>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share anything that matters to you: special dietary needs, mobility considerations, flight arrival cities, or milestones you are celebrating..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-sm text-[#242424] placeholder-[#242424]/40 focus:outline-none focus:border-[#183D2B] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Curating Your Enquiry...</span>
                      ) : (
                        <>
                          <span>Submit Bespoke Journey Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center text-[#242424]/60 font-light mt-3">
                      We respect your privacy. No spam, no outsourced third-party calls.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Column: Office & Standards */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-[#E9E0D2] shadow-sm space-y-5">
                <span className="text-xs uppercase tracking-widest text-[#8B5E35] font-semibold block">
                  Kerala Atelier &bull; Contact
                </span>

                <div className="space-y-4 text-xs text-[#242424]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#183D2B] block">Registered Office</strong>
                      <span>Kochi, Kerala &bull; South India</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#183D2B] block">Direct Line</strong>
                      <a href="tel:+919447000000" className="hover:text-[#183D2B]">
                        +91 (0) 9447 000 000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#183D2B] block">Direct Email</strong>
                      <a href="mailto:contact@journeysbyjibuthomas.com" className="hover:text-[#183D2B]">
                        contact@journeysbyjibuthomas.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#183D2B] block">Concierge Hours</strong>
                      <span>Mon – Sat &bull; 09:00 – 19:00 IST</span>
                      <p className="text-[11px] text-[#242424]/60 mt-0.5">
                        (Active guest on-ground emergency line: 24/7)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Four Guarantees */}
              <div className="p-6 sm:p-8 rounded-[2rem] bg-[#183D2B] text-white shadow-md space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#E9E0D2] font-semibold block">
                  The Boutique Commitment
                </span>
                <div className="space-y-3 text-xs text-[#FFFCF5]/85 font-light">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E9E0D2]" />
                    <span>Direct personal accountability with Jibu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E9E0D2]" />
                    <span>100% private, sanitized air-conditioned fleet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E9E0D2]" />
                    <span>Zero tourist commission shopping stops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E9E0D2]" />
                    <span>Real-time on-ground WhatsApp support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

