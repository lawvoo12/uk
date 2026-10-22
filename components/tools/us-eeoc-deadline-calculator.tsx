"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  EEOC_KNOWN_STATES,
  addDays,
  daysBetween,
  eeocDeadline,
  formatUsDate,
  parseIsoDate,
  type EeocDeadline,
} from "@/lib/us/eeoc-deadline";

type Where = "AL" | "other";
type Agency = "yes" | "no" | "unsure";

function todayUtc() {
  const n = new Date();
  return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
}

function DaysLeft({ date, today }: { date: Date; today: Date | null }) {
  if (!today) return null;
  const d = daysBetween(today, date);
  return (
    <span className={`text-xs ${d < 0 ? "text-red-300" : d <= 30 ? "text-amber-200" : "text-white/60"}`}>
      {d < 0 ? `passed ${-d} day${d === -1 ? "" : "s"} ago` : d === 0 ? "today" : `${d} day${d === 1 ? "" : "s"} left`}
    </span>
  );
}

function Choice<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-2 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            value === o.value ? "border-[#10233D] bg-[#10233D] text-white" : "border-[#DCD8D0] bg-white text-[#10233D] hover:border-[#B8A488]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Result({ label, d, today, big }: { label: string; d: EeocDeadline; today: Date | null; big?: boolean }) {
  return (
    <div>
      <p className="text-sm text-white/70">{label}</p>
      <p className={big ? "mt-1 font-serif text-2xl sm:text-3xl" : "mt-1 text-lg"} data-testid={`eeoc-${d.days}`}>
        {formatUsDate(d.fileBy)}
      </p>
      <DaysLeft date={d.fileBy} today={today} />
      {d.movedBecause && (
        <p className="mt-1 text-xs text-white/60">
          Day {d.days} ({formatUsDate(d.limitDay)}) {d.movedBecause.startsWith("a ") ? "falls on a weekend" : `is a federal holiday (${d.movedBecause})`},
          so the deadline moves to the next business day.
        </p>
      )}
    </div>
  );
}

export function UsEeocDeadlineCalculator() {
  const [event, setEvent] = useState("");
  const [where, setWhere] = useState<Where>("AL");
  const [agency, setAgency] = useState<Agency>("unsure");
  const [age, setAge] = useState(false);
  const [federal, setFederal] = useState(false);
  // "Today" is only known in the browser (the page itself is static).
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(todayUtc()), []);

  const eventDate = parseIsoDate(event);
  const d180 = useMemo(() => (eventDate ? eeocDeadline(eventDate, 180) : null), [eventDate]);
  const d300 = useMemo(() => (eventDate ? eeocDeadline(eventDate, 300) : null), [eventDate]);
  const known = where === "AL" ? EEOC_KNOWN_STATES.AL : null;

  return (
    <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label htmlFor="eeoc-date" className="text-sm font-medium text-[#10233D]">
              Date of the discrimination
            </label>
            <p className="text-xs text-[#5B6472]">
              For ongoing harassment, use the date of the last incident. For several separate events, check each date.
            </p>
            <input
              id="eeoc-date"
              type="date"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3 text-[#10233D] outline-none focus:border-[#B8863B]"
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-[#10233D]">
            <input type="checkbox" checked={federal} onChange={(e) => setFederal(e.target.checked)} className="mt-1" />
            <span>I work for (or applied to) a federal government agency</span>
          </label>

          {!federal && (
            <>
              <div>
                <p className="text-sm font-medium text-[#10233D]">Where did it happen?</p>
                <Choice
                  name="Where did it happen?"
                  value={where}
                  onChange={setWhere}
                  options={[
                    { value: "AL", label: "Alabama" },
                    { value: "other", label: "Another state" },
                  ]}
                />
              </div>

              {where === "other" && (
                <>
                  <label className="flex items-start gap-2 text-sm text-[#10233D]">
                    <input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)} className="mt-1" />
                    <span>It&apos;s about age discrimination</span>
                  </label>
                  <div>
                    <p className="text-sm font-medium text-[#10233D]">
                      {age
                        ? "Does your state (not just your city or county) have a law and an agency against age discrimination at work?"
                        : "Does a state or local agency enforce a law against this kind of discrimination where you work?"}
                    </p>
                    <Choice
                      name="State or local agency"
                      value={agency}
                      onChange={setAgency}
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                        { value: "unsure", label: "Not sure" },
                      ]}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div aria-live="polite" className="rounded-xl bg-[#10233D] p-5 text-white sm:p-6">
          {!eventDate && <p className="text-sm text-white/70">Enter a date to see your deadline.</p>}

          {eventDate && federal && (
            <>
              <p className="text-sm text-white/70">Contact your agency&apos;s EEO Counselor within 45 days — by</p>
              <p className="mt-1 font-serif text-2xl sm:text-3xl" data-testid="eeoc-45">
                {formatUsDate(addDays(eventDate, 45))}
              </p>
              <DaysLeft date={addDays(eventDate, 45)} today={today} />
              <p className="mt-4 text-xs text-white/75">
                Federal employees and applicants use a different process from the EEOC charge described on this page.
              </p>
            </>
          )}

          {eventDate && !federal && d180 && d300 && (
            <>
              {known ? (
                <Result label={`File your EEOC charge by (${known.name}: ${known.days} days)`} d={d180} today={today} big />
              ) : agency === "no" ? (
                <Result label="File your EEOC charge by (180 days)" d={d180} today={today} big />
              ) : agency === "yes" ? (
                <Result label="File your EEOC charge by (300 days)" d={d300} today={today} big />
              ) : (
                <>
                  <Result label="To be safe, file your EEOC charge by (180 days)" d={d180} today={today} big />
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <Result label="Only if a state or local agency covers your claim (300 days)" d={d300} today={today} />
                  </div>
                </>
              )}
            </>
          )}

          <ul className="mt-5 space-y-1.5 text-xs text-white/75">
            <li>• Weekends and holidays count. A deadline on a weekend or federal holiday moves to the next business day.</li>
            <li>• Equal Pay Act claims have their own limit: 2 years from the last unequal paycheck (3 if willful).</li>
            <li>• Don&apos;t wait for the last day — the EEOC can tell you whether you still have time.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] p-5">
        <p className="font-medium text-[#10233D]">Thinking about a discrimination charge?</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/us/guides/how-to-file-an-eeoc-discrimination-charge" className="inline-flex items-center gap-1 text-[#B8863B] hover:underline">
            How to file an EEOC charge <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <Link href="/us/lawyers/employment" className="inline-flex items-center gap-1 text-[#B8863B] hover:underline">
            Employment lawyers <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </div>
  );
}
