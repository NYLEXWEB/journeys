import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactInfo extends Document {
  whatsappNumber: string;
  whatsappMessage: string;
  phoneNumber: string;
  phoneDisplay: string;
  email: string;
  address: string;
  conciergeTitle: string;
  conciergeSubtitle: string;
  conciergeNote: string;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    whatsappNumber: { type: String, default: "919447000000" },
    whatsappMessage: {
      type: String,
      default: "Hello Jibu, I would like to enquire about planning a luxury journey to Kerala.",
    },
    phoneNumber: { type: String, default: "+919447000000" },
    phoneDisplay: { type: String, default: "+91 (0) 9447 000 000" },
    email: { type: String, default: "contact@journeysbyjibuthomas.com" },
    address: { type: String, default: "Kochi, Kerala • South India" },
    conciergeTitle: { type: String, default: "Direct Consultation with Jibu Thomas" },
    conciergeSubtitle: { type: String, default: "Personalized South India travel planning" },
    conciergeNote: {
      type: String,
      default: "Every itinerary is personally designed, verified, and managed from our Kerala atelier.",
    },
  },
  { timestamps: true }
);

export const ContactInfoModel: Model<IContactInfo> =
  mongoose.models.ContactInfo || mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);

