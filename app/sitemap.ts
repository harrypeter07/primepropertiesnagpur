import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://primenagpurproperties.com";

  const staticRoutes = [
    "",
    "/listings",
    "/listings?type=plot",
    "/listings?type=flat",
    "/listings?type=commercial",
    "/listings?type=land",
    "/listings?city=Nagpur",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : route.startsWith("/listings") ? 0.9 : 0.8,
  }));

  // Dynamic property routes for top Nagpur locations
  const localities = [
    "besa-pipla",
    "wardha-road",
    "civil-lines",
    "dharampeth",
    "mihan-sez",
    "hingna",
    "koradi-road",
    "manish-nagar",
  ].map((loc) => ({
    url: `${baseUrl}/listings?locality=${loc}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...localities];
}
