// ============================================================================
// Workplace Relations Commission (WRC) time limits.
// Checked 30 Sep 2026 against Citizens Information, "Adjudication of
// employment rights disputes and complaints" (edited 7 Mar 2025):
// https://www.citizensinformation.ie/en/employment/enforcement-and-redress/adjudication-employment-rights-disputes-and-complaints/
//  - complaint within 6 months of the alleged breach;
//  - can be extended by a further 6 months if there was reasonable cause;
//  - appeal to the Labour Court within 42 days of the decision.
// We show the day BEFORE each limit as the "last safe day", to be cautious.
// ============================================================================

export const WRC_CHECKED = "30 September 2026";

/** Parse "YYYY-MM-DD" as a calendar date (no time zone surprises). */
export function parseDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function addMonths(date: Date, months: number): Date {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + months;
  const day = date.getUTCDate();
  // Clamp to the last day of the target month (31 Aug + 6 months → 28/29 Feb).
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(day, last)));
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function wrcDeadlines(incident: Date) {
  return {
    sixMonths: addDays(addMonths(incident, 6), -1),
    twelveMonths: addDays(addMonths(incident, 12), -1),
  };
}

export function labourCourtDeadline(decision: Date) {
  return addDays(decision, 41);
}

export function formatIeDate(date: Date): string {
  return date.toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
