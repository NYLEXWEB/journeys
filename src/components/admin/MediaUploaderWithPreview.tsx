"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { uploadFiles } from "@/lib/uploadthing";

export interface MediaUploadResult {
  url: string;
  key?: string;
  name?: string;
  type?: "image" | "video";
}

export interface MediaUploaderWithPreviewProps {
  label?: string;
  value?: string;
  fileKey?: string;
  mediaType?: "image" | "video";
  maxSizeMb?: number;
  aspectRatio?: number;
  helperText?: string;
  onChange: (data: MediaUploadResult) => void;
  onClear?: () => void;
  disabled?: boolean;
}

export function MediaUploaderWithPreview({
  label = "Photo Upload",
  value = "",
  fileKey = "",
  mediaType = "image",
  maxSizeMb,
  helperText,
  onChange,
  onClear,
  disabled = false,
}: MediaUploaderWithPreviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadedUrlRef = useRef<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const effectiveMaxMb = maxSizeMb || (mediaType === "video" ? 50 : 10);

  // Helper to delete remote asset from UploadThing cloud storage
  const deleteRemoteAsset = async (urlOrKey?: string) => {
    if (!urlOrKey) return;
    // Don't attempt to delete local static assets
    if (urlOrKey.startsWith("/") && !urlOrKey.startsWith("/f/")) return;
    try {
      await fetch("/api/uploadthing/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlOrKey }),
      });
    } catch (e) {
      console.warn("[MediaUploader] Could not delete remote asset:", e);
    }
  };

  // Clean up object URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileProcess = async (file: File) => {
    if (!file) return;

    // Validate mime type
    if (mediaType === "image" && !file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPG, PNG, WEBP, AVIF).");
      return;
    }
    if (mediaType === "video" && !file.type.startsWith("video/")) {
      setUploadError("Please select a valid video file (MP4, WEBM, QuickTime).");
      return;
    }

    // Validate size limit
    if (file.size > effectiveMaxMb * 1024 * 1024) {
      setUploadError(`File exceeds maximum size limit of ${effectiveMaxMb} MB.`);
      return;
    }

    await executeUpload(file);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileProcess(file);
    }
  };

  const executeUpload = async (fileToUpload: File) => {
    const previewUrl = URL.createObjectURL(fileToUpload);
    setLocalPreview(previewUrl);
    setUploadError(null);
    setUploadSuccess(false);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const endpoint =
        mediaType === "video"
          ? effectiveMaxMb <= 16
            ? "heroVideoUploader"
            : "videoUploader"
          : "imageUploader";

      const res = await uploadFiles(endpoint, {
        files: [fileToUpload],
        onUploadProgress: ({ progress }) => {
          setUploadProgress(Math.min(99, Math.round(progress)));
        },
      });

      if (!res || res.length === 0) {
        throw new Error("No response received from cloud storage.");
      }

      const uploaded = res[0];
      const cloudUrl =
        (uploaded as any).ufsUrl ||
        (uploaded as any).url ||
        `https://utfs.io/f/${uploaded.key}`;

      // If user had previously uploaded a file during this session, purge it to avoid orphaned clutter
      if (uploadedUrlRef.current && uploadedUrlRef.current !== cloudUrl) {
        deleteRemoteAsset(uploadedUrlRef.current);
      }
      uploadedUrlRef.current = cloudUrl;

      setUploadProgress(100);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

      onChange({
        url: cloudUrl,
        key: uploaded.key,
        name: uploaded.name || fileToUpload.name,
        type: mediaType,
      });
    } catch (err: any) {
      console.error("[MediaUploader] Upload error:", err);
      setLocalPreview(null);
      setUploadError(
        err.message || "Upload failed. Please check your network and try again."
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const displayUrl = localPreview || value;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B]">
            {label}
          </span>
          <span className="text-[11px] text-[#8B5E35] font-medium">
            Max {effectiveMaxMb}MB {mediaType === "video" ? "MP4/WebM" : "JPG/PNG/WebP"}
          </span>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-neutral-500 leading-relaxed">{helperText}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={
          mediaType === "video"
            ? "video/mp4,video/webm,video/quicktime"
            : "image/jpeg,image/png,image/webp,image/avif,image/gif"
        }
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {uploadError && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span className="flex-1">{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-red-400 hover:text-red-700 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {displayUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#E9E0D2] bg-[#FAF6EF] group transition-all duration-300">
          {mediaType === "video" ? (
            <video
              src={displayUrl}
              controls
              className="w-full aspect-video object-cover bg-black"
            />
          ) : (
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-56 bg-neutral-100">
              <img
                src={displayUrl}
                alt="Selected media preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Uploading Overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-[#183D2B]/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 z-20 text-white">
              <Loader2 className="w-7 h-7 animate-spin text-[#FAF6EF]" />
              <div className="w-52 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FAF6EF] transition-all duration-200 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono tracking-wider">
                Uploading to Cloud: {uploadProgress}%
              </span>
            </div>
          )}

          {/* Action buttons overlay when not uploading */}
          {!isUploading && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
              {uploadSuccess && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cloud Synced</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => !disabled && fileInputRef.current?.click()}
                disabled={disabled}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#183D2B] border border-[#E9E0D2] shadow-sm text-xs font-medium hover:border-[#183D2B] transition-colors cursor-pointer"
                title="Replace Photo"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replace</span>
              </button>
              {onClear && (
                <button
                  type="button"
                  onClick={() => {
                    const toDelete = uploadedUrlRef.current || value;
                    setLocalPreview(null);
                    onClear();
                    if (toDelete && (toDelete.includes("utfs.io") || toDelete.includes("ufs.sh"))) {
                      deleteRemoteAsset(toDelete);
                    }
                  }}
                  disabled={disabled}
                  className="p-1.5 rounded-full bg-white/95 hover:bg-red-50 text-red-600 border border-red-200 shadow-sm transition-colors cursor-pointer"
                  title="Remove Photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Cloud Asset Badge indicator */}
          <div className="absolute bottom-2 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/90 font-mono tracking-wide">
            {displayUrl.includes("utfs.io") || displayUrl.includes("ufs.sh")
              ? "UploadThing Cloud CDN"
              : displayUrl.startsWith("blob:")
              ? "Pending Upload..."
              : "Curated Asset"}
          </div>
        </div>
      ) : (
        <div
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 text-center ${
            isDragging
              ? "border-[#183D2B] bg-[#FAF4E6]"
              : "border-[#183D2B]/25 hover:border-[#183D2B] bg-[#FFFCF5] hover:bg-[#FAF4E6]/50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="w-12 h-12 rounded-full bg-[#183D2B]/10 flex items-center justify-center text-[#183D2B] mb-3 group-hover:scale-105 transition-transform">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-[#183D2B] mb-1">
            Click to upload or drag & drop photo
          </p>
          <p className="text-xs text-neutral-500 max-w-xs">
            Direct high-speed cloud upload to UploadThing CDN (up to {effectiveMaxMb}MB)
          </p>
        </div>
      )}
    </div>
  );
}
