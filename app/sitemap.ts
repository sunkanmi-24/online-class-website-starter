import type { MetadataRoute } from "next";

const base = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/classes", "/videos", "/schedule", "/contact"];
  return pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
}
