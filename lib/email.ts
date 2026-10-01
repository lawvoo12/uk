import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface LeadNotificationInput {
  leadId: string;
  caseTitle: string;
  description: string;
  practiceAreaName: string;
  urgency: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  postcode: string;
  requestedSolicitor?: string;
  /** Only set for Irish leads, which get an [IE] tag in the subject. */
  country?: "IE";
}

/**
 * Notifies the site owner by email when a new lead comes in. This is
 * intentionally best-effort: if RESEND_API_KEY isn't set, or the email API
 * call fails for any reason, this logs and returns rather than throwing —
 * a broken email integration should never cause a lead submission (which
 * already succeeded in the database) to show the visitor an error.
 *
 * Requires two env vars once you're ready to turn it on:
 *   RESEND_API_KEY      — from https://resend.com/api-keys (free tier available)
 *   LEAD_NOTIFY_EMAIL   — where new-lead alerts should be sent
 * Until both are set, this is a silent no-op — leads still save to the
 * database either way, so nothing breaks by leaving it unconfigured.
 */
export async function sendLeadNotificationEmail(lead: LeadNotificationInput): Promise<void> {
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;

  if (!resend || !notifyEmail) {
    console.log(`[lead-notification] Skipped — RESEND_API_KEY or LEAD_NOTIFY_EMAIL not set (lead ${lead.leadId} still saved to DB).`);
    return;
  }

  try {
    await resend.emails.send({
      from: "Lawvoo Leads <leads@lawvoo.com>",
      to: notifyEmail,
      replyTo: lead.clientEmail,
      subject: `${lead.country ? `[${lead.country}] ` : ""}New lead: ${lead.caseTitle} (${lead.practiceAreaName})`,
      text: [
        `New case submitted — ${lead.urgency}`,
        "",
        ...(lead.country ? [`Country: ${lead.country}`] : []),
        `Practice area: ${lead.practiceAreaName}`,
        `${lead.country === "IE" ? "Eircode" : "Postcode"}: ${lead.postcode}`,
        ...(lead.requestedSolicitor ? [`Requested callback from: ${lead.requestedSolicitor}`] : []),
        "",
        `Name: ${lead.clientName}`,
        `Email: ${lead.clientEmail}`,
        `Phone: ${lead.clientPhone ?? "not provided"}`,
        "",
        `Case: ${lead.caseTitle}`,
        lead.description,
        "",
        `Lead ID: ${lead.leadId}`,
      ].join("\n"),
    });
  } catch (error) {
    // Logged, not thrown — see function doc comment above for why.
    console.error(`[lead-notification] Failed to send for lead ${lead.leadId}:`, error);
  }
}
