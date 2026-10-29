// ============================================================================
// Site switches, read from environment variables (set them in Vercel →
// Settings → Environment Variables, then redeploy — most pages are built
// statically, so a change only shows after a new deployment).
// ============================================================================

/**
 * The enquiry form collects personal data (names, contact details, case
 * details), so the ICO data protection fee should be paid while it's on.
 * The form is ON by default. Set LEADS_ENABLED="false" to switch it off:
 * "Request a callback" then shows a "coming soon" notice with a link to the
 * firm, and each visit is counted anonymously in your Google Sheet.
 */
export const LEADS_ENABLED = process.env.LEADS_ENABLED !== "false";

/**
 * Ireland (/ie) enquiry form. ON when the UK form is on, unless
 * IE_LEADS_ENABLED="false" — lets you pause Irish enquiries (for example
 * until your EU GDPR representative is appointed) without touching the UK.
 */
export const IE_LEADS_ENABLED = LEADS_ENABLED && process.env.IE_LEADS_ENABLED !== "false";

/**
 * Canada (/ca) enquiry form. OFF by default: it only opens when
 * CA_LEADS_ENABLED="true" (and the main LEADS_ENABLED switch is not "false").
 * Read the referral-fee note (deploy/canada-referral-fee-note.md) and settle
 * the business model before switching it on. While it is off, "Request a
 * callback" on /ca pages shows the "opening soon" notice with a link to the
 * firm, and visits are counted anonymously in the Clicks tab.
 */
export const CA_LEADS_ENABLED = LEADS_ENABLED && process.env.CA_LEADS_ENABLED === "true";

/**
 * United States (/us) enquiry form. ON (switched on by the site owner,
 * 18 Oct 2026) unless US_LEADS_ENABLED="false" or LEADS_ENABLED="false".
 * Personal injury is never on the US form. US states restrict paying
 * lawyers for referrals — don't charge firms for US enquiries without
 * checking the rules first. Set US_LEADS_ENABLED="false" in Vercel to pause
 * it: "Request a callback" then shows the "opening soon" notice.
 */
export const US_LEADS_ENABLED = LEADS_ENABLED && process.env.US_LEADS_ENABLED !== "false";

/**
 * New Zealand (/nz) enquiry form. OFF by default: it only opens when
 * NZ_LEADS_ENABLED="true" (and LEADS_ENABLED is not "false"). Settle the
 * business model and NZ Privacy Act 2020 notices before switching it on.
 * While off, "Request a callback" shows the "opening soon" notice with a link
 * to the firm.
 */
export const NZ_LEADS_ENABLED = LEADS_ENABLED && process.env.NZ_LEADS_ENABLED === "true";

/**
 * New Zealand (/nz) section: false until its lawyers are confirmed and
 * lawvoo.com/nz is proxied from Netlify. While false, every /nz page is
 * marked noindex (app/nz/layout.tsx) and /nz/sitemap.xml is not listed in
 * robots.txt. Set to true in the same change that adds the Netlify /nz rules.
 */
export const NZ_SECTION_LIVE = true;

/**
 * United States (/us) section: false until lawyers are confirmed and
 * lawvoo.com/us is proxied from Netlify. While false, every /us page is
 * marked noindex (app/us/layout.tsx), so nothing on lawvoo-uk.vercel.app/us
 * gets indexed early. Set to true in the same change that adds the Netlify
 * /us rules, the robots.txt sitemap line and the en-US hreflang links.
 */
export const US_SECTION_LIVE = true;

/**
 * Your EU GDPR representative (Article 27), shown on /ie/privacy once set —
 * name and postal address in one line, e.g. "Example Rep Ltd, 1 Street, Dublin 2, D02 XXXX".
 */
export const EU_REPRESENTATIVE = process.env.NEXT_PUBLIC_EU_REPRESENTATIVE || "";

/** Where solicitors send listing update/removal requests. */
export const LISTINGS_EMAIL = process.env.NEXT_PUBLIC_LISTINGS_EMAIL || "lawvoo12@gmail.com";

/** Cloudflare Turnstile (spam protection on the enquiry form). Both must be set to enable it. */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

/** Shared secret sent with every webhook call; your Apps Script rejects requests without it. */
export const SHEETS_WEBHOOK_SECRET = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || "";

/**
 * Business details shown on the Privacy and Terms pages.
 * UK law (E-Commerce Regulations 2002, UK GDPR) expects a site that takes
 * enquiries to show who runs it, a postal address and a contact email —
 * fill in NEXT_PUBLIC_BUSINESS_ADDRESS before launch. Add the ICO number
 * once the data protection fee is paid. Empty values are simply hidden.
 */
export const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Lawvoo";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "lawvoo12@gmail.com";
export const BUSINESS_ADDRESS = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "";
export const ICO_NUMBER = process.env.NEXT_PUBLIC_ICO_NUMBER || "";

/** Whether the enquiry form is open for a country section (server-side only). */
export function leadsEnabledFor(country: "uk" | "ie" | "ca" | "us" | "nz"): boolean {
  return { uk: LEADS_ENABLED, ie: IE_LEADS_ENABLED, ca: CA_LEADS_ENABLED, us: US_LEADS_ENABLED, nz: NZ_LEADS_ENABLED }[country];
}

/**
 * The listing request form on the /listings pages (lawyers asking to keep,
 * update or remove their listing, or to be added). OFF until
 * LISTING_FORM_ENABLED="true" — first paste the updated
 * deploy/lawvoo-apps-script.js (it adds the "Listings" tab), otherwise
 * requests would land in the leads sheet. While off, the pages show only the
 * email buttons, as before.
 */
export const LISTING_FORM_ENABLED = process.env.LISTING_FORM_ENABLED === "true";

/**
 * US city and area × city pages that have NO lawyer with an office in that
 * city show the nearest lawyers listed elsewhere in the state (clearly
 * labelled with their real city). true = those pages may be indexed (and go
 * in /us/sitemap.xml) when they also have city-specific court information;
 * false = they stay noindex until a local lawyer is listed. Chosen by the site
 * owner on 23 Oct 2026. If Search Console shows these pages doing badly (e.g.
 * "Crawled – currently not indexed" in bulk), set this to false.
 */
export const US_INDEX_NEARBY_PAGES = true;
