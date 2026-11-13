"use client";

import React, { useState, useEffect } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const checkModal = () => {
      const locked =
        document.body.classList.contains("modal-open") ||
        document.documentElement.classList.contains("modal-open") ||
        document.body.style.overflow === "hidden";
      setIsModalOpen(locked);
    };

    const handleScroll = () => {
      const onSubpage = window.location.pathname !== "/";
      const pastHero = window.scrollY > window.innerHeight * 0.8 || onSubpage;
      setIsPastHero(pastHero);
    };

    checkModal();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class", "style"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // WhatsApp only appears once scrolled past Hero into About Us (or on subpages)
  const isVisible = isPastHero && !isModalOpen;

  return (
    <aside
      aria-label="Direct WhatsApp Concierge"
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
          : "opacity-0 pointer-events-none translate-y-8 scale-90"
      }`}
    >
      <a
        href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20enquire%20about%20planning%20a%20luxury%20journey%20to%20Kerala."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry with Jibu Thomas"
        className="group flex items-center p-1 sm:p-2 sm:pr-5 rounded-full bg-[#183D2B]/95 hover:bg-[#183D2B] text-white backdrop-blur-md border border-[#E9E0D2]/30 shadow-[0_10px_30px_rgba(24,61,43,0.35)] hover:shadow-[0_16px_40px_rgba(37,211,102,0.35)] transition-all duration-300 active:scale-90"
      >
        {/* Authentic WhatsApp Green Badge with Official Logo */}
        <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
          <WhatsAppIcon className="w-5 h-5 fill-current" />
        </div>

        {/* Minimalist Editorial Text */}
        <div className="hidden sm:flex flex-col text-left pl-2.5">
          <span className="text-[10px] uppercase tracking-widest text-[#E9E0D2] font-semibold leading-tight">
            WhatsApp Enquiry
          </span>
          <span className="text-xs font-serif text-white/95 leading-tight group-hover:text-[#25D366] transition-colors">
            Chat with Jibu
          </span>
        </div>
      </a>
    </aside>
  );
}
