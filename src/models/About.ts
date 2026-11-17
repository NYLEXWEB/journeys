import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAboutContent extends Document {
  storyBadge: string;
  storyTitle: string;
  storyQuote: string;
  storyImage: string;
  storyDescription: string;
  storyPillars: { title: string; desc: string }[];

  jibuBadge: string;
  jibuTitle: string;
  jibuSubtitle: string;
  jibuImage: string;
  jibuDescription: string;
  jibuStats: { value: string; label: string }[];

  philosophyBadge: string;
  philosophyTitle: string;
  philosophyQuote: string;
  philosophyPillars: { num: string; title: string; desc: string }[];

  whyUsBadge: string;
  whyUsTitle: string;
  whyUsQuote: string;
  whyUsReasons: { title: string; desc: string }[];

  curtainVideo1?: string;
  curtainVideo2?: string;
  curtainImage?: string;
}

const AboutSchema = new Schema<IAboutContent>(
  {
    storyBadge: { type: String, default: "Our Story • Founding Vision" },
    storyTitle: { type: String, default: "The Founding Vision of Journeys by Jibu Thomas" },
    storyQuote: { type: String, default: "South India, experienced with soul, depth, and unhurried grace." },
    storyImage: { type: String, default: "/images/generated/tea-plantation-approach.webp" },
    storyDescription: { type: String, default: "" },
    storyPillars: [{ title: String, desc: String }],

    jibuBadge: { type: String, default: "Founder & Lead Travel Designer" },
    jibuTitle: { type: String, default: "Two decades of personal destination craftsmanship." },
    jibuSubtitle: { type: String, default: "Direct personal accountability for every journey that carries my name." },
    jibuImage: { type: String, default: "/images/generated/fort-kochi-heritage.webp" },
    jibuDescription: { type: String, default: "" },
    jibuStats: [{ value: String, label: String }],

    philosophyBadge: { type: String, default: "Philosophy • The Four Pillars" },
    philosophyTitle: { type: String, default: "How We Approach Every Single Itinerary" },
    philosophyQuote: { type: String, default: "Generous pacing, living heritage, and conscious respect for local hosts." },
    philosophyPillars: [{ num: String, title: String, desc: String }],

    whyUsBadge: { type: String, default: "Standards • Why Travel With Us" },
    whyUsTitle: { type: String, default: "The Discerning Boutique Difference" },
    whyUsQuote: { type: String, default: "No middle-tier sales reps, no hidden commissions, pristine standards." },
    whyUsReasons: [{ title: String, desc: String }],

    curtainVideo1: { type: String, default: "/video/video-1.mp4" },
    curtainVideo2: { type: String, default: "/video/video-4.mp4" },
    curtainImage: { type: String, default: "/images/generated/hero-kerala.webp" },
  },
  { timestamps: true }
);

export const AboutModel: Model<IAboutContent> =
  mongoose.models.About || mongoose.model<IAboutContent>("About", AboutSchema);
