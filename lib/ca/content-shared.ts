// ============================================================================
// Canada (/ca) — types and FEDERAL content shared by every province's pages.
// Province-specific content lives in lib/ca/provinces/*.ts and is assembled
// in lib/ca/content.ts.
//
// RULE FOR LEGAL NUMBERS (time limits, amounts, rates, thresholds):
// a number only appears on the site if it was read on an official source
// (a government, court, tribunal or regulator website) on the date shown in
// the province file. Where the official source could not be read, the number
// is left out and the text links to the official page instead. The current
// list of what is and isn't verified is in deploy/canada-legal-sources.md.
//
// Federal facts — checked 3 Oct 2026:
//  - Citizenship: 1,095 days in the 5 years before applying; language and
//    test for ages 18 to 54 — canada.ca (IRCC), modified 21 Feb 2025
//  - Federal Court: application for leave within 15 days (matter arising in
//    Canada) or 60 days (outside Canada) — Federal Court guide "How to file
//    an Application for Leave and for Judicial Review (Immigration)"
//  - Who may charge for immigration advice — College of Immigration and
//    Citizenship Consultants
//  - Divorce: one year living apart; one year's residence in the province —
//    Department of Justice Canada
//  - Canada Labour Code unjust dismissal: complaint within 90 days; 12 months'
//    continuous employment — canada.ca "Eligibility and timelines" (modified
//    21 Jun 2024)
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { CaCity } from "@/lib/ca/cities";
import { CA_LEADS_ENABLED } from "@/lib/config";

export interface CaLink {
  label: string;
  href: string;
}

/** Federal links used on every province's pages. */
export const CA_LINKS = {
  ircc: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  citizenshipEligibility:
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility.html",
  irb: "https://irb.gc.ca/",
  consultantRegister: "https://college-ic.ca/protecting-the-public/find-an-immigration-consultant",
  federalCourtGuide:
    "https://www.fct-cf.ca/Content/assets/pdf/base/Federal%20Court%20-%20How%20to%20file%20an%20Application%20for%20Leave%20and%20for%20Judicial%20review%20(Immigration).pdf",
  divorce: "https://www.justice.gc.ca/eng/fl-df/divorce/app.html",
  federalLabourStandards: "https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards.html",
  federalLabourTimelines: "https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards/eligibility-timelines.html",
  opc: "https://www.priv.gc.ca/",
};

export interface CaAreaContent {
  intro: string;
  /** "What to know" bullet points on the practice-area page. */
  points: string[];
  links: CaLink[];
}

export interface CaCourt {
  name: string;
  address: string;
  /** The court location's page on the provincial government or court website. */
  url: string;
  use: string;
}

export interface CaCityInfo {
  /** A short paragraph unique to this city. */
  local: string;
  courts: CaCourt[];
  courtNote?: string;
  /** Where family cases for this city are heard — used in FAQs. */
  familyCourt: string;
  /** Where probate applications for this city are made — used in FAQs. */
  estates: string;
}

export interface CaProvinceContent {
  /** Date the province's facts were checked against the official sources. */
  checked: string;
  jurisdiction: { title: string; body: string };
  /** One or two sentences on the courts, used in the "Which courts serve…" FAQ. */
  courtsSummary: string;
  /** "Are they licensed?" answer. */
  regulationAnswer: string;
  /** One sentence on where employment complaints go. */
  employmentComplaints: string;
  freeHelp: { text: string; links: CaLink[] };
  courtsSource: CaLink;
  areas: Record<PracticeAreaSlug, CaAreaContent>;
  categoryFaqs: (area: PracticeAreaSlug, city?: CaCity, info?: CaCityInfo) => FAQItem[];
}

// ---------------------------------------------------------------------------
// Federal points and FAQs — identical text in every province, so the
// Canada-wide practice-area pages can show each one once.
// ---------------------------------------------------------------------------

export const FED_POINTS = {
  immigrationFederal:
    "Immigration and citizenship are federal. Applications are decided by Immigration, Refugees and Citizenship Canada (IRCC); refugee claims and immigration appeals are heard by the Immigration and Refugee Board (IRB).",
  immigrationWhoCanCharge:
    "Only lawyers licensed by a Canadian law society, Quebec notaries and consultants licensed by the College of Immigration and Citizenship Consultants may charge for immigration advice.",
  citizenship: "To apply for citizenship you must have been physically in Canada for at least 1,095 days in the five years before you apply.",
  federalCourt:
    "If an application is refused, you can ask the Federal Court for leave to seek judicial review — within 15 days for a matter arising in Canada, or 60 days for a matter arising outside Canada.",
  federalEmployers:
    "If your employer is federally regulated (banks, airlines and telecoms, for example), the Canada Labour Code applies instead: an unjust dismissal complaint must be filed within 90 days of the dismissal.",
};

export const FED_FAQS = {
  needLawyer: {
    question: "Do I need a lawyer for a Canadian immigration application?",
    answer:
      "No. You can apply to Immigration, Refugees and Citizenship Canada (IRCC) yourself. A lawyer is most useful when something has gone wrong — a refusal, a finding of misrepresentation or inadmissibility, a removal order — or for a refugee claim or an appeal. If you pay someone for advice, they must be a lawyer licensed by a Canadian law society, a Quebec notary, or a consultant licensed by the College of Immigration and Citizenship Consultants.",
  },
  citizenship: {
    question: "How long do I need to live in Canada before applying for citizenship?",
    answer:
      "You must have been physically in Canada for at least 1,095 days (three years) in the five years before you apply, and be a permanent resident. Applicants aged 18 to 54 also need to show English or French skills and pass the citizenship test.",
  },
  refusal: {
    question: "What can I do if my application is refused?",
    answer:
      "It depends on the type of decision. Some refusals can be appealed to the Immigration and Refugee Board. Others can only be challenged by asking the Federal Court for leave to seek judicial review, and the deadline is short: 15 days for a matter arising in Canada, 60 days for a matter arising outside Canada. Speak to a lawyer quickly.",
  },
  piNoForm: {
    question: "Why can't I send a personal injury enquiry through Lawvoo?",
    answer:
      "Lawvoo only lists firms for personal injury in Canada. Contact any firm directly through its own website — and check the lawyer in the provincial law society's directory first.",
  },
} satisfies Record<string, FAQItem>;

/** Last FAQ on every city page: what "Request a callback" does. */
export const CA_CALLBACK_ANSWER = CA_LEADS_ENABLED
  ? "Your details come to Lawvoo first. We pass your enquiry only to the firm you chose and ask them to contact you — we can't guarantee they'll reply. Using Lawvoo is free. For personal injury, contact a firm directly through its own website."
  : "Lawvoo isn't taking enquiries in Canada yet. 'Request a callback' on a listing shows you the firm's own website and its law society directory link, so you can contact the firm directly. Browsing Lawvoo is free.";
