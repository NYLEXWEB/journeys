"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCircle2, PhoneCall, Mail, MapPin, Sparkles } from "lucide-react";

export default function PlanYourJourney() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "Kerala Highlights",
    travelDates: "",
    travellers: "2 Travellers",
    preferences: [] as string[],
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const preferenceOptions = [
    "Emerald Backwaters & Houseboat",
    "Munnar & Tea Hills",
    "Heritage & Architecture (Fort Kochi)",
    "Wildlife & Nature (Periyar / Wayanad)",
    "Coastal & Beach Hideaways",
    "Ayurvedic & Wellness Retreats",
    "Culinary & Spice Plantations",
    "Tamil Nadu / Karnataka Extension",
  ];

  const handleCheckboxToggle = (pref: string) => {
    setFormData((prev) => {
      const exists = prev.preferences.includes(pref);
      return {
        ...prev,
        preferences: exists
          ? prev.preferences.filter((p) => p !== pref)
          : [...prev.preferences, pref],
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries & Boutique Promise */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold block">
                Start Planning
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.1]">
                Your Journey Begins{" "}
                <span className="italic font-serif text-[#183D2B] underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
                  Here.
                </span>
              </h2>
              <div className="w-12 h-[1px] bg-[#8B5E35] my-4" />
              <p className="text-base sm:text-lg text-[#242424]/85 font-light font-sans leading-relaxed">
                Tell us what inspires you, and we&apos;ll help you create an itinerary that reflects
                who you are, what you enjoy, and how you wish to experience South India.
              </p>
            </div>

            {/* Direct WhatsApp Consultation Card */}
            <div className="p-7 rounded-3xl bg-[#183D2B] text-[#FFFCF5] space-y-4 shadow-xl border border-[#8B5E35]/40 relative overflow-hidden group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#8B5E35] text-[#FFFCF5] group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-white">
                    Direct WhatsApp Consultation
                  </h3>
                  <p className="text-xs text-[#E9E0D2]">Connect directly with Jibu Thomas &amp; Team</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFCF5]/85 leading-relaxed font-light">
                Prefer an immediate, unhurried conversation? Reach us on WhatsApp to discuss travel
                dates, private chauffeurs, or bespoke route ideas.
              </p>
              <a
                href="https://wa.me/910000000000?text=Hello%20Journeys%20by%20Jibu%20Thomas%2C%20I%20would%20like%20to%20plan%20a%20personalised%20journey."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#8B5E35] hover:bg-[#734b28] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium transition-all shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95"
              >
                <span>Chat via WhatsApp (Placeholder)</span>
              </a>
            </div>

            {/* Boutique Office Details */}
            <div className="space-y-4 pt-4 border-t border-[#E9E0D2]">
              <h4 className="text-xs uppercase tracking-widest text-[#183D2B] font-semibold">
                Destination Management Office
              </h4>
              <div className="space-y-3 text-sm text-[#242424]/80 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                  <span>Kerala, India &mdash; Boutique Travel Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#8B5E35] shrink-0" />
                  <span>contact@journeysbyjibuthomas.com (Placeholder)</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-[#8B5E35] shrink-0" />
                  <span>+91 (0) 000 000 0000 (Placeholder)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tailored Consultation Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FFFCF5] p-7 sm:p-10 rounded-3xl shadow-xl border border-[#E9E0D2] relative">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#183D2B]/10 text-[#183D2B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#183D2B]">
                    Thank You, {formData.fullName || "Valued Traveller"}.
                  </h3>
                  <p className="text-base text-[#242424]/80 max-w-md mx-auto font-light leading-relaxed">
                    Your journey consultation has been received with care. Our boutique travel designer
                    will review your preferences and get in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        destination: "Kerala Highlights",
                        travelDates: "",
                        travellers: "2 Travellers",
                        preferences: [],
                        message: "",
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full border border-[#183D2B] text-[#183D2B] text-xs uppercase tracking-wider font-medium hover:bg-[#183D2B] hover:text-[#FFFCF5] transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-[#E9E0D2] pb-3 mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#8B5E35]" />
                      <span className="text-xs uppercase tracking-widest text-[#8B5E35] font-semibold">
                        Personal Consultation
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-normal">
                      Bespoke Itinerary Planning
                    </h3>
                    <p className="text-xs sm:text-sm text-[#242424]/70 mt-1 font-light">
                      Share your preliminary wishes so we can curate the ideal exploration.
                    </p>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] bg-white focus:outline-none focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. eleanor@example.com"
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] bg-white focus:outline-none focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +44 7700 900077"
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] bg-white focus:outline-none focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-1.5">
                        Preferred Destinations
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) =>
                          setFormData({ ...formData, destination: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] bg-white focus:outline-none focus:border-[#183D2B] text-sm text-[#242424]"
                      >
                        <option value="Kerala Highlights">Classic Kerala (Kochi, Munnar, Backwaters)</option>
                        <option value="Munnar & Tea Hills">Munnar &amp; Wayanad Mountains</option>
                        <option value="Alleppey & Kumarakom">Backwaters &amp; Houseboat Retreat</option>
                        <option value="Wildlife & Nature">Thekkady &amp; Wildlife Reserves</option>
                        <option value="Beaches & Coastline">Varkala &amp; Kovalam Coast</option>
                        <option value="South India Grand Tour">Kerala + Tamil Nadu &amp; Karnataka</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-1.5">
                        Target Travel Dates / Season
                      </label>
                      <input
                        type="text"
                        value={formData.travelDates}
                        onChange={(e) =>
                          setFormData({ ...formData, travelDates: e.target.value })
                        }
                        placeholder="e.g. Winter 2026 / Nov-Dec"
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] bg-white focus:outline-none focus:border-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-1.5">
                        Number of Travellers
                      </label>
                      <select
                        value={formData.travellers}
                        onChange={(e) =>
                          setFormData({ ...formData, travellers: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] bg-white focus:outline-none focus:border-[#183D2B] text-sm text-[#242424]"
                      >
                        <option value="Solo Traveller">Solo Traveller</option>
                        <option value="Couple (2 Travellers)">Couple (2 Travellers)</option>
                        <option value="Small Family (3-4 Travellers)">Small Family (3-4 Travellers)</option>
                        <option value="Extended Family (5+ Travellers)">Extended Family (5+ Travellers)</option>
                        <option value="Private Group">Private Group</option>
                      </select>
                    </div>
                  </div>

                  {/* Travel Preferences */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-2.5">
                      Travel Interests &amp; Themes
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {preferenceOptions.map((pref) => {
                        const checked = formData.preferences.includes(pref);
                        return (
                          <button
                            type="button"
                            key={pref}
                            onClick={() => handleCheckboxToggle(pref)}
                            className={`px-3.5 py-2.5 text-left rounded-xl text-xs font-sans transition-all flex items-center justify-between border ${
                              checked
                                ? "bg-[#183D2B] text-[#FFFCF5] border-[#183D2B] shadow-sm"
                                : "bg-white text-[#242424] border-[#E9E0D2] hover:border-[#8B5E35]"
                            }`}
                          >
                            <span>{pref}</span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] transition-colors ${
                                checked
                                  ? "border-white bg-[#8B5E35] text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {checked ? "✓" : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-1.5">
                      Additional Wishes or Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about special pacing, celebrations, dietary wishes, or particular places you dream of..."
                      className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] bg-white focus:outline-none focus:border-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-4 rounded-full bg-[#183D2B] hover:bg-[#122e20] text-[#FFFCF5] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md hover:shadow-2xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Consultation Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#E9E0D2] group-hover:translate-x-1 transition-transform" />
                        <span>Send Journey Consultation</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
