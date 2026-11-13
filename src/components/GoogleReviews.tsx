"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, PenSquare, CheckCircle2, ChevronRight, X } from "lucide-react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

interface Review {
  id?: number | string;
  _id?: string;
  author: string;
  avatarColor?: string;
  avatarInitial?: string;
  location: string;
  isLocalGuide?: boolean;
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
  const content = useWebsiteContent();
  const activeReviews: Review[] =
    content.reviews && content.reviews.length > 0
      ? content.reviews
      : REVIEWS_DATA;

  const [reviews, setReviews] = useState<Review[]>(activeReviews);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (content.reviews && content.reviews.length > 0) {
      setReviews(content.reviews);
    }
  }, [content.reviews]);

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
    <section id="reviews" className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 bg-[#FFFCF5] relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8B5E35] to-[#B37D47] shadow-sm shrink-0" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold tracking-[0.12em] uppercase">
            <span className="bg-gradient-to-r from-[#183D2B] via-[#1E4A35] to-[#27593D] bg-clip-text text-transparent">
              GOOGLE{" "}
            </span>
            <span className="bg-gradient-to-r from-[#8B5E35] via-[#B87D4B] to-[#8B5E35] bg-clip-text text-transparent">
              REVIEWS
            </span>
          </h2>
          <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#8B5E35]/50 to-transparent" />
        </div>

        {/* Compact Authentic Google Review Header Bar (Seamlessly merged with Journeys brand theme) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="bg-[#FAF6EF] rounded-2xl p-4 sm:p-5 border border-[#E9E0D2] mb-5 sm:mb-7"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">

            {/* Left: Google Brand & Score */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              {/* Google 4-Color Icon in clean container */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#E9E0D2] flex items-center justify-center p-2.5 shrink-0">
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
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-sans font-semibold text-[#183D2B] text-base sm:text-lg">
                    Google Customer Reviews
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] text-[11px] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Business
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xl sm:text-2xl font-sans font-bold text-[#183D2B] tracking-tight">
                    5.0
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-sans text-[#8B5E35] font-medium">
                    (48+ verified reviews)
                  </span>
                  <span className="text-xs text-[#242424]/30 hidden sm:inline">&bull;</span>
                  <span className="text-xs text-[#242424]/65 font-sans hidden sm:inline">
                    Journeys by Jibu Thomas &bull; Boutique Travel Design &amp; Destination Management
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-sans font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Write a review</span>
              </button>

              <a
                href="#reviews"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full border border-[#E9E0D2] hover:border-[#183D2B] hover:text-[#183D2B] text-[#242424]/80 bg-white/70 font-sans text-xs sm:text-sm font-medium transition-all"
              >
                <span>Read all</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8B5E35]" />
              </a>
            </div>

          </div>
        </motion.div>

        {/* 100% Google Reviews - Automatic Infinite Horizontal Loop (Clean, Zero White Shadows, Compact Cards) */}
        <div className="relative w-full overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 group">
          {/* Continuous Loop Track */}
          <div className="animate-marquee-left flex gap-4 sm:gap-5 items-stretch">
            {[...reviews, ...reviews].map((rev, index) => {
              const avatarBg = rev.avatarColor || "bg-[#1A73E8]";
              const avatarLetter = rev.avatarInitial || rev.author?.charAt(0)?.toUpperCase() || "J";
              const itemKey = `${rev.id || rev._id || index}-${index}`;

              return (
                <div
                  key={itemKey}
                  className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 bg-[#FAF6EF]/90 hover:bg-[#FAF6EF] rounded-2xl p-4 sm:p-5 border border-[#E9E0D2] hover:border-[#8B5E35]/50 transition-all duration-300 flex flex-col justify-between select-none"
                >
                  <div>
                    {/* Reviewer Header */}
                    <div className="flex items-start justify-between gap-2.5 mb-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Google Avatar Circle */}
                        <div
                          className={`w-9 h-9 rounded-full ${avatarBg} text-white flex items-center justify-center font-sans font-semibold text-sm shrink-0`}
                        >
                          {avatarLetter}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-sans font-semibold text-[#183D2B] text-[13.5px] truncate">
                            {rev.author}
                          </h4>

                          {rev.isLocalGuide && rev.guideStats ? (
                            <div className="flex items-center gap-1 text-[11px] font-sans text-[#E37400]">
                              <span>★</span>
                              <span className="truncate">{rev.guideStats}</span>
                            </div>
                          ) : (
                            <p className="text-[11px] font-sans text-[#242424]/60 truncate">
                              {rev.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Google G watermark icon */}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 shrink-0 opacity-80"
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
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating
                                ? "fill-[#FBBC05] text-[#FBBC05]"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-sans text-[#242424]/55">
                        {rev.relativeTime}
                      </span>
                    </div>

                    {/* Trip Type Tag in brand style */}
                    {rev.tripType && (
                      <div className="inline-block px-2 py-0.5 rounded bg-[#E9E0D2]/50 border border-[#E9E0D2] text-[10.5px] font-sans text-[#8B5E35] mb-2 truncate max-w-full">
                        {rev.tripType}
                      </div>
                    )}

                    {/* Review Body */}
                    <p className="font-sans text-[12.5px] sm:text-[13px] leading-relaxed text-[#242424]/85 line-clamp-3 sm:line-clamp-4 break-words">
                      {rev.text}
                    </p>
                  </div>

                  {/* Owner Response Box (Journeys & Google merged theme) */}
                  {rev.ownerResponse && (
                    <div className="mt-3 pt-2 border-t border-[#E9E0D2]/70 bg-[#183D2B]/[0.035] border-l-2 border-[#183D2B] rounded-r-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[11.5px] font-sans font-semibold text-[#183D2B]">
                          Response from Jibu Thomas
                        </span>
                        <span className="text-[10px] font-sans text-[#242424]/50">
                          &bull; {rev.ownerResponse.date}
                        </span>
                      </div>
                      <p className="text-[11.5px] font-sans text-[#242424]/75 leading-relaxed line-clamp-2 break-words">
                        {rev.ownerResponse.text}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Google "Write a Review" Modal (Merged Brand Theme) */}
      {isWriteModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            data-lenis-prevent="true"
            className="bg-[#FFFCF5] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E9E0D2] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E0D2]/70">
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
                  <h3 className="font-sans font-semibold text-[#183D2B] text-base">
                    Write a Review
                  </h3>
                  <p className="text-xs text-[#8B5E35] font-sans">
                    Journeys by Jibu Thomas &bull; Google Business Profile
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#E9E0D2]/40 text-[#242424]/60 hover:text-[#183D2B] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#183D2B]/10 text-[#183D2B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-sans font-semibold text-[#183D2B]">
                  Thank you for your review!
                </h4>
                <p className="text-sm font-sans text-[#242424]/70">
                  Your feedback helps travelers discover authentic South Indian journeys.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 pt-5">
                {/* Rating Stars Selection */}
                <div>
                  <label className="block text-xs font-sans font-medium text-[#242424]/80 mb-1.5">
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
                          className={`w-7 h-7 ${
                            star <= (hoverRating || newRating)
                              ? "fill-[#FBBC05] text-[#FBBC05]"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-sans text-[#8B5E35] font-medium">
                      {(hoverRating || newRating)} of 5 stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-sans font-medium text-[#242424]/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. David Henderson"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9E0D2] focus:outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 text-sm font-sans text-gray-800 bg-white"
                  />
                </div>

                {/* City/Location */}
                <div>
                  <label className="block text-xs font-sans font-medium text-[#242424]/80 mb-1">
                    Location / City (Optional)
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. London, UK"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9E0D2] focus:outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 text-sm font-sans text-gray-800 bg-white"
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-xs font-sans font-medium text-[#242424]/80 mb-1">
                    Describe your experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Share details of your journey, itinerary, chauffeur service, or stays..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9E0D2] focus:outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 text-sm font-sans text-gray-800 resize-none bg-white"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#E9E0D2] text-[#242424]/70 text-sm font-sans font-medium hover:bg-[#FAF6EF] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-sans font-medium transition-all"
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

