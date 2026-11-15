import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { getAdminSession } from "@/lib/auth";

export async function PUT(
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

    const updated = await ServiceModel.findOneAndUpdate(
      { $or: [{ id }, { _id: id }] },
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error("[Services PUT Error]:", error);
    return NextResponse.json({ error: "Failed to update service." }, { status: 500 });
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

    const deleted = await ServiceModel.findOneAndDelete({
      $or: [{ id }, { _id: id }],
    });

    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Service deleted." });
  } catch (error: any) {
    console.error("[Services DELETE Error]:", error);
    return NextResponse.json({ error: "Failed to delete service." }, { status: 500 });
  }
}

