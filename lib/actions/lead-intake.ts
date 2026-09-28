"use server";

import { sendLeadNotificationEmail } from "@/lib/email";
import { leadIntakeSchema, getPracticeAreaBySlug, type LeadIntakeInput } from "@/lib/validations/lead-intake";
import { STATIC_LAWYERS } from "@/lib/data/static-lawyers";
import { getCityBySlug } from "@/lib/seo/uk-cities";
import { LEADS_ENABLED, SHEETS_WEBHOOK_SECRET, TURNSTILE_SECRET_KEY } from "@/lib/config";

// A real person needs at least this long to get through four steps.
const MIN_FILL_TIME_MS = 8000;

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true; // not configured (e.g. local dev)
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[turnstile] verification failed:", error);
    return false;
  }
}

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
  // The form is switched off until the ICO fee is paid (lib/config.ts).
  // Checked here too, not just in the UI, so nothing can be posted directly.
  if (!LEADS_ENABLED) {
    return { status: "error", message: "Online enquiries aren't open yet. Please contact the firm directly." };
  }

  const parsed = leadIntakeSchema.safeParse(input);

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

  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set — see README.md for setup.");
    return {
      status: "error",
      message: "This form isn't fully set up yet. Please try again later or contact us directly.",
    };
  }

  const practiceArea = getPracticeAreaBySlug(data.practiceArea);
  // A unique-enough reference for the person to quote if they contact you —
  // not a database ID (there's no database), just a readable timestamp tag.
  const leadId = `lead-${Date.now().toString(36)}`;

  // Which solicitor they clicked "Request a callback" on, if any — resolved
  // server-side from the id so the sheet always shows the real listing.
  const requested = data.requestedSolicitorId
    ? STATIC_LAWYERS.find((l) => l.id === data.requestedSolicitorId)
    : undefined;
  const requestedSolicitor = requested
    ? `${requested.lawyerName} — ${requested.firmName} (${getCityBySlug(requested.citySlug)?.name ?? requested.citySlug})`
    : "";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "lead",
        secret: SHEETS_WEBHOOK_SECRET,
        leadId,
        submittedAt: new Date().toISOString(),
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
      }),
    });

    if (!response.ok) {
      throw new Error(`Sheets webhook responded with ${response.status}`);
    }
    // Apps Script always answers 200, so check what it actually said — a
    // wrong/missing secret comes back as { status: "forbidden" }.
    const reply = (await response.json().catch(() => null)) as { status?: string } | null;
    if (reply && reply.status !== "success") {
      throw new Error(`Sheets webhook replied ${JSON.stringify(reply)}`);
    }

    // Best-effort on top of the sheet write above — see lib/email.ts for
    // why a failure here never turns a successful submission into an error.
    await sendLeadNotificationEmail({
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
    });

    return { status: "success", leadId };
  } catch (error) {
    console.error("Failed to submit lead to Google Sheets:", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again in a moment.",
    };
  }
}
