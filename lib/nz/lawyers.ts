// ============================================================================
// EDIT THIS FILE to add, remove or change the lawyers on the NEW ZEALAND (/nz)
// pages. Same shape as the Canadian file (lib/ca/lawyers.ts).
//
// citySlug must match a slug in lib/nz/cities.ts
// practiceAreaSlugs must be from: immigration, family, personal-injury (shown
// as "ACC & Injury"), employment, property, wills-probate (shown as
// "Wills & Estates")
//
// HOW EACH ENTRY WAS VERIFIED
//  1. Name, role, office address, practice areas and bio come from the
//     firm's own website (profileUrl), read on the date in `verification`.
//     practiceAreaSlugs only include areas the firm's site says THIS lawyer
//     practises.
//  2. yearsExperience is only set when the firm publishes the lawyer's
//     admission year (counted to 2026). Otherwise null + "Not published".
//  3. The site owner searched each lawyer on the New Zealand Law Society's
//     register (registerUrl) and confirmed the entry before it was added.
//     `registerChecked` records the date. Anyone not confirmed is left out.
//  4. No ratings or reviews. No virtual or appointment-only offices.
//
// IDs are "<city>-nz-<name>" so they can never match a UK, Irish, Canadian
// or US id.
//
// These firms have NOT consented to being listed. The /nz/listings page
// gives them a removal route. People move firms — re-check now and then.
// ============================================================================

import type { StaticLawyer } from "@/lib/data/static-lawyers";
import { NZ_REGISTER_URL } from "@/lib/nz/regulators";

export interface NzLawyer extends StaticLawyer {
  /** What was read on the firm's own website (not shown on the site). */
  verification: string;
  /** Date the site owner confirmed this lawyer on the NZ Law Society register. */
  registerChecked: string;
}

type NzEntry = Omit<NzLawyer, "regulator" | "sraNumber" | "registerUrl" | "registerChecked">;

function checkedOn(registerChecked: string) {
  return (entry: NzEntry): NzLawyer => ({
    regulator: "NZLS",
    sraNumber: null,
    registerUrl: NZ_REGISTER_URL,
    registerChecked,
    ...entry,
  });
}

// Batch 1 — confirmed by the site owner on the NZ Law Society register, 28 Oct 2026.
const b1 = checkedOn("28 October 2026");

const SITE = "Firm website, read 28 Oct 2026";

export const NZ_LAWYERS: NzLawyer[] = [
  // -------------------------------------------------------------- Auckland
  b1({
    id: "auckland-nz-fiona-cowan",
    firmName: "Denham Bramwell",
    lawyerName: "Fiona Cowan",
    role: "Founding Partner",
    citySlug: "auckland",
    practiceAreaSlugs: ["family"],
    primaryPracticeArea: "family",
    bio: "Founding partner who practises family law and is the firm's lead provider for family legal aid. She works from the firm's Manukau office in South Auckland.",
    addressLine1: "Level 4, Denham Bramwell Building, 3 Osterley Way, Manukau City Centre, Auckland 2104",
    yearsExperience: 28,
    experienceNote: "28 (admitted 1998)",
    profileUrl: "https://www.denhambramwell.co.nz/our-team/fiona-cowan",
    verification: `${SITE}: profile page (role, admission year, family law, legal aid); contact page (Manukau office address).`,
  }),
  b1({
    id: "auckland-nz-anna-fuiava",
    firmName: "Denham Bramwell",
    lawyerName: "Anna Fuiava",
    role: "Head of Civil Litigation",
    citySlug: "auckland",
    practiceAreaSlugs: ["employment"],
    primaryPracticeArea: "employment",
    bio: "Heads the firm's civil litigation team. Her work covers employment law, civil litigation and dispute resolution. She is based at the firm's Manukau office.",
    addressLine1: "Level 4, Denham Bramwell Building, 3 Osterley Way, Manukau City Centre, Auckland 2104",
    yearsExperience: 19,
    experienceNote: "19 (admitted 2007)",
    profileUrl: "https://www.denhambramwell.co.nz/our-team/anna-fuiava",
    verification: `${SITE}: profile page (role, admission year, practice areas); contact page (Manukau office address).`,
  }),

  // ------------------------------------------------------------ Wellington
  b1({
    id: "wellington-nz-lisa-fraser",
    firmName: "Gault Mitchell Law",
    lawyerName: "Lisa Fraser",
    role: "Partner",
    citySlug: "wellington",
    practiceAreaSlugs: ["property", "wills-probate", "family"],
    primaryPracticeArea: "property",
    bio: "Partner since 2014 whose practice covers property and commercial law, estate planning, and family and relationship property matters.",
    addressLine1: "22 The Terrace, Wellington 6011",
    yearsExperience: 28,
    experienceNote: "28 (admitted 1998)",
    profileUrl: "https://gaultmitchell.co.nz/people/lisa-fraser-partner/",
    verification: `${SITE}: profile page (role, partner since 2014, admission year, practice areas); contact page (address).`,
  }),
  b1({
    id: "wellington-nz-john-evans",
    firmName: "Hayman Lawyers",
    lawyerName: "John Evans",
    role: "Principal",
    citySlug: "wellington",
    practiceAreaSlugs: ["employment", "family"],
    primaryPracticeArea: "employment",
    bio: "Principal of a Wellington firm. His practice covers employment law, family law, trust law and civil litigation.",
    addressLine1: "Level 14, 109–125 Willis Street, Wellington",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://haymanlawyers.co.nz/about-us/our-people/",
    verification: `${SITE}: our people page (role, practice areas; no admission year shown); contact page (address).`,
  }),

  // ---------------------------------------------------------- Christchurch
  b1({
    id: "christchurch-nz-kelly-hawkins",
    firmName: "Cameron & Co",
    lawyerName: "Kelly Hawkins",
    role: "Senior Associate",
    citySlug: "christchurch",
    practiceAreaSlugs: ["family", "wills-probate"],
    primaryPracticeArea: "family",
    bio: "Senior associate working in family law and relationship property, as well as wills and trusts. She is based at the firm's Riccarton office.",
    addressLine1: "First floor, 322 Riccarton Road, Riccarton, Christchurch",
    yearsExperience: 20,
    experienceNote: "20 (admitted 2006)",
    profileUrl: "https://cameronco.co.nz/kelly-hawkins/",
    verification: `${SITE}: profile page (role, admission year, practice areas, Riccarton office); contact page (address).`,
  }),
  b1({
    id: "christchurch-nz-rebecca-jenkins",
    firmName: "Cameron & Co",
    lawyerName: "Rebecca Jenkins",
    role: "Partner",
    citySlug: "christchurch",
    practiceAreaSlugs: ["property", "wills-probate", "family"],
    primaryPracticeArea: "property",
    bio: "Partner since 2008 whose work covers residential property, business and commercial matters, wills and trusts, estate administration and relationship property. She is based at the firm's Barrington office.",
    addressLine1: "20 Athelstan Street, Barrington, Christchurch",
    yearsExperience: 27,
    experienceNote: "27 (admitted 1999)",
    profileUrl: "https://cameronco.co.nz/rebecca-jenkins/",
    verification: `${SITE}: profile page (role, partner since 2008, admission year, practice areas, Barrington office); contact page (address).`,
  }),

  // -------------------------------------------------------------- Hamilton
  b1({
    id: "hamilton-nz-renika-siciliano",
    firmName: "McCaw Lewis",
    lawyerName: "Renika Siciliano",
    role: "Director",
    citySlug: "hamilton",
    practiceAreaSlugs: ["employment"],
    primaryPracticeArea: "employment",
    bio: "Director whose practice focuses on Te Tiriti o Waitangi matters and workplace law.",
    addressLine1: "Level 6, 586 Victoria Street, Hamilton 3204",
    yearsExperience: 17,
    experienceNote: "17 (admitted to the bar 2009)",
    profileUrl: "https://mccawlewis.co.nz/publications/our-team/renika-siciliano/",
    verification: `${SITE}: profile page (role, admission year, practice areas); contact page (address).`,
  }),
  b1({
    id: "hamilton-nz-amanda-bedford",
    firmName: "McCaw Lewis",
    lawyerName: "Amanda Bedford",
    role: "Executive Director",
    citySlug: "hamilton",
    practiceAreaSlugs: ["wills-probate", "family"],
    primaryPracticeArea: "wills-probate",
    bio: "Executive director working in asset planning — wills, trusts, estates and enduring powers of attorney — and relationship property.",
    addressLine1: "Level 6, 586 Victoria Street, Hamilton 3204",
    yearsExperience: 17,
    experienceNote: "17 (admitted 2009)",
    profileUrl: "https://mccawlewis.co.nz/publications/our-team/amanda-bedford/",
    verification: `${SITE}: profile page (role, admission year, practice areas); contact page (address).`,
  }),

  // -------------------------------------------------------------- Tauranga
  b1({
    id: "tauranga-nz-alesha-evetts",
    firmName: "Sharp Tudhope",
    lawyerName: "Alesha Evetts",
    role: "Partner",
    citySlug: "tauranga",
    practiceAreaSlugs: ["family"],
    primaryPracticeArea: "family",
    bio: "Partner practising family law and relationship property.",
    addressLine1: "Level 4, 152 Devonport Road, Tauranga 3110",
    yearsExperience: 17,
    experienceNote: "17 (admitted 2009)",
    profileUrl: "https://sharptudhope.co.nz/people/alesha-evetts",
    verification: `${SITE}: profile page (role, admission year, practice areas); contact page (single office, address).`,
  }),
  b1({
    id: "tauranga-nz-brooke-courtney",
    firmName: "Sharp Tudhope",
    lawyerName: "Brooke Courtney",
    role: "Partner",
    citySlug: "tauranga",
    practiceAreaSlugs: ["property"],
    primaryPracticeArea: "property",
    bio: "Partner working in property and trust law.",
    addressLine1: "Level 4, 152 Devonport Road, Tauranga 3110",
    yearsExperience: 20,
    experienceNote: "20 (admitted 2006)",
    profileUrl: "https://sharptudhope.co.nz/people/brooke-courtney",
    verification: `${SITE}: profile page (role, admission year, practice areas); contact page (single office, address).`,
  }),

  // --------------------------------------------------------------- Dunedin
  b1({
    id: "dunedin-nz-ari-gianone",
    firmName: "Gallaway Cook Allan",
    lawyerName: "Ari Gianone",
    role: "Associate",
    citySlug: "dunedin",
    practiceAreaSlugs: ["family"],
    primaryPracticeArea: "family",
    bio: "Associate in the firm's Dunedin office practising family law and relationship property.",
    addressLine1: "123 Vogel Street, Dunedin 9054",
    yearsExperience: 17,
    experienceNote: "17 (admitted 2009)",
    profileUrl: "https://www.gallawaycookallan.co.nz/people/ari-gianone",
    verification: `${SITE}: profile page (role, Dunedin office, admission year, practice areas); contact page (Dunedin address).`,
  }),
  b1({
    id: "dunedin-nz-simon-anderson",
    firmName: "Ross Dowling Lawyers",
    lawyerName: "Simon Anderson",
    role: "Partner",
    citySlug: "dunedin",
    practiceAreaSlugs: ["property"],
    primaryPracticeArea: "property",
    bio: "Partner whose practice covers commercial and property law and local government work.",
    addressLine1: "50 Princes Street, Dunedin 9016",
    yearsExperience: 29,
    experienceNote: "29 (admitted 1997)",
    profileUrl: "https://rossdowling.co.nz/our-people/simon-anderson/",
    verification: `${SITE}: profile page (role, admission year, practice areas); contact page (address).`,
  }),
];
