import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { DestinationModel } from "@/models/Destination";
import { INITIAL_DESTINATIONS } from "@/lib/seedData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://journeysbyjibu.com";

  // Base core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journeys`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/plan-your-journey`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic destination routes from DB / seed fallback
  let destinationSlugs: string[] = [];
  try {
    await connectDB();
    const destinations = await DestinationModel.find({ isPublished: true }).select("id").lean();
    if (destinations && destinations.length > 0) {
      destinationSlugs = destinations.map((d: any) => d.id);
    } else {
      destinationSlugs = INITIAL_DESTINATIONS.map((d) => d.id);
    }
  } catch {
    destinationSlugs = INITIAL_DESTINATIONS.map((d) => d.id);
  }

  const destinationRoutes: MetadataRoute.Sitemap = destinationSlugs.map((slug) => ({
    url: `${baseUrl}/destinations#${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...destinationRoutes];
}

