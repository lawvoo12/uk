import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { CA_LAWYERS } from "@/lib/ca/lawyers";
import { CA_CITIES } from "@/lib/ca/cities";
import { CA_PRACTICE_AREAS, getCaArea } from "@/lib/ca/practice-areas";
import { CA_TOOLS } from "@/lib/tools";
import { CA_CONTENT_CHECKED } from "@/lib/ca/content";
import { CA_LTT_CHECKED } from "@/lib/ca/land-transfer-tax";
import { CA_DATES } from "@/lib/seo/page-dates";
import { latestDate, parseContentDate } from "@/lib/seo/dates";

// Served at /ca/sitemap.xml. Like the UK and Ireland sitemaps, it only lists
// city and area/city pages that have at least one lawyer — empty pages are
// also marked noindex. The enquiry form (/ca/leads/new) is left out.
// URLs use NEXT_PUBLIC_SITE_URL (https://lawvoo.com, no www).
//
// <lastmod> is the real date a page's content last changed: the content
// check date, each lawyer's registerChecked date, the tool's checked date or
// a page's "last updated" date (lib/seo/page-dates.ts) — never the build time.
type Dated = { registerChecked: string };
const datedFor = (lawyers: Dated[]) => latestDate(CA_CONTENT_CHECKED, ...lawyers.map((l) => l.registerChecked));

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = datedFor(CA_LAWYERS); // home, hubs and lists
  const d = (text: string) => parseContentDate(text);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ca`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/ca/lawyers`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ca/locations`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...(CA_TOOLS.length > 0
      ? [{ url: `${baseUrl}/ca/tools`, lastModified: d(CA_LTT_CHECKED), changeFrequency: "monthly" as const, priority: 0.5 }]
      : []),
    ...CA_TOOLS.map((t) => ({ url: `${baseUrl}${t.href}`, lastModified: d(CA_LTT_CHECKED), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${baseUrl}/ca/about`, lastModified: d(CA_DATES.about), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/ca/how-we-verify`, lastModified: d(CA_DATES["how-we-verify"]), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/ca/contact`, lastModified: d(CA_DATES.contact), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ca/listings`, lastModified: d(CA_CONTENT_CHECKED), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ca/privacy`, lastModified: d(CA_DATES.privacy), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/ca/terms`, lastModified: d(CA_DATES.terms), changeFrequency: "yearly", priority: 0.2 },
  ];

  const citiesWithListings = new Set(CA_LAWYERS.map((l) => l.citySlug));
  const locationRoutes: MetadataRoute.Sitemap = CA_CITIES.filter((c) => citiesWithListings.has(c.slug)).map((c) => ({
    url: `${baseUrl}/ca/locations/${c.slug}`,
    lastModified: datedFor(CA_LAWYERS.filter((l) => l.citySlug === c.slug)),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryHubRoutes: MetadataRoute.Sitemap = CA_PRACTICE_AREAS.map((area) => ({
    url: `${baseUrl}/ca/lawyers/${area.urlSlug}`,
    lastModified: datedFor(CA_LAWYERS.filter((l) => l.practiceAreaSlugs.includes(area.slug))),
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
        lastModified: datedFor(CA_LAWYERS.filter((l) => l.citySlug === lawyer.citySlug && l.practiceAreaSlugs.includes(slug))),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const profileRoutes: MetadataRoute.Sitemap = CA_LAWYERS.map((lawyer) => ({
    url: `${baseUrl}/ca/lawyer/${lawyer.id}`,
    lastModified: datedFor([lawyer]),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes, ...categoryHubRoutes, ...categoryCityRoutes, ...profileRoutes];
}
