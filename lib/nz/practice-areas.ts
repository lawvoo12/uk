// ============================================================================
// New Zealand (/nz) — the same six practice areas, with New Zealand names.
//   personal-injury → "ACC & Injury"   (/nz/lawyers/acc-injury)
//   wills-probate   → "Wills & Estates" (/nz/lawyers/wills-estates)
// New Zealand's ACC scheme replaces most personal injury lawsuits, so that
// area is about ACC claims and challenging ACC decisions.
// `slug` is the shared internal value; `urlSlug` is only for /nz URLs.
// ============================================================================

import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";

export interface NzPracticeArea {
  slug: PracticeAreaSlug;
  urlSlug: string;
  name: string;
  /** Lower-case form for sentences: "family lawyers in Auckland". */
  lower: string;
  description: string;
}

export const NZ_PRACTICE_AREAS: NzPracticeArea[] = [
  { slug: "immigration", urlSlug: "immigration", name: "Immigration", lower: "immigration", description: "Visas, residence and appeals" },
  { slug: "family", urlSlug: "family", name: "Family", lower: "family", description: "Separation, care of children and relationship property" },
  { slug: "personal-injury", urlSlug: "acc-injury", name: "ACC & Injury", lower: "ACC and injury", description: "ACC claims, reviews and appeals" },
  { slug: "employment", urlSlug: "employment", name: "Employment", lower: "employment", description: "Personal grievances, dismissal and workplace rights" },
  { slug: "property", urlSlug: "property", name: "Property", lower: "property", description: "Buying, selling and tenancy matters" },
  { slug: "wills-probate", urlSlug: "wills-estates", name: "Wills & Estates", lower: "wills and estates", description: "Wills, trusts, probate and estate disputes" },
];

export function getNzAreaByUrlSlug(urlSlug: string): NzPracticeArea | undefined {
  return NZ_PRACTICE_AREAS.find((a) => a.urlSlug === urlSlug);
}

export function getNzArea(slug: string): NzPracticeArea | undefined {
  return NZ_PRACTICE_AREAS.find((a) => a.slug === slug);
}

/** Accepts either form — "wills-estates" or "wills-probate". */
export function resolveNzArea(value: string | undefined): NzPracticeArea | undefined {
  return value ? (getNzAreaByUrlSlug(value) ?? getNzArea(value)) : undefined;
}

/** /nz/lawyers/family or /nz/lawyers/family/auckland */
export function nzAreaPath(slug: string, citySlug?: string): string {
  const area = getNzArea(slug);
  return `/nz/lawyers/${area?.urlSlug ?? slug}${citySlug ? `/${citySlug}` : ""}`;
}

/**
 * Sub-categories for a future NZ enquiry form. The NZ form is OFF (there is
 * no NZ_LEADS_ENABLED switch-on and no NZ schema yet); these only fill the
 * country registry's shape.
 */
export const NZ_SUB_CATEGORIES: Record<PracticeAreaSlug, { slug: string; name: string }[]> = {
  immigration: [
    { slug: "work-visa", name: "Work Visa" },
    { slug: "residence", name: "Residence" },
    { slug: "partner-family", name: "Partner or Family Visa" },
    { slug: "appeal", name: "Decline or Appeal" },
  ],
  family: [
    { slug: "separation", name: "Separation & Divorce" },
    { slug: "care-of-children", name: "Care of Children" },
    { slug: "relationship-property", name: "Relationship Property" },
    { slug: "protection-order", name: "Protection Order" },
  ],
  "personal-injury": [],
  employment: [
    { slug: "personal-grievance", name: "Personal Grievance" },
    { slug: "dismissal", name: "Dismissal or Redundancy" },
    { slug: "employment-agreement", name: "Employment Agreement Review" },
  ],
  property: [
    { slug: "buying-selling", name: "Buying or Selling a Home" },
    { slug: "tenancy", name: "Tenancy" },
    { slug: "boundary-building", name: "Boundary or Building Dispute" },
  ],
  "wills-probate": [
    { slug: "will-trust", name: "Will or Trust" },
    { slug: "epa", name: "Enduring Power of Attorney" },
    { slug: "probate", name: "Probate & Estate Administration" },
    { slug: "estate-dispute", name: "Estate Dispute" },
  ],
};
