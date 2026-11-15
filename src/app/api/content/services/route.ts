import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { getAdminSession } from "@/lib/auth";
import { INITIAL_SERVICES } from "@/lib/seedData";

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, services: INITIAL_SERVICES });
    }

    const services = await ServiceModel.find().sort({ order: 1 }).lean();
    if (!services || services.length === 0) {
      return NextResponse.json({ success: true, services: INITIAL_SERVICES });
    }

    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error("[Services GET Error]:", error);
    return NextResponse.json({ success: true, services: INITIAL_SERVICES });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, shortVibe, description, points, image, order } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    await connectDB();

    const slugId =
      body.id ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newService = await ServiceModel.create({
      id: slugId,
      number: body.number || "01",
      title: title.trim(),
      shortVibe: shortVibe || "",
      description: description.trim(),
      points: Array.isArray(points) ? points : [],
      image: image || "/images/services/private-chauffeur.jpg",
      order: Number(order) || 0,
    });

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error: any) {
    console.error("[Services POST Error]:", error);
    return NextResponse.json({ error: "Failed to create service." }, { status: 500 });
  }
}

