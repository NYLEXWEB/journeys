"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-[#183D2B] text-[#FFFCF5] py-12 sm:py-16 border-t border-[#8B5E35]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Row: Brand Identity & Quick WhatsApp Consultation */}
        <div className="pb-10 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link href="/" className="inline-block">
              <div className="relative h-11 sm:h-12 w-48 sm:w-52">
                <Image
                  src="/images/logo.png"
                  alt="Journeys by Jibu Thomas"
                  fill
                  sizes="210px"
                  className="object-contain object-left brightness-0 invert opacity-95"
                />
              </div>
            </Link>
            <div className="hidden sm:block w-[1px] h-8 bg-white/20" />
            <p className="font-serif italic text-sm text-[#E9E0D2]">
              South India, tailored around your pace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919447000000?text=Hello%20Jibu%2C%20I%20would%20like%20to%20plan%20a%20journey%20to%20Kerala."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp Jibu</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFCF5] text-xs uppercase tracking-wider font-medium border border-white/15 transition-all"
            >
              <span>Plan Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Compact 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-white/10 text-xs">
          {/* Column 1: Atelier Contact */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Kerala Atelier
            </span>
            <p className="text-[#FFFCF5]/75 font-light leading-relaxed">
              Boutique destination management company based in Kerala, India. Privately curated holidays across South India.
            </p>
            <div className="space-y-1.5 pt-1 text-[#E9E0D2] font-light">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                <span>Kochi, Kerala &bull; South India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                <a href="tel:+919447000000" className="hover:text-white transition-colors">
                  +91 (0) 9447 000 000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                <a href="mailto:contact@journeysbyjibuthomas.com" className="hover:text-white transition-colors truncate">
                  contact@journeysbyjibuthomas.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Explore
            </span>
            <ul className="space-y-2 text-[#FFFCF5]/75 font-light">
              <li>
                <Link href="/about" className="hover:text-[#E9E0D2] transition-colors flex items-center justify-between">
                  <span>About Our Story &amp; Jibu</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#E9E0D2] transition-colors flex items-center justify-between">
                  <span>Complete Destination Directory</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-[#E9E0D2] transition-colors">
                  Curated Experiences
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#E9E0D2] transition-colors">
                  Bespoke Services
                </Link>
              </li>
              <li>
                <Link href="/#journal" className="hover:text-[#E9E0D2] transition-colors">
                  Travel Field Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Regions & Coverage */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Regions Traversed
            </span>
            <ul className="space-y-2 text-[#FFFCF5]/75 font-light">
              <li>
                <Link href="/destinations#munnar" className="hover:text-[#E9E0D2] transition-colors">
                  Kerala &bull; Western Ghats Highlands
                </Link>
              </li>
              <li>
                <Link href="/destinations#alleppey" className="hover:text-[#E9E0D2] transition-colors">
                  Kerala &bull; Vembanad Backwaters
                </Link>
              </li>
              <li>
                <Link href="/destinations#madurai" className="hover:text-[#E9E0D2] transition-colors">
                  Tamil Nadu &bull; Temple Architecture
                </Link>
              </li>
              <li>
                <Link href="/destinations#coorg" className="hover:text-[#E9E0D2] transition-colors">
                  Karnataka &bull; Coffee &amp; Heritage
                </Link>
              </li>
              <li>
                <Link href="/destinations#hampi" className="hover:text-[#E9E0D2] transition-colors">
                  UNESCO &bull; Vijayanagara Empire
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Discerning Boutique Standards */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Boutique Standards
            </span>
            <ul className="space-y-2 text-[#FFFCF5]/75 font-light">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#E9E0D2]" />
                <span>Direct personal oversight by Jibu</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#E9E0D2]" />
                <span>Pristine AC fleet with private chauffeurs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#E9E0D2]" />
                <span>Zero commission shopping stops</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#E9E0D2]" />
                <span>24/7 on-ground Kerala concierge</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#E9E0D2]" />
                <span>100% custom-tailored itineraries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFCF5]/60 font-light gap-3 text-center sm:text-left">
          <p>&copy; 2026 Journeys by Jibu Thomas. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Plan Your Journey
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
