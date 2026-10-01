// ============================================================================
// Republic of Ireland — the 20 cities and towns the /ie directory covers.
// Single source of truth for /ie/locations, /ie/solicitors/[category]/[city],
// the /ie sitemap and the homepage search.
//
// routingKeys are the Eircode routing keys (first 3 characters of an
// Eircode) for the town, so "T12 XXXX" in the search box finds Cork.
// ============================================================================

export type IeProvince = "Leinster" | "Munster" | "Connacht" | "Ulster";

export interface IeCity {
  slug: string;
  name: string;
  county: string;
  province: IeProvince;
  latitude: number;
  longitude: number;
  routingKeys: string[];
}

const DUBLIN_KEYS = [
  "D01", "D02", "D03", "D04", "D05", "D06", "D6W", "D07", "D08", "D09", "D10", "D11", "D12",
  "D13", "D14", "D15", "D16", "D17", "D18", "D20", "D22", "D24",
];

export const IE_CITIES: IeCity[] = [
  { slug: "dublin", name: "Dublin", county: "Dublin", province: "Leinster", latitude: 53.3498, longitude: -6.2603, routingKeys: DUBLIN_KEYS },
  { slug: "cork", name: "Cork", county: "Cork", province: "Munster", latitude: 51.8985, longitude: -8.4756, routingKeys: ["T12", "T23"] },
  { slug: "limerick", name: "Limerick", county: "Limerick", province: "Munster", latitude: 52.6638, longitude: -8.6267, routingKeys: ["V94"] },
  { slug: "galway", name: "Galway", county: "Galway", province: "Connacht", latitude: 53.2707, longitude: -9.0568, routingKeys: ["H91"] },
  { slug: "waterford", name: "Waterford", county: "Waterford", province: "Munster", latitude: 52.2593, longitude: -7.1101, routingKeys: ["X91"] },
  { slug: "drogheda", name: "Drogheda", county: "Louth", province: "Leinster", latitude: 53.7179, longitude: -6.3561, routingKeys: ["A92"] },
  { slug: "dundalk", name: "Dundalk", county: "Louth", province: "Leinster", latitude: 54.0090, longitude: -6.4049, routingKeys: ["A91"] },
  { slug: "swords", name: "Swords", county: "Dublin", province: "Leinster", latitude: 53.4597, longitude: -6.2181, routingKeys: ["K67"] },
  { slug: "navan", name: "Navan", county: "Meath", province: "Leinster", latitude: 53.6528, longitude: -6.6814, routingKeys: ["C15"] },
  { slug: "kilkenny", name: "Kilkenny", county: "Kilkenny", province: "Leinster", latitude: 52.6541, longitude: -7.2448, routingKeys: ["R95"] },
  { slug: "ennis", name: "Ennis", county: "Clare", province: "Munster", latitude: 52.8436, longitude: -8.9864, routingKeys: ["V95"] },
  { slug: "carlow", name: "Carlow", county: "Carlow", province: "Leinster", latitude: 52.8408, longitude: -6.9261, routingKeys: ["R93"] },
  { slug: "tralee", name: "Tralee", county: "Kerry", province: "Munster", latitude: 52.2713, longitude: -9.6999, routingKeys: ["V92"] },
  { slug: "naas", name: "Naas", county: "Kildare", province: "Leinster", latitude: 53.2159, longitude: -6.6669, routingKeys: ["W91"] },
  { slug: "athlone", name: "Athlone", county: "Westmeath", province: "Leinster", latitude: 53.4239, longitude: -7.9407, routingKeys: ["N37"] },
  { slug: "sligo", name: "Sligo", county: "Sligo", province: "Connacht", latitude: 54.2766, longitude: -8.4761, routingKeys: ["F91"] },
  { slug: "letterkenny", name: "Letterkenny", county: "Donegal", province: "Ulster", latitude: 54.9558, longitude: -7.7342, routingKeys: ["F92"] },
  { slug: "wexford", name: "Wexford", county: "Wexford", province: "Leinster", latitude: 52.3369, longitude: -6.4633, routingKeys: ["Y35"] },
  { slug: "mullingar", name: "Mullingar", county: "Westmeath", province: "Leinster", latitude: 53.5260, longitude: -7.3381, routingKeys: ["N91"] },
  { slug: "castlebar", name: "Castlebar", county: "Mayo", province: "Connacht", latitude: 53.8550, longitude: -9.2988, routingKeys: ["F23"] },
];

export const IE_PROVINCE_ORDER: IeProvince[] = ["Leinster", "Munster", "Connacht", "Ulster"];

export function getIeCityBySlug(slug: string): IeCity | undefined {
  return IE_CITIES.find((c) => c.slug === slug);
}

export function findIeCityByNameOrSlug(input: string): IeCity | undefined {
  const normalized = input.trim().toLowerCase().replace(/^co\.?\s+/, "");
  return IE_CITIES.find((c) => c.slug === normalized || c.name.toLowerCase() === normalized);
}

/** Eircode format: routing key (letter + 2 digits, or D6W) + 4-character unique identifier. */
export const EIRCODE_REGEX = /^(?:[AC-FHKNPRTV-Y]\d{2}|D6W)\s?[0-9AC-FHKNPRTV-Y]{4}$/i;

/** Finds the town for an Eircode (or just its routing key), e.g. "T12 FK07" → Cork. */
export function findIeCityByEircode(input: string): IeCity | undefined {
  const key = input.trim().toUpperCase().replace(/\s+/g, "").slice(0, 3);
  return IE_CITIES.find((c) => c.routingKeys.includes(key));
}

export function getIeCitiesGroupedByProvince(): { province: IeProvince; cities: IeCity[] }[] {
  return IE_PROVINCE_ORDER.map((province) => ({
    province,
    cities: IE_CITIES.filter((c) => c.province === province).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.cities.length > 0);
}
