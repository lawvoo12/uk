// ============================================================================
// MISSISSIPPI — law content and city information for the /us pages.
//
// Every fact and number below was read on an official source on 22–23 Oct 2026:
//  - Membership of The Mississippi Bar is required to practise law (Miss.
//    Code § 73-3-119); the Bar's member directory is "updated daily" —
//    msbar.org, msbar.reliaguide.com
//  - Trial courts: chancery courts hear equity matters, divorce and custody,
//    guardianships and wills, and "Land records are filed in Chancery
//    Court"; circuit courts hear felonies and civil lawsuits; county courts
//    have exclusive jurisdiction over eminent domain and juvenile matters and
//    share some civil cases; justice courts hear small claims; youth courts
//    deal with abuse and neglect of juveniles — courts.ms.gov "About the
//    Courts". Dollar limits left out, as for Alabama.
//  - EEOC: "In the State of Mississippi, an individual has 180 days from the
//    date of alleged harm to file a charge" — EEOC Birmingham District Office
//    "Timeliness"; Jackson Area Office, Dr. A. H. McCoy Federal Building,
//    100 West Capitol Street, Suite 338, Jackson, MS 39269 — eeoc.gov
//  - "No state minimum wage law"; FLSA employers pay $7.25 — dol.gov
//    (updated 1 Jul 2026)
//  - Free legal help: Mississippi Bar "Pro Bono Services"
//  - Chancery clerks: Mississippi Judiciary list of chancery clerks (dated
//    17 Jan 2024); Harrison County street addresses from
//    harrisoncountymschanceryclerk.gov; DeSoto County from desotocountyms.gov
//
// LEFT OUT:
//  - child support percentages: Miss. Code § 43-19-101 sets them, but the
//    only official copy found is an MDHS PDF from 2020 and the guidelines
//    were before the 2026 Legislature, so they are not quoted
//  - time limits for injury claims, divorce residency, who inherits without
//    a will, and recording fees
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
  directory: US_REGULATORS.MSB.directoryUrl,
  courts: "https://courts.ms.gov/",
  trialCourts: "https://courts.ms.gov/trialcourts/tc_aboutthecourts.php",
  chanceryClerks: "https://courts.ms.gov/trialcourts/chancerycourt/chanclerks.pdf",
  proBono: "https://msbar.org/for-the-public/pro-bono-resources/pro-bono-services/",
  mcls: "http://www.mslegalservices.org/",
  nmrls: "http://www.nmrls.com/",
  mvlp: "http://www.mvlp.net/",
  mcj: "http://www.mscenterforjustice.org/",
  mdhs: "https://www.mdhs.ms.gov/",
  eeocJackson: "https://www.eeoc.gov/field-office/jackson",
  eeocTimeliness: "https://www.eeoc.gov/field-office/birmingham/timeliness",
  harrisonClerk: "https://harrisoncountymschanceryclerk.gov/contact.asp",
  desotoClerk: "https://desotocountyms.gov/directory.aspx?did=19",
};

const REGULATION_ANSWER =
  "To practise law in Mississippi a lawyer must be a member of The Mississippi Bar. You can look up any lawyer in the Bar's member directory, which is updated daily. Each lawyer on these pages was checked in that directory before being listed, but people move firms, so check again before you hire.";

const COURTS =
  "Chancery courts hear divorce and custody, guardianships and wills, and land records are filed with them; circuit courts hear civil lawsuits and felonies; county courts share some civil cases and hear eminent domain and juvenile matters; and justice courts hear small claims.";

const AREAS: Record<PracticeAreaSlug, UsAreaContent> = {
  immigration: {
    intro:
      "Green cards, work and family visas, citizenship, asylum and removal (deportation) defense. Immigration is federal law, so the rules in Mississippi are the same as in every other state; applications go to U.S. Citizenship and Immigration Services (USCIS).",
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
      "Divorce and separation, custody, child support and adoption. In Mississippi, divorce, custody and guardianship cases are heard by the chancery court of the county.",
    points: [
      "Divorce, custody, guardianships and other domestic matters are heard by the chancery courts.",
      "Youth courts deal with abuse and neglect of children and with offenses committed by juveniles.",
      "Child support is set under the guidelines in Mississippi Code § 43-19-101. We haven't confirmed the current version on an official page, so we don't quote the figures — ask a family lawyer or the Mississippi Department of Human Services.",
      "How long you must live in Mississippi before filing for divorce, and the grounds, are set by Mississippi law — ask a lawyer before you file.",
      "The Mississippi Center for Legal Services (800-498-1804) and North Mississippi Rural Legal Services (800-898-8731) give free civil legal help.",
    ],
    links: [
      { label: "Mississippi trial courts explained", href: L.trialCourts },
      { label: "Mississippi Department of Human Services", href: L.mdhs },
      { label: "Mississippi Center for Legal Services", href: L.mcls },
      { label: "North Mississippi Rural Legal Services", href: L.nmrls },
    ],
  },
  "personal-injury": {
    intro:
      "Car and truck crashes, slips and falls, medical malpractice and wrongful death. In Mississippi, civil lawsuits are heard by the circuit courts, county courts share some civil cases, and justice courts hear small claims. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Civil lawsuits, including most injury claims, go to the circuit court; county courts share some civil cases, and justice courts hear small claims.",
      "The time limits for injury claims are set by Mississippi law and can be short. We haven't confirmed them on an official page, so we don't quote them — speak to a lawyer promptly.",
    ],
    links: [
      { label: "Mississippi trial courts explained", href: L.trialCourts },
      { label: "Mississippi Judiciary", href: L.courts },
    ],
  },
  employment: {
    intro:
      "Discrimination and harassment, unpaid wages and overtime, retaliation and wrongful termination. Mississippi has no state minimum wage law, so the federal Fair Labor Standards Act sets the minimum wage, and most discrimination claims start with a charge to the federal EEOC — within 180 days in Mississippi.",
    points: [
      "Mississippi has no state minimum wage law. Employers covered by the Fair Labor Standards Act must pay the federal minimum wage of $7.25 an hour.",
      "The EEOC says that in Mississippi you have 180 days from the date of the harm to file a discrimination charge.",
      "The EEOC's Jackson Area Office is in the Dr. A. H. McCoy Federal Building, 100 West Capitol Street, Suite 338, Jackson.",
      FED_POINTS.equalPay,
      FED_POINTS.federalWorkers,
    ],
    links: [
      { label: "EEOC deadline calculator", href: "/us/tools/eeoc-deadline-calculator" },
      { label: "EEOC: filing deadline in Mississippi", href: L.eeocTimeliness },
      { label: "EEOC Jackson Area Office", href: L.eeocJackson },
      { label: "U.S. Department of Labor: minimum wage by state", href: US_LINKS.dolMinimumWage },
    ],
  },
  property: {
    intro:
      "Home purchases and closings, title problems, deeds, and landlord and tenant disputes. In Mississippi, land records are filed with the chancery court of the county.",
    points: [
      "Land records are filed in the chancery court of the county.",
      "County courts have exclusive jurisdiction over eminent domain (government taking of land) proceedings.",
      "The Mississippi Judiciary publishes a list of every county's chancery clerk.",
    ],
    links: [
      { label: "Chancery clerks by county (Mississippi Judiciary)", href: L.chanceryClerks },
      { label: "Mississippi trial courts explained", href: L.trialCourts },
    ],
  },
  "wills-probate": {
    intro:
      "Wills and trusts, powers of attorney, probate and estate administration, guardianships and estate disputes. In Mississippi, wills and guardianships are handled by the chancery court of the county.",
    points: [
      "Chancery courts handle wills and guardianships, as well as other matters of equity.",
      "Who inherits when there is no will, and the deadlines for probating a will, are set by Mississippi law — check with the chancery clerk or a lawyer.",
      "The Mississippi Volunteer Lawyers Project (601-960-9577) and the Mississippi Center for Legal Services (800-498-1804) give free legal help.",
    ],
    links: [
      { label: "Chancery clerks by county (Mississippi Judiciary)", href: L.chanceryClerks },
      { label: "Mississippi Volunteer Lawyers Project", href: L.mvlp },
      { label: "Mississippi Center for Legal Services", href: L.mcls },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: UsCity, info?: UsCityInfo): FAQItem[] {
  const place = city?.name ?? "Mississippi";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        {
          question: "Is immigration law different in Mississippi?",
          answer:
            "No. Immigration is federal law, so the same rules apply in every state. Applications go to U.S. Citizenship and Immigration Services (USCIS), and immigration court proceedings are conducted by the Executive Office for Immigration Review.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: `Which court deals with divorce${city ? ` for ${city.name}` : " in Mississippi"}?`,
          answer: info ? info.familyCourt : "Divorce and custody cases are heard by the chancery court of the county.",
        },
        {
          question: "How is child support worked out in Mississippi?",
          answer:
            "Under the child support guidelines in Mississippi Code § 43-19-101. We haven't been able to confirm the current version on an official page, so we don't quote the figures — a family lawyer or the Mississippi Department of Human Services can tell you what applies.",
        },
        {
          question: "How long do I have to live in Mississippi before I can file for divorce?",
          answer:
            "The residency rule is set by Mississippi law. We haven't been able to confirm it on an official page, so we don't quote it here — ask a family lawyer before you file.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "How long do I have to bring an injury claim in Mississippi?",
          answer:
            "The time limits are set by Mississippi law, and they can be short. Because we haven't been able to confirm the period on an official page, we don't quote it — speak to a lawyer promptly.",
        },
        {
          question: "Which court hears injury claims in Mississippi?",
          answer:
            "Civil lawsuits, including most injury claims, go to the circuit court. County courts share some civil cases, and justice courts hear small claims.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to file a discrimination charge with the EEOC in Mississippi?",
          answer:
            "The EEOC says that in Mississippi an individual has 180 days from the date of the alleged harm to file a charge. Equal Pay Act claims don't need a charge and have two years, or three if the discrimination was willful. Federal employees must contact their agency's EEO counselor within 45 days.",
        },
        {
          question: "What is the minimum wage in Mississippi?",
          answer:
            "Mississippi has no state minimum wage law, so employers covered by the federal Fair Labor Standards Act must pay the federal minimum wage of $7.25 an hour.",
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Mississippi"} start?`,
          answer:
            "Most discrimination claims start with a charge to the EEOC, whose Jackson Area Office is in the Dr. A. H. McCoy Federal Building, 100 West Capitol Street, Suite 338, Jackson. Complaints about wages under federal law can go to the U.S. Department of Labor's Wage and Hour Division (1-866-487-9243).",
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `Where are deeds recorded${city ? ` for ${city.name}` : " in Mississippi"}?`,
          answer: info?.recording ?? "Land records are filed in the chancery court of the county the property is in.",
        },
        {
          question: "Which court hears eminent domain cases in Mississippi?",
          answer: "County courts have exclusive jurisdiction over eminent domain proceedings.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where are wills and estates handled for someone who lived in ${city.name}?` : "Which court handles wills in Mississippi?",
          answer: info ? info.estates : "The chancery court of the county handles wills and guardianships.",
        },
        {
          question: "What happens if someone dies without a will in Mississippi?",
          answer:
            "Mississippi law decides who inherits. We haven't been able to confirm the shares on an official page, so we don't set them out here — the chancery clerk or a lawyer can explain how they apply.",
        },
        {
          question: "Is there free legal help with wills in Mississippi?",
          answer:
            "The Mississippi Volunteer Lawyers Project (601-960-9577), the Mississippi Center for Legal Services (800-498-1804) and North Mississippi Rural Legal Services (800-898-8731) give free legal help to people who qualify.",
        },
        { question: `Are the estate planning and probate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const MISSISSIPPI: UsStateContent = {
  checked: "23 October 2026",
  jurisdiction: {
    title: "Mississippi law and courts",
    body: `${COURTS} Immigration is governed by federal law. To practise law in Mississippi a lawyer must be a member of The Mississippi Bar.`,
  },
  courtsSummary: COURTS,
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Most discrimination complaints start with a charge to the EEOC (Jackson Area Office) — in Mississippi within 180 days of the harm; complaints about wages under federal law can go to the U.S. Department of Labor's Wage and Hour Division.",
  freeHelp: {
    text: "The Mississippi Center for Legal Services (800-498-1804) and North Mississippi Rural Legal Services (800-898-8731) give free civil legal help. The Mississippi Volunteer Lawyers Project (601-960-9577) and the Mississippi Center for Justice (601-352-2269) also help; The Mississippi Bar lists more pro bono services.",
    links: [
      { label: "Mississippi Center for Legal Services", href: L.mcls },
      { label: "North Mississippi Rural Legal Services", href: L.nmrls },
      { label: "Mississippi Volunteer Lawyers Project", href: L.mvlp },
      { label: "Pro bono services (The Mississippi Bar)", href: L.proBono },
    ],
  },
  courtsSource: { label: "the Mississippi Judiciary's list of chancery clerks and county websites", href: L.chanceryClerks },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Mississippi cities
// ---------------------------------------------------------------------------

const CHANCERY_USE = "Divorce and custody, wills, guardianships and land records";
const MS_COURT_NOTE =
  "Civil lawsuits, including most injury claims, go to the circuit court; county courts share some civil cases, and justice courts hear small claims.";

const HARRISON_GULFPORT = {
  name: "Harrison County Chancery Clerk, Judicial District 1",
  address: "1801 23rd Ave, Gulfport, MS 39501",
  url: L.harrisonClerk,
  use: CHANCERY_USE,
};
const HARRISON_BILOXI = {
  name: "Harrison County Chancery Clerk, Judicial District 2",
  address: "730 Dr. Martin Luther King, Jr. Blvd, Biloxi, MS 39530",
  url: L.harrisonClerk,
  use: CHANCERY_USE,
};
const HARRISON_FAMILY =
  "Divorce and custody cases are heard by the Harrison County Chancery Court. The chancery clerk has two offices: Judicial District 1 at 1801 23rd Ave, Gulfport, and Judicial District 2 at 730 Dr. Martin Luther King, Jr. Blvd, Biloxi.";
const HARRISON_ESTATES =
  "Wills and guardianships are handled by the Harrison County Chancery Court, through the chancery clerk's offices at 1801 23rd Ave, Gulfport (Judicial District 1) and 730 Dr. Martin Luther King, Jr. Blvd, Biloxi (Judicial District 2).";
const HARRISON_RECORDING =
  "In Mississippi, land records are filed in the chancery court. The Harrison County Chancery Clerk handles land recording at its offices in Gulfport (1801 23rd Ave, Judicial District 1) and Biloxi (730 Dr. Martin Luther King, Jr. Blvd, Judicial District 2).";

export const MISSISSIPPI_CITY_INFO: Record<string, UsCityInfo> = {
  "jackson-ms": {
    local:
      "Hinds County has two judicial districts: the chancery clerk for the First Judicial District is in Jackson, and for the Second in Raymond. The EEOC's Jackson Area Office is in the Dr. A. H. McCoy Federal Building, 100 West Capitol Street.",
    courts: [
      {
        name: "Hinds County Chancery Clerk, First Judicial District",
        address: "P.O. Box 686, Jackson, MS 39205-0686 (mailing address)",
        url: L.chanceryClerks,
        use: CHANCERY_USE,
      },
    ],
    courtNote: MS_COURT_NOTE,
    familyCourt:
      "Divorce and custody cases are heard by the chancery court of the county. For Hinds County, the chancery clerk for the First Judicial District is in Jackson (P.O. Box 686, Jackson, MS 39205-0686).",
    estates:
      "Wills and guardianships are handled by the chancery court of the county. For Hinds County, the chancery clerk for the First Judicial District is in Jackson and for the Second Judicial District in Raymond.",
    employmentNote:
      "The EEOC's Jackson Area Office is in the Dr. A. H. McCoy Federal Building, 100 West Capitol Street, Suite 338, Jackson. In Mississippi you have 180 days from the date of the harm to file a charge.",
    recording:
      "In Mississippi, land records are filed in the chancery court. For property in Hinds County's First Judicial District, the chancery clerk is in Jackson (P.O. Box 686, Jackson, MS 39205-0686).",
    recordingLink: { label: "Chancery clerks by county (Mississippi Judiciary)", href: L.chanceryClerks },
  },
  "gulfport-ms": {
    local:
      "Gulfport is in Harrison County, which has two judicial districts. The Harrison County Chancery Clerk's Judicial District 1 office is in Gulfport at 1801 23rd Ave; the Judicial District 2 office is in Biloxi.",
    courts: [HARRISON_GULFPORT, HARRISON_BILOXI],
    courtNote: MS_COURT_NOTE,
    familyCourt: HARRISON_FAMILY,
    estates: HARRISON_ESTATES,
    recording: HARRISON_RECORDING,
    recordingLink: { label: "Harrison County Chancery Clerk", href: L.harrisonClerk },
  },
  "biloxi-ms": {
    local:
      "Biloxi is in Harrison County, which has two judicial districts. The Harrison County Chancery Clerk's Judicial District 2 office is in Biloxi at 730 Dr. Martin Luther King, Jr. Blvd; the Judicial District 1 office is in Gulfport.",
    courts: [HARRISON_BILOXI, HARRISON_GULFPORT],
    courtNote: MS_COURT_NOTE,
    familyCourt: HARRISON_FAMILY,
    estates: HARRISON_ESTATES,
    recording: HARRISON_RECORDING,
    recordingLink: { label: "Harrison County Chancery Clerk", href: L.harrisonClerk },
  },
  "southaven-ms": {
    local:
      "Southaven is in DeSoto County. The DeSoto County Chancery Clerk is in Hernando, at 2535 Highway 51 South; land records and recording are at 311 W South Street, Suite C, Hernando.",
    courts: [
      {
        name: "DeSoto County Chancery Clerk",
        address: "2535 Highway 51 S, Hernando, MS 38632",
        url: L.desotoClerk,
        use: CHANCERY_USE,
      },
    ],
    courtNote: MS_COURT_NOTE,
    familyCourt: "Divorce and custody cases are heard by the DeSoto County Chancery Court; the chancery clerk is at 2535 Highway 51 S, Hernando.",
    estates: "Wills and guardianships are handled by the DeSoto County Chancery Court; the chancery clerk is at 2535 Highway 51 S, Hernando.",
    recording:
      "In Mississippi, land records are filed in the chancery court. The DeSoto County Chancery Clerk's land records and recording office is at 311 W South Street, Suite C, Hernando.",
    recordingLink: { label: "DeSoto County Chancery Clerk", href: L.desotoClerk },
  },
  "tupelo-ms": {
    local: "Tupelo is in Lee County. The Lee County Chancery Clerk's mailing address is P.O. Box 7127, Tupelo, MS 38802.",
    courts: [
      {
        name: "Lee County Chancery Clerk",
        address: "P.O. Box 7127, Tupelo, MS 38802 (mailing address)",
        url: L.chanceryClerks,
        use: CHANCERY_USE,
      },
    ],
    courtNote: MS_COURT_NOTE,
    familyCourt: "Divorce and custody cases are heard by the Lee County Chancery Court; the chancery clerk is in Tupelo (P.O. Box 7127, Tupelo, MS 38802).",
    estates: "Wills and guardianships are handled by the Lee County Chancery Court; the chancery clerk is in Tupelo (P.O. Box 7127, Tupelo, MS 38802).",
    recording:
      "In Mississippi, land records are filed in the chancery court. For property in Lee County, that is the Lee County Chancery Clerk in Tupelo (P.O. Box 7127, Tupelo, MS 38802).",
    recordingLink: { label: "Chancery clerks by county (Mississippi Judiciary)", href: L.chanceryClerks },
  },
  "meridian-ms": {
    local: "Meridian is in Lauderdale County. The Lauderdale County Chancery Clerk's mailing address is P.O. Box 1587, Meridian, MS 39302-1587.",
    courts: [
      {
        name: "Lauderdale County Chancery Clerk",
        address: "P.O. Box 1587, Meridian, MS 39302-1587 (mailing address)",
        url: L.chanceryClerks,
        use: CHANCERY_USE,
      },
    ],
    courtNote: MS_COURT_NOTE,
    familyCourt:
      "Divorce and custody cases are heard by the Lauderdale County Chancery Court; the chancery clerk is in Meridian (P.O. Box 1587, Meridian, MS 39302-1587).",
    estates:
      "Wills and guardianships are handled by the Lauderdale County Chancery Court; the chancery clerk is in Meridian (P.O. Box 1587, Meridian, MS 39302-1587).",
    recording:
      "In Mississippi, land records are filed in the chancery court. For property in Lauderdale County, that is the Lauderdale County Chancery Clerk in Meridian (P.O. Box 1587, Meridian, MS 39302-1587).",
    recordingLink: { label: "Chancery clerks by county (Mississippi Judiciary)", href: L.chanceryClerks },
  },
};
