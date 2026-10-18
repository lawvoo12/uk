// ============================================================================
// United States (/us) — types and FEDERAL content shared by every state's
// pages. State-specific content lives in lib/us/states/*.ts and is assembled
// in lib/us/content.ts.
//
// RULE FOR LEGAL NUMBERS (time limits, amounts, rates, thresholds):
// a number only appears on the site if it was read on an official source
// (a government, court, agency or state bar website) on the date shown in
// the state file. Where the official source could not be read, the number
// is left out and the text links to the official page instead. The current
// list of what is and isn't verified is in deploy/us-legal-sources.md.
//
// Federal facts — checked 17 Oct 2026:
//  - Naturalization (5-year rule): at least 18; permanent resident for at
//    least five years; physically present at least 30 months of those five
//    years; at least three months in the state or USCIS district where you
//    apply — uscis.gov "I am a lawful permanent resident of 5 years"
//  - Spouses of US citizens: permanent resident for at least three years and
//    living in marital union with the citizen spouse for three years —
//    uscis.gov "I am married to a U.S. citizen" (INA 319(a))
//  - Accredited representatives: non-attorneys accredited by the Department
//    of Justice may represent people before DHS and the immigration courts,
//    only through Recognized Organizations (non-profit, tax-exempt) —
//    justice.gov/eoir "Recognition and Accreditation Program" (upd. 29 Apr 2026)
//  - EOIR "conducts immigration court proceedings, appellate reviews, and
//    administrative hearings" — justice.gov/eoir "About the Office"
//  - Wage and Hour Division complaints: 1-866-487-9243 — dol.gov/agencies/whd
//  - EEOC charge: 180 calendar days, extended to 300 if a state or local
//    agency enforces a law on the same basis; age: 300 only where a STATE law
//    and state agency exist; Equal Pay Act: no charge needed, two years
//    (three if willful); federal employees: EEO counselor within 45 days —
//    eeoc.gov "Time Limits For Filing A Charge"
//  - Federal minimum wage $7.25 an hour for employers covered by the FLSA —
//    dol.gov "State Minimum Wage Laws" (updated 1 Jul 2026)
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { UsCity } from "@/lib/us/cities";
import { US_LEADS_ENABLED } from "@/lib/config";

export interface UsLink {
  label: string;
  href: string;
}

/** Federal links used on every state's pages. */
export const US_LINKS = {
  uscis: "https://www.uscis.gov/",
  naturalizationSpouse:
    "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization/i-am-married-to-a-us-citizen",
  naturalization5:
    "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization/i-am-a-lawful-permanent-resident-of-5-years",
  eoir: "https://www.justice.gov/eoir",
  accreditation: "https://www.justice.gov/eoir/recognition-and-accreditation-program",
  eeocTimeLimits: "https://www.eeoc.gov/time-limits-filing-charge",
  eeoc: "https://www.eeoc.gov/",
  dolMinimumWage: "https://www.dol.gov/agencies/whd/minimum-wage/state",
  dolWhd: "https://www.dol.gov/agencies/whd",
};

export interface UsAreaContent {
  intro: string;
  /** "What to know" bullet points on the practice-area page. */
  points: string[];
  links: UsLink[];
}

export interface UsCourt {
  name: string;
  address: string;
  /** The court's page on an official (state, county or court) website. */
  url: string;
  use: string;
}

export interface UsCityInfo {
  /** A short paragraph unique to this city. */
  local: string;
  courts: UsCourt[];
  courtNote?: string;
  /** Where family cases for this city are heard — used in FAQs. */
  familyCourt: string;
  /** Where wills and estates for this city are handled — used in FAQs. */
  estates: string;
}

export interface UsStateContent {
  /** Date the state's facts were checked against the official sources. */
  checked: string;
  jurisdiction: { title: string; body: string };
  /** One or two sentences on the courts, used in the "Which courts serve…" FAQ. */
  courtsSummary: string;
  /** "Are they licensed?" answer. */
  regulationAnswer: string;
  /** One sentence on where employment complaints go. */
  employmentComplaints: string;
  freeHelp: { text: string; links: UsLink[] };
  courtsSource: UsLink;
  areas: Record<PracticeAreaSlug, UsAreaContent>;
  categoryFaqs: (area: PracticeAreaSlug, city?: UsCity, info?: UsCityInfo) => FAQItem[];
}

// ---------------------------------------------------------------------------
// Federal points and FAQs — identical text in every state, so the US-wide
// practice-area pages can show each one once.
// ---------------------------------------------------------------------------

export const FED_POINTS = {
  immigrationFederal:
    "Immigration is federal law, so the rules are the same in every state. Applications such as green cards and citizenship are decided by U.S. Citizenship and Immigration Services (USCIS); immigration court proceedings are conducted by the Executive Office for Immigration Review (EOIR).",
  immigrationWhoCanRepresent:
    "Besides licensed attorneys, federal rules allow non-attorney 'accredited representatives' to represent people before USCIS and the immigration courts — but only through a non-profit organization recognized by the Department of Justice.",
  citizenship:
    "Under the usual rule, you can apply for citizenship after five years as a permanent resident if you are at least 18, have been physically in the US for at least 30 of those months, and have lived for at least three months in the state or USCIS district where you apply.",
  eeoc:
    "A discrimination charge must normally be filed with the Equal Employment Opportunity Commission (EEOC) within 180 calendar days. The deadline becomes 300 days where a state or local agency enforces a law against the same kind of discrimination.",
  equalPay: "Equal Pay Act claims don't need an EEOC charge: you have two years from the last discriminatory paycheck, or three years if the discrimination was willful.",
  federalWorkers: "Federal employees and job applicants use a different process and generally must contact their agency's EEO counselor within 45 days.",
  federalMinimumWage: "The federal minimum wage is $7.25 an hour for employers covered by the Fair Labor Standards Act.",
};

export const FED_FAQS = {
  needLawyer: {
    question: "Do I need a lawyer for a US immigration application?",
    answer:
      "Not necessarily — you can file with USCIS yourself. Many people get help when something has gone wrong or the stakes are high, such as a denial or a case in immigration court. If you get help, use a licensed attorney or a Department of Justice accredited representative working for a recognized non-profit organization.",
  },
  citizenship: {
    question: "How long do I need to be a green card holder before applying for citizenship?",
    answer:
      "Under the usual rule, five years. You must also be at least 18, have been physically present in the US for at least 30 months of those five years, and have lived for at least three months in the state or USCIS district where you apply. If you are married to a US citizen and have lived with them in marital union for three years, the period is three years. Other exceptions exist — see USCIS for the rule that fits you.",
  },
  eeocDeadline: {
    question: "How long do I have to file a discrimination charge with the EEOC?",
    answer:
      "Normally 180 calendar days from the discrimination. It becomes 300 days where a state or local agency enforces a law against the same kind of discrimination (for age discrimination, only a state law counts). Equal Pay Act claims don't need a charge and have two years, or three if the discrimination was willful. Federal employees must contact their agency's EEO counselor within 45 days.",
  },
  piNoForm: {
    question: "Why can't I send a personal injury enquiry through Lawvoo?",
    answer:
      "Lawvoo only lists firms for personal injury in the US. Contact any firm directly through its own website — and check the lawyer on the state bar's directory first.",
  },
} satisfies Record<string, FAQItem>;

/** Last FAQ on every city page: what "Request a callback" does. */
export const US_CALLBACK_ANSWER = US_LEADS_ENABLED
  ? "Your details come to Lawvoo first. We pass your enquiry only to the firm you chose and ask them to contact you — we can't guarantee they'll reply. Using Lawvoo is free. For personal injury, contact a firm directly through its own website."
  : "Lawvoo isn't taking enquiries in the US yet. 'Request a callback' on a listing shows you the firm's own website and its state bar directory link, so you can contact the firm directly. Browsing Lawvoo is free.";
