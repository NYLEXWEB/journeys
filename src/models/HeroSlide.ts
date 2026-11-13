import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHeroSlide extends Document {
  slideId: number;
  word: string;
  subWord: string;
  tag: string;
  location: string;
  description: string;
  src: string;
  order: number;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    slideId: { type: Number, required: true, unique: true },
    word: { type: String, required: true },
    subWord: { type: String, default: "" },
    tag: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    src: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const HeroSlideModel: Model<IHeroSlide> =
  mongoose.models.HeroSlide || mongoose.model<IHeroSlide>("HeroSlide", HeroSlideSchema);

