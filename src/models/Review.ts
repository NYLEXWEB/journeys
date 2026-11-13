import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  author: string;
  avatarColor: string;
  avatarInitial: string;
  location: string;
  isLocalGuide: boolean;
  guideStats?: string;
  rating: number;
  relativeTime: string;
  tripType?: string;
  text: string;
  ownerResponse?: {
    date: string;
    text: string;
  };
  order: number;
}

const ReviewSchema = new Schema<IReview>(
  {
    author: { type: String, required: true, trim: true },
    avatarColor: { type: String, default: "bg-[#183D2B]" },
    avatarInitial: { type: String, default: "J" },
    location: { type: String, required: true },
    isLocalGuide: { type: Boolean, default: false },
    guideStats: { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    relativeTime: { type: String, required: true },
    tripType: { type: String, default: "" },
    text: { type: String, required: true },
    ownerResponse: {
      date: { type: String, default: "" },
      text: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

