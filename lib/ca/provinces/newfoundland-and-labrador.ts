// ============================================================================
// NEWFOUNDLAND AND LABRADOR — law content and city information for the /ca
// pages.
//
// Every number below was read on an official source on 4 Oct 2026:
//  - Supreme Court Family Division has exclusive jurisdiction over family
//    matters in its judicial areas (the East Coast area includes St. John's);
//    the General Division hears them elsewhere; the Provincial Court cannot
//    grant a divorce or divide matrimonial assets: court.nl.ca
//  - Provincial Court small claims up to $25,000: court.nl.ca (28 Apr 2023)
//  - Limitation periods: two years for injury to a person or property
//    (s. 5); six years where no other period is set (s. 9); time runs from
//    when the person knew or ought to have known (s. 14): Limitations Act
//    (assembly.nl.ca)
//  - Labour standards complaint within 6 months of the termination date:
//    gov.nl.ca (26 Nov 2025)
//  - Notice of termination: 1 week (3 months to under 2 years), 2 weeks (2 to
//    under 5 years), 3 weeks (5 to under 10), 4 weeks (10 to under 15),
//    6 weeks (15 years or more): "Your Rights at Work" (gov.nl.ca, updated
//    April 2026)
//  - Human rights complaint within 12 months: Human Rights Act, 2010,
//    s. 25(2) and thinkhumanrights.ca
//  - Family Law Act: "spouse" means married people; each spouse has a 1/2
//    interest in the matrimonial home; matrimonial assets divided in equal
//    shares; apply by the earliest of 2 years after divorce, 6 years after
//    separation, 1 year after a spouse's death; unmarried couples can adopt
//    the Act by agreement: Family Law Act, ss. 2, 8, 21, 63 (assembly.nl.ca)
//  - Registry of Deeds: $100 where the value is $500 or less, plus 40 cents
//    for each additional $100 or part; same for a mortgage, with a $5,000
//    maximum: gov.nl.ca schedule of fees (dated 1 May 2007 — it is the
//    schedule the current Registry page links to)
//  - Probate fee: $60 for the first $1,000, plus $0.60 for each additional
//    $100: court.nl.ca schedule of fees (14 Nov 2023)
//  - No will: spouse takes everything if there are no children; one half
//    with one child; one third with more than one: Intestate Succession Act,
//    ss. 4-6 (assembly.nl.ca)
//  - Car accidents: people can still sue for pain and suffering; awards are
//    subject to a $5,000 deductible: gov.nl.ca (3 Nov 2025)
//  - Residential tenancies: the province "mediates and adjudicates disputes
//    between residential landlords and tenants": gov.nl.ca
//  - Newfoundland and Labrador Provincial Nominee Program: gov.nl.ca
//  - Legal Aid NL: legalaid.nl.ca
//  - Court and Registry addresses: court.nl.ca and gov.nl.ca
//  - St. John's is the capital: canada.ca
//
// The pages do not say "there is no land transfer tax": no official page
// states that in words, so they describe the registration fees charged.
// To look at once: the Registry of Deeds fee schedule is dated 2007; test a
// value in the Registry's own calculator before relying on it.
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
  complaints: "https://lsnl.ca/public/lawyer-conduct/",
  discipline: "https://lsnl.ca/public/discipline/disciplinary-decisions/",
  legalAid: "https://www.legalaid.nl.ca/",
  courts: "https://www.court.nl.ca/supreme/locations-contact-info/",
  generalDivision: "https://www.court.nl.ca/supreme/locations-contact-info/general-contact-info/",
  familyDivision: "https://www.court.nl.ca/supreme/locations-contact-info/family-contact-info/",
  provincialCourt: "https://www.court.nl.ca/provincial/locations/",
  familyJurisdiction: "https://www.court.nl.ca/supreme/about/jurisdiction/family-division-jurisdiction/",
  smallClaims: "https://www.court.nl.ca/provincial/courts/small-claims-court/",
  limitationsAct: "https://www.assembly.nl.ca/legislation/sr/statutes/l16-1.htm",
  labourStandards: "https://www.gov.nl.ca/gs/labour/nonunion/",
  rightsAtWork: "https://www.gov.nl.ca/gs/files/Your-Rights-At-Work.pdf",
  humanRights: "https://thinkhumanrights.ca/complaint-process/how-to-file-a-complaint/",
  familyLawAct: "https://www.assembly.nl.ca/legislation/sr/statutes/f02.htm",
  deeds: "https://www.gov.nl.ca/dgsnl/registries/deeds/deed-reg/",
  deedsFees: "https://www.gov.nl.ca/dgsnl/files/forms-files-fees-deed.pdf",
  deedsCalculator: "https://cado.eservices.gov.nl.ca/Deeds/DeedsCompliance.aspx",
  tenancies: "https://www.gov.nl.ca/gs/landlord/",
  probate: "https://www.court.nl.ca/supreme/rules-practice-notes-and-forms/civil-proceedings/probate-and-admin/",
  courtFees: "https://www.court.nl.ca/supreme/schedule-of-fees/",
  intestateAct: "https://www.assembly.nl.ca/legislation/sr/statutes/i21.htm",
  autoInsurance: "https://www.gov.nl.ca/gs/insurance/automobile-insurance-changes-2020/",
  pnp: "https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/overview/",
};

const REGULATION_ANSWER =
  "To practise law in Newfoundland and Labrador a lawyer must be a member of the Law Society of Newfoundland and Labrador. Its online Lawyer Directory lists the lawyers practising in the province with their contact details, and the Law Society publishes its disciplinary decisions. Each lawyer on these pages was checked in the directory before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Law Society, in writing.";

const NOTICE =
  "one week after three months' employment, two weeks after two years, three weeks after five years, four weeks after ten years and six weeks after fifteen years";

const INTESTACY =
  "If there is a spouse and no children, the spouse inherits the whole estate. If there is a spouse and one child, the spouse receives half; if there is more than one child, the spouse receives one third. The children share the rest.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and the province nominates some applicants through the Newfoundland and Labrador Provincial Nominee Program (NLPNP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "The Newfoundland and Labrador Provincial Nominee Program (NLPNP) helps employers with labour market challenges, and skilled workers, international graduates and entrepreneurs who want to settle in the province.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "Newfoundland and Labrador Provincial Nominee Program", href: L.pnp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from the province's Family Law Act, which applies to married spouses. Unmarried couples are covered only if they sign an agreement adopting it.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in Newfoundland and Labrador for a full year before applying.",
      "Under the Family Law Act each spouse has a one-half interest in the matrimonial home, whoever owns it, and either spouse can apply to have the matrimonial assets divided in equal shares.",
      "An application must be made by the earliest of: two years after a divorce, six years after the spouses separate, or one year after the first spouse's death.",
      "The Act's definition of spouse covers married people. Two people who live together without marrying can sign a cohabitation agreement that adopts the Act.",
      "In the St. John's area the Family Division of the Supreme Court deals with family law matters. Elsewhere the General Division may hear them. The Provincial Court cannot grant a divorce or divide matrimonial assets.",
    ],
    links: [
      { label: "Supreme Court: Family Division jurisdiction", href: L.familyJurisdiction },
      { label: "Family Law Act", href: L.familyLawAct },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "Legal Aid NL", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. In Newfoundland and Labrador people injured in car accidents can still sue for pain and suffering, but awards are subject to a $5,000 deductible. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "People who suffer pain and suffering in a car accident can still sue for damages. All bodily injury claims are subject to a $5,000 deductible on pain and suffering awards.",
      "An action for damages for injury to a person or property must be started within two years. Time does not start to run until the person knows, or ought to know, that they have a claim.",
      "The Provincial Court's small claims court hears civil claims up to $25,000. Larger claims go to the Supreme Court.",
    ],
    links: [
      { label: "Automobile insurance changes (Government of NL)", href: L.autoInsurance },
      { label: "Limitations Act", href: L.limitationsAct },
      { label: "Small claims court", href: L.smallClaims },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most workers in Newfoundland and Labrador are covered by the Labour Standards Act; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "An employee who wants to file a labour standards complaint after their job ends must do so within six months of the termination date.",
      `The minimum written notice of termination (or pay instead) is ${NOTICE}. No notice is required in the first three months. Courts often award more ('reasonable notice') unless a valid contract limits it.`,
      "A human rights complaint must be made within 12 months of the alleged contravention.",
      "Civil claims up to $25,000 can go to the Provincial Court's small claims court; larger claims go to the Supreme Court. Ask a lawyer which limitation period applies to your claim.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "Labour standards", href: L.labourStandards },
      { label: "Your Rights at Work (Government of NL)", href: L.rightsAtWork },
      { label: "Human Rights Commission: how to file a complaint", href: L.humanRights },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In Newfoundland and Labrador the buyer pays Registry of Deeds registration fees: one for the deed, based on the property's value, and one for the mortgage, based on the amount secured.",
    points: [
      "Registering a deed costs $100 where the property is worth $500 or less, plus 40 cents for each additional $100 (or part of $100) of value. On a $300,000 home that is $1,298.",
      "Registering a mortgage is charged the same way on the amount secured, up to a maximum fee of $5,000.",
      "The Registry of Deeds has its own online fee calculator. The Registry is at 59 Elizabeth Avenue in St. John's.",
      "The province mediates and adjudicates disputes between residential landlords and tenants: either side can file an Application for Dispute Resolution with the Residential Tenancies Office.",
    ],
    links: [
      { label: "Registry of Deeds: registering a deed", href: L.deeds },
      { label: "Registry of Deeds: schedule of fees", href: L.deedsFees },
      { label: "Registry of Deeds: fee calculator", href: L.deedsCalculator },
      { label: "Residential tenancies", href: L.tenancies },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. In Newfoundland and Labrador the Supreme Court appoints and supervises executors and administrators, and the Intestate Succession Act sets out who inherits when there is no will.",
    points: [
      "The Supreme Court of Newfoundland and Labrador has jurisdiction over the appointment and supervision of executors and administrators of estates.",
      "The court fee for letters of probate or administration is $60 for an estate up to $1,000, plus $0.60 for each additional $100.",
      `When someone dies without a will: ${INTESTACY.charAt(0).toLowerCase()}${INTESTACY.slice(1)}`,
    ],
    links: [
      { label: "Supreme Court: probate and administration", href: L.probate },
      { label: "Supreme Court: schedule of fees", href: L.courtFees },
      { label: "Intestate Succession Act", href: L.intestateAct },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "Newfoundland and Labrador";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the Newfoundland and Labrador Provincial Nominee Program?",
          answer:
            "The Newfoundland and Labrador Provincial Nominee Program (NLPNP) helps employers with labour market challenges, and skilled workers, international graduates and entrepreneurs who want to settle in the province. See the provincial government's website for the current categories and requirements.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Newfoundland and Labrador?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in Newfoundland and Labrador for a full year before applying.",
        },
        {
          question: "How is property divided when a marriage ends in Newfoundland and Labrador?",
          answer:
            "Under the Family Law Act each spouse has a one-half interest in the matrimonial home, and either spouse can apply to have the matrimonial assets divided in equal shares. The application must be made by the earliest of two years after a divorce, six years after separation, or one year after the first spouse's death.",
        },
        {
          question: "Do common-law partners have the same property rights in Newfoundland and Labrador?",
          answer:
            "Not automatically. The Family Law Act's property rules apply to married spouses. Two people who live together without marrying can sign a cohabitation agreement, and if that agreement adopts the Act, the Act applies to them.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in Newfoundland and Labrador"}?`,
          answer: info
            ? info.familyCourt
            : "In its judicial areas, including the St. John's area, the Family Division of the Supreme Court has exclusive jurisdiction over family law matters. Elsewhere the General Division may hear divorce and property matters, and the Provincial Court can deal with parenting and support — but it can never grant a divorce or divide matrimonial assets.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Can I sue after a car crash in Newfoundland and Labrador?",
          answer:
            "Yes. People who suffer pain and suffering in a car accident can still sue for damages. All bodily injury claims are subject to a $5,000 deductible on pain and suffering awards.",
        },
        {
          question: "How long do I have to start an injury claim in Newfoundland and Labrador?",
          answer:
            "Under the Limitations Act an action for damages for injury to a person or property must be started within two years. Time does not start to run until the person knows, or ought to know, that they have a claim. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "Where are injury claims decided in Newfoundland and Labrador?",
          answer:
            "The Provincial Court's small claims court hears civil claims up to $25,000. Larger claims go to the Supreme Court of Newfoundland and Labrador.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in Newfoundland and Labrador?",
          answer:
            "A labour standards complaint after your job ends must be filed within six months of the termination date. A human rights complaint must be made within 12 months. Court claims have their own limitation periods under the Limitations Act — ask a lawyer which applies. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in Newfoundland and Labrador?",
          answer: `The minimum written notice (or pay instead) is ${NOTICE}; none is required in the first three months. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.`,
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Newfoundland and Labrador"} be heard?`,
          answer: `Labour standards complaints go to the province's labour standards office and human rights complaints to the Human Rights Commission. Lawsuits up to $25,000 can go to the Provincial Court's small claims court, and larger claims to the Supreme Court${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `What does it cost to register a home purchase${city ? ` in ${city.name}` : " in Newfoundland and Labrador"}?`,
          answer:
            "The Registry of Deeds charges $100 where the property is worth $500 or less, plus 40 cents for each additional $100 (or part of $100) of value — $1,298 on a $300,000 home. Registering a mortgage is charged the same way on the amount secured, up to a maximum of $5,000. Your lawyer's fees are separate.",
        },
        {
          question: "Is there an official calculator for Registry of Deeds fees?",
          answer:
            "Yes. The Registry of Deeds has an online fee calculator for conveyances and mortgages. Use it, or ask your lawyer, to confirm the exact fee before closing.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in Newfoundland and Labrador"} dealt with?`,
          answer:
            "The provincial government mediates and adjudicates disputes between residential landlords and tenants. Either side can file an Application for Dispute Resolution with the Residential Tenancies Office.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city
            ? `Where do I apply for probate for someone who lived in ${city.name}?`
            : "Where do I apply for probate in Newfoundland and Labrador?",
          answer: info
            ? info.estates
            : "Applications go to the Supreme Court of Newfoundland and Labrador, which appoints and supervises executors and administrators.",
        },
        {
          question: "How much does probate cost in Newfoundland and Labrador?",
          answer:
            "The court fee for letters of probate or administration is $60 for an estate up to $1,000, plus $0.60 for each additional $100 — about $1,254 on a $200,000 estate. Legal fees are separate.",
        },
        {
          question: "What happens if someone dies without a will in Newfoundland and Labrador?",
          answer: `The Intestate Succession Act decides who inherits. ${INTESTACY}`,
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const NEWFOUNDLAND_AND_LABRADOR: CaProvinceContent = {
  checked: "4 October 2026",
  jurisdiction: {
    title: "Newfoundland and Labrador law and courts",
    body: "The Supreme Court of Newfoundland and Labrador hears larger civil claims and estates, and its Family Division deals with family law matters in the St. John's area. The Provincial Court's small claims court hears civil claims up to $25,000. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Law Society of Newfoundland and Labrador, which also deals with complaints about them.",
  },
  courtsSummary:
    "The Supreme Court of Newfoundland and Labrador hears larger civil claims, estates and — through its Family Division in the St. John's area — family law matters; the Provincial Court's small claims court hears civil claims up to $25,000.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Labour standards complaints go to the province's labour standards office within six months of the termination date, and human rights complaints go to the Human Rights Commission within 12 months.",
  freeHelp: {
    text: "Legal Aid NL provides a range of legal services to low-income individuals in Newfoundland and Labrador in the areas of family and criminal law.",
    links: [{ label: "Legal Aid NL", href: L.legalAid }],
  },
  courtsSource: { label: "Newfoundland and Labrador court locations (court.nl.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Newfoundland and Labrador cities
// ---------------------------------------------------------------------------

export const NL_CITY_INFO: Record<string, CaCityInfo> = {
  "st-johns": {
    local:
      "St. John's is the provincial capital. The Supreme Court's General Division is at 309 Duckworth Street and the Court of Appeal is on the same street at 287 Duckworth Street; the Supreme Court's Family Division has its own building at 68 Portugal Cove Road; and the Provincial Court, which hears small claims, is at 215 Water Street. The Registry of Deeds, where home purchases are registered, is at 59 Elizabeth Avenue.",
    courts: [
      {
        name: "Supreme Court, General Division",
        address: "309 Duckworth Street, St. John's, NL A1C 5M3",
        url: L.generalDivision,
        use: "Supreme Court — civil claims and estates",
      },
      {
        name: "Supreme Court, Family Division",
        address: "68 Portugal Cove Road, St. John's, NL A1B 2L9",
        url: L.familyDivision,
        use: "Supreme Court — family law",
      },
      {
        name: "Provincial Court, St. John's",
        address: "215 Water Street, St. John's, NL A1C 6C9",
        url: L.provincialCourt,
        use: "Provincial Court — small claims",
      },
    ],
    courtNote: "The Family Division asks people to book an appointment before coming to its registry.",
    familyCourt:
      "For St. John's, family cases — including divorce and property — go to the Family Division of the Supreme Court at 68 Portugal Cove Road, which has exclusive jurisdiction over family law matters in the area.",
    estates:
      "Applications go to the Supreme Court of Newfoundland and Labrador, which appoints and supervises executors and administrators. In St. John's the General Division is at 309 Duckworth Street.",
  },
};
