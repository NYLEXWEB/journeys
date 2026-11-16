import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFAQ extends Document {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

const FAQSchema = new Schema<IFAQ>(
  {
    id: { type: String, required: true, unique: true, index: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, default: "General" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FAQModel: Model<IFAQ> =
  mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);
