// ============================================================================
// The three country sections of this app. Everything under /uk is the UK
// directory, /ie is the Republic of Ireland directory and /ca is the Canada
// directory. Shared components take a `country` prop (default "uk") so the
// UK pages behave exactly as before.
// ============================================================================

export type Country = "uk" | "ie" | "ca" | "us";

/** Value written to the "Country" column in the Google Sheet. */
export type CountryCode = "UK" | "IE" | "CA" | "US";

export const COUNTRY_CODE: Record<Country, CountryCode> = { uk: "UK", ie: "IE", ca: "CA", us: "US" };

export function countryFromCode(code: unknown): Country {
  return code === "IE" ? "ie" : code === "CA" ? "ca" : code === "US" ? "us" : "uk";
}

/** Which section a URL path belongs to — used by the navbar and footer. */
export function countryFromPath(pathname: string | null | undefined): Country {
  if (pathname === "/ie" || pathname?.startsWith("/ie/")) return "ie";
  if (pathname === "/ca" || pathname?.startsWith("/ca/")) return "ca";
  if (pathname === "/us" || pathname?.startsWith("/us/")) return "us";
  return "uk";
}

export const COUNTRY_BASE: Record<Country, string> = { uk: "/uk", ie: "/ie", ca: "/ca", us: "/us" };

/** Base path of the "browse by practice area" pages — Canada says "lawyers", not "solicitors". */
export const LISTINGS_BASE: Record<Country, string> = { uk: "/uk/solicitors", ie: "/ie/solicitors", ca: "/ca/lawyers", us: "/us/lawyers" };
