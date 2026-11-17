import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deleteUploadThingFiles } from "@/lib/uploadthing-server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { url, key, urls } = body;

    const targets: (string | undefined | null)[] = [];
    if (url) targets.push(url);
    if (key) targets.push(key);
    if (Array.isArray(urls)) targets.push(...urls);

    if (targets.length === 0) {
      return NextResponse.json({ success: true, message: "No targets to delete" });
    }

    const success = await deleteUploadThingFiles(targets);
    return NextResponse.json({ success, deleted: targets });
  } catch (error: any) {
    console.error("[UploadThing Delete Error]:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete file" }, { status: 500 });
  }
}
