// ============================================================================
// SASKATCHEWAN — law content and city information for the /ca pages.
//
// The regulator code is LSSK ("LSS" is the Law Society of Scotland).
//
// Every number below was read on an official source on 3 Oct 2026:
//  - Court of King's Bench Family Law Division "handles all family law
//    matters", including divorce and division of family property; its judges
//    are in Regina, Saskatoon and Prince Albert: sasklawcourts.ca
//  - Provincial Court small claims: "Claims cannot exceed $50,000":
//    sasklawcourts.ca
//  - Limitation periods: two years from the day the claim is discovered;
//    15 years from the act or omission: The Limitations Act, ss. 5 and 7
//    (publications.saskatchewan.ca)
//  - Employment standards complaint: 12 months: saskatchewan.ca "File an
//    employment standards complaint"
//  - Notice of termination: after more than 13 consecutive weeks — one week
//    (up to 1 year), two weeks (1 to 3 years), four weeks (3 to 5), six weeks
//    (5 to 10), eight weeks (more than 10): saskatchewan.ca "Individual
//    layoff or termination"
//  - Saskatchewan Human Rights Commission: one year: saskhrc.ca
//  - Family property: spouses include people who cohabited "continuously for
//    a period of not less than two years"; equal distribution; those spouses
//    must apply "within 24 months after the cohabitation ceases": The Family
//    Property Act, ss. 2, 3.1, 21, 22 (publications.saskatchewan.ca)
//  - Land Titles fees (effective 15 Apr 2026): title transfer free up to
//    $500, $25 up to $6,300, 0.4% of value above; mortgage registration
//    $200 / $275 / $525 / $775 / $1,000 by amount: saskregistries.ca (ISC)
//  - Office of Residential Tenancies "may adjudicate matters up to $30,000":
//    saskatchewan.ca
//  - Probate: $7 on every $1,000 of estate value, plus a $200 filing fee:
//    sasklawcourts.ca "Probating an estate"
//  - No will: spouse inherits everything if all the children are also the
//    spouse's; otherwise the first $200,000, then 1/2 of the rest (one child)
//    or 1/3 (more than one): The Intestate Succession Act, 2019, ss. 4-6, and
//    saskatchewan.ca (the $200,000 amount)
//  - SGI: everyone has No Fault Coverage unless they choose Tort Coverage;
//    Tort Coverage allows a claim for pain and suffering "subject to a $5,000
//    deductible": SGI "2026 Guide to Choosing Personal Auto Injury Insurance"
//  - Saskatchewan Immigrant Nominee Program: saskatchewan.ca
//  - Legal Aid Saskatchewan (areas of help, phone number): legalaid.sk.ca
//  - Courthouse and office addresses: sasklawcourts.ca, saskatchewan.ca,
//    saskregistries.ca
//  - Court of Appeal is in Regina and sits in Saskatoon six times a year:
//    sasklawcourts.ca. Regina is the capital: canada.ca
//
// LEFT OUT because no official page states it:
//  - which judicial centre a probate application must be filed at
// The pages also do not say "Saskatchewan has no land transfer tax": no
// official page states that in words, so they only describe the fees charged.
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
  directory: CA_REGULATORS.LSSK.directoryUrl,
  complaints: "https://www.lawsociety.sk.ca/for-the-public/concerns-about-a-legal-professional/",
  discipline: "https://www.lawsociety.sk.ca/regulation/hearings-decisions-and-rulings/discipline-decisions/",
  legalAid: "https://www.legalaid.sk.ca/",
  courts: "https://sasklawcourts.ca/court-locations/",
  kbLocations: "https://sasklawcourts.ca/kings-bench/court-locations/",
  pcLocations: "https://sasklawcourts.ca/provincial-court/court-locations-sitting-times-pc/",
  kbFamily: "https://sasklawcourts.ca/kings-bench/family-law/",
  smallClaims: "https://sasklawcourts.ca/provincial-court/small-claims-court/",
  limitationsAct: "https://publications.saskatchewan.ca//api/v1/products/9667/formats/14685/download",
  familyPropertyAct: "https://publications.saskatchewan.ca//api/v1/products/535/formats/710/download",
  esComplaint:
    "https://www.saskatchewan.ca/business/employment-standards/complaints-investigations-enforcement-and-fines/file-an-employment-standards-complaint",
  esTermination: "https://www.saskatchewan.ca/business/employment-standards/layoffs-and-termination/individual-layoff-or-termination",
  humanRights: "https://saskhrc.ca/filing-a-complaint/",
  landTitlesFees: "https://www.saskregistries.ca/Fees/LandTitlesFees",
  landTitles: "https://www.saskregistries.ca/landtitles",
  ort: "https://www.saskatchewan.ca/government/government-structure/boards-commissions-and-agencies/office-of-residential-tenancies",
  probate: "https://sasklawcourts.ca/kings-bench/wills-and-estates/probating-an-estate/",
  wills: "https://www.saskatchewan.ca/residents/justice-crime-and-the-law/answering-legal-questions/wills/about-wills-and-why-you-need-one",
  beneficiaries:
    "https://www.saskatchewan.ca/residents/births-deaths-marriages-and-divorces/dealing-with-death/administering-the-estate-of-someone-whos-died/beneficiaries",
  sgi: "https://sgi.sk.ca/basic-auto-injury-insurance",
  sinp: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program",
};

const REGULATION_ANSWER =
  "To practise law in Saskatchewan a lawyer must be a member of the Law Society of Saskatchewan. You can look up any lawyer in the Law Society's public directory, which shows where they practise and has a discipline column; the Law Society also publishes its discipline decisions. Each lawyer on these pages was checked in that directory before being listed, but people move firms, so check again before you hire. Concerns about a lawyer go to the Law Society.";

const NOTICE =
  "one week if you have worked there for more than 13 weeks, two weeks after one year, four weeks after three years, six weeks after five years and eight weeks after ten years";

const INTESTACY =
  "If there is a spouse and all the children are also the spouse's children, the spouse inherits the whole estate. If the person who died had a child who is not the spouse's, the spouse receives the first $200,000 and then half of the rest if there is one child, or one third if there is more than one; the children share what is left.";

const AREAS: Record<PracticeAreaSlug, CaAreaContent> = {
  immigration: {
    intro:
      "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal — applications go to Immigration, Refugees and Citizenship Canada (IRCC) — and Saskatchewan nominates some applicants through the Saskatchewan Immigrant Nominee Program (SINP).",
    points: [
      FED_POINTS.immigrationFederal,
      FED_POINTS.immigrationWhoCanCharge,
      "Through the Saskatchewan Immigrant Nominee Program (SINP), the province nominates successful applicants to the federal government for permanent residence. Nominees must still apply to IRCC, within six months of being nominated.",
      FED_POINTS.citizenship,
      FED_POINTS.federalCourt,
    ],
    links: [
      { label: "Immigration, Refugees and Citizenship Canada", href: CA_LINKS.ircc },
      { label: "Saskatchewan Immigrant Nominee Program", href: L.sinp },
      { label: "Immigration and Refugee Board", href: CA_LINKS.irb },
      { label: "Federal Court: applying for leave and judicial review", href: CA_LINKS.federalCourtGuide },
      { label: "Check an immigration consultant's licence", href: CA_LINKS.consultantRegister },
    ],
  },
  family: {
    intro:
      "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce follows the federal Divorce Act; property division comes from Saskatchewan's Family Property Act, which also covers couples who have lived together as spouses for at least two years.",
    points: [
      "The only ground for divorce is marriage breakdown, usually shown by living apart for one year. You or your spouse must have lived in Saskatchewan for a full year before applying.",
      "The Family Property Act applies to married spouses and to couples who have lived together as spouses continuously for at least two years. The general rule is that family property, including the family home, is divided equally, with exceptions where that would be unfair.",
      "A spouse who was not married must apply to divide family property within 24 months after the couple stops living together.",
      "The Family Law Division of the Court of King's Bench handles all family law matters, including divorce and the division of family property. Its judges sit in Regina, Saskatoon and Prince Albert.",
      "Legal Aid Saskatchewan provides legal services in family law to people who are financially eligible.",
    ],
    links: [
      { label: "Court of King's Bench: family law", href: L.kbFamily },
      { label: "The Family Property Act", href: L.familyPropertyAct },
      { label: "Divorce — Department of Justice Canada", href: CA_LINKS.divorce },
      { label: "Legal Aid Saskatchewan", href: L.legalAid },
    ],
  },
  "personal-injury": {
    intro:
      "Car crashes, slips and falls, disability claims and medical malpractice. In Saskatchewan, auto injury insurance comes from SGI, and most people have No Fault Coverage, which pays benefits but allows a lawsuit for pain and suffering only in very limited circumstances. Lawvoo only lists firms for this area — contact a firm directly.",
    points: [
      "Every Saskatchewan resident has SGI's No Fault Coverage unless they have filed a declaration choosing Tort Coverage.",
      "Under No Fault Coverage you receive a package of benefits and cannot sue for pain and suffering except in very limited circumstances. You can sue the person who caused the crash for expenses above what the benefits cover.",
      "Under Tort Coverage you receive a more basic package of benefits and can sue the person who caused the crash for pain and suffering, subject to a $5,000 deductible.",
      "The time limit to start a civil claim is two years from the day the claim is discovered, and no more than 15 years from the act or omission it is based on.",
      "The Provincial Court's small claims court hears claims up to $50,000. Larger claims go to the Court of King's Bench.",
    ],
    links: [
      { label: "SGI: auto injury insurance", href: L.sgi },
      { label: "The Limitations Act", href: L.limitationsAct },
      { label: "Small claims court", href: L.smallClaims },
    ],
  },
  employment: {
    intro:
      "Wrongful dismissal and severance, unpaid wages, workplace harassment and human rights at work. Most Saskatchewan workers are covered by the province's employment standards; banks, airlines, telecoms and other federally regulated employers come under the Canada Labour Code instead.",
    points: [
      "A complaint about unpaid wages must be made to Employment Standards within 12 months of the last day the wages were payable. Other complaints must be made within 12 months of the violation.",
      `The minimum written notice of termination (or pay instead) is ${NOTICE}. Courts often award more ('reasonable notice') unless a valid contract limits it.`,
      "The time limit to start a court claim, including a wrongful dismissal lawsuit, is two years from the day the claim is discovered. Claims up to $50,000 can go to small claims court.",
      "Discrimination complaints go to the Saskatchewan Human Rights Commission, within one year of the incident.",
      FED_POINTS.federalEmployers,
    ],
    links: [
      { label: "File an employment standards complaint", href: L.esComplaint },
      { label: "Individual layoff or termination", href: L.esTermination },
      { label: "Saskatchewan Human Rights Commission: filing a complaint", href: L.humanRights },
      { label: "Federal labour standards: timelines", href: CA_LINKS.federalLabourTimelines },
    ],
  },
  property: {
    intro:
      "Buying and selling homes and condos, mortgages, title problems, and landlord and tenant matters. In Saskatchewan, changes of ownership are registered in the Land Titles Registry, which is run by ISC, and the buyer pays a registration fee based on the property's value.",
    points: [
      "The fee to transfer a title is 0.4% of the property's value when it is worth more than $6,300 (a flat $25 from $500.01 to $6,300, and free up to $500). On a $400,000 home that is $1,600.",
      "Registering a mortgage costs $200 for a mortgage under $250,000, $275 from $250,000 to $500,000, $525 up to $750,000, $775 up to $1 million and $1,000 above that.",
      "These fees took effect on 15 April 2026. ISC publishes the current fee table on its Saskatchewan Registries website.",
      "Disputes between residential landlords and tenants go to the Office of Residential Tenancies, which can decide matters up to $30,000.",
    ],
    links: [
      { label: "Land Titles fees (ISC)", href: L.landTitlesFees },
      { label: "Land Titles Registry (ISC)", href: L.landTitles },
      { label: "Office of Residential Tenancies", href: L.ort },
    ],
  },
  "wills-probate": {
    intro:
      "Making a will, applying for probate, administering an estate, and estate disputes. In Saskatchewan, wills and estates are handled by the Court of King's Bench, and The Intestate Succession Act, 2019 sets out who inherits when there is no will.",
    points: [
      "Wills and estates are handled by the Court of King's Bench. The probate fee is $7 on every $1,000 of value passing through the estate, plus a $200 filing fee.",
      `When someone dies without a will: ${INTESTACY.charAt(0).toLowerCase()}${INTESTACY.slice(1)}`,
      "For inheritance, a spouse includes a partner who lived with the person as a spouse continuously for at least two years.",
    ],
    links: [
      { label: "Probating an estate (Courts of Saskatchewan)", href: L.probate },
      { label: "About wills and why you need one", href: L.wills },
      { label: "Who inherits: beneficiaries", href: L.beneficiaries },
    ],
  },
};

function categoryFaqs(area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo): FAQItem[] {
  const place = city?.name ?? "Saskatchewan";

  switch (area) {
    case "immigration":
      return [
        FED_FAQS.needLawyer,
        FED_FAQS.citizenship,
        FED_FAQS.refusal,
        {
          question: "What is the Saskatchewan Immigrant Nominee Program?",
          answer:
            "Through the Saskatchewan Immigrant Nominee Program (SINP), the province nominates successful applicants to the federal government for permanent residence in Canada. Approved applicants must still apply to Immigration, Refugees and Citizenship Canada, within six months of being nominated. See the Government of Saskatchewan's website for the current categories and requirements.",
        },
        { question: `Are the immigration lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Saskatchewan?",
          answer:
            "Divorce is federal law, so the rule is the same across Canada: the only ground is marriage breakdown, usually shown by living apart for one year or more. You or your spouse must have lived in Saskatchewan for a full year before applying.",
        },
        {
          question: "How is property divided when a relationship ends in Saskatchewan?",
          answer:
            "Under The Family Property Act the general rule is that family property, including the family home, is divided equally between the spouses. A court can order a different split where an equal one would be unfair.",
        },
        {
          question: "Do common-law partners have the same property rights in Saskatchewan?",
          answer:
            "Yes, if they lived together as spouses continuously for at least two years. The Family Property Act then applies to them as it does to married couples — but they must apply within 24 months after they stop living together.",
        },
        {
          question: `Which court deals with family cases${city ? ` for ${city.name}` : " in Saskatchewan"}?`,
          answer: info
            ? info.familyCourt
            : "The Family Law Division of the Court of King's Bench handles all family law matters, including divorce and the division of family property. Its judges sit in Regina, Saskatoon and Prince Albert.",
        },
        { question: `Are the family lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Can I sue after a car crash in Saskatchewan?",
          answer:
            "It depends on your SGI coverage. Every resident has No Fault Coverage unless they chose Tort Coverage. With No Fault Coverage you cannot sue for pain and suffering except in very limited circumstances, though you can sue for expenses above what your benefits cover. With Tort Coverage you can sue the person who caused the crash for pain and suffering, subject to a $5,000 deductible.",
        },
        {
          question: "How long do I have to start an injury claim in Saskatchewan?",
          answer:
            "Under The Limitations Act a claim must be started within two years from the day it is discovered, and no more than 15 years after the act or omission it is based on. A lawyer can confirm the dates that apply to you.",
        },
        {
          question: "Where are injury claims decided in Saskatchewan?",
          answer:
            "The Provincial Court's small claims court hears claims up to $50,000. Larger claims go to the Court of King's Bench. Benefits under SGI's injury coverage are claimed from SGI.",
        },
        FED_FAQS.piNoForm,
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring an employment claim in Saskatchewan?",
          answer:
            "A complaint about unpaid wages must be made to Employment Standards within 12 months of the last day the wages were payable. A human rights complaint must be made within one year of the incident. A court claim, including wrongful dismissal, must be started within two years from the day the claim is discovered. If your employer is federally regulated (a bank, airline or telecom company, for example), an unjust dismissal complaint under the Canada Labour Code must be filed within 90 days.",
        },
        {
          question: "How much notice or severance am I owed in Saskatchewan?",
          answer: `The minimum written notice (or pay instead) is ${NOTICE}. Unless your contract validly limits you to those minimums, a court may award more based on your age, role, length of service and how long it should take to find similar work.`,
        },
        {
          question: `Where would an employment case${city ? ` from ${city.name}` : " in Saskatchewan"} be heard?`,
          answer: `Employment standards complaints go to Saskatchewan's Employment Standards office and discrimination complaints to the Saskatchewan Human Rights Commission. Lawsuits up to $50,000 can go to the Provincial Court's small claims court, and larger claims to the Court of King's Bench${
            info && info.courts[0] ? ` — for ${city!.name}, see the court list on our ${city!.name} page` : ""
          }.`,
        },
        { question: `Are the employment lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: `What does it cost to register a home purchase${city ? ` in ${city.name}` : " in Saskatchewan"}?`,
          answer:
            "The Land Titles fee to transfer a title is 0.4% of the property's value when it is worth more than $6,300 — $1,600 on a $400,000 home. Registering a mortgage costs between $200 and $1,000 depending on the amount ($275 for a mortgage from $250,000 to $500,000). These fees took effect on 15 April 2026. Your lawyer's fees are separate.",
        },
        {
          question: "Who runs the land titles system in Saskatchewan?",
          answer:
            "The Land Titles Registry issues titles to land and registers changes of ownership and interests such as mortgages. It is run by ISC, which has customer service centres in Regina and Saskatoon. Your lawyer normally submits the documents for you.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : " in Saskatchewan"} dealt with?`,
          answer:
            "The Office of Residential Tenancies settles disputes between residential landlords and tenants and can decide matters up to $30,000. It has offices in Regina and Saskatoon.",
        },
        { question: `Are the real estate lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
    case "wills-probate":
      return [
        {
          question: city ? `Where do I apply for probate for someone who lived in ${city.name}?` : "Where do I apply for probate in Saskatchewan?",
          answer: info
            ? info.estates
            : "Wills and estates are handled by the Court of King's Bench. The application forms are filed with the court together with the fees.",
        },
        {
          question: "How much does probate cost in Saskatchewan?",
          answer:
            "The probate fee is $7 on every $1,000 of value passing through the estate, plus a $200 filing fee. On an estate of $300,000 the probate fee is $2,100. Legal fees are separate.",
        },
        {
          question: "What happens if someone dies without a will in Saskatchewan?",
          answer: `The Intestate Succession Act, 2019 decides who inherits. ${INTESTACY} Someone must apply to the court to administer the estate.`,
        },
        { question: `Are the wills and estates lawyers listed for ${place} licensed?`, answer: REGULATION_ANSWER },
      ];
  }
}

export const SASKATCHEWAN: CaProvinceContent = {
  checked: "3 October 2026",
  jurisdiction: {
    title: "Saskatchewan law and courts",
    body: "The Court of King's Bench for Saskatchewan hears larger civil claims, and its Family Law Division handles all family law matters, including divorce and the division of family property. The Provincial Court's small claims court hears claims up to $50,000. Immigration, citizenship and divorce are governed by federal law. Lawyers are regulated by the Law Society of Saskatchewan, which also deals with concerns about them.",
  },
  courtsSummary:
    "The Court of King's Bench hears larger civil claims, and its Family Law Division handles all family law matters, including divorce and the division of family property; the Provincial Court's small claims court hears claims up to $50,000.",
  regulationAnswer: REGULATION_ANSWER,
  employmentComplaints:
    "Employment standards complaints go to Saskatchewan's Employment Standards office within 12 months, and discrimination complaints go to the Saskatchewan Human Rights Commission within one year of the incident.",
  freeHelp: {
    text: "Legal Aid Saskatchewan provides legal services in criminal and family law to people who are financially eligible, and since September 2026 helps with some refugee and humanitarian immigration matters. Its application centre is on 1-800-667-3764.",
    links: [{ label: "Legal Aid Saskatchewan", href: L.legalAid }],
  },
  courtsSource: { label: "Saskatchewan court locations (sasklawcourts.ca)", href: L.courts },
  areas: AREAS,
  categoryFaqs,
};

// ---------------------------------------------------------------------------
// Saskatchewan cities
// ---------------------------------------------------------------------------

export const SASKATCHEWAN_CITY_INFO: Record<string, CaCityInfo> = {
  saskatoon: {
    local:
      "Saskatoon is one of the three places where judges of the Court of King's Bench's Family Law Division sit. The Court of King's Bench is at 520 Spadina Crescent East and the Provincial Court, which hears small claims, is at 220 19th Street East. The Court of Appeal is based in Regina but sits in Saskatoon six times a year. ISC's land titles customer service centre is at 1414 8th Street East, and the Office of Residential Tenancies has an office at 122 3rd Avenue North.",
    courts: [
      {
        name: "Court of King's Bench, Saskatoon",
        address: "520 Spadina Crescent East, Saskatoon, SK S7K 3G7",
        url: L.kbLocations,
        use: "Court of King's Bench, including the Family Law Division",
      },
      {
        name: "Saskatoon Provincial Court",
        address: "220 19th Street East, Saskatoon, SK S7K 0A2",
        url: L.pcLocations,
        use: "Provincial Court — small claims",
      },
    ],
    familyCourt:
      "For Saskatoon, family cases — including divorce and the division of family property — go to the Family Law Division of the Court of King's Bench, 520 Spadina Crescent East.",
    estates:
      "Wills and estates are handled by the Court of King's Bench; the application forms are filed with the court together with the fees. In Saskatoon the Court of King's Bench is at 520 Spadina Crescent East.",
  },
  regina: {
    local:
      "Regina is Saskatchewan's capital and the home of the Court of Appeal. The Court of King's Bench, including its Family Law Division, is at 2425 Victoria Avenue — the same courthouse holds the province-wide Wills and Estates Registry. The Provincial Court, which hears small claims, is at 1815 Smith Street. ISC's land titles customer service centre is at 1301 1st Avenue, and the Office of Residential Tenancies has an office at 1855 Victoria Avenue.",
    courts: [
      {
        name: "Court of King's Bench, Regina",
        address: "2425 Victoria Avenue, Regina, SK S4P 4W6",
        url: L.kbLocations,
        use: "Court of King's Bench, including the Family Law Division",
      },
      {
        name: "Regina Provincial Court",
        address: "1815 Smith Street, Regina, SK S4P 2N5",
        url: L.pcLocations,
        use: "Provincial Court — small claims",
      },
    ],
    familyCourt:
      "For Regina, family cases — including divorce and the division of family property — go to the Family Law Division of the Court of King's Bench, 2425 Victoria Avenue.",
    estates:
      "Wills and estates are handled by the Court of King's Bench; the application forms are filed with the court together with the fees. In Regina the Court of King's Bench is at 2425 Victoria Avenue, which also holds the province-wide Wills and Estates Registry.",
  },
};
