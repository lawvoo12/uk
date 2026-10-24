import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { IE_LAWYERS } from "@/lib/ie/lawyers";
import { IE_CITIES } from "@/lib/ie/cities";
import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { IE_TOOLS } from "@/lib/tools";
import { IE_GUIDES } from "@/lib/ie/guides";
import { IE_RATES_CHECKED } from "@/lib/ie/stamp-duty";
import { CAT_CHECKED } from "@/lib/ie/cat";
import { WRC_CHECKED } from "@/lib/ie/wrc-deadline";
import { IE_DATES } from "@/lib/seo/page-dates";
import { latestDate, parseContentDate } from "@/lib/seo/dates";

// Served at /ie/sitemap.xml. Like the UK sitemap, it only lists
// category/town pages that have at least one solicitor — empty pages are
// also marked noindex. The enquiry form (/ie/leads/new) is left out.
//
// <lastmod> is the real date a page's content last changed (lib/seo/page-dates.ts,
// a tool's "checked" date, a guide's date) — never the build time.
const TOOL_CHECKED: Record<string, string> = {
  "/ie/tools/stamp-duty-calculator": IE_RATES_CHECKED,
  "/ie/tools/who-inherits-without-a-will": "30 September 2026", // shown on that page
  "/ie/tools/inheritance-tax-calculator": CAT_CHECKED,
  "/ie/tools/wrc-time-limit-calculator": WRC_CHECKED,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  // Pages that list solicitors: the later of the page text and the listings.
  const lastModified = latestDate(IE_DATES.content, IE_DATES.listings, IE_DATES.registerCheckLatest);
  const d = (text: string) => parseContentDate(text);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ie`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/ie/solicitors`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ie/locations`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ie/tools`, lastModified: latestDate(...Object.values(TOOL_CHECKED)), changeFrequency: "monthly", priority: 0.5 },
    ...IE_TOOLS.map((t) => ({
      url: `${baseUrl}${t.href}`,
      lastModified: latestDate(TOOL_CHECKED[t.href] ?? IE_DATES.content),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/ie/guides`, lastModified: latestDate(...IE_GUIDES.map((g) => g.updatedAt ?? g.publishedAt)), changeFrequency: "weekly", priority: 0.7 },
    ...IE_GUIDES.map((g) => ({
      url: `${baseUrl}/ie/guides/${g.slug}`,
      lastModified: parseContentDate(g.updatedAt ?? g.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/ie/free-legal-help`, lastModified: d(IE_DATES.freeLegalHelp), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ie/irish-language-solicitors`, lastModified: latestDate(IE_DATES.irishLanguage, IE_DATES.listings), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ie/about`, lastModified: d(IE_DATES.about), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/ie/how-we-verify`, lastModified: d(IE_DATES["how-we-verify"]), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/ie/contact`, lastModified: d(IE_DATES.contact), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ie/listings`, lastModified: d(IE_DATES.content), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ie/privacy`, lastModified: d(IE_DATES.privacy), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/ie/terms`, lastModified: d(IE_DATES.terms), changeFrequency: "yearly", priority: 0.2 },
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
