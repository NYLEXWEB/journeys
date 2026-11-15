import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { connectDB } from "@/lib/db";
import { JournalModel } from "@/models/Journal";
import { INITIAL_JOURNAL } from "@/lib/seedData";
import {
  Clock,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Share2,
  Sparkles,
} from "lucide-react";

export const instant = false;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return INITIAL_JOURNAL.map((item) => ({
    id: item.id,
  }));
}

async function getArticle(id: string) {
  try {
    const conn = await connectDB();
    if (conn) {
      const doc = await JournalModel.findOne({ id }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    }
  } catch (err) {
    console.error("Failed to query article from DB:", err);
  }

  // Fallback to static seed data
  const fallback = INITIAL_JOURNAL.find((item) => item.id === id);
  return fallback || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "Story Not Found | Journeys by Jibu Thomas",
    };
  }

  return {
    title: `${article.title} | Journeys by Jibu Thomas`,
    description: article.summary,
    alternates: {
      canonical: `/blog/${article.id}`,
    },
    openGraph: {
      title: `${article.title} | Kerala Travel Journal`,
      description: article.summary,
      url: `https://journeysbyjibuthomas.com/blog/${article.id}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#242424] flex flex-col font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <article className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E35]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 hover:text-[#183D2B] transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Travel Blog</span>
            </Link>
            <span className="text-[#E9E0D2]">&bull;</span>
            <span className="text-[#242424]/60 truncate">{article.category}</span>
          </div>

          {/* Article Header */}
          <header className="space-y-5 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-[#8B5E35] text-xs uppercase tracking-[0.25em] font-semibold">
              <span className="w-6 h-[1.5px] bg-[#8B5E35]" />
              <span>{article.issueNumber || "Dispatch"} &bull; {article.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#183D2B] font-light tracking-tight leading-[1.12]">
              {article.title}
            </h1>

            <p className="text-base sm:text-xl font-serif italic text-[#8B5E35] leading-relaxed">
              &ldquo;{article.subtitle}&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#242424]/70 pt-2 border-t border-[#E9E0D2]/70">
              <span className="font-semibold text-[#183D2B]">
                Curated by Jibu Thomas &bull; Founder &amp; Bespoke Travel Designer
              </span>
              <span className="text-[#E9E0D2]">&bull;</span>
              <span className="flex items-center gap-1 text-[#8B5E35]">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </header>

          {/* Hero Image */}
          {article.image && (
            <div className="relative h-[340px] sm:h-[480px] lg:h-[580px] w-full rounded-[2.5rem] overflow-hidden border border-[#E9E0D2] shadow-lg">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          )}

          {/* Editorial Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pt-4">
            {/* Main Narrative */}
            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-[#242424]/85 font-light leading-relaxed">
              {/* Summary Lead Paragraph */}
              <p className="text-base sm:text-lg font-normal text-[#183D2B] leading-relaxed border-l-2 border-[#8B5E35] pl-4 sm:pl-6 italic">
                {article.summary}
              </p>

              {/* Body Paragraphs */}
              {article.fullContent?.map((para: string, idx: number) => (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              ))}

              {/* Key Takeaways Card */}
              {article.takeaways && article.takeaways.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#E9E0D2] shadow-sm space-y-4 my-8">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#183D2B] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5E35]" />
                    <span>Essential Travel Takeaways</span>
                  </div>
                  <ul className="space-y-3">
                    {article.takeaways.map((t: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#242424]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5E35] shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar Contact / Action Box */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm space-y-6 sticky top-28">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#8B5E35] font-semibold block">
                    Travel With Jibu Thomas
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#183D2B] font-light">
                    Interested in this experience?
                  </h3>
                  <p className="text-xs text-[#242424]/75 font-light leading-relaxed">
                    Every journey is privately designed around your dates, pace, and comfort. Connect directly with founder Jibu Thomas.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={`https://wa.me/919447000000?text=${encodeURIComponent(
                      `Hello Jibu, I just read your article "${article.title}" and would like to ask some questions regarding travel planning.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>WhatsApp Jibu</span>
                  </a>

                  <Link
                    href={`/plan-your-journey?topic=${encodeURIComponent(article.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                  >
                    <span>Plan Around This Topic</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/blog"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider text-[#183D2B]/75 hover:text-[#183D2B] font-medium"
                  >
                    &larr; Back to All Stories
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
