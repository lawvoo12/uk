// ============================================================================
// United States (/us) — states and their bars.
//
// A state is "live" once its law content (lib/us/content.ts) is written; its
// cities get listings as lawyers are checked on the state bar's public
// directory. Only live states have pages. Batch 1: Alabama. Batch 2 (23 Oct
// 2026): Tennessee and Mississippi.
//
// The bars themselves are defined in lib/us/regulators.ts.
// ============================================================================

import { US_REGULATORS, type UsRegulator } from "@/lib/us/regulators";

export type UsStateCode = "AL" | "TN" | "MS";

export interface UsState {
  code: UsStateCode;
  name: string;
  /** URL name of the state hub page: /us/alabama */
  slug: string;
  /** Used in lawyer ids: birmingham-al-… */
  idSuffix: string;
  regulator: UsRegulator;
  regulatorName: string;
  /** The state bar's public lawyer directory — every listing's registerUrl. */
  directoryUrl: string;
  directoryLabel: string;
  /** Badge on city pages with listings. */
  badge: string;
  /** One sentence on licensing, on lawyer profile pages. */
  licenceSentence: string;
  /** Terms page: "in Alabama, <termsFragment> — check a lawyer in its public directory". */
  termsFragment: string;
}

export const US_STATE_ORDER: UsStateCode[] = ["AL", "TN", "MS"];

export const US_STATE_NAMES: Record<UsStateCode, string> = {
  AL: "Alabama",
  TN: "Tennessee",
  MS: "Mississippi",
};

/** States that are live. Added batch by batch. */
export const US_STATES: Partial<Record<UsStateCode, UsState>> = {
  AL: {
    code: "AL",
    name: "Alabama",
    slug: "alabama",
    idSuffix: "al",
    regulator: "ASB",
    regulatorName: US_REGULATORS.ASB.name,
    directoryUrl: US_REGULATORS.ASB.directoryUrl,
    directoryLabel: US_REGULATORS.ASB.directoryLabel,
    badge: "Licensed by the Alabama State Bar",
    licenceSentence: "Lawyers in Alabama are licensed through the Alabama State Bar, which also deals with complaints about them.",
    termsFragment: "the Alabama State Bar licenses lawyers and deals with complaints about them",
  },
  TN: {
    code: "TN",
    name: "Tennessee",
    slug: "tennessee",
    idSuffix: "tn",
    regulator: "TBPR",
    regulatorName: US_REGULATORS.TBPR.name,
    directoryUrl: US_REGULATORS.TBPR.directoryUrl,
    directoryLabel: US_REGULATORS.TBPR.directoryLabel,
    badge: "Listed by the Tennessee Board of Professional Responsibility",
    licenceSentence: "The Board of Professional Responsibility's online directory lists every attorney licensed to practise law in Tennessee.",
    termsFragment: "the Board of Professional Responsibility's online directory lists every attorney licensed to practise law in the state",
  },
  MS: {
    code: "MS",
    name: "Mississippi",
    slug: "mississippi",
    idSuffix: "ms",
    regulator: "MSB",
    regulatorName: US_REGULATORS.MSB.name,
    directoryUrl: US_REGULATORS.MSB.directoryUrl,
    directoryLabel: US_REGULATORS.MSB.directoryLabel,
    badge: "Members of The Mississippi Bar",
    licenceSentence: "To practise law in Mississippi a lawyer must be a member of The Mississippi Bar.",
    termsFragment: "a lawyer must be a member of The Mississippi Bar to practise law",
  },
};

export function getUsState(code: UsStateCode): UsState {
  const state = US_STATES[code];
  if (!state) throw new Error(`State ${code} is not live yet — add it to US_STATES in lib/us/states.ts`);
  return state;
}

/** Live states in display order. */
export function liveUsStates(): UsState[] {
  return US_STATE_ORDER.flatMap((code) => US_STATES[code] ?? []);
}

/** The live state for a hub URL name ("alabama"), if any. */
export function getUsStateBySlug(slug: string): UsState | undefined {
  return liveUsStates().find((s) => s.slug === slug);
}
