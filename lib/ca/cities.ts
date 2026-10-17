// ============================================================================
// Canada (/ca) — the cities the directory covers. Single source of truth for
// /ca/locations, /ca/lawyers/[category]/[city], the /ca sitemap and the
// homepage search. Cities are added batch by batch as their lawyers are
// verified; the full plan is 20 cities in 9 provinces (no Quebec).
//
// fsaPrefixes are the start of the city's postal codes (the "forward
// sortation area"), so "M5H 3S5" in the search box finds Toronto. The
// longest matching prefix wins.
//
// London, Ontario uses the slug "london-ontario" and lawyer ids starting
// "london-on-", so nothing clashes with London in the UK data.
// ============================================================================

import { CA_PROVINCE_NAMES, CA_PROVINCE_ORDER, type CaProvinceCode } from "@/lib/ca/provinces";

export interface CaCity {
  slug: string;
  name: string;
  province: CaProvinceCode;
  latitude: number;
  longitude: number;
  fsaPrefixes: string[];
  /** Other names people type in the search box ("kitchener", "waterloo"). Lower case. */
  aliases?: string[];
}

export const CA_CITIES: CaCity[] = [
  // ------------------------------------------------------------ Batch 1 (Ontario)
  { slug: "toronto", name: "Toronto", province: "ON", latitude: 43.6532, longitude: -79.3832, fsaPrefixes: ["M"] },
  { slug: "ottawa", name: "Ottawa", province: "ON", latitude: 45.4215, longitude: -75.6972, fsaPrefixes: ["K1", "K2", "K4A"] },
  {
    slug: "mississauga",
    name: "Mississauga",
    province: "ON",
    latitude: 43.589,
    longitude: -79.6441,
    fsaPrefixes: ["L5", "L4T", "L4V", "L4W", "L4X", "L4Y", "L4Z"],
  },
  {
    slug: "brampton",
    name: "Brampton",
    province: "ON",
    latitude: 43.7315,
    longitude: -79.7624,
    fsaPrefixes: ["L6P", "L6R", "L6S", "L6T", "L6V", "L6W", "L6X", "L6Y", "L6Z", "L7A"],
  },
  { slug: "hamilton", name: "Hamilton", province: "ON", latitude: 43.2557, longitude: -79.8711, fsaPrefixes: ["L8", "L9A", "L9B", "L9C"] },

  // ------------------------------------------------- Batch 2 (Ontario, British Columbia)
  {
    // Not "london": that slug and the "london-…" id prefix belong to London in the UK data.
    slug: "london-ontario",
    name: "London",
    province: "ON",
    latitude: 42.9849,
    longitude: -81.2453,
    fsaPrefixes: ["N6", "N5V", "N5W", "N5X", "N5Y", "N5Z"],
    aliases: ["london on", "london ontario"],
  },
  {
    slug: "kitchener-waterloo",
    name: "Kitchener-Waterloo",
    province: "ON",
    latitude: 43.4516,
    longitude: -80.4925,
    fsaPrefixes: ["N2A", "N2B", "N2C", "N2E", "N2G", "N2H", "N2J", "N2K", "N2L", "N2M", "N2N", "N2P", "N2R", "N2T", "N2V"],
    aliases: ["kitchener", "waterloo", "kitchener waterloo", "kw"],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    province: "BC",
    latitude: 49.2827,
    longitude: -123.1207,
    fsaPrefixes: [
      "V5K", "V5L", "V5M", "V5N", "V5P", "V5R", "V5S", "V5T", "V5V", "V5W", "V5X", "V5Y", "V5Z",
      "V6A", "V6B", "V6C", "V6E", "V6G", "V6H", "V6J", "V6K", "V6L", "V6M", "V6N", "V6P", "V6R", "V6S", "V6T", "V6Z",
      "V7X", "V7Y",
    ],
  },
  {
    slug: "surrey",
    name: "Surrey",
    province: "BC",
    latitude: 49.1913,
    longitude: -122.849,
    fsaPrefixes: ["V3R", "V3S", "V3T", "V3V", "V3W", "V3X", "V3Z", "V4A", "V4N", "V4P"],
  },
  {
    slug: "victoria",
    name: "Victoria",
    province: "BC",
    latitude: 48.4284,
    longitude: -123.3656,
    fsaPrefixes: ["V8N", "V8P", "V8R", "V8S", "V8T", "V8V", "V8W", "V8X", "V8Y", "V8Z", "V9A", "V9B", "V9C", "V9E"],
  },

  // ------------------------------- Batch 3 (British Columbia, Alberta, Saskatchewan)
  { slug: "kelowna", name: "Kelowna", province: "BC", latitude: 49.888, longitude: -119.496, fsaPrefixes: ["V1P", "V1V", "V1W", "V1X", "V1Y"] },
  { slug: "calgary", name: "Calgary", province: "AB", latitude: 51.0447, longitude: -114.0719, fsaPrefixes: ["T1Y", "T2", "T3"] },
  { slug: "edmonton", name: "Edmonton", province: "AB", latitude: 53.5461, longitude: -113.4938, fsaPrefixes: ["T5", "T6"] },
  { slug: "saskatoon", name: "Saskatoon", province: "SK", latitude: 52.1332, longitude: -106.67, fsaPrefixes: ["S7H", "S7J", "S7K", "S7L", "S7M", "S7N", "S7P", "S7R", "S7S", "S7T", "S7V", "S7W"] },
  { slug: "regina", name: "Regina", province: "SK", latitude: 50.4452, longitude: -104.6189, fsaPrefixes: ["S4L", "S4M", "S4N", "S4P", "S4R", "S4S", "S4T", "S4V", "S4W", "S4X", "S4Y", "S4Z"] },

  // ------------- Batch 4 (Manitoba, Nova Scotia, New Brunswick, Newfoundland and Labrador, PEI)
  { slug: "winnipeg", name: "Winnipeg", province: "MB", latitude: 49.8951, longitude: -97.1384, fsaPrefixes: ["R2", "R3"] },
  {
    // The Halifax Regional Municipality, which includes Dartmouth and Bedford.
    slug: "halifax",
    name: "Halifax",
    province: "NS",
    latitude: 44.6488,
    longitude: -63.5752,
    fsaPrefixes: ["B3", "B2V", "B2W", "B2X", "B2Y", "B4A"],
    aliases: ["dartmouth", "bedford", "hrm"],
  },
  { slug: "moncton", name: "Moncton", province: "NB", latitude: 46.0878, longitude: -64.7782, fsaPrefixes: ["E1A", "E1C", "E1E", "E1G", "E1H"] },
  {
    slug: "st-johns",
    name: "St. John's",
    province: "NL",
    latitude: 47.5615,
    longitude: -52.7126,
    fsaPrefixes: ["A1A", "A1B", "A1C", "A1E", "A1G", "A1H"],
    // Not "saint john": that is a different city, in New Brunswick.
    aliases: ["st johns", "st. johns", "st john's", "saint john's", "saint johns"],
  },
  { slug: "charlottetown", name: "Charlottetown", province: "PE", latitude: 46.2382, longitude: -63.1311, fsaPrefixes: ["C1A", "C1C", "C1E"] },
];

export function provinceName(code: CaProvinceCode): string {
  return CA_PROVINCE_NAMES[code];
}

export function getCaCityBySlug(slug: string): CaCity | undefined {
  return CA_CITIES.find((c) => c.slug === slug);
}

export function findCaCityByNameOrSlug(input: string): CaCity | undefined {
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/,\s*(on|ont\.?|ontario|bc|british columbia|ab|alta\.?|alberta|sk|sask\.?|saskatchewan|mb|man\.?|manitoba|ns|nova scotia|nb|new brunswick|nl|nfld\.?|newfoundland|newfoundland and labrador|pe|pei|prince edward island)$/i, "")
    .trim();
  const spaced = normalized.replace(/-/g, " ");
  return CA_CITIES.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === normalized || c.aliases?.includes(spaced) === true
  );
}

/** Canadian postal code: A1A 1A1 (the letters D, F, I, O, Q and U are never used; W and Z never start one). */
export const CA_POSTAL_CODE_REGEX = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
/** Just the first half ("M5H"), which is enough to find the city. */
export const CA_FSA_REGEX = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]$/i;

/** Finds the city for a postal code or its first three characters, e.g. "L5B 1M5" → Mississauga. */
export function findCaCityByPostalCode(input: string): CaCity | undefined {
  const fsa = input.trim().toUpperCase().replace(/\s+/g, "").slice(0, 3);
  if (!CA_FSA_REGEX.test(fsa)) return undefined;
  let best: { city: CaCity; length: number } | undefined;
  for (const city of CA_CITIES) {
    for (const prefix of city.fsaPrefixes) {
      if (fsa.startsWith(prefix) && (!best || prefix.length > best.length)) best = { city, length: prefix.length };
    }
  }
  return best?.city;
}

export function getCaCitiesGroupedByProvince(): { province: CaProvinceCode; provinceName: string; cities: CaCity[] }[] {
  return CA_PROVINCE_ORDER.map((province) => ({
    province,
    provinceName: CA_PROVINCE_NAMES[province],
    cities: CA_CITIES.filter((c) => c.province === province),
  })).filter((g) => g.cities.length > 0);
}
