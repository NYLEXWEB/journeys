"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface Article {
  id: string;
  issueNumber: string;
  category: string;
  categoryKey: "timing" | "duration" | "destinations" | "stays" | "family";
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
  takeaways: string[];
  fullTips: string[];
}

const ARTICLES: Article[] = [
  {
    id: "best-time-to-visit-kerala",
    issueNumber: "No. 01 &bull; Seasonal Rhythms",
    category: "When to Visit",
    categoryKey: "timing",
    title: "The Truth About When to Visit Kerala: Monsoons, Mist & Winter",
    subtitle: "Why the 'off-season' monsoon might actually be the most poetic time to travel.",
    readTime: "5 min read",
    date: "Updated for 2026 / 2027",
    image: "/images/generated/tea-plantation-approach.webp",
    summary:
      "Most commercial guidebooks tell you that November to February is the only time to visit. While the winter months offer crisp dry weather, Kerala is at its most lush, romantic, and fragrant during the Southwest Monsoon (June to August) and retreating Northeast Monsoon (October). The waterfalls thunder, the dust disappears, and Ayurvedic rejuvenation therapies are historically most effective during the rains.",
    takeaways: [
      "November – February: Ideal for dry warm weather and coastal beach retreats.",
      "June – August (Monsoon): Poetic, lush, dramatic waterfalls, and optimum for authentic Ayurveda.",
      "September – October: Emerald green post-monsoon landscapes with fewer crowds.",
      "Highlands remain cool (15°C–22°C) year-round, offering natural respite from the plains.",
    ],
    fullTips: [
      "Avoid packing heavy denim during monsoon; linen and breathable lightweight cotton dry rapidly.",
      "Book high-altitude tea estate stays in Munnar during October for dramatic valley cloud inversions.",
    ],
  },
  {
    id: "how-many-days-in-kerala",
    issueNumber: "No. 02 &bull; Itinerary Pacing",
    category: "Duration & Rhythm",
    categoryKey: "duration",
    title: "How Many Days Do You Really Need in Kerala?",
    subtitle: "Why 10 to 12 days is the sweet spot for an unhurried, soul-restoring holiday.",
    readTime: "6 min read",
    date: "Founder's Field Notes",
    image: "/images/generated/houseboat-backwaters.webp",
    summary:
      "Too many itineraries try to cram Kochi, Munnar, Thekkady, Alleppey, and Kovalam into 6 or 7 days. In reality, winding mountain roads and country traffic mean you spend half your holiday inside a car. A true bespoke Kerala experience requires spending a minimum of two consecutive nights in each region, giving you full unhurried mornings to explore at your own pace.",
    takeaways: [
      "7 Days: Choose maximum 2 or 3 destinations (e.g. Fort Kochi + Munnar + Alleppey).",
      "10 to 12 Days (Recommended): The gold standard. Allows 2 nights in Kochi, 3 in Munnar, 2 in Periyar, and 3 in the backwaters.",
      "14+ Days: Perfect for a grand tour combining Malabar, Wayanad rainforests, or continuing across the border to Tamil Nadu.",
      "Never do one-night stops in the Western Ghats; the journey up the mountain deserves slow time.",
    ],
    fullTips: [
      "Plan transfers so you arrive at each hotel by 2:00 PM to enjoy afternoon tea and sunset light.",
      "Always include at least one complete 'rest day' where no travel or packed excursions are scheduled.",
    ],
  },
  {
    id: "munnar-vs-wayanad",
    issueNumber: "No. 03 &bull; Destination Comparison",
    category: "Highlands Comparison",
    categoryKey: "destinations",
    title: "Munnar vs Wayanad: Which Kerala Hill Station is Right for You?",
    subtitle: "Manicured British-era tea carpets versus ancient wild cardamom rainforests.",
    readTime: "4 min read",
    date: "Landscape Analysis",
    image: "/images/generated/hero-kerala.webp",
    summary:
      "Both are breathtaking highland regions in the Western Ghats, but their personalities are completely different. Munnar is all about soaring mountain peaks (6,000 ft), dramatic cloud blankets, and rolling carpets of tea. Wayanad is situated in the north: wilder, heavily forested with coffee and cardamom plantations, prehistoric caves (Edakkal), and vibrant tribal heritage.",
    takeaways: [
      "Choose Munnar if you dream of sweeping tea plantation vistas, colonial bungalows, and cool mountain air.",
      "Choose Wayanad if you prefer ancient rainforest canopy stays, wildlife sightings, and archaeological curiosities.",
      "Pairing both in a short 7-day trip is impractical due to geographical distance; pick the one that matches your soul.",
    ],
    fullTips: [
      "Munnar connects seamlessly with Central Kerala and Tamil Nadu (Madurai).",
      "Wayanad connects seamlessly with the historic Malabar Coast (Calicut and Kannur).",
    ],
  },
  {
    id: "houseboat-etiquette-day-cruise-vs-overnight",
    issueNumber: "No. 04 &bull; Backwater Secrets",
    category: "Backwater Advice",
    categoryKey: "stays",
    title: "Houseboat Secrets: Day Cruise or Overnight in Alleppey?",
    subtitle: "How to choose between a luxury floating hotel night and a quiet wooden day cruise.",
    readTime: "5 min read",
    date: "Insider Inspection",
    image: "/images/generated/luxury-resort-stay.webp",
    summary:
      "A night on a traditional thatched Kettuvallam can be magical, but many travellers do not realize that government maritime regulations require all houseboats to anchor by 5:30 PM to protect fishermen's nighttime nets. If you prefer to stay in an expansive lakefront heritage resort, a 4-hour daytime cruise with a private onboard chef followed by a tranquil resort evening can often be the more luxurious choice.",
    takeaways: [
      "Overnight Houseboat: Wonderful for first-timers who want the novelty of waking up on misty waters to birdsong.",
      "Day Cruise + Lake Resort: Best for travellers who value large marble bathrooms, swimming pools, and resort amenities.",
      "Always demand an eco-compliant vessel with four-stroke or solar hybrid engines to prevent lake pollution.",
      "Private chef onboard prepares fresh Karimeen fish and tapioca while you glide through lotus fields.",
    ],
    fullTips: [
      "We only commission private houseboats; you will never share a boat with strangers.",
    ],
  },
  {
    id: "travelling-kerala-with-family-and-seniors",
    issueNumber: "No. 05 &bull; Mindful Travel",
    category: "Family & Senior Care",
    categoryKey: "family",
    title: "Mindful Pacing: Travelling Kerala with Children & Senior Parents",
    subtitle: "How we eliminate travel fatigue and design itineraries everyone loves.",
    readTime: "6 min read",
    date: "Founder's Care Guide",
    image: "/images/generated/fort-kochi-heritage.webp",
    summary:
      "Multi-generational family travel is one of Jibu's greatest specialities. Children need tactile, engaging discoveries — elephant washings, canoe steering, martial arts demonstrations. Grandparents need gentle walking surfaces, ground-floor bedrooms, air-conditioned comfortable vehicles, and unhurried bathroom stops. We design every route with thoughtful resting buffers so nobody feels exhausted.",
    takeaways: [
      "Vehicles: We use spacious Toyota Innova Crystas or luxury executive vans with generous legroom and dual AC.",
      "Room Selection: We hand-pick ground-floor heritage rooms with zero steep stairs for older guests.",
      "Dietary Care: Pure vegetarian, mild non-spicy, gluten-free, and children's meal requirements are pre-arranged with chefs.",
      "Pacing: Maximum 3 to 3.5 hours transfer between stops, with picturesque tea garden stops midway.",
    ],
    fullTips: [
      "Our chauffeurs are patient, courteous, and experienced in assisting travellers of all ages.",
    ],
  },
];

export default function JournalClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? ARTICLES
      : ARTICLES.filter((a) => a.categoryKey === activeCategory);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
          <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
          <span>FOUNDER DISPATCHES &bull; KERALA TRAVEL ADVICE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08]">
          The Travel Guide &amp;{" "}
          <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
            Journal.
          </span>
        </h1>
        <p className="text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed pt-2">
          Honest, nuanced advice for planning a bespoke journey to South India. We write openly about the realities of travel times, seasonal nuances, stay choices, and local etiquette — so your expectations match the quiet beauty of Kerala.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: "all", label: "All Guides" },
          { id: "timing", label: "When to Visit" },
          { id: "duration", label: "How Many Days?" },
          { id: "destinations", label: "Munnar vs Wayanad" },
          { id: "stays", label: "Houseboat Insights" },
          { id: "family", label: "Family & Senior Care" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === tab.id
                ? "bg-[#183D2B] text-[#FFFCF5] shadow-md"
                : "bg-white border border-[#E9E0D2] text-[#242424]/75 hover:border-[#183D2B] hover:text-[#183D2B]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles Listing */}
      <div className="space-y-12 sm:space-y-16">
        {filtered.map((art) => (
          <article
            key={art.id}
            id={art.id}
            className="p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#E9E0D2] shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Image Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden shadow-inner group">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-serif italic drop-shadow">
                  {art.issueNumber}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#242424]/70 px-1">
                <span className="flex items-center gap-1.5 font-medium text-[#8B5E35]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.readTime}</span>
                </span>
                <span>{art.date}</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#183D2B]/5 text-[#183D2B] text-[10px] uppercase font-bold tracking-wider inline-block">
                  {art.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#183D2B] font-light leading-snug">
                  {art.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#8B5E35] font-serif italic">
                  {art.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#242424]/80 font-light leading-relaxed">
                {art.summary}
              </p>

              {/* Essential Takeaways */}
              <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] space-y-2.5">
                <span className="text-[10px] uppercase tracking-widest text-[#183D2B] font-semibold block">
                  Key Planning Takeaways
                </span>
                <ul className="space-y-2">
                  {art.takeaways.map((t) => (
                    <li key={t} className="text-xs text-[#242424]/85 flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5E35] shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/plan-your-journey?topic=${encodeURIComponent(art.title)}`}
                  className="px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Plan Around This Guide</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919447000000?text=${encodeURIComponent(`Hello Jibu, I read your article "${art.title}" and would like some guidance on my dates.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#183D2B] hover:text-[#8B5E35] font-semibold transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>Ask Jibu on WhatsApp</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <section className="p-8 sm:p-14 rounded-[3rem] bg-white border border-[#E9E0D2] shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8B5E35] font-semibold block">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#183D2B] font-light">
            Frequently Asked Planning Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-xs text-[#242424]/85 leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#183D2B]">
              Do you charge for creating our initial bespoke itinerary?
            </h3>
            <p className="font-light">
              No. Jibu Thomas consults with you and provides a preliminary route proposal and hotel recommendations completely without commitment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#183D2B]">
              Will we be joined by other travellers on our tour?
            </h3>
            <p className="font-light">
              Never. Every single journey we organise is 100% private. Your air-conditioned vehicle, chauffeur, houseboat, and guided experiences are exclusively yours.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#183D2B]">
              What kind of vehicles do you provide for road travel?
            </h3>
            <p className="font-light">
              We exclusively use pristine, modern, fully air-conditioned Toyota Innova Crysta SUVs and luxury executive touring vans driven by polite, vetted chauffeurs with excellent local knowledge.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#183D2B]">
              Can we modify the itinerary once it is prepared?
            </h3>
            <p className="font-light">
              Yes, absolutely. We refine and adjust each hotel, experience, and duration until it feels entirely right for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

