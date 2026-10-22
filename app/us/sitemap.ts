import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";
import { US_TOOLS } from "@/lib/tools";
import { US_GUIDES } from "@/lib/us/guides";
import { US_LAWYERS } from "@/lib/us/lawyers";
import { US_CITIES } from "@/lib/us/cities";
import { US_PRACTICE_AREAS } from "@/lib/us/practice-areas";
import { US_CONTENT_CHECKED } from "@/lib/us/content";
import { US_RECORDATION_CHECKED } from "@/lib/us/recordation-tax";
import { EEOC_CHECKED } from "@/lib/us/eeoc-deadline";
import { US_PAGE_UPDATED } from "@/lib/us/page-dates";
import { getUsLocalBlock, latestCheck, parseCheckedDate, shouldIndexUsAreaCity, usLawyersFor } from "@/lib/us/indexing";

// Served at /us/sitemap.xml. Lists only pages that are indexed: city pages
// with at least one lawyer, and area × city pages that pass the rule in
// lib/us/indexing.ts (the same rule sets their robots tag). The enquiry form
// (/us/leads/new) is left out. URLs use NEXT_PUBLIC_SITE_URL (https://lawvoo.com).
//
// <lastmod> is the real date a page's content last changed — the content
// check date, a lawyer's register check date, a guide's date or a page's
// "last updated" date — never the build time, so Google can trust it.
// Each tool's "rules checked" date.
const TOOL_CHECKED: Record<string, string> = {
  "/us/tools/alabama-deed-mortgage-tax-calculator": US_RECORDATION_CHECKED,
  "/us/tools/eeoc-deadline-calculator": EEOC_CHECKED,
};

function laterOf(...dates: (Date | undefined)[]): Date {
  const times = dates.filter((d): d is Date => Boolean(d)).map((d) => d.getTime());
  return new Date(Math.max(...times));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const content = parseCheckedDate(US_CONTENT_CHECKED);
  const allLawyers = latestCheck(US_LAWYERS);
  const directory = laterOf(content, allLawyers); // pages that list lawyers
  const page = (key: keyof typeof US_PAGE_UPDATED) => parseCheckedDate(US_PAGE_UPDATED[key]) ?? content;
  const guidesDate = laterOf(content, ...US_GUIDES.map((g) => new Date(g.updatedAt ?? g.publishedAt)));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/us`, lastModified: directory, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/us/lawyers`, lastModified: directory, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/us/locations`, lastModified: directory, changeFrequency: "weekly", priority: 0.9 },
    ...(US_TOOLS.length > 0
      ? [{ url: `${baseUrl}/us/tools`, lastModified: laterOf(...Object.values(TOOL_CHECKED).map(parseCheckedDate)), changeFrequency: "monthly" as const, priority: 0.5 }]
      : []),
    ...US_TOOLS.map((t) => ({
      url: `${baseUrl}${t.href}`,
      lastModified: parseCheckedDate(TOOL_CHECKED[t.href] ?? US_CONTENT_CHECKED),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/us/guides`, lastModified: guidesDate, changeFrequency: "weekly", priority: 0.7 },
    ...US_GUIDES.map((g) => ({
      url: `${baseUrl}/us/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt ?? g.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/us/about`, lastModified: page("about"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/us/how-we-verify`, lastModified: page("how-we-verify"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/us/contact`, lastModified: page("contact"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/us/listings`, lastModified: content, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/us/privacy`, lastModified: page("privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/us/terms`, lastModified: page("terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const locationRoutes: MetadataRoute.Sitemap = US_CITIES.flatMap((c) => {
    const here = US_LAWYERS.filter((l) => l.citySlug === c.slug);
    return here.length === 0
      ? []
      : [{ url: `${baseUrl}/us/locations/${c.slug}`, lastModified: laterOf(content, latestCheck(here)), changeFrequency: "monthly" as const, priority: 0.8 }];
  });

  const categoryHubRoutes: MetadataRoute.Sitemap = US_PRACTICE_AREAS.map((area) => ({
    url: `${baseUrl}/us/lawyers/${area.urlSlug}`,
    lastModified: laterOf(content, latestCheck(US_LAWYERS.filter((l) => l.practiceAreaSlugs.includes(area.slug)))),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const categoryCityRoutes: MetadataRoute.Sitemap = US_PRACTICE_AREAS.flatMap((area) =>
    US_CITIES.flatMap((city) => {
      const lawyers = usLawyersFor(area.slug, city.slug);
      if (!shouldIndexUsAreaCity(lawyers.length, getUsLocalBlock(area.slug, city))) return [];
      return [
        {
          url: `${baseUrl}/us/lawyers/${area.urlSlug}/${city.slug}`,
          lastModified: laterOf(content, latestCheck(lawyers)),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        },
      ];
    })
  );

  const profileRoutes: MetadataRoute.Sitemap = US_LAWYERS.map((lawyer) => ({
    url: `${baseUrl}/us/lawyer/${lawyer.id}`,
    lastModified: laterOf(content, parseCheckedDate(lawyer.registerChecked)),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes, ...categoryHubRoutes, ...categoryCityRoutes, ...profileRoutes];
}
