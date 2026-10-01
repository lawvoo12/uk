import type { Regulator } from "@/lib/data/static-lawyers";

// Solicitors in England & Wales are regulated by the SRA; Scotland and
// Northern Ireland have their own regulators. Copy on a page should name the
// right one rather than claiming "SRA-regulated" everywhere.
export const REGULATORS: Record<Regulator, { name: string; shortName: string; registerUrl: string; registerLabel: string }> = {
  SRA: {
    name: "Solicitors Regulation Authority",
    shortName: "SRA",
    registerUrl: "https://www.sra.org.uk/consumers/register/",
    registerLabel: "SRA's public register",
  },
  LSS: {
    name: "Law Society of Scotland",
    shortName: "Law Society of Scotland",
    registerUrl: "https://www.lawscot.org.uk/find-a-solicitor/",
    registerLabel: "Law Society of Scotland's Find a Solicitor",
  },
  LSNI: {
    name: "Law Society of Northern Ireland",
    shortName: "Law Society of NI",
    registerUrl: "https://lawsoc-ni.org/using-a-solicitor",
    registerLabel: "Law Society of Northern Ireland's solicitor directory",
  },
  LSI: {
    name: "Law Society of Ireland",
    shortName: "Law Society of Ireland",
    registerUrl: "https://www.lawsociety.ie/find-a-solicitor/Solicitor-Firm-Search/",
    registerLabel: "Law Society of Ireland's Find a Solicitor register",
  },
};

export function regulatorForRegion(region: string): Regulator {
  if (region === "Scotland") return "LSS";
  if (region === "Northern Ireland") return "LSNI";
  return "SRA";
}

/** "SRA-regulated" / "Law Society of Scotland-regulated" etc., for page copy. */
export function regulatedPhrase(region: string): string {
  const reg = regulatorForRegion(region);
  return reg === "SRA" ? "SRA-regulated" : `${REGULATORS[reg].shortName}-regulated`;
}
