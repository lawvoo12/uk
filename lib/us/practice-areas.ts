// ============================================================================
// United States (/us) — the same six practice areas as the UK, Ireland and
// Canada, with US names. Two of them also have a different URL:
//   property      → "Real Estate"                 → /us/lawyers/real-estate
//   wills-probate → "Estate Planning & Probate"   → /us/lawyers/estate-planning-probate
// `slug` is the shared internal value (it's what lawyers' practiceAreaSlugs
// use and what the form validates); `urlSlug` is only for /us URLs.
// ============================================================================

import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";

export interface UsPracticeArea {
  slug: PracticeAreaSlug;
  urlSlug: string;
  name: string;
  /** Lower-case form for sentences: "real estate lawyers in Birmingham". */
  lower: string;
  description: string;
}

export const US_PRACTICE_AREAS: UsPracticeArea[] = [
  { slug: "immigration", urlSlug: "immigration", name: "Immigration", lower: "immigration", description: "Green cards, visas, citizenship and removal defense" },
  { slug: "family", urlSlug: "family", name: "Family", lower: "family", description: "Divorce, custody and child support" },
  { slug: "personal-injury", urlSlug: "personal-injury", name: "Personal Injury", lower: "personal injury", description: "Car crashes, injuries and wrongful death" },
  { slug: "employment", urlSlug: "employment", name: "Employment", lower: "employment", description: "Discrimination, unpaid wages and wrongful termination" },
  { slug: "property", urlSlug: "real-estate", name: "Real Estate", lower: "real estate", description: "Closings, title and landlord–tenant matters" },
  {
    slug: "wills-probate",
    urlSlug: "estate-planning-probate",
    name: "Estate Planning & Probate",
    lower: "estate planning and probate",
    description: "Wills, trusts, probate and estate disputes",
  },
];

/** Looks an area up by its /us URL slug ("real-estate"). */
export function getUsAreaByUrlSlug(urlSlug: string): UsPracticeArea | undefined {
  return US_PRACTICE_AREAS.find((a) => a.urlSlug === urlSlug);
}

/** Looks an area up by the shared internal slug ("property"). */
export function getUsArea(slug: string): UsPracticeArea | undefined {
  return US_PRACTICE_AREAS.find((a) => a.slug === slug);
}

/** Accepts either form — "real-estate" or "property" — e.g. for ?category= links. */
export function resolveUsArea(value: string | undefined): UsPracticeArea | undefined {
  return value ? (getUsAreaByUrlSlug(value) ?? getUsArea(value)) : undefined;
}

/** /us/lawyers/real-estate or /us/lawyers/real-estate/birmingham-al */
export function usAreaPath(slug: string, citySlug?: string): string {
  const area = getUsArea(slug);
  return `/us/lawyers/${area?.urlSlug ?? slug}${citySlug ? `/${citySlug}` : ""}`;
}
