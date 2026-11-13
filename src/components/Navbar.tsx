"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
    id: "about",
    name: "About",
    fullName: "1. About Us",
    href: "#about",
    items: [
      { name: "Our Story", href: "#about" },
      { name: "Meet Jibu Thomas", href: "#about" },
      { name: "Our Travel Philosophy", href: "#about" },
      { name: "Why Travel With Us", href: "#about" },
    ],
  },
  {
    id: "destinations",
    name: "Destinations",
    fullName: "2. Destinations",
    href: "#destinations",
    groups: [
      {
        groupTitle: "Kerala",
        items: [
          { name: "Munnar", href: "#destinations" },
          { name: "Wayanad", href: "#destinations" },
          { name: "Thekkady", href: "#destinations" },
          { name: "Alleppey", href: "#destinations" },
          { name: "Kumarakom", href: "#destinations" },
          { name: "Fort Kochi", href: "#destinations" },
          { name: "Varkala", href: "#destinations" },
          { name: "Kovalam", href: "#destinations" },
        ],
      },
      {
        groupTitle: "Tamil Nadu",
        items: [
          { name: "Ooty", href: "#destinations" },
          { name: "Kodaikanal", href: "#destinations" },
          { name: "Madurai", href: "#destinations" },
          { name: "Rameswaram", href: "#destinations" },
        ],
      },
      {
        groupTitle: "Karnataka",
        items: [
          { name: "Coorg", href: "#destinations" },
          { name: "Mysore", href: "#destinations" },
          { name: "Chikmagalur", href: "#destinations" },
          { name: "Hampi", href: "#destinations" },
        ],
      },
    ],
  },
  {
    id: "experiences",
    name: "Experiences",
    fullName: "3. Curated Experiences",
    href: "#experiences",
    items: [
      { name: "Backwater & Houseboat", href: "#experiences" },
      { name: "Hill Stations & Plantation Trails", href: "#experiences" },
      { name: "Nature & Wildlife Experiences", href: "#experiences" },
      { name: "Culture & Heritage Journeys", href: "#experiences" },
      { name: "Beaches & Coastal Escapes", href: "#experiences" },
      { name: "Culinary & Local Food", href: "#experiences" },
      { name: "Village & Community Encounters", href: "#experiences" },
    ],
  },
  {
    id: "travel-with-jibu",
    name: "Journeys",
    fullName: "4. Travel With Jibu",
    href: "#travel-with-jibu",
    groups: [
      {
        groupTitle: "Signature Journeys",
        items: [
          { name: "Kerala Discovery", href: "#travel-with-jibu" },
          { name: "Romantic Escapes", href: "#travel-with-jibu" },
          { name: "Family Holidays", href: "#travel-with-jibu" },
          { name: "Nature & Wildlife", href: "#travel-with-jibu" },
          { name: "South India Heritage", href: "#travel-with-jibu" },
        ],
      },
      {
        groupTitle: "Bespoke Journeys",
        items: [
          { name: "Personalised Planning", href: "#travel-with-jibu" },
          { name: "Custom Itinerary Design", href: "#travel-with-jibu" },
          { name: "Tailor-Made Experiences", href: "#travel-with-jibu" },
        ],
      },
    ],
  },
  {
    id: "services",
    name: "Services",
    fullName: "5. Our Services",
    href: "#services",
    items: [
      { name: "Private Chauffeurs", href: "#services" },
      { name: "Handpicked Stays", href: "#services" },
      { name: "Family & Senior-Friendly", href: "#services" },
      { name: "Special Interest Travel", href: "#services" },
      { name: "End-to-End Coordination", href: "#services" },
    ],
  },
  {
    id: "journal",
    name: "Journal",
    fullName: "6. Travel Journal",
    href: "#journal",
    items: [
      { name: "Destination Guides", href: "#journal" },
      { name: "Travel Tips & Planning", href: "#journal" },
      { name: "Culture & Local Stories", href: "#journal" },
      { name: "Seasonal Travel Inspiration", href: "#journal" },
    ],
  },
  {
    id: "contact",
    name: "Contact",
    fullName: "7. Contact Us",
    href: "#contact",
    items: [
      { name: "Contact Details", href: "#contact" },
      { name: "Enquiry Form", href: "#contact" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed inset-x-0 top-2.5 sm:top-4 z-50 px-3 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pointer-events-none transition-all duration-300 ease-out ${isModalOpen ? "opacity-0 -translate-y-12 pointer-events-none" : "opacity-100 translate-y-0"
          }`}
      >
        <div
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between rounded-full px-3 sm:px-6 py-1.5 sm:py-2.5 ${isScrolled
            ? "bg-[#FFFCF5]/96 backdrop-blur-2xl border border-[#E9E0D2] shadow-[0_16px_40px_rgba(24,61,43,0.12)] text-[#242424]"
            : "bg-black/35 backdrop-blur-xl border border-white/20 shadow-lg text-white"
            }`}
        >
          {/* Brand Logo */}
          <Link
            href="#hero"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.01] shrink-0"
          >
            <div
              className={`relative transition-all duration-500 ${isScrolled ? "h-7 sm:h-9 md:h-10 w-24 sm:w-36 md:w-40" : "h-7 sm:h-10 md:h-11 w-26 sm:w-44 md:w-48"
                }`}
            >
              <Image
                src="/images/logo.png"
                alt="Journeys by Jibu Thomas"
                fill
                priority
                sizes="(max-width: 768px) 140px, 200px"
                className={`object-contain object-left transition-all duration-500 ${!isScrolled
                  ? "brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]"
                  : "drop-shadow-sm"
                  }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation: Single-Line, Uncongested, Elegant */}
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
                    className={`font-sans transition-all duration-200 py-1.5 px-3 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap block ${isScrolled
                      ? "text-[#242424] hover:text-[#183D2B] hover:bg-[#183D2B]/5"
                      : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-sm"
                      } ${isOpen ? (isScrolled ? "bg-[#183D2B]/10 text-[#183D2B]" : "bg-white/15 text-white") : ""}`}
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
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#FFFCF5] rounded-3xl border border-[#E9E0D2] shadow-2xl p-6 text-[#242424] z-50 ${item.id === "destinations"
                          ? "w-[650px]"
                          : item.id === "travel-with-jibu"
                            ? "w-[520px]"
                            : "w-[300px]"
                          }`}
                      >
                        {item.groups ? (
                          <div className={`grid gap-6 ${item.id === "destinations" ? "grid-cols-3" : "grid-cols-2"}`}>
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

          {/* Right Action: Clean Uncongested CTA Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href="#contact"
              className={`inline-flex items-center gap-1 sm:gap-1.5 transition-all duration-300 uppercase tracking-widest font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap ${isScrolled
                ? "px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs bg-[#183D2B] text-[#FFFCF5] hover:bg-[#8B5E35]"
                : "px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs bg-[#FFFCF5] hover:bg-[#E9E0D2] text-[#183D2B] shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                }`}
            >
              <span className="hidden sm:inline">PLAN YOUR JOURNEY</span>
              <span className="sm:hidden tracking-wider">PLAN</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 sm:p-2 rounded-full transition-all active:scale-95 ${isScrolled
                ? "text-[#183D2B] bg-[#E9E0D2]/50 hover:bg-[#E9E0D2]"
                : "text-white bg-white/15 hover:bg-white/25 backdrop-blur-md"
                }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
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
                          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
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
                href="#contact"
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
