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
// Tennessee: tbpr.org "Find a Lawyer" (covers every attorney licensed in
// Tennessee), read 23 Oct 2026. Mississippi: msbar.reliaguide.com member
// directory ("updated daily"); Bar membership required to practise (Miss.
// Code § 73-3-119), read 23 Oct 2026.
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
  TBPR: {
    label: "Tennessee BPR",
    name: "Board of Professional Responsibility",
    directoryUrl: "https://www.tbpr.org/find-a-lawyer",
    directoryLabel: "Board of Professional Responsibility's online attorney directory",
    courtService: { name: "Tennessee State Courts", url: "https://www.tncourts.gov/" },
    jurisdiction: {
      title: "Tennessee law",
      body: "The Board of Professional Responsibility's online directory lists every attorney licensed to practise law in Tennessee, with their office address, so you can check anyone before you hire them.",
    },
  },
  MSB: {
    label: "The Mississippi Bar",
    name: "Mississippi Bar",
    directoryUrl: "https://msbar.reliaguide.com/home",
    directoryLabel: "Mississippi Bar's member directory",
    courtService: { name: "Mississippi Judiciary", url: "https://courts.ms.gov/" },
    jurisdiction: {
      title: "Mississippi law",
      body: "To practise law in Mississippi a lawyer must be a member of The Mississippi Bar. You can check anyone in the Bar's member directory before you hire them.",
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
