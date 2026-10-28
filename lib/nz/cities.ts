// ============================================================================
// New Zealand (/nz) — the cities the directory covers. Single source of truth
// for /nz/locations, /nz/lawyers/[area]/[city], the /nz sitemap and the
// homepage search. Each city here has a District Court and a High Court on
// the Ministry of Justice "Find us" pages. Cities are added batch by batch.
//
// Lawyer ids start "<city>-nz-" so they can never match a UK, Irish,
// Canadian or US id ("hamilton" is also a Canadian city slug).
// ============================================================================

export type NzIsland = "North Island" | "South Island";

export interface NzCity {
  slug: string;
  name: string;
  /** Māori name used by the courts, e.g. "Tāmaki Makaurau". */
  maoriName: string;
  region: string;
  island: NzIsland;
  latitude: number;
  longitude: number;
  /** Other names people type in the search box. Lower case. */
  aliases?: string[];
}

export const NZ_CITIES: NzCity[] = [
  // Batch 1, 28 Oct 2026
  { slug: "auckland", name: "Auckland", maoriName: "Tāmaki Makaurau", region: "Auckland", island: "North Island", latitude: -36.8485, longitude: 174.7633, aliases: ["manukau", "north shore", "akl"] },
  { slug: "wellington", name: "Wellington", maoriName: "Te Whanganui-a-Tara", region: "Wellington", island: "North Island", latitude: -41.2865, longitude: 174.7762, aliases: ["wgtn"] },
  { slug: "christchurch", name: "Christchurch", maoriName: "Ōtautahi", region: "Canterbury", island: "South Island", latitude: -43.5321, longitude: 172.6362, aliases: ["chch"] },
  { slug: "hamilton", name: "Hamilton", maoriName: "Kirikiriroa", region: "Waikato", island: "North Island", latitude: -37.787, longitude: 175.2793 },
  { slug: "tauranga", name: "Tauranga", maoriName: "Tauranga Moana", region: "Bay of Plenty", island: "North Island", latitude: -37.6878, longitude: 176.1651 },
  { slug: "dunedin", name: "Dunedin", maoriName: "Ōtepoti", region: "Otago", island: "South Island", latitude: -45.8788, longitude: 170.5028 },
];

export const NZ_ISLAND_ORDER: NzIsland[] = ["North Island", "South Island"];

export function getNzCityBySlug(slug: string): NzCity | undefined {
  return NZ_CITIES.find((c) => c.slug === slug);
}

export function findNzCityByNameOrSlug(input: string): NzCity | undefined {
  const normalized = input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  const hyphenated = normalized.replace(/\s+/g, "-");
  return NZ_CITIES.find(
    (c) =>
      c.slug === normalized ||
      c.slug === hyphenated ||
      c.name.toLowerCase() === normalized ||
      c.maoriName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "") === normalized ||
      (c.aliases ?? []).includes(normalized)
  );
}

export function getNzCitiesGroupedByIsland(): { island: NzIsland; cities: NzCity[] }[] {
  return NZ_ISLAND_ORDER.map((island) => ({
    island,
    cities: NZ_CITIES.filter((c) => c.island === island).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.cities.length > 0);
}
