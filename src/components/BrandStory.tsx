import React from "react";
import Image from "next/image";
import { Leaf, MapPin } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FFFCF5] relative overflow-hidden">
      {/* Subtle organic background curve */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E9E0D2]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image: Kerala Backwaters & Houseboat */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/images/generated/houseboat-backwaters.jpg"
                  alt="Traditional luxury houseboat gliding through tranquil Kerala backwaters"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-widest text-[#E9E0D2] font-medium">
                    Alleppey &amp; Kumarakom
                  </p>
                  <p className="font-serif text-lg text-white/95">
                    Slow travel through tranquil palm-fringed waterways
                  </p>
                </div>
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-8 bg-[#183D2B] text-[#FFFCF5] p-5 sm:p-6 rounded-xl shadow-xl max-w-[240px] sm:max-w-[260px] border border-[#8B5E35]/30">
                <Leaf className="w-5 h-5 text-[#8B5E35] mb-2" />
                <p className="text-xs font-serif italic leading-relaxed text-[#FFFCF5]/90">
                  &ldquo;A journey that reflects who you are, what you enjoy, and how you wish to experience a place.&rdquo;
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#E9E0D2]">
                    Boutique Travel Design
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.2em] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Kerala &amp; South India</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#183D2B] font-light leading-[1.15]">
                Travel Should Be Much More Than Visiting Destinations.
              </h2>
            </div>

            <div className="space-y-6 text-[#242424]/85 font-sans text-base sm:text-lg leading-relaxed font-light">
              <p className="text-lg sm:text-xl text-[#183D2B] font-serif italic border-l-2 border-[#8B5E35] pl-4">
                &ldquo;Welcome to Journeys by Jibu Thomas, a boutique travel design and destination management company based in Kerala, India, specialising in personalised holidays, privately curated journeys and authentic travel experiences across Kerala and South India.&rdquo;
              </p>

              <p>
                Travel should be much more than visiting destinations, staying in hotels and following sightseeing schedules. A truly memorable journey reflects who you are, what you enjoy and how you wish to experience a place.
              </p>

              <p>
                Whether you seek the tranquil rhythm of emerald backwaters, misty mornings amidst high-altitude tea trails, heritage spice quarters, or quiet coastal sanctuaries, every moment is shaped with care, intimacy, and personal devotion.
              </p>
            </div>

            {/* Editorial Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E9E0D2]">
              <div>
                <p className="text-2xl sm:text-3xl font-serif text-[#183D2B] font-medium">100%</p>
                <p className="text-xs font-sans text-[#242424]/70 uppercase tracking-wider mt-1">
                  Tailored Itineraries
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif text-[#8B5E35] font-medium">Private</p>
                <p className="text-xs font-sans text-[#242424]/70 uppercase tracking-wider mt-1">
                  Chauffeur &amp; Guidance
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif text-[#507C7B] font-medium">Owner-Led</p>
                <p className="text-xs font-sans text-[#242424]/70 uppercase tracking-wider mt-1">
                  Personal Care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
