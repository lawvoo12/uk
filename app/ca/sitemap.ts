import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { CA_LAWYERS } from "@/lib/ca/lawyers";
import { CA_CITIES } from "@/lib/ca/cities";
import { CA_PRACTICE_AREAS, getCaArea } from "@/lib/ca/practice-areas";
import { CA_TOOLS } from "@/lib/tools";

// Served at /ca/sitemap.xml. Like the UK and Ireland sitemaps, it only lists
// city and area/city pages that have at least one lawyer — empty pages are
// also marked noindex. The enquiry form (/ca/leads/new) is left out.
// URLs use NEXT_PUBLIC_SITE_URL (https://lawvoo.com, no www).
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ca`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/ca/lawyers`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ca/locations`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...(CA_TOOLS.length > 0
      ? [{ url: `${baseUrl}/ca/tools`, lastModified, changeFrequency: "monthly" as const, priority: 0.5 }]
      : []),
    ...CA_TOOLS.map((t) => ({ url: `${baseUrl}${t.href}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${baseUrl}/ca/listings`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ca/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/ca/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const citiesWithListings = new Set(CA_LAWYERS.map((l) => l.citySlug));
  const locationRoutes: MetadataRoute.Sitemap = CA_CITIES.filter((c) => citiesWithListings.has(c.slug)).map((c) => ({
    url: `${baseUrl}/ca/locations/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryHubRoutes: MetadataRoute.Sitemap = CA_PRACTICE_AREAS.map((area) => ({
    url: `${baseUrl}/ca/lawyers/${area.urlSlug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const seen = new Set<string>();
  const categoryCityRoutes: MetadataRoute.Sitemap = [];
  for (const lawyer of CA_LAWYERS) {
    for (const slug of lawyer.practiceAreaSlugs) {
      const area = getCaArea(slug);
      if (!area) continue;
      const key = `${area.urlSlug}/${lawyer.citySlug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      categoryCityRoutes.push({
        url: `${baseUrl}/ca/lawyers/${key}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const profileRoutes: MetadataRoute.Sitemap = CA_LAWYERS.map((lawyer) => ({
    url: `${baseUrl}/ca/lawyer/${lawyer.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes, ...categoryHubRoutes, ...categoryCityRoutes, ...profileRoutes];
}
