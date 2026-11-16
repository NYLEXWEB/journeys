import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { getAdminSession } from "@/lib/auth";
import { getCleanUploadThingToken } from "@/lib/uploadthing-server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const token = getCleanUploadThingToken();
    if (!token) {
      return NextResponse.json(
        { error: "UploadThing token not configured in environment variables." },
        { status: 500 }
      );
    }

    const utapi = new UTApi({ token });
    const uploadRes = await utapi.uploadFiles([file]);

    if (!uploadRes || !uploadRes[0] || uploadRes[0].error) {
      throw new Error(uploadRes?.[0]?.error?.message || "Failed to upload file to UploadThing.");
    }

    const uploadedData = uploadRes[0].data;
    const cdnUrl =
      (uploadedData as any).ufsUrl ||
      uploadedData.url ||
      `https://utfs.io/f/${uploadedData.key}`;

    return NextResponse.json({
      success: true,
      url: cdnUrl,
      key: uploadedData.key,
      name: uploadedData.name,
    });
  } catch (error: any) {
    console.error("[Upload API Error]:", error);
    return NextResponse.json(
      { error: "Failed to upload image: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
