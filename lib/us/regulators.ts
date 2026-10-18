// ============================================================================
// United States (/us) — the state bars, defined once. The shared regulator
// lists (REGULATOR_LABEL, REGULATORS, COURT_SERVICE, JURISDICTION_NOTE) pick
// these up automatically, so adding a state means adding ONE entry here plus
// its entry in lib/us/states.ts.
//
// Codes must not clash with the UK, Ireland or Canada ones (SRA, LSS, LSNI,
// LSI, LSO, LSBC, LSA, LSSK, LSM, NSBS, LSNB, LSNL, LSPEI).
//
// This file must not import from lib/data/static-lawyers.ts (that file
// imports this one).
//
// Alabama links read on alabar.org and judicial.alabama.gov, 17 Oct 2026.
// ============================================================================

export interface UsRegulatorInfo {
  /** Badge on listing cards. */
  label: string;
  name: string;
  /** The public lawyer directory — every listing's registerUrl. */
  directoryUrl: string;
  directoryLabel: string;
  courtService: { name: string; url: string };
  jurisdiction: { title: string; body: string };
}

export const US_REGULATORS = {
  ASB: {
    label: "Alabama State Bar",
    name: "Alabama State Bar",
    directoryUrl: "https://members.alabar.org/Member_Portal/Member_Portal/Member-Search.aspx",
    directoryLabel: "Alabama State Bar's Find a Member search",
    courtService: { name: "Alabama Judicial System", url: "https://judicial.alabama.gov/" },
    jurisdiction: {
      title: "Alabama law",
      body: "Lawyers in Alabama are licensed through the Alabama State Bar. You can check anyone in its public Find a Member search before you hire them, and the Bar publishes disciplinary history.",
    },
  },
} satisfies Record<string, UsRegulatorInfo>;

export type UsRegulator = keyof typeof US_REGULATORS;

function mapRegulators<T>(pick: (info: UsRegulatorInfo) => T): Record<UsRegulator, T> {
  return Object.fromEntries(Object.entries(US_REGULATORS).map(([code, info]) => [code, pick(info)])) as Record<UsRegulator, T>;
}

export const US_REGULATOR_LABELS = mapRegulators((r) => r.label);
export const US_REGULATOR_DETAILS = mapRegulators((r) => ({
  name: r.name,
  shortName: r.name,
  registerUrl: r.directoryUrl,
  registerLabel: r.directoryLabel,
}));
export const US_COURT_SERVICES = mapRegulators((r) => r.courtService);
export const US_JURISDICTION_NOTES = mapRegulators((r) => r.jurisdiction);
