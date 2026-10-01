import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { IE_LAWYERS } from "@/lib/ie/lawyers";
import { IE_CITIES } from "@/lib/ie/cities";
import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { IE_TOOLS } from "@/lib/tools";
import { IE_GUIDES } from "@/lib/ie/guides";

// Served at /ie/sitemap.xml. Like the UK sitemap, it only lists
// category/town pages that have at least one solicitor — empty pages are
// also marked noindex. The enquiry form (/ie/leads/new) is left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ie`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/ie/solicitors`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ie/locations`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ie/tools`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    ...IE_TOOLS.map((t) => ({ url: `${baseUrl}${t.href}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${baseUrl}/ie/guides`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...IE_GUIDES.map((g) => ({
      url: `${baseUrl}/ie/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt ?? g.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/ie/free-legal-help`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ie/irish-language-solicitors`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ie/listings`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ie/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/ie/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const citiesWithListings = new Set(IE_LAWYERS.map((l) => l.citySlug));
  const locationRoutes: MetadataRoute.Sitemap = IE_CITIES.filter((c) => citiesWithListings.has(c.slug)).map((c) => ({
    url: `${baseUrl}/ie/locations/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryHubRoutes: MetadataRoute.Sitemap = PRACTICE_AREAS.map((area) => ({
    url: `${baseUrl}/ie/solicitors/${area.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const seen = new Set<string>();
  const categoryCityRoutes: MetadataRoute.Sitemap = [];
  for (const lawyer of IE_LAWYERS) {
    for (const area of lawyer.practiceAreaSlugs) {
      const key = `${area}/${lawyer.citySlug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      categoryCityRoutes.push({
        url: `${baseUrl}/ie/solicitors/${key}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const profileRoutes: MetadataRoute.Sitemap = IE_LAWYERS.map((lawyer) => ({
    url: `${baseUrl}/ie/lawyer/${lawyer.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes, ...categoryHubRoutes, ...categoryCityRoutes, ...profileRoutes];
}
