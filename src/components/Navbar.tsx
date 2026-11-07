"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Who We Are", href: "#about" },
    { name: "The Process", href: "#approach" },
    { name: "Journeys", href: "#journeys" },
    { name: "Destinations", href: "#destinations" },
    { name: "Reviews", href: "#reviews" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FFFCF5]/95 backdrop-blur-md shadow-sm border-b border-[#E9E0D2]/70 py-3 text-[#242424]"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-white"
      }`}
    >
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="#hero"
            className="flex items-center group transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative h-13 sm:h-16 md:h-18 w-52 sm:w-64 md:w-72 transition-all">
              <Image
                src="/images/logo.png"
                alt="Journeys by Jibu Thomas - Boutique Travel Design"
                fill
                priority
                sizes="(max-width: 768px) 220px, 300px"
                className={`object-contain object-left transition-all duration-300 drop-shadow-md ${
                  !isScrolled ? "brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" : ""
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-[14px] font-medium tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] hover:after:w-full after:transition-all after:duration-300 ${
                  isScrolled
                    ? "text-[#242424] hover:text-[#183D2B] after:bg-[#183D2B]"
                    : "text-white/90 hover:text-white after:bg-white drop-shadow-sm"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action / CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-medium tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 ${
                isScrolled
                  ? "bg-[#183D2B] text-[#FFFCF5] hover:bg-[#112d1f]"
                  : "bg-[#FFFCF5] text-[#183D2B] hover:bg-[#E9E0D2]"
              }`}
            >
              <span>Plan Your Journey</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isScrolled
                ? "text-[#183D2B] hover:bg-[#E9E0D2]/50"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer with Smooth Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#FFFCF5]/98 backdrop-blur-xl border-b border-[#E9E0D2] shadow-2xl overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-3 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#242424] hover:text-[#183D2B] py-2.5 text-base font-serif font-medium tracking-wide border-b border-[#E9E0D2]/40 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-[#183D2B] text-[#FFFCF5] text-xs uppercase tracking-wider font-medium hover:bg-[#112d1f] transition-all shadow-md active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>Plan Your Journey</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
