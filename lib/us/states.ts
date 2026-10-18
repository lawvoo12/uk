// ============================================================================
// United States (/us) — states and their bars.
//
// A state is "live" once its law content (lib/us/content.ts) is written; its
// cities get listings as lawyers are checked on the state bar's public
// directory. Only live states have pages. Batch 1: Alabama.
//
// The bars themselves are defined in lib/us/regulators.ts.
// ============================================================================

import { US_REGULATORS, type UsRegulator } from "@/lib/us/regulators";

export type UsStateCode = "AL";

export interface UsState {
  code: UsStateCode;
  name: string;
  /** Used in lawyer ids: birmingham-al-… */
  idSuffix: string;
  regulator: UsRegulator;
  regulatorName: string;
  /** The state bar's public lawyer directory — every listing's registerUrl. */
  directoryUrl: string;
  directoryLabel: string;
}

export const US_STATE_ORDER: UsStateCode[] = ["AL"];

export const US_STATE_NAMES: Record<UsStateCode, string> = {
  AL: "Alabama",
};

/** States that are live. Added batch by batch. */
export const US_STATES: Partial<Record<UsStateCode, UsState>> = {
  AL: {
    code: "AL",
    name: "Alabama",
    idSuffix: "al",
    regulator: "ASB",
    regulatorName: US_REGULATORS.ASB.name,
    directoryUrl: US_REGULATORS.ASB.directoryUrl,
    directoryLabel: US_REGULATORS.ASB.directoryLabel,
  },
};

export function getUsState(code: UsStateCode): UsState {
  const state = US_STATES[code];
  if (!state) throw new Error(`State ${code} is not live yet — add it to US_STATES in lib/us/states.ts`);
  return state;
}
