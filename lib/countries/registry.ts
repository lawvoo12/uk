// ============================================================================
// COUNTRY REGISTRY — everything that differs between the country sections,
// in one place. Shared components read from here instead of writing
// `isCa ? … : isUs ? … : isIe ? …`, so adding a country means adding one
// entry here (plus its data files), not editing ten components.
//
// Only static data lives here — it is imported by client components (the
// enquiry form, the search box), so no environment switches (those stay in
// lib/config.ts, see leadsEnabledFor) and no big data such as lawyer lists or
// city tables.
//
// Changing a string here changes it on the live site.
// ============================================================================

import {
  PRACTICE_AREAS,
  IE_PRACTICE_AREAS,
  SUB_CATEGORIES,
  IE_SUB_CATEGORIES,
  CA_SUB_CATEGORIES,
  US_SUB_CATEGORIES,
  type PracticeAreaSlug,
} from "@/lib/validations/lead-intake";
import { CA_PRACTICE_AREAS } from "@/lib/ca/practice-areas";
import { US_PRACTICE_AREAS } from "@/lib/us/practice-areas";
import { COUNTRY_BASE, COUNTRY_CODE, LISTINGS_BASE, type Country, type CountryCode } from "@/lib/country";

export interface CountryArea {
  slug: PracticeAreaSlug;
  name: string;
  description: string;
  /** The area's URL name when it differs from the slug (Canada and the US). */
  urlSlug?: string;
}

type SubCategories = Record<PracticeAreaSlug, readonly { slug: string; name: string }[]>;

export interface CountryConfig {
  country: Country;
  /** Sheet "Country" value and the enquiry form's country. */
  code: CountryCode;
  /** "/uk" */
  base: string;
  /** "/uk/solicitors" or "/ca/lawyers" */
  listingsBase: string;
  /** "solicitor" or "lawyer" */
  word: "solicitor" | "lawyer";
  /** Practice areas with this country's names (cards, search, grids). */
  areas: readonly CountryArea[];

  search: { locationLabel: string; locationPlaceholder: string };

  form: {
    /** Areas offered on the enquiry form (no personal injury outside the UK). */
    areas: readonly CountryArea[];
    subCategories: SubCategories;
    /** "Personal injury? We don't take…" note under the area picker. */
    piNote: { where: string; href: string; linkText: string } | null;
    postcodeLabel: string;
    postcodePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    caseTitlePlaceholder: string;
    phonePlaceholder: string;
    consentText: string;
    consentLaw: string;
    privacyPath: string;
    trustLine: string;
  };

  /** Directory used in "Check in the … directory" / "Check on the … register". */
  regulatorNoun: "directory" | "register";
  /** Sidebar note while the form is switched off. */
  closedSidebarNote: string;
  /** Under "Popular practice areas" on the home page. */
  practiceAreaGridNote: string;
  /** Listing request form: hint under "Registration or bar number". */
  registrationHint: string;
}

const CONSENT_CHOSEN_OR_NAMED =
  "with the law firm I chose — or, if I didn't choose one, with a firm Lawvoo names to me first — so that the firm can contact me about my legal matter.";

const SIDEBAR_NOTE_START =
  "For now, contact a firm on this page directly — each listing links to the firm's website and";

export const COUNTRIES: Record<Country, CountryConfig> = {
  uk: {
    country: "uk",
    code: COUNTRY_CODE.uk,
    base: COUNTRY_BASE.uk,
    listingsBase: LISTINGS_BASE.uk,
    word: "solicitor",
    areas: PRACTICE_AREAS,
    search: {
      locationLabel: "City or UK postcode",
      locationPlaceholder: "City or postcode, e.g. Manchester or SW1A 1AA",
    },
    form: {
      areas: PRACTICE_AREAS,
      subCategories: SUB_CATEGORIES,
      piNote: null,
      postcodeLabel: "UK postcode",
      postcodePlaceholder: "SW1A 1AA",
      cityLabel: "Town or city",
      cityPlaceholder: "London",
      caseTitlePlaceholder: "e.g. Spouse visa application for my partner",
      phonePlaceholder: "07123 456789",
      consentText:
        "I agree to Lawvoo reviewing these details and sharing them with a solicitor firm that covers my case (the firm I chose, if I picked one), so that they can contact me about it.",
      consentLaw: "Required under UK GDPR.",
      privacyPath: "/uk/privacy",
      trustLine: "Free to use · No obligation to instruct · Regulated solicitors only",
    },
    regulatorNoun: "register",
    closedSidebarNote: `${SIDEBAR_NOTE_START} its register entry.`,
    practiceAreaGridNote: "Every firm listed has been checked on its regulator's register.",
    registrationHint: "Your SRA number, or your Law Society of Scotland or Northern Ireland details",
  },

  ie: {
    country: "ie",
    code: COUNTRY_CODE.ie,
    base: COUNTRY_BASE.ie,
    listingsBase: LISTINGS_BASE.ie,
    word: "solicitor",
    areas: PRACTICE_AREAS,
    search: {
      locationLabel: "Town or Eircode",
      locationPlaceholder: "Town or Eircode, e.g. Cork or D02",
    },
    form: {
      areas: IE_PRACTICE_AREAS,
      subCategories: IE_SUB_CATEGORIES,
      piNote: { where: "Ireland", href: "/ie/solicitors/personal-injury", linkText: "see personal injury solicitors" },
      postcodeLabel: "Eircode (optional)",
      postcodePlaceholder: "A65 F4E2",
      cityLabel: "Town or county",
      cityPlaceholder: "Dublin",
      caseTitlePlaceholder: "e.g. Stamp 4 application after my work permit",
      phonePlaceholder: "087 123 4567",
      consentText:
        "I agree to Lawvoo reviewing these details and sharing them with the solicitor firm I chose — or, if I didn't choose one, with a firm Lawvoo names to me first — so that they can contact me about it.",
      consentLaw: "Required under the GDPR.",
      privacyPath: "/ie/privacy",
      trustLine: "Free to use · No obligation to instruct · Regulated solicitors only",
    },
    regulatorNoun: "register",
    closedSidebarNote: `${SIDEBAR_NOTE_START} its register entry.`,
    practiceAreaGridNote:
      "Listings come from each firm's own published details. Check any firm on the Law Society of Ireland register before you instruct it.",
    registrationHint: "As shown on the Law Society of Ireland's register",
  },

  ca: {
    country: "ca",
    code: COUNTRY_CODE.ca,
    base: COUNTRY_BASE.ca,
    listingsBase: LISTINGS_BASE.ca,
    word: "lawyer",
    areas: CA_PRACTICE_AREAS,
    search: {
      locationLabel: "City or postal code",
      locationPlaceholder: "City or postal code, e.g. Toronto or M5H",
    },
    form: {
      areas: CA_PRACTICE_AREAS.filter((a) => a.slug !== "personal-injury"),
      subCategories: CA_SUB_CATEGORIES,
      piNote: { where: "Canada", href: "/ca/lawyers/personal-injury", linkText: "see personal injury lawyers" },
      postcodeLabel: "Postal code (optional)",
      postcodePlaceholder: "M5H 3S5",
      cityLabel: "City or town",
      cityPlaceholder: "Toronto",
      caseTitlePlaceholder: "e.g. Spousal sponsorship application for my partner",
      phonePlaceholder: "416 555 0123",
      consentText: `I agree to Lawvoo reviewing these details and sharing them ${CONSENT_CHOSEN_OR_NAMED} Lawvoo is based outside Canada, so my details will be stored and handled outside Canada.`,
      consentLaw: "We need your consent under Canadian privacy law (PIPEDA).",
      privacyPath: "/ca/privacy",
      trustLine: "Free to use · No obligation to hire · Licensed lawyers only",
    },
    regulatorNoun: "directory",
    closedSidebarNote: `${SIDEBAR_NOTE_START} its law society directory.`,
    practiceAreaGridNote: "Every lawyer listed was checked on their provincial law society's public directory before being added.",
    registrationHint: "Your law society licence or member number",
  },

  us: {
    country: "us",
    code: COUNTRY_CODE.us,
    base: COUNTRY_BASE.us,
    listingsBase: LISTINGS_BASE.us,
    word: "lawyer",
    areas: US_PRACTICE_AREAS,
    search: {
      locationLabel: "City or ZIP code",
      locationPlaceholder: "City or ZIP code, e.g. Birmingham or 35203",
    },
    form: {
      areas: US_PRACTICE_AREAS.filter((a) => a.slug !== "personal-injury"),
      subCategories: US_SUB_CATEGORIES,
      piNote: { where: "the US", href: "/us/lawyers/personal-injury", linkText: "see personal injury lawyers" },
      postcodeLabel: "ZIP code (optional)",
      postcodePlaceholder: "35203",
      cityLabel: "City or town",
      cityPlaceholder: "Birmingham",
      caseTitlePlaceholder: "e.g. Green card application for my spouse",
      phonePlaceholder: "205 555 0123",
      consentText: `I agree to Lawvoo reviewing these details and sharing them ${CONSENT_CHOSEN_OR_NAMED} Lawvoo is based outside the United States, so my details will be stored and handled outside the US.`,
      consentLaw: "We only share your details with your consent.",
      privacyPath: "/us/privacy",
      trustLine: "Free to use · No obligation to hire · Licensed lawyers only",
    },
    regulatorNoun: "directory",
    closedSidebarNote: `${SIDEBAR_NOTE_START} its state bar directory.`,
    practiceAreaGridNote: "Every lawyer listed is checked on their state bar's public directory before being added.",
    registrationHint: "Your state bar number",
  },
};

/** The registry entry for a country section. */
export function cfg(country: Country): CountryConfig {
  return COUNTRIES[country];
}

/** The registry entry for an enquiry-form country code ("UK", "IE", …). */
export function cfgByCode(code: CountryCode): CountryConfig {
  return Object.values(COUNTRIES).find((c) => c.code === code) ?? COUNTRIES.uk;
}
