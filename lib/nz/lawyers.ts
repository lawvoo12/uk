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

// Batch 2 — fills empty practice areas in each city. Confirmed by the site owner on the NZ Law Society register, 29 Oct 2026.
const b2 = checkedOn("29 October 2026");
const SITE2 = "Firm website, read 29 Oct 2026";

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
  // ===================================================== Batch 2 (29 Oct 2026)
  // -------------------------------------------------------------- Auckland
  b2({
    id: "auckland-nz-kim-saran-lee",
    firmName: "Lane Neave",
    lawyerName: "Kim Saran Lee",
    role: "Senior Solicitor, Immigration",
    citySlug: "auckland",
    practiceAreaSlugs: ["immigration"],
    primaryPracticeArea: "immigration",
    bio: "Senior solicitor in the firm's immigration team, based in Auckland. She advises on temporary and residence visas, appeals to the Immigration and Protection Tribunal, ministerial interventions, section 61 requests, and character and medical waivers.",
    addressLine1: "Level 8, Vero Centre, 48 Shortland Street, Auckland 1010",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.laneneave.co.nz/our-people/kim-saran-lee/",
    verification: `${SITE2}: profile page (role, "based in Auckland", immigration work; LLB 2020 is a graduation year, not admission); contact page (Auckland office address).`,
  }),
  b2({
    id: "auckland-nz-brett-abraham",
    firmName: "Denham Bramwell",
    lawyerName: "Brett Abraham",
    role: "Founding Partner",
    citySlug: "auckland",
    practiceAreaSlugs: ["property", "wills-probate"],
    primaryPracticeArea: "property",
    bio: "Founding partner who leads the firm's property and commercial law team. His property work covers residential, commercial and rural property, subdivisions and retirement villages; he also works in commercial law and in estates, wills and trusts.",
    addressLine1: "Level 4, Denham Bramwell Building, 3 Osterley Way, Manukau City Centre, Auckland 2104",
    yearsExperience: 48,
    experienceNote: "48 (admitted 1978)",
    profileUrl: "https://www.denhambramwell.co.nz/our-team/brett-abraham",
    verification: `${SITE2}: profile page (role, office: Manukau, year admitted 1978, areas: Property Law, Commercial & Business, Estates, Wills & Trusts).`,
  }),
  b2({
    id: "auckland-nz-judith-moore",
    firmName: "Judith Moore, Barrister",
    lawyerName: "Judith Moore",
    role: "Barrister",
    citySlug: "auckland",
    practiceAreaSlugs: ["personal-injury", "employment", "family"],
    primaryPracticeArea: "personal-injury",
    bio: "Barrister sole practising family, employment and medical law, including ACC reviews and District Court appeals. A former registered nurse, she takes legal aid cases and appears in the Family Court, the Employment Relations Authority and Employment Court, and the District and High Courts.",
    addressLine1: "Unit 4, 154 Kitchener Road, Milford, Auckland",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.judithmoore.co.nz/",
    verification: `${SITE2}: website (legal services incl. ACC reviews and District Court appeals; barrister sole; office address Unit 4 / 154 Kitchener Road, Milford).`,
  }),

  // ------------------------------------------------------------ Wellington
  b2({
    id: "wellington-nz-louise-newman",
    firmName: "Gibson Sheat",
    lawyerName: "Louise Newman",
    role: "Senior Associate",
    citySlug: "wellington",
    practiceAreaSlugs: ["personal-injury"],
    primaryPracticeArea: "personal-injury",
    bio: "Leads the firm's ACC and health law team and specialises in complex medico-legal cases, helping people with ACC claims and disputes. She also has a civil and commercial litigation practice.",
    addressLine1: "Level 2, 50 Customhouse Quay, Wellington 6011",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.gibsonsheat.com/our-people/louise-newman",
    verification: `${SITE2}: profile page (role, Wellington, ACC and health law team lead; joined 2019, no admission year); contact page (Wellington office address).`,
  }),
  b2({
    id: "wellington-nz-vikram-singh",
    firmName: "Gibson Sheat",
    lawyerName: "Vikram Singh",
    role: "Solicitor",
    citySlug: "wellington",
    practiceAreaSlugs: ["immigration", "employment"],
    primaryPracticeArea: "immigration",
    bio: "Advises individuals, families and business owners on immigration — including entrepreneur and investor visas, skilled migrant and work-to-residence pathways, and family applications — as well as employment and commercial matters. He advises in Hindi, Punjabi and English.",
    addressLine1: "Level 2, 50 Customhouse Quay, Wellington 6011",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.gibsonsheat.com/our-people/vikram-singh",
    verification: `${SITE2}: profile page (role, Wellington, immigration and employment work); contact page (Wellington office address).`,
  }),

  // ---------------------------------------------------------- Christchurch
  b2({
    id: "christchurch-nz-jen-bensley",
    firmName: "Saunders & Co",
    lawyerName: "Jen Bensley",
    role: "Leads the Immigration Team",
    citySlug: "christchurch",
    practiceAreaSlugs: ["immigration", "property"],
    primaryPracticeArea: "immigration",
    bio: "Leads the firm's immigration team. A former immigration officer at Immigration New Zealand, she handles investment, business, student, work, visitor, family and residence visas, and advises on deportation liability, ministerial requests and appeals to the Immigration and Protection Tribunal. She also works in property law and conveyancing.",
    addressLine1: "131 Victoria Street, Christchurch",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.saunders.co.nz/our-people-christchurch-lawyers-saunders-and-co/jen-bensley/",
    verification: `${SITE2}: profile page (leads immigration team, office: CBD, areas incl. Immigration Law and Property Law and Conveyancing; career dates but no admission year); footer (CBD office address).`,
  }),
  b2({
    id: "christchurch-nz-madison-prattley",
    firmName: "Saunders & Co",
    lawyerName: "Madison Prattley",
    role: "Associate",
    citySlug: "christchurch",
    practiceAreaSlugs: ["employment"],
    primaryPracticeArea: "employment",
    bio: "Associate in the firm's litigation and dispute resolution team who specialises in employment law, including employment mediations and cases in the Employment Relations Authority and Employment Court. She also handles general civil litigation.",
    addressLine1: "131 Victoria Street, Christchurch",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.saunders.co.nz/our-people-christchurch-lawyers-saunders-and-co/madison-prattley/",
    verification: `${SITE2}: profile page (role, office: CBD, employment law); footer (CBD office address).`,
  }),
  b2({
    id: "christchurch-nz-christian-pinkney",
    firmName: "Corcoran French",
    lawyerName: "Christian Pinkney",
    role: "Associate",
    citySlug: "christchurch",
    practiceAreaSlugs: ["personal-injury", "employment"],
    primaryPracticeArea: "personal-injury",
    bio: "Associate in the firm's Christchurch litigation team. His areas include ACC disputes and employment, as well as estate and trust disputes and mediation; the firm's ACC page names him as its contact for ACC reviews and appeals.",
    addressLine1: "74 Armagh Street, Christchurch",
    yearsExperience: 8,
    experienceNote: "8 (admitted 2018)",
    profileUrl: "https://cflaw.co.nz/our-people/christian-pinkney/",
    verification: `${SITE2}: profile page (Associate, Christchurch, admitted 2018, expertise incl. ACC Disputes and Employment); ACC page (names him); footer (Christchurch office address).`,
  }),

  // -------------------------------------------------------------- Hamilton
  b2({
    id: "hamilton-nz-maninder-sidhu",
    firmName: "Brook Law",
    lawyerName: "Maninder Sidhu",
    role: "Director",
    citySlug: "hamilton",
    practiceAreaSlugs: ["immigration", "family", "property", "wills-probate"],
    primaryPracticeArea: "immigration",
    bio: "Director who specialises in family and immigration matters, and also advises on residential and commercial conveyancing, wills and trusts. She is a listed legal aid provider and advises in Hindi, Punjabi and English.",
    addressLine1: "7A Princes Street, Hamilton",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://brooklaw.co.nz/about-us/",
    verification: `${SITE2}: about page (role and practice areas); immigration page (firm immigration work); contact page (address). Single Hamilton office.`,
  }),

  // -------------------------------------------------------------- Tauranga
  b2({
    id: "tauranga-nz-eleanor-dyche",
    firmName: "Pawson Law",
    lawyerName: "Eleanor Dyche",
    role: "Director",
    citySlug: "tauranga",
    practiceAreaSlugs: ["immigration"],
    primaryPracticeArea: "immigration",
    bio: "Director and the firm's immigration law specialist, often taking referrals for complex immigration matters. She is also an experienced criminal defence lawyer and a legal aid provider.",
    addressLine1: "20 Park Street, Tauranga 3110",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://pawsonlaw.co.nz/eleanor-dyche/",
    verification: `${SITE2}: profile page (role, immigration law specialist); immigration and contact pages (single location, 20 Park Street, Tauranga).`,
  }),
  b2({
    id: "tauranga-nz-lucy-korolainen",
    firmName: "Sharp Tudhope",
    lawyerName: "Lucy Korolainen",
    role: "Associate",
    citySlug: "tauranga",
    practiceAreaSlugs: ["employment"],
    primaryPracticeArea: "employment",
    bio: "Associate who works in employment law — agreements, policies, performance management, restructuring and employee transfers — and represents clients at mediation and in the Employment Relations Authority. She also handles civil disputes.",
    addressLine1: "Level 4, 152 Devonport Road, Tauranga 3110",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://sharptudhope.co.nz/people/lucy-korolainen/",
    verification: `${SITE2}: profile page (role, employment law, joined 2019). Note: the page's browser title reads "Lucy Nolan".`,
  }),
  b2({
    id: "tauranga-nz-samantha-stowell",
    firmName: "Sharp Tudhope",
    lawyerName: "Samantha Stowell",
    role: "Senior Associate",
    citySlug: "tauranga",
    practiceAreaSlugs: ["wills-probate", "property"],
    primaryPracticeArea: "wills-probate",
    bio: "Senior associate in the firm's trust team, working on family and charitable trusts, wills, enduring powers of attorney and estate administration. She also advises on residential and commercial conveyancing and leases.",
    addressLine1: "Level 4, 152 Devonport Road, Tauranga 3110",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://sharptudhope.co.nz/people/samantha-stowell/",
    verification: `${SITE2}: profile page (role, areas of expertise incl. wills, EPAs, estate administration, conveyancing).`,
  }),

  // --------------------------------------------------------------- Dunedin
  b2({
    id: "dunedin-nz-jessica-higgins",
    firmName: "Anderson Lloyd",
    lawyerName: "Jessica Higgins",
    role: "Senior Associate",
    citySlug: "dunedin",
    practiceAreaSlugs: ["employment", "immigration"],
    primaryPracticeArea: "employment",
    bio: "Senior associate in the firm's employment team, based in Dunedin. She advises on employment agreements, restructures, disciplinary matters and personal grievances, and also advises individuals and businesses on immigration, including investor visa pathways.",
    addressLine1: "Level 12, Otago House, 477 Moray Place, Dunedin 9016",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.al.nz/staff/higgins-jessica/",
    verification: `${SITE2}: profile page (role, based in Dunedin, practice areas Employment and Immigration; "almost a decade" of experience, no admission year); Dunedin office page (address, lists her as a Dunedin senior associate).`,
  }),
  b2({
    id: "dunedin-nz-gerrad-brimble",
    firmName: "Gallaway Cook Allan",
    lawyerName: "Gerrad Brimble",
    role: "Partner",
    citySlug: "dunedin",
    practiceAreaSlugs: ["employment"],
    primaryPracticeArea: "employment",
    bio: "Partner who advises employers and employees on all aspects of employment law, including negotiations and mediations, disciplinary and restructuring processes, employee exits, investigations and restraints of trade. He previously worked in human resources for nearly a decade.",
    addressLine1: "123 Vogel Street, Dunedin 9054",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.gallawaycookallan.co.nz/people/gerrad-brimble",
    verification: `${SITE2}: profile page (Partner, Dunedin, employment law).`,
  }),
  b2({
    id: "dunedin-nz-devon-miller",
    firmName: "Gallaway Cook Allan",
    lawyerName: "Devon Miller",
    role: "Partner",
    citySlug: "dunedin",
    practiceAreaSlugs: ["wills-probate", "family"],
    primaryPracticeArea: "wills-probate",
    bio: "Partner who leads the firm's private clients team, working with trusts, succession planning, wills and estates, and contracting-out (relationship property) agreements.",
    addressLine1: "123 Vogel Street, Dunedin 9054",
    yearsExperience: null,
    experienceNote: "Not published",
    profileUrl: "https://www.gallawaycookallan.co.nz/people/devon-miller",
    verification: `${SITE2}: profile page (Partner, Dunedin, leads Private Clients Team; practice areas).`,
  }),
];
