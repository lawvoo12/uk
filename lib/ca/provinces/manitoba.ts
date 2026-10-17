// ============================================================================
// MANITOBA — law content and city information for the /ca pages.
//
// Every number below was read on an official source on 4 Oct 2026:
//  - Court of King's Bench (Family Division) "is a unified family court that
//    hears all family matters throughout Manitoba"; the Provincial Court
//    "cannot deal with applications for divorce, division of family property,
//    or adoption": gov.mb.ca/familylaw
//  - Small Claims Court is part of the Court of King's Bench; claims up to
//    $20,000, including general damages up to $2,000: manitobacourts.mb.ca
//    (updated 6 Jan 2026)
//  - Limitation periods: two years from discovery, 15 years ultimate, in
//    force since 30 Sep 2022: The Limitations Act, ss. 6 and 10
//    (web2.gov.mb.ca/laws, current to 2 Oct 2026)
//  - Employment standards claim within six months: gov.mb.ca/labour/standards
//  - Notice of termination: 1 week (30 days to under 1 year), 2 weeks (1 to
//    under 3 years), 4 weeks (3 to under 5), 6 weeks (5 to under 10), 8 weeks
//    (10 or more): gov.mb.ca/labour/standards fact sheet (23 Jan 2025) and
//    quick guide (published 1 Oct 2026)
//  - Human rights complaint within one year: The Human Rights Code, s. 23(1)
//    and manitobahumanrights.ca
//  - Family property: married spouses, and common-law partners who registered
//    or lived together at least three years; equal share in the value; apply
//    within 60 days after a divorce takes effect, 60 days after registering
//    the end of a registered relationship, or three years from separation
//    (unregistered): gov.mb.ca/familylaw and The Family Property Act, s. 1
//  - Land transfer tax: 0% on the first $30,000, 0.5% to $90,000, 1% to
//    $150,000, 1.5% to $200,000, 2% above: gov.mb.ca/finance
//  - Land titles registration $137 (electronic, from 4 Jan 2026) for a
//    transfer or a mortgage: Teranet Manitoba 2026 fee schedule
//  - Probate charges eliminated on 6 Nov 2020: Court of Queen's Bench notice
//    (manitobacourts.mb.ca)
//  - No will: spouse or partner takes everything unless there is a child from
//    another relationship; then $50,000 or one-half, whichever is greater,
//    plus one-half of the rest: The Intestate Succession Act, s. 2
//    (current to 21 Sep 2026)
//  - Manitoba Public Insurance: the Personal Injury Protection Plan
//    "eliminates lawsuits for injuries to people": mpi.mb.ca
//  - Manitoba Provincial Nominee Program: immigratemanitoba.com (linked from
//    canada.ca)
//  - Legal Aid Manitoba (who it helps, phone numbers): legalaid.mb.ca
//  - Law Courts Building, 408 York Avenue; Teranet Manitoba and Residential
//    Tenancies Branch offices: manitobacourts.mb.ca, teranetmanitoba.ca,
//    gov.mb.ca/cca/rtb
//  - Winnipeg is the capital: canada.ca
//
// LEFT OUT because the official source could not be read:
//  - whether there is any first-time buyer relief from land transfer tax
//    (Part III of The Tax Administration and Miscellaneous Taxes Act) — the
//    pages say nothing either way
// The King's Bench location page for Winnipeg was last updated in 2014.
// Re-check the registration fee each January and the tax after each budget.
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
  complaints: "https://lawsociety.mb.ca/for-the-public/complaints/",
  legalAid: "https://www.legalaid.mb.ca/",
  courts: "https://www.manitobacourts.mb.ca/court-of-queens-bench/location-and-contact-info/",
  kbWinnipeg: "https://www.manitobacourts.mb.ca/court-of-queens-bench/location-and-contact-info/location/winnipeg",
  familyCourts: "https://www.gov.mb.ca/familylaw/resolution/court-system-and-procedures.html",
  familyProperty: "https://www.gov.mb.ca/familylaw/property/family-property.html",
  familyPropertyLimits: "https://www.gov.mb.ca/familylaw/property/accounting-equalization-and-protection.html",
  smallClaims:
    "https://www.manitobacourts.mb.ca/court-of-queens-bench/court-proceedings/small-claim-information-claims-filed-after-january-1-2015/",
  limitationsAct: "https://web2.gov.mb.ca/laws/statutes/ccsm/l150.php?lang=en",
  esClaims: "https://www.gov.mb.ca/labour/standards/claims.html",
  esTermination: "https://www.gov.mb.ca/labour/standards/doc,terminate-employment-after-apr-30-07,factsheet.html",
  humanRights: "https://www.manitobahumanrights.ca/complaints/complaints.html",
  ltt: "https://www.gov.mb.ca/finance/other/landtransfertax.html",
  landTitlesFees: "https://teranetmanitoba.ca/land-titles/land-titles-fees/",
  rtb: "https://www.gov.mb.ca/cca/rtb/",
  probate: "https://www.manitobacourts.mb.ca/court-of-queens-bench/frequently-asked-questions/probate-division/",
  intestateAct: "https://web2.gov.mb.ca/laws/statutes/ccsm/i085.php?lang=en",
  pipp: "https://www.mpi.mb.ca/personal-injury-protection-plan/",
  mpnp: "https://immigratemanitoba.com/mpnp/",
};

const REGULATION_ANSWER =
  "To practise law in Manitoba a lawyer must be a member of the Law Society of Manitoba. You can look up any lawyer in the Law Society's public Lawyer Lookup, which shows their practising status and, under their practice history, any discipline history or restriction. Each lawyer on these pages was checked there before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Law Society.";

const NOTICE =
  "one week after 30 days' employment, two weeks after one year, four weeks after three years, six weeks after five years and eight weeks after ten years";

const LTT =
  "nothing on the first $30,000 of the property's value, 0.5% from $30,000 to $90,000, 1% from $90,000 to $150,000, 1.5% from $150,000 to $200,000, and 2% above $200,000";

const INTESTACY =
  "If there is a spouse or common-law partner and no children — or all the children are also that partner's children — the partner inherits the whole estate. If the person who died had a child from another relationship, the partner receives $50,000 or half of the estate, whichever is greater, plus half of what is left; the children share the rest.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and Manitoba nominates some applicants through the Manitoba Provincial Nominee Program (MPNP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "The Manitoba Provincial Nominee Program (MPNP) is an economic immigration program for people with the skills, education and work experience to contribute to Manitoba's economy.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "Manitoba Provincial Nominee Program", href: L.mpnp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from Manitoba's Family Property Act, which also covers common-law partners who registered their relationship or lived together for at least three years.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in Manitoba for a full year before applying.",
      "The Family Property Act applies to married spouses, and to common-law partners who registered their relationship or lived together for at least three years. Both have a right to an equal share in the value of family property when they separate.",
      "The time limits are short: an application must be made within 60 days after a divorce takes effect, or within 60 days after registering the end of a registered common-law relationship. Common-law partners who did not register have three years from the date they separated.",
      "The Court of King's Bench (Family Division) is a unified family court that hears all family matters throughout Manitoba. The Provincial Court cannot deal with divorce, division of family property or adoption.",
      "Legal Aid Manitoba provides legal services, including in family matters, to low-income people who qualify.",
    ],
    links: [
      { label: "Family property (Manitoba government)", href: L.familyProperty },
      { label: "Applying to divide family property: time limits", href: L.familyPropertyLimits },
      { label: "Manitoba's family court system", href: L.familyCourts },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "Legal Aid Manitoba", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. In Manitoba, injuries from automobile accidents are covered by Manitoba Public Insurance's Personal Injury Protection Plan, which pays compensation whoever was at fault and removes the right to sue for those injuries. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Manitoba Public Insurance's Personal Injury Protection Plan (PIPP) guarantees compensation for everyone injured in an automobile accident, regardless of who was at fault.",
      "PIPP eliminates lawsuits for injuries to people from automobile accidents in Manitoba. Lawsuits for property damage can still happen, and you can be sued for injuries from accidents outside Manitoba.",
      "Other injury claims — falls or medical negligence, for example — can still be brought in court. A claim must be started within two years of the day it is discovered, and no more than 15 years after the act or omission.",
      "Small Claims Court, which is part of the Court of King's Bench, hears claims up to $20,000, including general damages up to $2,000.",
    ],
    links: [
      { label: "MPI: Personal Injury Protection Plan", href: L.pipp },
      { label: "The Limitations Act", href: L.limitationsAct },
      { label: "Small claims information", href: L.smallClaims },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most Manitoba workers are covered by the province's employment standards; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "A claim to the Employment Standards Branch should be filed within six months of your last day of work or of the incident.",
      `The minimum notice of termination from an employer is ${NOTICE}. No notice is needed in the first 30 days. Courts often award more ('reasonable notice') unless a valid contract limits it.`,
      "The time limit to start a court claim, including a wrongful dismissal lawsuit, is two years from the day the claim is discovered. Claims up to $20,000 can go to Small Claims Court.",
      "A human rights complaint must be filed with the Manitoba Human Rights Commission within one year.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "Filing an employment standards claim", href: L.esClaims },
      { label: "Termination of employment fact sheet", href: L.esTermination },
      { label: "Manitoba Human Rights Commission: complaints", href: L.humanRights },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In Manitoba buyers pay land transfer tax on the property's fair market value when the transfer of title is registered, plus a land titles registration fee.",
    points: [
      `Manitoba land transfer tax is ${LTT}. On a $300,000 home that is $3,650.`,
      "The tax is based on the fair market value on the day the transfer is registered, and is paid by the buyer along with a registration fee.",
      "Registering a transfer or a mortgage electronically at the land titles office costs $137 each in 2026.",
      "The Residential Tenancies Branch gives information on rent, repairs and deposits and mediates disputes between tenants and landlords.",
    ],
    links: [
      { label: "Manitoba land transfer tax", href: L.ltt },
      { label: "Land titles fees (Teranet Manitoba)", href: L.landTitlesFees },
      { label: "Residential Tenancies Branch", href: L.rtb },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. In Manitoba probate is granted by the Court of King's Bench, and The Intestate Succession Act sets out who inherits when there is no will.",
    points: [
      "The Probate Division of the Court of King's Bench in Winnipeg is the central registry for all probate matters in the province.",
      "Manitoba eliminated its probate charges on 6 November 2020, so there is no fee based on the value of the estate. Other court fees and legal fees still apply.",
      `When someone dies without a will: ${INTESTACY.charAt(0).toLowerCase()}${INTESTACY.slice(1)}`,
    ],
    links: [
      { label: "Probate Division: frequently asked questions", href: L.probate },
      { label: "The Intestate Succession Act", href: L.intestateAct },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "Manitoba";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the Manitoba Provincial Nominee Program?",
          answer:
            "The Manitoba Provincial Nominee Program (MPNP) is an economic immigration program designed to attract people with the skills, education and work experience needed to contribute to Manitoba's economy. See the province's immigration website for the current streams and requirements.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Manitoba?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in Manitoba for a full year before applying.",
        },
        {
          question: "Do common-law partners have the same property rights in Manitoba?",
          answer:
            "Yes, if they registered their common-law relationship or lived together for at least three years. The Family Property Act then gives each partner a right to an equal share in the value of family property when they separate, as it does for married spouses.",
        },
        {
          question: "Is there a time limit to divide family property in Manitoba?",
          answer:
            "Yes, and it can be very short. An application must be made within 60 days after a divorce takes effect, or within 60 days after registering the end of a registered common-law relationship. Common-law partners who did not register have three years from the date they separated. Speak to a lawyer before your divorce is granted.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in Manitoba"}?`,
          answer: info
            ? info.familyCourt
            : "The Court of King's Bench (Family Division) is a unified family court that hears all family matters throughout Manitoba. The Provincial Court cannot deal with divorce, division of family property or adoption.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Can I sue after a car crash in Manitoba?",
          answer:
            "Not for your injuries. Manitoba Public Insurance's Personal Injury Protection Plan compensates everyone injured in an automobile accident, whoever was at fault, and eliminates lawsuits for injuries to people. Lawsuits for property damage can still happen, and you can be sued for injuries from an accident outside Manitoba.",
        },
        {
          question: "How long do I have to start an injury claim in Manitoba?",
          answer:
            "Under The Limitations Act a claim must be started within two years of the day it is discovered, and no more than 15 years after the act or omission it is based on. Claims for benefits from Manitoba Public Insurance have their own rules. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "Where are injury claims decided in Manitoba?",
          answer:
            "Small Claims Court, which is part of the Court of King's Bench, hears claims up to $20,000 and can award general damages of up to $2,000. Larger claims go to the Court of King's Bench.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in Manitoba?",
          answer:
            "A claim to the Employment Standards Branch should be filed within six months of your last day of work or of the incident. A human rights complaint must be filed within one year. A court claim, including wrongful dismissal, must be started within two years of the day it is discovered. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in Manitoba?",
          answer: `The minimum notice from an employer is ${NOTICE}; no notice is needed in the first 30 days. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.`,
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Manitoba"} be heard?`,
          answer: `Employment standards claims go to the Employment Standards Branch and human rights complaints to the Manitoba Human Rights Commission. Lawsuits up to $20,000 can go to Small Claims Court, and larger claims to the Court of King's Bench${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `How much is land transfer tax on a home${city ? ` in ${city.name}` : " in Manitoba"}?`,
          answer: `Manitoba land transfer tax is ${LTT}. On a $300,000 home that works out to $3,650. It is based on the fair market value on the day the transfer of title is registered.`,
        },
        {
          question: "What other fees are there when a home purchase is registered in Manitoba?",
          answer:
            "The land titles office charges a registration fee on top of the land transfer tax: $137 for a transfer and $137 for a mortgage when they are filed electronically in 2026. Your lawyer's fees are separate.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in Manitoba"} dealt with?`,
          answer:
            "The Residential Tenancies Branch gives information on rent, repairs and deposits and mediates disputes between tenants and landlords.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in Manitoba?",
          answer: info
            ? info.estates
            : "Probate is granted by the Court of King's Bench. Its Probate Division in Winnipeg is the central registry for all probate matters in the province.",
        },
        {
          question: "How much does probate cost in Manitoba?",
          answer:
            "Manitoba eliminated its probate charges on 6 November 2020, so there is no longer a charge based on the value of the estate. Other court fees and legal fees still apply.",
        },
        {
          question: "What happens if someone dies without a will in Manitoba?",
          answer: `The Intestate Succession Act decides who inherits. ${INTESTACY} For inheritance, a common-law partner is one who registered the relationship, or lived with the person for at least three years, or for at least one year if they have a child together.`,
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const MANITOBA: CaProvinceContent = {
  checked: "4 October 2026",
  jurisdiction: {
    title: "Manitoba law and courts",
    body: "The Court of King's Bench hears larger civil claims, and its Family Division is a unified family court that hears all family matters, including divorce and the division of family property. Small Claims Court, part of the Court of King's Bench, hears claims up to $20,000. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Law Society of Manitoba, which also deals with complaints about them.",
  },
  courtsSummary:
    "The Court of King's Bench hears larger civil claims, and its Family Division hears all family matters, including divorce and the division of family property; Small Claims Court, part of the Court of King's Bench, hears claims up to $20,000.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Employment standards claims go to Manitoba's Employment Standards Branch within six months of your last day of work, and human rights complaints go to the Manitoba Human Rights Commission within one year.",
  freeHelp: {
    text: "Legal Aid Manitoba provides legal services to low-income adults and youth who qualify financially and have a case with merit, including in family, child protection, criminal, immigration and refugee, and residential tenancy matters. Call 204-985-8500 or 1-800-261-2960.",
    links: [{ label: "Legal Aid Manitoba", href: L.legalAid }],
  },
  courtsSource: { label: "Manitoba Courts: locations (manitobacourts.mb.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Manitoba cities
// ---------------------------------------------------------------------------

export const MANITOBA_CITY_INFO: Record<string, CaCityInfo> = {
  winnipeg: {
    local:
      "Winnipeg is Manitoba's capital, and its three courts share one building: the Court of King's Bench, the Provincial Court and the Court of Appeal are all at the Law Courts Building, 408 York Avenue. The Probate Division in Winnipeg is the central registry for probate across the province. For home buyers, Teranet Manitoba's land titles office is at 200 Graham Avenue, and the Residential Tenancies Branch is at 155 Carlton Street.",
    courts: [
      {
        name: "Law Courts Building",
        address: "408 York Avenue, Winnipeg, MB R3C 0P9",
        url: L.kbWinnipeg,
        use: "Court of King's Bench (including the Family Division), Provincial Court and Court of Appeal",
      },
    ],
    familyCourt:
      "For Winnipeg, family cases — including divorce and the division of family property — go to the Court of King's Bench (Family Division) at the Law Courts Building, 408 York Avenue.",
    estates:
      "Probate is granted by the Court of King's Bench. Its Probate Division in Winnipeg is the central registry for all probate matters in Manitoba. The Court of King's Bench in Winnipeg is at the Law Courts Building, 408 York Avenue.",
  },
};
