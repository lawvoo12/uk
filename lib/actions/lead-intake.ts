"use server";

import { sendLeadBackupEmail, sendLeadNotificationEmail, type LeadNotificationInput } from "@/lib/email";
import {
  leadIntakeSchema,
  ieLeadIntakeSchema,
  caLeadIntakeSchema,
  usLeadIntakeSchema,
  getPracticeAreaBySlug,
  type LeadIntakeInput,
} from "@/lib/validations/lead-intake";
import { lawyersFor } from "@/lib/data/lawyers";
import { countryFromCode } from "@/lib/country";
import { getCityBySlug } from "@/lib/seo/uk-cities";
import { getIeCityBySlug } from "@/lib/ie/cities";
import { getCaCityBySlug } from "@/lib/ca/cities";
import { getCaArea } from "@/lib/ca/practice-areas";
import { getUsCityBySlug } from "@/lib/us/cities";
import { getUsArea } from "@/lib/us/practice-areas";
import { SHEETS_WEBHOOK_SECRET, leadsEnabledFor } from "@/lib/config";
import { saveToSheet, verifyTurnstile } from "@/lib/sheets";

// A real person needs at least this long to get through four steps.
const MIN_FILL_TIME_MS = 8000;

export type SubmitLeadState =
  | { status: "success"; leadId: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof LeadIntakeInput, string>>;
    };

/**
 * Validates and forwards a lead intake submission to a Google Sheet via an
 * Apps Script Web App — no database involved. Re-validates with Zod
 * server-side even though the client already validated — never trust
 * client input, and this is a public, unauthenticated endpoint.
 *
 * Requires GOOGLE_SHEETS_WEBHOOK_URL in the environment — see README.md for
 * the Apps Script setup (copy-paste, no Google Cloud project needed).
 */
export async function submitLeadIntake(input: LeadIntakeInput): Promise<SubmitLeadState> {
  // New Zealand (/nz) has no enquiry form yet. Refuse anything marked NZ
  // rather than letting it fall through to the UK rules below.
  if (input?.country === "NZ") {
    return { status: "error", message: "Online enquiries aren't open yet. Please contact the firm directly." };
  }

  // "UK" unless the form says it came from the Ireland (/ie), Canada (/ca) or US (/us) pages.
  const country: "UK" | "IE" | "CA" | "US" =
    input?.country === "IE" ? "IE" : input?.country === "CA" ? "CA" : input?.country === "US" ? "US" : "UK";

  // The form can be switched off (lib/config.ts). Checked here too, not just
  // in the UI, so nothing can be posted directly. The Canadian form is off
  // unless CA_LEADS_ENABLED="true", and the US form unless US_LEADS_ENABLED="true".
  const enabled = leadsEnabledFor(countryFromCode(country));
  if (!enabled) {
    return { status: "error", message: "Online enquiries aren't open yet. Please contact the firm directly." };
  }

  // Irish and Canadian enquiries use their own rules: no personal injury,
  // Eircode / postal code, local phone numbers.
  const parsed = { UK: leadIntakeSchema, IE: ieLeadIntakeSchema, CA: caLeadIntakeSchema, US: usLeadIntakeSchema }[country].safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof LeadIntakeInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadIntakeInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;

  // Spam checks. Bots get a fake "success" so they don't learn what tripped them.
  const tooFast = typeof data.startedAt === "number" && Date.now() - data.startedAt < MIN_FILL_TIME_MS;
  if (data.website || tooFast) {
    console.warn("[lead-intake] Dropped likely spam", { honeypot: Boolean(data.website), tooFast });
    return { status: "success", leadId: `lead-${Date.now().toString(36)}` };
  }
  if (!(await verifyTurnstile(data.turnstileToken))) {
    return { status: "error", message: "We couldn't confirm you're not a robot. Please refresh the page and try again." };
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  // Canada and the US show their own area names — send the name the visitor saw.
  const practiceArea =
    (country === "CA" ? getCaArea(data.practiceArea) : country === "US" ? getUsArea(data.practiceArea) : undefined) ??
    getPracticeAreaBySlug(data.practiceArea);
  // A unique-enough reference for the person to quote if they contact you —
  // not a database ID (there's no database), just a readable timestamp tag.
  const leadId = `lead-${Date.now().toString(36)}`;

  // Which solicitor they clicked "Request a callback" on, if any — resolved
  // server-side from the id so the sheet always shows the real listing.
  const requested = data.requestedSolicitorId
    ? lawyersFor(countryFromCode(country)).find((l) => l.id === data.requestedSolicitorId)
    : undefined;
  const requestedCityName = requested
    ? { UK: getCityBySlug, IE: getIeCityBySlug, CA: getCaCityBySlug, US: getUsCityBySlug }[country](requested.citySlug)?.name
    : undefined;
  const requestedSolicitor = requested
    ? `${requested.lawyerName} — ${requested.firmName} (${requestedCityName ?? requested.citySlug})`
    : "";

  const submittedAt = new Date().toISOString();
  const email: LeadNotificationInput = {
    leadId,
    caseTitle: data.caseTitle,
    description: data.description,
    practiceAreaName: practiceArea?.name ?? data.practiceArea,
    urgency: data.urgency,
    clientName: data.fullName,
    clientEmail: data.email,
    clientPhone: data.phone,
    postcode: data.postcode,
    requestedSolicitor,
    ...(country !== "UK" ? { country } : {}),
  };

  const sheetError = webhookUrl
    ? await saveToSheet(webhookUrl, {
        type: "lead",
        secret: SHEETS_WEBHOOK_SECRET,
        leadId,
        submittedAt,
        practiceArea: practiceArea?.name ?? data.practiceArea,
        subCategory: data.subCategory,
        caseTitle: data.caseTitle,
        description: data.description,
        urgency: data.urgency,
        postcode: data.postcode,
        city: data.city,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        requestedSolicitor,
        country,
      })
    : new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set — see README.md for setup.");

  if (!sheetError) {
    // Best-effort on top of the sheet write above — see lib/email.ts for
    // why a failure here never turns a successful submission into an error.
    await sendLeadNotificationEmail(email);
    return { status: "success", leadId };
  }

  // The Sheet couldn't be reached (twice): email the whole lead instead so it
  // isn't lost. Only if that email goes out do we tell the visitor it worked.
  const backedUp = await sendLeadBackupEmail(
    { ...email, subCategory: data.subCategory, city: data.city, submittedAt },
    sheetError.message
  );
  if (backedUp) {
    console.warn(`[lead-intake] Lead ${leadId} saved by backup email only — add it to the Sheet by hand.`);
    return { status: "success", leadId };
  }

  console.error("Failed to submit lead to Google Sheets, and the backup email failed:", sheetError);
  return {
    status: "error",
    message: "Something went wrong on our end. Please try again in a moment.",
  };
}
