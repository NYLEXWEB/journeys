import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { getLiveWebsiteContent } from "@/lib/contentService";
import { WebsiteContentProvider } from "@/hooks/useWebsiteContent";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import AssetPreloader from "@/components/AssetPreloader";
import NavigationProgressBar from "@/components/NavigationProgressBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Vercel Edge Caching with ISR: pages are served instantly from Vercel's global CDN Edge,
// eliminating serverless function cold starts and reducing navigation latency to 0ms.
// The cache is automatically revalidated in background every 60s and purged instantly on Admin updates.
export const revalidate = 60;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://journeysbyjibuthomas.com"),
  title: {
    default: "Journeys by Jibu Thomas | Bespoke Travel Design & Kerala Destination Management",
    template: "%s | Journeys by Jibu Thomas",
  },
  description:
    "Boutique travel design and destination management atelier based in Kerala, India. Specialising in personalised holidays, privately curated journeys, and authentic travel experiences across Kerala and South India. Travel, Tailored Around You.",
  keywords: [
    "Kerala luxury travel",
    "Journeys by Jibu Thomas",
    "Bespoke Kerala holidays",
    "Personalised South India itineraries",
    "Munnar boutique tea retreats",
    "Alleppey private luxury houseboat",
    "Kerala private chauffeur tours",
    "Wayanad rainforest stays",
    "Kochi heritage walking journeys",
  ],
  authors: [{ name: "Jibu Thomas", url: "https://journeysbyjibuthomas.com" }],
  creator: "Jibu Thomas",
  publisher: "Journeys by Jibu Thomas",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Journeys by Jibu Thomas | Travel, Tailored Around You",
    description:
      "Privately curated journeys, authentic local experiences, and boutique travel coordination across Kerala and South India.",
    url: "https://journeysbyjibuthomas.com",
    siteName: "Journeys by Jibu Thomas",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/loading-screen-bg.webp",
        width: 1200,
        height: 630,
        alt: "Journeys by Jibu Thomas - Kerala bespoke travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journeys by Jibu Thomas | Bespoke Kerala Travel",
    description:
      "Founder-led bespoke travel design and boutique destination management across Kerala and South India.",
    images: ["/images/loading-screen-bg.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": "https://journeysbyjibuthomas.com/#organization",
      name: "Journeys by Jibu Thomas",
      url: "https://journeysbyjibuthomas.com",
      logo: "https://journeysbyjibuthomas.com/images/loading-screen-bg.webp",
      image: "https://journeysbyjibuthomas.com/images/loading-screen-bg.webp",
      description:
        "Boutique travel design and bespoke destination management company based in Kerala, India. Specialising in personalised holidays, private itineraries, and authentic experiences across Kerala and South India.",
      founder: {
        "@type": "Person",
        name: "Jibu Thomas",
        jobTitle: "Founder & Bespoke Travel Designer",
      },
      telephone: "+91 94471 23456",
      email: "hello@journeysbyjibuthomas.com",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Kerala" },
        { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        { "@type": "AdministrativeArea", name: "Karnataka" },
        { "@type": "Country", name: "India" },
      ],
      priceRange: "$$$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://journeysbyjibuthomas.com/#website",
      url: "https://journeysbyjibuthomas.com",
      name: "Journeys by Jibu Thomas",
      publisher: {
        "@id": "https://journeysbyjibuthomas.com/#organization",
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialContent = await getLiveWebsiteContent();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} ${cormorant.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FFFCF5] text-[#242424] font-sans font-light selection:bg-[#183D2B] selection:text-[#FFFCF5] tracking-[-0.015em]"
      >
        <NavigationProgressBar />
        <AnalyticsTracker />
        <WebsiteContentProvider initialContent={initialContent}>
          <AssetPreloader />
          {children}
        </WebsiteContentProvider>
      </body>
    </html>
  );
}
