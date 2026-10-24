// ============================================================================
// Republic of Ireland — the 26 counties, for the /ie/county/[county] hub
// pages. Each county page gathers its towns (lib/ie/cities.ts), their courts
// (lib/ie/content.ts) and these county-level facts:
//
//  - probate: the probate office covering the county, with its address —
//    courts.ie "Probate Offices" (read 23 Oct 2026)
//  - lawCentres: the Legal Aid Board law centres listed under the county on
//    the Legal Aid Board's "Find a law centre" page (read 23 Oct 2026).
//    Roscommon and Leitrim have none listed.
//
// A county page is indexed only when at least one solicitor is listed in one
// of its towns (see app/ie/county/[county]/page.tsx and app/ie/sitemap.ts).
// ============================================================================

import type { IeProvince } from "@/lib/ie/cities";

export interface IeCounty {
  /** URL name: /ie/county/cork */
  slug: string;
  name: string;
  province: IeProvince;
  probate: { name: string; address: string; covers: string };
  lawCentres: string[];
}

const PO = {
  name: "the Probate Office (Principal Registry)",
  address: "1st Floor, Phoenix House, 15/24 Phoenix Street North, Smithfield, Dublin 7, D07 X028",
  covers: "Dublin, Meath, Kildare and Wicklow",
};
const KILKENNY = {
  name: "the Kilkenny District Probate Registry",
  address: "The Courthouse, Parliament Street, Kilkenny, R95 TYF2",
  covers: "Kilkenny, Carlow and Laois",
};
const LIMERICK = { name: "the Limerick District Probate Registry", address: "The Courthouse, Merchants Quay, Limerick", covers: "Limerick and Clare" };
const GALWAY = { name: "the Galway District Probate Registry", address: "The Courthouse, Courthouse Square, Galway", covers: "Galway and Roscommon" };
const SLIGO = { name: "the Sligo District Probate Registry", address: "The Courthouse, Teeling Street, Sligo", covers: "Sligo and Leitrim" };
const DUNDALK = {
  name: "the Dundalk District Probate Registry",
  address: "The Courthouse, Crowe Street, Dundalk, Co. Louth, A91 XHP6",
  covers: "Louth and Monaghan",
};
const CAVAN = { name: "the Cavan District Probate Registry", address: "The Courthouse, Farnham Street, Cavan", covers: "Cavan and Longford" };
const MULLINGAR = {
  name: "the Mullingar District Probate Registry",
  address: "The Courthouse, Mount Street, Mullingar, Co. Westmeath",
  covers: "Offaly and Westmeath",
};

export const IE_COUNTIES: IeCounty[] = [
  // Leinster
  { slug: "carlow", name: "Carlow", province: "Leinster", probate: KILKENNY, lawCentres: [] },
  { slug: "dublin", name: "Dublin", province: "Leinster", probate: PO, lawCentres: [
    "Ballymun Law and Family Mediation Centre", "Law Centre Blanchardstown", "Law Centre Chancery Street", "Law Centre Clondalkin",
    "Law Centre Dolphin House", "Jervis Street Law and Family Mediation Centre", "Law Centre Smithfield", "Tallaght Law and Family Mediation Centre",
  ] },
  { slug: "kildare", name: "Kildare", province: "Leinster", probate: PO, lawCentres: ["Law Centre Newbridge"] },
  { slug: "kilkenny", name: "Kilkenny", province: "Leinster", probate: KILKENNY, lawCentres: ["Kilkenny Law and Family Mediation Centre"] },
  { slug: "laois", name: "Laois", province: "Leinster", probate: KILKENNY, lawCentres: ["Portlaoise Law and Family Mediation Centre"] },
  { slug: "longford", name: "Longford", province: "Leinster", probate: CAVAN, lawCentres: ["Law Centre Longford"] },
  { slug: "louth", name: "Louth", province: "Leinster", probate: DUNDALK, lawCentres: ["Dundalk Law and Family Mediation Centre"] },
  { slug: "meath", name: "Meath", province: "Leinster", probate: PO, lawCentres: ["Law Centre Navan"] },
  { slug: "offaly", name: "Offaly", province: "Leinster", probate: MULLINGAR, lawCentres: ["Law Centre Tullamore"] },
  { slug: "westmeath", name: "Westmeath", province: "Leinster", probate: MULLINGAR, lawCentres: ["Law Centre Athlone"] },
  { slug: "wexford", name: "Wexford", province: "Leinster", probate: { name: "the Wexford District Probate Registry", address: "Wexford Court House, The Court House, Belvedere, Wexford", covers: "Wexford" }, lawCentres: ["Law Centre Wexford"] },
  { slug: "wicklow", name: "Wicklow", province: "Leinster", probate: PO, lawCentres: ["Law Centre Wicklow"] },
  // Munster
  { slug: "clare", name: "Clare", province: "Munster", probate: LIMERICK, lawCentres: ["Ennis Law Centre"] },
  { slug: "cork", name: "Cork", province: "Munster", probate: { name: "the Cork District Probate Registry", address: "The Courthouse, Washington Street, Cork", covers: "Cork" }, lawCentres: ["Law Centre Cork North", "Law Centre Cork South"] },
  { slug: "kerry", name: "Kerry", province: "Munster", probate: { name: "the Tralee District Probate Registry", address: "Centrepoint, John Joe Sheehy Road, Tralee, Co. Kerry", covers: "Kerry" }, lawCentres: ["Law Centre Tralee"] },
  { slug: "limerick", name: "Limerick", province: "Munster", probate: LIMERICK, lawCentres: ["Limerick Law and Family Mediation Centre"] },
  { slug: "tipperary", name: "Tipperary", province: "Munster", probate: { name: "the Clonmel District Probate Registry", address: "The Courthouse, Nelson Street, Clonmel, Co. Tipperary", covers: "Tipperary" }, lawCentres: ["Law Centre Nenagh"] },
  { slug: "waterford", name: "Waterford", province: "Munster", probate: { name: "the Waterford District Probate Registry", address: "The Courthouse, Catherine Street, Waterford", covers: "Waterford" }, lawCentres: ["Law Centre Waterford"] },
  // Connacht
  { slug: "galway", name: "Galway", province: "Connacht", probate: GALWAY, lawCentres: ["Law Centre Galway (Francis Street)", "Galway Law & Family Mediation Centre (Woodquay)"] },
  { slug: "leitrim", name: "Leitrim", province: "Connacht", probate: SLIGO, lawCentres: [] },
  { slug: "mayo", name: "Mayo", province: "Connacht", probate: { name: "the Castlebar District Probate Registry", address: "The Courthouse, The Mall, Castlebar, Co. Mayo", covers: "Mayo" }, lawCentres: ["Castlebar Law and Family Mediation Centre"] },
  { slug: "roscommon", name: "Roscommon", province: "Connacht", probate: GALWAY, lawCentres: [] },
  { slug: "sligo", name: "Sligo", province: "Connacht", probate: SLIGO, lawCentres: ["Sligo Law and Family Mediation Centre"] },
  // Ulster (Republic of Ireland)
  { slug: "cavan", name: "Cavan", province: "Ulster", probate: CAVAN, lawCentres: ["Cavan Law Centre"] },
  { slug: "donegal", name: "Donegal", province: "Ulster", probate: { name: "the Letterkenny District Probate Registry", address: "The Courthouse, Highroad, Letterkenny", covers: "Donegal" }, lawCentres: ["Letterkenny Law and Family Mediation Centre"] },
  { slug: "monaghan", name: "Monaghan", province: "Ulster", probate: DUNDALK, lawCentres: ["Law Centre Monaghan"] },
];

export function getIeCountyBySlug(slug: string): IeCounty | undefined {
  return IE_COUNTIES.find((c) => c.slug === slug);
}

/** The county a town is in (by county name, as used in lib/ie/cities.ts). */
export function getIeCountyByName(name: string): IeCounty | undefined {
  return IE_COUNTIES.find((c) => c.name === name);
}
