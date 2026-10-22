// ============================================================================
// United States (/us) — which area × city pages are worth indexing, and the
// city-specific block each one shows. One rule, used by the page's robots
// tag AND by /us/sitemap.xml, so the two always agree.
//
// Why: most of an area × city page is state-level text that repeats across
// every city in the state. A page is only indexed when it has something
// specific to that city — two or more listed lawyers, or one lawyer plus a
// local court or office that handles that kind of case (from the state
// file's city info). Everything else stays reachable but noindex.
// ============================================================================

import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import { usCountyLabel, type UsCity } from "@/lib/us/cities";
import type { UsCityInfo } from "@/lib/us/content-shared";
import { US_CITY_INFO } from "@/lib/us/content";
import { US_LAWYERS, type UsLawyer } from "@/lib/us/lawyers";

export interface UsLocalBlock {
  heading: string;
  body: string;
  /** Official page for the court or office named in the body. */
  link?: { label: string; href: string };
}

/** The city-specific facts for one practice area, or null when there are none. */
export function getUsLocalBlock(area: PracticeAreaSlug, city: UsCity): UsLocalBlock | null {
  const info: UsCityInfo | undefined = US_CITY_INFO[city.slug];
  if (!info) return null;
  const probate = info.courts[0];
  const twoCounties = Boolean(city.otherCounties?.length);
  // Some cities link to the state's probate office directory rather than a
  // court's own website — say so in the link text.
  const probateLink = probate
    ? {
        label: probate.url.includes("revenue.alabama.gov")
          ? "County probate office directory"
          : probate.url.includes("sos.alabama.gov")
            ? "County officials lookup (Alabama Secretary of State)"
            : probate.name,
        href: probate.url,
      }
    : undefined;

  switch (area) {
    case "family":
      return { heading: `Where family cases from ${city.name} are heard`, body: info.familyCourt };
    case "wills-probate":
      return { heading: `Wills and estates in ${twoCounties ? city.name : city.county}`, body: info.estates, link: probateLink };
    case "property":
      if (!probate) return null;
      return {
        heading: `Recording a deed in ${twoCounties ? city.name : city.county}`,
        body:
          info.recording ??
          (twoCounties
            ? `${city.name} is in ${usCountyLabel(city).replace(" & ", " and ")}. Deeds and mortgages are recorded with the probate office of the county the property is in: ${info.courts.map((c) => `${c.name}, ${c.address}`).join("; or ")}.`
            : `Deeds and mortgages for property in ${city.county} are recorded with the county probate office: ${probate.name}, ${probate.address}.`),
        link: probateLink,
      };
    case "personal-injury":
      return info.courtNote ? { heading: `Courts for claims from ${city.name}`, body: info.courtNote } : null;
    case "employment":
      return info.employmentNote ? { heading: `Employment complaints in ${city.name}`, body: info.employmentNote } : null;
    case "immigration":
      // Immigration is federal — nothing on file is specific to the city.
      return null;
  }
}

/** Index an area × city page only when it has city-specific substance. */
export function shouldIndexUsAreaCity(lawyerCount: number, localBlock: UsLocalBlock | null): boolean {
  if (lawyerCount >= 2) return true;
  return lawyerCount >= 1 && localBlock !== null;
}

export function usLawyersFor(area: PracticeAreaSlug, citySlug: string): UsLawyer[] {
  return US_LAWYERS.filter((l) => l.citySlug === citySlug && l.practiceAreaSlugs.includes(area));
}

/**
 * "18 October 2026" → midnight UTC on that day, or undefined if the text
 * can't be read. (Plain `new Date(text)` uses the build machine's time zone,
 * which can shift the date back a day.)
 */
export function parseCheckedDate(text: string | undefined): Date | undefined {
  if (!text) return undefined;
  const d = new Date(text);
  return Number.isNaN(d.getTime()) ? undefined : new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

/** "18 October 2026" → "2026-10-18" (for schema.org dates), or undefined. */
export function checkedDateIso(text: string | undefined): string | undefined {
  return parseCheckedDate(text)?.toISOString().slice(0, 10);
}

/** The most recent register check among some lawyers (for sitemap lastmod). */
export function latestCheck(lawyers: Pick<UsLawyer, "registerChecked">[]): Date | undefined {
  const times = lawyers.map((l) => parseCheckedDate(l.registerChecked)?.getTime()).filter((t): t is number => t !== undefined);
  return times.length ? new Date(Math.max(...times)) : undefined;
}
