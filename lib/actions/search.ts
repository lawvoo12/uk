"use server";

import { findCityByNameOrSlug, TOP_UK_CITIES } from "@/lib/seo/uk-cities";
import { getPracticeAreaBySlug } from "@/lib/validations/lead-intake";

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

export type SearchDestination =
  | { status: "found"; url: string }
  | { status: "unsupported-area"; message: string; fallbackUrl: string }
  | { status: "error"; message: string };

/**
 * Resolves the homepage's "Category + City/Postcode" search — entirely from
 * the static TOP_UK_CITIES list, no database lookups. Tries a direct city
 * name match first (the common case), then falls back to matching a
 * postcode's outward code (e.g. "SW1A") against each city's outwardCode.
 */
export async function resolveSearchDestination(
  practiceAreaSlug: string,
  locationInput: string
): Promise<SearchDestination> {
  const practiceArea = getPracticeAreaBySlug(practiceAreaSlug);
  if (!practiceArea) {
    return { status: "error", message: "Select a practice area to search." };
  }

  const location = locationInput.trim();
  if (!location) {
    return { status: "error", message: "Enter a city or UK postcode." };
  }

  // 1. Direct match against the city list (name or slug) — "London",
  //    "manchester", etc.
  const directCity = findCityByNameOrSlug(location);
  if (directCity) {
    return { status: "found", url: `/uk/solicitors/${practiceArea.slug}/${directCity.slug}` };
  }

  // 2. Looks like a postcode — match its outward code (e.g. "SW1A" from
  //    "SW1A 1AA") against each city's outwardCode.
  if (UK_POSTCODE_REGEX.test(location)) {
    const outward = location.toUpperCase().replace(/\s+/g, "").slice(0, -3);
    const matchedCity = TOP_UK_CITIES.find((c) => c.outwardCode === outward);

    if (matchedCity) {
      return { status: "found", url: `/uk/solicitors/${practiceArea.slug}/${matchedCity.slug}` };
    }

    return {
      status: "unsupported-area",
      message: "We don't have a page for that postcode's area yet, but we can still take your details.",
      fallbackUrl: `/uk/leads/new?category=${practiceArea.slug}`,
    };
  }

  // 3. Neither a known city nor a valid postcode shape.
  return { status: "error", message: "Enter a valid UK city or postcode, e.g. \"Manchester\" or \"SW1A 1AA\"." };
}
