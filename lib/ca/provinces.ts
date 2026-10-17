// ============================================================================
// Canada (/ca) — provinces and their law societies.
//
// A province is "live" once its lawyers have been checked on the law
// society's public directory and its law content (lib/ca/content.ts) is
// written. Only live provinces have pages. Quebec is not covered.
//
// The law societies themselves are defined in lib/ca/regulators.ts.
// Saskatchewan's code is LSSK — "LSS" already means the Law Society of
// Scotland in the UK data.
// ============================================================================

import { CA_REGULATORS, type CaRegulator } from "@/lib/ca/regulators";

export type CaProvinceCode = "ON" | "BC" | "AB" | "SK" | "MB" | "NS" | "NB" | "NL" | "PE";

export interface CaProvince {
  code: CaProvinceCode;
  name: string;
  /** Used in lawyer ids: toronto-on-…, vancouver-bc-… */
  idSuffix: string;
  regulator: CaRegulator;
  regulatorName: string;
  /** The law society's public lawyer directory — every listing's registerUrl. */
  directoryUrl: string;
  directoryLabel: string;
}

export const CA_PROVINCE_ORDER: CaProvinceCode[] = ["ON", "BC", "AB", "SK", "MB", "NS", "NB", "NL", "PE"];

export const CA_PROVINCE_NAMES: Record<CaProvinceCode, string> = {
  ON: "Ontario",
  BC: "British Columbia",
  AB: "Alberta",
  SK: "Saskatchewan",
  MB: "Manitoba",
  NS: "Nova Scotia",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  PE: "Prince Edward Island",
};

/** Provinces that are live. Added batch by batch. */
export const CA_PROVINCES: Partial<Record<CaProvinceCode, CaProvince>> = {
  ON: {
    code: "ON",
    name: "Ontario",
    idSuffix: "on",
    regulator: "LSO",
    regulatorName: CA_REGULATORS.LSO.name,
    directoryUrl: CA_REGULATORS.LSO.directoryUrl,
    directoryLabel: CA_REGULATORS.LSO.directoryLabel,
  },
  BC: {
    code: "BC",
    name: "British Columbia",
    idSuffix: "bc",
    regulator: "LSBC",
    regulatorName: CA_REGULATORS.LSBC.name,
    directoryUrl: CA_REGULATORS.LSBC.directoryUrl,
    directoryLabel: CA_REGULATORS.LSBC.directoryLabel,
  },
  AB: {
    code: "AB",
    name: "Alberta",
    idSuffix: "ab",
    regulator: "LSA",
    regulatorName: CA_REGULATORS.LSA.name,
    directoryUrl: CA_REGULATORS.LSA.directoryUrl,
    directoryLabel: CA_REGULATORS.LSA.directoryLabel,
  },
  SK: {
    code: "SK",
    name: "Saskatchewan",
    idSuffix: "sk",
    regulator: "LSSK",
    regulatorName: CA_REGULATORS.LSSK.name,
    directoryUrl: CA_REGULATORS.LSSK.directoryUrl,
    directoryLabel: CA_REGULATORS.LSSK.directoryLabel,
  },
  MB: {
    code: "MB",
    name: "Manitoba",
    idSuffix: "mb",
    regulator: "LSM",
    regulatorName: CA_REGULATORS.LSM.name,
    directoryUrl: CA_REGULATORS.LSM.directoryUrl,
    directoryLabel: CA_REGULATORS.LSM.directoryLabel,
  },
  NS: {
    code: "NS",
    name: "Nova Scotia",
    idSuffix: "ns",
    regulator: "NSBS",
    regulatorName: CA_REGULATORS.NSBS.name,
    directoryUrl: CA_REGULATORS.NSBS.directoryUrl,
    directoryLabel: CA_REGULATORS.NSBS.directoryLabel,
  },
  NB: {
    code: "NB",
    name: "New Brunswick",
    idSuffix: "nb",
    regulator: "LSNB",
    regulatorName: CA_REGULATORS.LSNB.name,
    directoryUrl: CA_REGULATORS.LSNB.directoryUrl,
    directoryLabel: CA_REGULATORS.LSNB.directoryLabel,
  },
  NL: {
    code: "NL",
    name: "Newfoundland and Labrador",
    idSuffix: "nl",
    regulator: "LSNL",
    regulatorName: CA_REGULATORS.LSNL.name,
    directoryUrl: CA_REGULATORS.LSNL.directoryUrl,
    directoryLabel: CA_REGULATORS.LSNL.directoryLabel,
  },
  PE: {
    code: "PE",
    name: "Prince Edward Island",
    idSuffix: "pe",
    regulator: "LSPEI",
    regulatorName: CA_REGULATORS.LSPEI.name,
    directoryUrl: CA_REGULATORS.LSPEI.directoryUrl,
    directoryLabel: CA_REGULATORS.LSPEI.directoryLabel,
  },
};

export function getCaProvince(code: CaProvinceCode): CaProvince {
  const province = CA_PROVINCES[code];
  if (!province) throw new Error(`Province ${code} is not live yet — add it to CA_PROVINCES in lib/ca/provinces.ts`);
  return province;
}
