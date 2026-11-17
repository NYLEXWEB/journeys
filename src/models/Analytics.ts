import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnalyticsEvent extends Document {
  type: "pageview" | "click" | "lead" | "conversion";
  visitorId: string;
  sessionId: string;
  path: string;
  title?: string;
  referrer?: string;
  referrerDomain?: string;
  eventName?: string;
  elementText?: string;
  elementLocation?: string;
  category?: string;
  device: {
    type: "mobile" | "desktop" | "tablet";
    browser: string;
    os: string;
    screen?: string;
  };
  location: {
    country: string;
    city?: string;
    ip?: string;
  };
  duration?: number;
  timestamp: Date;
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>(
  {
    type: {
      type: String,
      enum: ["pageview", "click", "lead", "conversion"],
      default: "pageview",
      index: true,
    },
    visitorId: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    title: { type: String, default: "" },
    referrer: { type: String, default: "" },
    referrerDomain: { type: String, default: "Direct", index: true },
    eventName: { type: String, default: "", index: true },
    elementText: { type: String, default: "", index: true },
    elementLocation: { type: String, default: "" },
    category: { type: String, default: "general" },
    device: {
      type: {
        type: String,
        enum: ["mobile", "desktop", "tablet"],
        default: "desktop",
      },
      browser: { type: String, default: "Unknown" },
      os: { type: String, default: "Unknown" },
      screen: { type: String, default: "" },
    },
    location: {
      country: { type: String, default: "India", index: true },
      city: { type: String, default: "" },
      ip: { type: String, default: "" },
    },
    duration: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

// Compound indexes for high-speed dashboard aggregation
AnalyticsEventSchema.index({ timestamp: -1 });
AnalyticsEventSchema.index({ type: 1, timestamp: -1 });
AnalyticsEventSchema.index({ visitorId: 1, timestamp: -1 });
AnalyticsEventSchema.index({ path: 1, timestamp: -1 });

export const AnalyticsEventModel: Model<IAnalyticsEvent> =
  mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEvent>("AnalyticsEvent", AnalyticsEventSchema);
