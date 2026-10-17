import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { sektorler } from "@/lib/sektor";
import { yazilar } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blog = yazilar();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Yabancı dil sayfaları
    ...["en", "bs"].map((k) => ({
      url: `${site.url}/${k}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Sektöre özel landing sayfaları — outreach bu adreslere gider.
    ...sektorler.map((s) => ({
      url: `${site.url}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...(blog.length
      ? [
          {
            url: `${site.url}/blog`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...blog.map((y) => ({
      url: `${site.url}/blog/${y.slug}`,
      lastModified: new Date(y.guncelleme || y.tarih || now),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
