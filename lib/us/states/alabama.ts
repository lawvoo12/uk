// ============================================================================
// ALABAMA — law content and city information for the /us pages.
//
// Every fact and number below was read on an official source on 17 Oct 2026:
//  - Court structure: circuit courts hear felonies, the larger civil cases
//    and domestic relations (divorce) cases; district courts hear smaller
//    civil cases, small claims and misdemeanors; probate courts handle wills,
//    administration of estates, guardianship, partition of land and name
//    changes; municipal courts hear city ordinance cases — Alabama
//    Administrative Office of Courts, Annual Report 2023 (alacourt.gov).
//    The report's dollar limits are left out (they are from 2023).
//  - Child support: Rule 32 Child Support Guidelines, revised effective
//    1 May 2022 for cases filed on or after that date — alacourt.gov
//    "Child Support Guidelines Review"; forms at eforms.alacourt.gov
//  - "No state minimum wage law"; FLSA employers pay $7.25 — dol.gov
//    (updated 1 Jul 2026)
//  - Recordation tax: deeds $.50 per $500 of value or fraction; mortgages
//    $.15 per $100 of indebtedness or fraction — Alabama Department of
//    Revenue "Recordation Tax" (updated 14 Aug 2023)
//  - Mortgage recorded with the deed: deed tax on the sales price above the
//    mortgage, if made to a taxable concern and mortgage tax collected —
//    Baldwin County Probate Office "Recording Fees"
//  - EEOC Birmingham District Office: Ridge Park Place, 1130 22nd Street
//    South, Suite 2000, Birmingham, AL 35205 — eeoc.gov
//  - Alabama State Bar: Find a Member search, Disciplinary History, Lawyer
//    Referral Service, Volunteer Lawyers Program (888) 857-8571,
//    Justice4AL (run by the State Bar) — alabar.org, justice4al.com
//  - Legal Services Alabama: (866) 456-4995 English, (888) 835-3505 Spanish,
//    weekdays 8:30 a.m.–4:30 p.m.; income screening; heirs' property and
//    estate planning among its service areas — legalservicesalabama.org
//  - Probate court addresses: Alabama Department of Revenue "County Probate
//    Office Directory", jeffcoprobatecourt.com (Birmingham Division),
//    montgomeryprobatecourtal.gov, probate.mobilecountyal.gov,
//    houstoncountyal.gov
//
// LEFT OUT because no official page could be read (the pages link to the
// official source instead):
//  - the time limit for injury claims (Code of Alabama § 6-2-38)
//  - how long you must live in Alabama before filing for divorce
//  - who inherits when there is no will, and probate deadlines
// See deploy/us-legal-sources.md.
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
  directory: US_REGULATORS.ASB.directoryUrl,
  discipline: "https://www.alabar.org/office-of-general-counsel/disciplinary-history/",
  generalCounsel: "https://www.alabar.org/office-of-general-counsel/",
  lrs: "https://www.alabar.org/programs/lawyer-referral-service/",
  vlp: "https://www.alabar.org/programs/volunteer-lawyers-program/",
  justice4al: "https://www.justice4al.com/",
  courtForms: "https://www.justice4al.com/topics/court-forms/",
  lsa: "https://legalservicesalabama.org/apply-for-services/",
  judicial: "https://judicial.alabama.gov/",
  circuits: "http://www.alacourt.gov/JudicialCircuits.aspx",
  aocReport: "https://www.alacourt.gov/Annual%20Reports/2023AOCAnnualReport.pdf",
  smallClaims: "https://judicial.alabama.gov/library/smallclaims",
  childSupport: "https://www.alacourt.gov/ChildSupportReview.aspx",
  childSupportForms: "https://eforms.alacourt.gov/child-support-forms/",
  code: "https://alison.legislature.state.al.us/code-of-alabama",
  recordationTax: "https://www.revenue.alabama.gov/?p=56784",
  probateDirectory: "https://www.revenue.alabama.gov/business-license/county-probate-office-directory/",
  eeocBirmingham: "https://www.eeoc.gov/field-office/birmingham",
};

const REGULATION_ANSWER =
  "To practise law in Alabama a lawyer must be licensed through the Alabama State Bar. You can look up any lawyer in the State Bar's public Find a Member search, and the Bar publishes its disciplinary history. Each lawyer on these pages was checked in that search before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the State Bar's Office of General Counsel.";

const COURTS =
  "Circuit courts hear divorce and other domestic relations cases and the larger civil cases; district courts hear smaller civil cases and small claims; and each county's probate court handles wills, estates, guardianships and name changes.";

const AREAS: Record<PracticeAreaSlug, UsAreaContent> = {
  immigration: {
    intro:
      "Green cards, work and family visas, citizenship, asylum and removal (deportation) defense. Immigration is federal law, so the rules in Alabama are the same as in every other state; applications go to U.S. Citizenship and Immigration Services (USCIS).",
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
      "Divorce and separation, custody and visitation, child support and dividing property. In Alabama, divorce and other domestic relations cases are heard by the circuit court of the county, and child support is worked out under the Alabama Supreme Court's Rule 32 Child Support Guidelines.",
    points: [
      "Divorce, custody and other domestic relations cases are heard by the circuit courts.",
      "Child support is calculated under Rule 32 of the Alabama Rules of Judicial Administration — the Child Support Guidelines. The current guidelines were revised effective May 1, 2022, for cases filed on or after that date.",
      "The court's child support forms and the guidelines schedule are published by the Alabama Administrative Office of Courts.",
      "How long you must live in Alabama before filing for divorce, and the grounds, are set by the Code of Alabama — ask a lawyer or check the Code before you file.",
      "Legal Services Alabama gives free civil legal help to people who qualify on income, including in domestic violence cases.",
    ],
    links: [
      { label: "Alabama Child Support Guidelines (Rule 32)", href: L.childSupport },
      { label: "Child support forms", href: L.childSupportForms },
      { label: "Court forms for representing yourself (Justice4AL)", href: L.courtForms },
      { label: "Legal Services Alabama", href: L.lsa },
    ],
  },
  "personal-injury": {
    intro:
      "Car and truck crashes, slips and falls, medical malpractice and wrongful death. In Alabama, larger injury claims are heard in the circuit courts and smaller ones in the district courts. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Larger civil claims, including most injury lawsuits, go to the circuit court; smaller civil cases and small claims go to the district court.",
      "The time limits for injury claims are set by the Code of Alabama and can be short. Speak to a lawyer promptly and check the Code for the period that applies to your case.",
    ],
    links: [
      { label: "Code of Alabama (Alabama Legislature)", href: L.code },
      { label: "Guide to Alabama small claims courts", href: L.smallClaims },
      { label: "Alabama Judicial System", href: L.judicial },
    ],
  },
  employment: {
    intro:
      "Discrimination and harassment, unpaid wages and overtime, retaliation and wrongful termination. Alabama has no state minimum wage law, so the federal Fair Labor Standards Act sets the minimum wage, and most discrimination claims start with a charge to the federal EEOC.",
    points: [
      "Alabama has no state minimum wage law. Employers covered by the Fair Labor Standards Act must pay the federal minimum wage of $7.25 an hour.",
      FED_POINTS.eeoc,
      "The EEOC's Birmingham District Office is at Ridge Park Place, 1130 22nd Street South, Suite 2000, Birmingham.",
      FED_POINTS.equalPay,
      FED_POINTS.federalWorkers,
    ],
    links: [
      { label: "EEOC: time limits for filing a charge", href: US_LINKS.eeocTimeLimits },
      { label: "EEOC Birmingham District Office", href: L.eeocBirmingham },
      { label: "U.S. Department of Labor: minimum wage by state", href: US_LINKS.dolMinimumWage },
    ],
  },
  property: {
    intro:
      "Home purchases and closings, title problems, deeds, and landlord and tenant disputes. When a deed or mortgage is recorded in Alabama, the state's recordation tax is due on it.",
    points: [
      "Recordation tax on a deed is $.50 for every $500 of value (or part of $500) — $300 on a $300,000 home.",
      "Recordation tax on a mortgage is $.15 for every $100 of the debt (or part of $100) — $360 on a $240,000 mortgage.",
      "Two-thirds of the tax goes to the state's General Fund and one-third to the county.",
      "When the mortgage is recorded at the same time as the deed, the deed tax is worked out only on the part of the price above the mortgage (if the lender is a taxable concern and mortgage tax is paid) — for example, a $125,000 sale with a $50,000 mortgage pays deed tax on $75,000.",
      "Each county has a probate office; the Alabama Department of Revenue publishes their addresses and phone numbers.",
    ],
    links: [
      { label: "Alabama deed & mortgage tax calculator", href: "/us/tools/alabama-deed-mortgage-tax-calculator" },
      { label: "Recordation tax (Alabama Department of Revenue)", href: L.recordationTax },
      { label: "County probate office directory", href: L.probateDirectory },
      { label: "Guide to Alabama small claims courts", href: L.smallClaims },
    ],
  },
  "wills-probate": {
    intro:
      "Wills and trusts, powers of attorney, probate and estate administration, guardianships and estate disputes. In Alabama, each county's probate court handles wills, the administration of estates and guardianships.",
    points: [
      "Probate courts handle wills, the administration of estates, guardianship of minors and incapacitated adults, partition of land and name changes.",
      "Who inherits when there is no will, and the deadlines for probating a will, are set by the Code of Alabama — check with the county probate court or a lawyer.",
      "Legal Services Alabama helps people who qualify with heirs' property and estate planning.",
    ],
    links: [
      { label: "County probate office directory", href: L.probateDirectory },
      { label: "Code of Alabama (Alabama Legislature)", href: L.code },
      { label: "Legal Services Alabama", href: L.lsa },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: UsCity, info?: UsCityInfo): FAQItem[] {
  const place = city?.name ?? "Alabama";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        {
          question: "Is immigration law different in Alabama?",
          answer:
            "No. Immigration is federal law, so the same rules apply in every state. Applications go to U.S. Citizenship and Immigration Services (USCIS), and immigration court proceedings are conducted by the Executive Office for Immigration Review.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: `Which court deals with divorce${city ? ` for ${city.name}` : " in Alabama"}?`,
          answer: info
            ? info.familyCourt
            : "Divorce and other domestic relations cases are heard by the circuit court of the county.",
        },
        {
          question: "How is child support worked out in Alabama?",
          answer:
            "Under Rule 32 of the Alabama Rules of Judicial Administration — the Child Support Guidelines. The current guidelines were revised effective May 1, 2022, for cases filed on or after that date. The Administrative Office of Courts publishes the guidelines schedule and the forms.",
        },
        {
          question: "How long do I have to live in Alabama before I can file for divorce?",
          answer:
            "The residency rule is set by the Code of Alabama. We haven't been able to confirm it on an official page, so we don't quote it here — check the Code or ask a family lawyer before you file.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "How long do I have to bring an injury claim in Alabama?",
          answer:
            "The time limits are set by the Code of Alabama, and they can be short. Because we haven't been able to confirm the period on an official page, we don't quote it — speak to a lawyer promptly.",
        },
        {
          question: "Which court hears injury claims in Alabama?",
          answer:
            "Larger civil claims, including most injury lawsuits, go to the circuit court. Smaller civil cases and small claims go to the district court.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        FED_FAQS.eeocDeadline,
        {
          question: "What is the minimum wage in Alabama?",
          answer:
            "Alabama has no state minimum wage law, so employers covered by the federal Fair Labor Standards Act must pay the federal minimum wage of $7.25 an hour.",
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Alabama"} start?`,
          answer:
            "Most discrimination claims start with a charge to the EEOC, whose Birmingham District Office is at Ridge Park Place, 1130 22nd Street South, Suite 2000, Birmingham. Complaints about wages under federal law can go to the U.S. Department of Labor's Wage and Hour Division (1-866-487-9243). Lawsuits go to the federal courts or the state circuit or district court, depending on the claim.",
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `What tax is due when a home is bought${city ? ` in ${city.name}` : " in Alabama"}?`,
          answer:
            "Alabama charges a recordation tax when the deed and any mortgage are recorded: $.50 for every $500 of the property's value on the deed ($300 on a $300,000 home) and $.15 for every $100 of the mortgage ($360 on a $240,000 mortgage). If the mortgage is recorded at the same time, deed tax is only charged on the part of the price above the mortgage. Recording fees and your lawyer's fees are separate.",
        },
        {
          question: "Where can I find my county's probate office?",
          answer:
            "The Alabama Department of Revenue publishes a directory of county probate offices with their addresses and phone numbers.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where are wills and estates handled for someone who lived in ${city.name}?` : "Which court handles probate in Alabama?",
          answer: info
            ? info.estates
            : "Each county's probate court handles wills, the administration of estates and guardianships.",
        },
        {
          question: "What happens if someone dies without a will in Alabama?",
          answer:
            "The Code of Alabama decides who inherits. We haven't been able to confirm the shares on an official page, so we don't set them out here — the county probate court or a lawyer can explain how they apply.",
        },
        {
          question: "Is there free help with wills or heirs' property in Alabama?",
          answer:
            "Legal Services Alabama helps people who qualify on income, including with heirs' property and estate planning. Its call center is on (866) 456-4995 (English) or (888) 835-3505 (Spanish), weekdays 8:30 a.m. to 4:30 p.m.",
        },
        { question: `Are the estate planning and probate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const ALABAMA: UsStateContent = {
  checked: "17 October 2026",
  jurisdiction: {
    title: "Alabama law and courts",
    body: `${COURTS} Immigration is governed by federal law. Lawyers are licensed through the Alabama State Bar, which also deals with complaints about them.`,
  },
  courtsSummary: COURTS,
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Most discrimination complaints start with a charge to the EEOC (Birmingham District Office), normally within 180 days; complaints about wages under federal law can go to the U.S. Department of Labor's Wage and Hour Division.",
  freeHelp: {
    text: "Legal Services Alabama gives free civil legal help to people who qualify on income — call (866) 456-4995, or (888) 835-3505 in Spanish. The Alabama State Bar runs a Volunteer Lawyers Program ((888) 857-8571), a Lawyer Referral Service and the Justice4AL website, with court forms and help in other languages.",
    links: [
      { label: "Legal Services Alabama", href: L.lsa },
      { label: "Volunteer Lawyers Program", href: L.vlp },
      { label: "Justice4AL", href: L.justice4al },
    ],
  },
  courtsSource: { label: "the Alabama Department of Revenue's county probate office directory and county probate court websites", href: L.probateDirectory },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Alabama cities
// ---------------------------------------------------------------------------

function circuitNote(county: string) {
  return `Divorce and the larger civil cases go to the Circuit Court of ${county}, and smaller civil cases to the District Court — find both on the Alabama Judicial System's map of judicial circuits.`;
}

export const ALABAMA_CITY_INFO: Record<string, UsCityInfo> = {
  "birmingham-al": {
    local:
      "Birmingham is in Jefferson County. The Probate Court's Birmingham Division is at 716 North Richard Arrington Jr. Boulevard, and the county also has a Bessemer Division at 1801 3rd Avenue North in Bessemer. The EEOC's Birmingham District Office is at Ridge Park Place, 1130 22nd Street South.",
    courts: [
      {
        name: "Probate Court of Jefferson County, Birmingham Division",
        address: "716 North Richard Arrington Jr. Blvd., Birmingham, AL 35203",
        url: "https://jeffcoprobatecourt.com/",
        use: "Wills, estates, guardianships and name changes",
      },
    ],
    courtNote: circuitNote("Jefferson County"),
    familyCourt:
      "For Birmingham, divorce and other domestic relations cases are heard by the Circuit Court of Jefferson County.",
    estates:
      "Wills and estates are handled by the Probate Court of Jefferson County; its Birmingham Division is at 716 North Richard Arrington Jr. Blvd., Birmingham, and there is also a Bessemer Division at 1801 3rd Avenue North, Bessemer.",
    employmentNote:
      "The EEOC's Birmingham District Office is at Ridge Park Place, 1130 22nd Street South, Birmingham. You can also start online by submitting an inquiry through the EEOC Public Portal.",
  },
  "montgomery-al": {
    local:
      "Montgomery is in Montgomery County. The Montgomery County Probate Court is in Courthouse Annex III at 101 South Lawrence Street, on the 3rd floor.",
    courts: [
      {
        name: "Montgomery County Probate Court",
        address: "Courthouse Annex III, 101 South Lawrence Street, 3rd Floor, Montgomery, AL 36104",
        url: "https://montgomeryprobatecourtal.gov/",
        use: "Wills, estates, guardianships and name changes",
      },
    ],
    courtNote: circuitNote("Montgomery County"),
    familyCourt: "For Montgomery, divorce and other domestic relations cases are heard by the Circuit Court of Montgomery County.",
    estates:
      "Wills and estates are handled by the Montgomery County Probate Court, Courthouse Annex III, 101 South Lawrence Street, 3rd Floor, Montgomery.",
  },
  "huntsville-al": {
    local: "Huntsville is in Madison County. The Madison County Probate Judge's office is at 100 North Side Square, Room 108.",
    courts: [
      {
        name: "Madison County Probate Court",
        address: "100 North Side Square, Room 108, Huntsville, AL 35801",
        url: "https://www.madisoncountyal.gov/departments/probate-judge",
        use: "Wills, estates, guardianships and name changes",
      },
    ],
    courtNote: circuitNote("Madison County"),
    familyCourt: "For Huntsville, divorce and other domestic relations cases are heard by the Circuit Court of Madison County.",
    estates: "Wills and estates are handled by the Madison County Probate Court, 100 North Side Square, Room 108, Huntsville.",
  },
  "mobile-al": {
    local:
      "Mobile is in Mobile County. The Probate Court of Mobile County is in the Mobile County Government Center Annex at 151 Government Street.",
    courts: [
      {
        name: "Probate Court of Mobile County",
        address: "Mobile County Government Center Annex, 151 Government Street, Mobile, AL 36602",
        url: "https://probate.mobilecountyal.gov/",
        use: "Wills, estates, guardianships and name changes",
      },
    ],
    courtNote: circuitNote("Mobile County"),
    familyCourt: "For Mobile, divorce and other domestic relations cases are heard by the Circuit Court of Mobile County.",
    estates:
      "Wills and estates are handled by the Probate Court of Mobile County, Mobile County Government Center Annex, 151 Government Street, Mobile.",
  },
  "dothan-al": {
    local:
      "Dothan is in Houston County. The Alabama Department of Revenue lists the Houston County probate office at 462 North Oates Street; the county courthouse is at 114 North Oates Street.",
    courts: [
      {
        name: "Houston County Probate Office",
        address: "462 N. Oates Street, Dothan, AL 36303",
        url: "https://houstoncountyal.gov/probate/estate/",
        use: "Wills, estates, guardianships and name changes",
      },
    ],
    courtNote: circuitNote("Houston County"),
    familyCourt: "For Dothan, divorce and other domestic relations cases are heard by the Circuit Court of Houston County.",
    estates: "Wills and estates are handled by the Houston County probate court; the probate office is at 462 N. Oates Street, Dothan.",
  },
};
