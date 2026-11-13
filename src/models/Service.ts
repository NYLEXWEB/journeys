import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  id: string;
  number: string;
  title: string;
  shortVibe: string;
  description: string;
  points: string[];
  image: string;
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    id: { type: String, required: true, unique: true, index: true },
    number: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    shortVibe: { type: String, required: true },
    description: { type: String, required: true },
    points: [{ type: String }],
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

