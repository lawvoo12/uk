// ============================================================================
// EDIT THIS FILE to add, remove or change the lawyers on the UNITED STATES
// (/us) pages. Same shape as the Canada file (lib/ca/lawyers.ts).
//
// citySlug must match a slug in lib/us/cities.ts
// practiceAreaSlugs must be from: immigration, family, personal-injury,
// employment, property (shown as "Real Estate"), wills-probate (shown as
// "Estate Planning & Probate")
//
// HOW EACH ENTRY IS VERIFIED
//  1. Name, role, office address, practice areas and bio come from the
//     firm's own website (profileUrl), read on the date in `verification`.
//     practiceAreaSlugs are the FIRM's areas; primaryPracticeArea is the
//     lawyer's own.
//  2. yearsExperience is only set when the firm publishes the lawyer's year
//     of admission (counted to 2026). Otherwise null + "Not published".
//  3. The site owner searches each lawyer on the state bar's public
//     directory (registerUrl) and confirms the entry before it is added.
//     `registerChecked` records the date. Anyone not confirmed is left out.
//  4. No ratings or reviews. No virtual or appointment-only offices. No
//     lawyer with recent published discipline.
//
// IDs are "<city>-<state>-<name>" (birmingham-al-…) so they can never match
// a UK, Irish or Canadian id. scripts/check-ids.mjs checks this.
//
// These firms have NOT consented to being listed. The /us/listings page
// gives them a removal route.
// ============================================================================

import type { StaticLawyer } from "@/lib/data/static-lawyers";
import { getUsState, type UsStateCode } from "@/lib/us/states";

export interface UsLawyer extends StaticLawyer {
  state: UsStateCode;
  /** What was read on the firm's own website (not shown on the site). */
  verification: string;
  /** Date the site owner confirmed this lawyer on the state bar directory. */
  registerChecked: string;
}

type UsEntry = Omit<UsLawyer, "regulator" | "sraNumber" | "registerUrl" | "state" | "registerChecked">;

// Used once the first Alabama lawyers are confirmed:
//   const al = forState("AL", "<date>");  US_LAWYERS = [al({ id: "birmingham-al-…", … })]
export function forState(code: UsStateCode, registerChecked: string) {
  const state = getUsState(code);
  return (entry: UsEntry): UsLawyer => ({
    regulator: state.regulator,
    sraNumber: null,
    registerUrl: state.directoryUrl,
    state: code,
    registerChecked,
    ...entry,
  });
}

// No US lawyers yet — Alabama batch 1 is waiting for the site owner's
// confirmation on the Alabama State Bar directory.
export const US_LAWYERS: UsLawyer[] = [];
