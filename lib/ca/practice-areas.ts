// ============================================================================
// Canada (/ca) — the same six practice areas as the UK and Ireland, with
// Canadian names. Two of them also have a different URL:
//   property      → "Real Estate"      → /ca/lawyers/real-estate
//   wills-probate → "Wills & Estates"  → /ca/lawyers/wills-estates
// `slug` is the shared internal value (it's what lawyers' practiceAreaSlugs
// use and what the form validates); `urlSlug` is only for /ca URLs.
// ============================================================================

import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";

export interface CaPracticeArea {
  slug: PracticeAreaSlug;
  urlSlug: string;
  name: string;
  /** Lower-case form for sentences: "real estate lawyers in Toronto". */
  lower: string;
  description: string;
}

export const CA_PRACTICE_AREAS: CaPracticeArea[] = [
  { slug: "immigration", urlSlug: "immigration", name: "Immigration", lower: "immigration", description: "Permits, permanent residence and citizenship" },
  { slug: "family", urlSlug: "family", name: "Family", lower: "family", description: "Divorce, parenting and support" },
  { slug: "personal-injury", urlSlug: "personal-injury", name: "Personal Injury", lower: "personal injury", description: "Accidents and insurance claims" },
  { slug: "employment", urlSlug: "employment", name: "Employment", lower: "employment", description: "Dismissal, severance and workplace rights" },
  { slug: "property", urlSlug: "real-estate", name: "Real Estate", lower: "real estate", description: "Buying, selling and tenancy matters" },
  { slug: "wills-probate", urlSlug: "wills-estates", name: "Wills & Estates", lower: "wills and estates", description: "Wills, probate and estate disputes" },
];

/** Looks an area up by its /ca URL slug ("real-estate"). */
export function getCaAreaByUrlSlug(urlSlug: string): CaPracticeArea | undefined {
  return CA_PRACTICE_AREAS.find((a) => a.urlSlug === urlSlug);
}

/** Looks an area up by the shared internal slug ("property"). */
export function getCaArea(slug: string): CaPracticeArea | undefined {
  return CA_PRACTICE_AREAS.find((a) => a.slug === slug);
}

/** Accepts either form — "real-estate" or "property" — e.g. for ?category= links. */
export function resolveCaArea(value: string | undefined): CaPracticeArea | undefined {
  return value ? (getCaAreaByUrlSlug(value) ?? getCaArea(value)) : undefined;
}

/** /ca/lawyers/real-estate or /ca/lawyers/real-estate/toronto */
export function caAreaPath(slug: string, citySlug?: string): string {
  const area = getCaArea(slug);
  return `/ca/lawyers/${area?.urlSlug ?? slug}${citySlug ? `/${citySlug}` : ""}`;
}
