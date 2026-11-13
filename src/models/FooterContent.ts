import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocialLink {
  platform: string;
  url: string;
  active: boolean;
}

export interface IFooterContent extends Document {
  brandName: string;
  tagline: string;
  atelierDescription: string;
  copyrightText: string;
  socialLinks: ISocialLink[];
}

const FooterContentSchema = new Schema<IFooterContent>(
  {
    brandName: { type: String, default: "Journeys by Jibu Thomas" },
    tagline: { type: String, default: "South India, tailored around your pace." },
    atelierDescription: {
      type: String,
      default:
        "Boutique destination management company based in Kerala, India. Privately curated holidays across South India.",
    },
    copyrightText: {
      type: String,
      default: "© 2026 Journeys by Jibu Thomas. All rights reserved.",
    },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        active: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

export const FooterContentModel: Model<IFooterContent> =
  mongoose.models.FooterContent || mongoose.model<IFooterContent>("FooterContent", FooterContentSchema);

