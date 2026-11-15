import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  fullName: string;
  email: string;
  phone: string;
  countryOrCity?: string;
  travelDates?: string;
  approximateDays?: string;
  guestsCount?: string;
  adultCount?: number;
  childrenCount?: number;
  childrenAges?: string;
  preferredPace?: string;
  accommodationStyle?: string;
  specialInterests?: string[];
  budgetExpectation?: string;
  discoverySource?: string;
  message?: string;
  preferredContactMethod?: "whatsapp" | "email" | "phone";
  status: "new" | "in-progress" | "contacted" | "confirmed" | "archived";
  adminNotes?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    countryOrCity: { type: String, default: "" },
    travelDates: { type: String, default: "" },
    approximateDays: { type: String, default: "" },
    guestsCount: { type: String, default: "2 Adults" },
    adultCount: { type: Number, default: 2 },
    childrenCount: { type: Number, default: 0 },
    childrenAges: { type: String, default: "" },
    preferredPace: { type: String, default: "Relaxed & Immersive" },
    accommodationStyle: { type: String, default: "Heritage & Boutique Luxury" },
    specialInterests: [{ type: String }],
    budgetExpectation: { type: String, default: "" },
    discoverySource: { type: String, default: "" },
    message: { type: String, default: "" },
    preferredContactMethod: {
      type: String,
      enum: ["whatsapp", "email", "phone"],
      default: "whatsapp",
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "contacted", "confirmed", "archived"],
      default: "new",
      index: true,
    },
    adminNotes: { type: String, default: "" },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

export const EnquiryModel: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

