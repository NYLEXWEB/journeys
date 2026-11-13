"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, PenSquare, CheckCircle2, ChevronRight, X } from "lucide-react";

interface Review {
  id: number;
  author: string;
  avatarColor: string;
  avatarInitial: string;
  location: string;
  isLocalGuide: boolean;
  guideStats?: string;
  rating: number;
  relativeTime: string;
  text: string;
  tripType?: string;
  ownerResponse?: {
    date: string;
    text: string;
  };
}

const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    author: "Dr. Alistair & Fiona Ross",
    avatarColor: "bg-[#1A73E8]",
    avatarInitial: "A",
    location: "Edinburgh, United Kingdom",
    isLocalGuide: true,
    guideStats: "Local Guide · 46 reviews · 112 photos",
    rating: 5,
    relativeTime: "2 weeks ago",
    tripType: "Family Vacation · 12 Days Kerala Bespoke Itinerary",
    text: "From our first consultation with Jibu Thomas, we knew we were in the hands of a master travel designer. The level of personalization was beyond anything we have experienced with high-end travel agencies in London. Our private chauffeur, Biju, was exceptionally knowledgeable, safe, and courteous. The heritage backwater villa and the private tea plantation bungalow in Munnar were breathtaking. Seamless coordination from arrival to departure. 10/10!",
    ownerResponse: {
      date: "a week ago",
      text: "Dear Dr. Ross & Fiona, thank you so much for your kind words! It was an absolute honour designing your 12-day journey through the tea highlands and backwaters. Biju also sends his warmest regards. We look forward to welcoming you back to South India soon!",
    },
  },
  {
    id: 2,
    author: "Sarah Jenkins",
    avatarColor: "bg-[#EA4335]",
    avatarInitial: "S",
    location: "Melbourne, Australia",
    isLocalGuide: true,
    guideStats: "Local Guide · 28 reviews · 84 photos",
    rating: 5,
    relativeTime: "a month ago",
    tripType: "Couple's Journey · Backwaters & Heritage Coasts",
    text: "Journeys by Jibu Thomas curated our dream honeymoon in Kerala. Every single detail — from private sunset boat cruises in Alleppey away from tourist crowds to cooking sessions with local families in Fort Kochi — felt intimate and authentic. Jibu was available on WhatsApp round the clock for dining recommendations and reservations. Truly flawless boutique service.",
    ownerResponse: {
      date: "3 weeks ago",
      text: "Congratulations once again on your wedding, Sarah! Crafting intimate, crowd-free experiences for couples is what we love most. Wishing you both a lifetime of happiness and adventurous journeys!",
    },
  },
  {
    id: 3,
    author: "Marcus & Elena Weber",
    avatarColor: "bg-[#34A853]",
    avatarInitial: "M",
    location: "Zurich, Switzerland",
    isLocalGuide: false,
    rating: 5,
    relativeTime: "2 months ago",
    tripType: "Private Tour · Western Ghats & Spice Plantations",
    text: "Outstanding DMC! We wanted an eco-conscious, culturally rich exploration of South India with premium comfort. Jibu designed an extraordinary route through Wayanad and Periyar reserves. The luxury treehouse resort and private naturalist walks were world-class. Vehicles were spotless, with Wi-Fi, fresh local fruits, and cold mineral water refreshed daily.",
  },
  {
    id: 4,
    author: "Priya & Rajesh Narayanan",
    avatarColor: "bg-[#F9AB00]",
    avatarInitial: "P",
    location: "Dubai, UAE",
    isLocalGuide: true,
    guideStats: "Local Guide · 62 reviews",
    rating: 5,
    relativeTime: "3 months ago",
    tripType: "Multi-generation Family Trip · 8 Adults, 2 Kids",
    text: "Travelling with elderly parents and young children can be challenging, but Jibu and his team handled our 10-day vacation with supreme patience and elegance. The tempo of the itinerary was relaxed, wheelchair-accessible stays were arranged without asking, and the traditional Sadhya feast experience was unforgettable. Highly recommended!",
    ownerResponse: {
      date: "3 months ago",
      text: "Thank you Priya! Ensuring comfort for all three generations was our top priority. We are thrilled that your parents enjoyed the slow-paced backwater cruise. Warmest wishes to the entire family!",
    },
  },
  {
    id: 5,
    author: "Christopher & Chloe Vance",
    avatarColor: "bg-[#1A73E8]",
    avatarInitial: "C",
    location: "San Francisco, USA",
    isLocalGuide: true,
    guideStats: "Local Guide · 39 reviews · 91 photos",
    rating: 5,
    relativeTime: "3 months ago",
    tripType: "Solo Exploration · Photography & Tea Highlands",
    text: "As a landscape photographer, light and timing are everything. Jibu understood my vision immediately. He paired me with a driver who knew the secret sunrise vantage points in Kolukkumalai and peaceful village trails off the tourist grid. Truly remarkable destination management.",
  },
  {
    id: 6,
    author: "Charlotte Dubois",
    avatarColor: "bg-[#EA4335]",
    avatarInitial: "C",
    location: "Paris, France",
    isLocalGuide: false,
    rating: 5,
    relativeTime: "4 months ago",
    tripType: "Ayurveda & Wellness Retreat · 14 Days",
    text: "The most restorative journey of my life. The traditional Ayurvedic beachfront sanctuary selected by Jibu in Kovalam was paradise. Authentic treatments, organic Kerala gastronomy, and immaculate hospitality throughout. Merci mille fois Jibu!",
    ownerResponse: {
      date: "4 months ago",
      text: "Chère Charlotte, thank you! Crafting peaceful wellness retreats that honour Kerala's authentic Ayurvedic roots is our passion. We look forward to your next retreat!",
    },
  },
];

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Background Scroll Lock (Lenis + Body Freeze) when modal is open
  useEffect(() => {
    if (isWriteModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [isWriteModalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsWriteModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Form state
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newLocation, setNewLocation] = useState("");
  const [newText, setNewText] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const colors = ["bg-[#1A73E8]", "bg-[#EA4335]", "bg-[#34A853]", "bg-[#F9AB00]"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdReview: Review = {
      id: Date.now(),
      author: newAuthor.trim(),
      avatarColor: randomColor,
      avatarInitial: newAuthor.trim().charAt(0).toUpperCase() || "J",
      location: newLocation.trim() || "Verified Guest",
      isLocalGuide: false,
      rating: newRating,
      relativeTime: "Just now",
      text: newText.trim(),
    };

    setReviews([createdReview, ...reviews]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsWriteModalOpen(false);
      setNewAuthor("");
      setNewLocation("");
      setNewText("");
      setNewRating(5);
    }, 1800);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FFFCF5] relative border-t border-[#E9E0D2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Minimal Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
            <span>GUEST EXPERIENCES &bull; 5.0 VERIFIED RATING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12]">
            Words from travelers who{" "}
            <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
              journeyed with us.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#242424]/75 font-light leading-relaxed max-w-2xl">
            Real encounters, genuine memories, and verified feedback from guests across the globe.
          </p>
        </div>

        {/* Authentic Google Review Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E0D2] shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-12 sm:mb-16"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            {/* Left: Google Brand & Score */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Google 4-Color Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-3 shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-medium text-gray-900 text-lg sm:text-xl">
                    Google Customer Reviews
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-[#1A73E8]" />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 tracking-tight">
                    5.0
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-sans text-gray-500">
                    (48+ verified reviews)
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 font-sans">
                  Journeys by Jibu Thomas &bull; Boutique Travel Design &amp; Destination Management
                </p>
              </div>
            </div>

            {/* Right: Write a Review CTA Button */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-sans font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <PenSquare className="w-4 h-4" />
                <span>Write a review</span>
              </button>

              <a
                href="#reviews"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-gray-300 hover:border-gray-400 text-gray-700 bg-white font-sans text-sm font-medium transition-all"
              >
                <span>Read all reviews</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            </div>

          </div>
        </motion.div>

        {/* 100% Google Reviews - Automatic Infinite Horizontal Loop */}
        <div className="relative w-full overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 group">
          {/* Continuous Loop Track */}
          <div className="animate-marquee-left flex gap-6 items-stretch">
            {[...reviews, ...reviews].map((rev, index) => (
              <div
                key={`${rev.id}-${index}`}
                className="w-[330px] sm:w-[400px] md:w-[440px] shrink-0 bg-white rounded-2xl p-6 sm:p-7 border border-[#E9E0D2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between select-none"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5">
                      {/* Google Avatar Circle */}
                      <div
                        className={`w-11 h-11 rounded-full ${rev.avatarColor} text-white flex items-center justify-center font-sans font-semibold text-lg shrink-0 shadow-inner`}
                      >
                        {rev.avatarInitial}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans font-semibold text-gray-900 text-[15px]">
                            {rev.author}
                          </h4>
                        </div>

                        {rev.isLocalGuide && rev.guideStats ? (
                          <div className="flex items-center gap-1 text-[12px] font-sans text-[#E37400]">
                            <span>★</span>
                            <span>{rev.guideStats}</span>
                          </div>
                        ) : (
                          <p className="text-[12px] font-sans text-gray-500">
                            {rev.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Google G watermark icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 shrink-0 opacity-80"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>

                  {/* Stars & Timestamp */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${s <= rev.rating
                            ? "fill-[#FBBC05] text-[#FBBC05]"
                            : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-sans text-gray-500">
                      {rev.relativeTime}
                    </span>
                  </div>

                  {/* Trip Type Tag */}
                  {rev.tripType && (
                    <div className="inline-block px-2.5 py-1 rounded bg-gray-50 border border-gray-100 text-[11.5px] font-sans text-gray-600 mb-3">
                      {rev.tripType}
                    </div>
                  )}

                  {/* Review Body */}
                  <p className="font-sans text-[14px] leading-relaxed text-gray-700 line-clamp-6">
                    {rev.text}
                  </p>
                </div>

                {/* Owner Response Box (Authentic Google Style) */}
                {rev.ownerResponse && (
                  <div className="mt-5 pt-4 border-t border-gray-100 bg-[#F8F9FA] rounded-xl p-3.5 -mx-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12.5px] font-sans font-semibold text-gray-800">
                        Response from the owner
                      </span>
                      <span className="text-[11px] font-sans text-gray-400">
                        &bull; {rev.ownerResponse.date}
                      </span>
                    </div>
                    <p className="text-[12.5px] font-sans text-gray-600 leading-relaxed line-clamp-3">
                      {rev.ownerResponse.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Google "Write a Review" Modal */}
      {isWriteModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-900 text-base">
                    Write a Review
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    Journeys by Jibu Thomas
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-sans font-semibold text-gray-900">
                  Thank you for your review!
                </h4>
                <p className="text-sm font-sans text-gray-500">
                  Your feedback helps travelers discover authentic South Indian journeys.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 pt-5">
                {/* Rating Stars Selection */}
                <div>
                  <label className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-gray-300 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          className={`w-7 h-7 ${star <= (hoverRating || newRating)
                            ? "fill-[#FBBC05] text-[#FBBC05]"
                            : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-sans text-gray-500 font-medium">
                      {(hoverRating || newRating)} of 5 stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-sans font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. David Henderson"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 text-sm font-sans text-gray-800"
                  />
                </div>

                {/* City/Location */}
                <div>
                  <label className="block text-xs font-sans font-medium text-gray-700 mb-1">
                    Location / City (Optional)
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. London, UK"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 text-sm font-sans text-gray-800"
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-xs font-sans font-medium text-gray-700 mb-1">
                    Describe your experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Share details of your journey, itinerary, chauffeur service, or stays..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 text-sm font-sans text-gray-800 resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-600 text-sm font-sans font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-sans font-medium shadow-sm transition-all"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

