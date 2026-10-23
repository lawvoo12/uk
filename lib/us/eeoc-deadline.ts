// ============================================================================
// EEOC charge-filing deadline. Checked 22 Oct 2026 against:
//  - EEOC, "Time Limits For Filing A Charge" (https://www.eeoc.gov/time-limits-filing-charge):
//    · file "within 180 calendar days from the day the discrimination took place";
//    · extended to 300 calendar days if a state or local agency enforces a law
//      prohibiting employment discrimination on the same basis;
//    · for age discrimination, extended only by a STATE law and agency — not if
//      only a local law prohibits age discrimination;
//    · weekends and holidays count, but a deadline on a weekend or holiday
//      moves to the next business day;
//    · ongoing harassment: count from the last incident; several separate
//      events: the deadline usually applies to each one;
//    · federal employees and applicants: contact an agency EEO Counselor
//      within 45 days (a different process);
//    · Equal Pay Act: 2 years from the last discriminatory paycheck (3 if
//      willful) to file a charge or go to court.
//  - EEOC Birmingham District Office, "Timeliness"
//    (https://www.eeoc.gov/field-office/birmingham/timeliness): in Alabama an
//    individual has 180 days from the date of alleged harm; the same page
//    says the same for Mississippi (re-read 23 Oct 2026).
//  - Federal holidays (5 U.S.C. 6103), observed on the Friday before when they
//    fall on a Saturday and the Monday after when they fall on a Sunday (OPM).
//    The 2026 dates below were checked against the US Courts 2026 schedule.
// ============================================================================

export const EEOC_CHECKED = "22 October 2026";

export const EEOC_SOURCES = {
  timeLimits: { label: "EEOC: Time Limits for Filing a Charge", href: "https://www.eeoc.gov/time-limits-filing-charge" },
  birmingham: { label: "EEOC Birmingham District Office: Timeliness", href: "https://www.eeoc.gov/field-office/birmingham/timeliness" },
  howToFile: { label: "EEOC: How to File a Charge", href: "https://www.eeoc.gov/how-file-charge-employment-discrimination" },
};

/** States where we've confirmed the limit on an official EEOC page. */
export const EEOC_KNOWN_STATES: Record<string, { name: string; days: 180 | 300; source: { label: string; href: string } }> = {
  AL: { name: "Alabama", days: 180, source: EEOC_SOURCES.birmingham },
  MS: { name: "Mississippi", days: 180, source: EEOC_SOURCES.birmingham },
};

const DAY = 86_400_000;

/** Parse "YYYY-MM-DD" as a calendar date in UTC. */
export function parseIsoDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return Number.isNaN(d.getTime()) || d.getUTCDate() !== Number(m[3]) ? null : d;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY);
}

function utc(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m, d));
}

/** nth (1-based) weekday (0 = Sunday) of a month; n = -1 for the last one. */
function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  if (n > 0) {
    const first = utc(year, month, 1);
    const offset = (weekday - first.getUTCDay() + 7) % 7;
    return utc(year, month, 1 + offset + (n - 1) * 7);
  }
  const last = utc(year, month + 1, 0);
  const offset = (last.getUTCDay() - weekday + 7) % 7;
  return utc(year, month, last.getUTCDate() - offset);
}

/** A fixed-date holiday moved to its observed weekday. */
function observed(date: Date): Date {
  const dow = date.getUTCDay();
  return dow === 6 ? addDays(date, -1) : dow === 0 ? addDays(date, 1) : date;
}

/** The federal holidays (observed dates) in a year, with names. */
export function federalHolidays(year: number): { date: Date; name: string }[] {
  return [
    { date: observed(utc(year, 0, 1)), name: "New Year's Day" },
    { date: nthWeekday(year, 0, 1, 3), name: "Birthday of Martin Luther King, Jr." },
    { date: nthWeekday(year, 1, 1, 3), name: "Washington's Birthday" },
    { date: nthWeekday(year, 4, 1, -1), name: "Memorial Day" },
    { date: observed(utc(year, 5, 19)), name: "Juneteenth National Independence Day" },
    { date: observed(utc(year, 6, 4)), name: "Independence Day" },
    { date: nthWeekday(year, 8, 1, 1), name: "Labor Day" },
    { date: nthWeekday(year, 9, 1, 2), name: "Columbus Day" },
    { date: observed(utc(year, 10, 11)), name: "Veterans Day" },
    { date: nthWeekday(year, 10, 4, 4), name: "Thanksgiving Day" },
    { date: observed(utc(year, 11, 25)), name: "Christmas Day" },
  ];
}

function holidayOn(date: Date): string | null {
  const y = date.getUTCFullYear();
  // New Year's Day on a Saturday is observed on 31 December of the year before.
  for (const year of [y, y + 1]) {
    const hit = federalHolidays(year).find((h) => h.date.getTime() === date.getTime());
    if (hit) return hit.name;
  }
  return null;
}

export interface EeocDeadline {
  days: 180 | 300;
  /** Day 180 (or 300) counted in calendar days. */
  limitDay: Date;
  /** The date to file by, after moving off a weekend or federal holiday. */
  fileBy: Date;
  /** Why fileBy differs from limitDay, if it does. */
  movedBecause: string | null;
}

/** The last day to file an EEOC charge, `days` calendar days after `event`. */
export function eeocDeadline(event: Date, days: 180 | 300): EeocDeadline {
  const limitDay = addDays(event, days);
  let fileBy = limitDay;
  let movedBecause: string | null = null;
  for (let i = 0; i < 10; i++) {
    const dow = fileBy.getUTCDay();
    const holiday = holidayOn(fileBy);
    if (dow !== 0 && dow !== 6 && !holiday) break;
    if (!movedBecause) movedBecause = holiday ?? (dow === 6 ? "a Saturday" : "a Sunday");
    fileBy = addDays(fileBy, 1);
  }
  return { days, limitDay, fileBy, movedBecause };
}

export function formatUsDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
