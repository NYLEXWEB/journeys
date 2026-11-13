"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, MessageSquare, Compass, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-[#183D2B] text-[#FFFCF5] pt-20 pb-12 border-t border-[#8B5E35]/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8B5E35]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Callout Banner */}
        <div className="pb-16 mb-16 border-b border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-[#E9E0D2] font-semibold">
              Boutique Travel Design &bull; Kerala &amp; South India
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Ready to begin crafting your private journey?
            </h3>
            <p className="text-xs sm:text-sm text-[#FFFCF5]/75 font-light">
              Connect directly with Jibu Thomas to curate an unhurried, soul-stirring South Indian escape.
            </p>
          </div>
          <Link
            href="#contact"
            className="px-8 py-4 rounded-full bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold hover:bg-[#a06d3f] transition-all shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2"
          >
            <span>PLAN YOUR JOURNEY</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Structured Sitemap Columns matching the 7 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="#hero" className="inline-block">
              <div className="relative h-14 sm:h-16 w-56 sm:w-64">
                <Image
                  src="/images/logo.png"
                  alt="Journeys by Jibu Thomas"
                  fill
                  sizes="(max-width: 768px) 240px, 280px"
                  className="object-contain object-left brightness-0 invert opacity-95"
                />
              </div>
            </Link>

            <p className="font-serif italic text-lg text-[#E9E0D2]">
              Travel, Tailored Around You.
            </p>

            <p className="text-xs font-sans text-[#FFFCF5]/80 font-light leading-relaxed">
              Boutique travel design and destination management company based in Kerala, India.
              Specialising in personalised holidays, privately curated journeys, and authentic travel
              experiences across Kerala, Tamil Nadu, and Karnataka.
            </p>

            <div className="pt-2 text-xs space-y-2 text-[#E9E0D2]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8B5E35]" />
                <span>Kochi, Kerala &bull; South India</span>
              </p>
              <p className="flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <a
                  href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20plan%20a%20journey%20to%20Kerala."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#25D366]"
                >
                  WhatsApp: +91 (0) 9447 000 000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8B5E35]" />
                <a href="tel:+919447000000" className="hover:text-white transition-colors">
                  +91 (0) 9447 000 000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8B5E35]" />
                <a href="mailto:contact@journeysbyjibuthomas.com" className="hover:text-white transition-colors">
                  contact@journeysbyjibuthomas.com
                </a>
              </p>
            </div>
          </div>

          {/* 1. ABOUT US & 2. DESTINATIONS */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold mb-3">
                1. About Us
              </h4>
              <ul className="space-y-1.5 text-xs text-[#FFFCF5]/80 font-light">
                <li><Link href="#about" className="hover:text-[#E9E0D2] transition-colors">Our Story</Link></li>
                <li><Link href="#about" className="hover:text-[#E9E0D2] transition-colors">Meet Jibu Thomas</Link></li>
                <li><Link href="#about" className="hover:text-[#E9E0D2] transition-colors">Our Travel Philosophy</Link></li>
                <li><Link href="#about" className="hover:text-[#E9E0D2] transition-colors">Why Travel With Us</Link></li>
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold mb-3">
                2. Destinations
              </h4>
              <div className="space-y-2 text-xs text-[#FFFCF5]/80 font-light">
                <div>
                  <span className="text-[#8B5E35] font-semibold block text-[10px] uppercase">Kerala (8)</span>
                  <p className="text-[11px] text-[#FFFCF5]/70">
                    Munnar &bull; Wayanad &bull; Thekkady &bull; Alleppey &bull; Kumarakom &bull; Fort Kochi &bull; Varkala &bull; Kovalam
                  </p>
                </div>
                <div>
                  <span className="text-[#8B5E35] font-semibold block text-[10px] uppercase">Tamil Nadu (4)</span>
                  <p className="text-[11px] text-[#FFFCF5]/70">
                    Ooty &bull; Kodaikanal &bull; Madurai &bull; Rameswaram
                  </p>
                </div>
                <div>
                  <span className="text-[#8B5E35] font-semibold block text-[10px] uppercase">Karnataka (4)</span>
                  <p className="text-[11px] text-[#FFFCF5]/70">
                    Coorg &bull; Mysore &bull; Chikmagalur &bull; Hampi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CURATED EXPERIENCES & 4. TRAVEL WITH JIBU */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold mb-3">
                3. Curated Experiences
              </h4>
              <ul className="space-y-1.5 text-xs text-[#FFFCF5]/80 font-light">
                <li><Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">Backwater &amp; Houseboat</Link></li>
                <li><Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">Hill Stations &amp; Plantation Trails</Link></li>
                <li><Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">Nature &amp; Wildlife Experiences</Link></li>
                <li><Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">Culture &amp; Heritage Journeys</Link></li>
                <li><Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">Beaches &amp; Coastal Escapes</Link></li>
                <li><Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">Culinary &amp; Local Food</Link></li>
                <li><Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">Village &amp; Community Experiences</Link></li>
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold mb-3">
                4. Travel With Jibu
              </h4>
              <ul className="space-y-1 text-xs text-[#FFFCF5]/80 font-light">
                <li className="text-[10px] text-[#8B5E35] uppercase font-semibold">Signature Journeys</li>
                <li><Link href="#travel-with-jibu" className="hover:text-[#E9E0D2] transition-colors">Kerala Discovery &bull; Romantic Escapes</Link></li>
                <li><Link href="#travel-with-jibu" className="hover:text-[#E9E0D2] transition-colors">Family &bull; Wildlife &bull; South India Heritage</Link></li>
                <li className="text-[10px] text-[#8B5E35] uppercase font-semibold pt-1">Bespoke Journeys</li>
                <li><Link href="#travel-with-jibu" className="hover:text-[#E9E0D2] transition-colors">Personalised Planning &bull; Custom Itinerary Design</Link></li>
              </ul>
            </div>
          </div>

          {/* 5. SERVICES, 6. JOURNAL & 7. CONTACT */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold mb-3">
                5. Our Services
              </h4>
              <ul className="space-y-1.5 text-xs text-[#FFFCF5]/80 font-light">
                <li><Link href="#services" className="hover:text-[#E9E0D2] transition-colors">Private Chauffeurs</Link></li>
                <li><Link href="#services" className="hover:text-[#E9E0D2] transition-colors">Handpicked Stays</Link></li>
                <li><Link href="#services" className="hover:text-[#E9E0D2] transition-colors">Family &amp; Senior Friendly</Link></li>
                <li><Link href="#services" className="hover:text-[#E9E0D2] transition-colors">Special Interest Travel</Link></li>
                <li><Link href="#services" className="hover:text-[#E9E0D2] transition-colors">End-to-End Coordination</Link></li>
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold mb-3">
                6. Travel Journal &amp; Reviews
              </h4>
              <ul className="space-y-1.5 text-xs text-[#FFFCF5]/80 font-light">
                <li><Link href="#journal" className="hover:text-[#E9E0D2] transition-colors">Destination Guides</Link></li>
                <li><Link href="#journal" className="hover:text-[#E9E0D2] transition-colors">Travel Tips &amp; Planning</Link></li>
                <li><Link href="#journal" className="hover:text-[#E9E0D2] transition-colors">Culture &amp; Local Stories</Link></li>
                <li><Link href="#reviews" className="hover:text-[#E9E0D2] transition-colors flex items-center gap-1.5 text-[#E9E0D2] font-medium"><span>Google Reviews</span><span className="text-[#FBBC05] text-[10px]">★★★★★ 5.0</span></Link></li>
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold mb-3">
                7. Contact Us
              </h4>
              <ul className="space-y-1.5 text-xs text-[#FFFCF5]/80 font-light">
                <li><Link href="#contact" className="hover:text-[#E9E0D2] transition-colors">Contact Details</Link></li>
                <li><Link href="#contact" className="hover:text-[#E9E0D2] transition-colors">Enquiry Form</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFCF5]/60 font-light gap-4 text-center sm:text-left">
          <p>&copy; 2026 Journeys by Jibu Thomas. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <Link href="#about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="#about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link href="#contact" className="hover:text-white transition-colors">
              Plan Your Journey
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
