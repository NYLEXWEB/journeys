import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { ContactInfoModel } from "@/models/ContactInfo";
import { INITIAL_CONTACT_INFO } from "@/lib/seedData";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ contact: INITIAL_CONTACT_INFO, isLiveDb: false });
    }
    const contact = await ContactInfoModel.findOne().lean();
    return NextResponse.json({
      contact: contact || INITIAL_CONTACT_INFO,
      isLiveDb: true,
    });
  } catch (err: any) {
    return NextResponse.json({ contact: INITIAL_CONTACT_INFO, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifyAuthRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }

    const body = await req.json();
    const {
      whatsappNumber,
      whatsappMessage,
      phoneNumber,
      phoneDisplay,
      email,
      address,
      conciergeTitle,
      conciergeSubtitle,
      conciergeNote,
    } = body;

    let contact = await ContactInfoModel.findOne();
    if (!contact) {
      contact = new ContactInfoModel(INITIAL_CONTACT_INFO);
    }

    if (whatsappNumber !== undefined) contact.whatsappNumber = whatsappNumber.trim();
    if (whatsappMessage !== undefined) contact.whatsappMessage = whatsappMessage.trim();
    if (phoneNumber !== undefined) contact.phoneNumber = phoneNumber.trim();
    if (phoneDisplay !== undefined) contact.phoneDisplay = phoneDisplay.trim();
    if (email !== undefined) contact.email = email.trim();
    if (address !== undefined) contact.address = address.trim();
    if (conciergeTitle !== undefined) contact.conciergeTitle = conciergeTitle.trim();
    if (conciergeSubtitle !== undefined) contact.conciergeSubtitle = conciergeSubtitle.trim();
    if (conciergeNote !== undefined) contact.conciergeNote = conciergeNote.trim();

    await contact.save();

    return NextResponse.json({ success: true, contact });
  } catch (err: any) {
    console.error("PUT Contact error:", err);
    return NextResponse.json({ error: err.message || "Failed to update contact info" }, { status: 500 });
  }
}
