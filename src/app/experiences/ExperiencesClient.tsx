"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Clock,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";

interface Experience {
  id: string;
  title: string;
  category: "culinary" | "heritage" | "plantations" | "backwaters" | "wildlife" | "wellness";
  categoryLabel: string;
  location: string;
  duration: string;
  timing: string;
  image: string;
  leadQuote: string;
  description: string;
  highlights: string[];
  insiderTip: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: "toddy-culinary-walk",
    title: "Backwater Toddy Shop & Syrian Christian Culinary Trail",
    category: "culinary",
    categoryLabel: "Food & Culinary",
    location: "Kuttanad & Alleppey",
    duration: "Half Day (4 Hours)",
    timing: "Late Morning to Afternoon",
    image: "/images/generated/houseboat-backwaters.jpg",
    leadQuote: "“Kerala's real kitchen is found in riverside hearths, not luxury dining rooms.”",
    description:
      "Step far beyond commercial resort buffets into the true epicurean heart of Central Kerala. Travel along quiet water canals to an authentic, family-run village toddy shop and a Syrian Christian home kitchen where duck roast, pearl spot (Karimeen Pollichathu), and freshly drawn sweet coconut sap are prepared with heirloom recipes.",
    highlights: [
      "Taste freshly drawn non-fermented sweet neera and traditional toddy",
      "Karimeen Pollichathu slow-cooked inside charred banana leaves",
      "Private cooking masterclass with an elder Syrian Christian home cook",
      "Explore village canal paths untouched by motor vehicles",
    ],
    insiderTip: "Come with a healthy appetite; the spice levels are tailored entirely to your palate.",
  },
  {
    id: "munnar-tea-master",
    title: "Sunrise Tea Master Walk & Private Factory Cupping",
    category: "plantations",
    categoryLabel: "Highlands & Tea",
    location: "Munnar Highlands (5,000 ft)",
    duration: "3.5 Hours",
    timing: "Sunrise (06:00 AM – 09:30 AM)",
    image: "/images/generated/tea-plantation-approach.jpg",
    leadQuote: "“Watching the first morning rays slice through mountain mist over 100-year-old tea bushes.”",
    description:
      "Walk the high slopes of Lockhart and Kolukkumalai with a retired third-generation tea estate superintendent. Learn the delicate art of fine leaf plucking ('two leaves and a bud'), tour a century-old orthdox wooden tea factory, and participate in a private professional tea cupping session tasting white, green, and golden pekoe teas.",
    highlights: [
      "Witness misty dawn break over emerald rolling valleys with zero tourists",
      "Hands-on demonstration of orthodox rolling and oxidation techniques",
      "Private tea cupping and flavor evaluation with an estate taster",
      "Fresh hot plantation breakfast served overlooking mountain waterfalls",
    ],
    insiderTip: "Bring a light fleece jacket; highland mornings can be pleasantly crisp (12°C–15°C).",
  },
  {
    id: "fort-kochi-historian",
    title: "Fort Kochi Behind the Façades with a Maritime Historian",
    category: "heritage",
    categoryLabel: "Culture & Heritage",
    location: "Fort Kochi & Mattancherry",
    duration: "3 Hours",
    timing: "Morning or Late Afternoon",
    image: "/images/generated/fort-kochi-heritage.jpg",
    leadQuote: "“Three thousand years of global sea trade carved into timber, stone, and narrow alleys.”",
    description:
      "Fort Kochi is far more than fishing nets and souvenir shops. Walk alongside a published local historian who unlocks the hidden courtyards of Portuguese grand houses, centuries-old spice warehouses in Jew Town, 400-year-old Dutch graves, and the secret maritime trade routes that connected Kerala to Venice and Lisbon.",
    highlights: [
      "Access to private 17th-century merchant courtyard houses",
      "The true story behind the Chinese fishing nets and Malabar pepper cartels",
      "Walk the historic spice godowns smelling of ginger, nutmeg, and black pepper",
      "Conclude with afternoon cardamom tea at a secluded colonial club",
    ],
    insiderTip: "Late afternoon walks offer softer lighting for photography and a cool ocean breeze.",
  },
  {
    id: "silent-canoe-backwaters",
    title: "Silent Canoe Navigation Through Lost Village Canals",
    category: "backwaters",
    categoryLabel: "Backwaters & Waterways",
    location: "Kumarakom & Vembanad Wetlands",
    duration: "3 Hours",
    timing: "Dawn (06:30 AM) or Sunset (04:30 PM)",
    image: "/images/generated/luxury-resort-stay.jpg",
    leadQuote: "“Large diesel houseboats cannot enter these narrow canals. Here, silence is king.”",
    description:
      "While large houseboats dominate the broad lakes, the genuine magic of the backwaters lies in the narrow, shaded waterways where village life unfolds. Drift on a silent wooden country boat propelled only by a long bamboo pole, gliding past kingfishers, duck farmers, coir-makers, and blooming purple water lilies.",
    highlights: [
      "Navigate shallow waterways inaccessible to commercial motor boats",
      "Observe morning village life: school canoes, toddy tappers, and coir weavers",
      "Prime birdwatching for pied kingfishers, egrets, and cormorants",
      "Fresh coconut water harvested right beside the canal bank",
    ],
    insiderTip: "Dawn departures are peaceful and quiet; the water reflects the sky like glass.",
  },
  {
    id: "periyar-bamboo-rafting",
    title: "Private Bamboo Rafting & Forest Trekking in Periyar",
    category: "wildlife",
    categoryLabel: "Wildlife & Wilderness",
    location: "Thekkady / Periyar Tiger Reserve",
    duration: "Full Day (Dawn to Dusk)",
    timing: "07:30 AM – 04:30 PM",
    image: "/images/generated/hero-kerala.jpg",
    leadQuote: "“Gliding across the submerged forest tree trunks with native tribal wardens.”",
    description:
      "A rare wilderness expedition operated with former tribal poachers who are now trained conservation guardians of Periyar. Hike through evergreen and moist deciduous forests before boarding handcrafted bamboo rafts across the deep waters of Periyar Lake, surrounded by the calls of Nilgiri langurs and wild Asian elephants.",
    highlights: [
      "Guided by indigenous Mannan and Paliyan community trackers",
      "Chance sightings of gaur (Indian bison), otters, and wild elephants",
      "Picnic lunch on a secluded island in the center of the lake",
      "Interpretive botany identifying wild cinnamon, orchids, and medicinal moss",
    ],
    insiderTip: "Wear comfortable walking shoes with ankle support and neutral-toned clothing.",
  },
  {
    id: "doctor-led-ayurveda",
    title: "Authentic Doctor-Led Ayurvedic Consultation & Wellness Retreat",
    category: "wellness",
    categoryLabel: "Ayurveda & Wellness",
    location: "Marari Coast & Central Kerala",
    duration: "Half Day to Multi-Day",
    timing: "Morning Consultations",
    image: "/images/generated/coastal-varkala.jpg",
    leadQuote: "“Not an unverified spa rub, but a 5,000-year-old living science of natural balance.”",
    description:
      "Kerala is the global birthplace of authentic Ayurveda. We bypass commercial hotel spas and connect you with revered, lineage-trained Ayurvedic Vaidyas (physicians). Experience a pulse diagnosis (Nadi Pariksha), bespoke herbal oil formulation, and traditional Abhyanga and Shirodhara treatments tailored strictly to your individual dosha constitution.",
    highlights: [
      "In-depth personal diagnosis with an experienced senior Ayurvedic physician",
      "Authentic four-hand synchronized medicated oil massage (Abhyanga)",
      "Continuous stream of warm herbal oil over the forehead (Shirodhara)",
      "Personalized lifestyle and dietary recommendations to take home",
    ],
    insiderTip: "Schedule treatments during unhurried days with no long transfers planned afterward.",
  },
];

export default function ExperiencesClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.category === activeCategory);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
          <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
          <span>CURATED LOCAL ACCESS &bull; PRIVATE PERSPECTIVES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08]">
          Curated Experiences,{" "}
          <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
            Beyond the Tourist Track.
          </span>
        </h1>
        <p className="text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed pt-2">
          Real luxury in Kerala is access: meeting the tea planter at dawn, drifting into silent village canals where houseboats cannot fit, and sitting down in a family home kitchen. Jibu Thomas personally selects every guide, elder, and naturalist we partner with.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: "all", label: "All Experiences" },
          { id: "culinary", label: "Food & Cuisine" },
          { id: "plantations", label: "Highlands & Tea" },
          { id: "heritage", label: "Heritage & History" },
          { id: "backwaters", label: "Silent Backwaters" },
          { id: "wildlife", label: "Wildlife & Nature" },
          { id: "wellness", label: "Authentic Ayurveda" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === tab.id
                ? "bg-[#183D2B] text-[#FFFCF5] shadow-md"
                : "bg-white border border-[#E9E0D2] text-[#242424]/75 hover:border-[#183D2B] hover:text-[#183D2B]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filtered.map((exp) => (
          <article
            key={exp.id}
            id={exp.id}
            className="rounded-[2.2rem] bg-white border border-[#E9E0D2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
          >
            <div>
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#183D2B] text-[10px] uppercase font-bold tracking-wider shadow">
                  {exp.categoryLabel}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E9E0D2]" />
                    <span>{exp.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E9E0D2]" />
                    <span>{exp.duration}</span>
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif text-[#183D2B] leading-snug font-normal group-hover:text-[#8B5E35] transition-colors">
                  {exp.title}
                </h3>
                <p className="font-serif italic text-xs text-[#8B5E35] leading-relaxed">
                  {exp.leadQuote}
                </p>
                <p className="text-xs sm:text-sm text-[#242424]/75 font-light leading-relaxed">
                  {exp.description}
                </p>

                {/* Signature Highlights */}
                <div className="pt-2 space-y-2 border-t border-[#E9E0D2]">
                  <span className="text-[10px] uppercase tracking-widest text-[#183D2B] font-semibold block">
                    What Makes It Special
                  </span>
                  <ul className="space-y-1.5">
                    {exp.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="text-xs text-[#242424]/85 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5E35] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Insider Tip */}
                <div className="p-3.5 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-[11px] text-[#242424]/75">
                  <strong className="text-[#8B5E35] font-semibold block mb-0.5 uppercase tracking-wider text-[10px]">
                    Jibu&apos;s Insider Note:
                  </strong>
                  <span>{exp.insiderTip}</span>
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-6 sm:p-7 pt-0 flex items-center justify-between gap-3 border-t border-[#E9E0D2]/60 mt-4">
              <Link
                href={`/plan-your-journey?experience=${encodeURIComponent(exp.title)}`}
                onClick={() => trackCTAClick("Inquire Experience", `/plan-your-journey?experience=${exp.title}`, "experiences_page")}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#183D2B] font-semibold hover:text-[#8B5E35] transition-colors"
              >
                <span>Add to My Itinerary</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/919447000000?text=${encodeURIComponent(`Hello Jibu, I would like to include the "${exp.title}" in my Kerala journey.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("experiences_card", exp.title)}
                className="p-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                title="Chat with Jibu on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Philosophy Callout */}
      <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#183D2B] text-white flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-[#E9E0D2] font-semibold block">
            OUR PROMISE
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FFFCF5]">
            Zero Commission Tourist Traps. 100% Authentic Encounters.
          </h3>
          <p className="text-xs sm:text-sm text-[#FFFCF5]/80 font-light max-w-2xl leading-relaxed">
            We strictly forbid stopping at commercial spice emporiums or forced souvenir factories. Every encounter on your journey is chosen for its dignity, warmth, and cultural integrity.
          </p>
        </div>
        <Link
          href="/plan-your-journey"
          className="px-8 py-4 rounded-full bg-[#8B5E35] hover:bg-[#a06d3f] text-white text-xs uppercase tracking-widest font-semibold transition-all shrink-0 shadow-lg"
        >
          Curate With Jibu
        </Link>
      </div>
    </div>
  );
}

