import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://fikrihusna.example", lastModified: new Date("2027-03-13") }];
}
