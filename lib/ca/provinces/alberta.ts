// ============================================================================
// ALBERTA — law content and city information for the /ca pages.
//
// Every number below was read on an official source on 3 Oct 2026:
//  - Court of King's Bench has "sole jurisdiction over divorce and the
//    division of property": albertacourts.ca (King's Bench, Family)
//  - Alberta Court of Justice hears child and spousal support, parenting,
//    guardianship and child protection, and cannot decide divorce or
//    property: albertacourts.ca (Court of Justice, Family)
//  - Alberta Court of Justice civil claims up to $100,000; time limit
//    "generally two years from the date of injury or damage":
//    albertacourts.ca (Court of Justice, Civil / Before you sue)
//  - Employment standards complaint "up to 6 months after your last day of
//    employment": alberta.ca "File an employment standards complaint"
//    (published 22 May 2025)
//  - Termination notice: none at 90 days or less; 1 week (more than 90 days,
//    less than 2 years), 2 weeks (2 to 4 years), 4 weeks (4 to 6), 5 weeks
//    (6 to 8), 6 weeks (8 to 10), 8 weeks (10 years or more): alberta.ca
//    "Termination and termination pay" (published 27 Aug 2026)
//  - Alberta Human Rights Commission: one year: albertahumanrights.ab.ca
//  - Family Property Act applies to married spouses and adult interdependent
//    partners from 1 Jan 2020; partners have 2 years from when they knew (or
//    should have known) the relationship ended; adult interdependent partner
//    = lived together 3 years, or less with a child, or signed an agreement:
//    alberta.ca "Dividing property between unmarried partners" (updated
//    23 Jan 2026)
//  - Land Titles fees: transfer of land $50 + $5 per $5,000 of value;
//    mortgage $50 + $5 per $5,000 of principal: alberta.ca Land Titles and
//    Surveys fee schedule (effective 1 Oct 2026)
//  - Residential Tenancy Dispute Resolution Service: claims up to $100,000:
//    alberta.ca (published 4 Mar 2026)
//  - Probate fees $35 / $135 / $275 / $400 / $525 by net value of property
//    in Alberta: alberta.ca "Court fees" (published 23 Sep 2026)
//  - Care-First auto insurance starts 1 Jan 2027; today not-at-fault drivers
//    "can sue in most circumstances, except for narrowly defined minor
//    injuries": alberta.ca "Care-First auto insurance" (published 21 Sep 2026)
//  - Alberta Advantage Immigration Program: alberta.ca
//  - Legal Aid Alberta (areas of help, phone number): legalaid.ab.ca
//  - Lawyer Directory shows discipline history back to 1 Jan 2015:
//    lawsociety.ab.ca "Find a Lawyer"
//  - Courthouse and Land Titles office addresses: albertacourts.ca and
//    alberta.ca "Land Titles – Overview" (published 21 Aug 2026)
//  - Edmonton is the capital: canada.ca "Provinces and territories"
//
// LEFT OUT because the official source could not be read (the Alberta King's
// Printer website does not allow automated reading) — the pages link to the
// official source instead:
//  - the share a spouse or partner inherits when there is no will
//  - the time limit for MARRIED spouses to apply to divide property
//  - the minor injury cap amount (two alberta.ca pages show different figures)
//  - the 10-year "ultimate" limitation period
// The pages also do not say "Alberta has no land transfer tax": no official
// page states that in words, so they only describe the fees that are charged.
// Re-check the personal injury section after 1 Jan 2027 (Care-First).
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { CaCity } from "@/lib/ca/cities";
import { CA_REGULATORS } from "@/lib/ca/regulators";
import {
  CA_LINKS,
  FED_FAQS,
  FED_POINTS,
  type CaAreaContent,
  type CaCityInfo,
  type CaProvinceContent,
} from "@/lib/ca/content-shared";

const L = {
  directory: CA_REGULATORS.LSA.directoryUrl,
  findALawyer: "https://www.lawsociety.ab.ca/public/findalawyer/",
  complaints: "https://www.lawsociety.ab.ca/public/complaints/how-to-make-a-complaint/",
  legalAid: "https://www.legalaid.ab.ca/",
  courts: "https://www.alberta.ca/alberta-court-locations",
  kbFamily: "https://www.albertacourts.ca/kb/areas-of-law/family",
  cjFamily: "https://www.albertacourts.ca/cj/areas-of-law/family",
  cjCivil: "https://www.albertacourts.ca/cj/areas-of-law/civil",
  beforeYouSue: "https://albertacourts.ca/cj/areas-of-law/civil/claims/before-you-sue",
  esComplaint: "https://www.alberta.ca/file-employment-standards-complaint",
  esTermination: "https://www.alberta.ca/termination-pay",
  humanRights: "https://albertahumanrights.ab.ca/complaints/making-a-complaint/",
  familyProperty: "https://www.alberta.ca/dividing-property-between-unmarried-partners",
  familyPropertyAct: "https://kings-printer.alberta.ca/documents/Acts/F04P7.pdf",
  landTitles: "https://www.alberta.ca/land-titles-overview",
  landTitlesFees: "https://www.alberta.ca/system/files/sartr-land-titles-and-surveys-common-documents-fee-schedule.pdf",
  rtdrs: "https://www.alberta.ca/residential-tenancy-dispute-resolution-service",
  wills: "https://www.alberta.ca/wills-in-alberta",
  courtFees: "https://www.alberta.ca/court-fees",
  willsAct: "https://kings-printer.alberta.ca/documents/acts/w12p2.pdf",
  careFirst: "https://www.alberta.ca/care-first-auto-insurance",
  aaip: "https://www.alberta.ca/alberta-advantage-immigration-program",
};

const REGULATION_ANSWER =
  "To practise law in Alberta a lawyer must be a member of the Law Society of Alberta. You can look up any lawyer in the Law Society's public Lawyer Directory, which shows whether they are currently practising and any discipline history back to 1 January 2015. Each lawyer on these pages was checked in that directory before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Law Society.";

const NOTICE =
  "one week after more than 90 days' employment, two weeks after two years, four weeks after four years, five weeks after six years, six weeks after eight years and eight weeks after ten years or more";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and Alberta nominates some applicants through the Alberta Advantage Immigration Program (AAIP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "The Alberta Advantage Immigration Program (AAIP) is an economic immigration program that nominates people for permanent residence in Alberta.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "Alberta Advantage Immigration Program", href: L.aaip },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from Alberta's Family Property Act, which since 2020 also covers 'adult interdependent partners' — Alberta's term for couples who live together without marrying.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in Alberta for a full year before applying.",
      "Alberta's Family Property Act applies to married spouses and, since 1 January 2020, to adult interdependent partners.",
      "Adult interdependent partners are two people who have lived together in a relationship of interdependence for at least three years, or for less time if they have a child together, or who have signed an adult interdependent partner agreement.",
      "An adult interdependent partner must make a property claim within two years of when they knew, or should have known, that the relationship had ended. Time limits also apply to married spouses — ask a lawyer which applies to you.",
      "Only the Court of King's Bench can grant a divorce and divide property. The Alberta Court of Justice can deal with child and spousal support, parenting and guardianship.",
    ],
    links: [
      { label: "Dividing property between unmarried partners", href: L.familyProperty },
      { label: "Family Property Act", href: L.familyPropertyAct },
      { label: "Court of King's Bench: family law", href: L.kbFamily },
      { label: "Alberta Court of Justice: family", href: L.cjFamily },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. Alberta's auto insurance rules are changing: a new 'Care-First' system starts on 1 January 2027 and will restrict the right to sue after a crash in most cases. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Under the current system, a driver who is not at fault can sue in most circumstances, except for narrowly defined minor injuries, where the amount for pain and suffering is capped.",
      "From 1 January 2027, Alberta's Care-First auto insurance system replaces pain and suffering damages with benefits paid by your own insurer. You will be able to sue only if the at-fault driver is found guilty of certain serious offences, such as impaired or dangerous driving, or for losses above what the insurance pays.",
      "The time limit to start a civil claim is generally two years from the date of the injury or damage.",
      "The Alberta Court of Justice hears civil claims up to $100,000. Larger claims go to the Court of King's Bench.",
    ],
    links: [
      { label: "Care-First auto insurance (Government of Alberta)", href: L.careFirst },
      { label: "Before you sue (Alberta Court of Justice)", href: L.beforeYouSue },
      { label: "Alberta Court of Justice: civil claims", href: L.cjCivil },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most Alberta workers are covered by the Employment Standards Code; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "An employment standards complaint can be made while you are still employed, and at any time up to six months after your last day of employment.",
      `The minimum termination notice (or pay instead) is ${NOTICE}. No notice is required in the first 90 days. Courts often award more ('reasonable notice') unless a valid contract limits it.`,
      "The time limit to start a court claim, including a wrongful dismissal lawsuit, is generally two years. Claims up to $100,000 can go to the Alberta Court of Justice.",
      "Discrimination complaints go to the Alberta Human Rights Commission, and must be made within one year of the discriminatory act or treatment.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "File an employment standards complaint", href: L.esComplaint },
      { label: "Termination and termination pay", href: L.esTermination },
      { label: "Alberta Human Rights Commission: making a complaint", href: L.humanRights },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In Alberta, ownership changes when the transfer is registered at the Land Titles Office, and the buyer pays registration fees based on the property's value and the size of the mortgage.",
    points: [
      "Registering a transfer of land costs $50 plus $5 for every $5,000 of the property's value. Registering a mortgage costs $50 plus $5 for every $5,000 of the amount borrowed.",
      "On a $500,000 home bought with a $400,000 mortgage, that works out to $550 for the transfer and $450 for the mortgage.",
      "Alberta has two Land Titles offices: one in Edmonton and one in Calgary.",
      "Disputes between residential landlords and tenants can go to the Residential Tenancy Dispute Resolution Service (RTDRS), which can deal with claims up to $100,000, or to court.",
    ],
    links: [
      { label: "Land Titles: overview", href: L.landTitles },
      { label: "Land Titles fee schedule", href: L.landTitlesFees },
      { label: "Residential Tenancy Dispute Resolution Service", href: L.rtdrs },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. In Alberta the Court of King's Bench issues grants of probate and administration, and the Wills and Succession Act sets out who inherits when there is no will.",
    points: [
      "The Court of King's Bench oversees probate — the official proving of a will — and the administration of estates.",
      "The court fee for a grant of probate or administration depends on the net value of the property in Alberta: $35 up to $10,000, $135 up to $25,000, $275 up to $125,000, $400 up to $250,000 and $525 above $250,000.",
      "If you die without a will, the Wills and Succession Act sets out how and to whom your property is transferred. The share for a spouse or adult interdependent partner depends on whether there are children from another relationship — see the Act or ask a lawyer.",
    ],
    links: [
      { label: "Wills in Alberta", href: L.wills },
      { label: "Court fees", href: L.courtFees },
      { label: "Wills and Succession Act", href: L.willsAct },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "Alberta";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the Alberta Advantage Immigration Program?",
          answer:
            "The Alberta Advantage Immigration Program (AAIP) is an economic immigration program that nominates people for permanent residence in Alberta. See the Government of Alberta's website for the current streams and requirements.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Alberta?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in Alberta for a full year before applying.",
        },
        {
          question: "Do common-law partners have property rights in Alberta?",
          answer:
            "Yes, if they are 'adult interdependent partners'. Since 1 January 2020 Alberta's Family Property Act applies to adult interdependent partners as well as married spouses. That means two people who have lived together in a relationship of interdependence for at least three years, or for less time if they have a child together, or who have signed an adult interdependent partner agreement.",
        },
        {
          question: "Is there a time limit to divide property in Alberta?",
          answer:
            "Yes. An adult interdependent partner must make a claim within two years of when they knew, or should have known, that the relationship had ended. Time limits also apply to married spouses under the Family Property Act — a lawyer can confirm the date that applies to you.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in Alberta"}?`,
          answer: info
            ? `${info.familyCourt} Only the Court of King's Bench can grant a divorce and divide property; the Alberta Court of Justice can deal with child and spousal support, parenting and guardianship.`
            : "Only the Court of King's Bench can grant a divorce and divide property. The Alberta Court of Justice can deal with child and spousal support, parenting and guardianship, and the Court of King's Bench can deal with those too.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Can I sue after a car crash in Alberta?",
          answer:
            "Today, a driver who is not at fault can sue in most circumstances, except for narrowly defined minor injuries. That changes on 1 January 2027, when Alberta's Care-First auto insurance system starts: benefits will come from your own insurer, and you will be able to sue only if the at-fault driver is found guilty of certain serious offences or your losses are more than the insurance pays.",
        },
        {
          question: "How long do I have to start an injury claim in Alberta?",
          answer:
            "The time limit is generally two years from the date of the injury or damage. Do not leave it to the last minute — a lawyer can confirm the date that applies to you.",
        },
        {
          question: "Where are injury claims decided in Alberta?",
          answer:
            "The Alberta Court of Justice hears civil claims up to $100,000. Larger claims go to the Court of King's Bench.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in Alberta?",
          answer:
            "An employment standards complaint can be made up to six months after your last day of employment. A human rights complaint must be made within one year. The time limit for a court claim, including wrongful dismissal, is generally two years. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in Alberta?",
          answer: `The Employment Standards Code minimum is ${NOTICE}; no notice is required in the first 90 days. Your employer can give notice, pay instead, or a mix of both. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.`,
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Alberta"} be heard?`,
          answer: `Employment standards complaints go to Alberta Employment Standards and discrimination complaints to the Alberta Human Rights Commission. Lawsuits up to $100,000 can go to the Alberta Court of Justice, and larger claims to the Court of King's Bench${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `What does it cost to register a home purchase${city ? ` in ${city.name}` : " in Alberta"}?`,
          answer:
            "Alberta's Land Titles Office charges $50 plus $5 for every $5,000 of the property's value to register the transfer, and $50 plus $5 for every $5,000 of the amount borrowed to register a mortgage. On a $500,000 home with a $400,000 mortgage that is $550 and $450. Your lawyer's fees are separate.",
        },
        {
          question: "When does the buyer become the owner of a home in Alberta?",
          answer:
            "When the transfer of land is registered at the Land Titles Office. Alberta has Land Titles offices in Edmonton and Calgary, and your lawyer normally submits the documents for you.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in Alberta"} dealt with?`,
          answer:
            "The Residential Tenancy Dispute Resolution Service (RTDRS) is a tribunal for disputes between residential landlords and tenants. It can deal with claims up to $100,000. Disputes can also go to court.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in Alberta?",
          answer: info
            ? info.estates
            : "Applications for a grant of probate — or, if there is no will, a grant of administration — go to the Court of King's Bench.",
        },
        {
          question: "How much does probate cost in Alberta?",
          answer:
            "The court fee depends on the net value of the property in Alberta: $35 for $10,000 or less, $135 up to $25,000, $275 up to $125,000, $400 up to $250,000 and $525 above $250,000. Legal fees are separate.",
        },
        {
          question: "What happens if someone dies without a will in Alberta?",
          answer:
            "The Wills and Succession Act sets out how and to whom the property is transferred. What a spouse or adult interdependent partner receives depends on whether the person who died had children from another relationship. Someone must apply for a grant of administration to deal with the estate. See the Act or ask a lawyer for the shares that apply.",
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const ALBERTA: CaProvinceContent = {
  checked: "3 October 2026",
  jurisdiction: {
    title: "Alberta law and courts",
    body: "The Court of King's Bench of Alberta hears civil claims over $100,000 and is the only court that can grant a divorce and divide property. The Alberta Court of Justice hears civil claims up to $100,000 and family matters such as parenting and support. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Law Society of Alberta, which also deals with complaints about them.",
  },
  courtsSummary:
    "The Court of King's Bench of Alberta hears civil claims over $100,000 and is the only court that can grant a divorce and divide property; the Alberta Court of Justice hears civil claims up to $100,000 and family matters such as parenting and support.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Employment standards complaints go to Alberta Employment Standards up to six months after your last day of employment, and discrimination complaints go to the Alberta Human Rights Commission within one year.",
  freeHelp: {
    text: "Legal Aid Alberta is a publicly funded, non-profit organisation that provides affordable legal services in family law, domestic violence, child welfare, immigration, and youth and adult criminal defence. You can apply by phone on 1-866-845-3425.",
    links: [{ label: "Legal Aid Alberta", href: L.legalAid }],
  },
  courtsSource: { label: "Alberta court locations (alberta.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Alberta cities
// ---------------------------------------------------------------------------

export const ALBERTA_CITY_INFO: Record<string, CaCityInfo> = {
  calgary: {
    local:
      "Calgary's two trial courts share one building: both the Court of King's Bench and the Alberta Court of Justice sit at the Calgary Courts Centre, 601 5th Street SW. The Court of Appeal of Alberta also sits in Calgary, in a separate building at 450 1st Street SW. For home buyers, the southern Land Titles Office is at 710 4th Avenue SW.",
    courts: [
      {
        name: "Calgary Courts Centre",
        address: "601 5th Street SW, Calgary, AB T2P 5P7",
        url: "https://albertacourts.ca/kb/about/locations-and-sittings/location-detail/calgary2",
        use: "Court of King's Bench and Alberta Court of Justice",
      },
    ],
    familyCourt:
      "For Calgary, both the Court of King's Bench and the Alberta Court of Justice sit at the Calgary Courts Centre, 601 5th Street SW. Divorce and property division go to the Court of King's Bench; support, parenting and guardianship can also be dealt with by the Alberta Court of Justice.",
    estates:
      "Applications for a grant of probate — or, if there is no will, a grant of administration — go to the Court of King's Bench. In Calgary the Court of King's Bench sits at the Calgary Courts Centre, 601 5th Street SW.",
  },
  edmonton: {
    local:
      "Edmonton is Alberta's capital. The Court of King's Bench, the Alberta Court of Justice and the Court of Appeal all sit in the Edmonton Law Courts at 1A Sir Winston Churchill Square. For home buyers, the northern Land Titles Office is in the John E. Brownlee Building, 10365 97 Street NW.",
    courts: [
      {
        name: "Edmonton Law Courts",
        address: "1A Sir Winston Churchill Square, Edmonton, AB T5J 0R2",
        url: "https://albertacourts.ca/kb/about/locations-and-sittings/location-detail/edmonton",
        use: "Court of King's Bench and Alberta Court of Justice",
      },
    ],
    familyCourt:
      "For Edmonton, both the Court of King's Bench and the Alberta Court of Justice sit at the Edmonton Law Courts, 1A Sir Winston Churchill Square. Divorce and property division go to the Court of King's Bench; support, parenting and guardianship can also be dealt with by the Alberta Court of Justice.",
    estates:
      "Applications for a grant of probate — or, if there is no will, a grant of administration — go to the Court of King's Bench. In Edmonton the Court of King's Bench sits at the Edmonton Law Courts, 1A Sir Winston Churchill Square.",
  },
};
