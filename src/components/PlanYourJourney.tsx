"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2, PhoneCall, Mail, MapPin } from "lucide-react";

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
    // Simulate luxury enquiry processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#E9E0D2]/35 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries & Boutique Promise */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
                Start Planning
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.15]">
                Your Journey Begins Here.
              </h2>
              <div className="w-12 h-[1px] bg-[#8B5E35] my-4" />
              <p className="text-base sm:text-lg text-[#242424]/85 font-light font-sans leading-relaxed">
                Tell us what inspires you, and we&apos;ll help you create a journey that feels uniquely yours.
              </p>
            </div>

            {/* Prominent WhatsApp Enquiry CTA */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#183D2B] text-[#FFFCF5] space-y-4 shadow-lg border border-[#8B5E35]/40">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#8B5E35] text-[#FFFCF5]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium">Direct WhatsApp Consultation</h3>
                  <p className="text-xs text-[#E9E0D2]">Connect directly with our boutique planning team</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFCF5]/85 leading-relaxed font-light">
                Prefer a swift conversation? Message us on WhatsApp to discuss travel dates, private chauffeurs, or bespoke route ideas.
              </p>
              <a
                href="https://wa.me/910000000000?text=Hello%20Journeys%20by%20Jibu%20Thomas%2C%20I%20would%20like%20to%20plan%20a%20personalised%20journey."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#8B5E35] hover:bg-[#734b28] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium transition-all shadow-md hover:shadow-lg"
              >
                <span>Chat via WhatsApp (Placeholder)</span>
              </a>
            </div>

            {/* Boutique Office Details (Clear Placeholders as requested) */}
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
          </div>

          {/* Right Column: Tailored Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFCF5] p-8 sm:p-10 rounded-3xl shadow-xl border border-[#E9E0D2] relative">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#183D2B]/10 text-[#183D2B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#183D2B]">
                    Thank You, {formData.fullName || "Valued Traveller"}.
                  </h3>
                  <p className="text-base text-[#242424]/80 max-w-md mx-auto font-light leading-relaxed">
                    Your journey inquiry has been received with care. Our boutique travel designer will review your preferences and get in touch within 24 hours.
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
                    <h3 className="font-serif text-2xl text-[#183D2B] font-normal">
                      Bespoke Itinerary Consultation
                    </h3>
                    <p className="text-xs text-[#242424]/70 mt-1 font-light">
                      Please share your preliminary details so we can tailor the ideal exploration.
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
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] focus:outline-none focus:border-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] focus:outline-none focus:border-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] focus:outline-none focus:border-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] focus:outline-none focus:border-[#183D2B] text-sm text-[#242424]"
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
                        placeholder="e.g. November 2026 or Winter Season"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] focus:outline-none focus:border-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] focus:outline-none focus:border-[#183D2B] text-sm text-[#242424]"
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
                    <label className="block text-xs uppercase tracking-wider text-[#183D2B] font-medium mb-2">
                      Travel Interests &amp; Preferences
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {preferenceOptions.map((pref) => {
                        const checked = formData.preferences.includes(pref);
                        return (
                          <button
                            type="button"
                            key={pref}
                            onClick={() => handleCheckboxToggle(pref)}
                            className={`px-3 py-2 text-left rounded-lg text-xs font-sans transition-all flex items-center justify-between border ${checked
                              ? "bg-[#183D2B] text-[#FFFCF5] border-[#183D2B]"
                              : "bg-[#FFFCF5] text-[#242424] border-[#E9E0D2] hover:border-[#8B5E35]"
                              }`}
                          >
                            <span>{pref}</span>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[10px] ${checked
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
                      Additional Wishes or Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share any special interests, preferred pace, dietary needs, or dream destinations..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] focus:outline-none focus:border-[#183D2B] text-sm text-[#242424] placeholder:text-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#183D2B] hover:bg-[#122e20] text-[#FFFCF5] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Consultation Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#E9E0D2]" />
                        <span>Send Journey Consultation</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

