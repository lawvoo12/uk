// ============================================================================
// Static city list — single source of truth for the top 50 UK cities this
// platform covers. Used by:
//   - generateStaticParams() for /uk/solicitors/[category]/[city]
//   - lib/actions/search.ts (homepage search resolution)
//   - prisma/seed.ts (seeds these into the real UKCity/UKPostcode tables)
//
// latitude/longitude are the city centre — good enough for a city-level
// radius search; a lawyer's real office postcode (added post-signup)
// supersedes this once they provide one. outwardCode is a representative
// postcode prefix, used only to seed one placeholder UKPostcode per city.
// ============================================================================

export interface UKCitySeed {
  slug: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  outwardCode: string;
}

export const TOP_UK_CITIES: UKCitySeed[] = [
  { slug: "london", name: "London", region: "Greater London", latitude: 51.5074, longitude: -0.1278, outwardCode: "SW1A" },
  { slug: "birmingham", name: "Birmingham", region: "West Midlands", latitude: 52.4862, longitude: -1.8904, outwardCode: "B1" },
  { slug: "manchester", name: "Manchester", region: "North West England", latitude: 53.4808, longitude: -2.2426, outwardCode: "M1" },
  { slug: "leeds", name: "Leeds", region: "Yorkshire and the Humber", latitude: 53.8008, longitude: -1.5491, outwardCode: "LS1" },
  { slug: "glasgow", name: "Glasgow", region: "Scotland", latitude: 55.8642, longitude: -4.2518, outwardCode: "G1" },
  { slug: "sheffield", name: "Sheffield", region: "Yorkshire and the Humber", latitude: 53.3811, longitude: -1.4701, outwardCode: "S1" },
  { slug: "bradford", name: "Bradford", region: "Yorkshire and the Humber", latitude: 53.7960, longitude: -1.7594, outwardCode: "BD1" },
  { slug: "edinburgh", name: "Edinburgh", region: "Scotland", latitude: 55.9533, longitude: -3.1883, outwardCode: "EH1" },
  { slug: "liverpool", name: "Liverpool", region: "North West England", latitude: 53.4084, longitude: -2.9916, outwardCode: "L1" },
  { slug: "bristol", name: "Bristol", region: "South West England", latitude: 51.4545, longitude: -2.5879, outwardCode: "BS1" },
  { slug: "cardiff", name: "Cardiff", region: "Wales", latitude: 51.4816, longitude: -3.1791, outwardCode: "CF10" },
  { slug: "belfast", name: "Belfast", region: "Northern Ireland", latitude: 54.5973, longitude: -5.9301, outwardCode: "BT1" },
  { slug: "leicester", name: "Leicester", region: "East Midlands", latitude: 52.6369, longitude: -1.1398, outwardCode: "LE1" },
  { slug: "wakefield", name: "Wakefield", region: "Yorkshire and the Humber", latitude: 53.6833, longitude: -1.4977, outwardCode: "WF1" },
  { slug: "coventry", name: "Coventry", region: "West Midlands", latitude: 52.4068, longitude: -1.5197, outwardCode: "CV1" },
  { slug: "nottingham", name: "Nottingham", region: "East Midlands", latitude: 52.9548, longitude: -1.1581, outwardCode: "NG1" },
  { slug: "newcastle-upon-tyne", name: "Newcastle upon Tyne", region: "North East England", latitude: 54.9783, longitude: -1.6178, outwardCode: "NE1" },
  { slug: "sunderland", name: "Sunderland", region: "North East England", latitude: 54.9069, longitude: -1.3838, outwardCode: "SR1" },
  { slug: "brighton-and-hove", name: "Brighton and Hove", region: "South East England", latitude: 50.8225, longitude: -0.1372, outwardCode: "BN1" },
  { slug: "hull", name: "Hull", region: "Yorkshire and the Humber", latitude: 53.7676, longitude: -0.3274, outwardCode: "HU1" },
  { slug: "plymouth", name: "Plymouth", region: "South West England", latitude: 50.3755, longitude: -4.1427, outwardCode: "PL1" },
  { slug: "stoke-on-trent", name: "Stoke-on-Trent", region: "West Midlands", latitude: 53.0027, longitude: -2.1794, outwardCode: "ST1" },
  { slug: "wolverhampton", name: "Wolverhampton", region: "West Midlands", latitude: 52.5862, longitude: -2.1288, outwardCode: "WV1" },
  { slug: "derby", name: "Derby", region: "East Midlands", latitude: 52.9225, longitude: -1.4746, outwardCode: "DE1" },
  { slug: "swansea", name: "Swansea", region: "Wales", latitude: 51.6214, longitude: -3.9436, outwardCode: "SA1" },
  { slug: "southampton", name: "Southampton", region: "South East England", latitude: 50.9097, longitude: -1.4044, outwardCode: "SO14" },
  { slug: "salford", name: "Salford", region: "North West England", latitude: 53.4875, longitude: -2.2901, outwardCode: "M5" },
  { slug: "aberdeen", name: "Aberdeen", region: "Scotland", latitude: 57.1497, longitude: -2.0943, outwardCode: "AB10" },
  { slug: "westminster", name: "Westminster", region: "Greater London", latitude: 51.4975, longitude: -0.1357, outwardCode: "SW1H" },
  { slug: "portsmouth", name: "Portsmouth", region: "South East England", latitude: 50.8198, longitude: -1.0880, outwardCode: "PO1" },
  { slug: "york", name: "York", region: "Yorkshire and the Humber", latitude: 53.9600, longitude: -1.0873, outwardCode: "YO1" },
  { slug: "peterborough", name: "Peterborough", region: "East of England", latitude: 52.5695, longitude: -0.2405, outwardCode: "PE1" },
  { slug: "dundee", name: "Dundee", region: "Scotland", latitude: 56.4620, longitude: -2.9707, outwardCode: "DD1" },
  { slug: "lancaster", name: "Lancaster", region: "North West England", latitude: 54.0466, longitude: -2.8007, outwardCode: "LA1" },
  { slug: "oxford", name: "Oxford", region: "South East England", latitude: 51.7520, longitude: -1.2577, outwardCode: "OX1" },
  { slug: "newport", name: "Newport", region: "Wales", latitude: 51.5842, longitude: -2.9977, outwardCode: "NP10" },
  { slug: "preston", name: "Preston", region: "North West England", latitude: 53.7632, longitude: -2.7031, outwardCode: "PR1" },
  { slug: "st-albans", name: "St Albans", region: "East of England", latitude: 51.7520, longitude: -0.3360, outwardCode: "AL1" },
  { slug: "norwich", name: "Norwich", region: "East of England", latitude: 52.6309, longitude: 1.2974, outwardCode: "NR1" },
  { slug: "chester", name: "Chester", region: "North West England", latitude: 53.1934, longitude: -2.8931, outwardCode: "CH1" },
  { slug: "cambridge", name: "Cambridge", region: "East of England", latitude: 52.2053, longitude: 0.1218, outwardCode: "CB1" },
  { slug: "salisbury", name: "Salisbury", region: "South West England", latitude: 51.0688, longitude: -1.7944, outwardCode: "SP1" },
  { slug: "exeter", name: "Exeter", region: "South West England", latitude: 50.7184, longitude: -3.5339, outwardCode: "EX1" },
  { slug: "gloucester", name: "Gloucester", region: "South West England", latitude: 51.8642, longitude: -2.2380, outwardCode: "GL1" },
  { slug: "lisburn", name: "Lisburn", region: "Northern Ireland", latitude: 54.5162, longitude: -6.0581, outwardCode: "BT28" },
  { slug: "chichester", name: "Chichester", region: "South East England", latitude: 50.8365, longitude: -0.7792, outwardCode: "PO19" },
  { slug: "winchester", name: "Winchester", region: "South East England", latitude: 51.0632, longitude: -1.3080, outwardCode: "SO23" },
  { slug: "londonderry", name: "Londonderry", region: "Northern Ireland", latitude: 54.9966, longitude: -7.3086, outwardCode: "BT48" },
  { slug: "carlisle", name: "Carlisle", region: "North West England", latitude: 54.8925, longitude: -2.9329, outwardCode: "CA1" },
  { slug: "worcester", name: "Worcester", region: "West Midlands", latitude: 52.1920, longitude: -2.2210, outwardCode: "WR1" },
];

export function getCityBySlug(slug: string): UKCitySeed | undefined {
  return TOP_UK_CITIES.find((c) => c.slug === slug);
}

export function findCityByNameOrSlug(input: string): UKCitySeed | undefined {
  const normalized = input.trim().toLowerCase();
  return TOP_UK_CITIES.find((c) => c.slug === normalized || c.name.toLowerCase() === normalized);
}
