// ============================================================================
// Canadian-law content for the /ca pages, assembled from:
//   lib/ca/content-shared.ts          types, and federal points and FAQs
//   lib/ca/provinces/ontario.ts       Ontario law and Ontario cities
//   lib/ca/provinces/british-columbia.ts
//   lib/ca/provinces/alberta.ts
//   lib/ca/provinces/saskatchewan.ts
//   lib/ca/provinces/manitoba.ts, nova-scotia.ts, new-brunswick.ts,
//   newfoundland-and-labrador.ts, prince-edward-island.ts
// Each province file lists its official sources and the date they were
// checked. deploy/canada-legal-sources.md has the full list of numbers and
// what is still unverified.
//
// To add a province: write its file in lib/ca/provinces/, then add it to
// CA_PROVINCE_CONTENT and CA_CITY_INFO below.
// ============================================================================

import type { FAQItem } from "@/lib/seo/faq-content";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { CaCity } from "@/lib/ca/cities";
import type { CaProvinceCode } from "@/lib/ca/provinces";
import { CA_LEADS_ENABLED } from "@/lib/config";
import { CA_CALLBACK_ANSWER, type CaCityInfo, type CaProvinceContent } from "@/lib/ca/content-shared";
import { ONTARIO, ONTARIO_CITY_INFO } from "@/lib/ca/provinces/ontario";
import { BC_CITY_INFO, BRITISH_COLUMBIA } from "@/lib/ca/provinces/british-columbia";
import { ALBERTA, ALBERTA_CITY_INFO } from "@/lib/ca/provinces/alberta";
import { SASKATCHEWAN, SASKATCHEWAN_CITY_INFO } from "@/lib/ca/provinces/saskatchewan";
import { MANITOBA, MANITOBA_CITY_INFO } from "@/lib/ca/provinces/manitoba";
import { NOVA_SCOTIA, NOVA_SCOTIA_CITY_INFO } from "@/lib/ca/provinces/nova-scotia";
import { NEW_BRUNSWICK, NEW_BRUNSWICK_CITY_INFO } from "@/lib/ca/provinces/new-brunswick";
import { NEWFOUNDLAND_AND_LABRADOR, NL_CITY_INFO } from "@/lib/ca/provinces/newfoundland-and-labrador";
import { PEI_CITY_INFO, PRINCE_EDWARD_ISLAND } from "@/lib/ca/provinces/prince-edward-island";

export { CA_LINKS } from "@/lib/ca/content-shared";
export type { CaAreaContent, CaCityInfo, CaCourt, CaLink, CaProvinceContent } from "@/lib/ca/content-shared";

export const CA_CONTENT_CHECKED = "4 October 2026";

/** Canada-wide one-paragraph intro for each practice area (the /ca/lawyers/[area] pages). */
export const CA_AREA_INTROS: Record<PracticeAreaSlug, string> = {
  immigration:
    "Work and study permits, Express Entry and permanent residence, family sponsorship, refugee claims and citizenship. Immigration is federal, so the rules are the same in every province — and each province also runs its own nominee program.",
  family:
    "Divorce and separation, parenting, child and spousal support, and dividing property. Divorce is governed by the federal Divorce Act, but property division and the rights of common-law couples depend on your province.",
  "personal-injury":
    "Car accidents, slips and falls, disability claims and medical malpractice. Auto insurance rules and time limits are set by each province. Lawvoo only lists firms for this area — contact a firm directly.",
  employment:
    "Wrongful dismissal and severance, unpaid wages, harassment and human rights at work. Most workers are covered by their province's employment standards law; federally regulated employers come under the Canada Labour Code.",
  property:
    "Buying and selling homes, mortgages, title problems and tenancy matters. Land transfer taxes, registration and tenancy rules are set by each province — and some cities add a tax of their own.",
  "wills-probate":
    "Wills and powers of attorney, probate, estate administration and estate disputes. Probate fees and the rules for dying without a will are different in every province.",
};

/** Sentence for page intros. Every listing was confirmed on the directory before it was added. */
export const CA_CHECKED_SENTENCE =
  "Each lawyer was checked on their provincial law society's public directory before being listed — check again before you hire, as people move firms.";

export const CA_PROVINCE_CONTENT: Partial<Record<CaProvinceCode, CaProvinceContent>> = {
  ON: ONTARIO,
  BC: BRITISH_COLUMBIA,
  AB: ALBERTA,
  SK: SASKATCHEWAN,
  MB: MANITOBA,
  NS: NOVA_SCOTIA,
  NB: NEW_BRUNSWICK,
  NL: NEWFOUNDLAND_AND_LABRADOR,
  PE: PRINCE_EDWARD_ISLAND,
};

export function getCaProvinceContent(code: CaProvinceCode): CaProvinceContent {
  const content = CA_PROVINCE_CONTENT[code];
  if (!content) throw new Error(`No law content for province ${code} yet — add it to lib/ca/content.ts`);
  return content;
}

/** Local information for every city, keyed by city slug. */
export const CA_CITY_INFO: Record<string, CaCityInfo> = {
  ...ONTARIO_CITY_INFO,
  ...BC_CITY_INFO,
  ...ALBERTA_CITY_INFO,
  ...SASKATCHEWAN_CITY_INFO,
  ...MANITOBA_CITY_INFO,
  ...NOVA_SCOTIA_CITY_INFO,
  ...NEW_BRUNSWICK_CITY_INFO,
  ...NL_CITY_INFO,
  ...PEI_CITY_INFO,
};

/** FAQs for /ca/locations/[city]. Unique per city (courts, family court, probate). */
export function getCaLocationFaqs(city: CaCity, firmName?: string): FAQItem[] {
  const local = CA_CITY_INFO[city.slug];
  const province = getCaProvinceContent(city.province);
  const courts = local.courts.map((c) => `${c.name} (${c.use})`).join("; ");
  return [
    {
      question: `Which courts serve ${city.name}?`,
      answer: `${courts}. ${local.courtNote ? `${local.courtNote} ` : ""}${province.courtsSummary}`,
    },
    { question: `Which court deals with family cases for ${city.name}?`, answer: local.familyCourt },
    { question: `Where do I apply for probate if someone lived in ${city.name}?`, answer: local.estates },
    { question: `Where can I bring an employment complaint from ${city.name}?`, answer: province.employmentComplaints },
    { question: `Are the lawyers listed in ${city.name} licensed?`, answer: province.regulationAnswer },
    {
      question: CA_LEADS_ENABLED
        ? `What happens when I request a callback${firmName ? ` from ${firmName}` : ""}?`
        : `How do I contact a lawyer listed in ${city.name}?`,
      answer: CA_CALLBACK_ANSWER,
    },
  ];
}
