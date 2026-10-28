// ============================================================================
// Republic of Ireland — the cities and towns the /ie directory covers.
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

// D24 (Tallaght) has its own town page, so it is not in this list.
const DUBLIN_KEYS = [
  "D01", "D02", "D03", "D04", "D05", "D06", "D6W", "D07", "D08", "D09", "D10", "D11", "D12",
  "D13", "D14", "D15", "D16", "D17", "D18", "D20", "D22",
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
  // Added 23 Oct 2026 — one town in each county that had none. Routing keys
  // from each town's courthouse Eircode on courts.ie.
  { slug: "bray", name: "Bray", county: "Wicklow", province: "Leinster", latitude: 53.2009, longitude: -6.1111, routingKeys: ["A98"] },
  { slug: "clonmel", name: "Clonmel", county: "Tipperary", province: "Munster", latitude: 52.3550, longitude: -7.7039, routingKeys: ["E91"] },
  { slug: "tullamore", name: "Tullamore", county: "Offaly", province: "Leinster", latitude: 53.2739, longitude: -7.4889, routingKeys: ["R35"] },
  { slug: "portlaoise", name: "Portlaoise", county: "Laois", province: "Leinster", latitude: 53.0344, longitude: -7.2998, routingKeys: ["R32"] },
  { slug: "cavan", name: "Cavan", county: "Cavan", province: "Ulster", latitude: 53.9908, longitude: -7.3606, routingKeys: ["H12"] },
  { slug: "monaghan", name: "Monaghan", county: "Monaghan", province: "Ulster", latitude: 54.2492, longitude: -6.9683, routingKeys: ["H18"] },
  { slug: "longford", name: "Longford", county: "Longford", province: "Leinster", latitude: 53.7276, longitude: -7.7998, routingKeys: ["N39"] },
  { slug: "roscommon", name: "Roscommon", county: "Roscommon", province: "Connacht", latitude: 53.6279, longitude: -8.1896, routingKeys: ["F42"] },
  { slug: "carrick-on-shannon", name: "Carrick-on-Shannon", county: "Leitrim", province: "Connacht", latitude: 53.9469, longitude: -8.0900, routingKeys: ["N41"] },
  // Batch 1 of larger towns, 24 Oct 2026. Each has its own courthouse on
  // courts.ie; routing keys from that courthouse's Eircode.
  { slug: "dun-laoghaire", name: "Dún Laoghaire", county: "Dublin", province: "Leinster", latitude: 53.2944, longitude: -6.1339, routingKeys: ["A96"] },
  { slug: "tallaght", name: "Tallaght", county: "Dublin", province: "Leinster", latitude: 53.2886, longitude: -6.3733, routingKeys: ["D24"] },
  { slug: "killarney", name: "Killarney", county: "Kerry", province: "Munster", latitude: 52.0599, longitude: -9.5044, routingKeys: ["V93"] },
  { slug: "mallow", name: "Mallow", county: "Cork", province: "Munster", latitude: 52.139, longitude: -8.6514, routingKeys: ["P51"] },
  { slug: "nenagh", name: "Nenagh", county: "Tipperary", province: "Munster", latitude: 52.8619, longitude: -8.1967, routingKeys: ["E45"] },
  { slug: "dungarvan", name: "Dungarvan", county: "Waterford", province: "Munster", latitude: 52.0845, longitude: -7.625, routingKeys: ["X35"] },
  { slug: "ballina", name: "Ballina", county: "Mayo", province: "Connacht", latitude: 54.1149, longitude: -9.1551, routingKeys: ["F26"] },
  { slug: "arklow", name: "Arklow", county: "Wicklow", province: "Leinster", latitude: 52.7977, longitude: -6.1599, routingKeys: ["Y14"] },
  { slug: "athy", name: "Athy", county: "Kildare", province: "Leinster", latitude: 52.992, longitude: -6.987, routingKeys: ["R14"] },
  { slug: "ballinasloe", name: "Ballinasloe", county: "Galway", province: "Connacht", latitude: 53.3275, longitude: -8.2194, routingKeys: ["H53"] },
  // Batch 2, 24 Oct 2026 — each has its own courthouse on courts.ie. Trim
  // shares the C15 routing key with Navan, so it has none of its own here.
  { slug: "balbriggan", name: "Balbriggan", county: "Dublin", province: "Leinster", latitude: 53.6128, longitude: -6.1819, routingKeys: ["K32"] },
  { slug: "gorey", name: "Gorey", county: "Wexford", province: "Leinster", latitude: 52.6744, longitude: -6.2925, routingKeys: ["Y25"] },
  { slug: "tuam", name: "Tuam", county: "Galway", province: "Connacht", latitude: 53.5146, longitude: -8.8517, routingKeys: ["H54"] },
  { slug: "thurles", name: "Thurles", county: "Tipperary", province: "Munster", latitude: 52.6802, longitude: -7.8137, routingKeys: ["E41"] },
  { slug: "trim", name: "Trim", county: "Meath", province: "Leinster", latitude: 53.555, longitude: -6.7915, routingKeys: [] },
  { slug: "fermoy", name: "Fermoy", county: "Cork", province: "Munster", latitude: 52.1384, longitude: -8.2758, routingKeys: ["P61"] },
  { slug: "youghal", name: "Youghal", county: "Cork", province: "Munster", latitude: 51.9541, longitude: -7.8506, routingKeys: ["P36"] },
  { slug: "listowel", name: "Listowel", county: "Kerry", province: "Munster", latitude: 52.4464, longitude: -9.4853, routingKeys: ["V31"] },
  { slug: "loughrea", name: "Loughrea", county: "Galway", province: "Connacht", latitude: 53.1969, longitude: -8.5667, routingKeys: ["H62"] },
  // Batch 3, 25 Oct 2026 — each has its own courthouse on courts.ie; routing
  // keys from that courthouse's Eircode.
  { slug: "midleton", name: "Midleton", county: "Cork", province: "Munster", latitude: 51.9153, longitude: -8.1752, routingKeys: ["P25"] },
  { slug: "newcastle-west", name: "Newcastle West", county: "Limerick", province: "Munster", latitude: 52.4492, longitude: -9.0611, routingKeys: ["V42"] },
  { slug: "clonakilty", name: "Clonakilty", county: "Cork", province: "Munster", latitude: 51.6231, longitude: -8.8706, routingKeys: ["P85"] },
  { slug: "bandon", name: "Bandon", county: "Cork", province: "Munster", latitude: 51.746, longitude: -8.7425, routingKeys: ["P72"] },
  { slug: "carrick-on-suir", name: "Carrick-on-Suir", county: "Tipperary", province: "Munster", latitude: 52.3492, longitude: -7.4131, routingKeys: ["E32"] },
  { slug: "kilrush", name: "Kilrush", county: "Clare", province: "Munster", latitude: 52.6397, longitude: -9.4836, routingKeys: ["V15"] },
  { slug: "carrickmacross", name: "Carrickmacross", county: "Monaghan", province: "Ulster", latitude: 53.9775, longitude: -6.7189, routingKeys: ["A81"] },
  { slug: "cashel", name: "Cashel", county: "Tipperary", province: "Munster", latitude: 52.516, longitude: -7.8855, routingKeys: ["E25"] },
  { slug: "ballyshannon", name: "Ballyshannon", county: "Donegal", province: "Ulster", latitude: 54.5036, longitude: -8.1897, routingKeys: ["F94"] },
  { slug: "macroom", name: "Macroom", county: "Cork", province: "Munster", latitude: 51.9045, longitude: -8.9568, routingKeys: ["P12"] },
  // Batch 4, 25 Oct 2026 — each has its own courthouse on courts.ie. Ardee
  // (A92, Drogheda), Tubbercurry and Manorhamilton (F91, Sligo), Gort (H91,
  // Galway) and Kenmare (V93, Killarney) share a routing key with a listed
  // town, so they have none of their own here.
  { slug: "ardee", name: "Ardee", county: "Louth", province: "Leinster", latitude: 53.8586, longitude: -6.5394, routingKeys: [] },
  { slug: "kilmallock", name: "Kilmallock", county: "Limerick", province: "Munster", latitude: 52.4002, longitude: -8.5772, routingKeys: ["V35"] },
  { slug: "castlerea", name: "Castlerea", county: "Roscommon", province: "Connacht", latitude: 53.7686, longitude: -8.4927, routingKeys: ["F45"] },
  { slug: "tubbercurry", name: "Tubbercurry", county: "Sligo", province: "Connacht", latitude: 54.0556, longitude: -8.7286, routingKeys: [] },
  { slug: "manorhamilton", name: "Manorhamilton", county: "Leitrim", province: "Connacht", latitude: 54.3036, longitude: -8.1764, routingKeys: [] },
  { slug: "clifden", name: "Clifden", county: "Galway", province: "Connacht", latitude: 53.4894, longitude: -10.0189, routingKeys: ["H71"] },
  { slug: "gort", name: "Gort", county: "Galway", province: "Connacht", latitude: 53.0659, longitude: -8.8186, routingKeys: [] },
  { slug: "kenmare", name: "Kenmare", county: "Kerry", province: "Munster", latitude: 51.8801, longitude: -9.5832, routingKeys: [] },
  { slug: "skibbereen", name: "Skibbereen", county: "Cork", province: "Munster", latitude: 51.55, longitude: -9.2667, routingKeys: ["P81"] },
  { slug: "bantry", name: "Bantry", county: "Cork", province: "Munster", latitude: 51.6801, longitude: -9.4526, routingKeys: ["P75"] },
  // Batch 5, 25 Oct 2026 — each has its own courthouse on courts.ie. Dingle
  // (V92, Tralee), Strokestown (F42, Roscommon) and Dungloe (F94,
  // Ballyshannon) share a routing key with a listed town.
  { slug: "dingle", name: "Dingle", county: "Kerry", province: "Munster", latitude: 52.1408, longitude: -10.2689, routingKeys: [] },
  { slug: "caherciveen", name: "Caherciveen", county: "Kerry", province: "Munster", latitude: 51.9486, longitude: -10.2219, routingKeys: ["V23"] },
  { slug: "strokestown", name: "Strokestown", county: "Roscommon", province: "Connacht", latitude: 53.7764, longitude: -8.1036, routingKeys: [] },
  { slug: "dungloe", name: "Dungloe", county: "Donegal", province: "Ulster", latitude: 54.9506, longitude: -8.3594, routingKeys: [] },
  { slug: "buncrana", name: "Buncrana", county: "Donegal", province: "Ulster", latitude: 55.1333, longitude: -7.45, routingKeys: ["F93"] },
  // Batch 6, 25 Oct 2026 — larger towns with no courthouse of their own on
  // courts.ie. Their pages list the nearest courthouses in the same county.
  // Maynooth and Celbridge share W23, so neither has a routing key here.
  { slug: "newbridge", name: "Newbridge", county: "Kildare", province: "Leinster", latitude: 53.1819, longitude: -6.7967, routingKeys: ["W12"] },
  { slug: "maynooth", name: "Maynooth", county: "Kildare", province: "Leinster", latitude: 53.3815, longitude: -6.591, routingKeys: [] },
  { slug: "celbridge", name: "Celbridge", county: "Kildare", province: "Leinster", latitude: 53.3398, longitude: -6.5387, routingKeys: [] },
  { slug: "greystones", name: "Greystones", county: "Wicklow", province: "Leinster", latitude: 53.144, longitude: -6.072, routingKeys: ["A63"] },
  { slug: "carrigaline", name: "Carrigaline", county: "Cork", province: "Munster", latitude: 51.8117, longitude: -8.3986, routingKeys: ["P43"] },
  { slug: "cobh", name: "Cobh", county: "Cork", province: "Munster", latitude: 51.8503, longitude: -8.2967, routingKeys: ["P24"] },
  { slug: "enniscorthy", name: "Enniscorthy", county: "Wexford", province: "Leinster", latitude: 52.5008, longitude: -6.5578, routingKeys: ["Y21"] },
  { slug: "westport", name: "Westport", county: "Mayo", province: "Connacht", latitude: 53.8008, longitude: -9.5183, routingKeys: ["F28"] },
  { slug: "shannon", name: "Shannon", county: "Clare", province: "Munster", latitude: 52.7037, longitude: -8.8642, routingKeys: ["V14"] },
  // Batch 7, 28 Oct 2026 — more towns with no courthouse of their own.
  { slug: "new-ross", name: "New Ross", county: "Wexford", province: "Leinster", latitude: 52.3964, longitude: -6.9367, routingKeys: ["Y34"] },
  { slug: "birr", name: "Birr", county: "Offaly", province: "Leinster", latitude: 53.0914, longitude: -7.9133, routingKeys: ["R42"] },
  { slug: "roscrea", name: "Roscrea", county: "Tipperary", province: "Munster", latitude: 52.9511, longitude: -7.8017, routingKeys: ["E53"] },
  { slug: "claremorris", name: "Claremorris", county: "Mayo", province: "Connacht", latitude: 53.7208, longitude: -9.0003, routingKeys: ["F12"] },
  { slug: "tipperary", name: "Tipperary", county: "Tipperary", province: "Munster", latitude: 52.4736, longitude: -8.1558, routingKeys: ["E34"] },
  { slug: "mitchelstown", name: "Mitchelstown", county: "Cork", province: "Munster", latitude: 52.2656, longitude: -8.2683, routingKeys: ["P67"] },
  { slug: "cahir", name: "Cahir", county: "Tipperary", province: "Munster", latitude: 52.375, longitude: -7.9244, routingKeys: ["E21"] },
  { slug: "kinsale", name: "Kinsale", county: "Cork", province: "Munster", latitude: 51.7059, longitude: -8.5222, routingKeys: ["P17"] },
  { slug: "wicklow", name: "Wicklow", county: "Wicklow", province: "Leinster", latitude: 52.9808, longitude: -6.0446, routingKeys: ["A67"] },
  { slug: "kells", name: "Kells", county: "Meath", province: "Leinster", latitude: 53.7264, longitude: -6.8786, routingKeys: ["A82"] },
  { slug: "boyle", name: "Boyle", county: "Roscommon", province: "Connacht", latitude: 53.9733, longitude: -8.3008, routingKeys: ["F52"] },
];

export const IE_PROVINCE_ORDER: IeProvince[] = ["Leinster", "Munster", "Connacht", "Ulster"];

export function getIeCityBySlug(slug: string): IeCity | undefined {
  return IE_CITIES.find((c) => c.slug === slug);
}

export function findIeCityByNameOrSlug(input: string): IeCity | undefined {
  const normalized = input.trim().toLowerCase().replace(/^co\.?\s+/, "");
  const hyphenated = normalized.replace(/\s+/g, "-");
  return IE_CITIES.find((c) => c.slug === normalized || c.slug === hyphenated || c.name.toLowerCase() === normalized);
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
