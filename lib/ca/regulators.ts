// ============================================================================
// Canada (/ca) — the provincial law societies, defined once. The shared
// regulator lists (REGULATOR_LABEL, REGULATORS, COURT_SERVICE,
// JURISDICTION_NOTE) pick these up automatically, so adding a province means
// adding ONE entry here plus its entry in lib/ca/provinces.ts.
//
// Codes must not clash with the UK/Ireland ones (SRA, LSS, LSNI, LSI).
// Saskatchewan must be "LSSK" — "LSS" is the Law Society of Scotland.
//
// This file must not import from lib/data/static-lawyers.ts (that file
// imports this one).
// ============================================================================

export interface CaRegulatorInfo {
  /** Badge on listing cards. */
  label: string;
  name: string;
  /** The public lawyer directory — every listing's registerUrl. */
  directoryUrl: string;
  directoryLabel: string;
  courtService: { name: string; url: string };
  jurisdiction: { title: string; body: string };
}

export const CA_REGULATORS = {
  LSO: {
    label: "Law Society of Ontario",
    name: "Law Society of Ontario",
    directoryUrl: "https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/lawyer-and-paralegal-directory",
    directoryLabel: "Law Society of Ontario's Lawyer and Paralegal Directory",
    courtService: { name: "Ontario court locations", url: "https://www.ontario.ca/locations/courts" },
    jurisdiction: {
      title: "Ontario law",
      body: "Lawyers and paralegals in Ontario are licensed by the Law Society of Ontario. You can check anyone in its public Lawyer and Paralegal Directory before you hire them.",
    },
  },
  LSBC: {
    label: "Law Society of BC",
    name: "Law Society of British Columbia",
    directoryUrl: "https://www.lawsociety.bc.ca/lsbc/apps/lkup/directory/mbr-search.cfm",
    directoryLabel: "Law Society of British Columbia's Lawyer Directory",
    courtService: {
      name: "BC courthouse locations",
      url: "https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-locations",
    },
    jurisdiction: {
      title: "British Columbia law",
      body: "Lawyers in British Columbia are regulated by the Law Society of British Columbia. You can check anyone in its public Lawyer Directory before you hire them.",
    },
  },
  LSA: {
    label: "Law Society of Alberta",
    name: "Law Society of Alberta",
    directoryUrl: "https://lsa.memberpro.net/main/body.cfm",
    directoryLabel: "Law Society of Alberta's Lawyer Directory",
    courtService: { name: "Alberta court locations", url: "https://www.alberta.ca/alberta-court-locations" },
    jurisdiction: {
      title: "Alberta law",
      body: "Lawyers in Alberta are regulated by the Law Society of Alberta. You can check anyone in its public Lawyer Directory before you hire them.",
    },
  },
  // "LSSK", not "LSS": LSS is the Law Society of Scotland in the UK data.
  LSSK: {
    label: "Law Society of Saskatchewan",
    name: "Law Society of Saskatchewan",
    directoryUrl: "https://lss.alinityapp.com/client/publicdirectory",
    directoryLabel: "Law Society of Saskatchewan's public directory",
    courtService: { name: "Saskatchewan court locations", url: "https://sasklawcourts.ca/court-locations/" },
    jurisdiction: {
      title: "Saskatchewan law",
      body: "Lawyers in Saskatchewan are regulated by the Law Society of Saskatchewan. You can check anyone in its public directory before you hire them.",
    },
  },
  LSM: {
    label: "Law Society of Manitoba",
    name: "Law Society of Manitoba",
    directoryUrl: "https://lawsociety.mb.ca/for-the-public/lawyer-lookup/",
    directoryLabel: "Law Society of Manitoba's Lawyer Lookup",
    courtService: { name: "Manitoba Courts", url: "https://www.manitobacourts.mb.ca/" },
    jurisdiction: {
      title: "Manitoba law",
      body: "Lawyers in Manitoba are regulated by the Law Society of Manitoba. You can check anyone in its public Lawyer Lookup before you hire them.",
    },
  },
  NSBS: {
    label: "Nova Scotia Barristers' Society",
    name: "Nova Scotia Barristers' Society",
    directoryUrl: "https://members.nsbs.org/NSBSMember/NSBSWEB/Lawyer_Search/Search_Page.aspx",
    directoryLabel: "Nova Scotia Barristers' Society's lawyer search",
    courtService: { name: "Nova Scotia court locations", url: "https://www.courts.ns.ca/locations" },
    jurisdiction: {
      title: "Nova Scotia law",
      body: "Lawyers in Nova Scotia are regulated by the Nova Scotia Barristers' Society. You can check anyone in its public lawyer search before you hire them.",
    },
  },
  LSNB: {
    label: "Law Society of New Brunswick",
    name: "Law Society of New Brunswick",
    directoryUrl: "https://lsbnb.alinityapp.com/client/publicdirectory",
    directoryLabel: "Law Society of New Brunswick's Lawyer Search",
    courtService: {
      name: "New Brunswick court locations",
      url: "https://www.courtsnb-coursnb.ca/content/cour/en/kings-bench/content/qblocations.html",
    },
    jurisdiction: {
      title: "New Brunswick law",
      body: "Lawyers in New Brunswick are regulated by the Law Society of New Brunswick. You can check anyone in its public Lawyer Search before you hire them.",
    },
  },
  LSNL: {
    label: "Law Society of NL",
    name: "Law Society of Newfoundland and Labrador",
    directoryUrl: "https://lsnl.memberpro.net/main/body.cfm",
    directoryLabel: "Law Society of Newfoundland and Labrador's Lawyer Directory",
    courtService: { name: "Newfoundland and Labrador court locations", url: "https://www.court.nl.ca/supreme/locations-contact-info/" },
    jurisdiction: {
      title: "Newfoundland and Labrador law",
      body: "Lawyers in Newfoundland and Labrador are regulated by the Law Society of Newfoundland and Labrador. You can check anyone in its public Lawyer Directory before you hire them.",
    },
  },
  LSPEI: {
    label: "Law Society of PEI",
    name: "Law Society of Prince Edward Island",
    directoryUrl: "https://lawsocietypei.ca/find-a-lawyer",
    directoryLabel: "Law Society of Prince Edward Island's lawyer directory",
    courtService: { name: "Prince Edward Island court locations", url: "https://www.courts.pe.ca/contact-us" },
    jurisdiction: {
      title: "Prince Edward Island law",
      body: "Lawyers in Prince Edward Island are regulated by the Law Society of Prince Edward Island. You can check anyone in its public lawyer directory before you hire them.",
    },
  },
} satisfies Record<string, CaRegulatorInfo>;

export type CaRegulator = keyof typeof CA_REGULATORS;

function mapRegulators<T>(pick: (info: CaRegulatorInfo) => T): Record<CaRegulator, T> {
  return Object.fromEntries(Object.entries(CA_REGULATORS).map(([code, info]) => [code, pick(info)])) as Record<CaRegulator, T>;
}

export const CA_REGULATOR_LABELS = mapRegulators((r) => r.label);
export const CA_REGULATOR_DETAILS = mapRegulators((r) => ({
  name: r.name,
  shortName: r.name,
  registerUrl: r.directoryUrl,
  registerLabel: r.directoryLabel,
}));
export const CA_COURT_SERVICES = mapRegulators((r) => r.courtService);
export const CA_JURISDICTION_NOTES = mapRegulators((r) => r.jurisdiction);
