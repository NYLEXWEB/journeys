"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Compass, MessageSquare } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

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

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "The Process", href: "#approach" },
    { name: "Journeys", href: "#journeys" },
    { name: "Destinations", href: "#destinations" },
    { name: "Reviews", href: "#reviews" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <>
      {/* 
        Dynamic Navbar:
        - Unscrolled: 100% seamlessly merged into the Hero section (full-width, transparent, grand editorial layout).
        - Scrolled: Morphs into a floating luxury glass capsule (compact, centered, frosted ivory).
      */}
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "top-2.5 sm:top-4 px-2.5 sm:px-6 max-w-6xl mx-auto pointer-events-none"
            : "top-0 px-3.5 sm:px-8 lg:px-14 xl:px-20 pt-4 sm:pt-6 pb-3 w-full bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-auto"
        }`}
      >
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
            isScrolled
              ? "pointer-events-auto rounded-full px-4 sm:px-7 py-2 sm:py-3 bg-[#FFFCF5]/92 backdrop-blur-2xl border border-[#E9E0D2] shadow-[0_16px_40px_rgba(24,61,43,0.1)] text-[#242424]"
              : "w-full text-white bg-transparent border-transparent shadow-none"
          }`}
        >
          {/* Brand Identity & Logo */}
          <Link
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-4 group transition-transform duration-300 hover:scale-[1.01] shrink-0"
          >
            <div
              className={`relative transition-all duration-500 ${
                isScrolled ? "h-7 sm:h-9 md:h-10 w-32 sm:w-44 md:w-48" : "h-9 sm:h-12 md:h-15 w-40 sm:w-56 md:w-64"
              }`}
            >
              <Image
                src="/images/logo.png"
                alt="Journeys by Jibu Thomas - Boutique Travel Design"
                fill
                priority
                sizes="(max-width: 768px) 160px, 260px"
                className={`object-contain object-left transition-all duration-500 ${
                  !isScrolled
                    ? "brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]"
                    : "drop-shadow-sm"
                }`}
              />
            </div>

            {/* Location Stamp & Descriptor (Visible when merged into hero) */}
            <div
              className={`hidden xl:flex flex-col pl-4 border-l text-[10px] uppercase tracking-[0.2em] leading-tight transition-all duration-500 ${
                isScrolled
                  ? "border-[#E9E0D2] text-[#8B5E35]"
                  : "border-white/20 text-[#E9E0D2] drop-shadow-sm"
              }`}
            >
              <span className="font-semibold">Kerala</span>
              <span className="opacity-80">South India</span>
            </div>
          </Link>

          {/* Center: Editorial Navigation Links */}
          <nav
            className={`hidden lg:flex items-center transition-all duration-500 ${
              isScrolled ? "space-x-1" : "space-x-7 xl:space-x-9"
            }`}
          >
            {navLinks.map((link) => {
              const isHovered = activeHover === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setActiveHover(link.name)}
                  onMouseLeave={() => setActiveHover(null)}
                  className={`relative font-sans transition-all duration-300 ${
                    isScrolled
                      ? "px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[#242424] hover:text-[#183D2B]"
                      : "py-1 text-[14px] xl:text-[14.5px] font-medium tracking-wide text-white/90 hover:text-white drop-shadow-sm after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] hover:after:w-full after:bg-[#E9E0D2] after:transition-all after:duration-300"
                  }`}
                >
                  {isScrolled && isHovered && (
                    <motion.div
                      layoutId="scrolledPillHover"
                      className="absolute inset-0 rounded-full bg-[#183D2B]/10 -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Bespoke Planning CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#contact"
              className={`hidden sm:inline-flex items-center gap-2.5 transition-all duration-300 uppercase tracking-wider font-medium shadow-md hover:shadow-xl hover:scale-105 active:scale-95 ${
                isScrolled
                  ? "px-4 sm:px-6 py-2 rounded-full text-xs bg-[#183D2B] text-[#FFFCF5] hover:bg-[#8B5E35]"
                  : "px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-[12.5px] bg-[#FFFCF5] hover:bg-[#E9E0D2] text-[#183D2B] shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              }`}
            >
              <span>Plan Your Journey</span>
              <div
                className={`p-1 rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isScrolled ? "bg-white/10 text-white" : "bg-[#183D2B] text-white"
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-all active:scale-95 ${
                isScrolled
                  ? "text-[#183D2B] bg-[#E9E0D2]/50 hover:bg-[#E9E0D2]"
                  : "text-white bg-white/15 hover:bg-white/25 backdrop-blur-md"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#183D2B]/96 backdrop-blur-2xl text-[#FFFCF5] flex flex-col justify-between p-6 sm:p-10 pt-24 sm:pt-28 lg:hidden overflow-y-auto max-h-[100dvh]"
          >
            {/* Ambient Background Aura */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#8B5E35]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Staggered Navigation Links */}
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto w-full text-center">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#E9E0D2] block mb-2 sm:mb-4">
                Explore Journeys
              </span>

              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-serif text-2xl sm:text-3xl text-[#FFFCF5] hover:text-[#E9E0D2] py-2 sm:py-2.5 transition-colors border-b border-white/10"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions & WhatsApp Link */}
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto w-full pt-6">
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-3 w-full py-3.5 sm:py-4 rounded-full bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#734b28] transition-all shadow-xl active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Begin Bespoke Planning</span>
              </Link>

              <div className="flex items-center justify-center gap-3 text-xs text-[#E9E0D2]/80 pt-1">
                <a
                  href="https://wa.me/910000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
                <span>&bull;</span>
                <span className="font-serif italic">Boutique Travel Design</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
