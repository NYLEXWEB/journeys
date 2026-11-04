import React from "react";
import { Sparkles, Shield, Compass, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function WhyChooseUs() {
  const differentiators = [
    {
      title: "Personally Designed, Never Mass-Produced",
      description:
        "We do not sell pre-packaged group tours or rigid itineraries. Every single journey is custom-curated from a blank canvas to honor your personal style, preferences, and pace.",
      icon: Compass,
    },
    {
      title: "Local Knowledge, Meaningful Discoveries",
      description:
        "Based in Kerala, our roots and relationships allow us to unlock quiet plantation trails, authentic dining spots, and private cultural encounters far removed from commercial tourism.",
      icon: Sparkles,
    },
    {
      title: "Private, Flexible & Comfortable",
      description:
        "Travel in immaculate private vehicles with dedicated chauffeurs who prioritize your safety, comfort, and rhythm. Stop whenever a picturesque view or village tea stall catches your eye.",
      icon: Shield,
    },
    {
      title: "Thoughtful Attention to Detail",
      description:
        "From room orientations capturing the sunrise to dietary considerations and smooth check-ins, our boutique scale ensures meticulous care across every single reservation.",
      icon: HeartHandshake,
    },
    {
      title: "Transparent & Considered Recommendations",
      description:
        "We recommend accommodations and experiences because they are genuinely right for you—not because of commercial arrangements. Honest guidance and integrity guide every suggestion.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#183D2B] text-[#FFFCF5] relative overflow-hidden">
      {/* Delicate background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#8B5E35_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and Brand Credibility */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#E9E0D2] text-xs uppercase tracking-[0.25em] font-semibold">
              <span>The Boutique Difference</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight leading-[1.15]">
              Why Discerning Travellers Choose Us
            </h2>

            <div className="w-12 h-[1px] bg-[#8B5E35]" />

            <p className="text-base sm:text-lg text-[#FFFCF5]/85 font-light font-sans leading-relaxed">
              When you travel with Journeys by Jibu Thomas, you are not simply booking a holiday; you are entrusting your precious leisure time to an owner-led specialist committed to quality and nuance.
            </p>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#E9E0D2] font-semibold">
                Our Guarantee to You
              </p>
              <p className="font-serif italic text-base text-[#FFFCF5]/90">
                &ldquo;Travel, Tailored Around You &mdash; with genuine hospitality, absolute discretion, and authentic South Indian character.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: 5 Refined Differentiators */}
          <div className="lg:col-span-7 space-y-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-6 sm:p-7 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8B5E35]/50 transition-all duration-300 flex items-start gap-5"
                >
                  <div className="p-3 rounded-xl bg-[#8B5E35]/20 text-[#E9E0D2] group-hover:bg-[#8B5E35] group-hover:text-white transition-colors shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-sans text-[#E9E0D2]/70 font-semibold tracking-widest">
                        0{index + 1}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base font-sans text-[#FFFCF5]/80 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

