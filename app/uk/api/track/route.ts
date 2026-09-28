import { NextResponse } from "next/server";

import { STATIC_LAWYERS } from "@/lib/data/static-lawyers";
import { SHEETS_WEBHOOK_SECRET } from "@/lib/config";

// Counts visits to the enquiry page while the form is switched off, so you
// can see real demand before paying the ICO fee and turning the form on.
//
// Deliberately anonymous: no IP address, cookie, user agent or anything else
// that identifies the visitor is stored — only which solicitor (if any) the
// visitor asked about, the page they came from, and the time.

const ALLOWED_SOURCES = new Set(["callback", "find-a-solicitor"]);

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return new NextResponse(null, { status: 204 });

  let body: { lawyerId?: unknown; source?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const source = typeof body.source === "string" && ALLOWED_SOURCES.has(body.source) ? body.source : null;
  if (!source) return new NextResponse(null, { status: 400 });

  // Only accept ids that exist, so the sheet can't be filled with junk.
  const lawyer =
    typeof body.lawyerId === "string" ? STATIC_LAWYERS.find((l) => l.id === body.lawyerId) : undefined;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "click",
        secret: SHEETS_WEBHOOK_SECRET,
        clickedAt: new Date().toISOString(),
        source,
        solicitor: lawyer ? `${lawyer.lawyerName} — ${lawyer.firmName}` : "",
        citySlug: lawyer?.citySlug ?? "",
      }),
    });
  } catch (error) {
    console.error("[track] Failed to record click:", error);
  }

  return new NextResponse(null, { status: 204 });
}
