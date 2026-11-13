import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJourney extends Document {
  id: string;
  number: string;
  title: string;
  route: string;
  duration: string;
  shortVibe: string;
  overview: string;
  highlights: string[];
  image: string;
  order: number;
}

const JourneySchema = new Schema<IJourney>(
  {
    id: { type: String, required: true, unique: true, index: true },
    number: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    route: { type: String, required: true },
    duration: { type: String, required: true },
    shortVibe: { type: String, required: true },
    overview: { type: String, required: true },
    highlights: [{ type: String }],
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const JourneyModel: Model<IJourney> =
  mongoose.models.Journey || mongoose.model<IJourney>("Journey", JourneySchema);

