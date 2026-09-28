import { TOP_UK_CITIES, type UKCitySeed } from "@/lib/seo/uk-cities";

// Display order for the /uk/locations index: south to north through England,
// then Wales, Scotland and Northern Ireland.
export const REGION_ORDER = [
  "Greater London",
  "South East England",
  "South West England",
  "East of England",
  "West Midlands",
  "East Midlands",
  "Yorkshire and the Humber",
  "North West England",
  "North East England",
  "Wales",
  "Scotland",
  "Northern Ireland",
] as const;

export function regionSlug(region: string) {
  return region.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function getCitiesGroupedByRegion(): { region: string; cities: UKCitySeed[] }[] {
  const known = new Set<string>(REGION_ORDER);
  const extra = [...new Set(TOP_UK_CITIES.map((c) => c.region))].filter((r) => !known.has(r));
  return [...REGION_ORDER, ...extra]
    .map((region) => ({
      region,
      cities: TOP_UK_CITIES.filter((c) => c.region === region).sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((group) => group.cities.length > 0);
}
