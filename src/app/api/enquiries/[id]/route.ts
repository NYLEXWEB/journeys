import { NextRequest, NextResponse } from "next/server";
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
    const body = await req.json();

    await connectDB();

    const allowedUpdates = ["status", "adminNotes"];
    const updates: any = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    const updated = await EnquiryModel.findByIdAndUpdate(id, updates, {
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
    await connectDB();

    const deleted = await EnquiryModel.findByIdAndDelete(id);
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

