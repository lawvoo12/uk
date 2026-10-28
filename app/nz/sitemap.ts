import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { NZ_LAWYERS } from "@/lib/nz/lawyers";
import { NZ_CITIES } from "@/lib/nz/cities";
import { NZ_PRACTICE_AREAS, getNzArea } from "@/lib/nz/practice-areas";
import { NZ_CONTENT_CHECKED } from "@/lib/nz/content";
import { NZ_DATES } from "@/lib/seo/page-dates";
import { NZ_SECTION_LIVE } from "@/lib/config";
import { latestDate, parseContentDate } from "@/lib/seo/dates";

// Served at /nz/sitemap.xml. EMPTY until NZ_SECTION_LIVE is true (the whole
// section is noindex until then). After that, like the other sitemaps, it only
// lists city, area and area/city pages that have at least one lawyer — empty
// pages are also marked noindex. The enquiry form (/nz/leads/new) is left out.
// URLs use NEXT_PUBLIC_SITE_URL (https://lawvoo.com, no www).
//
// <lastmod> is the real date a page's content last changed: the content
// check date, each lawyer's registerChecked date, the tool's checked date or
// a page's "last updated" date (lib/seo/page-dates.ts) — never the build time.
type Dated = { registerChecked: string };
const datedFor = (lawyers: Dated[]) => latestDate(NZ_CONTENT_CHECKED, ...lawyers.map((l) => l.registerChecked));

export default function sitemap(): MetadataRoute.Sitemap {
  if (!NZ_SECTION_LIVE) return [];
  const baseUrl = SITE_URL;
  const lastModified = datedFor(NZ_LAWYERS); // home, hubs and lists
  const d = (text: string) => parseContentDate(text);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/nz`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/nz/lawyers`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/nz/locations`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/nz/about`, lastModified: d(NZ_DATES.about), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/nz/how-we-verify`, lastModified: d(NZ_DATES["how-we-verify"]), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/nz/contact`, lastModified: d(NZ_DATES.contact), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/nz/listings`, lastModified: d(NZ_CONTENT_CHECKED), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/nz/privacy`, lastModified: d(NZ_DATES.privacy), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/nz/terms`, lastModified: d(NZ_DATES.terms), changeFrequency: "yearly", priority: 0.2 },
  ];

  const citiesWithListings = new Set(NZ_LAWYERS.map((l) => l.citySlug));
  const locationRoutes: MetadataRoute.Sitemap = NZ_CITIES.filter((c) => citiesWithListings.has(c.slug)).map((c) => ({
    url: `${baseUrl}/nz/locations/${c.slug}`,
    lastModified: datedFor(NZ_LAWYERS.filter((l) => l.citySlug === c.slug)),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Area hubs with no listings yet are noindex, so they're left out.
  const categoryHubRoutes: MetadataRoute.Sitemap = NZ_PRACTICE_AREAS.filter((area) =>
    NZ_LAWYERS.some((l) => l.practiceAreaSlugs.includes(area.slug))
  ).map((area) => ({
    url: `${baseUrl}/nz/lawyers/${area.urlSlug}`,
    lastModified: datedFor(NZ_LAWYERS.filter((l) => l.practiceAreaSlugs.includes(area.slug))),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const seen = new Set<string>();
  const categoryCityRoutes: MetadataRoute.Sitemap = [];
  for (const lawyer of NZ_LAWYERS) {
    for (const slug of lawyer.practiceAreaSlugs) {
      const area = getNzArea(slug);
      if (!area) continue;
      const key = `${area.urlSlug}/${lawyer.citySlug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      categoryCityRoutes.push({
        url: `${baseUrl}/nz/lawyers/${key}`,
        lastModified: datedFor(NZ_LAWYERS.filter((l) => l.citySlug === lawyer.citySlug && l.practiceAreaSlugs.includes(slug))),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const profileRoutes: MetadataRoute.Sitemap = NZ_LAWYERS.map((lawyer) => ({
    url: `${baseUrl}/nz/lawyer/${lawyer.id}`,
    lastModified: datedFor([lawyer]),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes, ...categoryHubRoutes, ...categoryCityRoutes, ...profileRoutes];
}
