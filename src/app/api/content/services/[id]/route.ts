import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { getAdminSession } from "@/lib/auth";
import { deleteUploadThingFiles } from "@/lib/uploadthing-server";
import { invalidateContentCache } from "@/lib/contentService";

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
    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid service ID provided." }, { status: 400 });
    }

    const body = await req.json();
    await connectDB();

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const existing = await ServiceModel.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (body.image !== undefined && body.image.trim() !== existing.image) {
      const oldImage = existing.image;
      if (oldImage) {
        deleteUploadThingFiles([oldImage]).catch((err) =>
          console.warn("[UploadThing] Failed to delete replaced service image:", err)
        );
      }
    }

    const updated = await ServiceModel.findOneAndUpdate(
      query,
      { $set: body },
      { new: true }
    );

    invalidateContentCache();
    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error("[Services PUT Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to update service." }, { status: 500 });
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
      return NextResponse.json({ error: "Invalid service ID provided." }, { status: 400 });
    }

    await connectDB();

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const deleted = await ServiceModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (deleted.image) {
      deleteUploadThingFiles([deleted.image]).catch((err) => {
        console.warn("[UploadThing] Failed to delete file after service deletion:", err);
      });
    }

    invalidateContentCache();
    return NextResponse.json({ success: true, message: "Service deleted." });
  } catch (error: any) {
    console.error("[Services DELETE Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to delete service." }, { status: 500 });
  }
}
