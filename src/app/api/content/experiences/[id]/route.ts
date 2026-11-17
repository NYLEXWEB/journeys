import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { verifyAuthRequest } from "@/lib/auth";
import { ExperienceModel } from "@/models/Experience";
import { deleteUploadThingFiles } from "@/lib/uploadthing-server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAuthRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const { title, locations, description, highlights, order, image } = body;
    const idealDuration = body.idealDuration || body.duration;

    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const existing = await ExperienceModel.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    if (title) existing.title = title.trim();
    if (idealDuration) existing.idealDuration = idealDuration.trim();
    if (locations) existing.locations = locations.trim();
    if (description) existing.description = description.trim();
    if (image !== undefined && image.trim() !== existing.image) {
      const oldImage = existing.image;
      existing.image = image.trim();
      if (oldImage) {
        deleteUploadThingFiles([oldImage]).catch((err) =>
          console.warn("[UploadThing] Failed to delete replaced experience image:", err)
        );
      }
    }
    if (highlights && Array.isArray(highlights)) existing.highlights = highlights;
    if (typeof order === "number") existing.order = order;

    await existing.save();

    return NextResponse.json({ success: true, experience: existing });
  } catch (err: any) {
    console.error("PUT Experience error:", err);
    return NextResponse.json({ error: err.message || "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAuthRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }

    const { id } = await context.params;
    const query = mongoose.isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const deleted = await ExperienceModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    // Automatically purge remote cloud assets from UploadThing if uploaded
    if (deleted.image) {
      deleteUploadThingFiles([deleted.image]).catch((err) => {
        console.warn("[UploadThing] Failed to delete file after experience deletion:", err);
      });
    }

    return NextResponse.json({ success: true, message: `Experience ${deleted.title} deleted successfully.` });
  } catch (err: any) {
    console.error("DELETE Experience error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete experience" }, { status: 500 });
  }
}
