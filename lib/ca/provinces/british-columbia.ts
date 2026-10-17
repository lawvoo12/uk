// ============================================================================
// BRITISH COLUMBIA — law content and city information for the /ca pages.
//
// Every number below was read on an official source on 3 Oct 2026:
//  - Property transfer tax: 1% to $200,000, 2% to $2,000,000, 3% above, and
//    a further 2% on residential value above $3,000,000: gov.bc.ca
//    "Property transfer tax" (updated 3 Dec 2025)
//  - First time home buyers' program: first $500,000 exempt when the home is
//    worth $835,000 or less, partial exemption up to $860,000 (from
//    1 Apr 2024); citizen or permanent resident; move in within 92 days:
//    gov.bc.ca (updated 20 Jun 2025)
//  - Additional property transfer tax, 20% for foreign entities in Metro
//    Vancouver, the Capital Regional District, Fraser Valley, Central
//    Okanagan and Nanaimo regional districts: gov.bc.ca (updated 20 Jun 2025)
//  - Home Buyer Rescission Period: three business days, 0.25% fee, from
//    3 Jan 2023: BC Financial Services Authority news release
//  - Civil Resolution Tribunal up to $5,000; Provincial Court small claims
//    up to $35,000: gov.bc.ca "Small claims" (updated 12 Aug 2026)
//  - Basic limitation period two years: gov.bc.ca "Limitation Act"
//  - Employment standards complaint within 6 months of the last day of work:
//    gov.bc.ca (updated 1 Aug 2026). Notice / compensation for length of
//    service (1 week after 3 months … maximum 8 weeks): gov.bc.ca
//    "Termination" (updated 31 Jan 2024)
//  - BC Human Rights Tribunal, one year: bchrt.bc.ca "Time limit"
//  - Family property: married spouses and couples who lived together in a
//    marriage-like relationship for at least two years; two-year time limit:
//    gov.bc.ca "Dealing with property and debt" (updated 23 Jun 2026)
//  - Only the Supreme Court can deal with divorce and property division:
//    gov.bc.ca "Which court should I go to?" (updated 23 Jun 2026)
//  - Probate: apply at any BC Supreme Court registry: gov.bc.ca "After a
//    death: deal with wills and estates" (updated 28 Sep 2026)
//  - Intestacy: spouse takes everything if there are no descendants;
//    otherwise $300,000 (or $150,000 if not all the children are also the
//    spouse's) plus half of the rest: gov.bc.ca explanatory notes to Part 3
//    of the Wills, Estates and Succession Act (dated 31 Mar 2014 — re-check
//    against the Act itself)
//  - ICBC Enhanced Care: "not possible to sue for compensation … except in
//    limited circumstances"; disputes go to the Civil Resolution Tribunal:
//    icbc.com
//  - Courthouse addresses and which courts sit where: gov.bc.ca "Courthouse
//    locations". Kelowna is a member municipality of the Regional District of
//    Central Okanagan: rdco.com
//  - The Law Society of British Columbia is still the regulator of lawyers
//    (the Legal Professions Act is not in force): lawsociety.bc.ca
//  - Legal Aid BC: legalaid.bc.ca
//
// LEFT OUT because the official source could not be read:
//  - probate fee amounts (Probate Fee Act — the BC Laws website does not
//    allow automated reading) — the pages link to the Act instead
// Re-check the tax figures after each BC budget (usually February).
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
  type CaCourt,
  type CaProvinceContent,
} from "@/lib/ca/content-shared";

const L = {
  directory: CA_REGULATORS.LSBC.directoryUrl,
  complaints: "https://www.lawsociety.bc.ca/for-the-public/file-a-complaint/",
  legalAid: "https://legalaid.bc.ca/",
  courts: "https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-locations",
  smallClaims: "https://www2.gov.bc.ca/gov/content/justice/courthouse-services/small-claims",
  crt: "https://civilresolutionbc.ca/",
  limitation: "https://www2.gov.bc.ca/gov/content/justice/about-bcs-justice-system/legislation-policy/legislation-updates/limitation-act",
  familyProperty: "https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/dealing-with-property-and-debt",
  whichCourt: "https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/your-options/going-to-court/which-court-should-i-go-to",
  esComplaint: "https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/complaint-process",
  esTermination: "https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/termination",
  hrtTimeLimit: "https://www.bchrt.bc.ca/complaint-process/complain/time-limit/",
  ptt: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax",
  pttFirstTime: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/exemptions/first-time-home-buyers",
  pttForeign: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/additional-property-transfer-tax",
  rescission: "https://www.bcfsa.ca/about-us/news/news-release/bc-rolls-out-new-home-buyer-rescission-period",
  rtb: "https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies",
  estates: "https://www2.gov.bc.ca/gov/content/life-events/death/after-death/wills-estates",
  wesaIntestacy:
    "https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/about-bc-justice-system/legislation-policy/wesa/part3.pdf",
  probateFeeAct: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/99004_01",
  icbcLegal: "https://icbc.com/claims/injury/if-you-want-to-take-legal-action",
  pnp: "https://www.welcomebc.ca/immigrate-to-b-c/about-the-bc-provincial-nominee-program/the-bc-provincial-nominee-program",
};

const REGULATION_ANSWER =
  "To practise law in British Columbia a lawyer must be a member of the Law Society of British Columbia. You can look up any lawyer in the Law Society's public Lawyer Directory, which shows their practising status and any discipline history. Each lawyer on these pages was checked in that directory before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Law Society.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and British Columbia nominates some applicants through the BC Provincial Nominee Program (BC PNP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "The BC Provincial Nominee Program (BC PNP) is the province's route for workers, entrepreneurs and businesses seeking permanent residence in British Columbia.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "BC Provincial Nominee Program", href: L.pnp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting arrangements, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from BC's Family Law Act, which also covers unmarried couples who have lived together for at least two years.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in British Columbia for a full year before applying.",
      "BC's property rules apply to married couples and to unmarried couples who have lived together in a marriage-like relationship for at least two years. Property acquired during the relationship is generally shared equally; property brought into it is kept, but its increase in value can be divided.",
      "The time limit to ask a court to divide property is two years after a divorce order for married couples, and two years from the date of separation for unmarried couples.",
      "Only the Supreme Court can deal with divorce and property division. The Provincial Court can deal with parenting arrangements, child support, spousal support and protection orders.",
      "Legal Aid BC provides free legal information, advice and representation in family matters to people who qualify.",
    ],
    links: [
      { label: "Dealing with property and debt", href: L.familyProperty },
      { label: "Which court should I go to?", href: L.whichCourt },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "Legal Aid BC", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. In British Columbia, under ICBC's Enhanced Care model it is not possible to sue for compensation after a crash except in limited circumstances; other injury claims can still go to court. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Under ICBC's Enhanced Care insurance model it is not possible to sue for compensation after a crash except in limited circumstances — for example, where the at-fault driver is convicted of certain Criminal Code offences such as impaired driving.",
      "Disputes with ICBC — about entitlement to benefits, vehicle damage and some personal injury damages — go to the Civil Resolution Tribunal rather than the courts.",
      "Other injury claims, such as falls and medical negligence, can still be brought in court. BC has a single two-year basic limitation period for civil claims.",
      "The Civil Resolution Tribunal decides most small claims up to $5,000, the Provincial Court hears small claims up to $35,000, and larger claims go to the Supreme Court.",
    ],
    links: [
      { label: "ICBC: if you want to take legal action", href: L.icbcLegal },
      { label: "Civil Resolution Tribunal", href: L.crt },
      { label: "BC Limitation Act", href: L.limitation },
      { label: "Small claims in BC", href: L.smallClaims },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most BC workers are covered by the Employment Standards Act; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "An employment standards complaint must be filed with BC's Employment Standards Branch within six months of your last day of work.",
      "The minimum notice or pay when a job ends ('compensation for length of service') is one week after three months, two weeks after 12 months and three weeks after three years, plus one more week for each additional year up to eight weeks. Courts often award more ('reasonable notice') unless a valid contract limits it.",
      "BC has a two-year basic limitation period for civil claims, which includes wrongful dismissal lawsuits. Claims up to $35,000 can go to the Provincial Court's small claims division.",
      "Discrimination and harassment complaints go to the BC Human Rights Tribunal, which has a one-year time limit.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "Employment standards complaint process", href: L.esComplaint },
      { label: "Termination and compensation for length of service", href: L.esTermination },
      { label: "BC Human Rights Tribunal: time limit", href: L.hrtTimeLimit },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In British Columbia buyers pay property transfer tax when the transfer is registered at the Land Title Office, and foreign buyers pay an additional 20% in several regions.",
    points: [
      "BC property transfer tax is 1% of the fair market value up to $200,000, 2% from $200,000 to $2 million, and 3% above $2 million. A further 2% applies to the residential value above $3 million.",
      "Under the first time home buyers' program, the first $500,000 is exempt when the home is worth $835,000 or less, with a partial exemption up to $860,000. You must be a Canadian citizen or permanent resident and move in within 92 days.",
      "Foreign entities pay an additional 20% property transfer tax on residential property in Metro Vancouver, the Capital Regional District, and the Fraser Valley, Central Okanagan and Nanaimo regional districts.",
      "Buyers of residential property can back out of an accepted offer within three business days (the Home Buyer Rescission Period), paying the seller a fee of 0.25% of the price.",
      "Disputes between residential landlords and tenants go to the Residential Tenancy Branch.",
    ],
    links: [
      { label: "BC property transfer tax", href: L.ptt },
      { label: "First time home buyers' program", href: L.pttFirstTime },
      { label: "Additional property transfer tax", href: L.pttForeign },
      { label: "Home Buyer Rescission Period", href: L.rescission },
      { label: "Residential Tenancy Branch", href: L.rtb },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. In British Columbia a grant of probate comes from the Supreme Court, and the Wills, Estates and Succession Act sets out who inherits when there is no will.",
    points: [
      "Probate is a court-supervised process that checks a will is real and is the last one the person made. You can apply for a grant of probate in any BC Supreme Court registry.",
      "Probate fees depend on the value of the estate and are set by the Probate Fee Act.",
      "If there is no will and no descendants, the spouse inherits the whole estate. If there are descendants, the spouse receives $300,000 — or $150,000 if not all the children are also the spouse's — plus half of the rest, and the descendants share the other half.",
      "If there is no will, someone can apply for a grant of administration. If no one is willing or able, the Public Guardian and Trustee of British Columbia may administer the estate.",
    ],
    links: [
      { label: "After a death: wills and estates", href: L.estates },
      { label: "Dying without a will: explanatory notes (BC government)", href: L.wesaIntestacy },
      { label: "Probate Fee Act", href: L.probateFeeAct },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "British Columbia";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the BC Provincial Nominee Program?",
          answer:
            "The BC PNP is British Columbia's immigration program for workers, entrepreneurs and businesses seeking permanent residence in the province. See the BC government's WelcomeBC website for the current streams and requirements.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in British Columbia?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in British Columbia for a full year before applying.",
        },
        {
          question: "How is property divided when a relationship ends in British Columbia?",
          answer:
            "Under BC's Family Law Act, couples generally share equally any property acquired during their relationship. Property each person brought into the relationship is kept, but its increase in value can be divided. The time limit to ask a court for an order is two years after a divorce order for married couples, or two years from the date of separation for unmarried couples.",
        },
        {
          question: "Do common-law partners have the same property rights in British Columbia?",
          answer:
            "Yes, if they lived together in a marriage-like relationship for at least two years. BC's property division rules apply to them in the same way as to married couples. This is different from some other provinces, such as Ontario.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in British Columbia"}?`,
          answer: info
            ? `${info.familyCourt} In BC only the Supreme Court can deal with divorce and property division; the Provincial Court can deal with parenting arrangements, child support, spousal support and protection orders.`
            : "Only the Supreme Court can deal with divorce and property division. The Provincial Court can deal with parenting arrangements, child support, spousal support and protection orders, and the Supreme Court can deal with those too.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Can I sue after a car crash in British Columbia?",
          answer:
            "Usually not. Under ICBC's Enhanced Care model it is not possible to sue for compensation except in limited circumstances — for example, if the at-fault driver is convicted of certain Criminal Code offences such as impaired driving. Instead, ICBC provides benefits, and disputes with ICBC go to the Civil Resolution Tribunal.",
        },
        {
          question: "How long do I have to start an injury claim in British Columbia?",
          answer:
            "BC has a single two-year basic limitation period for civil claims. Time limits also apply to disputes with ICBC at the Civil Resolution Tribunal. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "Where are injury claims decided in British Columbia?",
          answer:
            "Disputes with ICBC about benefits, vehicle damage and some personal injury damages go to the Civil Resolution Tribunal. Other claims go to court: the Civil Resolution Tribunal decides most small claims up to $5,000, the Provincial Court hears small claims up to $35,000, and larger claims go to the Supreme Court.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in British Columbia?",
          answer:
            "An employment standards complaint must be filed within six months of your last day of work. The BC Human Rights Tribunal has a one-year time limit. BC's basic limitation period for a court claim, including wrongful dismissal, is two years. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in British Columbia?",
          answer:
            "The Employment Standards Act minimum is one week's notice or pay after three months, two weeks after 12 months and three weeks after three years, plus one more week for each additional year to a maximum of eight weeks. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.",
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in British Columbia"} be heard?`,
          answer: `Employment standards complaints go to the Employment Standards Branch and human rights complaints to the BC Human Rights Tribunal. Lawsuits up to $35,000 can go to the Provincial Court's small claims division, and larger claims to the Supreme Court${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `How much is property transfer tax on a home${city ? ` in ${city.name}` : " in British Columbia"}?`,
          answer:
            "BC property transfer tax is 1% of the fair market value up to $200,000, 2% from $200,000 to $2 million, and 3% above $2 million. A further 2% applies to the residential value above $3 million. The tax return is filed, and the tax paid, when the transfer is registered at the Land Title Office.",
        },
        {
          question: "Is there a property transfer tax break for first-time buyers in British Columbia?",
          answer:
            "Yes. Under the first time home buyers' program, the first $500,000 is exempt when the home's fair market value is $835,000 or less, and there is a partial exemption for homes worth up to $860,000. You must be a Canadian citizen or permanent resident, meet the BC residency test, never have owned a principal residence anywhere in the world, and move in within 92 days.",
        },
        {
          question: `Do foreign buyers pay extra tax${city ? ` in ${city.name}` : " in British Columbia"}?`,
          answer:
            "Foreign entities pay an additional 20% property transfer tax on residential property in Metro Vancouver, the Capital Regional District (which includes Victoria), the Regional District of Central Okanagan (which includes Kelowna), and the Fraser Valley and Nanaimo regional districts.",
        },
        {
          question: "Can I change my mind after my offer on a home is accepted in British Columbia?",
          answer:
            "Yes, for a short time. The Home Buyer Rescission Period gives buyers of residential property the right to rescind up to three business days after the offer is accepted. A buyer who rescinds pays the seller a fee of 0.25% of the price.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in British Columbia"} dealt with?`,
          answer:
            "The Residential Tenancy Branch deals with disputes between residential landlords and tenants. Disputes over ownership go to the courts.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in British Columbia?",
          answer: info
            ? info.estates
            : "You can apply for a grant of probate — or, if there is no will, a grant of administration — in any BC Supreme Court registry.",
        },
        {
          question: "How much does probate cost in British Columbia?",
          answer:
            "Probate fees depend on the value of the estate and are set by BC's Probate Fee Act. Ask the Supreme Court registry or a lawyer for the fee on your estate. Legal fees are separate.",
        },
        {
          question: "What happens if someone dies without a will in British Columbia?",
          answer:
            "The Wills, Estates and Succession Act decides who inherits. If there is a spouse and no descendants, the spouse inherits the whole estate. If there are descendants, the spouse receives $300,000 — or $150,000 if not all the children are also the spouse's children — plus half of the rest, and the descendants share the other half. Someone must apply for a grant of administration to deal with the estate.",
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const BRITISH_COLUMBIA: CaProvinceContent = {
  checked: "3 October 2026",
  jurisdiction: {
    title: "British Columbia law and courts",
    body: "The Supreme Court of British Columbia hears larger civil claims and is the only court that can deal with divorce and property division. The Provincial Court hears small claims up to $35,000 and family matters such as parenting and support. The Civil Resolution Tribunal decides most small claims up to $5,000. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Law Society of British Columbia, which also deals with complaints about them.",
  },
  courtsSummary:
    "The Supreme Court of British Columbia hears larger civil claims and is the only court that can deal with divorce and property division; the Provincial Court hears small claims up to $35,000 and family matters such as parenting and support.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Employment standards complaints go to BC's Employment Standards Branch within six months of your last day of work, and human rights complaints go to the BC Human Rights Tribunal, which has a one-year time limit.",
  freeHelp: {
    text: "Legal Aid BC provides free legal information, advice and representation to people in British Columbia who qualify, including in family, child protection and immigration matters.",
    links: [{ label: "Legal Aid BC", href: L.legalAid }],
  },
  courtsSource: { label: "BC courthouse locations (gov.bc.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// British Columbia cities
// ---------------------------------------------------------------------------

const NEW_WESTMINSTER: CaCourt = {
  name: "New Westminster Law Courts",
  address: "651 Carnarvon Street, New Westminster, BC V3M 1C9",
  url: L.courts,
  use: "Supreme Court and Provincial Court",
};

export const BC_CITY_INFO: Record<string, CaCityInfo> = {
  vancouver: {
    local:
      "Vancouver has separate courthouses for its two trial courts. The Law Courts at 800 Smithe Street house the Supreme Court, where divorce, property division, probate and larger civil cases are heard, and the Provincial Court at Robson Square, 800 Hornby Street, deals with small claims and family cases. Vancouver is in the Metro Vancouver Regional District, one of the areas where foreign buyers pay the additional 20% property transfer tax.",
    courts: [
      {
        name: "Vancouver Law Courts",
        address: "800 Smithe Street, Vancouver, BC V6Z 2E1",
        url: L.courts,
        use: "Supreme Court of British Columbia",
      },
      {
        name: "Robson Square Provincial Court",
        address: "800 Hornby Street, Vancouver, BC V6Z 2C5",
        url: L.courts,
        use: "Provincial Court — small claims and family",
      },
    ],
    familyCourt:
      "For Vancouver, divorce and property division go to the Supreme Court at the Vancouver Law Courts, 800 Smithe Street. Parenting, support and protection orders can also be dealt with by the Provincial Court at Robson Square, 800 Hornby Street.",
    estates:
      "You can apply for a grant of probate in any BC Supreme Court registry. In Vancouver the Supreme Court is at the Law Courts, 800 Smithe Street.",
  },
  surrey: {
    local:
      "Surrey's courthouse at 14340 57 Avenue is a Provincial Court, which hears small claims and family cases such as parenting and support. The province's list of court locations has no Supreme Court in Surrey, so divorce, property division and probate go to a Supreme Court registry elsewhere — the New Westminster Law Courts are nearby. Surrey is in the Metro Vancouver Regional District, where foreign buyers pay the additional 20% property transfer tax.",
    courts: [
      {
        name: "Surrey Provincial Court",
        address: "14340 57 Avenue, Surrey, BC V3X 1B2",
        url: L.courts,
        use: "Provincial Court — small claims and family",
      },
      NEW_WESTMINSTER,
    ],
    courtNote: "The Supreme Court does not sit in Surrey; New Westminster is a nearby Supreme Court location.",
    familyCourt:
      "For Surrey, parenting, support and protection orders can be dealt with at the Surrey Provincial Court, 14340 57 Avenue. Divorce and property division must go to the Supreme Court, which does not sit in Surrey — the New Westminster Law Courts are a nearby Supreme Court location.",
    estates:
      "You can apply for a grant of probate in any BC Supreme Court registry. There is no Supreme Court registry in Surrey; the New Westminster Law Courts, 651 Carnarvon Street, are nearby.",
  },
  victoria: {
    local:
      "The Victoria Law Courts at 850 Burdett Avenue house both the Supreme Court and the Provincial Court, so family, small claims, probate and larger civil cases for the city are heard in one building. Victoria is the provincial capital and is in the Capital Regional District, one of the areas where foreign buyers pay the additional 20% property transfer tax.",
    courts: [
      {
        name: "Victoria Law Courts",
        address: "850 Burdett Avenue, Victoria, BC V8W 9J2",
        url: L.courts,
        use: "Supreme Court and Provincial Court",
      },
    ],
    familyCourt:
      "For Victoria, both the Supreme Court and the Provincial Court sit at the Victoria Law Courts, 850 Burdett Avenue. Divorce and property division go to the Supreme Court; parenting, support and protection orders can also be dealt with by the Provincial Court.",
    estates:
      "You can apply for a grant of probate in any BC Supreme Court registry. In Victoria the Supreme Court is at the Victoria Law Courts, 850 Burdett Avenue.",
  },
  kelowna: {
    local:
      "The Kelowna Law Courts at 1355 Water Street house both the Supreme Court and the Provincial Court, so family, small claims, probate and larger civil cases for the city are heard in one building. Kelowna is in the Regional District of Central Okanagan, one of the areas where foreign buyers pay the additional 20% property transfer tax.",
    courts: [
      {
        name: "Kelowna Law Courts",
        address: "1355 Water Street, Kelowna, BC V1Y 9R3",
        url: L.courts,
        use: "Supreme Court and Provincial Court",
      },
    ],
    familyCourt:
      "For Kelowna, both the Supreme Court and the Provincial Court sit at the Kelowna Law Courts, 1355 Water Street. Divorce and property division go to the Supreme Court; parenting, support and protection orders can also be dealt with by the Provincial Court.",
    estates:
      "You can apply for a grant of probate in any BC Supreme Court registry. In Kelowna the Supreme Court is at the Kelowna Law Courts, 1355 Water Street.",
  },
};
