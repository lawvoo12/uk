// ============================================================================
// United States (/us) — the cities the directory covers. Single source of
// truth for /us/locations, /us/lawyers/[category]/[city], the /us sitemap and
// the homepage search.
//
// zipPrefixes are the first three digits of the ZIP codes around the city,
// so "35203" in the search box finds Birmingham. The longest matching prefix
// wins.
//
// Birmingham, Alabama uses the slug "birmingham-alabama" and lawyer ids
// starting "birmingham-al-", so nothing clashes with Birmingham in the UK data.
// ============================================================================

import { US_STATE_NAMES, US_STATE_ORDER, type UsStateCode } from "@/lib/us/states";

export interface UsCity {
  slug: string;
  name: string;
  state: UsStateCode;
  /** The county the city's courts belong to (used in page copy). */
  county: string;
  latitude: number;
  longitude: number;
  zipPrefixes: string[];
  /** Other names people type in the search box. Lower case. */
  aliases?: string[];
}

export const US_CITIES: UsCity[] = [
  // ------------------------------------------------------------ Batch 1 (Alabama)
  {
    // Not "birmingham": that slug belongs to Birmingham in the UK data.
    slug: "birmingham-alabama",
    name: "Birmingham",
    state: "AL",
    county: "Jefferson County",
    latitude: 33.5186,
    longitude: -86.8104,
    zipPrefixes: ["350", "351", "352"],
    aliases: ["birmingham al", "birmingham alabama"],
  },
  { slug: "montgomery", name: "Montgomery", state: "AL", county: "Montgomery County", latitude: 32.3792, longitude: -86.3077, zipPrefixes: ["360", "361"] },
  { slug: "huntsville", name: "Huntsville", state: "AL", county: "Madison County", latitude: 34.7304, longitude: -86.5861, zipPrefixes: ["358"] },
  { slug: "mobile", name: "Mobile", state: "AL", county: "Mobile County", latitude: 30.6954, longitude: -88.0399, zipPrefixes: ["365", "366"] },
  { slug: "dothan", name: "Dothan", state: "AL", county: "Houston County", latitude: 31.2232, longitude: -85.3905, zipPrefixes: ["363"] },
];

export function stateName(code: UsStateCode): string {
  return US_STATE_NAMES[code];
}

export function getUsCityBySlug(slug: string): UsCity | undefined {
  return US_CITIES.find((c) => c.slug === slug);
}

export function findUsCityByNameOrSlug(input: string): UsCity | undefined {
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/,?\s+(al|ala\.?|alabama)$/i, "")
    .trim();
  const spaced = normalized.replace(/-/g, " ");
  return US_CITIES.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === normalized || c.aliases?.includes(spaced) === true
  );
}

/** US ZIP code: 12345 or 12345-6789. */
export const US_ZIP_REGEX = /^\d{5}(-\d{4})?$/;
/** Just the first three digits ("352"). */
export const US_ZIP3_REGEX = /^\d{3}$/;

/** Finds the city for a ZIP code or its first three digits, e.g. "35203" → Birmingham. */
export function findUsCityByZip(input: string): UsCity | undefined {
  const compact = input.trim().replace(/\s+/g, "");
  if (!US_ZIP_REGEX.test(compact) && !US_ZIP3_REGEX.test(compact)) return undefined;
  const zip3 = compact.slice(0, 3);
  let best: { city: UsCity; length: number } | undefined;
  for (const city of US_CITIES) {
    for (const prefix of city.zipPrefixes) {
      if (zip3.startsWith(prefix) && (!best || prefix.length > best.length)) best = { city, length: prefix.length };
    }
  }
  return best?.city;
}

export function getUsCitiesGroupedByState(): { state: UsStateCode; stateName: string; cities: UsCity[] }[] {
  return US_STATE_ORDER.map((state) => ({
    state,
    stateName: US_STATE_NAMES[state],
    cities: US_CITIES.filter((c) => c.state === state),
  })).filter((g) => g.cities.length > 0);
}
