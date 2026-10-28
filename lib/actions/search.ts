"use server";

import { findCityByNameOrSlug, TOP_UK_CITIES } from "@/lib/seo/uk-cities";
import { getPracticeAreaBySlug } from "@/lib/validations/lead-intake";
import { EIRCODE_REGEX, findIeCityByEircode, findIeCityByNameOrSlug } from "@/lib/ie/cities";
import { CA_FSA_REGEX, CA_POSTAL_CODE_REGEX, findCaCityByNameOrSlug, findCaCityByPostalCode } from "@/lib/ca/cities";
import { caAreaPath, getCaArea } from "@/lib/ca/practice-areas";
import { findUsCityByNameOrSlug, findUsCityByZip, US_ZIP3_REGEX, US_ZIP_REGEX } from "@/lib/us/cities";
import { getUsArea, usAreaPath } from "@/lib/us/practice-areas";
import { CA_LEADS_ENABLED } from "@/lib/config";
import { findNzCityByNameOrSlug } from "@/lib/nz/cities";
import { nzAreaPath, resolveNzArea } from "@/lib/nz/practice-areas";

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

/**
 * Ireland (/ie) homepage search: a town name ("Cork", "Co. Kilkenny"
 * isn't needed — just the town) or an Eircode / routing key ("T12 FK07",
 * "D02"). Personal injury searches go to the listings page (there's no
 * enquiry form for PI in Ireland).
 */
export async function resolveIeSearchDestination(
  practiceAreaSlug: string,
  locationInput: string
): Promise<SearchDestination> {
  const practiceArea = getPracticeAreaBySlug(practiceAreaSlug);
  if (!practiceArea) {
    return { status: "error", message: "Select a practice area to search." };
  }

  const location = locationInput.trim();
  if (!location) {
    return { status: "error", message: "Enter a town or an Eircode." };
  }

  const city = findIeCityByNameOrSlug(location) ?? findIeCityByEircode(location);
  if (city) {
    return { status: "found", url: `/ie/solicitors/${practiceArea.slug}/${city.slug}` };
  }

  if (EIRCODE_REGEX.test(location) || /^[A-Z]\d{2}$|^D6W$/i.test(location)) {
    return practiceArea.slug === "personal-injury"
      ? {
          status: "unsupported-area",
          message: "We don't have a page for that area yet — see personal injury solicitors across Ireland.",
          fallbackUrl: "/ie/solicitors/personal-injury",
        }
      : {
          status: "unsupported-area",
          message: "We don't have a page for that area yet, but we can still take your details.",
          fallbackUrl: `/ie/leads/new?category=${practiceArea.slug}`,
        };
  }

  return { status: "error", message: 'Enter one of the towns we cover or an Eircode, e.g. "Galway" or "H91".' };
}

/**
 * Canada (/ca) homepage search: a city name ("Toronto", "Ottawa, ON") or a
 * postal code / its first three characters ("M5H 3S5", "L5B"). Results go to
 * /ca/lawyers/[area]/[city], using Canada's URL names (real-estate,
 * wills-estates).
 */
export async function resolveCaSearchDestination(
  practiceAreaSlug: string,
  locationInput: string
): Promise<SearchDestination> {
  const practiceArea = getCaArea(practiceAreaSlug);
  if (!practiceArea) {
    return { status: "error", message: "Select a practice area to search." };
  }

  const location = locationInput.trim();
  if (!location) {
    return { status: "error", message: "Enter a city or a postal code." };
  }

  const city = findCaCityByNameOrSlug(location) ?? findCaCityByPostalCode(location);
  if (city) {
    return { status: "found", url: caAreaPath(practiceArea.slug, city.slug) };
  }

  const compact = location.replace(/\s+/g, "");
  if (CA_POSTAL_CODE_REGEX.test(location) || CA_FSA_REGEX.test(compact)) {
    // The enquiry form is only offered when it's switched on, and never for personal injury.
    return CA_LEADS_ENABLED && practiceArea.slug !== "personal-injury"
      ? {
          status: "unsupported-area",
          message: "We don't have a page for that area yet, but we can still take your details.",
          fallbackUrl: `/ca/leads/new?category=${practiceArea.urlSlug}`,
        }
      : { status: "error", message: `We don't have a page for that postal code yet — see ${practiceArea.lower} lawyers in the cities we cover.` };
  }

  return { status: "error", message: 'Enter one of the cities we cover or a postal code, e.g. "Toronto" or "M5H".' };
}

/**
 * United States (/us) homepage search: a city name ("Birmingham",
 * "Mobile, AL") or a ZIP code / its first three digits ("35203", "352").
 * Results go to /us/lawyers/[area]/[city], using the US URL names
 * (real-estate, estate-planning-probate). The US enquiry form isn't open,
 * so there is no "submit your case instead" fallback.
 */
export async function resolveUsSearchDestination(
  practiceAreaSlug: string,
  locationInput: string
): Promise<SearchDestination> {
  const practiceArea = getUsArea(practiceAreaSlug);
  if (!practiceArea) {
    return { status: "error", message: "Select a practice area to search." };
  }

  const location = locationInput.trim();
  if (!location) {
    return { status: "error", message: "Enter a city or a ZIP code." };
  }

  const city = findUsCityByNameOrSlug(location) ?? findUsCityByZip(location);
  if (city) {
    return { status: "found", url: usAreaPath(practiceArea.slug, city.slug) };
  }

  const compact = location.replace(/\s+/g, "");
  if (US_ZIP_REGEX.test(compact) || US_ZIP3_REGEX.test(compact)) {
    return { status: "error", message: `We don't have a page for that ZIP code yet — see ${practiceArea.lower} lawyers in the cities we cover.` };
  }

  return { status: "error", message: 'Enter one of the cities we cover or a ZIP code, e.g. "Birmingham" or "35203".' };
}

/**
 * New Zealand (/nz) homepage search: a city name ("Auckland", "Ōtautahi",
 * "chch"). Results go to /nz/lawyers/[area]/[city], using the NZ URL names
 * (acc-injury, wills-estates). The NZ enquiry form isn't open, so there is no
 * "submit your case instead" fallback.
 */
export async function resolveNzSearchDestination(
  practiceAreaSlug: string,
  locationInput: string
): Promise<SearchDestination> {
  const practiceArea = resolveNzArea(practiceAreaSlug);
  if (!practiceArea) {
    return { status: "error", message: "Select a practice area to search." };
  }

  const location = locationInput.trim();
  if (!location) {
    return { status: "error", message: "Enter a city." };
  }

  const city = findNzCityByNameOrSlug(location);
  if (city) {
    return { status: "found", url: nzAreaPath(practiceArea.slug, city.slug) };
  }

  return { status: "error", message: `We don't have a page for that place yet — see ${practiceArea.lower} lawyers in the cities we cover, e.g. "Auckland" or "Christchurch".` };
}
