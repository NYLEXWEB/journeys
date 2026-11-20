"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface SubItem {
  name: string;
  href: string;
}

interface NavItem {
  id: string;
  name: string;
  fullName: string;
  href: string;
  groups?: {
    groupTitle?: string;
    items: SubItem[];
  }[];
  items?: SubItem[];
  mobileHighlights: SubItem[];
}

export const SITE_STRUCTURE: NavItem[] = [
  {
    id: "kerala",
    name: "Kerala",
    fullName: "Kerala Discovery",
    href: "/destinations",
    mobileHighlights: [
      { name: "Fort Kochi · Colonial Heritage", href: "/destinations#fort-kochi" },
      { name: "Munnar · Misty Tea Highlands", href: "/destinations#munnar" },
      { name: "Alleppey & Kumarakom · Backwaters", href: "/destinations#alleppey" },
      { name: "Thekkady & Periyar · Spice Forests", href: "/destinations#thekkady" },
      { name: "Wayanad · Waterfalls & Wildlife", href: "/destinations#wayanad" },
      { name: "Handpicked Boutique Stays", href: "/#services" },
      { name: "Explore All Kerala Destinations →", href: "/destinations" },
    ],
    groups: [
      {
        groupTitle: "Places",
        items: [
          { name: "Kochi", href: "/destinations#fort-kochi" },
          { name: "Munnar", href: "/destinations#munnar" },
          { name: "Thekkady", href: "/destinations#thekkady" },
          { name: "Alappuzha / Alleppey", href: "/destinations#alleppey" },
          { name: "Kumarakom", href: "/destinations#kumarakom" },
          { name: "Wayanad", href: "/destinations#wayanad" },
          { name: "Varkala", href: "/destinations#varkala" },
          { name: "Kovalam", href: "/destinations#kovalam" },
          { name: "Kozhikode", href: "/destinations#kozhikode" },
          { name: "Kannur", href: "/destinations#kannur" },
          { name: "Bekal", href: "/destinations#bekal" },
          { name: "Lesser-known Kerala", href: "/destinations" },
        ],
      },
      {
        groupTitle: "Discover Kerala",
        items: [
          { name: "Where to go", href: "/destinations" },
          { name: "When to visit", href: "/#journal" },
          { name: "How long to spend", href: "/#journal" },
          { name: "Getting around Kerala", href: "/#services" },
          { name: "First-time Kerala", href: "/about" },
          { name: "Kerala with children", href: "/#travel-with-jibu" },
          { name: "Kerala for senior travellers", href: "/#services" },
          { name: "Handpicked Stays", href: "/#services" },
        ],
      },
    ],
  },
  {
    id: "journeys",
    name: "Journeys",
    fullName: "Journeys, Never Packages",
    href: "/journeys",
    mobileHighlights: [
      { name: "Classic Kerala Discovery (10 Days)", href: "/journeys#classic-kerala" },
      { name: "Romantic Kerala Escapes (8 Days)", href: "/journeys#slow-kerala" },
      { name: "Family Holidays with Children (9 Days)", href: "/journeys#nature-wildlife" },
      { name: "Slow Living & Wildlife Journeys (11 Days)", href: "/journeys#beyond-usual" },
      { name: "Explore All Signature Journeys →", href: "/journeys" },
    ],
    groups: [
      {
        groupTitle: "Journey Ideas",
        items: [
          { name: "Classic Kerala", href: "/journeys#classic-kerala" },
          { name: "Slow Kerala", href: "/journeys#slow-kerala" },
          { name: "Kerala Beyond the Usual", href: "/journeys#beyond-usual" },
          { name: "Nature & Wildlife", href: "/journeys#nature-wildlife" },
          { name: "Culture & Cuisine", href: "/journeys#culture-cuisine" },
          { name: "South India Journeys", href: "/journeys#south-india" },
        ],
      },
      {
        groupTitle: "Who are you travelling with?",
        items: [
          { name: "Couples", href: "/journeys" },
          { name: "Families", href: "/journeys" },
          { name: "Senior travellers", href: "/journeys" },
          { name: "Multi-generational families", href: "/journeys" },
          { name: "Friends / small groups", href: "/journeys" },
        ],
      },
    ],
  },
  {
    id: "experiences",
    name: "Experiences",
    fullName: "Curated Local Knowledge",
    href: "/experiences",
    mobileHighlights: [
      { name: "Private Houseboat Charters", href: "/experiences#backwaters" },
      { name: "Living Traditions & Arts", href: "/experiences#heritage" },
      { name: "Tea & High-Altitude Plantations", href: "/experiences#plantations" },
      { name: "Walking Trails & Nature Walks", href: "/experiences#nature" },
      { name: "Authentic Ayurvedic Cures", href: "/experiences#wellness" },
      { name: "Explore All Experiences →", href: "/experiences" },
    ],
    items: [
      { name: "Food & Cuisine", href: "/experiences#culinary" },
      { name: "Culture & Heritage", href: "/experiences#heritage" },
      { name: "Wildlife & Nature", href: "/experiences#wildlife" },
      { name: "Walking & Hiking", href: "/experiences#nature" },
      { name: "Tea & Plantations", href: "/experiences#plantations" },
      { name: "Backwaters", href: "/experiences#backwaters" },
      { name: "Village Life", href: "/experiences#village" },
      { name: "Arts & Traditions", href: "/experiences#arts" },
      { name: "Wellness & Ayurveda", href: "/experiences#wellness" },
    ],
  },
  {
    id: "about",
    name: "About",
    fullName: "About Journeys by Jibu Thomas",
    href: "/about",
    mobileHighlights: [
      { name: "Meet Founder Jibu Thomas", href: "/about#jibu" },
      { name: "Why Travel With Us", href: "/about#why-us" },
      { name: "The Four Pillars of Our Philosophy", href: "/about#philosophy" },
      { name: "Guest Stories & Reviews", href: "/#reviews" },
      { name: "Read Atelier Story →", href: "/about" },
    ],
    items: [
      { name: "Meet Jibu", href: "/about#jibu" },
      { name: "Why travel with us", href: "/about#why-us" },
      { name: "How we plan your journey", href: "/plan-your-journey#how-it-works" },
      { name: "Traveller stories & reviews", href: "/#reviews" },
      { name: "Responsible travel", href: "/about#philosophy" },
      { name: "Our local network", href: "/about#story" },
    ],
  },
  {
    id: "blog",
    name: "Travel Guide",
    fullName: "Travel Guide & Stories",
    href: "/blog",
    mobileHighlights: [
      { name: "Planning Questions & Best Seasons", href: "/blog" },
      { name: "Frequently Asked Questions", href: "/#faq" },
      { name: "How Many Days in Kerala?", href: "/blog" },
      { name: "Dispatches by Jibu Thomas", href: "/blog" },
      { name: "Explore Travel Journal →", href: "/blog" },
    ],
    groups: [
      {
        groupTitle: "Planning questions",
        items: [
          { name: "Best time to visit Kerala", href: "/blog" },
          { name: "How many days in Kerala?", href: "/blog" },
          { name: "First trip to Kerala", href: "/blog" },
          { name: "Getting around Kerala", href: "/blog" },
          { name: "Where to stay in Kerala", href: "/blog" },
        ],
      },
      {
        groupTitle: "Stories & Guides",
        items: [
          { name: "Munnar & High Ranges Guide", href: "/blog" },
          { name: "Behind the Kettuvallam Craft", href: "/blog" },
          { name: "The Magic of Monsoon", href: "/blog" },
          { name: "Kerala for Families & Seniors", href: "/blog" },
          { name: "Explore All Blog Stories", href: "/blog" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [isDocked, setIsDocked] = useState(!isHomepage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDockedRef = useRef(!isHomepage);

  // Monitor if any modal is open across the app, and smoothly hide navbar
  useEffect(() => {
    const checkModal = () => {
      const locked =
        document.body.classList.contains("modal-open") ||
        document.documentElement.classList.contains("modal-open") ||
        document.body.style.overflow === "hidden";
      setIsModalOpen(locked);
    };

    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class", "style"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // GPU-Accelerated Scroll Tracking:
  // Starts on the Hero bottom anchor (#hero-navbar-anchor), moves UP smoothly with scroll.
  // When it reaches dockTop (12px on mobile / 16px on desktop), it docks and expands into full top navbar.
  // Uses translate3d exclusively to avoid any layout reflow or mobile jitter.
  useEffect(() => {
    const updatePosition = () => {
      const header = headerRef.current;
      if (!header) return;

      const dockTop = window.innerWidth < 640 ? 12 : 16;

      if (!isHomepage) {
        if (!isDockedRef.current) {
          isDockedRef.current = true;
          setIsDocked(true);
        }
        header.style.transform = `translate3d(-50%, ${dockTop}px, 0)`;
        return;
      }

      const anchor = document.getElementById("hero-navbar-anchor");
      if (!anchor) {
        if (!isDockedRef.current) {
          isDockedRef.current = true;
          setIsDocked(true);
        }
        header.style.transform = `translate3d(-50%, ${dockTop}px, 0)`;
        return;
      }

      const anchorRect = anchor.getBoundingClientRect();

      if (anchorRect.top <= dockTop) {
        // Reached top dock position: dock and expand horizontally
        if (!isDockedRef.current) {
          isDockedRef.current = true;
          setIsDocked(true);
        }
        header.style.transform = `translate3d(-50%, ${dockTop}px, 0)`;
      } else {
        // Inside Hero: position locked to anchor
        if (isDockedRef.current) {
          isDockedRef.current = false;
          setIsDocked(false);
        }
        header.style.transform = `translate3d(-50%, ${anchorRect.top}px, 0)`;
      }
    };

    updatePosition();

    let ticking = false;
    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("touchmove", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("touchmove", onScrollOrResize);
    };
  }, [isHomepage]);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{
          top: "0px",
          transform: isHomepage ? "translate3d(-50%, calc(100dvh - 84px), 0)" : "translate3d(-50%, 16px, 0)",
          willChange: "transform",
        }}
        className={`fixed z-50 left-1/2 pointer-events-none transition-opacity duration-300 ${isModalOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDocked
            ? "w-[calc(100vw-20px)] sm:w-[calc(100vw-24px)] max-w-[1600px] bg-[#FFFCF5]/98 backdrop-blur-md border border-[#E9E0D2] shadow-[0_12px_35px_rgba(24,61,43,0.1)] text-[#242424] px-3 sm:px-6 py-1.5 sm:py-2.5 h-[50px] sm:h-[58px]"
            : "w-auto max-w-[calc(100vw-16px)] bg-black/80 backdrop-blur-md border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 gap-1.5 sm:gap-3 h-[46px] sm:h-[54px]"
            }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.01] shrink-0 pl-0.5 sm:pl-1"
          >
            <div
              className={`relative transition-all duration-300 ${!isDocked
                ? "h-5 sm:h-7 w-16 sm:w-24"
                : "h-7 sm:h-9 md:h-10 w-24 sm:w-36 md:w-40"
                }`}
            >
              <Image
                src="/images/logo.webp"
                alt="Journeys by Jibu Thomas"
                fill
                priority
                sizes="(max-width: 768px) 120px, 200px"
                className={`object-contain object-left transition-all duration-300 ${!isDocked
                  ? "brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
                  : "drop-shadow-sm"
                  }`}
              />
            </div>
          </Link>

          {/* DUAL NAVIGATION CONTENT */}
          {!isDocked ? (
            /* HERO FLOATING CAPSULE NAVIGATION: [Kerala] [Journeys] [Experiences (sm+)] */
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <div className="h-3.5 w-px bg-white/20 mx-0.5 sm:mx-1" />
              <Link
                href="#destinations"
                className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
              >
                Kerala
              </Link>
              <Link
                href="#travel-with-jibu"
                className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
              >
                Journeys
              </Link>
              <Link
                href="#experiences"
                className="hidden sm:inline-block text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
              >
                Experiences
              </Link>

              {/* Mobile menu toggle for hero capsule */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1 sm:p-1.5 rounded-full transition-all active:scale-95 text-white bg-white/15 hover:bg-white/25 ml-0.5 sm:ml-1 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>
            </div>
          ) : (
            /* SCROLLED / DOCKED TOP DESKTOP NAVIGATION: Single-Line with Mega Dropdowns */
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 relative">
              {SITE_STRUCTURE.map((item) => {
                const isOpen = activeDropdown === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`font-sans transition-all duration-200 py-1.5 px-3 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap block text-[#242424] hover:text-[#183D2B] hover:bg-[#183D2B]/5 ${isOpen ? "bg-[#183D2B]/10 text-[#183D2B]" : ""
                        }`}
                    >
                      <span>{item.name}</span>
                    </Link>

                    {/* Clean Desktop Dropdown Modal Box */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#FFFCF5] rounded-3xl border border-[#E9E0D2] shadow-2xl p-6 text-[#242424] z-50 ${item.groups
                            ? "w-[560px] sm:w-[620px]"
                            : "w-[300px]"
                            }`}
                        >
                          {item.groups ? (
                            <div className="grid grid-cols-2 gap-6">
                              {item.groups.map((grp, gIdx) => (
                                <div key={gIdx} className="space-y-2">
                                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8B5E35] border-b border-[#E9E0D2] pb-1 block">
                                    {grp.groupTitle}
                                  </span>
                                  <ul className="space-y-1">
                                    {grp.items.map((sub) => (
                                      <li key={sub.name}>
                                        <Link
                                          href={sub.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="text-xs text-[#242424]/85 hover:text-[#183D2B] hover:font-medium flex items-center justify-between py-1 transition-colors group"
                                        >
                                          <span>{sub.name}</span>
                                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#8B5E35] transition-opacity" />
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8B5E35] border-b border-[#E9E0D2] pb-1 block">
                                {item.fullName}
                              </span>
                              <ul className="space-y-1">
                                {item.items?.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="text-xs text-[#242424]/85 hover:text-[#183D2B] hover:font-medium flex items-center justify-between py-1 transition-colors group"
                                    >
                                      <span>{sub.name}</span>
                                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#8B5E35] transition-opacity" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="mt-4 pt-3 border-t border-[#E9E0D2] flex items-center justify-between">
                            <Link
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="text-[11px] uppercase tracking-wider text-[#183D2B] font-semibold hover:text-[#8B5E35] flex items-center gap-1"
                            >
                              <span>Explore Section</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          )}

          {/* RIGHT ACTION BUTTON: Shown when docked at the top */}
          {isDocked && (
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <Link prefetch={true} href="/plan-your-journey"
                className="inline-flex items-center gap-1 sm:gap-1.5 transition-all duration-300 uppercase tracking-widest font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs bg-[#183D2B] text-[#FFFCF5] hover:bg-[#8B5E35]"
              >
                <span className="hidden sm:inline">PLAN YOUR JOURNEY</span>
                <span className="sm:hidden tracking-wider">PLAN</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-full transition-all active:scale-95 text-[#183D2B] bg-[#E9E0D2]/50 hover:bg-[#E9E0D2] cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 
        CURATED MOBILE DRAWER
        Clean, calm, uncluttered navigation matching the PDF standard:
        - Kerala
        - Journeys
        - Experiences
        - About
        - Travel Guide
        Focused, readable accordions with generous touch targets.
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#183D2B]/98 backdrop-blur-lg text-[#FFFCF5] flex flex-col justify-between p-6 sm:p-10 pt-20 sm:pt-24 lg:hidden overflow-y-auto max-h-[100dvh]"
          >
            <div className="space-y-3 max-w-lg mx-auto w-full pb-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#E9E0D2]">
                  Explore &bull; Journeys Atelier
                </span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#E9E0D2] bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                  aria-label="Close menu"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {SITE_STRUCTURE.map((item) => {
                const isExpanded = expandedMobileItem === item.id;
                return (
                  <div key={item.id} className="border-b border-white/10 pb-2.5">
                    <div className="flex items-center justify-between min-h-[48px]">
                      {/* Main Clean Heading */}
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-sans font-light text-2xl text-[#FFFCF5] hover:text-[#E9E0D2] transition-colors py-1 flex-1 tracking-tight"
                      >
                        {item.name}
                      </Link>

                      {/* Accordion Toggle */}
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setExpandedMobileItem(isExpanded ? null : item.id)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[#E9E0D2] bg-white/5 hover:bg-white/15 transition-all cursor-pointer shrink-0"
                        aria-label={`Expand ${item.name}`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>

                    {/* Clean, Curated Sub-links (Never crowded) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="pt-2 pl-3 space-y-1.5 overflow-hidden"
                        >
                          {item.mobileHighlights.map((sub, sIdx) => {
                            const isActionLink = sub.name.includes("→");
                            return (
                              <Link
                                key={sIdx}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block py-1.5 text-xs transition-colors ${isActionLink
                                  ? "text-[#E9E0D2] font-semibold uppercase tracking-wider pt-1 hover:text-white"
                                  : "text-white/80 hover:text-white"
                                  }`}
                              >
                                {!isActionLink && <span className="text-[#8B5E35] mr-2">&bull;</span>}
                                <span>{sub.name}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions: Large Primary CTA & WhatsApp Contact */}
            <div className="max-w-lg mx-auto w-full pt-4 space-y-3 pb-6 border-t border-white/10">
              <Link prefetch={true} href="/plan-your-journey"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-[#8B5E35] hover:bg-[#A26D3F] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
              >
                <span>PLAN YOUR JOURNEY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-xs text-[#E9E0D2]/90 pt-1">
                <a
                  href="https://wa.me/919447000000?text=Hello%20Jibu,%20I%20would%20like%20to%20plan%20a%20private%20journey%20to%20Kerala."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>Chat with Jibu on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
