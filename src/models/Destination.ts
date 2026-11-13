import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDestination extends Document {
  id: string;
  name: string;
  state: "Kerala" | "Tamil Nadu" | "Karnataka";
  stateCategory: "kerala" | "tamil-nadu" | "karnataka";
  region: string;
  image: string;
  shortVibe: string;
  overview: string;
  highlights: string[];
  order: number;
}

const DestinationSchema = new Schema<IDestination>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    state: {
      type: String,
      required: true,
      enum: ["Kerala", "Tamil Nadu", "Karnataka"],
    },
    stateCategory: {
      type: String,
      required: true,
      enum: ["kerala", "tamil-nadu", "karnataka"],
    },
    region: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    shortVibe: { type: String, required: true },
    overview: { type: String, required: true },
    highlights: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const DestinationModel: Model<IDestination> =
  mongoose.models.Destination || mongoose.model<IDestination>("Destination", DestinationSchema);

