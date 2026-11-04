import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Journeys by Jibu Thomas | Boutique Travel Design & Destination Management",
  description:
    "Boutique travel design and destination management company based in Kerala, India. Specialising in personalised holidays, privately curated journeys and authentic travel experiences across Kerala and South India. Travel, Tailored Around You.",
  keywords: [
    "Kerala luxury travel",
    "Journeys by Jibu Thomas",
    "Boutique travel Kerala",
    "Personalised South India tours",
    "Munnar bespoke itinerary",
    "Alleppey private houseboat",
    "Kerala private chauffeur holidays",
  ],
  openGraph: {
    title: "Journeys by Jibu Thomas | Travel, Tailored Around You",
    description:
      "Privately curated journeys, authentic local experiences, and boutique travel coordination across Kerala and South India.",
    url: "https://journeysbyjibuthomas.com",
    siteName: "Journeys by Jibu Thomas",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#FFFCF5] text-[#242424] font-sans selection:bg-[#183D2B] selection:text-[#FFFCF5]">
        {children}
      </body>
    </html>
  );
}
