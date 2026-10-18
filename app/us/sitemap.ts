import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { US_TOOLS } from "@/lib/tools";
import { US_GUIDES } from "@/lib/us/guides";
import { US_LAWYERS } from "@/lib/us/lawyers";
import { US_CITIES } from "@/lib/us/cities";
import { US_PRACTICE_AREAS, getUsArea } from "@/lib/us/practice-areas";

// Served at /us/sitemap.xml. Like the UK and Ireland sitemaps, it only lists
// city and area/city pages that have at least one lawyer — empty pages are
// also marked noindex. The enquiry form (/us/leads/new) is left out.
// URLs use NEXT_PUBLIC_SITE_URL (https://lawvoo.com, no www).
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/us`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/us/lawyers`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/us/locations`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...(US_TOOLS.length > 0
      ? [{ url: `${baseUrl}/us/tools`, lastModified, changeFrequency: "monthly" as const, priority: 0.5 }]
      : []),
    ...US_TOOLS.map((t) => ({ url: `${baseUrl}${t.href}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${baseUrl}/us/guides`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...US_GUIDES.map((g) => ({
      url: `${baseUrl}/us/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt ?? g.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/us/listings`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/us/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/us/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const citiesWithListings = new Set(US_LAWYERS.map((l) => l.citySlug));
  const locationRoutes: MetadataRoute.Sitemap = US_CITIES.filter((c) => citiesWithListings.has(c.slug)).map((c) => ({
    url: `${baseUrl}/us/locations/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryHubRoutes: MetadataRoute.Sitemap = US_PRACTICE_AREAS.map((area) => ({
    url: `${baseUrl}/us/lawyers/${area.urlSlug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const seen = new Set<string>();
  const categoryCityRoutes: MetadataRoute.Sitemap = [];
  for (const lawyer of US_LAWYERS) {
    for (const slug of lawyer.practiceAreaSlugs) {
      const area = getUsArea(slug);
      if (!area) continue;
      const key = `${area.urlSlug}/${lawyer.citySlug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      categoryCityRoutes.push({
        url: `${baseUrl}/us/lawyers/${key}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const profileRoutes: MetadataRoute.Sitemap = US_LAWYERS.map((lawyer) => ({
    url: `${baseUrl}/us/lawyer/${lawyer.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes, ...categoryHubRoutes, ...categoryCityRoutes, ...profileRoutes];
}
