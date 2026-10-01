// ============================================================================
// The two country sections of this app. Everything under /uk is the UK
// directory; everything under /ie is the Republic of Ireland directory.
// Shared components take a `country` prop (default "uk") so the UK pages
// behave exactly as before.
// ============================================================================

export type Country = "uk" | "ie";

/** Value written to the "Country" column in the Google Sheet. */
export type CountryCode = "UK" | "IE";

export const COUNTRY_CODE: Record<Country, CountryCode> = { uk: "UK", ie: "IE" };

export function countryFromCode(code: unknown): Country {
  return code === "IE" ? "ie" : "uk";
}

/** Which section a URL path belongs to — used by the navbar and footer. */
export function countryFromPath(pathname: string | null | undefined): Country {
  return pathname === "/ie" || pathname?.startsWith("/ie/") ? "ie" : "uk";
}

export const COUNTRY_BASE: Record<Country, string> = { uk: "/uk", ie: "/ie" };
