import React from "react";
import Image from "next/image";
import { Compass, Sparkles, ShieldCheck } from "lucide-react";

export default function OurApproach() {
  const approaches = [
    {
      number: "01",
      title: "Personally Designed Journeys",
      subtitle: "Tailored to Your Rhythm",
      description:
        "Every itinerary is thoughtfully created around the traveller's interests, expectations, budget, and preferred pace. We take time to listen, understanding what inspires you before crafting a journey that feels entirely your own.",
      icon: Compass,
      image: "/images/generated/tea-plantation-approach.jpg",
      imageAlt: "Munnar rolling tea hills at misty dawn",
    },
    {
      number: "02",
      title: "Authentic Local Experiences",
      subtitle: "Beyond the Conventional Guidebook",
      description:
        "Discover the culture, landscapes, cuisine, and hidden treasures of Kerala through meaningful local experiences. From private plantation walks to village waterways and culinary traditions, we connect you genuinely with South India.",
      icon: Sparkles,
      image: "/images/generated/spice-gardens.jpg",
      imageAlt: "Organic cardamom and spice plantation in Wayanad, Kerala",
    },
    {
      number: "03",
      title: "Thoughtful Travel Coordination",
      subtitle: "Effortless, Discreet & Reliable",
      description:
        "Enjoy a seamless journey with carefully coordinated accommodation, transportation, and experiences. Our dedicated attention ensures peace of mind from your arrival until your journey concludes.",
      icon: ShieldCheck,
      image: "/images/generated/luxury-resort-stay.jpg",
      imageAlt: "Boutique heritage eco-resort overlooking private tropical water",
    },
  ];

  return (
    <section id="approach" className="py-24 sm:py-32 bg-[#E9E0D2]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <span className="text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
            Boutique Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#183D2B] font-light tracking-tight">
            Our Approach to Travel
          </h2>
          <div className="w-12 h-[1px] bg-[#8B5E35] mx-auto my-4" />
          <p className="text-base sm:text-lg text-[#242424]/80 font-light leading-relaxed font-sans">
            We believe the finest journeys are born from genuine personal attention, local insight, and an unhurried appreciation for the places we visit.
          </p>
        </div>

        {/* Editorial Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {approaches.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group bg-[#FFFCF5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E9E0D2]/70 flex flex-col"
              >
                {/* Visual Imagery */}
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#FFFCF5]/90 backdrop-blur-sm text-[#183D2B] text-xs font-serif font-semibold px-3 py-1 rounded-full">
                    {item.number}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-9 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 text-[#8B5E35]">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest font-medium">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif text-[#183D2B] font-normal leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#242424]/80 font-sans text-sm sm:text-base leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E9E0D2]/50 flex items-center justify-between text-xs text-[#507C7B] font-medium tracking-wide">
                    <span>Journeys by Jibu Thomas</span>
                    <span className="text-[#8B5E35] font-serif italic">Bespoke</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
