// Shared JSON-LD for directory pages (area × city listings) and lawyer
// profiles in the UK, Ireland and Canada. Only facts already shown on the
// page go in: no ratings, no invented credentials.

import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

type CountryCode = "GB" | "IE" | "CA";

interface ListedFirm {
  id: string;
  firmName: string;
  addressLine1: string;
}

/**
 * An area × city page is a directory listing, not a law firm — so it's a
 * CollectionPage whose main entity is an ItemList of the listed firms
 * (each a LegalService with its own profile URL and address).
 */
export function directoryPageJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  /** e.g. "/uk" — used for the WebSite and the profile links. */
  base: "/uk" | "/ie" | "/ca";
  locale: "en-GB" | "en-IE" | "en-CA";
  country: CountryCode;
  cityName: string;
  regionName: string;
  lawyers: ListedFirm[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: opts.locale,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}${opts.base}` },
    about: {
      "@type": "City",
      name: opts.cityName,
      containedInPlace: { "@type": "AdministrativeArea", name: opts.regionName },
    },
    ...(opts.lawyers.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: opts.lawyers.length,
            itemListElement: opts.lawyers.map((lawyer, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "LegalService",
                name: lawyer.firmName,
                url: `${SITE_URL}${opts.base}/lawyer/${lawyer.id}`,
                address: { "@type": "PostalAddress", streetAddress: lawyer.addressLine1, addressCountry: opts.country },
              },
            })),
          },
        }
      : {}),
  };
}

/** A lawyer profile page: ProfilePage with a Person as its main entity. */
export function profilePageJsonLd(opts: {
  url: string;
  country: CountryCode;
  lawyerName: string;
  role: string;
  firmName: string;
  firmUrl: string;
  addressLine1: string;
  sourceProfileUrl: string;
  /** The lawyer's OWN area (see personalFocus) — not every area the firm covers. */
  focusArea?: string;
  /**
   * Only when the PERSON was confirmed on a membership body's directory
   * (Canadian law societies). Left out for UK firms (the SRA regulates, it
   * isn't a membership) and for Ireland until the register check is done.
   */
  memberOf?: { name: string; url: string };
  /** ISO date (YYYY-MM-DD) the listing was last checked, if known. */
  dateModified?: string;
}) {
  const address = { "@type": "PostalAddress", streetAddress: opts.addressLine1, addressCountry: opts.country };
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: opts.url,
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    mainEntity: {
      "@type": "Person",
      "@id": `${opts.url}#person`,
      name: opts.lawyerName,
      jobTitle: opts.role,
      url: opts.url,
      sameAs: [opts.sourceProfileUrl],
      address,
      worksFor: {
        "@type": "LegalService",
        name: opts.firmName,
        address,
        url: opts.firmUrl,
      },
      ...(opts.focusArea ? { knowsAbout: `${opts.focusArea} law` } : {}),
      ...(opts.memberOf ? { memberOf: { "@type": "Organization", name: opts.memberOf.name, url: opts.memberOf.url } } : {}),
    },
  };
}

/**
 * The area the lawyer personally practises: their primary area, or nothing
 * when the source doesn't say (focusNotStated). practiceAreas on a listing
 * are the FIRM's areas, so they aren't used for the person.
 */
export function personalFocus(lawyer: {
  focusNotStated: boolean;
  primaryPracticeArea: string;
  practiceAreas: { name: string; slug: string }[];
}): string | undefined {
  if (lawyer.focusNotStated) return undefined;
  return lawyer.practiceAreas.find((a) => a.slug === lawyer.primaryPracticeArea)?.name;
}
