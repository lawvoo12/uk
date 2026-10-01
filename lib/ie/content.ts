// ============================================================================
// Irish-law content for the /ie pages: practice-area intros and guides,
// FAQs, and local information for each of the 20 towns.
//
// Facts checked 28 Sep 2026 against official sources:
//  - Courts: courts.ie "Courthouses and Offices" (www.courts.ie/offices) and
//    "Probate Registry Offices" (www.courts.ie/guides/probate-offices)
//  - WRC offices: workplacerelations.ie/en/contact_us/contact-details/
//  - Immigration registration: irishimmigration.ie notice of 9 Jan 2025
//    (all first-time registration moved to ISD, Burgh Quay, from 13 Jan 2025)
//  - Injuries Resolution Board: citizensinformation.ie (updated 5 Nov 2025)
//    and courts.ie "Understanding personal injuries"
//  - Family courts reform: Law Society Gazette, 22 Apr 2026 (first family
//    courts from January 2027)
// Court names/links: re-check now and then — the Courts Service renames and
// moves offices (Swords is currently listed as sitting at Balbriggan).
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { IeCity } from "@/lib/ie/cities";
import { IE_REGISTER_CHECKED, LSI_REGISTER_URL } from "@/lib/ie/lawyers";

export const IE_LINKS = {
  lsiRegister: LSI_REGISTER_URL,
  lsra: "https://www.lsra.ie/",
  lawSociety: "https://www.lawsociety.ie/",
  courtsOffices: "https://www.courts.ie/offices",
  courtOffice: (slug: string) => `https://www.courts.ie/offices/${slug}`,
  legalDiary: "https://legaldiary.courts.ie/",
  probateOffices: "https://www.courts.ie/guides/probate-offices",
  probateHub: "https://www.courts.ie/hubs/probate",
  wrc: "https://www.workplacerelations.ie/",
  wrcOffices: "https://www.workplacerelations.ie/en/contact_us/contact-details/",
  isd: "https://www.irishimmigration.ie/",
  isdRegistration:
    "https://www.irishimmigration.ie/registering-your-immigration-permission/how-to-register-your-immigration-permission-for-the-first-time/",
  ipo: "https://www.ipo.gov.ie/",
  irb: "https://www.injuries.ie/",
  irbCitizensInfo: "https://www.citizensinformation.ie/en/justice/civil-law/injuries-resolution-board/",
  legalAid: "https://www.legalaidboard.ie/",
  rtb: "https://www.rtb.ie/",
  tailte: "https://tailte.ie/",
  revenueStampDuty: "https://www.revenue.ie/en/property/stamp-duty/property/stamp-duty-property/rates.aspx",
  citizensInfoStampDuty: "https://www.citizensinformation.ie/en/housing/owning-a-home/buying-a-home/stamp-duty/",
  helpToBuy: "https://www.revenue.ie/en/property/help-to-buy-incentive/index.aspx",
  helpToBuyCitizensInfo:
    "https://www.citizensinformation.ie/en/housing/owning-a-home/help-with-buying-a-home/help-to-buy-incentive/",
  dpc: "https://www.dataprotection.ie/",
  ccpc: "https://www.ccpc.ie/",
};

/** "Are they regulated?" — honest about whether Lawvoo has checked the register itself. */
export const IE_REGULATION_ANSWER = `To practise in Ireland a solicitor must be on the Roll of Solicitors kept by the Law Society of Ireland and hold a current practising certificate. You can search any solicitor or firm on the Law Society's Find a Solicitor register. Complaints about a solicitor's services or conduct go to the Legal Services Regulatory Authority (LSRA). ${
  IE_REGISTER_CHECKED
    ? "Every firm listed on Lawvoo has been checked on the register."
    : "Lawvoo lists firms from the details they publish themselves — check the register before you instruct a firm."
}`;

/** Short sentence for page intros. */
export const IE_CHECKED_SENTENCE = IE_REGISTER_CHECKED
  ? "Each firm has been checked on the Law Society of Ireland register."
  : "Firms here practise under Irish law — check each one on the Law Society of Ireland register before instructing.";

export const IE_JURISDICTION_NOTE = {
  title: "Irish law and courts",
  body: "The Republic of Ireland has its own legal system. The District Court deals with smaller civil claims (up to €15,000) and most family applications such as maintenance, access and safety orders. The Circuit Court hears claims up to €75,000 (€60,000 for personal injuries) plus divorce and judicial separation, and the High Court deals with larger cases. Solicitors are on the Roll kept by the Law Society of Ireland, and complaints go to the LSRA.",
};

// ---------------------------------------------------------------------------
// Practice areas
// ---------------------------------------------------------------------------

export const IE_AREA_INTROS: Record<PracticeAreaSlug, string> = {
  immigration:
    "Employment permits, Stamp 4 and long-term residence, joining family in Ireland, EU Treaty Rights, international protection and Irish citizenship. Residence permissions and citizenship are handled by Immigration Service Delivery (ISD) at the Department of Justice; employment permits by the Department of Enterprise.",
  family:
    "Divorce and judicial separation, guardianship, custody and access, maintenance, and safety and barring orders. Family cases in Ireland are heard in private ('in camera'), mostly in the District and Circuit Courts.",
  "personal-injury":
    "Road traffic, workplace and public liability accidents, and medical negligence. In Ireland most injury claims must go to the Injuries Resolution Board before any court case. Lawvoo only lists firms for this area — contact a firm directly.",
  employment:
    "Unfair dismissal, discrimination, redundancy, pay and contract disputes, and bullying. Most employment complaints go to the Workplace Relations Commission (WRC), with appeals to the Labour Court — and the usual time limit is six months.",
  property:
    "Buying and selling homes (conveyancing), landlord and tenant matters, boundaries and rights of way, and commercial leases. In Ireland a sale isn't binding until both sides sign the contract, and your solicitor handles stamp duty and registration with Tailte Éireann.",
  "wills-probate":
    "Making a will, enduring powers of attorney, probate and estate administration, and challenges to a will. Grants come from the Probate Office in Dublin or one of 14 District Probate Registries around the country.",
};

/** "What to know in Ireland" block on each /ie/solicitors/[category] page. */
export const IE_AREA_GUIDE: Record<PracticeAreaSlug, { points: string[]; links: { label: string; href: string }[] }> = {
  immigration: {
    points: [
      "Residence permissions, visas and citizenship are decided by Immigration Service Delivery (ISD), part of the Department of Justice.",
      "Since 13 January 2025, all first-time registrations of an immigration permission — anywhere in Ireland — are done at ISD's Registration Office, 13-14 Burgh Quay, Dublin 2, by appointment. Local Garda stations no longer register people.",
      "Employment permits (such as the Critical Skills and General Employment Permits) are issued by the Department of Enterprise, not ISD.",
      "International protection (asylum) claims go to the International Protection Office, with appeals to the International Protection Appeals Tribunal.",
    ],
    links: [
      { label: "Immigration Service Delivery", href: IE_LINKS.isd },
      { label: "Registering your permission for the first time", href: IE_LINKS.isdRegistration },
      { label: "International Protection Office", href: IE_LINKS.ipo },
    ],
  },
  family: {
    points: [
      "To start divorce proceedings you must have lived apart for at least two of the previous three years (Family Law Act 2019). Judicial separation can be sought after one year apart, or on other grounds.",
      "Maintenance, guardianship, access and safety or barring orders usually start in the District Court; divorce and judicial separation are Circuit Court cases.",
      "The Family Courts Act 2024 is bringing in specialist family court divisions, with the first due to start in January 2027.",
      "The Legal Aid Board runs law centres offering means-tested civil legal aid, and a free Family Mediation Service.",
    ],
    links: [
      { label: "Legal Aid Board", href: IE_LINKS.legalAid },
      { label: "Courts Service — courthouses and offices", href: IE_LINKS.courtsOffices },
    ],
  },
  "personal-injury": {
    points: [
      "Most claims — road traffic, workplace and public liability — must first be made to the Injuries Resolution Board (formerly PIAB). Medical negligence claims don't go through the Board.",
      "The general time limit is two years from the injury, or from when you knew about it.",
      "You don't need a solicitor to apply to the Board; many people use one, especially for serious injuries. Ask any firm to explain its fees in writing before you instruct it.",
      "If a claim isn't resolved at the Board, it issues an 'authorisation' that lets the claim go to court.",
    ],
    links: [
      { label: "Injuries Resolution Board", href: IE_LINKS.irb },
      { label: "Citizens Information — Injuries Resolution Board", href: IE_LINKS.irbCitizensInfo },
    ],
  },
  employment: {
    points: [
      "Complaints under most employment laws are made online to the Workplace Relations Commission (WRC). Appeals go to the Labour Court.",
      "The time limit is usually six months from the problem (for example, the dismissal), extendable to 12 months only if you show reasonable cause.",
      "Unfair dismissal generally needs 12 months' continuous service; discrimination complaints under the Employment Equality Acts have no minimum.",
      "WRC offices are in Dublin, Carlow, Cork, Ennis and Sligo. Hearings are held in person or remotely.",
    ],
    links: [
      { label: "Workplace Relations Commission", href: IE_LINKS.wrc },
      { label: "WRC offices", href: IE_LINKS.wrcOffices },
    ],
  },
  property: {
    points: [
      "After 'sale agreed' you usually pay a refundable booking deposit. Nothing is binding until contracts are signed by both buyer and seller.",
      "Residential stamp duty is 1% up to €1 million, 2% on the part from €1 million to €1.5 million, and 6% above that. On a new home it's charged on the price excluding VAT.",
      "Your solicitor files the stamp duty return with Revenue and registers your ownership with Tailte Éireann (the Land Registry).",
      "Most private residential tenancy disputes go to the Residential Tenancies Board (RTB) rather than the courts.",
    ],
    links: [
      { label: "Revenue — stamp duty rates", href: IE_LINKS.revenueStampDuty },
      { label: "Tailte Éireann", href: IE_LINKS.tailte },
      { label: "Residential Tenancies Board", href: IE_LINKS.rtb },
    ],
  },
  "wills-probate": {
    points: [
      "Grants of probate (with a will) and letters of administration (without one) come from the Probate Office in Dublin or a District Probate Registry, depending on where the person lived.",
      "A spouse or civil partner has a 'legal right share' — half the estate if there are no children, a third if there are — whatever the will says.",
      "Children can ask the court under section 117 of the Succession Act to decide whether a parent failed to provide for them properly; this must be brought within six months of the grant.",
      "You can apply for a grant yourself as a personal applicant, or through a solicitor.",
    ],
    links: [
      { label: "Probate Registry offices", href: IE_LINKS.probateOffices },
      { label: "Courts Service — probate", href: IE_LINKS.probateHub },
    ],
  },
};

// ---------------------------------------------------------------------------
// Towns
// ---------------------------------------------------------------------------

export interface IeCourt {
  name: string;
  /** Path under https://www.courts.ie/offices/ */
  slug?: string;
  use: string;
}

export interface IeCityInfo {
  /** A short paragraph unique to this town. */
  local: string;
  courts: IeCourt[];
  courtNote?: string;
  /** The District Court venue named in family FAQs. */
  districtCourt: string;
  probate: string;
  wrc: string;
}

const COURTHOUSE = "District and Circuit Court civil and family cases";
const DISTRICT = "District Court — smaller civil claims and family applications";

const WRC_DUBLIN = "The WRC's Dublin office is at Lansdowne House, Lansdowne Road, Dublin 4.";
const WRC_CARLOW = "The nearest WRC office is its head office on O'Brien Road, Carlow.";
const WRC_ENNIS = "The nearest WRC office is at Clare Technology Park, Gort Road, Ennis.";
const WRC_SLIGO = "The nearest WRC office is at Marino House, Finisklin Business Park, Sligo.";

const PROBATE_DUBLIN = "the Probate Office, Phoenix House, Smithfield, Dublin 7 (covers Dublin, Meath, Kildare and Wicklow)";

export const IE_CITY_INFO: Record<string, IeCityInfo> = {
  dublin: {
    local:
      "Most national legal bodies are in Dublin: the Four Courts on Inns Quay (High Court, Court of Appeal and Supreme Court), the Probate Office at Phoenix House in Smithfield, the Workplace Relations Commission at Lansdowne House in Ballsbridge, and ISD's immigration Registration Office on Burgh Quay.",
    courts: [
      { name: "Four Courts", slug: "four-courts", use: "High Court — larger civil, injury and property cases" },
      { name: "Phoenix House, Smithfield", slug: "phoenix-house", use: "Dublin Circuit Court family law office; the Probate Office" },
      { name: "Dolphin House", slug: "dophin-house", use: "District Court family law — maintenance, access, safety orders" },
      { name: "Áras Uí Dhálaigh", slug: "áras-uí-dhálaigh", use: "District Court civil office" },
    ],
    districtCourt: "Dolphin House",
    probate: PROBATE_DUBLIN,
    wrc: WRC_DUBLIN,
  },
  cork: {
    local:
      "Cork has separate court buildings for civil and family cases (Cork Courthouse) and for criminal cases (the Criminal Courts of Justice). The Workplace Relations Commission has an office in the city, and County Cork has its own District Probate Registry.",
    courts: [{ name: "Cork Courthouse — Civil and Family", slug: "office-two", use: COURTHOUSE }],
    courtNote: "The High Court also holds sittings in Cork.",
    districtCourt: "Cork Courthouse (civil and family)",
    probate: "the Cork District Probate Registry (covers County Cork)",
    wrc: "The WRC has an office in Cork, in the Elysian Building, Eglington Street.",
  },
  limerick: {
    local:
      "Limerick's courthouse has a dedicated office for civil and family cases, separate from criminal and licensing. The Limerick District Probate Registry covers both Limerick and Clare, and the nearest Workplace Relations Commission office is in Ennis.",
    courts: [
      { name: "Limerick Courthouse — Civil and Family", slug: "limerick-court-office---civil-and-family", use: COURTHOUSE },
    ],
    districtCourt: "Limerick Courthouse (civil and family office)",
    probate: "the Limerick District Probate Registry (covers Limerick and Clare)",
    wrc: WRC_ENNIS,
  },
  galway: {
    local:
      "Galway Courthouse hears District and Circuit Court business for the city. Galway's District Probate Registry covers both Galway and Roscommon. There's no WRC office in Galway — the nearest are in Ennis and Sligo, and many WRC hearings are held remotely.",
    courts: [{ name: "Galway Courthouse", slug: "galway-court-office", use: COURTHOUSE }],
    districtCourt: "Galway Courthouse",
    probate: "the Galway District Probate Registry (covers Galway and Roscommon)",
    wrc: "The nearest WRC offices are in Ennis (Clare Technology Park) and Sligo (Finisklin Business Park).",
  },
  waterford: {
    local:
      "Waterford Courthouse deals with civil and family cases for the city and county, and Waterford has its own District Probate Registry. For employment complaints, the closest WRC office is its head office in Carlow.",
    courts: [{ name: "Waterford Courthouse", slug: "waterford-court-office", use: COURTHOUSE }],
    districtCourt: "Waterford Courthouse",
    probate: "the Waterford District Probate Registry (covers County Waterford)",
    wrc: WRC_CARLOW,
  },
  kilkenny: {
    local:
      "Kilkenny's District Probate Registry serves Kilkenny, Carlow and Laois, so estates from all three counties are processed here. The Workplace Relations Commission's head office is nearby in Carlow.",
    courts: [{ name: "Kilkenny Courthouse", slug: "kilkenny-court-office", use: COURTHOUSE }],
    districtCourt: "Kilkenny Courthouse",
    probate: "the Kilkenny District Probate Registry (covers Kilkenny, Carlow and Laois)",
    wrc: WRC_CARLOW,
  },
  drogheda: {
    local:
      "Drogheda straddles the Louth–Meath border, and that matters for probate: estates of people who lived on the Louth side go to the Dundalk District Probate Registry, while Meath estates go to the Probate Office in Dublin.",
    courts: [{ name: "Drogheda Courthouse", slug: "drogheda-courthouse", use: DISTRICT }],
    courtNote: "Circuit Court cases for Co. Louth may be listed elsewhere in the county — check the Legal Diary for your venue.",
    districtCourt: "Drogheda Courthouse",
    probate: "the Dundalk District Probate Registry (Louth and Monaghan) — or the Dublin Probate Office for Co. Meath addresses",
    wrc: WRC_DUBLIN.replace("The WRC's Dublin office is", "The nearest WRC office is in Dublin,"),
  },
  dundalk: {
    local:
      "Dundalk is the county town of Louth and home to the District Probate Registry for Louth and Monaghan. As a border town, some people here also have matters in Northern Ireland — those are dealt with under Northern Irish law by solicitors regulated there.",
    courts: [{ name: "Dundalk Courthouse", slug: "dundalk-court-office", use: COURTHOUSE }],
    districtCourt: "Dundalk Courthouse",
    probate: "the Dundalk District Probate Registry (covers Louth and Monaghan)",
    wrc: WRC_DUBLIN.replace("The WRC's Dublin office is", "The nearest WRC office is in Dublin,"),
  },
  swords: {
    local:
      "Swords is the county town of Fingal in north County Dublin. The Courts Service currently lists Swords District Court as temporarily sitting at Balbriggan, while Circuit and High Court cases are heard in Dublin city. Probate for all of County Dublin is handled in Smithfield.",
    courts: [
      { name: "Swords Courthouse (temporarily sitting at Balbriggan)", slug: "swords-courthouse", use: DISTRICT },
      { name: "Phoenix House, Smithfield", slug: "phoenix-house", use: "Dublin Circuit Court family law office" },
    ],
    districtCourt: "Swords District Court (currently sitting at Balbriggan)",
    probate: PROBATE_DUBLIN,
    wrc: WRC_DUBLIN.replace("The WRC's Dublin office is", "The nearest WRC office is in Dublin,"),
  },
  navan: {
    local:
      "Navan is Meath's largest town and has its own District Court, but the Circuit Court for the county sits in Trim. Meath has no local probate registry — estates go to the Probate Office in Dublin.",
    courts: [
      { name: "Navan Courthouse", slug: "navan-courthouse", use: DISTRICT },
      { name: "Trim Courthouse", slug: "trim-courthouse", use: "Circuit Court — divorce, judicial separation, larger civil claims" },
    ],
    courtNote: "Check the Legal Diary for where a particular case is listed.",
    districtCourt: "Navan Courthouse",
    probate: PROBATE_DUBLIN,
    wrc: WRC_DUBLIN.replace("The WRC's Dublin office is", "The nearest WRC office is in Dublin,"),
  },
  naas: {
    local:
      "Naas is the county town of Kildare, and Naas Courthouse handles civil and family business for much of the county. Like Meath and Wicklow, Kildare estates go to the Probate Office in Dublin rather than a local registry.",
    courts: [{ name: "Naas Courthouse", slug: "naas-court-office", use: COURTHOUSE }],
    districtCourt: "Naas Courthouse",
    probate: PROBATE_DUBLIN,
    wrc: WRC_DUBLIN.replace("The WRC's Dublin office is", "The nearest WRC office is in Dublin,"),
  },
  ennis: {
    local:
      "Ennis is one of only five towns with a Workplace Relations Commission office (at Clare Technology Park). Probate for County Clare is handled by the Limerick District Probate Registry.",
    courts: [{ name: "Ennis Courthouse", slug: "ennis-courthouse", use: COURTHOUSE }],
    districtCourt: "Ennis Courthouse",
    probate: "the Limerick District Probate Registry (covers Limerick and Clare)",
    wrc: "The WRC has an office in Ennis, at Clare Technology Park, Gort Road.",
  },
  carlow: {
    local:
      "Carlow is home to the Workplace Relations Commission's head office on O'Brien Road. Probate for County Carlow goes to the Kilkenny District Probate Registry.",
    courts: [{ name: "Carlow Courthouse", slug: "carlow-courthouse", use: COURTHOUSE }],
    districtCourt: "Carlow Courthouse",
    probate: "the Kilkenny District Probate Registry (covers Kilkenny, Carlow and Laois)",
    wrc: "The WRC's head office is in Carlow, on O'Brien Road.",
  },
  tralee: {
    local:
      "Tralee is the county town of Kerry and has the District Probate Registry for the whole county. The nearest Workplace Relations Commission offices are in Cork and Ennis, and many WRC hearings take place remotely.",
    courts: [{ name: "Tralee Court Office", slug: "tralee-court-office", use: COURTHOUSE }],
    districtCourt: "the courthouse in Tralee",
    probate: "the Tralee District Probate Registry (covers County Kerry)",
    wrc: "The nearest WRC offices are in Cork (Elysian Building, Eglington Street) and Ennis.",
  },
  athlone: {
    local:
      "Athlone sits on the Shannon, across the Westmeath–Roscommon border. For probate, estates on the Westmeath side go to the Mullingar District Probate Registry, and those on the Roscommon side to the Galway registry. Circuit Court business for Westmeath is dealt with in Mullingar.",
    courts: [
      { name: "Athlone District Courthouse", slug: "athlone-district-court-office", use: DISTRICT },
      { name: "Mullingar Courthouse", slug: "mullingar-court-office", use: "Circuit Court — divorce, judicial separation, larger civil claims" },
    ],
    districtCourt: "Athlone District Courthouse",
    probate: "the Mullingar District Probate Registry (Westmeath and Offaly) — or the Galway registry for Co. Roscommon addresses",
    wrc: "The nearest WRC offices are in Dublin and Carlow; many hearings take place remotely.",
  },
  sligo: {
    local:
      "Sligo has both a Workplace Relations Commission office (Marino House, Finisklin Business Park) and a District Probate Registry covering Sligo and Leitrim, so employment and probate matters can be dealt with locally.",
    courts: [{ name: "Sligo Courthouse", slug: "sligo-court-office", use: COURTHOUSE }],
    districtCourt: "Sligo Courthouse",
    probate: "the Sligo District Probate Registry (covers Sligo and Leitrim)",
    wrc: "The WRC has an office in Sligo, at Marino House, Finisklin Business Park.",
  },
  letterkenny: {
    local:
      "Letterkenny has the District Probate Registry for all of Donegal. In a border county, family and property matters sometimes involve Northern Ireland, where a different legal system and different solicitors apply. The nearest WRC office is in Sligo.",
    courts: [{ name: "Letterkenny Courthouse", slug: "letterkenny-court-office", use: COURTHOUSE }],
    districtCourt: "Letterkenny Courthouse",
    probate: "the Letterkenny District Probate Registry (covers County Donegal)",
    wrc: WRC_SLIGO,
  },
  wexford: {
    local:
      "Wexford Courthouse deals with civil and family cases for the county, and Wexford town has its own District Probate Registry. For employment complaints, the closest WRC office is its head office in Carlow.",
    courts: [{ name: "Wexford Courthouse", slug: "wexford-court-office", use: COURTHOUSE }],
    districtCourt: "Wexford Courthouse",
    probate: "the Wexford District Probate Registry (covers County Wexford)",
    wrc: WRC_CARLOW,
  },
  mullingar: {
    local:
      "Mullingar is the county town of Westmeath. Its courthouse handles Circuit Court business for the county, and the Mullingar District Probate Registry covers both Westmeath and Offaly.",
    courts: [{ name: "Mullingar Courthouse", slug: "mullingar-court-office", use: COURTHOUSE }],
    districtCourt: "Mullingar Courthouse",
    probate: "the Mullingar District Probate Registry (covers Westmeath and Offaly)",
    wrc: "The nearest WRC offices are in Dublin and Carlow; many hearings take place remotely.",
  },
  castlebar: {
    local:
      "Castlebar is the county town of Mayo and has the District Probate Registry for the county. The nearest Workplace Relations Commission office is in Sligo, and first-time immigration registration for Mayo residents is done at ISD's Registration Office in Dublin.",
    courts: [{ name: "Castlebar Courthouse", slug: "castlebar-court-office", use: COURTHOUSE }],
    districtCourt: "Castlebar Courthouse",
    probate: "the Castlebar District Probate Registry (covers County Mayo)",
    wrc: WRC_SLIGO,
  },
};

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

function info(city?: IeCity): IeCityInfo | undefined {
  return city ? IE_CITY_INFO[city.slug] : undefined;
}

/** FAQs for /ie/solicitors/[category] (city omitted) and /ie/solicitors/[category]/[city]. */
export function getIeCategoryFaqs(area: PracticeAreaSlug, city?: IeCity): FAQItem[] {
  const place = city?.name ?? "Ireland";
  const local = info(city);

  switch (area) {
    case "immigration":
      return [
        {
          question: "Do I need a solicitor for an Irish immigration application?",
          answer:
            "No. You can apply directly to Immigration Service Delivery (ISD) for residence permissions and citizenship, and to the Department of Enterprise for employment permits. A solicitor is most useful when something has gone wrong — a refusal, a gap in your permission, a deportation notice — or for an international protection claim.",
        },
        {
          question: `Where do I register my immigration permission if I live in ${place}?`,
          answer:
            "Since 13 January 2025, all first-time registrations in Ireland are handled by ISD at the Registration Office, 13-14 Burgh Quay, Dublin 2, by appointment — local Garda stations no longer do this. Renewals are generally made online.",
        },
        {
          question: "How long do I need to live in Ireland to apply for citizenship?",
          answer:
            "Naturalisation usually needs five years' reckonable residence in the last nine years, including one year's continuous residence immediately before you apply (limited absences are allowed). Spouses and civil partners of Irish citizens can apply after three years. Applications go to ISD's Citizenship Division.",
        },
        { question: `Are the immigration solicitors listed for ${place} regulated?`, answer: IE_REGULATION_ANSWER },
      ];
    case "family":
      return [
        {
          question: "How long do we have to be separated before a divorce in Ireland?",
          answer:
            "You must have lived apart for at least two of the previous three years when proceedings start, there must be no reasonable prospect of reconciliation, and proper provision must exist for each spouse and any children. Judicial separation can be sought after one year living apart, or on other grounds.",
        },
        {
          question: `Which court deals with family law cases${city ? ` for ${city.name}` : ""}?`,
          answer: `Maintenance, guardianship, access and safety or barring orders usually start in the District Court${
            local ? ` — for ${city!.name}, that's ${local.districtCourt}` : ""
          }. Divorce and judicial separation are heard by the Circuit Court. Family cases are held in private. Specialist family court divisions are due to start in phases from January 2027.`,
        },
        {
          question: "Can I get legal aid for a family law case?",
          answer:
            "Civil legal aid is provided by the Legal Aid Board through its law centres, and family law makes up most of its work. It's means-tested and you usually pay a contribution. The Legal Aid Board's Family Mediation Service is free.",
        },
        { question: `Are the family law solicitors listed for ${place} regulated?`, answer: IE_REGULATION_ANSWER },
      ];
    case "personal-injury":
      return [
        {
          question: "Do personal injury claims in Ireland go to court straight away?",
          answer:
            "No. Most claims — road traffic, workplace and public liability — must first be made to the Injuries Resolution Board (formerly PIAB), which assesses the claim and can offer mediation. If the claim isn't resolved there, the Board issues an 'authorisation' so it can go to court. Medical negligence claims don't go through the Board.",
        },
        {
          question: "How long do I have to make a personal injury claim?",
          answer:
            "Generally two years from the date of the injury, or from when you knew about it. Applying to the Injuries Resolution Board stops the clock for a period — a solicitor can confirm the exact dates for your situation.",
        },
        {
          question: "Do I need a solicitor for an Injuries Resolution Board claim?",
          answer:
            "No — you can apply yourself, online or by post. Many people use a solicitor, especially for serious injuries or where fault is disputed. Ask any firm to explain its fees and likely costs in writing before you instruct it.",
        },
        {
          question: "Why can't I send a personal injury enquiry through Lawvoo in Ireland?",
          answer:
            "Irish rules strictly control how personal injury legal services are advertised and how clients are introduced to solicitors. To stay well within them, Lawvoo only lists firms for personal injury in Ireland. Contact any firm directly through its own website.",
        },
      ];
    case "employment":
      return [
        {
          question: "How long do I have to bring a complaint to the WRC?",
          answer:
            "Usually six months from the date of the problem — for example, the date of dismissal. The Workplace Relations Commission can extend this to 12 months only if you show reasonable cause for the delay, so don't wait.",
        },
        {
          question: "Do I need to have worked somewhere for a set time to claim unfair dismissal?",
          answer:
            "Generally 12 months' continuous service, with exceptions — for example dismissals linked to pregnancy, trade union membership or making a protected disclosure. Discrimination complaints under the Employment Equality Acts have no minimum service.",
        },
        {
          question: `Where would a WRC hearing${city ? ` for someone in ${city.name}` : ""} take place?`,
          answer: `WRC offices are in Dublin, Carlow, Cork, Ennis and Sligo, and hearings are held in person at WRC venues or remotely — the WRC tells you where. ${
            local ? local.wrc : ""
          } Decisions can be appealed to the Labour Court.`.trim(),
        },
        { question: `Are the employment solicitors listed for ${place} regulated?`, answer: IE_REGULATION_ANSWER },
      ];
    case "property":
      return [
        {
          question: "How does buying a home work in Ireland?",
          answer:
            "After 'sale agreed' you usually pay a refundable booking deposit to the estate agent. Your solicitor checks the title and contract; you then sign and pay the contract deposit (often 10%), and the sale closes when the balance is paid. Nothing is binding until both sides have signed the contract.",
        },
        {
          question: "How much stamp duty will I pay on a home?",
          answer:
            "Residential stamp duty is 1% on the first €1 million, 2% on the part from €1 million to €1.5 million, and 6% above €1.5 million. On a new home it's charged on the price excluding VAT. There's no stamp duty relief for first-time buyers, but Help to Buy can help with new homes.",
        },
        {
          question: "Who registers the property after closing?",
          answer:
            "Your solicitor files the stamp duty return and pays the duty to Revenue, then registers your ownership with Tailte Éireann, which now runs the Land Registry and the Registry of Deeds.",
        },
        {
          question: `Where are landlord and tenant disputes${city ? ` in ${city.name}` : ""} dealt with?`,
          answer:
            "Most disputes in private residential tenancies go to the Residential Tenancies Board (RTB), not the courts. Commercial lease and boundary disputes are usually for the courts — the District, Circuit or High Court depending on the value.",
        },
      ];
    case "wills-probate":
      return [
        {
          question: city
            ? `Where do I apply for probate for someone who lived near ${city.name}?`
            : "Where do I apply for probate in Ireland?",
          answer: local
            ? `Applications go to the registry for the county where the person lived. For ${city!.name}, that's ${local.probate}. You can apply through a solicitor or as a personal applicant.`
            : "Applications go to the Probate Office in Dublin (for Dublin, Meath, Kildare and Wicklow) or to one of 14 District Probate Registries, depending on where the person lived. You can apply through a solicitor or as a personal applicant.",
        },
        {
          question: "What happens if there's no will?",
          answer:
            "The estate is divided under the Succession Act 1965. For example, a spouse or civil partner with no children inherits everything; with children, the spouse takes two-thirds and the children share one-third. Usually the next of kin applies for a grant of letters of administration.",
        },
        {
          question: "Can a spouse or child challenge a will in Ireland?",
          answer:
            "A spouse or civil partner is entitled to a 'legal right share' — half the estate if there are no children, a third if there are — whatever the will says. A child can apply to court under section 117 of the Succession Act if a parent failed to provide for them properly; this must be brought within six months of the grant.",
        },
        { question: `Are the wills and probate solicitors listed for ${place} regulated?`, answer: IE_REGULATION_ANSWER },
      ];
  }
}

/** FAQs for /ie/locations/[city]. Unique per town (courts, probate, WRC). */
export function getIeLocationFaqs(city: IeCity, firmName?: string): FAQItem[] {
  const local = IE_CITY_INFO[city.slug];
  const courts = local.courts.map((c) => c.name).join(", ");
  return [
    {
      question: `Which courts serve ${city.name}?`,
      answer: `The Courts Service lists ${courts} for ${city.name}. ${
        local.courtNote ? `${local.courtNote} ` : ""
      }Small claims and most family applications start in the District Court; bigger civil claims, divorce and judicial separation go to the Circuit Court.`,
    },
    {
      question: `Where do I apply for probate if someone lived in Co. ${city.county}?`,
      answer: `For ${city.name}, probate applications go to ${local.probate}.`,
    },
    {
      question: `Where can I bring an employment complaint from ${city.name}?`,
      answer: `Complaints are made online to the Workplace Relations Commission. ${local.wrc} The usual time limit is six months.`,
    },
    { question: `Are the solicitors listed in ${city.name} regulated?`, answer: IE_REGULATION_ANSWER },
    {
      question: `What happens when I request a callback${firmName ? ` from ${firmName}` : ""}?`,
      answer:
        "Your details come to Lawvoo first. We pass your enquiry only to the firm you chose and ask them to contact you — we can't guarantee they'll reply. Using Lawvoo is free. For personal injury, contact a firm directly through its own website.",
    },
  ];
}
