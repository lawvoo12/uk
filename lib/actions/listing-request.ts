"use server";

import { LISTING_FORM_ENABLED, LISTINGS_EMAIL, SHEETS_WEBHOOK_SECRET } from "@/lib/config";
import { countryFromCode } from "@/lib/country";
import { lawyersFor } from "@/lib/data/lawyers";
import { saveToSheet, verifyTurnstile } from "@/lib/sheets";
import { listingRequestSchema, type ListingRequestInput } from "@/lib/validations/listing-request";

const MIN_FILL_TIME_MS = 5000;

export type ListingRequestState =
  | { status: "success"; ref: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ListingRequestInput, string>> };

/** "https://lawvoo.com/us/lawyer/mobile-al-lucy-tufts" or the bare id → the id. */
function listingIdFrom(ref: string): string {
  const m = /\/lawyer\/([a-z0-9-]+)/i.exec(ref);
  return (m ? m[1] : ref).trim().toLowerCase();
}

/**
 * Saves a listing request (keep / update / remove / add me) to the
 * "Listings" tab of the Google Sheet. Nothing on the site changes until the
 * site owner has checked the request and the regulator's register.
 */
export async function submitListingRequest(input: ListingRequestInput): Promise<ListingRequestState> {
  if (!LISTING_FORM_ENABLED) {
    return { status: "error", message: `The form isn't open yet. Please email ${LISTINGS_EMAIL} instead.` };
  }

  const parsed = listingRequestSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ListingRequestInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ListingRequestInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;
  const ref = `listing-${Date.now().toString(36)}`;

  // Spam checks. Bots get a fake "success" so they don't learn what tripped them.
  const tooFast = typeof data.startedAt === "number" && Date.now() - data.startedAt < MIN_FILL_TIME_MS;
  if (data.website || tooFast) {
    console.warn("[listing-request] Dropped likely spam", { honeypot: Boolean(data.website), tooFast });
    return { status: "success", ref };
  }
  if (!(await verifyTurnstile(data.turnstileToken))) {
    return { status: "error", message: "We couldn't confirm you're not a robot. Please refresh the page and try again." };
  }

  // For an existing listing, record which one it is (as the sheet's own text).
  const listingId = data.kind === "listed" ? listingIdFrom(data.listingRef) : "";
  const listing = listingId ? lawyersFor(countryFromCode(data.country)).find((l) => l.id === listingId) : undefined;

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const error = webhookUrl
    ? await saveToSheet(webhookUrl, {
        type: "listing",
        secret: SHEETS_WEBHOOK_SECRET,
        ref,
        submittedAt: new Date().toISOString(),
        country: data.country,
        request: data.kind === "add" ? "Add me" : data.action === "keep" ? "Keep listing" : data.action === "update" ? "Update listing" : "Remove listing",
        listing: listing ? `${listing.id} — ${listing.lawyerName}, ${listing.firmName}` : data.listingRef,
        fullName: data.fullName,
        role: data.role,
        firmName: data.firmName,
        email: data.email,
        phone: data.phone,
        registrationNumber: data.registrationNumber,
        profileUrl: data.profileUrl,
        officeAddress: data.officeAddress,
        city: data.city,
        practiceAreas: data.practiceAreas.join(", "),
        details: data.details,
        willLink: data.willLink ? "Yes" : "No",
      })
    : new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");

  if (error) {
    console.error("[listing-request] Could not save request:", error);
    return {
      status: "error",
      message: `Something went wrong on our end. Please try again in a moment, or email ${LISTINGS_EMAIL}.`,
    };
  }
  return { status: "success", ref };
}
