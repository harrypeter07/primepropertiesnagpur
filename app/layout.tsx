import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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

export const metadata: Metadata = {
  title: "Prime Nagpur Properties — Plots, Flats & Lands in Nagpur | NMRDA & RERA Verified",
  description: "Nagpur's #1 verified property advisory. Discover NMRDA approved residential plots, luxury flats, agricultural lands & commercial spaces in Wardha Road, Besa, Civil Lines, Manish Nagar & MIHAN Nagpur.",
  keywords: [
    "Plots in Nagpur",
    "Properties in Nagpur",
    "Flats in Besa Nagpur",
    "Wardha Road NA Plots",
    "Civil Lines Nagpur Luxury Homes",
    "MIHAN SEZ Commercial Land",
    "NMRDA approved plots Nagpur",
    "RERA registered projects Nagpur",
    "Dharampeth flats Nagpur",
    "Farmland Hingna Nagpur",
    "Real Estate Agent Nagpur",
    "Prime Nagpur Properties",
    "Bhoomi Nagpur Real Estate"
  ],
  authors: [{ name: "Prime Nagpur Properties (Bhoomi Advisory)" }],
  creator: "Prime Nagpur Properties",
  publisher: "Prime Nagpur Properties",
  metadataBase: new URL("https://primenagpurproperties.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prime Nagpur Properties — Verified Plots, Flats & Commercial Real Estate",
    description: "Search 500+ verified plots, luxury apartments, and commercial lands across Nagpur with 100% legal title assurance.",
    url: "https://primenagpurproperties.com",
    siteName: "Prime Nagpur Properties",
    images: [
      {
        url: "/images/hero_estate.jpg",
        width: 1200,
        height: 630,
        alt: "Prime Nagpur Properties — Premier Real Estate Marketplace",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Nagpur Properties | Verified Plots & Flats in Nagpur",
    description: "Discover top residential plots and luxury apartments in Nagpur with instant RERA/NMRDA verification.",
    images: ["/images/hero_estate.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [
      { url: "/favicon.svg" },
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

