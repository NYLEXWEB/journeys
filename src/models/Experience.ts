import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  id: string;
  number: string;
  title: string;
  image: string;
  idealDuration: string;
  locations: string;
  description: string;
  highlights: string[];
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    id: { type: String, required: true, unique: true, index: true },
    number: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    idealDuration: { type: String, required: true },
    locations: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ExperienceModel: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);

