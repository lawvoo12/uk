// Date helpers for sitemaps and schema.org dates. Content dates are written
// as text ("18 October 2026") in the data files; these turn them into real
// dates without the build machine's time zone shifting the day.

/** "18 October 2026" or "2026-10-18" → midnight UTC on that day, or undefined. */
export function parseContentDate(text: string | undefined): Date | undefined {
  if (!text) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return new Date(`${text}T00:00:00Z`);
  const d = new Date(text);
  return Number.isNaN(d.getTime()) ? undefined : new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

/** "18 October 2026" → "2026-10-18", or undefined. */
export function contentDateIso(text: string | undefined): string | undefined {
  return parseContentDate(text)?.toISOString().slice(0, 10);
}

/** The latest of some dates (text or Date); undefined values are skipped. */
export function latestDate(...dates: (Date | string | undefined)[]): Date | undefined {
  const times = dates
    .map((d) => (typeof d === "string" ? parseContentDate(d) : d))
    .filter((d): d is Date => Boolean(d))
    .map((d) => d.getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
}
