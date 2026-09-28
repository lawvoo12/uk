import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { STATIC_LAWYERS } from "@/lib/data/static-lawyers";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { TOP_UK_CITIES } from "@/lib/seo/uk-cities";
import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";

// Only lists category/city pages that actually have at least one solicitor
// in lib/data/static-lawyers.ts — not every possible category × city
// combination. Submitting hundreds of empty "no solicitors found yet" pages
// to Google is worse for SEO than submitting a smaller number of pages that
// all have real content; this stays honest as the static list grows.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const ukLandingRoute: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/uk`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/uk/tools`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/uk/tools/stamp-duty-calculator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uk/listings`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/uk/solicitors`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const seenCombos = new Set<string>();
  const pseoRoutes: MetadataRoute.Sitemap = [];

  for (const lawyer of STATIC_LAWYERS) {
    for (const practiceAreaSlug of lawyer.practiceAreaSlugs) {
      const key = `${practiceAreaSlug}/${lawyer.citySlug}`;
      if (seenCombos.has(key)) continue;
      seenCombos.add(key);

      pseoRoutes.push({
        url: `${baseUrl}/uk/solicitors/${practiceAreaSlug}/${lawyer.citySlug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Location pages: /uk/locations plus one page per city that has listings.
  const citiesWithListings = new Set(STATIC_LAWYERS.map((l) => l.citySlug));
  const locationRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/uk/locations`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...TOP_UK_CITIES.filter((c) => citiesWithListings.has(c.slug)).map((c) => ({
      url: `${baseUrl}/uk/locations/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const categoryHubRoutes: MetadataRoute.Sitemap = PRACTICE_AREAS.map((area) => ({
    url: `${baseUrl}/uk/solicitors/${area.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const lawyerProfileRoutes: MetadataRoute.Sitemap = STATIC_LAWYERS.map((lawyer) => ({
    url: `${baseUrl}/uk/lawyer/${lawyer.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const guidesIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/uk/guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const guidePostRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/uk/guides/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...ukLandingRoute, ...locationRoutes, ...categoryHubRoutes, ...pseoRoutes, ...lawyerProfileRoutes, ...guidesIndexRoute, ...guidePostRoutes];
}
