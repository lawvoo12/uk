// ============================================================================
// United States (/us) — the cities the directory covers. Single source of
// truth for /us/locations, /us/lawyers/[category]/[city], the /us sitemap and
// the homepage search.
//
// zipPrefixes are the start of the ZIP codes around the city — usually the
// first three digits ("35203" finds Birmingham through "352"), or whole ZIP
// codes where several cities share three digits (Decatur, Florence and Athens
// are all "356…"). The longest matching prefix wins.
//
// City slugs always end with the state code ("montgomery-al", "birmingham-al"),
// because many US city names exist in several states (Montgomery AL and TX,
// Birmingham AL and the UK). The slugs were changed on 22 Oct 2026 — the old
// ones ("montgomery", "birmingham-alabama"…) 301-redirect to these in the
// Netlify site's netlify.toml. Lawyer ids keep their own pattern
// ("birmingham-al-…").
// ============================================================================

import { US_STATE_NAMES, US_STATE_ORDER, type UsStateCode } from "@/lib/us/states";

export interface UsCity {
  slug: string;
  name: string;
  state: UsStateCode;
  /** The county the city's courts belong to (used in page copy). For a city in two counties, the main one. */
  county: string;
  /** Other counties part of the city lies in (Hoover: Shelby County). */
  otherCounties?: string[];
  latitude: number;
  longitude: number;
  zipPrefixes: string[];
  /** Other names people type in the search box. Lower case. */
  aliases?: string[];
}

export const US_CITIES: UsCity[] = [
  // ------------------------------------------------------------ Batch 1 (Alabama)
  {
    slug: "birmingham-al",
    name: "Birmingham",
    state: "AL",
    county: "Jefferson County",
    latitude: 33.5186,
    longitude: -86.8104,
    zipPrefixes: ["350", "351", "352"],
    aliases: ["birmingham al", "birmingham alabama"],
  },
  { slug: "montgomery-al", name: "Montgomery", state: "AL", county: "Montgomery County", latitude: 32.3792, longitude: -86.3077, zipPrefixes: ["360", "361"] },
  { slug: "huntsville-al", name: "Huntsville", state: "AL", county: "Madison County", latitude: 34.7304, longitude: -86.5861, zipPrefixes: ["358"] },
  { slug: "mobile-al", name: "Mobile", state: "AL", county: "Mobile County", latitude: 30.6954, longitude: -88.0399, zipPrefixes: ["365", "366"] },
  { slug: "dothan-al", name: "Dothan", state: "AL", county: "Houston County", latitude: 31.2232, longitude: -85.3905, zipPrefixes: ["363"] },  // ------------------------------------------------------------ Batch 2 (Alabama, 22 Oct 2026)
  // Cities that sit in one county. Counties and probate offices: Alabama
  // Department of Revenue, County Probate Office Directory (updated 18 Nov 2025).
  { slug: "tuscaloosa-al", name: "Tuscaloosa", state: "AL", county: "Tuscaloosa County", latitude: 33.2098, longitude: -87.5692, zipPrefixes: ["354"] },
  { slug: "auburn-al", name: "Auburn", state: "AL", county: "Lee County", latitude: 32.6099, longitude: -85.4808, zipPrefixes: ["36830", "36831", "36832", "36849"] },
  { slug: "opelika-al", name: "Opelika", state: "AL", county: "Lee County", latitude: 32.6454, longitude: -85.3783, zipPrefixes: ["36801", "36802", "36803", "36804"] },
  { slug: "decatur-al", name: "Decatur", state: "AL", county: "Morgan County", latitude: 34.6059, longitude: -86.9833, zipPrefixes: ["35601", "35602", "35603", "35609"] },
  { slug: "florence-al", name: "Florence", state: "AL", county: "Lauderdale County", latitude: 34.7998, longitude: -87.6773, zipPrefixes: ["35630", "35631", "35632", "35633", "35634"] },
  { slug: "gadsden-al", name: "Gadsden", state: "AL", county: "Etowah County", latitude: 34.0143, longitude: -86.0066, zipPrefixes: ["359"] },
  { slug: "anniston-al", name: "Anniston", state: "AL", county: "Calhoun County", latitude: 33.6598, longitude: -85.8316, zipPrefixes: ["362"] },
  { slug: "athens-al", name: "Athens", state: "AL", county: "Limestone County", latitude: 34.8026, longitude: -86.9717, zipPrefixes: ["35611", "35612", "35613", "35614"] },
  { slug: "cullman-al", name: "Cullman", state: "AL", county: "Cullman County", latitude: 34.1748, longitude: -86.8436, zipPrefixes: ["35055", "35056", "35057", "35058"] },
  { slug: "troy-al", name: "Troy", state: "AL", county: "Pike County", latitude: 31.8088, longitude: -85.97, zipPrefixes: ["36079", "36081", "36082"] },
  { slug: "jasper-al", name: "Jasper", state: "AL", county: "Walker County", latitude: 33.8312, longitude: -87.2775, zipPrefixes: ["355"] },
  { slug: "selma-al", name: "Selma", state: "AL", county: "Dallas County", latitude: 32.4074, longitude: -87.0211, zipPrefixes: ["367"] },
  // ------------------------------------------------------------ Batch 3 (Alabama, 22 Oct 2026)
  // Counties: Encyclopedia of Alabama, atlasalabama.gov and shelbyal.com.
  // Hoover, Madison and Vestavia Hills lie in two counties (otherCounties).
  // Hoover and Vestavia Hills have no ZIP prefixes of their own here — their
  // ZIP codes are shared with Birmingham, so a ZIP search lands on Birmingham.
  { slug: "hoover-al", name: "Hoover", state: "AL", county: "Jefferson County", otherCounties: ["Shelby County"], latitude: 33.4054, longitude: -86.8114, zipPrefixes: [] },
  { slug: "madison-al", name: "Madison", state: "AL", county: "Madison County", otherCounties: ["Limestone County"], latitude: 34.6993, longitude: -86.7483, zipPrefixes: ["35756", "35757", "35758"] },
  { slug: "vestavia-hills-al", name: "Vestavia Hills", state: "AL", county: "Jefferson County", otherCounties: ["Shelby County"], latitude: 33.4487, longitude: -86.7878, zipPrefixes: [] },
  { slug: "phenix-city-al", name: "Phenix City", state: "AL", county: "Russell County", latitude: 32.471, longitude: -85.0008, zipPrefixes: ["36867", "36868", "36869", "36870"] },
  { slug: "prattville-al", name: "Prattville", state: "AL", county: "Autauga County", latitude: 32.464, longitude: -86.4597, zipPrefixes: ["36066", "36067", "36068"] },
  { slug: "enterprise-al", name: "Enterprise", state: "AL", county: "Coffee County", latitude: 31.3152, longitude: -85.8552, zipPrefixes: ["36330", "36331"] },
  { slug: "bessemer-al", name: "Bessemer", state: "AL", county: "Jefferson County", latitude: 33.4018, longitude: -86.9544, zipPrefixes: ["35020", "35021", "35022", "35023"] },
  { slug: "alabaster-al", name: "Alabaster", state: "AL", county: "Shelby County", latitude: 33.2443, longitude: -86.8164, zipPrefixes: ["35007"] },
  { slug: "northport-al", name: "Northport", state: "AL", county: "Tuscaloosa County", latitude: 33.229, longitude: -87.5772, zipPrefixes: ["35473", "35475", "35476"] },
  { slug: "daphne-al", name: "Daphne", state: "AL", county: "Baldwin County", latitude: 30.6035, longitude: -87.9036, zipPrefixes: ["36526"] },
  { slug: "fairhope-al", name: "Fairhope", state: "AL", county: "Baldwin County", latitude: 30.523, longitude: -87.9033, zipPrefixes: ["36532", "36533"] },
  { slug: "foley-al", name: "Foley", state: "AL", county: "Baldwin County", latitude: 30.4066, longitude: -87.6836, zipPrefixes: ["36535", "36536"] },
];

/** "Tuscaloosa County", or "Jefferson & Shelby counties" for a city in two counties. */
export function usCountyLabel(city: Pick<UsCity, "county" | "otherCounties">): string {
  if (!city.otherCounties?.length) return city.county;
  const names = [city.county, ...city.otherCounties].map((c) => c.replace(/ County$/, ""));
  return `${names.join(" & ")} counties`;
}

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
  const digits = compact.slice(0, 5);
  let best: { city: UsCity; length: number } | undefined;
  for (const city of US_CITIES) {
    for (const prefix of city.zipPrefixes) {
      if (digits.startsWith(prefix) && (!best || prefix.length > best.length)) best = { city, length: prefix.length };
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
