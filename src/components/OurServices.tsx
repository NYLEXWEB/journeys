"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortVibe: string;
  image: string;
  description: string;
  points: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "private-chauffeur",
    number: "01",
    title: "Private Chauffeur-Driven Journeys",
    shortVibe: "Pristine AC fleet with seasoned, courteous private chauffeurs.",
    image: "/images/services/private-chauffeur.webp",
    description:
      "Travel through South India in immaculate, air-conditioned private vehicles. Our chauffeurs know every scenic mountain pass, quiet tea stall, and tranquil detour. Drive in quiet comfort and stop whenever a vista catches your eye.",
    points: [
      "Pristine, late-model premium SUVs, sedans, and luxury family vans",
      "Courteous, verified chauffeurs with years of accident-free experience",
      "Complete flexibility for spontaneous viewpoints and village photo stops",
      "Complimentary cold mineral water, refreshing towels, and Wi-Fi",
    ],
  },
  {
    id: "handpicked-stays",
    number: "02",
    title: "Handpicked Stays & Accommodation",
    shortVibe: "Heritage tea bungalows, private houseboats & boutique eco-resorts.",
    image: "/images/services/handpicked-stays.webp",
    description:
      "We strictly avoid soulless concrete chain hotels. Instead, we place you in authentic heritage planters' bungalows nestled inside tea estates, private backwater kettuvallams, and secluded eco-resorts overlooking cliff vistas.",
    points: [
      "Century-old colonial tea planters' bungalows in the Western Ghats",
      "Private luxury kettuvallams with personal chefs on Vembanad Lake",
      "Intimate eco-resorts and barefoot luxury coastal boutique stays",
      "Personally inspected by Jibu Thomas for hygiene, ambiance, and warmth",
    ],
  },
  {
    id: "family-senior-friendly",
    number: "03",
    title: "Family & Senior-Friendly Holidays",
    shortVibe: "Unhurried schedules, ground-floor rooms & gentle pacing.",
    image: "/images/services/family-senior-friendly.webp",
    description:
      "Traveling with children or elderly grandparents requires specialized care. We craft itineraries with shorter driving segments, accessible ground-floor rooms, gentle walking trails, tailored dietary requests, and multi-bedroom private family villas.",
    points: [
      "Thoughtfully spaced schedules without early morning exhaustion",
      "Ground-floor, step-free rooms and accessible vehicle boarding",
      "Special dietary coordination (mild spices, vegetarian, allergies)",
      "Engaging hands-on activities: pottery, canoe rides & spice garden walks",
    ],
  },
  {
    id: "special-interest",
    number: "04",
    title: "Special Interest Travel",
    shortVibe: "Birdwatching, culinary masterclasses, architecture & Ayurveda.",
    image: "/images/services/special-interest.webp",
    description:
      "Whether your passion lies in birdwatching endemic Western Ghats avifauna, documenting Dravidian temple architecture, learning regional culinary secrets, or undergoing an authentic Ayurvedic Panchakarma cure under master physicians.",
    points: [
      "Ornithology & birdwatching expeditions with certified naturalists",
      "Culinary masterclasses and spice trade historical trails",
      "Authentic Ayurvedic wellness regimens at certified vaidyasala retreats",
      "Photography, textile, and living temple architecture explorations",
    ],
  },
  {
    id: "end-to-end",
    number: "05",
    title: "End-to-End Travel Coordination",
    shortVibe: "Airport meet-and-greet, private transfers & 24/7 care desk.",
    image: "/images/services/end-to-end.webp",
    description:
      "From warm airport meet-and-greets at Kochi, Trivandrum, or Bangalore to seamless luggage handling, pre-arranged entry permits, private boat charters, and instant WhatsApp support, our dedicated Kerala coordination desk handles every detail.",
    points: [
      "Warm VIP airport arrival meet-and-greet and luggage coordination",
      "All entrance permits, private boat hires, and monument admissions arranged",
      "Real-time WhatsApp concierge with Jibu Thomas throughout your stay",
      "On-ground logistics team monitoring road conditions and weather in real time",
    ],
  },
];

const FOOTAGE_MAP: Record<string, string> = {
  "private-chauffeur": "Western Ghats, Kerala",
  "handpicked-stays": "Munnar & Kumarakom",
  "family-senior-friendly": "Fort Kochi Heritage",
  "special-interest": "Periyar & Thattekad",
  "end-to-end": "Cochin International Airport",
};

export default function OurServices() {
  const content = useWebsiteContent();
  const servicesList: ServiceItem[] =
    content.services && content.services.length > 0
      ? content.services
      : SERVICES_DATA;

  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const capRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const totalCount = servicesList.length;

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const n = cards.length;
    if (n < 2) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let vh = window.innerHeight;
    let vw = window.innerWidth;
    let isSmall = vw <= 768;
    let S = vh * (isSmall ? 0.65 : 0.75);
    let stackTop = 0;
    let isNear = false;
    let isTicking = false;
    let lastActiveIdx = -1;

    const clamp = (v: number, a: number, b: number) =>
      v < a ? a : v > b ? b : v;
    const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
    const easeIn = (k: number) => k * k * k;

    const measure = () => {
      vh = window.innerHeight;
      vw = window.innerWidth;
      isSmall = vw <= 768;
      S = vh * (isSmall ? 0.65 : 0.75);
      stack.style.height = `${Math.round(vh + n * S)}px`;
      stackTop = stack.getBoundingClientRect().top + window.scrollY;
      update();
    };

    const update = () => {
      isTicking = false;
      const scrollY = window.scrollY;
      const t = (scrollY - stackTop + vh * 0.5) / S;
      const travel = vw * (isSmall ? 0.9 : 0.65);

      for (let i = 0; i < n; i++) {
        const c = cards[i];
        if (!c) continue;

        if (prefersReducedMotion) {
          c.style.transform = "none";
          c.style.opacity = i === 0 ? "1" : "0";
          c.style.visibility = i === 0 ? "visible" : "hidden";
          continue;
        }

        const u = t - i;
        // Alternating side: even from right (1), odd from left (-1)
        const side = i % 2 === 0 ? 1 : -1;
        let x = 1;
        let op = 0;
        let rot = 0;
        let sc = 1;

        if (u >= -0.5 && u < 0.05) {
          // Card slides in from its side
          const e = easeOut((u + 0.5) / 0.55);
          x = 1 - e;
          op = clamp(e * 1.5, 0, 1);
          rot = (1 - e) * 3.5;
          sc = 0.94 + 0.06 * e;
        } else if (u >= 0.05 && (u < 0.75 || i === n - 1)) {
          // Card holds firmly in place (last card holds until section end)
          x = 0;
          op = 1;
          rot = 0;
          sc = 1;
        } else if (u >= 0.75 && u < 1.1) {
          // Card slides out smoothly on its own side
          const k = easeIn((u - 0.75) / 0.35);
          x = k;
          op = 1 - k * 0.9;
          rot = k * 3;
          sc = 1 - 0.04 * k;
        } else {
          // Out of viewing range
          x = u < -0.5 ? 1 : 1;
          op = 0;
          sc = 0.94;
        }

        const tx = isSmall ? side * x * (vw * 0.85) : side * x * travel;
        c.style.transform = `translate3d(${tx.toFixed(1)}px,0,0) rotate(${(side * rot).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
        c.style.opacity = op.toFixed(3);
        c.style.visibility = op > 0.01 ? "visible" : "hidden";
        c.style.pointerEvents = op > 0.85 ? "auto" : "none";

        if (u > -0.3 && u < 1.15) {
          c.classList.add("sv-card-in");
        } else if (u < -0.8 || u > 1.6) {
          c.classList.remove("sv-card-in");
        }
      }

      const activeIdx = clamp(Math.floor(t + 0.3), 0, n - 1);
      if (activeIdx !== lastActiveIdx) {
        lastActiveIdx = activeIdx;
        setCurrentIdx(activeIdx);
      }
    };

    const onScroll = () => {
      if (isNear && !isTicking) {
        isTicking = true;
        requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isNear = entries[0].isIntersecting;
        if (isNear) onScroll();
      },
      { rootMargin: "100% 0px 100% 0px" }
    );

    observer.observe(stack);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("load", measure);

    const timer = setTimeout(measure, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("load", measure);
    };
  }, [servicesList]);

  const scrollToStep = (idx: number) => {
    const stack = stackRef.current;
    if (!stack) return;
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const S = vh * (vw <= 768 ? 0.65 : 0.75);
    const stackTop = stack.getBoundingClientRect().top + window.scrollY;
    const targetY = stackTop - vh * 0.5 + (idx + 0.2) * S;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const activeService = servicesList[currentIdx] || servicesList[0];
  const isEvenCard = currentIdx % 2 === 0;

  return (
    <section
      id="services"
      className="relative bg-[#FFFCF5] overflow-clip"
    >
      {/* Tall Scroll Track (TravelTrendzz sv-stack) */}
      <div ref={stackRef} className="sv-stack relative w-full">
        {/* Pinned Sticky Stage (TravelTrendzz sv-stage: sticky, 100vh) */}
        <div className="sv-stage sticky top-0 h-[100vh] h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-6 sm:pt-8 pb-6 sm:pb-8">

          {/* Top Header & Navigation Chips (Permanent on the Stage) */}
          <div className="relative z-30 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-[#E9E0D2]/70 pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8B5E35] animate-pulse shrink-0" />
                <h2 className="text-sm min-[400px]:text-base sm:text-lg lg:text-xl font-sans font-medium tracking-[0.14em] uppercase text-[#183D2B]">
                  WAYS TO TRAVEL <span className="text-[#8B5E35] font-light">&amp;</span> STAYS
                </h2>
              </div>

              {/* Interactive Quick-Jump Navigation Chips */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full py-1">
                {servicesList.map((srv, idx) => {
                  const isActive = currentIdx === idx;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => scrollToStep(idx)}
                      className={`shrink-0 whitespace-nowrap px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans transition-all duration-300 cursor-pointer ${isActive
                        ? "bg-[#183D2B] text-[#FFFCF5] shadow-md font-semibold scale-105"
                        : "bg-white/80 backdrop-blur-sm text-[#242424]/75 border border-[#E9E0D2] hover:border-[#8B5E35] hover:text-[#183D2B]"
                        }`}
                    >
                      <span className="text-[#8B5E35] font-mono mr-1">{srv.number}</span>
                      {srv.title.split(" ")[0]} {srv.title.split(" ")[1] || ""}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Big Side Counter & Name (Matching Photo Layout) */}
          <div
            ref={capRef}
            className={`hidden lg:flex flex-col absolute top-1/2 -translate-y-1/2 z-10 w-[34vw] max-w-[460px] pointer-events-none transition-all duration-500 ${isEvenCard ? "left-[5vw] text-left" : "right-[5vw] text-right"
              }`}
          >
            <b className="block font-sans font-light text-[clamp(110px,13vw,190px)] leading-[0.75] tracking-[-0.06em] text-[#183D2B]/12 select-none">
              {activeService.number}
            </b>
            <span className="block mt-5 text-xs font-mono tracking-[0.25em] uppercase text-[#8B5E35] font-semibold">
              OF 0{totalCount}
            </span>
            <h3 className="block mt-2 font-sans font-light text-xl xl:text-3xl text-[#183D2B] tracking-tight leading-snug">
              {activeService.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#242424]/70 font-light leading-relaxed max-w-sm">
              {activeService.shortVibe}
            </p>
          </div>

          {/* Stage Cards Container: Absolute Alternating Cards (Photo Style) */}
          <div className="relative flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6">
            {servicesList.map((srv, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={srv.id}
                  id={`service-${srv.id}`}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  className={`sv-card absolute top-[5vh] sm:top-[6vh] md:top-[6vh] lg:top-[5vh] h-[78vh] sm:h-[75vh] md:h-[73vh] min-h-[510px] max-h-[730px] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.38)] border border-white/10 bg-[#131514] text-white will-change-transform flex flex-col justify-between p-4 min-[420px]:p-5 sm:p-7 md:p-8 ${isEven
                    ? "lg:right-[4vw] lg:left-auto right-[3vw] left-[3vw] sm:right-[5vw] sm:left-[5vw] lg:w-[min(58vw,900px)]"
                    : "lg:left-[4vw] lg:right-auto left-[3vw] right-[3vw] sm:left-[5vw] sm:right-[5vw] lg:w-[min(58vw,900px)]"
                    }`}
                  style={{
                    zIndex: 2,
                    opacity: 0,
                    visibility: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  {/* Card Top Row: Monospace Number Badge & Audio Sound Button */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs sm:text-sm text-white/50 tracking-wider">
                      ({srv.number})
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
                      title={isMuted ? "Unmute audio" : "Mute audio"}
                      aria-label="Toggle audio"
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-[#8B5E35]" />
                      )}
                    </button>
                  </div>

                  {/* Card Middle: Pristine Circular Image Lens (Clean, Dot-Free, Luxury Glass Ring) */}
                  <div className="relative z-10 flex items-center gap-4 sm:gap-6 my-auto pt-2 pb-3">
                    <div className="relative shrink-0">
                      {/* Ultra-Clean Circular Scenic Window with Champagne Accent Ring */}
                      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-1 ring-[#8B5E35]/40 border-2 border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.5)] bg-black/60">
                        <Image
                          src={srv.image}
                          alt={srv.title}
                          fill
                          sizes="(max-width: 640px) 90px, 140px"
                          className="object-cover transition-transform duration-700 hover:scale-110"
                          priority={idx === 0}
                        />
                      </div>
                    </div>

                    {/* Diamond Icon, Subtitle & WhatsApp Consultation Link */}
                    <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[#8B5E35] select-none text-xs sm:text-sm">◆</span>
                        <h4 className="font-sans text-base sm:text-lg md:text-xl text-white font-light tracking-wide leading-tight truncate">
                          {srv.shortVibe.split(".")[0]}
                        </h4>
                      </div>

                      <a
                        href={`https://wa.me/919447000000?text=${encodeURIComponent(
                          `Hello Jibu, I would like to consult about ${srv.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs sm:text-sm text-white/60 hover:text-white transition-colors font-sans"
                      >
                        WhatsApp or call +91 94470 00000
                      </a>
                    </div>
                  </div>

                  {/* Card Bottom: Prominent Floating Black Banner (Matching Screenshot Exactly) */}
                  <div className="relative z-10 bg-[#0c0e0d]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl space-y-3">
                    {/* Brand Monogram & Slim Elegant Uppercase Title */}
                    <div className="flex items-start gap-2.5 sm:gap-3.5">
                      <span className="font-sans font-medium text-sm sm:text-base text-[#8B5E35] select-none leading-none shrink-0 tracking-tight pt-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                        JT
                      </span>
                      <h3 className="font-sans font-normal text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl uppercase tracking-[-0.02em] text-white leading-tight">
                        {srv.title}
                      </h3>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-xl">
                      {srv.description}
                    </p>

                    {/* Key Inclusions Bulleted Grid */}
                    <div className="pt-2 sm:pt-2.5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/70 font-light">
                      {srv.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-[#8B5E35] shrink-0 font-bold select-none">•</span>
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Links Bar */}
                    <div className="pt-2 sm:pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono uppercase tracking-wider">
                      <a
                        href={`https://wa.me/919447000000?text=${encodeURIComponent(
                          `Hello Jibu, I would like to consult about ${srv.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-white hover:text-[#8B5E35] border-b border-white/40 pb-0.5 transition-colors font-semibold"
                      >
                        <span>◆ ENQUIRE VIA WHATSAPP</span>
                      </a>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-white/75 hover:text-white border-b border-white/20 pb-0.5 transition-colors"
                      >
                        <span>◆ PLAN YOUR JOURNEY &rarr;</span>
                      </Link>
                    </div>
                  </div>

                  {/* Tiny Card Bottom Metadata: Footage Location & Brand Tag */}
                  <div className="relative z-10 flex items-center justify-between px-1 pt-1.5 text-[10px] sm:text-xs text-white/40 font-mono tracking-wider uppercase">
                    <span>Curated by Jibu Thomas</span>
                    <span>Footage: {FOOTAGE_MAP[srv.id] || "Kerala, India"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Stage Progress Indicator */}
          <div className="relative z-30 max-w-[1400px] mx-auto w-full px-4 sm:px-6 flex items-center justify-between text-xs text-[#242424]/60 font-mono">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#183D2B]" />
              SCROLL TO EXPLORE SERVICES
            </span>
            <span>
              {String(currentIdx + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
            </span>
          </div>

        </div >
      </div >

      <style jsx global>{`
        /* Smooth Entrance transitions */
        .sv-card.sv-card-in .sv-copy-panel > div {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .sv-card {
            transform: none !important;
          }
          .sv-card .sv-copy-panel > div {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section >
  );
}
