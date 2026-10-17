// ============================================================================
// NEW BRUNSWICK — law content and city information for the /ca pages.
//
// Every number below was read on an official source on 4 Oct 2026:
//  - Court of King's Bench, Family Division "deals with all family matters
//    such as … divorces … division of marital property":
//    courtsnb-coursnb.ca (modified 19 Jun 2026)
//  - Small Claims Court of New Brunswick: claims up to $20,000; filing fee
//    $50 (up to $3,000) or $150: courtsnb-coursnb.ca (14 Aug 2026) and
//    Regulation 2012-103
//  - Limitation periods: two years from discovery, 15 years ultimate:
//    Limitation of Actions Act, s. 5(1) (laws.gnb.ca, 12 Jun 2026)
//  - Notice of termination: two weeks (6 months to under 5 years), four
//    weeks (5 years or more): gnb.ca employment standards and the Employment
//    Standards Act, s. 30
//  - Human rights complaint within 12 months: gnb.ca (13 Feb 2026)
//  - Marital Property Act: "spouse means a married person"; equal shares;
//    apply no later than 60 days after a divorce, or four months after a
//    spouse's death: Marital Property Act, ss. 1, 3 and 4 (laws.gnb.ca)
//  - Real property transfer tax: 1% of the greater of the price and the
//    assessed value, to the nearest dollar: Real Property Transfer Tax Act,
//    s. 2 (laws.gnb.ca)
//  - Land titles registration: $84 plus a $1 assurance fee per parcel, for a
//    transfer or a mortgage: Regulation 83-130, Schedule B
//  - Probate tax from 12 Jun 2026: $200 up to $20,000; then $5 per $1,000 up
//    to $100,000; then $600 plus $15 per $1,000: Probate Court Act,
//    Schedule A (laws.gnb.ca, 16 Jul 2026) and courtsnb-coursnb.ca
//  - No will (Devolution of Estates Act, ss. 22-24): spouse takes everything
//    if there are no children; otherwise the marital property plus one half
//    (one child) or one third (more than one) of the rest
//  - Minor personal injury cap for 2026: $9,926.59: FCNB notice (22 Jan 2026)
//  - Tenant and Landlord Relations Office: mediation, then a Residential
//    Tenancies Officer decides: gnb.ca
//  - New Brunswick Provincial Nominee Program: gnb.ca
//  - Legal Aid (who it helps, Moncton office): legalaid-aidejuridique-nb.ca
//  - Moncton Law Courts, 145 Assumption Blvd.; Court of Appeal sits in
//    Fredericton; land registration office in St. Stephen: courtsnb-coursnb.ca
//    and snb.ca
//
// LEFT OUT because the official source could not be read:
//  - the deadline for an employment standards complaint (Employment Standards
//    Act, s. 61)
// To look at once: the Devolution of Estates Act says "widow"; the reader
// reported that s. 36 applies the same shares when a wife dies, but that
// wording was not read word for word. The Marital Property Act and Real
// Property Transfer Tax Act consolidations are shown as current to
// 1 Jan 2024.
// Re-check the minor injury cap each January.
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
  complaints: "https://lawsociety-barreau.nb.ca/en/public/filing-a-complaint/",
  discipline: "https://lawsociety-barreau.nb.ca/en/public/discipline-history-full-list/",
  legalAid: "https://www.legalaid-aidejuridique-nb.ca/home/",
  courts: "https://www.courtsnb-coursnb.ca/content/cour/en/kings-bench/content/qblocations.html",
  kingsBench: "https://www.courtsnb-coursnb.ca/content/cour/en/kings-bench.html",
  smallClaims: "https://www.courtsnb-coursnb.ca/content/cour/en/small-claims-court.html",
  limitationAct: "https://laws.gnb.ca/en/document/cs/L-8.5",
  esTermination: "https://www.gnb.ca/en/topic/jobs-workplaces/labour-market-workforce/employment-standards/rights-terminated.html",
  esAct: "https://laws.gnb.ca/en/document/cs/E-7.2",
  humanRights: "https://www2.gnb.ca/content/gnb/en/departments/nbhrc/the-complaint-process/filing-a-complaint.html",
  maritalPropertyAct: "https://laws.gnb.ca/en/document/cs/2012-c.107",
  transferTaxAct: "https://laws.gnb.ca/en/document/cs/R-2.1",
  landTitlesFees: "https://laws.gnb.ca/en/document/cr/83-130",
  landRegistry: "https://www2.snb.ca/content/snb/en/sites/land-registry.html",
  tenancies: "https://www.gnb.ca/en/topic/family-home-community/housing-property/solve-problem.html",
  probateCourt: "https://www.courtsnb-coursnb.ca/content/cour/en/probate-court.html",
  devolutionAct: "https://laws.gnb.ca/en/document/cs/D-9",
  minorInjury: "https://fcnb.ca/en/news-alerts/insurance-notice-annual-indexation-2",
  pnp: "https://www.gnb.ca/en/topic/family-home-community/immigration/provincial-nominee-program.html",
};

const REGULATION_ANSWER =
  "To practise law in New Brunswick a lawyer must be a member of the Law Society of New Brunswick. You can look up any practising lawyer in the Law Society's public Lawyer Search, and it publishes a list of complaints referred to its Discipline Committee. Each lawyer on these pages was checked in the Lawyer Search before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Law Society.";

const PROBATE_TAX =
  "$200 where the estate is worth $20,000 or less; $200 plus $5 for every $1,000 over $20,000 for estates up to $100,000; and $600 plus $15 for every $1,000 over $100,000 above that";

const INTESTACY =
  "If there is a surviving spouse and no children, the spouse inherits the whole estate. If there are children, the spouse receives the couple's marital property and then half of the rest if there is one child, or one third if there is more than one; the children share what is left.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and New Brunswick nominates some applicants through the New Brunswick Provincial Nominee Program (NBPNP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "The New Brunswick Provincial Nominee Program (NBPNP) offers pathways to permanent residence for foreign nationals who wish to live and work, or run a business, in New Brunswick. IRCC makes the final decision.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "New Brunswick Provincial Nominee Program", href: L.pnp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from New Brunswick's Marital Property Act, which applies to married spouses.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in New Brunswick for a full year before applying.",
      "Under the Marital Property Act each spouse is entitled to have the marital property divided in equal shares when the marriage ends or the spouses separate with no reasonable prospect of living together again.",
      "The Act defines a spouse as a married person, so it does not cover unmarried couples. They have to rely on other legal claims to share property — ask a lawyer.",
      "The deadline is short: an application to divide marital property must be made no later than 60 days after a divorce. After a spouse's death the limit is four months.",
      "The Family Division of the Court of King's Bench deals with all family matters, including divorce and the division of marital property.",
    ],
    links: [
      { label: "Court of King's Bench of New Brunswick", href: L.kingsBench },
      { label: "Marital Property Act", href: L.maritalPropertyAct },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "New Brunswick Legal Aid Services Commission", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. In New Brunswick, damages for the pain and suffering of a 'minor personal injury' from a motor vehicle accident are capped — at $9,926.59 for accidents in 2026. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Damages for pain and suffering from a minor personal injury in a motor vehicle accident are capped. The cap is $9,926.59 for accidents on or after 1 January 2026 and is adjusted every year.",
      "A minor personal injury means a sprain, strain, whiplash-type injury, bruise, scrape or cut that does not cause serious impairment or permanent serious disfigurement.",
      "A claim must be started within two years of the day it is discovered, and no more than 15 years after the act or omission it is based on.",
      "The Small Claims Court of New Brunswick hears claims up to $20,000. Larger claims go to the Court of King's Bench.",
    ],
    links: [
      { label: "Minor injury amount for 2026 (FCNB)", href: L.minorInjury },
      { label: "Limitation of Actions Act", href: L.limitationAct },
      { label: "Small Claims Court of New Brunswick", href: L.smallClaims },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most New Brunswick workers are covered by the Employment Standards Act; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "The minimum written notice of termination is two weeks if you have worked for the employer for at least six months but less than five years, and four weeks after five years or more. The employer can pay the wages for that period instead. Courts often award more ('reasonable notice') unless a valid contract limits it.",
      "Employment standards complaints go to the province's Employment Standards office. Ask it about the deadline for your complaint.",
      "The time limit to start a court claim, including a wrongful dismissal lawsuit, is two years from the day the claim is discovered. Claims up to $20,000 can go to the Small Claims Court.",
      "A human rights complaint must be filed within 12 months of the alleged violation.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "Your rights when your job ends", href: L.esTermination },
      { label: "Employment Standards Act", href: L.esAct },
      { label: "New Brunswick Human Rights Commission: filing a complaint", href: L.humanRights },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In New Brunswick the buyer pays real property transfer tax of 1% when the deed is registered, worked out on the purchase price or the assessed value, whichever is greater.",
    points: [
      "Real property transfer tax is 1% of the greater of the purchase price and the property's assessed value — $3,000 on a $300,000 home. It is paid before the deed is registered.",
      "Because the tax uses the higher figure, a home bought for less than its assessed value is taxed on the assessed value.",
      "Registering a transfer under the land titles system costs $85 per parcel, and registering a mortgage costs the same again.",
      "The Tenant and Landlord Relations Office deals with disputes between residential landlords and tenants: it tries mediation first, and if that fails a Residential Tenancies Officer decides.",
    ],
    links: [
      { label: "Real Property Transfer Tax Act", href: L.transferTaxAct },
      { label: "Land titles fees (Regulation 83-130)", href: L.landTitlesFees },
      { label: "Service New Brunswick: land registry", href: L.landRegistry },
      { label: "Tenant and landlord disputes", href: L.tenancies },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. New Brunswick has a separate Probate Court, and the Devolution of Estates Act sets out who inherits when there is no will.",
    points: [
      "The Probate Court of New Brunswick grants letters probate and supervises the administration and distribution of estates.",
      `Probate tax went up on 12 June 2026. It is now ${PROBATE_TAX}.`,
      `When someone dies without a will: ${INTESTACY.charAt(0).toLowerCase()}${INTESTACY.slice(1)}`,
    ],
    links: [
      { label: "Probate Court of New Brunswick", href: L.probateCourt },
      { label: "Devolution of Estates Act", href: L.devolutionAct },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "New Brunswick";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the New Brunswick Provincial Nominee Program?",
          answer:
            "The New Brunswick Provincial Nominee Program (NBPNP) offers pathways to permanent residence for foreign nationals who wish to live and work, or run a business, in New Brunswick. Immigration, Refugees and Citizenship Canada makes the final decision on applications for permanent residence.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in New Brunswick?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in New Brunswick for a full year before applying.",
        },
        {
          question: "How is property divided when a marriage ends in New Brunswick?",
          answer:
            "Under the Marital Property Act each spouse is entitled to have the marital property divided in equal shares. An application must be made no later than 60 days after a divorce, so raise property before the divorce is granted.",
        },
        {
          question: "Do common-law partners have the same property rights in New Brunswick?",
          answer:
            "No. The Marital Property Act defines a spouse as a married person, so its equal-division rule does not cover unmarried couples. They have to rely on other legal claims to share property.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in New Brunswick"}?`,
          answer: info
            ? info.familyCourt
            : "The Family Division of the Court of King's Bench deals with all family matters, including divorce, the division of marital property, support and parenting orders.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Is there a cap on injury compensation after a car accident in New Brunswick?",
          answer:
            "Yes, for minor injuries. Damages for the pain and suffering of a minor personal injury — a sprain, strain, whiplash-type injury, bruise, scrape or cut that does not cause serious impairment — are capped at $9,926.59 for accidents on or after 1 January 2026. The cap applies only to pain and suffering, and it changes every January.",
        },
        {
          question: "How long do I have to start an injury claim in New Brunswick?",
          answer:
            "Under the Limitation of Actions Act a claim must be started within two years of the day it is discovered, and no more than 15 years after the act or omission it is based on. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "Where are injury claims decided in New Brunswick?",
          answer:
            "The Small Claims Court of New Brunswick hears claims up to $20,000. Larger claims go to the Court of King's Bench.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in New Brunswick?",
          answer:
            "A human rights complaint must be filed within 12 months of the alleged violation. A court claim, including wrongful dismissal, must be started within two years of the day it is discovered. Employment standards complaints have their own deadline — ask the Employment Standards office. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in New Brunswick?",
          answer:
            "The Employment Standards Act minimum is two weeks' written notice if you have worked for the employer for at least six months but less than five years, and four weeks after five years or more; the employer can pay the wages instead. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.",
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in New Brunswick"} be heard?`,
          answer: `Employment standards complaints go to the province's Employment Standards office and human rights complaints to the New Brunswick Human Rights Commission. Lawsuits up to $20,000 can go to the Small Claims Court, and larger claims to the Court of King's Bench${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `How much is the transfer tax on a home${city ? ` in ${city.name}` : " in New Brunswick"}?`,
          answer:
            "Real property transfer tax is 1% of the greater of the purchase price and the property's assessed value — $3,000 on a $300,000 home. It is paid when the deed is registered.",
        },
        {
          question: "What does it cost to register a home purchase in New Brunswick?",
          answer:
            "Under the land titles system, registering a transfer costs $85 per parcel ($84 plus a $1 assurance fee), and registering a mortgage costs the same again. That is on top of the 1% transfer tax and your lawyer's fees.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in New Brunswick"} dealt with?`,
          answer:
            "The Tenant and Landlord Relations Office. It tries to settle the matter by mediation; if that does not work, a Residential Tenancies Officer makes a decision.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in New Brunswick?",
          answer: info
            ? info.estates
            : "Applications go to the Probate Court of New Brunswick, which grants letters probate and supervises the administration of estates.",
        },
        {
          question: "How much does probate cost in New Brunswick?",
          answer: `Probate tax rates went up for applications filed on or after 12 June 2026. The tax is ${PROBATE_TAX}. On a $300,000 estate that is $3,600. Legal fees are separate.`,
        },
        {
          question: "What happens if someone dies without a will in New Brunswick?",
          answer: `The Devolution of Estates Act decides who inherits. ${INTESTACY}`,
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const NEW_BRUNSWICK: CaProvinceContent = {
  checked: "4 October 2026",
  jurisdiction: {
    title: "New Brunswick law and courts",
    body: "The Court of King's Bench of New Brunswick hears larger civil claims, and its Family Division deals with all family matters, including divorce and the division of marital property. The Small Claims Court hears claims up to $20,000, and a separate Probate Court deals with estates. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Law Society of New Brunswick, which also deals with complaints about them.",
  },
  courtsSummary:
    "The Court of King's Bench hears larger civil claims and its Family Division deals with all family matters, including divorce and the division of marital property; the Small Claims Court hears claims up to $20,000.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Employment standards complaints go to New Brunswick's Employment Standards office, and human rights complaints go to the New Brunswick Human Rights Commission within 12 months.",
  freeHelp: {
    text: "The New Brunswick Legal Aid Services Commission provides legal assistance to low-income individuals for certain family and criminal matters.",
    links: [{ label: "New Brunswick Legal Aid Services Commission", href: L.legalAid }],
  },
  courtsSource: { label: "New Brunswick court locations (courtsnb-coursnb.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// New Brunswick cities
// ---------------------------------------------------------------------------

export const NEW_BRUNSWICK_CITY_INFO: Record<string, CaCityInfo> = {
  moncton: {
    local:
      "Moncton's courts are in one building: the Court of King's Bench, the Provincial Court, the Probate Court and the Small Claims Court all sit at the Moncton Law Courts, 145 Assumption Boulevard. The Court of Appeal sits in Fredericton, the capital. New Brunswick's land registration office is in St. Stephen, not Moncton. Legal Aid has a Moncton office at 774 Main Street.",
    courts: [
      {
        name: "Moncton Law Courts",
        address: "145 Assumption Boulevard, Moncton, NB E1C 8R3",
        url: L.courts,
        use: "Court of King's Bench (including the Family Division), Provincial Court, Probate Court and Small Claims Court",
      },
    ],
    familyCourt:
      "For Moncton, family cases — including divorce and the division of marital property — go to the Family Division of the Court of King's Bench at the Moncton Law Courts, 145 Assumption Boulevard.",
    estates:
      "Applications go to the Probate Court of New Brunswick, which sits in Moncton at the Moncton Law Courts, 145 Assumption Boulevard.",
  },
};
