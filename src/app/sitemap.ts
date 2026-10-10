import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { sektorler } from "@/lib/sektor";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Sektöre özel landing sayfaları — outreach bu adreslere gider.
    ...sektorler.map((s) => ({
      url: `${site.url}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
