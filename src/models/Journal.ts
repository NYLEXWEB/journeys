import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJournalArticle extends Document {
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
  fullContent: string[];
  takeaways: string[];
  order: number;
}

const JournalSchema = new Schema<IJournalArticle>(
  {
    id: { type: String, required: true, unique: true, index: true },
    issueNumber: { type: String, required: true },
    category: { type: String, required: true },
    categoryKey: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true },
    readTime: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    fullContent: [{ type: String }],
    takeaways: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const JournalModel: Model<IJournalArticle> =
  mongoose.models.Journal || mongoose.model<IJournalArticle>("Journal", JournalSchema);

