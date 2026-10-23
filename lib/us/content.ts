// ============================================================================
// US-law content for the /us pages, assembled from:
//   lib/us/content-shared.ts   types, and federal points and FAQs
//   lib/us/states/alabama.ts   Alabama law and Alabama cities
//   lib/us/states/tennessee.ts Tennessee law and Tennessee cities
//   lib/us/states/mississippi.ts Mississippi law and Mississippi cities
// Each state file lists its official sources and the date they were checked.
// deploy/us-legal-sources.md has the full list of numbers and what is still
// unverified.
//
// To add a state: write its file in lib/us/states/, then add it to
// US_STATE_CONTENT and US_CITY_INFO below (and to lib/us/states.ts,
// lib/us/regulators.ts and lib/us/cities.ts).
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { UsCity } from "@/lib/us/cities";
import type { UsStateCode } from "@/lib/us/states";
import { US_LEADS_ENABLED } from "@/lib/config";
import { US_CALLBACK_ANSWER, type UsCityInfo, type UsStateContent } from "@/lib/us/content-shared";
import { ALABAMA, ALABAMA_CITY_INFO } from "@/lib/us/states/alabama";
import { MISSISSIPPI, MISSISSIPPI_CITY_INFO } from "@/lib/us/states/mississippi";
import { TENNESSEE, TENNESSEE_CITY_INFO } from "@/lib/us/states/tennessee";

export { US_LINKS } from "@/lib/us/content-shared";
export type { UsAreaContent, UsCityInfo, UsCourt, UsLink, UsStateContent } from "@/lib/us/content-shared";

export const US_CONTENT_CHECKED = "17 October 2026";

/** US-wide one-paragraph intro for each practice area (the /us/lawyers/[area] pages). */
export const US_AREA_INTROS: Record<PracticeAreaSlug, string> = {
  immigration:
    "Green cards, work and family visas, citizenship, asylum and removal (deportation) defense. Immigration is federal law, so the rules are the same in every state.",
  family:
    "Divorce, custody and visitation, child support and dividing property. Family law is state law, so the rules — and the court that hears your case — depend on where you live.",
  "personal-injury":
    "Car and truck crashes, slips and falls, medical malpractice and wrongful death. Time limits and the rules on fault are set by each state. Lawvoo only lists firms for this area — contact a firm directly.",
  employment:
    "Discrimination and harassment, unpaid wages and overtime, retaliation and wrongful termination. Federal law applies everywhere, and many states add protections of their own.",
  property:
    "Home purchases and closings, deeds and title problems, and landlord and tenant disputes. Taxes and recording rules are set by each state and county.",
  "wills-probate":
    "Wills and trusts, powers of attorney, probate and estate administration, and estate disputes. Probate is handled by state courts, and the rules differ from state to state.",
};

/** Sentence for page intros. Every listing was confirmed on the directory before it was added. */
export const US_CHECKED_SENTENCE =
  "Each lawyer was checked on their state bar's public directory before being listed — check again before you hire, as people move firms.";

export const US_STATE_CONTENT: Partial<Record<UsStateCode, UsStateContent>> = {
  AL: ALABAMA,
  TN: TENNESSEE,
  MS: MISSISSIPPI,
};

export function getUsStateContent(code: UsStateCode): UsStateContent {
  const content = US_STATE_CONTENT[code];
  if (!content) throw new Error(`No law content for state ${code} yet — add it to lib/us/content.ts`);
  return content;
}

/** Local information for every city, keyed by city slug. */
export const US_CITY_INFO: Record<string, UsCityInfo> = {
  ...ALABAMA_CITY_INFO,
  ...TENNESSEE_CITY_INFO,
  ...MISSISSIPPI_CITY_INFO,
};

/** FAQs for /us/locations/[city]. Unique per city (courts, family court, probate). */
export function getUsLocationFaqs(city: UsCity, firmName?: string): FAQItem[] {
  const local = US_CITY_INFO[city.slug];
  const state = getUsStateContent(city.state);
  const courts = local.courts.map((c) => `${c.name} (${c.use})`).join("; ");
  return [
    {
      question: `Which courts serve ${city.name}?`,
      answer: `${courts}. ${local.courtNote ? `${local.courtNote} ` : ""}`.trim(),
    },
    { question: `Which court deals with divorce for ${city.name}?`, answer: local.familyCourt },
    { question: `Where are wills and estates handled for someone who lived in ${city.name}?`, answer: local.estates },
    { question: `Where can I bring an employment complaint from ${city.name}?`, answer: state.employmentComplaints },
    { question: `Are the lawyers listed in ${city.name} licensed?`, answer: state.regulationAnswer },
    {
      question: US_LEADS_ENABLED
        ? `What happens when I request a callback${firmName ? ` from ${firmName}` : ""}?`
        : `How do I contact a lawyer listed in ${city.name}?`,
      answer: US_CALLBACK_ANSWER,
    },
  ];
}
