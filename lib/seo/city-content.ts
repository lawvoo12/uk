// ============================================================================
// Local, city-specific content for /uk/locations/[city] — so the 50 city
// pages aren't near-duplicates of each other.
//
// COURTS: England & Wales entries come from GOV.UK "Find a court or tribunal"
// (find-court-tribunal.service.gov.uk), searched by city name on 27 Sep 2026.
// Only civil, family, probate and tribunal venues are listed — criminal-only
// courts are left out because this site doesn't cover criminal law. Check
// the links now and then: HMCTS renames and closes venues.
// Scottish and Northern Irish courts are run by separate services and are
// named here without deep links.
// ============================================================================

import type { Regulator } from "@/lib/data/static-lawyers";

export interface LocalCourt {
  name: string;
  /** Path on find-court-tribunal.service.gov.uk, e.g. "/courts/leeds-combined-court-centre" */
  govPath?: string;
  /** What people in this directory would use it for */
  use: string;
}

export const GOV_COURT_FINDER = "https://www.find-court-tribunal.service.gov.uk";

const CIVIL = "Civil claims, including personal injury and property disputes";
const FAMILY = "Divorce, finances and children cases";
const CIVIL_FAMILY = "Civil and family cases";
const EMPLOYMENT = "Employment tribunal claims";
const PROBATE = "Probate applications";
const IMMIGRATION = "Immigration and asylum appeals";
const TRIBUNALS = "Tribunal hearings";

export const CITY_COURTS: Record<string, { courts: LocalCourt[]; note?: string }> = {
  london: {
    courts: [
      { name: "Central Family Court", govPath: "/courts/central-family-court", use: FAMILY },
      { name: "East London Family Court", govPath: "/courts/east-london-family-court", use: FAMILY },
      { name: "Mayor's and City of London Court", govPath: "/courts/mayors-and-city-of-london-court", use: CIVIL },
      { name: "London (South) Employment Tribunal", govPath: "/courts/london-south-employment-tribunal", use: EMPLOYMENT },
      { name: "Taylor House Tribunal Hearing Centre", govPath: "/courts/taylor-house-tribunal-hearing-centre", use: IMMIGRATION },
    ],
  },
  westminster: {
    courts: [
      { name: "Royal Courts of Justice", govPath: "/courts/royal-courts-of-justice", use: "High Court and Court of Appeal cases" },
      { name: "Central London County Court", govPath: "/courts/central-london-county-court", use: CIVIL },
      { name: "Upper Tribunal (Lands Chamber)", govPath: "/courts/upper-tribunal-lands-chamber", use: "Land and property valuation disputes" },
    ],
  },
  birmingham: {
    courts: [
      { name: "Birmingham Civil and Family Justice Centre", govPath: "/courts/birmingham-civil-and-family-justice-centre", use: CIVIL_FAMILY },
      { name: "Midlands (West) Employment Tribunal", govPath: "/courts/midlands-west-employment-tribunal", use: EMPLOYMENT },
      { name: "Birmingham Immigration and Asylum Chamber (First Tier Tribunal)", govPath: "/courts/birmingham-immigration-and-asylum-chamber-first-tier-tribunal", use: IMMIGRATION },
    ],
  },
  manchester: {
    courts: [
      { name: "Manchester Civil Justice Centre (Civil and Family Courts)", govPath: "/courts/manchester-civil-justice-centre-civil-and-family-courts", use: CIVIL_FAMILY },
      { name: "Manchester Employment Tribunal", govPath: "/courts/manchester-employment-tribunal", use: EMPLOYMENT },
      { name: "Manchester Tribunal Hearing Centre", govPath: "/courts/manchester-tribunal-hearing-centre", use: TRIBUNALS },
    ],
  },
  salford: {
    note: "Salford doesn't have its own civil or family court — cases are usually heard in central Manchester.",
    courts: [
      { name: "Manchester Civil Justice Centre (Civil and Family Courts)", govPath: "/courts/manchester-civil-justice-centre-civil-and-family-courts", use: CIVIL_FAMILY },
      { name: "Manchester Employment Tribunal", govPath: "/courts/manchester-employment-tribunal", use: EMPLOYMENT },
    ],
  },
  leeds: {
    courts: [
      { name: "Leeds Combined Court Centre", govPath: "/courts/leeds-combined-court-centre", use: CIVIL },
      { name: "Leeds District Magistrates' Court and Family Court", govPath: "/courts/leeds-district-magistrates-court-and-family-court", use: FAMILY },
      { name: "Leeds Employment Tribunal", govPath: "/courts/leeds-employment-tribunal", use: EMPLOYMENT },
      { name: "Leeds District Probate Registry", govPath: "/courts/leeds-district-probate-registry", use: PROBATE },
    ],
  },
  sheffield: {
    courts: [
      { name: "Sheffield Combined Court Centre", govPath: "/courts/sheffield-combined-court-centre", use: CIVIL },
      { name: "Sheffield Designated Family Court", govPath: "/courts/sheffield-designated-family-court", use: FAMILY },
    ],
  },
  bradford: {
    courts: [
      { name: "Bradford Combined Court Centre", govPath: "/courts/bradford-combined-court-centre", use: CIVIL },
      { name: "Bradford and Keighley Magistrates' Court and Family Court", govPath: "/courts/bradford-and-keighley-magistrates-court-and-family-court", use: FAMILY },
      { name: "Bradford Tribunal Hearing Centre", govPath: "/courts/bradford-tribunal-hearing-centre", use: TRIBUNALS },
    ],
  },
  liverpool: {
    courts: [
      { name: "Liverpool Civil and Family Court", govPath: "/courts/liverpool-civil-and-family-court", use: CIVIL_FAMILY },
      { name: "Liverpool District Probate Registry", govPath: "/courts/liverpool-district-probate-registry", use: PROBATE },
    ],
  },
  bristol: {
    courts: [
      { name: "Bristol Civil and Family Justice Centre", govPath: "/courts/bristol-civil-and-family-justice-centre", use: CIVIL_FAMILY },
      { name: "Bristol Magistrates' Court and Tribunals Hearing Centre", govPath: "/courts/bristol-magistrates-court-and-tribunals-hearing-centre", use: TRIBUNALS },
    ],
  },
  cardiff: {
    courts: [
      { name: "Cardiff Civil and Family Justice Centre", govPath: "/courts/cardiff-civil-and-family-justice-centre", use: CIVIL_FAMILY },
      { name: "Wales Employment Tribunal", govPath: "/courts/wales-employment-tribunal", use: EMPLOYMENT },
      { name: "Cardiff Probate Registry of Wales", govPath: "/courts/cardiff-probate-registry-of-wales", use: PROBATE },
    ],
  },
  leicester: {
    courts: [
      { name: "Leicester County Court and Family Court", govPath: "/courts/leicester-county-court-and-family-court", use: CIVIL_FAMILY },
      { name: "Leicester Tribunal Hearing Centre", govPath: "/courts/leicester-tribunal-hearing-centre", use: TRIBUNALS },
    ],
  },
  wakefield: {
    courts: [
      { name: "Wakefield Civil and Family Justice Centre", govPath: "/courts/wakefield-civil-and-family-justice-centre", use: CIVIL_FAMILY },
    ],
  },
  coventry: {
    courts: [{ name: "Coventry Combined Court Centre", govPath: "/courts/coventry-combined-court-centre", use: CIVIL_FAMILY }],
  },
  nottingham: {
    courts: [
      { name: "Nottingham County Court and Family Court", govPath: "/courts/nottingham-county-court-and-family-court", use: CIVIL_FAMILY },
      { name: "Midlands (East) Employment Tribunal", govPath: "/courts/midlands-eastemployment-tribunal", use: EMPLOYMENT },
    ],
  },
  "newcastle-upon-tyne": {
    courts: [
      { name: "Newcastle Civil & Family Courts and Tribunals Centre", govPath: "/courts/newcastle-civil-family-courts-and-tribunals-centre", use: CIVIL_FAMILY },
      { name: "Newcastle District Probate Registry", govPath: "/courts/newcastle-district-probate-registry", use: PROBATE },
    ],
  },
  sunderland: {
    courts: [
      { name: "Sunderland County, Family, Magistrates' and Tribunal Hearings", govPath: "/courts/sunderland-county-family-magistrates-and-tribunal-hearings", use: CIVIL_FAMILY },
    ],
  },
  "brighton-and-hove": {
    courts: [
      { name: "Brighton County Court", govPath: "/courts/brighton-county-court", use: CIVIL },
      { name: "Brighton Tribunal Hearing Centre", govPath: "/courts/brighton-tribunal-hearing-centre", use: TRIBUNALS },
      { name: "Brighton District Probate Registry", govPath: "/courts/brighton-district-probate-registry", use: PROBATE },
    ],
  },
  hull: {
    courts: [
      { name: "Kingston-upon-Hull Combined Court Centre", govPath: "/courts/kingston-upon-hull-combined-court-centre", use: CIVIL_FAMILY },
      { name: "Hull and Holderness Magistrates' Court and Hearing Centre", govPath: "/courts/hull-and-holderness-magistrates-court-and-hearing-centre", use: TRIBUNALS },
    ],
  },
  plymouth: {
    courts: [{ name: "Plymouth Combined Court", govPath: "/courts/plymouth-combined-court", use: CIVIL_FAMILY }],
  },
  "stoke-on-trent": {
    courts: [
      { name: "Stoke-on-Trent Combined Court", govPath: "/courts/stoke-on-trent-combined-court", use: CIVIL_FAMILY },
      { name: "North Staffordshire Justice Centre", govPath: "/courts/north-staffordshire-justice-centre", use: TRIBUNALS },
    ],
  },
  wolverhampton: {
    courts: [{ name: "Wolverhampton Combined Court Centre", govPath: "/courts/wolverhampton-combined-court-centre", use: CIVIL_FAMILY }],
  },
  derby: {
    courts: [{ name: "Derby Combined Court Centre", govPath: "/courts/derby-combined-court-centre", use: CIVIL_FAMILY }],
  },
  swansea: {
    courts: [{ name: "Swansea Civil Justice Centre", govPath: "/courts/swansea-civil-justice-centre", use: CIVIL_FAMILY }],
  },
  southampton: {
    courts: [{ name: "Southampton Combined Court Centre", govPath: "/courts/southampton-combined-court-centre", use: CIVIL_FAMILY }],
  },
  portsmouth: {
    courts: [{ name: "Portsmouth Combined Court Centre", govPath: "/courts/portsmouth-combined-court-centre", use: CIVIL_FAMILY }],
  },
  york: {
    courts: [
      { name: "York County Court and Family Court", govPath: "/courts/york-county-court-and-family-court", use: CIVIL_FAMILY },
    ],
  },
  peterborough: {
    courts: [{ name: "Peterborough Combined Court Centre", govPath: "/courts/peterborough-combined-court-centre", use: CIVIL_FAMILY }],
  },
  lancaster: {
    courts: [
      { name: "Lancaster Courthouse", govPath: "/courts/lancaster-courthouse", use: CIVIL_FAMILY },
      { name: "Preston Crown Court and Family Court (Sessions House)", govPath: "/courts/preston-crown-court-and-family-court-sessions-house", use: FAMILY },
    ],
  },
  oxford: {
    courts: [
      { name: "Oxford Combined Court Centre", govPath: "/courts/oxford-combined-court-centre", use: CIVIL_FAMILY },
      { name: "Oxford District Probate Registry", govPath: "/courts/oxford-district-probate-registry", use: PROBATE },
    ],
  },
  newport: {
    courts: [
      { name: "Newport (South Wales) County Court and Family Court", govPath: "/courts/newport-south-wales-county-court-and-family-court", use: CIVIL_FAMILY },
      { name: "Newport (South Wales) Immigration and Asylum Tribunal", govPath: "/courts/newport-south-wales-immigration-and-asylum-tribunal", use: IMMIGRATION },
    ],
  },
  preston: {
    courts: [
      { name: "Preston Combined Court Centre", govPath: "/courts/preston-combined-court-centre", use: CIVIL },
      { name: "Preston Crown Court and Family Court (Sessions House)", govPath: "/courts/preston-crown-court-and-family-court-sessions-house", use: FAMILY },
    ],
  },
  "st-albans": {
    note: "St Albans' own courts deal with criminal cases. Civil and family matters are heard at other Hertfordshire courts — search the GOV.UK court finder by postcode.",
    courts: [],
  },
  norwich: {
    courts: [
      { name: "Norwich Combined Court Centre", govPath: "/courts/norwich-combined-court-centre", use: CIVIL },
      { name: "Norwich Magistrates' Court and Family Court", govPath: "/courts/norwich-magistrates-court-and-family-court", use: FAMILY },
    ],
  },
  chester: {
    courts: [{ name: "Chester Civil and Family Justice Centre", govPath: "/courts/chester-civil-and-family-justice-centre", use: CIVIL_FAMILY }],
  },
  cambridge: {
    courts: [{ name: "Cambridge County Court and Family Court", govPath: "/courts/cambridge-county-court-and-family-court", use: CIVIL_FAMILY }],
  },
  salisbury: {
    courts: [{ name: "Salisbury Law Courts", govPath: "/courts/salisbury-law-courts", use: CIVIL_FAMILY }],
  },
  exeter: {
    courts: [{ name: "Exeter Law Courts", govPath: "/courts/exeter-law-courts", use: CIVIL_FAMILY }],
  },
  gloucester: {
    courts: [
      { name: "Gloucester and Cheltenham County and Family Court", govPath: "/courts/gloucester-and-cheltenham-county-and-family-court", use: CIVIL_FAMILY },
    ],
  },
  chichester: {
    note: "Chichester's court deals with criminal cases. Civil and family matters are heard at other Sussex courts — search the GOV.UK court finder by postcode.",
    courts: [],
  },
  winchester: {
    courts: [
      { name: "Winchester Combined Court Centre", govPath: "/courts/winchester-combined-court-centre", use: CIVIL_FAMILY },
      { name: "Winchester District Probate Registry", govPath: "/courts/winchester-district-probate-registry", use: PROBATE },
    ],
  },
  carlisle: {
    courts: [{ name: "Carlisle Combined Court", govPath: "/courts/carlisle-combined-court", use: CIVIL_FAMILY }],
  },
  worcester: {
    courts: [{ name: "Worcester Combined Court", govPath: "/courts/worcester-combined-court", use: CIVIL_FAMILY }],
  },
  // Scotland — Scottish Courts and Tribunals Service (scotcourts.gov.uk)
  glasgow: { courts: [{ name: "Glasgow Sheriff Court", use: "Most civil, family and executry cases" }] },
  edinburgh: {
    courts: [
      { name: "Edinburgh Sheriff Court", use: "Most civil, family and executry cases" },
      { name: "Court of Session", use: "Scotland's supreme civil court, for higher-value and complex cases" },
    ],
  },
  aberdeen: { courts: [{ name: "Aberdeen Sheriff Court", use: "Most civil, family and executry cases" }] },
  dundee: { courts: [{ name: "Dundee Sheriff Court", use: "Most civil, family and executry cases" }] },
  // Northern Ireland — NI Courts and Tribunals Service
  belfast: { courts: [{ name: "Laganside Courts", use: "County court, family and other civil cases" }] },
  londonderry: { courts: [{ name: "Londonderry Courthouse, Bishop Street", use: "County court and family cases" }] },
  lisburn: {
    note: "Lisburn residents' civil and family cases are usually heard in Belfast.",
    courts: [{ name: "Laganside Courts, Belfast", use: "County court, family and other civil cases" }],
  },
};

export const COURT_SERVICE: Record<Regulator, { name: string; url: string }> = {
  SRA: { name: "GOV.UK Find a court or tribunal", url: `${GOV_COURT_FINDER}/` },
  LSS: { name: "Scottish Courts and Tribunals Service", url: "https://www.scotcourts.gov.uk/" },
  LSNI: { name: "nidirect — courts and tribunals", url: "https://www.nidirect.gov.uk/" },
  LSI: { name: "Courts Service of Ireland", url: "https://www.courts.ie/offices" },
};

/** Plain-language note on the legal system a city falls under. */
export const JURISDICTION_NOTE: Record<Regulator, { title: string; body: string }> = {
  SRA: {
    title: "England & Wales law",
    body: "Solicitors here are regulated by the Solicitors Regulation Authority (SRA). You can check any firm's SRA number on the SRA's public register before you instruct them.",
  },
  LSS: {
    title: "Scots law",
    body: "Scotland has its own legal system. Solicitors are regulated by the Law Society of Scotland, and some things work differently from England: probate is called 'confirmation', house purchases go through 'missives' with a seller's Home Report, and divorce is possible after one year's separation with consent (two years without).",
  },
  LSNI: {
    title: "Northern Ireland law",
    body: "Northern Ireland has its own legal system and courts. Solicitors are regulated by the Law Society of Northern Ireland. Some rules differ from England and Wales — for example, the online no-fault divorce process used in England and Wales doesn't apply here.",
  },
  // Used by the /ie pages (lib/ie/content.ts has the fuller Irish text).
  LSI: {
    title: "Irish law",
    body: "The Republic of Ireland has its own legal system. Solicitors are on the Roll kept by the Law Society of Ireland, and complaints about them go to the Legal Services Regulatory Authority (LSRA).",
  },
};
