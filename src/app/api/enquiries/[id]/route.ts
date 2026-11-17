import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { EnquiryModel } from "@/models/Enquiry";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid enquiry ID" }, { status: 400 });
    }

    const body = await req.json();
    await connectDB();

    const allowedUpdates = ["status", "adminNotes"];
    const updates: any = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    const query = mongoose.isValidObjectId(id) ? { $or: [{ _id: id }, { id }] } : { $or: [{ _id: id }, { id }] };
    const updated = await EnquiryModel.findOneAndUpdate(query, updates, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    console.error("[Enquiry PATCH Error]:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid enquiry ID" }, { status: 400 });
    }

    await connectDB();

    const query = mongoose.isValidObjectId(id) ? { $or: [{ _id: id }, { id }] } : { $or: [{ _id: id }, { id }] };
    const deleted = await EnquiryModel.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (error: any) {
    console.error("[Enquiry DELETE Error]:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry." },
      { status: 500 }
    );
  }
}
