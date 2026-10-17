// ============================================================================
// PRINCE EDWARD ISLAND — law content and city information for the /ca pages.
//
// Every number below was read on an official source on 4 Oct 2026:
//  - Supreme Court has four sections (Estates, Family, Small Claims,
//    General); the Family Section deals with divorce and matrimonial
//    property: Judicature Act, ss. 12-14 (current to 30 Mar 2026)
//  - Small Claims Section: claims up to $16,000: Small Claims Regulations,
//    s. 2 and Rule 74 (courts.pe.ca)
//  - Limitation periods: two years for injury to the person; six years where
//    nothing else is provided: Statute of Limitations, s. 2(1) (current to
//    17 Nov 2021)
//  - Employment Standards Act (new Act in force 30 Jun 2026): complaint
//    within two years (s. 64(2)); notice of termination 1 week (90 days to
//    under 1 year), 2 weeks (1 to under 5 years), 4 weeks (5 to under 10),
//    6 weeks (10 to under 15), 8 weeks (15 years or more):
//    princeedwardisland.ca (published 30 Jun 2026)
//  - Human rights complaint within one year: Human Rights Act, s. 22(2) and
//    peihumanrights.ca
//  - Family Law Act: "spouse" means married people; the spouse with the
//    lesser net family property is entitled to one-half the difference;
//    apply by the earlier of two years after divorce or six years after
//    separation: Family Law Act, ss. 1, 6, 7 (current to 30 Mar 2026)
//  - Real property transfer tax: 1% of the greater of the price and the
//    assessed value; none where that is $30,000 or less; first-time home
//    buyer exemption (six months' residence or two of six tax years; 183
//    days' occupation): Real Property Transfer Tax Act, ss. 3-5 (current to
//    29 May 2026) and princeedwardisland.ca
//  - Registry of Deeds fees: $77.25 to $463.65 by value, for a deed or a
//    mortgage: Registry Act, s. 50.1 and the official fee summary
//  - Lands Protection Act: a non-resident needs permission to hold more than
//    five acres or more than 165 feet of shore frontage (s. 4, current to
//    27 Nov 2025)
//  - No will: spouse takes everything if there are no children; one half
//    with one child; one third with more than one: Probate Act, ss. 87-89
//  - Minor personal injury cap for 2026: $9,659: Superintendent of Insurance
//    Bulletin 2026-001 (2 Feb 2026)
//  - Residential Tenancy Office and appeals to the Island Regulatory and
//    Appeals Commission: peirentaloffice.ca and irac.pe.ca
//  - PEI Provincial Nominee Program; PEI Legal Aid: princeedwardisland.ca
//  - Court and Registry addresses: courts.pe.ca and princeedwardisland.ca
//  - Charlottetown is the capital: canada.ca
//
// LEFT OUT because the official source could not be read:
//  - the probate fee table (Probate Act, s. 119.1 and Schedule)
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
  complaints: "https://lawsocietypei.ca/complaints",
  regulation: "https://lawsocietypei.ca/regulation",
  legalAid: "https://www.princeedwardisland.ca/en/information/justice-and-public-safety/legal-aid",
  courts: "https://www.courts.pe.ca/contact-us",
  supremeCourt: "https://www.courts.pe.ca/supreme-court",
  judicatureAct: "https://www.princeedwardisland.ca/sites/default/files/legislation/j-02-1-judicature_act.pdf",
  limitations: "https://www.princeedwardisland.ca/sites/default/files/legislation/s-07-statute_of_limitations.pdf",
  esOverview: "https://www.princeedwardisland.ca/en/information/workforce-and-advanced-learning/employment-standards-in-pei",
  esTermination: "https://www.princeedwardisland.ca/en/information/workforce-and-advanced-learning/notice-of-termination",
  esAct: "https://www.princeedwardisland.ca/sites/default/files/b281/E-6.3-Employment%20Standards%20Act.pdf",
  humanRights: "https://www.peihumanrights.ca/complaint-process",
  familyLawAct: "https://www.princeedwardisland.ca/sites/default/files/legislation/f-02-1-family_law_act.pdf",
  rptt: "https://www.princeedwardisland.ca/en/information/finance-and-affordability/real-property-transfer-tax-introduction",
  rpttFirstTime:
    "https://www.princeedwardisland.ca/en/information/finance/real-property-transfer-tax-first-time-home-buyers-exemption",
  registryFees: "https://www.princeedwardisland.ca/sites/default/files/publications/registry_fee_summary.pdf",
  registry: "https://www.princeedwardisland.ca/en/information/finance-and-affordability/registrar-of-deeds",
  landsProtection: "https://irac.pe.ca/lands/land/",
  rentalOffice: "https://peirentaloffice.ca/",
  probateAct: "https://www.princeedwardisland.ca/sites/default/files/legislation/p-21-probate_act.pdf",
  minorInjury: "https://www.princeedwardisland.ca/en/information/justice-and-public-safety/automobile-insurance",
  pnp: "https://www.princeedwardisland.ca/en/information/office-of-immigration/provincial-nominee-program",
};

const REGULATION_ANSWER =
  "To practise law in Prince Edward Island a lawyer must be a member of the Law Society of Prince Edward Island. You can look up practising lawyers in the Law Society's online lawyer directory to verify their status, and it publishes discipline case summaries. Each lawyer on these pages was checked in the directory before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Law Society, in writing.";

const NOTICE =
  "one week after 90 days' continuous employment, two weeks after one year, four weeks after five years, six weeks after ten years and eight weeks after fifteen years";

const INTESTACY =
  "If there is a spouse and no children, the spouse inherits the whole estate. If there is a spouse and one child, the spouse receives half; if there is more than one child, the spouse receives one third. The children share the rest.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and Prince Edward Island nominates some applicants through the PEI Provincial Nominee Program (PNP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "One pathway to permanent residence in Prince Edward Island is to be nominated to the federal government through the PEI Provincial Nominee Program (PNP).",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "PEI Provincial Nominee Program", href: L.pnp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from Prince Edward Island's Family Law Act, whose property rules apply to married spouses.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in Prince Edward Island for a full year before applying.",
      "Under the Family Law Act, when a marriage ends or the spouses separate, the spouse with the smaller 'net family property' is entitled to half the difference between the two.",
      "For property division the Act defines a spouse as a married person, so the rule does not cover unmarried couples. The Act's support rules are wider and can cover unmarried partners.",
      "A property application must be made by the earlier of two years after a divorce, or six years after the spouses begin to live separate and apart.",
      "The Family Section of the Supreme Court deals with divorce and matrimonial property.",
    ],
    links: [
      { label: "Family Law Act", href: L.familyLawAct },
      { label: "Supreme Court of Prince Edward Island", href: L.supremeCourt },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "PEI Legal Aid", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. In Prince Edward Island court awards for the pain and suffering of a 'minor personal injury' from a car accident are capped — at $9,659 for accidents in 2026. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Court awards for pain and suffering from a minor personal injury in an automobile accident are capped. The cap is $9,659 for accidents in 2026 and is adjusted each January.",
      "An action for injury to the person must be started within two years after the cause of action arose.",
      "The Small Claims Section of the Supreme Court hears claims up to $16,000. Larger claims go to the General Section.",
    ],
    links: [
      { label: "Automobile insurance and the minor injury cap", href: L.minorInjury },
      { label: "Statute of Limitations", href: L.limitations },
      { label: "Supreme Court of Prince Edward Island", href: L.supremeCourt },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Prince Edward Island brought a new Employment Standards Act into force on 30 June 2026; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "Under the new Employment Standards Act a complaint must be delivered to the chief inspector within two years of the alleged contravention.",
      `The minimum notice of termination from an employer (or pay instead) is ${NOTICE}. No notice is required in the first 90 days. Courts often award more ('reasonable notice') unless a valid contract limits it.`,
      "A human rights complaint must be made within one year of the incident.",
      "Claims up to $16,000 can go to the Small Claims Section of the Supreme Court. Ask a lawyer which limitation period applies to a wrongful dismissal claim.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "Employment standards in PEI", href: L.esOverview },
      { label: "Notice of termination", href: L.esTermination },
      { label: "Employment Standards Act", href: L.esAct },
      { label: "PEI Human Rights Commission: complaint process", href: L.humanRights },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In Prince Edward Island the buyer pays real property transfer tax of 1% when the deed is registered, and first-time home buyers who qualify are exempt. People who do not live on the Island need permission to buy larger pieces of land.",
    points: [
      "Real property transfer tax is 1% of the greater of the purchase price and the assessed value — $3,500 on a $350,000 home. No tax is payable where that figure is $30,000 or less.",
      "First-time home buyers are exempt if they are Canadian citizens or permanent residents, have lived in PEI for at least six months (or filed PEI income tax returns in two of the last six years), have never owned a principal residence, and live in the home for at least 183 days in a row.",
      "The Registry of Deeds charges a fee for the deed and again for the mortgage, from $77.25 to $463.65 depending on the value. At $200,000 or more it is $463.65.",
      "Under the Lands Protection Act a person who is not a resident of PEI needs government permission to hold more than five acres of land or more than 165 feet of shore frontage.",
      "The Residential Tenancy Office (the 'Rental Office') resolves disputes between tenants and landlords. Its orders can be appealed to the Island Regulatory and Appeals Commission.",
    ],
    links: [
      { label: "Real property transfer tax", href: L.rptt },
      { label: "First-time home buyers exemption", href: L.rpttFirstTime },
      { label: "Registry of Deeds fees", href: L.registryFees },
      { label: "Lands Protection Act (IRAC)", href: L.landsProtection },
      { label: "Residential Tenancy Office", href: L.rentalOffice },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. In Prince Edward Island probate is handled by the Estates Section of the Supreme Court, and the Probate Act sets out who inherits when there is no will.",
    points: [
      "The Estates Section of the Supreme Court of Prince Edward Island grants probate and administration.",
      "Probate fees are set by a schedule to the Probate Act and depend on the value of the estate.",
      `When someone dies without a will: ${INTESTACY.charAt(0).toLowerCase()}${INTESTACY.slice(1)}`,
    ],
    links: [
      { label: "Probate Act", href: L.probateAct },
      { label: "Supreme Court of Prince Edward Island", href: L.supremeCourt },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "Prince Edward Island";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the PEI Provincial Nominee Program?",
          answer:
            "If you are seeking permanent residence in Prince Edward Island, one pathway is to be nominated to the federal government through the PEI Provincial Nominee Program (PNP). See the provincial Office of Immigration's website for the current streams and requirements.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Prince Edward Island?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in Prince Edward Island for a full year before applying.",
        },
        {
          question: "How is property divided when a marriage ends in Prince Edward Island?",
          answer:
            "Under the Family Law Act each spouse's 'net family property' is worked out, and the spouse with the smaller amount is entitled to half the difference. The application must be made by the earlier of two years after a divorce, or six years after the spouses begin to live separate and apart.",
        },
        {
          question: "Do common-law partners have the same property rights in Prince Edward Island?",
          answer:
            "No. For property division the Family Law Act defines a spouse as a married person, so the equalisation rule does not cover unmarried couples. The Act's support rules are wider and can cover unmarried partners.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in Prince Edward Island"}?`,
          answer: info ? info.familyCourt : "The Family Section of the Supreme Court of Prince Edward Island deals with divorce and matrimonial property.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Is there a cap on injury compensation after a car accident in Prince Edward Island?",
          answer:
            "Yes, for minor injuries. Court awards for the pain and suffering of a 'minor personal injury' from an automobile accident are capped at $9,659 for accidents in 2026. The cap is adjusted each January.",
        },
        {
          question: "How long do I have to start an injury claim in Prince Edward Island?",
          answer:
            "Under the Statute of Limitations an action for injury to the person must be started within two years after the cause of action arose. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "Where are injury claims decided in Prince Edward Island?",
          answer:
            "The Small Claims Section of the Supreme Court hears claims up to $16,000. Larger claims go to the Supreme Court's General Section.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in Prince Edward Island?",
          answer:
            "Under the Employment Standards Act that came into force on 30 June 2026, a complaint must be delivered to the chief inspector within two years of the alleged contravention. A human rights complaint must be made within one year. Court claims have their own limitation periods — ask a lawyer which applies. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in Prince Edward Island?",
          answer: `The minimum notice from an employer (or pay instead) is ${NOTICE}; none is required in the first 90 days. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.`,
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Prince Edward Island"} be heard?`,
          answer: `Employment standards complaints go to the Employment Standards Branch and human rights complaints to the PEI Human Rights Commission. Lawsuits up to $16,000 can go to the Small Claims Section of the Supreme Court, and larger claims to its General Section${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `How much is the transfer tax on a home${city ? ` in ${city.name}` : " in Prince Edward Island"}?`,
          answer:
            "Real property transfer tax is 1% of the greater of the purchase price and the property's assessed value — $3,500 on a $350,000 home. No tax is payable where that figure is $30,000 or less. It is paid when the deed is registered with the Registrar of Deeds.",
        },
        {
          question: "Do first-time buyers pay the transfer tax in Prince Edward Island?",
          answer:
            "Not if they qualify for the first-time home buyers exemption. You must be a Canadian citizen or permanent resident, have lived in PEI for at least six months before registration (or have filed PEI income tax returns in at least two of the last six years), never have owned a principal residence, and live in the home for at least 183 days in a row after the deed is registered.",
        },
        {
          question: "Can someone from outside Prince Edward Island buy land there?",
          answer:
            "Yes, but with limits. Under the Lands Protection Act a person who is not a resident of PEI needs permission from the provincial government to hold more than five acres of land or more than 165 feet of shore frontage. The Island Regulatory and Appeals Commission reviews the applications.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in Prince Edward Island"} dealt with?`,
          answer:
            "The Residential Tenancy Office, also called the Rental Office, resolves disputes between tenants and landlords under the Residential Tenancy Act. Its orders can be appealed to the Island Regulatory and Appeals Commission.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in Prince Edward Island?",
          answer: info ? info.estates : "Applications go to the Estates Section of the Supreme Court of Prince Edward Island.",
        },
        {
          question: "How much does probate cost in Prince Edward Island?",
          answer:
            "Probate fees are set by a schedule to the Probate Act and depend on the value of the estate. Ask the Supreme Court's Estates Section or a lawyer for the fee on your estate. Legal fees are separate.",
        },
        {
          question: "What happens if someone dies without a will in Prince Edward Island?",
          answer: `The Probate Act decides who inherits. ${INTESTACY}`,
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const PRINCE_EDWARD_ISLAND: CaProvinceContent = {
  checked: "4 October 2026",
  jurisdiction: {
    title: "Prince Edward Island law and courts",
    body: "The Supreme Court of Prince Edward Island has four sections: the General Section for larger civil claims, the Family Section for divorce and matrimonial property, the Estates Section for probate, and the Small Claims Section for claims up to $16,000. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Law Society of Prince Edward Island, which also deals with complaints about them.",
  },
  courtsSummary:
    "The Supreme Court of Prince Edward Island has a General Section for larger civil claims, a Family Section for divorce and matrimonial property, an Estates Section for probate, and a Small Claims Section for claims up to $16,000.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Employment standards complaints go to PEI's Employment Standards Branch within two years of the alleged contravention, and human rights complaints go to the PEI Human Rights Commission within one year.",
  freeHelp: {
    text: "PEI Legal Aid provides legal representation and assistance to low-income individuals who have serious legal needs in criminal law, youth criminal justice, or family and civil law.",
    links: [{ label: "PEI Legal Aid", href: L.legalAid }],
  },
  courtsSource: { label: "Prince Edward Island courts: contact and locations (courts.pe.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Prince Edward Island cities
// ---------------------------------------------------------------------------

export const PEI_CITY_INFO: Record<string, CaCityInfo> = {
  charlottetown: {
    local:
      "Charlottetown is the provincial capital. The Court of Appeal and the Supreme Court — including its Family, Estates and Small Claims sections — sit at the Sir Louis Henry Davies Law Courts, 42 Water Street. The Provincial Court, which hears criminal cases, is in a separate building at 3 Harbourside Access Road. Home purchases in Queens and Kings counties are registered at the Registry of Deeds in the Jones Building, 11 Kent Street.",
    courts: [
      {
        name: "Sir Louis Henry Davies Law Courts",
        address: "42 Water Street, Charlottetown, PE C1A 7N8",
        url: L.courts,
        use: "Court of Appeal and Supreme Court (General, Family, Estates and Small Claims sections)",
      },
    ],
    familyCourt:
      "For Charlottetown, divorce and matrimonial property cases go to the Family Section of the Supreme Court, which sits at the Sir Louis Henry Davies Law Courts, 42 Water Street.",
    estates:
      "Applications go to the Estates Section of the Supreme Court of Prince Edward Island, which sits at the Sir Louis Henry Davies Law Courts, 42 Water Street, Charlottetown.",
  },
};
