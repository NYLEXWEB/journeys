"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface AssetConfig {
  id: string;
  src: string;
  type: "image" | "video" | "font";
  weight: number;
}

export interface AssetLoadState {
  progress: number; // 0 to 1
  isLoading: boolean;
  isComplete: boolean;
  totalAssets: number;
  completedAssets: number;
  loadedAssets: string[];
  failedAssets: string[];
}

/**
 * Core critical assets required for the initial above-the-fold render
 */
export const DEFAULT_CRITICAL_ASSETS: AssetConfig[] = [
  {
    id: "system-fonts",
    src: "fonts",
    type: "font",
    weight: 2,
  },
  {
    id: "loading-background",
    src: "/images/loading-screen-bg.jpg",
    type: "image",
    weight: 2,
  },
  {
    id: "hero-video-playable",
    src: "/video/video-1.mp4",
    type: "video",
    weight: 4, // Higher weight for playable video frame readiness
  },
  {
    id: "brand-logo",
    src: "/images/logo.png",
    type: "image",
    weight: 1,
  },
  {
    id: "highlands-feature",
    src: "/images/generated/tea-plantation-approach.jpg",
    type: "image",
    weight: 1,
  },
  {
    id: "backwaters-feature",
    src: "/images/generated/houseboat-backwaters.jpg",
    type: "image",
    weight: 1,
  },
  {
    id: "chauffeur-service",
    src: "/images/services/private-chauffeur.jpg",
    type: "image",
    weight: 1,
  },
];

/**
 * Preload and decode an image asset using HTMLImageElement.decode()
 */
function preloadImage(src: string): Promise<{ success: boolean; src: string }> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve({ success: true, src });
      return;
    }

    const img = new window.Image();
    img.src = src;

    // Handle cached image already fully loaded
    if (img.complete && img.naturalWidth !== 0) {
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => resolve({ success: true, src }))
          .catch(() => resolve({ success: true, src }));
      } else {
        resolve({ success: true, src });
      }
      return;
    }

    const onLoad = () => {
      cleanup();
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => resolve({ success: true, src }))
          .catch(() => resolve({ success: true, src }));
      } else {
        resolve({ success: true, src });
      }
    };

    const onError = (e: Event | string) => {
      cleanup();
      console.warn(`[AssetPreloader] Image failed to load or decode: ${src}`, e);
      resolve({ success: false, src });
    };

    const cleanup = () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };

    img.addEventListener("load", onLoad, { once: true });
    img.addEventListener("error", onError, { once: true });
  });
}

/**
 * Preload a video until its first playable frame is ready (readyState >= 2 / loadeddata / canplay)
 * Does NOT force download of the entire 22MB video stream, preserving mobile bandwidth.
 */
function preloadVideoFirstFrame(src: string): Promise<{ success: boolean; src: string }> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve({ success: true, src });
      return;
    }

    // Check if video is already present in the DOM
    const existingVideo = document.querySelector(`video[src="${src}"]`) as HTMLVideoElement | null;
    const video = existingVideo || document.createElement("video");

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    // readyState 2 = HAVE_CURRENT_DATA (first frame available)
    // readyState 3 = HAVE_FUTURE_DATA
    // readyState 4 = HAVE_ENOUGH_DATA
    if (video.readyState >= 2) {
      resolve({ success: true, src });
      return;
    }

    const onPlayable = () => {
      cleanup();
      resolve({ success: true, src });
    };

    const onError = (e: Event) => {
      cleanup();
      console.warn(`[AssetPreloader] Video first-frame readiness failed: ${src}`, e);
      resolve({ success: false, src });
    };

    const cleanup = () => {
      video.removeEventListener("loadeddata", onPlayable);
      video.removeEventListener("canplay", onPlayable);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("loadeddata", onPlayable, { once: true });
    video.addEventListener("canplay", onPlayable, { once: true });
    video.addEventListener("error", onError, { once: true });

    if (!existingVideo) {
      video.src = src;
      video.load();
    }
  });
}

/**
 * Track readiness of all web fonts
 */
function preloadFonts(): Promise<{ success: boolean }> {
  if (typeof document !== "undefined" && "fonts" in document) {
    return document.fonts.ready
      .then(() => ({ success: true }))
      .catch((err) => {
        console.warn("[AssetPreloader] Font loading warning:", err);
        return { success: false };
      });
  }
  return Promise.resolve({ success: true });
}

export function useRealtimeAssetLoader(customAssets?: AssetConfig[]): AssetLoadState {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [loadedAssets, setLoadedAssets] = useState<string[]>([]);
  const [failedAssets, setFailedAssets] = useState<string[]>([]);

  const hasStartedRef = useRef<boolean>(false);
  const assetsList = customAssets || DEFAULT_CRITICAL_ASSETS;

  // Calculate total combined weight
  const totalWeight = assetsList.reduce((acc, curr) => acc + curr.weight, 0);

  const updateProgress = useCallback(
    (completedWeight: number, isFinished: boolean) => {
      const calculatedFraction = totalWeight > 0 ? completedWeight / totalWeight : 1;
      // Cap at 0.99 until fully finished
      const nextProgress = isFinished ? 1 : Math.min(0.99, calculatedFraction);

      setProgress(nextProgress);

      if (isFinished) {
        // Wait for next browser rendering tick before signaling completion
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsLoading(false);
            // Slight delay for smooth visual transition
            setTimeout(() => {
              setIsComplete(true);
            }, 600);
          });
        });
      }
    },
    [totalWeight]
  );

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let completedWeight = 0;
    let finishedCount = 0;
    const totalCount = assetsList.length;

    const onAssetResolved = (id: string, success: boolean, weight: number) => {
      finishedCount += 1;
      completedWeight += weight;

      if (success) {
        setLoadedAssets((prev) => [...prev, id]);
      } else {
        setFailedAssets((prev) => [...prev, id]);
      }

      const allDone = finishedCount >= totalCount;
      updateProgress(completedWeight, allDone);
    };

    // Preload each asset independently in real-time
    assetsList.forEach((asset) => {
      if (asset.type === "font") {
        preloadFonts().then((res) => {
          onAssetResolved(asset.id, res.success, asset.weight);
        });
      } else if (asset.type === "image") {
        preloadImage(asset.src).then((res) => {
          onAssetResolved(asset.id, res.success, asset.weight);
        });
      } else if (asset.type === "video") {
        preloadVideoFirstFrame(asset.src).then((res) => {
          onAssetResolved(asset.id, res.success, asset.weight);
        });
      }
    });

    // Safeguard timeout (10 seconds max) to prevent getting stuck if network stalls permanently
    const safetyTimeout = setTimeout(() => {
      if (finishedCount < totalCount) {
        console.warn(
          `[AssetPreloader] Safeguard timeout reached. Releasing loader. (${finishedCount}/${totalCount} completed)`
        );
        updateProgress(totalWeight, true);
      }
    }, 10000);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [assetsList, totalWeight, updateProgress]);

  return {
    progress,
    isLoading,
    isComplete,
    totalAssets: assetsList.length,
    completedAssets: loadedAssets.length + failedAssets.length,
    loadedAssets,
    failedAssets,
  };
}

