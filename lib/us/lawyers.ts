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
  /**
   * Optional: the link to this lawyer's own record on the state bar directory
   * (paste it from the browser after opening their entry). When set, every
   * "check the state bar" link for this lawyer goes straight to the record
   * instead of the search page.
   */
  barRecordUrl?: string;
}

type UsEntry = Omit<UsLawyer, "regulator" | "sraNumber" | "registerUrl" | "state" | "registerChecked">;

export function forState(code: UsStateCode, registerChecked: string) {
  const state = getUsState(code);
  return (entry: UsEntry): UsLawyer => ({
    regulator: state.regulator,
    sraNumber: null,
    state: code,
    registerChecked,
    ...entry,
    registerUrl: entry.barRecordUrl ?? state.directoryUrl,
  });
}

// Alabama batch 1 — one lawyer per practice area for the whole state.
// Confirmed by the site owner on the Alabama State Bar's Find a Member search, 18 Oct 2026.
const al = forState("AL", "18 October 2026");

const SITE = "Firm website, read 17 Oct 2026";

export const US_LAWYERS: UsLawyer[] = [
  // ------------------------------------------------------------ Birmingham
  al({
    id: "birmingham-al-rocco-calamusa",
    firmName: "Wiggins Childs Pantazis Fisher Goldfarb LLC",
    lawyerName: "Rocco Calamusa Jr.",
    role: "Member",
    citySlug: "birmingham-al",
    practiceAreaSlugs: ["employment", "personal-injury"],
    primaryPracticeArea: "employment",
    bio: "Member of a Birmingham firm of plaintiffs' attorneys. His practice covers discrimination and retaliation, harassment, wage and hour claims, whistleblower and qui tam cases, civil rights, and class and collective actions.",
    addressLine1: "The Kress Building, 301 19th Street North, Birmingham, AL 35203",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.wigginschilds.com/attorneys/rocco-calamusa-jr/",
    verification: `${SITE}: profile page (role, practice areas, bar admission Alabama, office); home page ("plaintiffs' attorneys", address); practice areas page (personal injury and wrongful death).`,
  }),
  al({
    id: "birmingham-al-christopher-owens",
    firmName: "The Harris Firm LLC",
    lawyerName: "Christopher R. Owens",
    role: "Probate and Estate Planning Attorney",
    citySlug: "birmingham-al",
    practiceAreaSlugs: ["wills-probate", "family"],
    primaryPracticeArea: "wills-probate",
    bio: "Probate and estate planning attorney. He handles wills, trusts, powers of attorney, living wills and advance directives, property deeds, guardianships and conservatorships, and the probate of estates, including small estates and estates without a will. He meets clients at the firm's Birmingham and Chelsea offices.",
    addressLine1: "2101 1st Avenue North, Suite 320, Birmingham, AL 35203",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.theharrisfirmllc.com/meet-our-team/attorney-christopher-owens/",
    verification: `${SITE}: profile page (role, practice areas, offices); Areas We Serve page (Birmingham office address; firm areas: family law, divorce, probate, estate planning, adoption).`,
  }),
  // ------------------------------------------------------------ Montgomery
  al({
    id: "montgomery-al-john-tyler-winans",
    firmName: "The Harris Firm LLC",
    lawyerName: "John Tyler Winans",
    role: "Partner, Family Law and Probate",
    citySlug: "montgomery-al",
    practiceAreaSlugs: ["family", "wills-probate"],
    primaryPracticeArea: "family",
    bio: "Partner and family law and probate attorney in the firm's Montgomery office. He handles divorce, custody and support, adoptions and estate administration, and is a member of the Montgomery Bar Association.",
    addressLine1: "60 Commerce Street, Suite 1210, Montgomery, AL 36104",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.theharrisfirmllc.com/meet-our-team/john-tyler-winans/",
    verification: `${SITE}: profile page (role, practice areas, Montgomery office address); Montgomery office page (hours Monday to Friday, 8 a.m. to 5 p.m.).`,
  }),
  // ------------------------------------------------------------ Huntsville
  al({
    id: "huntsville-al-stephen-davis",
    firmName: "Butler Snow LLP",
    lawyerName: "Stephen Davis",
    role: "Business Immigration Attorney",
    citySlug: "huntsville-al",
    practiceAreaSlugs: ["immigration"],
    primaryPracticeArea: "immigration",
    bio: "Business immigration attorney in Butler Snow's Huntsville office. He joined the office in February 2025, when the firm added two immigration attorneys in Huntsville.",
    addressLine1: "200 West Side Square, Suite 100, Huntsville, AL 35801",
    yearsExperience: 18,
    experienceNote: "18 (admitted to the Alabama Bar 2008)",
    profileUrl: "https://butlersnow.com/professionals/stephen-davis",
    verification: `${SITE}: profile page (practice, Alabama admission 2008, Huntsville office); Huntsville location page (address); news release of 24 Feb 2025 (joined the Huntsville office).`,
  }),
  // ------------------------------------------------------------ Mobile
  al({
    id: "mobile-al-lucy-tufts",
    firmName: "Cunningham Bounds",
    lawyerName: "Lucy E. Tufts",
    role: "Attorney",
    citySlug: "mobile-al",
    practiceAreaSlugs: ["personal-injury"],
    primaryPracticeArea: "personal-injury",
    bio: "Personal injury trial lawyer at a Mobile firm that handles car and truck accidents, catastrophic injuries, medical malpractice, product liability, wrongful death and industrial accidents. Her listed results include auto collision, trucking, product liability and wrongful death cases.",
    addressLine1: "1601 Dauphin Street, Mobile, AL 36604",
    yearsExperience: 17,
    experienceNote: "17 (admitted to the Alabama Bar 2009)",
    profileUrl: "https://www.cunninghambounds.com/legal-team/lucy-e-tufts/",
    verification: `${SITE}: profile page (role, practice, Alabama admission 2009, Mobile office); home page (Alabama office address and practice areas).`,
  }),
  // ------------------------------------------------------------ Dothan
  al({
    id: "dothan-al-ashton-ott",
    firmName: "FarmerPrice LLP",
    lawyerName: "Ashton Holmes Ott",
    role: "Partner",
    citySlug: "dothan-al",
    practiceAreaSlugs: ["property", "wills-probate", "personal-injury"],
    primaryPracticeArea: "property",
    bio: "Partner at a Dothan firm whose services include residential and commercial real estate, probate and estate matters, and personal injury. Ott's own practice includes commercial leasing, employment contracts and commercial litigation, and mediation.",
    addressLine1: "100 Adris Place, Dothan, AL 36303",
    yearsExperience: 33,
    experienceNote: "33 (admitted to the Alabama Bar 1993)",
    profileUrl: "https://www.farmerprice.com/our-attorneys/ott/",
    verification: `${SITE}: profile page (practice areas, Alabama admission 1993, office); attorneys page (Partner); home page (address and firm practice areas).`,
  }),
];
