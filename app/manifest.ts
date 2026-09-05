import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Properties Nagpur — Verified Plots, Flats & Lands in Nagpur",
    short_name: "Properties Nagpur",
    description: "Search 500+ NMRDA & RERA approved residential plots, luxury flats, and commercial lands in Nagpur.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F19",
    theme_color: "#D4AF37",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
