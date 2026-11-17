"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Search,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { trackWhatsAppClick } from "@/lib/analytics";

interface Article {
  id: string;
  issueNumber: string;
  category: string;
  categoryKey: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
  fullContent?: string[];
  takeaways?: string[];
}

export default function BlogClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/content/journal");
        if (res.ok) {
          const data = await res.json();
          setArticles(data.articles || []);
        }
      } catch (err) {
        console.error("Failed to load blog articles", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const categories = [
    { id: "all", label: "All Stories" },
    { id: "planning", label: "Planning & Timing" },
    { id: "destinations", label: "Highlands & Coasts" },
    { id: "backwaters", label: "Backwaters" },
    { id: "family", label: "Family & Senior Care" },
  ];

  const filtered = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      activeCategory === "all" ||
      art.categoryKey?.toLowerCase() === activeCategory ||
      art.category?.toLowerCase().includes(activeCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
      {/* Return to Home Breadcrumb */}
      <div>
        <Link
          href="/#journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35] hover:text-[#183D2B] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </Link>
      </div>

      {/* Blog Page Editorial Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
          <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
          <span>JOURNAL &bull; TRAVEL DISPATCHES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.08]">
          Travel Stories &amp;{" "}
          <span className="italic font-normal underline decoration-[#8B5E35]/40 decoration-1 underline-offset-8">
            Field Insights.
          </span>
        </h1>
        <p className="text-base sm:text-xl text-[#242424]/80 font-light leading-relaxed pt-2">
          Written by founder Jibu Thomas from two decades of curating private routes across South India. Honest perspectives on timing, secluded stays, and slow travel.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8B5E35] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, Munnar, houseboats, timing..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#FFFCF5] border border-[#E9E0D2] text-xs text-[#242424] focus:outline-none focus:border-[#183D2B] transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              type="button"
              suppressHydrationWarning
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#183D2B] text-white shadow-sm"
                  : "bg-white border border-[#E9E0D2] text-[#242424]/75 hover:border-[#183D2B]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Listing */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-[#183D2B] font-semibold">
          <div className="w-7 h-7 rounded-full border-2 border-[#183D2B] border-t-transparent animate-spin mx-auto mb-2" />
          Loading dispatches...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-[#E9E0D2] text-center space-y-3">
          <BookOpen className="w-8 h-8 text-[#8B5E35] mx-auto opacity-50" />
          <h3 className="text-base font-serif font-bold text-[#183D2B]">No articles match your search</h3>
          <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
            Try searching for &quot;monsoon&quot;, &quot;tea&quot;, &quot;houseboat&quot;, or reset your filters.
          </p>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="px-5 py-2 rounded-full bg-[#183D2B] text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <article
              key={art.id}
              className="rounded-[2.2rem] bg-white border border-[#E9E0D2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <Link href={`/blog/${art.id}`} className="block relative h-60 w-full overflow-hidden">
                  <Image
                    src={art.image || "/images/generated/tea-plantation-approach.webp"}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#183D2B] text-[10px] uppercase font-bold tracking-wider shadow">
                    {art.category}
                  </span>
                  <span className="absolute bottom-3 left-4 right-4 text-white text-xs font-serif italic drop-shadow">
                    {art.issueNumber}
                  </span>
                </Link>

                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#242424]/60">
                    <span className="flex items-center gap-1 text-[#8B5E35] font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                    <span>{art.date}</span>
                  </div>

                  <Link href={`/blog/${art.id}`}>
                    <h3 className="text-xl font-serif text-[#183D2B] leading-snug group-hover:text-[#8B5E35] transition-colors">
                      {art.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#242424]/75 font-light leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-[#E9E0D2]/70 mt-2 flex items-center justify-between">
                <Link
                  href={`/blog/${art.id}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#183D2B] font-semibold hover:text-[#8B5E35] transition-colors cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/919447000000?text=${encodeURIComponent(`Hello Jibu, I just read your article "${art.title}" on the website.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("blog_card", art.title)}
                  className="p-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                  title="Ask Jibu about this"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
