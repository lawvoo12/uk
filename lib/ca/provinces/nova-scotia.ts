// ============================================================================
// NOVA SCOTIA — law content and city information for the /ca pages.
//
// The regulator is still called the Nova Scotia Barristers' Society: checked
// on nsbs.org and in the Legal Profession Act (consolidation current to
// 1 Apr 2026).
//
// Every number below was read on an official source on 4 Oct 2026:
//  - The Supreme Court (Family Division) has covered the whole province
//    since its expansion from March 2020: courts.ns.ca
//  - Small Claims Court: up to $25,000; general damages up to $100:
//    courts.ns.ca
//  - Limitation periods: two years from discovery, 15 years ultimate:
//    Limitation of Actions Act, s. 8 (nslegislature.ca — the consolidation
//    read is marked 2016)
//  - Labour standards complaint within 6 months: novascotia.ca and the Guide
//    to the Labour Standards Code (October 2026)
//  - Notice of termination: 1 week (3 months to under 2 years), 2 weeks (2 to
//    under 5 years), 4 weeks (5 to under 10), 8 weeks (10 years or more); an
//    employee with 10 or more years' service cannot be fired without just
//    cause: novascotia.ca/lae/employmentrights
//  - Human rights complaint within 12 months: humanrights.novascotia.ca
//  - Matrimonial Property Act "only applies to married couples, or couples
//    who are in a registered domestic partnership … does not apply to common
//    law couples"; equal division: nsfamilylaw.ca
//  - Deed transfer tax is set by each municipality; Halifax Regional
//    Municipality charges 1.5% of the purchase price, and deeds must be
//    registered within 10 days: novascotia.ca (4 Dec 2025) and halifax.ca
//  - Non-resident Provincial Deed Transfer Tax 10% from 1 Apr 2025, on
//    residential property with three units or less, with an exemption for
//    people who move to Nova Scotia within 6 months: novascotia.ca (23 Sep
//    2025) and news release of 7 Aug 2026
//  - Land registry: $100 to register or record a document: novascotia.ca
//    (29 Sep 2026)
//  - Residential Tenancies Program: application fee $31.15; apply up to one
//    year after the tenancy ends: novascotia.ca (24 Nov 2025)
//  - Probate tax: $85.60 / $215.20 / $358.15 / $1,002.65, then $16.95 per
//    $1,000 above $100,000: Probate Act, s. 87(2) (nslegislature.ca)
//  - No will: spouse takes everything if there are no children; otherwise
//    the first $50,000, then one half (one child) or one third (more than
//    one): Intestate Succession Act, ss. 4 and 5
//  - Minor injury cap for 2026: $10,862: Superintendent of Insurance Bulletin
//    2026-01 (22 Jan 2026)
//  - Nova Scotia Nominee Program: liveinnovascotia.com (the province's
//    official immigration website)
//  - Nova Scotia Legal Aid: nslegalaid.ca
//  - Courthouse addresses: courts.ns.ca/locations/halifax-dartmouth
//  - Halifax is the capital: canada.ca
//
// LEFT OUT because no official page states it:
//  - a time limit for applying to divide property after separation or
//    divorce (nsfamilylaw.ca only says "there may be time limits")
//  - whether "spouse" in the Intestate Succession Act includes registered
//    domestic partners
// Re-check the minor injury cap each January and the deed transfer tax rates
// after each budget.
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { CaCity } from "@/lib/ca/cities";
import {
  CA_LINKS,
  FED_FAQS,
  FED_POINTS,
  type CaAreaContent,
  type CaCityInfo,
  type CaProvinceContent,
} from "@/lib/ca/content-shared";

const L = {
  complaints: "https://nsbs.org/for-the-public/concerns-with-a-lawyer/file-a-complaint/",
  legalAid: "https://www.nslegalaid.ca/",
  courts: "https://www.courts.ns.ca/locations",
  halifaxCourts: "https://www.courts.ns.ca/locations/halifax-dartmouth",
  familyDivision: "https://www.courts.ns.ca/courts/supreme-court/supreme-court-family-division",
  smallClaims: "https://www.courts.ns.ca/courts/small-claims-court",
  limitationAct: "https://nslegislature.ca/sites/default/files/legc/statutes/limitation%20of%20actions.pdf",
  lsComplaint: "https://novascotia.ca/lae/employmentrights/complaintfiling.asp",
  lsTermination: "https://novascotia.ca/lae/employmentrights/employernowork.asp",
  humanRights: "https://humanrights.novascotia.ca/DR-FAQ",
  matrimonialProperty: "https://www.nsfamilylaw.ca/separation-divorce/matrimonial-property-pensions-debts",
  commonLawProperty: "https://www.nsfamilylaw.ca/separation-divorce/common-law/common-law-property-pensions-debts",
  dtt: "https://www.novascotia.ca/municipal-deed-transfer-and-property-tax",
  dttRates: "https://novascotia.ca/sns/pdf/ans-property-dtt-rates.pdf",
  halifaxTax: "https://www.halifax.ca/home-property/property-taxes/taxes-halifax",
  nonResidentDtt: "https://www.novascotia.ca/non-resident-provincial-deed-transfer-tax",
  landRegistryFees: "https://www.novascotia.ca/land-registry-fees",
  tenancies: "https://www.novascotia.ca/application-director-resolve-dispute-between-landlord-and-tenant-form-j",
  probateCourt: "https://www.courts.ns.ca/courts/probate-court",
  probateAct: "https://nslegislature.ca/sites/default/files/legc/statutes%20HTML/probate.htm",
  intestateAct: "https://nslegislature.ca/sites/default/files/legc/statutes%20HTML/intestate%20succession.htm",
  minorInjury: "https://notices.novascotia.ca/files/superindendent-insurance-bulletin/si-bulletin-2026-01.pdf",
  nsnp: "https://liveinnovascotia.com/nova-scotia-nominee-program",
};

const REGULATION_ANSWER =
  "To practise law in Nova Scotia a lawyer must be a member of the Nova Scotia Barristers' Society. You can look up any lawyer in the Society's public lawyer search to check their status and to see whether they have been formally disciplined. Each lawyer on these pages was checked there before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Society.";

const NOTICE =
  "one week after three months' employment, two weeks after two years, four weeks after five years and eight weeks after ten years";

const PROBATE_TAX =
  "$85.60 for an estate up to $10,000, $215.20 up to $25,000, $358.15 up to $50,000 and $1,002.65 up to $100,000; above that it is $1,002.65 plus $16.95 for every $1,000 (or part of $1,000) over $100,000";

const INTESTACY =
  "If there is a spouse and no children, the spouse inherits the whole estate. If there are children, the spouse receives the first $50,000 and then half of the rest if there is one child, or one third if there is more than one; the children share what is left.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and Nova Scotia nominates some applicants through the Nova Scotia Nominee Program (NSNP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "Through the Nova Scotia Nominee Program (NSNP), prospective immigrants who have the skills and experience needed by Nova Scotia employers may be nominated to immigrate.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "Nova Scotia Nominee Program", href: L.nsnp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from Nova Scotia's Matrimonial Property Act, which applies to married couples and registered domestic partners but not to other common-law couples.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in Nova Scotia for a full year before applying.",
      "The Matrimonial Property Act applies only to married couples and couples in a registered domestic partnership. The basic rule is that spouses are entitled to an equal division of matrimonial assets when they separate or divorce.",
      "The Act does not apply to common-law couples who have not registered a domestic partnership. They have to rely on other legal claims to share property — ask a lawyer.",
      "The Supreme Court (Family Division) deals with family law matters in every part of the province.",
      "After a spouse's death, the surviving spouse has six months from the grant of probate or administration to apply for a division of matrimonial assets.",
    ],
    links: [
      { label: "Matrimonial property, pensions and debts (nsfamilylaw.ca)", href: L.matrimonialProperty },
      { label: "Common-law couples: property (nsfamilylaw.ca)", href: L.commonLawProperty },
      { label: "Supreme Court (Family Division)", href: L.familyDivision },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "Nova Scotia Legal Aid", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. In Nova Scotia an injured person can claim against the driver at fault, but compensation for the pain and suffering of a 'minor injury' from a car accident is capped — at $10,862 for accidents in 2026. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "After a car accident, mandatory accident benefits are paid whoever was at fault, and an injured person can also claim against the at-fault party for losses such as lost income and pain and suffering.",
      "Damages for the pain and suffering of a 'minor injury' from a car accident are capped. The cap is $10,862 for accidents from 1 January to 31 December 2026 and is adjusted every year.",
      "A claim must be started within two years of the day it is discovered, and no more than 15 years after the act or omission it is based on.",
      "The Small Claims Court hears claims up to $25,000, but it can award only up to $100 in general damages. Larger claims go to the Supreme Court.",
    ],
    links: [
      { label: "Minor injury cap for 2026 (Superintendent of Insurance)", href: L.minorInjury },
      { label: "Limitation of Actions Act", href: L.limitationAct },
      { label: "Small Claims Court", href: L.smallClaims },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most Nova Scotia workers are covered by the Labour Standards Code; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "A labour standards complaint must reach the Labour Standards Division within six months of the incident.",
      `The minimum notice of termination from an employer is ${NOTICE}. Courts often award more ('reasonable notice') unless a valid contract limits it.`,
      "An employee with ten or more years of service cannot be fired or suspended without good reason ('just cause') under the Labour Standards Code.",
      "The time limit to start a court claim, including a wrongful dismissal lawsuit, is two years from the day the claim is discovered. A human rights complaint must be filed within 12 months of the last date of discrimination.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "Filing a labour standards complaint", href: L.lsComplaint },
      { label: "Notice of termination", href: L.lsTermination },
      { label: "Nova Scotia Human Rights Commission", href: L.humanRights },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In Nova Scotia deed transfer tax is set by each municipality and collected through the Land Registry when the deed is registered. Buyers who do not live in Nova Scotia pay a provincial tax as well.",
    points: [
      "Municipal deed transfer tax rates are set by each municipality. In Halifax Regional Municipality the rate is 1.5% of the purchase price — $7,500 on a $500,000 home — and the deed must be registered within 10 days.",
      "Buyers who are not residents of Nova Scotia also pay the Non-resident Provincial Deed Transfer Tax of 10% on residential property with three units or less. People who move to Nova Scotia within six months are exempt.",
      "The Land Registry charges $100 to register or record each document.",
      "The Residential Tenancies Program helps tenants and landlords resolve disputes. An application costs $31.15 and can be made up to one year after a tenancy has ended.",
    ],
    links: [
      { label: "Municipal deed transfer tax", href: L.dtt },
      { label: "Deed transfer tax rate for each municipality", href: L.dttRates },
      { label: "Halifax: deed transfer tax", href: L.halifaxTax },
      { label: "Non-resident Provincial Deed Transfer Tax", href: L.nonResidentDtt },
      { label: "Land registry fees", href: L.landRegistryFees },
      { label: "Residential tenancies: resolving a dispute", href: L.tenancies },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. Nova Scotia has a separate Probate Court, which appoints executors and administrators, and the Intestate Succession Act sets out who inherits when there is no will.",
    points: [
      "The Probate Court of Nova Scotia has authority over the appointment of executors and administrators in all estate matters.",
      `Probate tax depends on the value of the estate: ${PROBATE_TAX}.`,
      `When someone dies without a will: ${INTESTACY.charAt(0).toLowerCase()}${INTESTACY.slice(1)}`,
    ],
    links: [
      { label: "Probate Court of Nova Scotia", href: L.probateCourt },
      { label: "Probate Act", href: L.probateAct },
      { label: "Intestate Succession Act", href: L.intestateAct },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "Nova Scotia";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the Nova Scotia Nominee Program?",
          answer:
            "Through the Nova Scotia Nominee Program (NSNP), prospective immigrants who have the skills and experience needed by Nova Scotia employers may be nominated to immigrate. See the province's immigration website for the current streams and requirements.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Nova Scotia?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in Nova Scotia for a full year before applying.",
        },
        {
          question: "How is property divided when a marriage ends in Nova Scotia?",
          answer:
            "Under the Matrimonial Property Act, the basic rule is that spouses are entitled to an equal division of matrimonial assets when they separate or divorce. Time limits may apply, so get advice early.",
        },
        {
          question: "Do common-law partners have the same property rights in Nova Scotia?",
          answer:
            "No. The Matrimonial Property Act only applies to married couples and couples who have registered a domestic partnership with the government. It does not apply to other common-law couples, who have to rely on other legal claims to share property.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in Nova Scotia"}?`,
          answer: info
            ? info.familyCourt
            : "The Supreme Court (Family Division) deals with family law matters, including divorce and property division, in every part of the province.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Can I sue after a car crash in Nova Scotia?",
          answer:
            "Yes. Accident benefits are paid whoever was at fault, and an injured person can also claim against the at-fault party for losses such as lost income and pain and suffering. But damages for the pain and suffering of a 'minor injury' are capped — at $10,862 for accidents in 2026.",
        },
        {
          question: "How long do I have to start an injury claim in Nova Scotia?",
          answer:
            "Under the Limitation of Actions Act a claim must be started within two years of the day it is discovered, and no more than 15 years after the act or omission it is based on. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "Where are injury claims decided in Nova Scotia?",
          answer:
            "The Small Claims Court hears claims up to $25,000 but can award only up to $100 in general damages. Larger claims go to the Supreme Court of Nova Scotia.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in Nova Scotia?",
          answer:
            "A labour standards complaint must be received within six months of the incident. A human rights complaint must be filed within 12 months of the last date of discrimination. A court claim, including wrongful dismissal, must be started within two years of the day it is discovered. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in Nova Scotia?",
          answer: `The Labour Standards Code minimum is ${NOTICE}. An employee with ten or more years of service cannot be fired without just cause. Unless your contract validly limits you to the minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.`,
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Nova Scotia"} be heard?`,
          answer: `Labour standards complaints go to the Labour Standards Division and human rights complaints to the Nova Scotia Human Rights Commission. Lawsuits up to $25,000 can go to the Small Claims Court, and larger claims to the Supreme Court${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `How much is deed transfer tax on a home${city ? ` in ${city.name}` : " in Nova Scotia"}?`,
          answer:
            city?.slug === "halifax"
              ? "In Halifax Regional Municipality, deed transfer tax is 1.5% of the purchase price — $7,500 on a $500,000 home. The deed must be registered within 10 days of acquiring title, and penalties may apply if the tax is paid late."
              : "It depends on the municipality: each one sets its own deed transfer tax rate, and the province publishes the list. In Halifax Regional Municipality the rate is 1.5% of the purchase price — $7,500 on a $500,000 home.",
        },
        {
          question: "Do buyers from outside Nova Scotia pay extra tax?",
          answer:
            "Yes. Buyers who are not residents of Nova Scotia pay the Non-resident Provincial Deed Transfer Tax of 10% on residential property with three units or less, on top of the municipal tax. There is an exemption for people who move to Nova Scotia within six months.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in Nova Scotia"} dealt with?`,
          answer:
            "The Residential Tenancies Program. A residential tenancy officer tries mediation if both sides agree and otherwise holds a hearing. An application costs $31.15 and can be made up to one year after the tenancy has ended; the decision can be appealed to the Small Claims Court within 10 days.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in Nova Scotia?",
          answer: info
            ? info.estates
            : "Applications go to the Probate Court of Nova Scotia, which appoints executors and administrators.",
        },
        {
          question: "How much does probate cost in Nova Scotia?",
          answer: `Probate tax is ${PROBATE_TAX}. On a $300,000 estate that is $4,392.65. Legal fees are separate.`,
        },
        {
          question: "What happens if someone dies without a will in Nova Scotia?",
          answer: `The Intestate Succession Act decides who inherits. ${INTESTACY} The spouse can choose to take the home as part of that share.`,
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const NOVA_SCOTIA: CaProvinceContent = {
  checked: "4 October 2026",
  jurisdiction: {
    title: "Nova Scotia law and courts",
    body: "The Supreme Court of Nova Scotia hears larger civil claims, and its Family Division deals with family law matters, including divorce and property division, across the province. The Small Claims Court hears claims up to $25,000, and a separate Probate Court deals with estates. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Nova Scotia Barristers' Society, which also deals with complaints about them.",
  },
  courtsSummary:
    "The Supreme Court of Nova Scotia hears larger civil claims and its Family Division deals with family law matters across the province; the Small Claims Court hears claims up to $25,000.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Labour standards complaints go to Nova Scotia's Labour Standards Division within six months, and human rights complaints go to the Nova Scotia Human Rights Commission within 12 months.",
  freeHelp: {
    text: "Nova Scotia Legal Aid helps Nova Scotians facing criminal, family or social justice issues, with a focus on the most vulnerable. You can apply online.",
    links: [{ label: "Nova Scotia Legal Aid", href: L.legalAid }],
  },
  courtsSource: { label: "Nova Scotia court locations (courts.ns.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Nova Scotia cities
// ---------------------------------------------------------------------------

export const NOVA_SCOTIA_CITY_INFO: Record<string, CaCityInfo> = {
  halifax: {
    local:
      "Halifax is Nova Scotia's capital. The Court of Appeal and the Supreme Court sit at the Law Courts, 1815 Upper Water Street, on the waterfront; the Supreme Court (Family Division) has its own courthouse at 3380 Devonshire Avenue; and the Provincial Court and Small Claims Court are at 5250 Spring Garden Road. Homes anywhere in Halifax Regional Municipality, which includes Dartmouth and Bedford, pay the municipality's 1.5% deed transfer tax.",
    courts: [
      {
        name: "The Law Courts",
        address: "1815 Upper Water Street, Halifax, NS B3J 1S7",
        url: L.halifaxCourts,
        use: "Court of Appeal and Supreme Court",
      },
      {
        name: "Supreme Court (Family Division), Halifax",
        address: "3380 Devonshire Avenue, Halifax, NS B3K 5R5",
        url: L.halifaxCourts,
        use: "Supreme Court (Family Division)",
      },
      {
        name: "Halifax Provincial Court",
        address: "5250 Spring Garden Road, Halifax, NS B3J 1E7",
        url: L.halifaxCourts,
        use: "Provincial Court and Small Claims Court",
      },
    ],
    familyCourt:
      "For Halifax, family cases — including divorce and property division — go to the Supreme Court (Family Division) at 3380 Devonshire Avenue.",
    estates:
      "Applications go to the Probate Court of Nova Scotia, which appoints executors and administrators. Ask the Probate Court or your lawyer where to file.",
  },
};
