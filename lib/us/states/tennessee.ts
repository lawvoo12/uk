// ============================================================================
// TENNESSEE — law content and city information for the /us pages.
//
// Every fact and number below was read on an official source on 22–23 Oct 2026:
//  - Board of Professional Responsibility "Find a Lawyer": the online
//    directory covers any attorney licensed to practise law in Tennessee and
//    shows their office address — tbpr.org
//  - "No state minimum wage law"; FLSA employers pay $7.25 — dol.gov
//    (updated 1 Jul 2026)
//  - Child support: Tennessee Department of Human Services Child Support
//    Guidelines, rules 1240-02-04, income shares model; the latest changes
//    took effect 1 Oct 2021 — tn.gov/humanservices
//  - Recordation taxes: realty transfer tax $0.37 per $100 of purchase price;
//    mortgage tax $0.115 per $100 of indebtedness, first $2,000 exempt —
//    tn.gov/revenue "Due Date & Tax Rate"
//  - EEOC Memphis District Office: 200 Jefferson Avenue, 14th Floor,
//    Memphis, TN 38103 — eeoc.gov
//  - Free legal help (HELP4TN, Tennessee Justice Center, JusticeForAllTN,
//    TALS) and bar association referral lines — tn.gov "Legal Help"
//    (Department of Mental Health and Substance Abuse Services)
//  - City courts and Registers of Deeds: circuitclerk.nashville.gov,
//    trialcourts.nashville.gov, nashville.gov, shelbycountytn.gov,
//    knoxcounty.org, rod.knoxcounty.org, montgomerytn.gov
//
// LEFT OUT because no official page could be read (tncourts.gov blocks
// automated reading):
//  - the statewide court structure (which court hears divorce, probate and
//    civil claims differs by county — only the four counties below are
//    described)
//  - time limits for injury claims, divorce residency, who inherits without
//    a will, and the state anti-discrimination agency and its deadline
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { UsCity } from "@/lib/us/cities";
import { US_REGULATORS } from "@/lib/us/regulators";
import {
  FED_FAQS,
  FED_POINTS,
  US_LINKS,
  type UsAreaContent,
  type UsCityInfo,
  type UsStateContent,
} from "@/lib/us/content-shared";

const L = {
  directory: US_REGULATORS.TBPR.directoryUrl,
  tncourts: "https://www.tncourts.gov/",
  help4tn: "https://www.help4tn.org/",
  tnJustice: "https://www.tnjustice.org/",
  justiceForAll: "https://www.justiceforalltn.org/",
  tals: "https://www.tals.org/",
  legalHelp: "https://www.tn.gov/behavioral-health/mhsa-law/legal-help.html",
  childSupport: "https://www.tn.gov/humanservices/for-families/child-support-services/child-support-guidelines.html",
  recordationTax: "https://www.tn.gov/revenue/taxes/local-taxes/recordation-taxes/due-date-tax-rate.html",
  eeocMemphis: "https://www.eeoc.gov/field-office/memphis",
  // Cities
  davidsonProbate: "https://circuitclerk.nashville.gov/?p=40",
  davidsonFourthCircuit: "https://trialcourts.nashville.gov/fourth-circuit-court/",
  davidsonDeeds: "https://www.nashville.gov/departments/register-deeds/services",
  shelbyProbate: "https://www.shelbycountytn.gov/directory.aspx?did=439",
  shelbyDeeds: "https://www.shelbycountytn.gov/Directory.aspx?did=268",
  knoxClerkMaster: "https://knoxcounty.org/chancery/clerk_master.php",
  knoxDivorce: "https://www.knoxcounty.org/recordsmgmt/divorce_records.php",
  knoxDeeds: "https://rod.knoxcounty.org/",
  montgomeryChancery: "https://www.montgomerytn.gov/chancery",
  montgomeryDeeds: "https://www.montgomerytn.gov/deeds",
};

const REGULATION_ANSWER =
  "The Tennessee Board of Professional Responsibility's online directory lists every attorney licensed to practise law in Tennessee, with their office address, so you can look up any lawyer before you hire them. Each lawyer on these pages was checked in that directory before being listed, but people move firms, so check again before you hire.";

const COURTS =
  "Which court hears a divorce or an estate in Tennessee depends on the county. In Davidson County (Nashville), divorces go to the Fourth Circuit Court and estates to the Seventh Circuit Court's Probate Division; Shelby County (Memphis) has its own Probate Court; and in Knox County (Knoxville) and Montgomery County (Clarksville) the Chancery Court handles probate.";

const TAX_SENTENCE =
  "Tennessee charges a realty transfer tax of $0.37 for every $100 of the purchase price, and a mortgage tax of $0.115 for every $100 of the debt, with the first $2,000 of the debt exempt.";

const AREAS: Record<PracticeAreaSlug, UsAreaContent> = {
  immigration: {
    intro:
      "Green cards, work and family visas, citizenship, asylum and removal (deportation) defense. Immigration is federal law, so the rules in Tennessee are the same as in every other state; applications go to U.S. Citizenship and Immigration Services (USCIS).",
    points: [FED_POINTS.immigrationFederal, FED_POINTS.immigrationWhoCanRepresent, FED_POINTS.citizenship],
    links: [
      { label: "U.S. Citizenship and Immigration Services", href: US_LINKS.uscis },
      { label: "Citizenship after five years as a permanent resident", href: US_LINKS.naturalization5 },
      { label: "Citizenship for spouses of US citizens", href: US_LINKS.naturalizationSpouse },
      { label: "Executive Office for Immigration Review (immigration courts)", href: US_LINKS.eoir },
      { label: "Recognized organizations and accredited representatives", href: US_LINKS.accreditation },
    ],
  },
  family: {
    intro:
      "Divorce and separation, custody, child support and adoption. In Tennessee the court that hears a divorce depends on the county, and child support is worked out under the Department of Human Services' Child Support Guidelines, which use an income shares model.",
    points: [
      "Which court hears a divorce depends on the county: in Davidson County it is the Fourth Circuit Court; in Shelby County and Knox County the Circuit and Chancery Courts share divorce cases; in Montgomery County the Chancery Court hears them.",
      "Child support is set under the Tennessee Child Support Guidelines (rules 1240-02-04), which use an income shares model. The latest changes took effect on October 1, 2021.",
      "How long you must live in Tennessee before filing for divorce, and the grounds, are set by Tennessee law — ask a lawyer before you file.",
      "HELP4TN (1-844-435-7486) arranges a free consultation with a licensed Tennessee attorney for people who can't afford one.",
    ],
    links: [
      { label: "Tennessee Child Support Guidelines", href: L.childSupport },
      { label: "HELP4TN", href: L.help4tn },
      { label: "Tennessee State Courts", href: L.tncourts },
    ],
  },
  "personal-injury": {
    intro:
      "Car and truck crashes, slips and falls, medical malpractice and wrongful death. The time limits for injury claims are set by Tennessee law and can be short. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "The time limits for injury claims are set by Tennessee law and can be short. We haven't confirmed them on an official page, so we don't quote them — speak to a lawyer promptly.",
      "Check any lawyer in the Board of Professional Responsibility's online directory before you hire them.",
    ],
    links: [
      { label: "Tennessee State Courts", href: L.tncourts },
      { label: "Board of Professional Responsibility: find a lawyer", href: L.directory },
      { label: "HELP4TN", href: L.help4tn },
    ],
  },
  employment: {
    intro:
      "Discrimination and harassment, unpaid wages and overtime, retaliation and wrongful termination. Tennessee has no state minimum wage law, so the federal Fair Labor Standards Act sets the minimum wage, and most discrimination claims start with a charge to the federal EEOC.",
    points: [
      "Tennessee has no state minimum wage law. Employers covered by the Fair Labor Standards Act must pay the federal minimum wage of $7.25 an hour.",
      FED_POINTS.eeoc,
      "The EEOC's Memphis District Office is at 200 Jefferson Avenue, 14th Floor, Memphis.",
      FED_POINTS.equalPay,
      FED_POINTS.federalWorkers,
    ],
    links: [
      { label: "EEOC: time limits for filing a charge", href: US_LINKS.eeocTimeLimits },
      { label: "EEOC Memphis District Office", href: L.eeocMemphis },
      { label: "U.S. Department of Labor: minimum wage by state", href: US_LINKS.dolMinimumWage },
    ],
  },
  property: {
    intro:
      "Home purchases and closings, title problems, deeds, and landlord and tenant disputes. When a property changes hands or a mortgage is recorded in Tennessee, state recordation taxes are due.",
    points: [
      "Realty transfer tax is $0.37 for every $100 of the purchase price — $1,110 on a $300,000 home.",
      "Mortgage tax is $0.115 for every $100 of the debt, and the first $2,000 is exempt — $273.70 on a $240,000 mortgage.",
      "In each county we cover, deeds and mortgages are recorded with the county Register of Deeds.",
    ],
    links: [
      { label: "Recordation tax rates (Tennessee Department of Revenue)", href: L.recordationTax },
      { label: "Davidson County Register of Deeds", href: L.davidsonDeeds },
      { label: "Knox County Register of Deeds", href: L.knoxDeeds },
    ],
  },
  "wills-probate": {
    intro:
      "Wills and trusts, powers of attorney, probate and estate administration, guardianships and estate disputes. In Tennessee the court that handles estates depends on the county — a probate court, a probate division of the circuit court, or the chancery court.",
    points: [
      "In Davidson County, the Seventh Circuit Court's Probate Division has exclusive jurisdiction over the administration of estates; Shelby County has a separate Probate Court; in Knox and Montgomery counties the Chancery Court handles probate.",
      "Who inherits when there is no will, and the deadlines for probating a will, are set by Tennessee law — check with the court clerk or a lawyer.",
      "HELP4TN (1-844-435-7486) arranges a free consultation with a licensed Tennessee attorney for people who can't afford one.",
    ],
    links: [
      { label: "Davidson County Probate Court Clerk", href: L.davidsonProbate },
      { label: "Knox County Clerk and Master (Probate Division)", href: L.knoxClerkMaster },
      { label: "HELP4TN", href: L.help4tn },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: UsCity, info?: UsCityInfo): FAQItem[] {
  const place = city?.name ?? "Tennessee";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        {
          question: "Is immigration law different in Tennessee?",
          answer:
            "No. Immigration is federal law, so the same rules apply in every state. Applications go to U.S. Citizenship and Immigration Services (USCIS), and immigration court proceedings are conducted by the Executive Office for Immigration Review.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: `Which court deals with divorce${city ? ` for ${city.name}` : " in Tennessee"}?`,
          answer: info
            ? info.familyCourt
            : "It depends on the county. In Davidson County the Fourth Circuit Court hears divorces; in Shelby and Knox counties the Circuit and Chancery Courts share them; in Montgomery County the Chancery Court hears them.",
        },
        {
          question: "How is child support worked out in Tennessee?",
          answer:
            "Under the Tennessee Child Support Guidelines (rules 1240-02-04 of the Department of Human Services), which use an income shares model. The latest changes took effect on October 1, 2021.",
        },
        {
          question: "How long do I have to live in Tennessee before I can file for divorce?",
          answer:
            "The residency rule is set by Tennessee law. We haven't been able to confirm it on an official page, so we don't quote it here — ask a family lawyer before you file.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "How long do I have to bring an injury claim in Tennessee?",
          answer:
            "The time limits are set by Tennessee law, and they can be short. Because we haven't been able to confirm the period on an official page, we don't quote it — speak to a lawyer promptly.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        FED_FAQS.eeocDeadline,
        {
          question: "What is the minimum wage in Tennessee?",
          answer:
            "Tennessee has no state minimum wage law, so employers covered by the federal Fair Labor Standards Act must pay the federal minimum wage of $7.25 an hour.",
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Tennessee"} start?`,
          answer:
            "Most discrimination claims start with a charge to the EEOC, whose Memphis District Office is at 200 Jefferson Avenue, 14th Floor, Memphis. Complaints about wages under federal law can go to the U.S. Department of Labor's Wage and Hour Division (1-866-487-9243).",
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `What tax is due when a home is bought${city ? ` in ${city.name}` : " in Tennessee"}?`,
          answer: `${TAX_SENTENCE} On a $300,000 home that is $1,110 of transfer tax, and on a $240,000 mortgage $273.70 of mortgage tax. Recording fees and your lawyer's fees are separate.`,
        },
        {
          question: `Where are deeds recorded${city ? ` for ${city.name}` : " in Tennessee"}?`,
          answer: info?.recording ?? "With the Register of Deeds of the county the property is in.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where are wills and estates handled for someone who lived in ${city.name}?` : "Which court handles probate in Tennessee?",
          answer: info
            ? info.estates
            : "It depends on the county: in Davidson County the Seventh Circuit Court's Probate Division; in Shelby County the Probate Court; in Knox and Montgomery counties the Chancery Court.",
        },
        {
          question: "What happens if someone dies without a will in Tennessee?",
          answer:
            "Tennessee law decides who inherits. We haven't been able to confirm the shares on an official page, so we don't set them out here — the court clerk or a lawyer can explain how they apply.",
        },
        {
          question: "Is there free legal help with wills in Tennessee?",
          answer:
            "HELP4TN (1-844-435-7486) arranges a free consultation with a licensed Tennessee attorney for people who can't afford a lawyer. JusticeForAllTN.org lists Legal Aid offices and legal clinics.",
        },
        { question: `Are the estate planning and probate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const TENNESSEE: UsStateContent = {
  checked: "23 October 2026",
  jurisdiction: {
    title: "Tennessee law and courts",
    body: `${COURTS} Immigration is governed by federal law. The Board of Professional Responsibility's online directory lists every attorney licensed to practise law in Tennessee.`,
  },
  courtsSummary: COURTS,
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Most discrimination complaints start with a charge to the EEOC (Memphis District Office, 200 Jefferson Avenue, Memphis); complaints about wages under federal law can go to the U.S. Department of Labor's Wage and Hour Division.",
  freeHelp: {
    text: "HELP4TN (1-844-435-7486) arranges a free consultation with a licensed Tennessee attorney for people who can't afford one. The Tennessee Alliance for Legal Services (615-775-9684), the Tennessee Justice Center and JusticeForAllTN.org can also help. Bar association referral lines: Memphis 901-527-3573, Nashville 615-242-6546, Chattanooga 423-756-3222, Knoxville 865-522-7501.",
    links: [
      { label: "HELP4TN", href: L.help4tn },
      { label: "Tennessee Alliance for Legal Services", href: L.tals },
      { label: "Tennessee Justice Center", href: L.tnJustice },
      { label: "JusticeForAllTN", href: L.justiceForAll },
    ],
  },
  courtsSource: { label: "the county court clerks' and Registers of Deeds' own websites", href: L.davidsonProbate },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Tennessee cities
// ---------------------------------------------------------------------------

function recording(county: string, office: string) {
  return `Deeds and mortgages for property in ${county} are recorded with the ${county} Register of Deeds, ${office}. ${TAX_SENTENCE}`;
}

export const TENNESSEE_CITY_INFO: Record<string, UsCityInfo> = {
  "nashville-tn": {
    local:
      "Nashville is in Davidson County. Estates go to the Seventh Circuit Court's Probate Division — known as the Davidson County Probate Court — whose clerk's office is at 1 Public Square, Suite 302. Divorces go to the Fourth Circuit Court at the Metro Courthouse, and deeds are recorded at the Register of Deeds, 300 Deaderick Street.",
    courts: [
      {
        name: "Davidson County Probate Court (Seventh Circuit Court, Probate Division)",
        address: "Probate Court Clerk, 1 Public Square, Suite 302, Nashville, TN 37201",
        url: L.davidsonProbate,
        use: "Estates and wills, conservatorships, guardianships and name changes",
      },
      {
        name: "Fourth Circuit Court",
        address: "Metro Courthouse, 1 Public Square, Nashville, TN 37201",
        url: L.davidsonFourthCircuit,
        use: "Divorce, custody, child support and adoptions",
      },
      {
        name: "Davidson County Register of Deeds",
        address: "300 Deaderick St, Nashville, TN 37201",
        url: L.davidsonDeeds,
        use: "Recording deeds and other documents",
      },
    ],
    familyCourt:
      "In Davidson County, the Fourth Circuit Court is the only court designated to hear divorces; it also hears custody, child support, adoptions and other domestic matters. It sits at the Metro Courthouse, 1 Public Square, Nashville.",
    estates:
      "The Seventh Circuit Court's Probate Division — the Davidson County Probate Court — has exclusive jurisdiction over the administration of estates in Davidson County, including the probate of wills. The Probate Court Clerk's office is at 1 Public Square, Suite 302, Nashville.",
    recording: recording("Davidson County", "300 Deaderick St, Nashville"),
    recordingLink: { label: "Davidson County Register of Deeds", href: L.davidsonDeeds },
  },
  "memphis-tn": {
    local:
      "Memphis is in Shelby County. The Shelby County Probate Court and Clerk's Office is at 140 Adams Avenue, Room 124, and the Register of Deeds at 1075 Mullins Station Road. The EEOC's Memphis District Office is at 200 Jefferson Avenue, 14th Floor.",
    courts: [
      {
        name: "Shelby County Probate Court",
        address: "140 Adams Avenue, Room 124, Memphis, TN 38103",
        url: L.shelbyProbate,
        use: "Wills, estates and guardianships",
      },
      {
        name: "Shelby County Register of Deeds",
        address: "1075 Mullins Station Road, Building W3, Suite W165, Memphis, TN 38134",
        url: L.shelbyDeeds,
        use: "Recording deeds and other documents",
      },
    ],
    familyCourt: "In Shelby County, divorces can be filed in either the Chancery Court or the Circuit Court, which share jurisdiction over them.",
    estates: "Wills and estates are handled by the Shelby County Probate Court; its clerk's office is at 140 Adams Avenue, Room 124, Memphis.",
    employmentNote:
      "The EEOC's Memphis District Office is at 200 Jefferson Avenue, 14th Floor, Memphis. You can also start online by submitting an inquiry through the EEOC Public Portal.",
    recording: recording("Shelby County", "1075 Mullins Station Road, Building W3, Suite W165, Memphis"),
    recordingLink: { label: "Shelby County Register of Deeds", href: L.shelbyDeeds },
  },
  "knoxville-tn": {
    local:
      "Knoxville is in Knox County. The county's courts and offices are in the City County Building at 400 Main Street: the Clerk and Master, who oversees probate, has the Probate Division in Suite 352, and the Register of Deeds is in Suite 225.",
    courts: [
      {
        name: "Knox County Clerk and Master, Probate Division",
        address: "City County Building, 400 Main Street, Suite 352, Knoxville, TN 37902",
        url: L.knoxClerkMaster,
        use: "Probate of wills and administration of estates",
      },
      {
        name: "Knox County Register of Deeds",
        address: "City County Building, 400 Main Street, Suite 225, Knoxville, TN 37902",
        url: L.knoxDeeds,
        use: "Recording deeds and other documents",
      },
    ],
    familyCourt:
      "In Knox County, the Circuit and Chancery Courts share jurisdiction over divorce. Most divorce rulings come from the Fourth Division of the Circuit Court, which works as a family-matters court.",
    estates:
      "The Knox County Clerk and Master oversees the probate of wills and the administration of estates for the Probate Division, in Suite 352 of the City County Building, 400 Main Street, Knoxville.",
    recording: recording("Knox County", "400 Main Street, Suite 225, Knoxville"),
    recordingLink: { label: "Knox County Register of Deeds", href: L.knoxDeeds },
  },
  "clarksville-tn": {
    local:
      "Clarksville is in Montgomery County. The Montgomery County Chancery Court, whose Clerk and Master is at 2 Millennium Plaza, Suite 101, handles probate and divorce among other cases; the Register of Deeds is at 350 Pageant Lane, Suite 101-A.",
    courts: [
      {
        name: "Montgomery County Chancery Court (Clerk and Master)",
        address: "2 Millennium Plaza, Suite 101, Clarksville, TN 37040",
        url: L.montgomeryChancery,
        use: "Probate, divorce, adoption, guardianship and name changes",
      },
      {
        name: "Montgomery County Register of Deeds",
        address: "350 Pageant Lane, Suite 101-A, Clarksville, TN 37040",
        url: L.montgomeryDeeds,
        use: "Recording deeds, deeds of trust and other documents",
      },
    ],
    familyCourt:
      "Divorce is among the cases heard by the Montgomery County Chancery Court; the Clerk and Master's office is at 2 Millennium Plaza, Suite 101, Clarksville.",
    estates:
      "Probate — including trusts, guardianship and conservatorship — is handled by the Montgomery County Chancery Court; the Clerk and Master's office is at 2 Millennium Plaza, Suite 101, Clarksville.",
    recording: recording("Montgomery County", "350 Pageant Lane, Suite 101-A, Clarksville"),
    recordingLink: { label: "Montgomery County Register of Deeds", href: L.montgomeryDeeds },
  },
};
