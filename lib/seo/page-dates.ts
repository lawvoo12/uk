// ============================================================================
// When the content of each country's pages last changed. The sitemaps use
// these as <lastmod> (Google only trusts lastmod when it matches real
// changes), and the Privacy, Terms, About, How we verify and Contact pages
// show their own date from here.
//
// WHEN YOU EDIT a page or data file, update the matching date here.
//  - content:  the shared page text (home, hubs, city and area pages, FAQs)
//  - listings: the date the lawyer list was last changed or checked
//              (Canada and the US use each lawyer's registerChecked instead)
// The US has its own file: lib/us/page-dates.ts.
// ============================================================================

export const UK_DATES = {
  content: "2 October 2026",
  /** The original 50 listings (lib/data/static-lawyers.ts), SRA numbers checked. */
  listingsOriginal: "27 September 2026",
  /** The extra listings (lib/data/uk-lawyers-extra.ts), checked 30 Sep – 1 Oct. */
  listingsExtra: "1 October 2026",
  privacy: "28 September 2026",
  terms: "28 September 2026",
  about: "22 October 2026",
  "how-we-verify": "22 October 2026",
  contact: "22 October 2026",
} as const;

export const IE_DATES = {
  content: "2 October 2026",
  /** Listings collected from each firm's website (lib/ie/lawyers.ts). */
  listings: "28 September 2026",
  freeLegalHelp: "30 September 2026",
  irishLanguage: "2 October 2026",
  privacy: "28 September 2026",
  terms: "28 September 2026",
  about: "22 October 2026",
  "how-we-verify": "22 October 2026",
  contact: "22 October 2026",
} as const;

export const CA_DATES = {
  privacy: "3 October 2026",
  terms: "2 October 2026",
  about: "22 October 2026",
  "how-we-verify": "22 October 2026",
  contact: "22 October 2026",
} as const;
