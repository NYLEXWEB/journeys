import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { EnquiryModel } from "@/models/Enquiry";
import { getAdminSession } from "@/lib/auth";
import fs from "fs";
import path from "path";

// Simple IP-based rate limiting for form submissions
const submissionMap = new Map<string, number>();

// Fail-safe file storage helper
const BACKUP_DIR = path.join(process.cwd(), "data");
const BACKUP_FILE = path.join(BACKUP_DIR, "enquiries_backup.json");

function saveBackupEnquiry(enquiry: any) {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    let list: any[] = [];
    if (fs.existsSync(BACKUP_FILE)) {
      const raw = fs.readFileSync(BACKUP_FILE, "utf-8");
      list = JSON.parse(raw);
    }
    list.unshift(enquiry);
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("[Backup Store Error]:", err);
  }
}

function getBackupEnquiries(status?: string | null) {
  try {
    if (!fs.existsSync(BACKUP_FILE)) return [];
    const raw = fs.readFileSync(BACKUP_FILE, "utf-8");
    const list: any[] = JSON.parse(raw);
    if (!status || status === "all") return list;
    return list.filter((e) => e.status === status);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const lastSub = submissionMap.get(ip);

    // Minimum 10 seconds between submissions from the same IP
    if (lastSub && now - lastSub < 10000) {
      return NextResponse.json(
        { error: "Please wait a moment before sending another request." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam check - bots fill out hidden fields
    if (body.website || body.company_hp) {
      return NextResponse.json({ success: true, message: "Enquiry received" });
    }

    const {
      fullName,
      email,
      phone,
      countryOrCity,
      travelDates,
      approximateDays,
      guestsCount,
      adultCount,
      childrenCount,
      childrenAges,
      preferredPace,
      accommodationStyle,
      specialInterests,
      budgetExpectation,
      discoverySource,
      message,
      preferredContactMethod,
    } = body;

    // Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { error: "Please provide a valid telephone or WhatsApp number." },
        { status: 400 }
      );
    }

    const enquiryData = {
      _id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      countryOrCity: countryOrCity?.trim() || "",
      travelDates: travelDates?.trim() || "",
      approximateDays: approximateDays?.trim() || "",
      guestsCount: guestsCount?.trim() || "2 Adults",
      adultCount: Number(adultCount) || 2,
      childrenCount: Number(childrenCount) || 0,
      childrenAges: childrenAges?.trim() || "",
      preferredPace: preferredPace?.trim() || "Relaxed & Immersive",
      accommodationStyle: accommodationStyle?.trim() || "Heritage & Boutique Luxury",
      specialInterests: Array.isArray(specialInterests) ? specialInterests : [],
      budgetExpectation: budgetExpectation?.trim() || "",
      discoverySource: discoverySource?.trim() || "",
      message: message?.trim() || "",
      preferredContactMethod: ["whatsapp", "email", "phone"].includes(preferredContactMethod)
        ? preferredContactMethod
        : "whatsapp",
      status: "new",
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") || "",
      createdAt: new Date().toISOString(),
    };

    // Save to backup file immediately
    saveBackupEnquiry(enquiryData);

    // Also attempt MongoDB Atlas persistence
    try {
      const conn = await connectDB();
      if (conn) {
        await EnquiryModel.create(enquiryData);
      }
    } catch (dbErr) {
      console.warn("[MongoDB Enquiry Fallback to File]:", dbErr);
    }

    submissionMap.set(ip, now);

    return NextResponse.json(
      {
        success: true,
        message: "Your journey enquiry has been received by Jibu Thomas.",
        id: enquiryData._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Enquiry POST Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while saving your request." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let enquiries: any[] = [];

    try {
      const conn = await connectDB();
      if (conn) {
        const query: any = {};
        if (status && status !== "all") {
          query.status = status;
        }
        enquiries = await EnquiryModel.find(query)
          .sort({ createdAt: -1 })
          .limit(100)
          .lean();
      }
    } catch {
      // Fallback to local backup store
    }

    if (enquiries.length === 0) {
      enquiries = getBackupEnquiries(status);
    }

    return NextResponse.json({ success: true, enquiries });
  } catch (error: any) {
    console.error("[Enquiry GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve enquiries." },
      { status: 500 }
    );
  }
}
