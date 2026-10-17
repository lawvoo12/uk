// ============================================================================
// ONTARIO — law content and city information for the /ca pages.
//
// Every number below was read on an official source on 2-3 Oct 2026:
//  - Land transfer tax bands; first-time buyer refund ($4,000; first
//    $368,000; age 18; nine months): ontario.ca "Calculating land transfer
//    tax" (updated 22 Apr 2026) and "Land transfer tax refunds for first-time
//    homebuyers" (updated 10 Feb 2026)
//  - Toronto municipal land transfer tax (higher rates above $3 million from
//    1 Apr 2026), first-time rebate up to $4,475, 10% municipal non-resident
//    tax: toronto.ca
//  - Non-Resident Speculation Tax 25%: ontario.ca (updated 4 May 2026)
//  - Small Claims Court $50,000 from 1 Oct 2025, and "a claim can't be filed
//    more than two years after the incident in most cases": ontario.ca
//    "Small claims court: suing someone"
//  - Employment standards claim within two years; two weeks to withdraw;
//    can't claim and sue: ontario.ca ESA guide "Filing a claim"
//  - Notice of termination 1 to 8 weeks: ontario.ca ESA guide "Termination
//    of employment". Severance pay (5+ years; $2.5 million payroll):
//    ontario.ca ESA guide "Severance pay"
//  - Human Rights Tribunal of Ontario, one year: tribunalsontario.ca/hrto
//  - Property division; 6 years / 2 years: ontario.ca "Dividing property
//    when a marriage or common law relationship ends"
//  - Family Court branch: 25 locations including Hamilton, Kitchener, London
//    and Ottawa (not Toronto or Brampton): ontario.ca "Guide to procedures
//    in family court" and "Ontario court structure"
//  - Probate, Small Estate Certificate ($150,000), where to apply:
//    ontario.ca "Apply for probate of an estate" (updated 11 Sep 2025)
//  - Estate Administration Tax ($15 per $1,000 above $50,000): ontario.ca
//  - "A common law spouse does not inherit under the Succession Law Reform
//    Act": ontario.ca "Administering estates"
//  - Report a car accident to your insurer within seven days; accident
//    benefit disputes go to the Licence Appeal Tribunal: FSRA brochure
//    "After an Auto Accident: Understanding the Claims Process" and
//    tribunalsontario.ca/lat
//  - City of Toronto: notice within 10 days for roads and sidewalks:
//    toronto.ca "How to file a claim"
//  - Courthouse addresses and what each one hears: ontario.ca/locations/courts
//    and ontariocourts.ca/scj
//  - Legal Aid Ontario and its phone number: legalaid.on.ca
//  - Ontario Immigrant Nominee Program: ontario.ca
//
// LEFT OUT because the official source (Ontario e-Laws) could not be read:
//  - the dollar amount of a married spouse's preferential share on
//    intestacy, and how the rest is split with children (O. Reg. 54/95 and
//    the Succession Law Reform Act) — the pages link to the official text
//  - the deadline for returning the accident benefits application
//    (O. Reg. 34/10, s. 32)
//  - the notice period for municipalities other than Toronto
//    (Municipal Act, 2001, s. 44)
// Re-check the tax rates after each provincial budget and Toronto budget.
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
  directory: CA_REGULATORS.LSO.directoryUrl,
  complaints: "https://lso.ca/protecting-the-public/complaints",
  referralService: "https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/law-society-referral-service",
  legalAid: "https://www.legalaid.on.ca/",
  courts: "https://www.ontario.ca/locations/courts",
  courtStructure: "https://www.ontario.ca/page/ontario-court-structure",
  familyCourtGuide: "https://www.ontario.ca/document/guide-procedures-family-court/choosing-appropriate-municipality-and-court",
  smallClaims: "https://www.ontario.ca/page/suing-someone-small-claims-court",
  propertyDivision: "https://www.ontario.ca/page/dividing-property-when-marriage-or-common-law-relationship-ends",
  esaClaim: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/filing-claim",
  esaTermination: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/termination-employment",
  esaSeverance: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/severance-pay",
  hrto: "https://tribunalsontario.ca/hrto/",
  ltt: "https://www.ontario.ca/document/land-transfer-tax/calculating-land-transfer-tax",
  lttFirstTime: "https://www.ontario.ca/document/land-transfer-tax/land-transfer-tax-refunds-first-time-homebuyers",
  torontoMltt:
    "https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-land-transfer-tax-mltt/municipal-land-transfer-tax-mltt-rates-and-fees/",
  nrst: "https://www.ontario.ca/document/non-resident-speculation-tax",
  ltb: "https://tribunalsontario.ca/ltb/",
  probate: "https://www.ontario.ca/page/apply-probate-estate",
  estateTax: "https://www.ontario.ca/page/estate-administration-tax",
  administeringEstates: "https://www.ontario.ca/page/administering-estates",
  intestacyRegulation: "https://www.ontario.ca/laws/regulation/950054",
  lat: "https://tribunalsontario.ca/lat/",
  autoClaims: "https://www.fsrao.ca/media/7386/download",
  torontoClaims:
    "https://www.toronto.ca/city-government/accountability-operations-customer-service/complaints-claims-compliments/make-a-claim-against-the-city/how-to-file-a-claim/",
  oinp: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp",
};

const REGULATION_ANSWER =
  "To practise law in Ontario a lawyer must be licensed by the Law Society of Ontario, which also licenses paralegals. You can look up anyone in the Law Society's public Lawyer and Paralegal Directory, which shows their status and any discipline history. Each lawyer on these pages was checked in that directory before being listed, but people move firms, so check again before you hire. Complaints about a lawyer go to the Law Society.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and Ontario nominates some applicants through the Ontario Immigrant Nominee Program (OINP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "The Ontario Immigrant Nominee Program (OINP) nominates people with the skills and experience Ontario's economy needs for permanent residence. The Government of Canada makes the final decision.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "Ontario Immigrant Nominee Program", href: L.oinp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting time and decision-making, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division and most other family rights come from Ontario's Family Law Act.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in Ontario for a full year before applying.",
      "Married spouses share the value of property built up during the marriage through an 'equalization of net family property'. Common-law couples are not legally required to split property, though they can make a cohabitation agreement.",
      "A claim for an equalization payment must be started within six years of separating or two years of the divorce, whichever comes first.",
      "In the 25 places with a Family Court branch of the Superior Court of Justice (including Ottawa, Hamilton, London and Kitchener), one court hears every family matter. Elsewhere (including Toronto and Brampton), divorce and property division go to the Superior Court of Justice, and the Ontario Court of Justice hears other matters such as parenting and support.",
      "Legal Aid Ontario helps financially eligible people with family law matters.",
    ],
    links: [
      { label: "Dividing property when a relationship ends", href: L.propertyDivision },
      { label: "Which family court to use", href: L.familyCourtGuide },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "Legal Aid Ontario", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car accidents, slips and falls, long-term disability claims and medical malpractice. In Ontario a car accident must be reported to your insurer within seven days, whoever was at fault, and in most cases a court claim can't be filed more than two years after the incident. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "In most cases a court claim can't be filed more than two years after the incident (Limitations Act, 2002). Some deadlines are much shorter.",
      "After a car accident involving injury or damage, report it to your insurance company within seven days, whoever was at fault. Return the accident benefits application promptly — the forms set the deadlines.",
      "Disputes with an insurer about accident benefits go to the Licence Appeal Tribunal, not the courts.",
      "If you were hurt on a road or sidewalk, the municipality must be told very quickly. The City of Toronto, for example, requires notice within 10 days of the incident.",
      "Many Ontario injury lawyers work on a contingency fee — a share of what you recover. Ask for the fee agreement in writing and read it before you sign.",
    ],
    links: [
      { label: "After an auto accident: the claims process (FSRA)", href: L.autoClaims },
      { label: "Licence Appeal Tribunal", href: L.lat },
      { label: "Small Claims Court (claims up to $50,000)", href: L.smallClaims },
      { label: "City of Toronto: how to file a claim", href: L.torontoClaims },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most Ontario workers are covered by the Employment Standards Act, 2000; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "An Employment Standards Act claim (unpaid wages, termination pay, vacation pay) is filed with Ontario's Ministry of Labour, generally within two years. You can't file a claim and also sue in court over the same issue.",
      "The Act sets minimum notice of termination — from one week up to eight weeks, depending on length of service — and employees with five or more years' service may also be owed severance pay if the employer's payroll is at least $2.5 million. Courts often award more ('reasonable notice') unless a valid contract limits it.",
      "In most cases a wrongful dismissal lawsuit can't be filed more than two years after the dismissal. Claims up to $50,000 can go to Small Claims Court.",
      "Discrimination and harassment complaints go to the Human Rights Tribunal of Ontario, within one year of the last incident.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "Filing an employment standards claim", href: L.esaClaim },
      { label: "Termination of employment (ESA guide)", href: L.esaTermination },
      { label: "Severance pay (ESA guide)", href: L.esaSeverance },
      { label: "Human Rights Tribunal of Ontario", href: L.hrto },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages and refinancing, title problems, and landlord and tenant matters. In Ontario buyers pay provincial land transfer tax — plus Toronto's own municipal land transfer tax for homes in the city.",
    points: [
      "Ontario land transfer tax is 0.5% on the first $55,000 of the price, 1% up to $250,000, 1.5% up to $400,000, 2% up to $2 million, and 2.5% above $2 million on homes with one or two single-family residences.",
      "First-time buyers who are Canadian citizens or permanent residents can get a refund of up to $4,000 — enough to cover the tax on the first $368,000 of the price.",
      "Homes in the City of Toronto also pay Toronto's municipal land transfer tax, which has higher rates above $3 million. Its first-time buyer rebate is up to $4,475.",
      "Foreign nationals and foreign corporations pay a 25% Non-Resident Speculation Tax on homes anywhere in Ontario, and Toronto charges its own 10% on top.",
      "Most residential tenancy disputes go to the Landlord and Tenant Board, not the courts.",
    ],
    links: [
      { label: "Ontario land transfer tax rates", href: L.ltt },
      { label: "First-time homebuyer refund", href: L.lttFirstTime },
      { label: "Toronto municipal land transfer tax", href: L.torontoMltt },
      { label: "Non-Resident Speculation Tax", href: L.nrst },
      { label: "Landlord and Tenant Board", href: L.ltb },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will and powers of attorney, applying for probate, administering an estate, and estate disputes. In Ontario probate is a Certificate of Appointment of Estate Trustee from the Superior Court of Justice, and Estate Administration Tax is charged on estates over $50,000.",
    points: [
      "Probate in Ontario is a Certificate of Appointment of Estate Trustee, issued by the Superior Court of Justice. You apply at the court for the county or district where the person lived.",
      "Estate Administration Tax is $15 for every $1,000 of the estate's value above $50,000. Estates worth $50,000 or less pay none.",
      "Estates worth up to $150,000 can use the simpler Small Estate Certificate.",
      "If there is no will, the Succession Law Reform Act decides who inherits — generally the married spouse and closest next of kin. A common-law spouse does not inherit under that Act.",
      "Powers of attorney for property and for personal care let someone you trust act for you if you can't.",
    ],
    links: [
      { label: "Apply for probate of an estate", href: L.probate },
      { label: "Estate Administration Tax", href: L.estateTax },
      { label: "Administering estates (including dying without a will)", href: L.administeringEstates },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "Ontario";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the Ontario Immigrant Nominee Program?",
          answer:
            "The OINP is Ontario's economic immigration program. It nominates people with the skills and experience the province needs for permanent residence. A nomination is not a visa — the Government of Canada makes the final decision.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Ontario?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in Ontario for a full year before applying.",
        },
        {
          question: "How is property divided when a marriage ends in Ontario?",
          answer:
            "Married spouses share the value of what they built up during the marriage. Each spouse's 'net family property' is worked out, and the one with more pays the other half the difference — an equalization payment. The family home gets special treatment: its full value is shared even if one spouse owned it before the marriage. You must claim within six years of separating or two years of the divorce, whichever comes first.",
        },
        {
          question: "Do common-law partners have the same rights in Ontario?",
          answer:
            "Not for property. Common-law couples in Ontario are not legally required to split property acquired while they lived together — it generally stays with whoever bought it — unless they have a cohabitation agreement. Common-law partners may still be able to claim support, and both parents owe child support whatever their relationship was.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in Ontario"}?`,
          answer: info
            ? `${info.familyCourt} Ontario's Family Court branch of the Superior Court hears every family matter in its 25 locations; elsewhere, divorce and property division go to the Superior Court of Justice and the Ontario Court of Justice hears other matters such as parenting and support.`
            : "It depends where you live. In the 25 locations with a Family Court branch of the Superior Court of Justice (including Ottawa, Hamilton, London and Kitchener), that one court hears every family matter. Elsewhere (including Toronto and Brampton), divorce and property division go to the Superior Court of Justice, and the Ontario Court of Justice hears other matters such as parenting and support.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "How long do I have to start a personal injury claim in Ontario?",
          answer:
            "In most cases a court claim can't be filed more than two years after the incident. Some deadlines are far shorter — the City of Toronto, for example, requires notice within 10 days of an incident on a road or sidewalk, and other municipalities have short notice rules too. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "What should I do after a car accident in Ontario?",
          answer:
            "Get medical care and report the accident. Tell your insurance agent, broker or company within seven days, whoever was at fault, and return the accident benefits forms as quickly as you can — the forms set the deadlines. A lawsuit against an at-fault driver is separate from your accident benefits claim.",
        },
        {
          question: "Where do accident benefits disputes go in Ontario?",
          answer:
            "To the Licence Appeal Tribunal, which resolves disputes about a person's entitlement to, or the amount of, statutory accident benefits. Lawsuits for pain and suffering and other losses go to the Superior Court of Justice, or to Small Claims Court for claims up to $50,000.",
        },
        {
          question: "How do personal injury lawyers charge in Ontario?",
          answer:
            "Many work on a contingency fee, meaning the fee is a share of what you recover. Ask for the agreement in writing, check what percentage applies and who pays expenses, and compare more than one firm before you sign.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in Ontario?",
          answer:
            "An Employment Standards Act claim to the Ministry of Labour must generally be filed within two years. In most cases a court claim can't be filed more than two years after the dismissal. A human rights application must be filed within one year of the last incident. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "Should I file an employment standards claim or sue in Ontario?",
          answer:
            "You have to choose: you can't file a claim with the Ministry and also sue in court over the same issue, and if you file a claim and change your mind you have two weeks to withdraw it. The Ministry enforces the minimums in the Employment Standards Act. A court can award 'reasonable notice', which is often more — so get advice before you file or sign a release.",
        },
        {
          question: "How much severance am I owed in Ontario?",
          answer:
            "The Employment Standards Act sets minimums: notice of termination of one to eight weeks depending on your length of service, plus severance pay if you have five or more years' service and your employer's payroll is at least $2.5 million. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.",
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Ontario"} be heard?`,
          answer: `Ministry of Labour claims and Human Rights Tribunal applications are filed online. Lawsuits go to the Superior Court of Justice, or to its Small Claims Court branch for claims up to $50,000${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `How much is land transfer tax on a home${city ? ` in ${city.name}` : " in Ontario"}?`,
          answer: `Ontario land transfer tax is 0.5% on the first $55,000 of the price, 1% from $55,000 to $250,000, 1.5% from $250,000 to $400,000, 2% from $400,000 to $2 million, and 2.5% above $2 million (on homes with one or two single-family residences). ${
            city?.slug === "toronto"
              ? "Because the home is in Toronto, the city's municipal land transfer tax is charged as well, at the same rates up to $3 million and higher rates above that."
              : city
                ? `Toronto's extra municipal land transfer tax does not apply in ${city.name}.`
                : "Homes in the City of Toronto also pay Toronto's municipal land transfer tax."
          }`,
        },
        {
          question: "Is there a land transfer tax break for first-time buyers in Ontario?",
          answer: `Yes. First-time buyers who are Canadian citizens or permanent residents, are at least 18 and move in within nine months can get a refund of up to $4,000 of Ontario land transfer tax, which covers the tax on the first $368,000 of the price. You must never have owned a home anywhere in the world.${
            !city || city.slug === "toronto" ? " Toronto has its own rebate of up to $4,475 on its municipal tax." : ""
          }`,
        },
        {
          question: "Do I need a lawyer to buy a home in Ontario?",
          answer:
            "In practice, yes. A lawyer checks the title, deals with your lender, registers the transfer and mortgage, pays the land transfer tax and handles the money on closing. Ask for the fee and the expected disbursements (such as title insurance and registration fees) in writing.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in Ontario"} dealt with?`,
          answer:
            "Most residential tenancy disputes go to the Landlord and Tenant Board, not the courts. Commercial lease disputes and disputes over ownership or boundaries go to the Superior Court of Justice.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in Ontario?",
          answer: info
            ? `${info.estates} In Ontario probate is called a Certificate of Appointment of Estate Trustee, and you apply at the Superior Court of Justice for the county or district where the person lived.`
            : "In Ontario probate is called a Certificate of Appointment of Estate Trustee. You apply to the Superior Court of Justice at the court for the county or district where the person lived when they died.",
        },
        {
          question: "How much does probate cost in Ontario?",
          answer:
            "Estate Administration Tax is $15 for every $1,000 (or part of $1,000) of the estate's value above $50,000. Nothing is charged on the first $50,000, so an estate worth $50,000 or less pays no tax. Legal fees are separate.",
        },
        {
          question: "What happens if someone dies without a will in Ontario?",
          answer:
            "Ontario's Succession Law Reform Act sets out how the estate is shared. In general the people who can inherit are the married spouse and the closest next of kin; the Act and its regulation set the spouse's share and how the rest is divided with any children. A common-law spouse does not inherit under the Act, though they may have other claims. A lawyer can tell you who inherits in your situation.",
        },
        {
          question: "Is there a simpler process for small estates in Ontario?",
          answer:
            "Yes. If the estate is worth up to $150,000 you can apply for a Small Estate Certificate, which uses simpler forms than a full Certificate of Appointment of Estate Trustee.",
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const ONTARIO: CaProvinceContent = {
  checked: "3 October 2026",
  jurisdiction: {
    title: "Ontario law and courts",
    body: "Most civil and family cases in Ontario are heard by the Superior Court of Justice. Its Small Claims Court branch deals with claims up to $50,000 (raised from $35,000 on 1 October 2025). The Ontario Court of Justice hears some family matters, but not divorce or property division. Immigration, citizenship and divorce are governed by federal law. Lawyers and paralegals are licensed by the Law Society of Ontario, which also deals with complaints about them.",
  },
  courtsSummary:
    "Most civil and family cases in Ontario are heard by the Superior Court of Justice. Its Small Claims Court branch deals with claims up to $50,000.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Employment standards claims are filed online with Ontario's Ministry of Labour, generally within two years, and human rights applications go to the Human Rights Tribunal of Ontario within one year.",
  freeHelp: {
    text: "Legal Aid Ontario provides legal help to financially eligible low-income Ontarians, including in family and immigration matters (1-800-668-8258). The Law Society of Ontario also runs the Law Society Referral Service.",
    links: [
      { label: "Legal Aid Ontario", href: L.legalAid },
      { label: "Law Society Referral Service", href: L.referralService },
    ],
  },
  courtsSource: { label: "Ontario court locations (ontario.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Ontario cities
// ---------------------------------------------------------------------------

const PEEL_COURTHOUSE: CaCourt = {
  name: "A. Grenville and William Davis Courthouse",
  address: "7755 Hurontario Street, Brampton, ON L6W 4T1",
  url: "https://www.ontario.ca/locations/courts/2000-brampton-7755-hurontario-street",
  use: "Civil, family, Small Claims Court and Divisional Court",
};

export const ONTARIO_CITY_INFO: Record<string, CaCityInfo> = {
  toronto: {
    local:
      "Toronto has several courthouses rather than one. Civil cases are heard at 330 University Avenue, the Superior Court's family cases at 361 University Avenue, and there is a Family Court office and Small Claims Court at 47 Sheppard Avenue East in North York. Homes in the city pay Toronto's municipal land transfer tax on top of the Ontario tax.",
    courts: [
      {
        name: "Superior Court of Justice — 330 University Avenue",
        address: "330 University Avenue, Toronto, ON M5G 1R7",
        url: "https://www.ontario.ca/locations/courts/6010-toronto-330-university-ave",
        use: "Civil cases",
      },
      {
        name: "361 University Avenue courthouse",
        address: "361 University Avenue, Toronto, ON M5G 1T3",
        url: "https://www.ontario.ca/locations/courts/6002-toronto-361-university-ave",
        use: "Superior Court of Justice family cases (also criminal court)",
      },
      {
        name: "47 Sheppard Avenue East courthouse",
        address: "47 Sheppard Avenue East, Toronto, ON M2N 5N1",
        url: "https://www.ontario.ca/locations/courts/6004-toronto-47-sheppard-ave-east",
        use: "Small Claims Court, and a Family Court office",
      },
    ],
    courtNote: "Toronto does not have a Family Court branch, so family cases are split between the Superior Court of Justice and the Ontario Court of Justice.",
    familyCourt:
      "Toronto has no Family Court branch: divorce and property division go to the Superior Court of Justice (361 University Avenue), and the Ontario Court of Justice hears other family matters.",
    estates: "Probate applications for people who lived in Toronto are made to the Superior Court of Justice in Toronto.",
  },
  ottawa: {
    local:
      "Ottawa has a single courthouse at 161 Elgin Street for civil, family, Small Claims Court and Divisional Court cases. It has a Family Court branch of the Superior Court, so one court deals with divorce, property, parenting and support. As the national capital, Ottawa is also home to the Supreme Court of Canada and the Federal Court.",
    courts: [
      {
        name: "Ottawa Courthouse",
        address: "161 Elgin Street, Ottawa, ON K2P 2K1",
        url: "https://www.ontario.ca/locations/courts/3019-ottawa-161-elgin-st-2nd-fl",
        use: "Civil, Family Court, Small Claims Court and Divisional Court",
      },
    ],
    familyCourt: "Ottawa has a Family Court branch of the Superior Court of Justice at the Ottawa Courthouse, 161 Elgin Street, which hears every family matter.",
    estates: "Probate applications for people who lived in Ottawa are made to the Superior Court of Justice at the Ottawa Courthouse, 161 Elgin Street.",
  },
  mississauga: {
    local:
      "Mississauga is part of Peel Region. Ontario's list of court locations has no courthouse in Mississauga itself: civil, family and Small Claims Court cases for Peel are heard at the A. Grenville and William Davis Courthouse on Hurontario Street in Brampton. Toronto's municipal land transfer tax does not apply in Mississauga.",
    courts: [PEEL_COURTHOUSE],
    courtNote: "This courthouse is in Brampton and serves Peel Region, which includes Mississauga.",
    familyCourt:
      "Family cases for Mississauga are heard at the Peel courthouse in Brampton (7755 Hurontario Street). Brampton is not one of the Family Court branch locations, so divorce and property division go to the Superior Court of Justice and the Ontario Court of Justice hears other family matters.",
    estates: "Probate applications for people who lived in Mississauga are made to the Superior Court of Justice for Peel, at 7755 Hurontario Street, Brampton.",
  },
  brampton: {
    local:
      "Brampton is home to Peel Region's courthouse, the A. Grenville and William Davis Courthouse at 7755 Hurontario Street, which hears civil, family, Small Claims Court and Divisional Court cases for Peel. Toronto's municipal land transfer tax does not apply in Brampton.",
    courts: [PEEL_COURTHOUSE],
    familyCourt:
      "Family cases for Brampton are heard at the Peel courthouse, 7755 Hurontario Street. Brampton is not one of the Family Court branch locations, so divorce and property division go to the Superior Court of Justice and the Ontario Court of Justice hears other family matters.",
    estates: "Probate applications for people who lived in Brampton are made to the Superior Court of Justice at 7755 Hurontario Street, Brampton.",
  },
  hamilton: {
    local:
      "Hamilton's civil, Small Claims Court and Divisional Court cases are heard at the John Sopinka Courthouse, 45 Main Street East, while the Family Court is a few blocks away at 55 Main Street West. Hamilton has a Family Court branch of the Superior Court, so one court deals with divorce, property, parenting and support.",
    courts: [
      {
        name: "John Sopinka Courthouse",
        address: "45 Main Street East, Hamilton, ON L8N 2B7",
        url: "https://www.ontario.ca/locations/courts/2008-hamilton-45-main-st-e",
        use: "Civil, Small Claims Court and Divisional Court",
      },
      {
        name: "Hamilton Family Court",
        address: "55 Main Street West, Hamilton, ON L8P 1H4",
        url: "https://www.ontario.ca/locations/courts/2007-hamilton-55-main-st-w",
        use: "Family Court",
      },
    ],
    familyCourt: "Hamilton has a Family Court branch of the Superior Court of Justice at 55 Main Street West, which hears every family matter.",
    estates: "Probate applications for people who lived in Hamilton are made to the Superior Court of Justice in Hamilton.",
  },
  "london-ontario": {
    local:
      "London has one courthouse, at 80 Dundas Street, for civil, family, Small Claims Court and Divisional Court cases. London has a Family Court branch of the Superior Court, so one court deals with divorce, property, parenting and support. Toronto's municipal land transfer tax does not apply in London.",
    courts: [
      {
        name: "London Courthouse",
        address: "80 Dundas Street, London, ON N6A 6A3",
        url: "https://www.ontario.ca/locations/courts/7011-london-80-dundas-st",
        use: "Civil, Family Court, Small Claims Court and Divisional Court",
      },
    ],
    familyCourt: "London has a Family Court branch of the Superior Court of Justice at the London Courthouse, 80 Dundas Street, which hears every family matter.",
    estates: "Probate applications for people who lived in London are made to the Superior Court of Justice at the London Courthouse, 80 Dundas Street.",
  },
  "kitchener-waterloo": {
    local:
      "Kitchener and Waterloo share the Waterloo Region Courthouse at 85 Frederick Street in Kitchener, which hears civil, family and Small Claims Court cases; Ontario's list of court locations has no courthouse in Waterloo itself. Kitchener has a Family Court branch of the Superior Court, so one court deals with divorce, property, parenting and support.",
    courts: [
      {
        name: "Waterloo Region Courthouse",
        address: "85 Frederick Street, Kitchener, ON N2H 0A7",
        url: "https://www.ontario.ca/locations/courts/7024-kitchener-85-frederick-street",
        use: "Civil, Family Court and Small Claims Court",
      },
    ],
    familyCourt: "Kitchener has a Family Court branch of the Superior Court of Justice at the Waterloo Region Courthouse, 85 Frederick Street, which hears every family matter.",
    estates: "Probate applications for people who lived in Kitchener or Waterloo are made to the Superior Court of Justice at the Waterloo Region Courthouse, 85 Frederick Street, Kitchener.",
  },
};
