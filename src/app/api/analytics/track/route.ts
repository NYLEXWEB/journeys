import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AnalyticsEventModel } from "@/models/Analytics";

// Map common IANA Timezones to Countries for zero-API offline accuracy
const TIMEZONE_COUNTRY_MAP: Record<string, string> = {
  "Asia/Kolkata": "India",
  "Asia/Calcutta": "India",
  "Europe/London": "United Kingdom",
  "America/New_York": "United States",
  "America/Chicago": "United States",
  "America/Denver": "United States",
  "America/Los_Angeles": "United States",
  "Asia/Dubai": "United Arab Emirates",
  "Asia/Riyadh": "Saudi Arabia",
  "Asia/Singapore": "Singapore",
  "Asia/Qatar": "Qatar",
  "Australia/Sydney": "Australia",
  "Australia/Melbourne": "Australia",
  "Europe/Paris": "France",
  "Europe/Berlin": "Germany",
  "Europe/Zurich": "Switzerland",
  "Europe/Amsterdam": "Netherlands",
  "America/Toronto": "Canada",
  "America/Vancouver": "Canada",
  "Asia/Kuala_Lumpur": "Malaysia",
  "Asia/Muscat": "Oman",
  "Asia/Bahrain": "Bahrain",
  "Asia/Kuwait": "Kuwait",
};

// Map ISO country codes to country names
const COUNTRY_CODE_MAP: Record<string, string> = {
  IN: "India",
  GB: "United Kingdom",
  UK: "United Kingdom",
  US: "United States",
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  SG: "Singapore",
  QA: "Qatar",
  AU: "Australia",
  FR: "France",
  DE: "Germany",
  CH: "Switzerland",
  NL: "Netherlands",
  CA: "Canada",
  MY: "Malaysia",
  OM: "Oman",
  BH: "Bahrain",
  KW: "Kuwait",
};

function parseReferrerDomain(referrer: string): string {
  if (!referrer || referrer.trim() === "" || referrer === "Direct") {
    return "Direct / Organic";
  }
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    if (host.includes("google")) return "Google Search";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("whatsapp") || host.includes("wa.me")) return "WhatsApp";
    if (host.includes("facebook") || host.includes("fb.com")) return "Facebook";
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("twitter") || host.includes("x.com") || host.includes("t.co")) return "X / Twitter";
    if (host.includes("bing")) return "Bing";
    if (host.includes("youtube")) return "YouTube";
    return host.replace(/^www\./, "");
  } catch {
    return "Direct / Organic";
  }
}

function parseUserAgent(ua: string) {
  let browser = "Chrome";
  let os = "Windows";
  let deviceType: "mobile" | "desktop" | "tablet" = "desktop";

  if (/iPad|Tablet|(Android(?!.*Mobile))/i.test(ua)) {
    deviceType = "tablet";
  } else if (/Mobi|iPhone|iPod|Android/i.test(ua)) {
    deviceType = "mobile";
  }

  if (/Windows NT 10/i.test(ua)) os = "Windows 10/11";
  else if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Linux/i.test(ua)) os = "Linux";

  if (/Edg\//i.test(ua)) {
    const match = ua.match(/Edg\/(\d+)/i);
    browser = `Edge ${match ? match[1] : ""}`.trim();
  } else if (/Chrome\//i.test(ua) && !/Chromium|OPR/i.test(ua)) {
    const match = ua.match(/Chrome\/(\d+)/i);
    browser = `Chrome ${match ? match[1] : ""}`.trim();
  } else if (/Firefox\//i.test(ua)) {
    const match = ua.match(/Firefox\/(\d+)/i);
    browser = `Firefox ${match ? match[1] : ""}`.trim();
  } else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) {
    const match = ua.match(/Version\/(\d+)/i);
    browser = `Safari ${match ? match[1] : ""}`.trim();
  } else if (/OPR\//i.test(ua)) {
    const match = ua.match(/OPR\/(\d+)/i);
    browser = `Opera ${match ? match[1] : ""}`.trim();
  }

  return { browser, os, deviceType };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      type = "pageview",
      visitorId,
      sessionId,
      path = "/",
      title = "",
      referrer = "",
      eventName = "",
      elementText = "",
      elementLocation = "",
      category = "general",
      screen = "",
      timezone = "",
      duration = 0,
    } = body;

    if (!visitorId || !sessionId) {
      return NextResponse.json({ ok: false, error: "Missing visitor or session identifier" }, { status: 400 });
    }

    // 1. Device and User-Agent parsing (zero-dependency, offline & crash-free)
    const userAgent = req.headers.get("user-agent") || "";
    const { browser: detectedBrowser, os: detectedOS, deviceType } = parseUserAgent(userAgent);

    // 2. Geolocation detection (CDN headers with timezone fallback - 100% offline & zero external API)
    const ipCountryCode = (
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      req.headers.get("x-country-code") ||
      ""
    ).toUpperCase();

    const city =
      req.headers.get("x-vercel-ip-city") ||
      req.headers.get("cf-ipcity") ||
      "";

    let detectedCountry = "India";
    if (ipCountryCode && COUNTRY_CODE_MAP[ipCountryCode]) {
      detectedCountry = COUNTRY_CODE_MAP[ipCountryCode];
    } else if (timezone && TIMEZONE_COUNTRY_MAP[timezone]) {
      detectedCountry = TIMEZONE_COUNTRY_MAP[timezone];
    }

    const rawIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Mask the last octet for visitor privacy
    const maskedIp = rawIp.replace(/\.\d+$/, ".***");

    // 3. Connect to Database and record event
    const db = await connectToDatabase();
    if (db) {
      await AnalyticsEventModel.create({
        type: ["pageview", "click", "lead", "conversion"].includes(type) ? type : "pageview",
        visitorId,
        sessionId,
        path: path.slice(0, 200),
        title: title.slice(0, 200),
        referrer: referrer.slice(0, 500),
        referrerDomain: parseReferrerDomain(referrer),
        eventName: eventName.slice(0, 100),
        elementText: elementText.slice(0, 200),
        elementLocation: elementLocation.slice(0, 100),
        category: category.slice(0, 50),
        device: {
          type: deviceType,
          browser: detectedBrowser,
          os: detectedOS,
          screen: screen ? screen.slice(0, 50) : "",
        },
        location: {
          country: detectedCountry,
          city: city ? decodeURIComponent(city) : undefined,
          ip: maskedIp,
        },
        duration: Math.max(0, Math.min(Number(duration) || 0, 3600)),
        timestamp: new Date(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[Analytics Track Error]:", err?.message || err);
    // Return 200 so visitor's client code is completely unaffected
    return NextResponse.json({ ok: false, error: "Tracking failed safely" }, { status: 200 });
  }
}
