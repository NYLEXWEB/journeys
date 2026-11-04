"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#183D2B] text-[#FFFCF5] pt-20 pb-12 border-t border-[#8B5E35]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Identity & Larger Transparent Logo */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-18 sm:h-22 md:h-24 w-64 sm:w-72 md:w-80">
              <Image
                src="/images/logo-light.png"
                alt="Journeys by Jibu Thomas - Official Brand Logo"
                fill
                sizes="(max-width: 768px) 260px, 320px"
                className="object-contain object-left"
              />
            </div>

            <p className="font-serif italic text-lg text-[#E9E0D2] tracking-wide">
              Travel, Tailored Around You.
            </p>

            <p className="text-sm font-sans text-[#FFFCF5]/80 font-light leading-relaxed max-w-sm">
              Boutique travel design and destination management company based in Kerala, India, specialising in personalised holidays, privately curated journeys and authentic travel experiences across Kerala and South India.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <span className="text-xs uppercase tracking-widest text-[#E9E0D2]">Connect:</span>
              <a
                href="#contact"
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#8B5E35] text-white transition-colors"
                aria-label="Instagram (Placeholder)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#contact"
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#8B5E35] text-white transition-colors"
                aria-label="Facebook (Placeholder)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold">
              Explore Journeys
            </h4>
            <ul className="space-y-2.5 text-sm font-sans font-light text-[#FFFCF5]/85">
              <li>
                <Link href="#about" className="hover:text-[#E9E0D2] transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <Link href="#approach" className="hover:text-[#E9E0D2] transition-colors">
                  Our Boutique Approach
                </Link>
              </li>
              <li>
                <Link href="#experiences" className="hover:text-[#E9E0D2] transition-colors">
                  Signature Experiences
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="hover:text-[#E9E0D2] transition-colors">
                  Kerala Destinations
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="hover:text-[#E9E0D2] transition-colors">
                  Beyond Kerala
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-[#E9E0D2] transition-colors">
                  Travel Inspiration Gallery
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#E9E0D2] transition-colors">
                  Plan Your Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (Client Placeholders) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold">
              Boutique Destination Office
            </h4>
            <p className="text-sm text-[#FFFCF5]/80 font-light leading-relaxed">
              Based in Kerala, India. Dedicated to crafting intimate, privately coordinated travel across South India.
            </p>
            <div className="space-y-3 text-sm text-[#FFFCF5]/85 font-light pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                <span>Kerala, India &mdash; Destination Management</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8B5E35] shrink-0" />
                <span>contact@journeysbyjibuthomas.com (Placeholder)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8B5E35] shrink-0" />
                <span>+91 (0) 000 000 0000 (Placeholder)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFCF5]/60 font-sans tracking-wide gap-4">
          <p>
            &copy; 2026 Journeys by Jibu Thomas. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span>Boutique Travel Design</span>
            <span>&bull;</span>
            <span>Kerala, South India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
