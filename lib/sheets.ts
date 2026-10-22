// Server-only helpers shared by the enquiry form and the listing request
// form: writing a row to the Google Sheet (via the Apps Script web app) and
// checking the Cloudflare Turnstile token. Not a "use server" file, so these
// are never exposed as server actions themselves.

import { TURNSTILE_SECRET_KEY } from "@/lib/config";

// The Google Sheet write: each try gives up after this long, and a failed
// try is repeated once after a short pause before falling back to email.
const SHEET_TIMEOUT_MS = 10000;
const SHEET_RETRY_DELAY_MS = 1500;

/** Posts a row to the Apps Script web app. Throws if it isn't saved. */
export async function postToSheet(webhookUrl: string, payload: Record<string, unknown>): Promise<void> {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SHEET_TIMEOUT_MS),
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
}

/** postToSheet, tried twice. Returns null when saved, or the last error. */
export async function saveToSheet(webhookUrl: string, payload: Record<string, unknown>): Promise<Error | null> {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await postToSheet(webhookUrl, payload);
      return null;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[sheets] Sheet write failed (attempt ${attempt}/2):`, lastError);
      if (attempt === 1) await new Promise((resolve) => setTimeout(resolve, SHEET_RETRY_DELAY_MS));
    }
  }
  return lastError;
}

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
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

