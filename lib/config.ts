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
