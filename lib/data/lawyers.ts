import { STATIC_LAWYERS, type Regulator, type StaticLawyer } from "@/lib/data/static-lawyers";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";

export interface LawyerListing {
  id: string;
  slug: string;
  firmName: string;
  lawyerName: string;
  role: string;
  bio: string | null;
  regulator: Regulator;
  sraNumber: string | null;
  registerUrl: string;
  addressLine1: string;
  citySlug: string;
  practiceAreaSlugs: string[];
  primaryPracticeArea: string;
  ratingAverage: number | null; // null = no real reviews yet
  ratingCount: number;
  yearsExperience: number | null;
}

function toListing(lawyer: StaticLawyer): LawyerListing {
  const hasReviews = (lawyer.ratingCount ?? 0) > 0 && typeof lawyer.ratingAverage === "number";
  return {
    id: lawyer.id,
    slug: lawyer.id,
    firmName: lawyer.firmName,
    lawyerName: lawyer.lawyerName,
    role: lawyer.role,
    bio: lawyer.bio,
    regulator: lawyer.regulator,
    sraNumber: lawyer.sraNumber,
    registerUrl: lawyer.registerUrl,
    addressLine1: lawyer.addressLine1,
    citySlug: lawyer.citySlug,
    practiceAreaSlugs: lawyer.practiceAreaSlugs,
    primaryPracticeArea: lawyer.primaryPracticeArea,
    ratingAverage: hasReviews ? lawyer.ratingAverage! : null,
    ratingCount: hasReviews ? lawyer.ratingCount! : 0,
    yearsExperience: lawyer.yearsExperience,
  };
}

// Reviewed listings first (by rating), then by years of experience, then name.
function compareListings(a: LawyerListing, b: LawyerListing) {
  if ((b.ratingAverage ?? -1) !== (a.ratingAverage ?? -1)) return (b.ratingAverage ?? -1) - (a.ratingAverage ?? -1);
  if ((b.yearsExperience ?? -1) !== (a.yearsExperience ?? -1)) return (b.yearsExperience ?? -1) - (a.yearsExperience ?? -1);
  return a.firmName.localeCompare(b.firmName);
}

/** Lawyers matching a practice area + city, from the static data file. */
export function getLawyersByCategoryAndCity(categorySlug: PracticeAreaSlug, citySlug: string): LawyerListing[] {
  return STATIC_LAWYERS.filter(
    (lawyer) => lawyer.citySlug === citySlug && lawyer.practiceAreaSlugs.includes(categorySlug)
  )
    .map(toListing)
    .sort(compareListings);
}

/** Every lawyer in a city, across all practice areas — powers /uk/locations/[city]. */
export function getLawyersByCity(citySlug: string): LawyerListing[] {
  return STATIC_LAWYERS.filter((lawyer) => lawyer.citySlug === citySlug)
    .map(toListing)
    .sort(compareListings);
}

/** How many listings each city has, keyed by city slug. */
export function getLawyerCountsByCity(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const lawyer of STATIC_LAWYERS) counts[lawyer.citySlug] = (counts[lawyer.citySlug] ?? 0) + 1;
  return counts;
}

/** Every lawyer whose firm covers a practice area, across all cities. */
export function getLawyersByCategory(categorySlug: PracticeAreaSlug): LawyerListing[] {
  return STATIC_LAWYERS.filter((lawyer) => lawyer.practiceAreaSlugs.includes(categorySlug))
    .map(toListing)
    .sort(compareListings);
}
