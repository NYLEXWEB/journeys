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
}

export const SITE_STRUCTURE: NavItem[] = [
  {
    id: "kerala",
    name: "Kerala",
    fullName: "Kerala Discovery",
    href: "/destinations",
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
    href: "/#travel-with-jibu",
    groups: [
      {
        groupTitle: "Journey Ideas",
        items: [
          { name: "Classic Kerala", href: "/#travel-with-jibu" },
          { name: "Slow Kerala", href: "/#travel-with-jibu" },
          { name: "Kerala Beyond the Usual", href: "/#travel-with-jibu" },
          { name: "Nature & Wildlife", href: "/#travel-with-jibu" },
          { name: "Culture & Cuisine", href: "/#travel-with-jibu" },
          { name: "South India Journeys", href: "/#travel-with-jibu" },
        ],
      },
      {
        groupTitle: "Who are you travelling with?",
        items: [
          { name: "Couples", href: "/#travel-with-jibu" },
          { name: "Families", href: "/#travel-with-jibu" },
          { name: "Senior travellers", href: "/#services" },
          { name: "Multi-generational families", href: "/#services" },
          { name: "Friends / small groups", href: "/#travel-with-jibu" },
        ],
      },
    ],
  },
  {
    id: "experiences",
    name: "Experiences",
    fullName: "Curated Local Knowledge",
    href: "/#experiences",
    items: [
      { name: "Food & Cuisine", href: "/#experiences" },
      { name: "Culture & Heritage", href: "/#experiences" },
      { name: "Wildlife & Nature", href: "/#experiences" },
      { name: "Walking & Hiking", href: "/#experiences" },
      { name: "Tea & Plantations", href: "/#experiences" },
      { name: "Backwaters", href: "/#experiences" },
      { name: "Village Life", href: "/#experiences" },
      { name: "Arts & Traditions", href: "/#experiences" },
      { name: "Wellness & Ayurveda", href: "/#experiences" },
    ],
  },
  {
    id: "about",
    name: "About",
    fullName: "About Journeys by Jibu Thomas",
    href: "/about",
    items: [
      { name: "Meet Jibu", href: "/about#jibu" },
      { name: "Why travel with us", href: "/about#why-us" },
      { name: "How we plan your journey", href: "/contact#how-it-works" },
      { name: "Traveller stories & reviews", href: "/#reviews" },
      { name: "Responsible travel", href: "/about#philosophy" },
      { name: "Our local network", href: "/about#story" },
    ],
  },
  {
    id: "travel-guide",
    name: "Travel Guide",
    fullName: "The Journeys Journal",
    href: "/#journal",
    groups: [
      {
        groupTitle: "Planning questions",
        items: [
          { name: "Best time to visit Kerala", href: "/#journal" },
          { name: "How many days in Kerala?", href: "/#journal" },
          { name: "First trip to Kerala", href: "/#journal" },
          { name: "Getting around Kerala", href: "/#services" },
          { name: "Where to stay", href: "/#services" },
        ],
      },
      {
        groupTitle: "Useful comparisons",
        items: [
          { name: "Munnar vs Wayanad", href: "/#journal" },
          { name: "Houseboat: day cruise or overnight?", href: "/#journal" },
          { name: "Kerala with children", href: "/#journal" },
          { name: "Kerala for senior travellers", href: "/#journal" },
          { name: "Food, culture & practical advice", href: "/#journal" },
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

  // Precise Anchor Tracking on Scroll:
  // Starts on the Hero bottom line (#hero-navbar-anchor), moves UP with scroll locked with Heading and Button.
  // When it reaches top: 16px, it clamps at 16px and smoothly expands into full top navbar.
  useEffect(() => {
    let rafId: number;

    const updatePosition = () => {
      if (!isHomepage) {
        if (!isDockedRef.current) {
          isDockedRef.current = true;
          setIsDocked(true);
        }
        if (headerRef.current) {
          headerRef.current.style.top = "16px";
        }
        return;
      }

      const anchor = document.getElementById("hero-navbar-anchor");
      if (!anchor) {
        if (!isDockedRef.current) {
          isDockedRef.current = true;
          setIsDocked(true);
        }
        if (headerRef.current) {
          headerRef.current.style.top = "16px";
        }
        return;
      }

      const anchorRect = anchor.getBoundingClientRect();
      const dockTop = 16; // 16px from top of viewport

      if (anchorRect.top <= dockTop) {
        // Reached top position: dock and expand
        if (!isDockedRef.current) {
          isDockedRef.current = true;
          setIsDocked(true);
        }
        if (headerRef.current) {
          headerRef.current.style.top = `${dockTop}px`;
        }
      } else {
        // In Hero: lock position to anchor, compact capsule
        if (isDockedRef.current) {
          isDockedRef.current = false;
          setIsDocked(false);
        }
        if (headerRef.current) {
          headerRef.current.style.top = `${anchorRect.top}px`;
        }
      }
    };

    updatePosition();

    // High-frequency tracking using RAF loop for 120fps smooth momentum sync
    const loop = () => {
      updatePosition();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
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
          top: isHomepage ? "calc(100dvh - 90px)" : "16px",
        }}
        className={`fixed z-50 left-1/2 -translate-x-1/2 pointer-events-none transition-[opacity,transform] duration-300 ${
          isModalOpen ? "opacity-0 -translate-y-12 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDocked
              ? "w-[calc(100vw-24px)] max-w-[1600px] bg-[#FFFCF5]/96 backdrop-blur-2xl border border-[#E9E0D2] shadow-[0_16px_40px_rgba(24,61,43,0.12)] text-[#242424] px-3 sm:px-6 py-1.5 sm:py-2.5 h-[52px] sm:h-[58px]"
              : "w-auto max-w-fit bg-black/75 backdrop-blur-2xl border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.65)] text-white px-3 sm:px-4 py-1.5 sm:py-2 gap-2 sm:gap-3 h-[48px] sm:h-[54px]"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/#hero"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.01] shrink-0 pl-1"
          >
            <div
              className={`relative transition-all duration-500 ${
                !isDocked
                  ? "h-6 sm:h-7 w-20 sm:w-24"
                  : "h-7 sm:h-9 md:h-10 w-24 sm:w-36 md:w-40"
              }`}
            >
              <Image
                src="/images/logo.png"
                alt="Journeys by Jibu Thomas"
                fill
                priority
                sizes="(max-width: 768px) 120px, 200px"
                className={`object-contain object-left transition-all duration-500 ${
                  !isDocked
                    ? "brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
                    : "drop-shadow-sm"
                }`}
              />
            </div>
          </Link>

          {/* DUAL NAVIGATION CONTENT */}
          {!isDocked ? (
            /* HERO FLOATING CAPSULE NAVIGATION: [Kerala] [Journeys] [Experiences] */
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <div className="h-3.5 w-px bg-white/20 mx-1" />
              <Link
                href="#destinations"
                className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase px-2 sm:px-2.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
              >
                Kerala
              </Link>
              <Link
                href="#travel-with-jibu"
                className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase px-2 sm:px-2.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
              >
                Journeys
              </Link>
              <Link
                href="#experiences"
                className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase px-2 sm:px-2.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
              >
                Experiences
              </Link>

              {/* Mobile menu toggle for hero capsule */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-full transition-all active:scale-95 text-white bg-white/15 hover:bg-white/25 ml-1"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
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
                      className={`font-sans transition-all duration-200 py-1.5 px-3 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap block text-[#242424] hover:text-[#183D2B] hover:bg-[#183D2B]/5 ${
                        isOpen ? "bg-[#183D2B]/10 text-[#183D2B]" : ""
                      }`}
                    >
                      <span>{item.name}</span>
                    </Link>

                    {/* Clean Dropdown Modal Box */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#FFFCF5] rounded-3xl border border-[#E9E0D2] shadow-2xl p-6 text-[#242424] z-50 ${
                            item.groups
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 sm:gap-1.5 transition-all duration-300 uppercase tracking-widest font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs bg-[#183D2B] text-[#FFFCF5] hover:bg-[#8B5E35]"
              >
                <span className="hidden sm:inline">PLAN YOUR JOURNEY</span>
                <span className="sm:hidden tracking-wider">PLAN</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-full transition-all active:scale-95 text-[#183D2B] bg-[#E9E0D2]/50 hover:bg-[#E9E0D2]"
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

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#183D2B]/98 backdrop-blur-2xl text-[#FFFCF5] flex flex-col justify-between p-6 sm:p-10 pt-24 sm:pt-28 lg:hidden overflow-y-auto max-h-[100dvh]"
          >
            <div className="space-y-4 max-w-lg mx-auto w-full pb-8">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#E9E0D2] block border-b border-white/10 pb-2">
                Explore &bull; Menu
              </span>

              {SITE_STRUCTURE.map((item) => {
                const isExpanded = expandedMobileItem === item.id;
                return (
                  <div key={item.id} className="border-b border-white/10 pb-3">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-serif text-xl text-[#FFFCF5] hover:text-[#E9E0D2] transition-colors"
                      >
                        {item.fullName}
                      </Link>

                      <button
                        onClick={() => setExpandedMobileItem(isExpanded ? null : item.id)}
                        className="p-2 text-[#E9E0D2]"
                        aria-label={`Expand ${item.name}`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pt-2 pl-4 space-y-2 overflow-hidden"
                        >
                          {item.groups ? (
                            item.groups.map((grp, gIdx) => (
                              <div key={gIdx} className="space-y-1 pt-1">
                                <span className="text-[10px] uppercase tracking-wider text-[#8B5E35] font-semibold block">
                                  {grp.groupTitle}
                                </span>
                                {grp.items.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-xs text-[#E9E0D2]/90 hover:text-white py-0.5"
                                  >
                                    &bull; {sub.name}
                                  </Link>
                                ))}
                              </div>
                            ))
                          ) : (
                            item.items?.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-xs text-[#E9E0D2]/90 hover:text-white py-0.5"
                              >
                                &bull; {sub.name}
                              </Link>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="max-w-lg mx-auto w-full pt-4 space-y-3">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 rounded-full bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl hover:bg-[#a06d3f] transition-all"
              >
                <span>PLAN YOUR JOURNEY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-center gap-3 text-xs text-[#E9E0D2]/80">
                <a
                  href="https://wa.me/919447000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
