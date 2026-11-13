"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, Globe } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { INITIAL_FOOTER_CONTENT, INITIAL_CONTACT_INFO } from "@/lib/seedData";

interface SocialLink {
  platform: string;
  url: string;
  active: boolean;
}

export default function Footer() {
  const content = useWebsiteContent();
  const footer = content.footerContent || INITIAL_FOOTER_CONTENT;
  const contact = content.contactInfo || INITIAL_CONTACT_INFO;

  const activeSocials: SocialLink[] = (footer.socialLinks || []).filter(
    (s: SocialLink) => s.active && Boolean(s.url)
  );

  return (
    <footer className="bg-[#183D2B] text-[#FFFCF5] pt-10 sm:pt-12 pb-16 sm:pb-20 border-t border-[#8B5E35]/30 relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Row: Brand Identity & Quick WhatsApp Consultation */}
        <div className="pb-6 sm:pb-8 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link href="/" className="inline-block">
              <div className="relative h-11 sm:h-12 w-48 sm:w-52">
                <Image
                  src="/images/logo.png"
                  alt={footer.brandName || "Journeys by Jibu Thomas"}
                  fill
                  sizes="210px"
                  className="object-contain object-left brightness-0 invert opacity-95"
                />
              </div>
            </Link>
            <div className="hidden sm:block w-[1px] h-8 bg-white/20" />
            <p className="font-serif italic text-sm text-[#E9E0D2] break-words">
              {footer.tagline || "South India, tailored around your pace."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(contact.whatsappPrefill || "Hello Jibu, I would like to plan a journey to Kerala.")}`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 border-b border-white/10 text-xs">
          {/* Column 1: Atelier Contact & Socials */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Kerala Atelier
            </span>
            <p className="text-[#FFFCF5]/75 font-light leading-relaxed break-words">
              {footer.atelierDescription || "Boutique destination management company based in Kerala, India. Privately curated holidays across South India."}
            </p>
            <div className="space-y-1.5 pt-1 text-[#E9E0D2] font-light">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                <span className="break-words">{contact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                <a href={`tel:${contact.phoneNumber.replace(/[^0-9+]/g, "")}`} className="hover:text-white transition-colors">
                  {contact.displayPhone || contact.phoneNumber}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8B5E35] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors break-all">
                  {contact.email}
                </a>
              </p>
            </div>

            {/* Dynamic Social Links if present */}
            {activeSocials.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-wider text-[#E9E0D2]/70 font-medium block mb-2">
                  Follow Our Journeys
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSocials.map((soc: SocialLink) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#E9E0D2] hover:text-white text-[11px] font-sans transition-colors inline-flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3 text-[#8B5E35]" />
                      <span>{soc.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Explore
            </span>
            <ul className="space-y-2 text-[#FFFCF5]/75 font-light">
              <li>
                <Link href="/destinations" className="hover:text-[#E9E0D2] transition-colors flex items-center justify-between">
                  <span>Kerala Destinations</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/#travel-with-jibu" className="hover:text-[#E9E0D2] transition-colors flex items-center justify-between">
                  <span>Signature Journeys</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-[#E9E0D2] transition-colors flex items-center justify-between">
                  <span>Curated Experiences</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/#journal" className="hover:text-[#E9E0D2] transition-colors flex items-center justify-between">
                  <span>Travel Guide &amp; Journal</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Journeys by Jibu Thomas */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Journeys by Jibu Thomas
            </span>
            <ul className="space-y-2 text-[#FFFCF5]/75 font-light">
              <li>
                <Link href="/about#jibu" className="hover:text-[#E9E0D2] transition-colors">
                  Meet Jibu
                </Link>
              </li>
              <li>
                <Link href="/about#why-us" className="hover:text-[#E9E0D2] transition-colors">
                  Why travel with us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E9E0D2] transition-colors">
                  How we plan your journey
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#E9E0D2] transition-colors">
                  Traveller stories &amp; reviews
                </Link>
              </li>
              <li>
                <Link href="/about#philosophy" className="hover:text-[#E9E0D2] transition-colors">
                  Responsible travel &amp; local network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Plan & Trust */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E9E0D2] font-semibold block">
              Plan &amp; Trust
            </span>
            <ul className="space-y-2 text-[#FFFCF5]/75 font-light">
              <li>
                <Link href="/contact" className="hover:text-[#E9E0D2] transition-colors font-medium text-white flex items-center justify-between">
                  <span>Plan Your Journey</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8B5E35]" />
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(contact.whatsappPrefill || "Hello Jibu, I would like to plan a journey to Kerala.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] fill-current" />
                  <span>WhatsApp Direct Consultation</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-[#E9E0D2] transition-colors">
                  Email / Phone Enquiry
                </a>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#E9E0D2] transition-colors">
                  Google Verified Reviews (5.0 ★)
                </Link>
              </li>
              <li>
                <span className="text-[#FFFCF5]/60 block text-[11px]">
                  TripAdvisor &bull; Instagram &bull; Facebook
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFCF5]/60 font-light gap-3 text-center sm:text-left">
          <p className="break-words">
            Privacy &bull; Terms &bull; Cookies &bull; &copy; Journeys by Jibu Thomas &bull; www.journeysbyjibuthomas.com
          </p>
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
