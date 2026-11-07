"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Compass, MessageSquare, Phone } from "lucide-react";

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
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-500 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 flex items-center justify-between shadow-2xl ${
            isScrolled
              ? "bg-[#FFFCF5]/90 backdrop-blur-2xl border border-[#E9E0D2] shadow-[0_16px_40px_rgba(24,61,43,0.08)] text-[#242424]"
              : "bg-black/35 backdrop-blur-xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.35)] text-white"
          }`}
        >
          {/* Left: Brand Identity & Logo */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02] shrink-0"
          >
            <div className="relative h-9 sm:h-11 w-36 sm:w-48 transition-all">
              <Image
                src="/images/logo.png"
                alt="Journeys by Jibu Thomas - Boutique Travel Design"
                fill
                priority
                sizes="(max-width: 768px) 150px, 200px"
                className={`object-contain object-left transition-all duration-300 ${
                  !isScrolled
                    ? "brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                    : "drop-shadow-sm"
                }`}
              />
            </div>
            {/* Subtle luxury vertical divider & location stamp on desktop */}
            <div
              className={`hidden xl:flex flex-col pl-3 border-l text-[10px] uppercase tracking-widest leading-tight ${
                isScrolled ? "border-[#E9E0D2] text-[#8B5E35]" : "border-white/20 text-[#E9E0D2]"
              }`}
            >
              <span className="font-semibold">Kerala</span>
              <span className="opacity-75">South India</span>
            </div>
          </Link>

          {/* Center: Editorial Navigation Links with Pill Hover Effect */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isHovered = activeHover === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setActiveHover(link.name)}
                  onMouseLeave={() => setActiveHover(null)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium tracking-wide transition-colors duration-200 ${
                    isScrolled
                      ? "text-[#242424] hover:text-[#183D2B]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="navPillHover"
                      className={`absolute inset-0 rounded-full -z-0 ${
                        isScrolled ? "bg-[#183D2B]/10" : "bg-white/15 backdrop-blur-md"
                      }`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Premium CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#contact"
              className={`hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 ${
                isScrolled
                  ? "bg-[#183D2B] text-[#FFFCF5] hover:bg-[#8B5E35]"
                  : "bg-[#FFFCF5] text-[#183D2B] hover:bg-[#E9E0D2]"
              }`}
            >
              <span>Plan A Journey</span>
              <div
                className={`p-1 rounded-full ${
                  isScrolled ? "bg-white/10 text-white" : "bg-[#183D2B] text-white"
                }`}
              >
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-all active:scale-95 ${
                isScrolled
                  ? "text-[#183D2B] bg-[#E9E0D2]/50 hover:bg-[#E9E0D2]"
                  : "text-white bg-white/15 hover:bg-white/25"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Luxury Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#183D2B]/95 backdrop-blur-2xl text-[#FFFCF5] flex flex-col justify-between p-6 sm:p-10 pt-28 lg:hidden"
          >
            {/* Ambient Background Aura */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#8B5E35]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Staggered Navigation Links */}
            <div className="space-y-4 max-w-md mx-auto w-full text-center">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#E9E0D2] block mb-4">
                Explore Journeys
              </span>

              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-serif text-2xl sm:text-3xl text-[#FFFCF5] hover:text-[#E9E0D2] py-2 transition-colors border-b border-white/10"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions & WhatsApp Link */}
            <div className="space-y-4 max-w-md mx-auto w-full pt-6">
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#734b28] transition-all shadow-xl active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Begin Bespoke Planning</span>
              </Link>

              <div className="flex items-center justify-center gap-4 text-xs text-[#E9E0D2]/80 pt-2">
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
