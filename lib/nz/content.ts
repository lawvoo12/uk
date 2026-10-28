// ============================================================================
// New Zealand (/nz) — law content for the /nz pages.
//
// RULE FOR LEGAL NUMBERS (time limits, amounts, fees, thresholds): a number
// only appears if it was read on an official or statutory source on the date
// below. Where something could not be confirmed, the text links to the
// official page instead of stating it.
//
// Checked 28 Oct 2026:
//  - Courts and addresses: Ministry of Justice "Find us" pages
//    (justice.govt.nz/contact-us/find-us/<city>-district-court/ and
//    <city>-high-court/), list of District and High Courts.
//  - District Court civil claims up to $350,000: District Court Act 2016 s74.
//  - Disputes Tribunal limit $60,000 from 24 Jan 2026 (Disputes Tribunal
//    Amendment Act 2025); districtcourts.govt.nz "Civil jurisdiction".
//  - Family Court is part of the District Court; the matters it covers:
//    justice.govt.nz "What is the Family Court".
//  - Probate: High Court; Probate Unit at the Wellington High Court, 2
//    Molesworth Street; registrars also at the Auckland and Christchurch High
//    Courts; fee $275; probate is not always required — justice.govt.nz
//    "Apply for probate & get a copy of a will" (updated 22 Jul 2026).
//  - ACC: generally you can't sue for injuries ACC covers; exemplary damages
//    may still be sought; ACC decisions can be reviewed and appealed to the
//    District Court — Community Law Manual, "Overview of the ACC scheme".
//  - Personal grievance: 90 days to raise; sexual harassment 12 months (from
//    13 Jun 2023); free MBIE mediation — employment.govt.nz. The Employment
//    Relations Amendment Act 2026 changed other rules: we link to
//    employment.govt.nz rather than restate them.
//  - Immigration and Protection Tribunal: appeals on residence class visas,
//    refugee and protected person status, and deportation — justice.govt.nz.
//  - Legal aid (family and civil): income, assets and merits tests; not for
//    the Disputes Tribunal — justice.govt.nz (updated 31 Jul 2026).
//  - Community Law Centres — communitylaw.org.nz "Our law centres".
//  - Regulator and complaints — NZ Law Society (see lib/nz/regulators.ts).
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { NzCity } from "@/lib/nz/cities";
import { NZ_LEADS_ENABLED } from "@/lib/config";
import { NZ_COMPLAINTS_URL, NZ_REGISTER_LABEL, NZ_REGISTER_URL } from "@/lib/nz/regulators";

export const NZ_CONTENT_CHECKED = "28 October 2026";

export interface NzLink {
  label: string;
  href: string;
}

export const NZ_LINKS = {
  register: NZ_REGISTER_URL,
  complaints: NZ_COMPLAINTS_URL,
  findCourt: "https://www.justice.govt.nz/contact-us/find-us/",
  familyCourt: "https://www.justice.govt.nz/family/family-court/about-the-family-court/what-is-the-family-court/",
  civilJurisdiction: "https://districtcourts.govt.nz/civil-court/civil-jurisdiction",
  disputesTribunal: "https://www.disputestribunal.govt.nz/",
  probate: "https://www.justice.govt.nz/courts/high-court/apply-for-probate-and-get-copy-of-will",
  legalAid: "https://www.justice.govt.nz/courts/going-to-court/legal-aid/get-legal-aid/can-i-get-family-or-civil-legal-aid/",
  communityLaw: "https://communitylaw.org.nz/our-law-centres/",
  acc: "https://communitylaw.org.nz/community-law-manual/chapter-19-accident-compensation-acc/overview-of-the-acc-scheme/",
  employment: "https://www.employment.govt.nz/",
  personalGrievance: "https://www.employment.govt.nz/news-and-updates/time-to-raise-a-personal-grievance-due-to-sexual-harassment-increases-to-12-months",
  ipt: "https://www.justice.govt.nz/tribunals/immigration/immigration-and-protection/",
  immigrationNz: "https://www.immigration.govt.nz/",
  advisersWhoNeedsLicence: "https://www.iaa.govt.nz/for-advisers/adviser-tools/licensing-toolkit/who-needs-a-licence",
};

/** Sentence for page intros. Every listing was confirmed on the register before it was added. */
export const NZ_CHECKED_SENTENCE =
  "Each lawyer was checked on the New Zealand Law Society's register before being listed — check again before you hire, as people move firms.";

/** One-paragraph intro for each practice area (the /nz/lawyers/[area] pages). */
export const NZ_AREA_INTROS: Record<PracticeAreaSlug, string> = {
  immigration:
    "Work, student and family visas, residence, and challenging decisions. Applications are decided by Immigration New Zealand; the Immigration and Protection Tribunal hears appeals on residence class visas, refugee and protected person status, and deportation.",
  family:
    "Separation and divorce, care of children, relationship property and family violence. These cases are heard in the Family Court, which is part of New Zealand's District Court.",
  "personal-injury":
    "New Zealand's ACC scheme covers most injuries instead of lawsuits: you generally can't sue for an injury ACC covers. Lawyers in this area help with ACC claims and with challenging ACC decisions through review and appeal.",
  employment:
    "Personal grievances, dismissal, pay and workplace problems. A personal grievance usually has to be raised with your employer within 90 days, and the government offers free mediation. Employment law changed in 2026 — check employment.govt.nz for the current rules.",
  property:
    "Buying and selling homes, leases, boundary and building disputes, and tenancy matters. Smaller disputes can go to the Disputes Tribunal (up to $60,000 since 24 January 2026); larger civil claims go to the District Court or High Court.",
  "wills-probate":
    "Wills, trusts, enduring powers of attorney, probate and estate disputes. Probate is granted by the High Court; it isn't always needed, depending on the assets and what the organisations holding them require.",
};

export interface NzAreaContent {
  /** "What to know" bullet points on the practice-area page. */
  points: string[];
  links: NzLink[];
}

export const NZ_AREAS: Record<PracticeAreaSlug, NzAreaContent> = {
  immigration: {
    points: [
      "Visa and residence applications are decided by Immigration New Zealand.",
      "The Immigration and Protection Tribunal hears appeals about residence class visas, refugee and protected person status, and liability for deportation.",
      "Anyone who gives immigration advice for a fee must be licensed unless they are exempt — check the Immigration Advisers Authority's guidance before you pay for advice.",
    ],
    links: [
      { label: "Immigration New Zealand", href: NZ_LINKS.immigrationNz },
      { label: "Immigration and Protection Tribunal", href: NZ_LINKS.ipt },
      { label: "Who needs an adviser licence (IAA)", href: NZ_LINKS.advisersWhoNeedsLicence },
    ],
  },
  family: {
    points: [
      "The Family Court is part of the District Court.",
      "It deals with parenting arrangements and care of children, separation and divorce, dividing relationship property, family violence, adoption and surrogacy, child support and paternity, and challenges to a will.",
      "Family legal aid can cover disputes that could go to court, such as care of children, relationship property and protection orders, but not divorce itself. Income, assets and the merits of the case are assessed.",
    ],
    links: [
      { label: "What is the Family Court (Ministry of Justice)", href: NZ_LINKS.familyCourt },
      { label: "Family and civil legal aid", href: NZ_LINKS.legalAid },
    ],
  },
  "personal-injury": {
    points: [
      "Under the ACC scheme you generally can't sue in court for an injury that ACC covers.",
      "If your injury isn't covered by ACC and someone else caused it, you may be able to sue them for damages.",
      "Even where ACC covers an injury, exemplary damages may be sought for particularly blatant or reckless conduct.",
      "ACC decisions can be challenged: ACC can reconsider, an independent review can be sought, and review decisions can be appealed to the District Court.",
    ],
    links: [{ label: "Overview of the ACC scheme (Community Law)", href: NZ_LINKS.acc }],
  },
  employment: {
    points: [
      "A personal grievance must usually be raised with your employer within 90 days.",
      "For sexual harassment the time limit is 12 months (for harassment on or after 13 June 2023).",
      "Free, confidential mediation is available through the Ministry of Business, Innovation and Employment.",
      "The Employment Relations Amendment Act 2026 made further changes — check employment.govt.nz for the current rules before you act.",
    ],
    links: [
      { label: "Employment New Zealand", href: NZ_LINKS.employment },
      { label: "Personal grievance time limits", href: NZ_LINKS.personalGrievance },
    ],
  },
  property: {
    points: [
      "The Disputes Tribunal hears claims up to $60,000 (raised from $30,000 on 24 January 2026).",
      "The District Court hears civil claims up to $350,000; larger claims go to the High Court.",
      "Civil legal aid isn't available for Disputes Tribunal cases.",
    ],
    links: [
      { label: "Disputes Tribunal", href: NZ_LINKS.disputesTribunal },
      { label: "District Court civil jurisdiction", href: NZ_LINKS.civilJurisdiction },
    ],
  },
  "wills-probate": {
    points: [
      "Probate is a High Court order confirming a will is valid and that the executor can manage the estate.",
      "It isn't always needed — that depends on the type and value of the assets and what the organisations holding them require.",
      "Applications are handled by the Probate Unit at the Wellington High Court; the fee is $275.",
      "Where there is no will, an application for letters of administration may be needed instead.",
    ],
    links: [{ label: "Apply for probate (Ministry of Justice)", href: NZ_LINKS.probate }],
  },
};

export interface NzCourt {
  name: string;
  address: string;
  url: string;
  use: string;
}

export interface NzCityInfo {
  /** A short paragraph unique to this city. */
  local: string;
  courts: NzCourt[];
  /** Used in the family FAQ. */
  familyCourt: string;
  /** Used in the probate FAQ. */
  estates: string;
  /** The Community Law Centre for this city. */
  communityLaw: string;
}

const FIND = "https://www.justice.govt.nz/contact-us/find-us";
const DC = "District Court, including the Family Court";
const HC = "High Court — larger civil claims, probate, appeals";
const PROBATE_WGTN =
  "Probate applications go to the High Court and are handled by its Probate Unit at the Wellington High Court, 2 Molesworth Street, Wellington.";

export const NZ_CITY_INFO: Record<string, NzCityInfo> = {
  auckland: {
    local:
      "Auckland District Court is on Albert Street in the city centre, and the High Court sits at 24 Waterloo Quadrant. The Ministry of Justice also lists separate District Courts at Manukau, North Shore and Waitākere for those parts of Auckland.",
    courts: [
      { name: "Auckland District Court", address: "65–69 Albert Street, Auckland 1010", url: `${FIND}/auckland-district-court/`, use: DC },
      { name: "Auckland High Court", address: "24 Waterloo Quadrant, Auckland", url: `${FIND}/auckland-high-court/`, use: HC },
    ],
    familyCourt:
      "Family cases are heard in the Family Court, part of the District Court. Auckland District Court on Albert Street lists the Family Court among its services; Manukau, North Shore and Waitākere have District Courts of their own.",
    estates: `${PROBATE_WGTN} The Ministry of Justice says probate registrars also work at the Auckland High Court.`,
    communityLaw: "Auckland Community Law Centre (CBD, Māngere, South Auckland and Waitematā)",
  },
  wellington: {
    local:
      "Wellington District Court is on Ballance Street and the High Court is at 2 Molesworth Street — also home to the High Court's Probate Unit, which handles probate applications for the whole country.",
    courts: [
      { name: "Wellington District Court", address: "43–49 Ballance Street, Wellington", url: `${FIND}/wellington-district-court/`, use: DC },
      { name: "Wellington High Court", address: "2 Molesworth Street, Wellington", url: `${FIND}/wellington-high-court/`, use: HC },
    ],
    familyCourt: "Family cases are heard in the Family Court, part of the District Court — in Wellington, at the District Court on Ballance Street.",
    estates: PROBATE_WGTN,
    communityLaw: "Wellington & Hutt Valley Community Law Centre",
  },
  christchurch: {
    local:
      "In Christchurch the District Court and High Court share one address, 20 Lichfield Street. Canterbury and the West Coast are served by one Community Law Centre.",
    courts: [
      { name: "Christchurch District Court", address: "20 Lichfield Street, Christchurch", url: `${FIND}/christchurch-district-court/`, use: DC },
      { name: "Christchurch High Court", address: "20 Lichfield Street, Christchurch", url: `${FIND}/christchurch-high-court/`, use: HC },
    ],
    familyCourt: "Family cases are heard in the Family Court, part of the District Court — in Christchurch, at 20 Lichfield Street.",
    estates: `${PROBATE_WGTN} The Ministry of Justice says probate registrars also work at the Christchurch High Court.`,
    communityLaw: "Canterbury & West Coast Community Law Centre",
  },
  hamilton: {
    local:
      "Hamilton's District Court and High Court are both at 116 Anglesea Street. The Waikato Community Law Centre covers the city.",
    courts: [
      { name: "Hamilton District Court", address: "116 Anglesea Street, Hamilton", url: `${FIND}/hamilton-district-court/`, use: DC },
      { name: "Hamilton High Court", address: "116 Anglesea Street, Hamilton", url: `${FIND}/hamilton-high-court/`, use: HC },
    ],
    familyCourt: "Family cases are heard in the Family Court, part of the District Court — in Hamilton, at 116 Anglesea Street.",
    estates: PROBATE_WGTN,
    communityLaw: "Waikato Community Law Centre",
  },
  tauranga: {
    local:
      "Tauranga's courts are split by type: civil and family cases are at McLean House, 26 McLean Street, and criminal cases at Cameron House, 46 Cameron Road. The Tauranga & Whakatāne Community Law Centre covers the city.",
    courts: [
      { name: "Tauranga District Court (Civil and Family)", address: "McLean House, 26 McLean Street, Tauranga", url: `${FIND}/tauranga-district-court/`, use: DC },
      { name: "Tauranga High Court", address: "McLean House, 26 McLean Street, Tauranga (civil and family)", url: `${FIND}/tauranga-high-court/`, use: HC },
    ],
    familyCourt: "Family cases are heard in the Family Court, part of the District Court — in Tauranga, at McLean House, 26 McLean Street.",
    estates: PROBATE_WGTN,
    communityLaw: "Tauranga & Whakatāne Community Law Centre",
  },
  dunedin: {
    local:
      "Dunedin's District Court and High Court are at the corner of Stuart and Dunbar Streets (entrance on Dunbar Street). The Family Court, Disputes Tribunal and Tenancy Tribunal also sit there.",
    courts: [
      { name: "Dunedin District Court", address: "Corner of Stuart and Dunbar Streets, Dunedin", url: `${FIND}/dunedin-district-court/`, use: DC },
      { name: "Dunedin High Court", address: "Corner of Stuart and Dunbar Streets, Dunedin", url: `${FIND}/dunedin-high-court/`, use: HC },
    ],
    familyCourt: "Family cases are heard in the Family Court, part of the District Court — in Dunedin, at the courthouse on the corner of Stuart and Dunbar Streets.",
    estates: PROBATE_WGTN,
    communityLaw: "Otago Community Law Centre",
  },
};

export const NZ_JURISDICTION = {
  title: "New Zealand law",
  body: "Lawyers in New Zealand must hold a practising certificate from the New Zealand Law Society. The register shows whether a lawyer currently holds one, and whether they practise as a barrister and solicitor or as a barrister only.",
};

export const NZ_REGULATION_ANSWER = `Every lawyer listed was checked on the ${NZ_REGISTER_LABEL} before being added, and each held a current practising certificate. Complaints about a lawyer go to the Law Society's Lawyers Complaints Service (0800 261 801).`;

export const NZ_EMPLOYMENT_COMPLAINTS =
  "A personal grievance usually has to be raised with your employer within 90 days (12 months for sexual harassment). Free mediation is available through the Ministry of Business, Innovation and Employment; Employment New Zealand explains the next steps.";

export const NZ_FREE_HELP = {
  text: "Community Law Centres give free legal advice, and legal aid can help with family and civil cases if you qualify.",
  links: [
    { label: "Community Law Centres", href: NZ_LINKS.communityLaw },
    { label: "Legal aid", href: NZ_LINKS.legalAid },
  ] as NzLink[],
};

export const NZ_COURTS_SOURCE: NzLink = { label: "the Ministry of Justice's Find us pages", href: NZ_LINKS.findCourt };

/** Last FAQ on every city page. */
export const NZ_CALLBACK_ANSWER = NZ_LEADS_ENABLED
  ? "Your details come to Lawvoo first. We pass your enquiry only to the firm you chose and ask them to contact you — we can't guarantee they'll reply. Using Lawvoo is free."
  : "Lawvoo isn't taking enquiries in New Zealand yet. 'Request a callback' on a listing shows you the firm's own website and the Law Society register, so you can contact the firm directly. Browsing Lawvoo is free.";

/** FAQs for /nz/locations/[city]. */
export function getNzLocationFaqs(city: NzCity, firmName?: string): FAQItem[] {
  const local = NZ_CITY_INFO[city.slug];
  const courts = local.courts.map((c) => `${c.name}, ${c.address}`).join("; ");
  return [
    {
      question: `Which courts serve ${city.name}?`,
      answer: `${courts}. The District Court hears civil claims up to $350,000; larger claims go to the High Court. Disputes up to $60,000 can go to the Disputes Tribunal.`,
    },
    { question: `Which court deals with family cases in ${city.name}?`, answer: local.familyCourt },
    { question: `Where do I apply for probate if someone lived in ${city.name}?`, answer: `${local.estates} The fee is $275, and probate isn't always needed.` },
    { question: `What can I do about a problem at work in ${city.name}?`, answer: NZ_EMPLOYMENT_COMPLAINTS },
    { question: `Where can I get free legal help in ${city.name}?`, answer: `${local.communityLaw} gives free legal advice. Legal aid may cover family and civil cases if you qualify on income, assets and the merits of your case.` },
    { question: `Are the lawyers listed in ${city.name} licensed?`, answer: NZ_REGULATION_ANSWER },
    {
      question: NZ_LEADS_ENABLED
        ? `What happens when I request a callback${firmName ? ` from ${firmName}` : ""}?`
        : `How do I contact a lawyer listed in ${city.name}?`,
      answer: NZ_CALLBACK_ANSWER,
    },
  ];
}

/** FAQs for the practice-area pages (with or without a city). */
export function getNzCategoryFaqs(area: PracticeAreaSlug, city?: NzCity): FAQItem[] {
  const where = city ? ` in ${city.name}` : "";
  const byArea: Record<PracticeAreaSlug, FAQItem[]> = {
    immigration: [
      {
        question: "Who decides New Zealand visa applications?",
        answer: "Immigration New Zealand decides visa and residence applications. The Immigration and Protection Tribunal hears appeals about residence class visas, refugee and protected person status, and deportation.",
      },
      {
        question: "Can anyone charge me for immigration advice?",
        answer: "No. People who give immigration advice must be licensed unless they're exempt. The Immigration Advisers Authority explains who needs a licence — check before you pay.",
      },
    ],
    family: [
      {
        question: `Which court deals with family matters${where}?`,
        answer: city ? NZ_CITY_INFO[city.slug].familyCourt : "The Family Court, which is part of New Zealand's District Court.",
      },
      {
        question: "Can I get legal aid for a family case?",
        answer: "Family legal aid can cover disputes that could go to court — such as care of children, relationship property and protection orders — but not divorce itself. It depends on your income, assets and the merits of the case.",
      },
    ],
    "personal-injury": [
      {
        question: "Can I sue someone for an injury in New Zealand?",
        answer: "Generally not for an injury that ACC covers — the ACC scheme replaced that right. You may be able to sue if your injury isn't covered by ACC, and exemplary damages may be sought for particularly blatant or reckless conduct.",
      },
      {
        question: "Can I challenge an ACC decision?",
        answer: "Yes. ACC can reconsider its decision, you can ask for an independent review, and review decisions can be appealed to the District Court.",
      },
    ],
    employment: [
      {
        question: "How long do I have to raise a personal grievance?",
        answer: "Usually 90 days. For sexual harassment that happened (or came to your notice) on or after 13 June 2023, it's 12 months.",
      },
      {
        question: "Did employment law change in 2026?",
        answer: "Yes — the Employment Relations Amendment Act 2026 made several changes. Employment New Zealand (employment.govt.nz) has the current rules; a lawyer can tell you how they apply to you.",
      },
    ],
    property: [
      {
        question: "Where do small property disputes go?",
        answer: "The Disputes Tribunal hears claims up to $60,000 (since 24 January 2026). The District Court hears civil claims up to $350,000, and larger claims go to the High Court.",
      },
      {
        question: "Can I get legal aid for the Disputes Tribunal?",
        answer: "No — civil legal aid isn't available for Disputes Tribunal cases.",
      },
    ],
    "wills-probate": [
      {
        question: "Do I always need probate?",
        answer: "No. It depends on the type and value of the assets and what the organisations holding them require. Smaller estates may be dealt with without the High Court.",
      },
      {
        question: "Where do probate applications go?",
        answer: "To the High Court — they're handled by the Probate Unit at the Wellington High Court, 2 Molesworth Street. The fee is $275.",
      },
    ],
  };
  return [
    ...byArea[area],
    { question: `Are the lawyers listed${where} licensed?`, answer: NZ_REGULATION_ANSWER },
  ];
}
