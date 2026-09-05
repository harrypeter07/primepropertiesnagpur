import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { JsonLd } from "@/components/shared/JsonLd";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Properties Nagpur | Verified Plots, Flats, Homes & Lands in Nagpur",
    template: "%s | Properties Nagpur",
  },
  description:
    "Nagpur's #1 verified real estate portal. Search 500+ NMRDA & RERA approved residential plots, luxury flats, homes, agricultural lands & commercial corridors in Wardha Road, Besa-Pipla, Civil Lines, Dharampeth, Manish Nagar & MIHAN Nagpur.",
  keywords: [
    "properties nagpur",
    "nagpur homes",
    "nagpur properties",
    "plots in nagpur",
    "flats in nagpur",
    "real estate nagpur",
    "buy residential plot nagpur",
    "nmrda plots in besa pipla",
    "wardha road plots nagpur",
    "luxury apartments civil lines nagpur",
    "dharampeth flats",
    "mihan commercial land",
    "farmland hingna nagpur",
    "real estate agent nagpur",
    "rera approved projects in nagpur",
    "prime nagpur properties",
    "properties in nagpur for sale",
    "best property in nagpur",
  ],
  authors: [{ name: "Properties Nagpur Advisory Team" }],
  creator: "Properties Nagpur",
  publisher: "Properties Nagpur",
  metadataBase: new URL("https://primenagpurproperties.com"),
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Nagpur",
    "geo.position": "21.1458;79.0882",
    ICBM: "21.1458, 79.0882",
    rating: "General",
    "revisit-after": "1 days",
  },
  openGraph: {
    title: "Properties Nagpur | Verified Plots, Flats, Homes & Lands in Nagpur",
    description:
      "Search 500+ NMRDA & RERA approved residential plots, luxury flats, and commercial lands in Nagpur with 100% legal title assurance.",
    url: "https://primenagpurproperties.com",
    siteName: "Properties Nagpur",
    images: [
      {
        url: "/images/logo_with_bg.png",
        width: 1024,
        height: 1024,
        alt: "Properties Nagpur Official Brand Logo & Marketplace",
      },
      {
        url: "/images/hero_estate.jpg",
        width: 1200,
        height: 630,
        alt: "Properties Nagpur — Premier Real Estate Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties Nagpur | Verified Plots, Flats & Homes in Nagpur",
    description:
      "Explore high-growth NMRDA & RERA approved plots and luxury homes across Wardha Road, Besa, Civil Lines & MIHAN Nagpur.",
    images: ["/images/logo_with_bg.png"],
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
  icons: {
    icon: [
      { url: "/images/logo_transparent.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/images/logo_transparent.png"],
    apple: [
      { url: "/images/logo_transparent.png", sizes: "180x180", type: "image/png" },
    ],
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
      suppressHydrationWarning
      className={`${outfit.variable} ${plusJakarta.variable} ${ibmMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-slate-900 selection:bg-clay selection:text-white"
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
