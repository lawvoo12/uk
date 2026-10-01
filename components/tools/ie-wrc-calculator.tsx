"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { daysBetween, formatIeDate, labourCourtDeadline, parseDate, wrcDeadlines } from "@/lib/ie/wrc-deadline";

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

export function IeWrcCalculator() {
  const [incident, setIncident] = useState("");
  const [decision, setDecision] = useState("");
  // "Today" is only known in the browser (the page itself is static).
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(todayUtc()), []);

  const incidentDate = parseDate(incident);
  const decisionDate = parseDate(decision);
  const deadlines = useMemo(() => (incidentDate ? wrcDeadlines(incidentDate) : null), [incidentDate]);
  const appeal = useMemo(() => (decisionDate ? labourCourtDeadline(decisionDate) : null), [decisionDate]);

  return (
    <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label htmlFor="wrc-date" className="text-sm font-medium text-[#10233D]">
              Date of the problem
            </label>
            <p className="text-xs text-[#5B6472]">
              For example the date you were dismissed, or the date of the breach you&apos;re complaining about
            </p>
            <input
              id="wrc-date"
              type="date"
              value={incident}
              onChange={(e) => setIncident(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3 text-[#10233D] outline-none focus:border-[#B8863B]"
            />
          </div>
          <div className="rounded-xl border border-[#DCD8D0] p-4">
            <label htmlFor="wrc-decision" className="text-sm font-medium text-[#10233D]">
              Already have a WRC decision? (optional)
            </label>
            <p className="text-xs text-[#5B6472]">Date of the adjudication officer&apos;s decision, to see the appeal deadline</p>
            <input
              id="wrc-decision"
              type="date"
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3 text-[#10233D] outline-none focus:border-[#B8863B]"
            />
          </div>
        </div>

        <div aria-live="polite" className="rounded-xl bg-[#10233D] p-5 text-white sm:p-6">
          {!deadlines && !appeal && <p className="text-sm text-white/70">Enter a date to see your deadlines.</p>}
          {deadlines && (
            <>
              <p className="text-sm text-white/70">Make your WRC complaint by</p>
              <p className="mt-1 font-serif text-2xl sm:text-3xl" data-testid="wrc-six">
                {formatIeDate(deadlines.sixMonths)}
              </p>
              <DaysLeft date={deadlines.sixMonths} today={today} />
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm text-white/70">Only with &lsquo;reasonable cause&rsquo; for the delay, the latest is</p>
                <p className="mt-1 text-lg" data-testid="wrc-twelve">
                  {formatIeDate(deadlines.twelveMonths)}
                </p>
                <DaysLeft date={deadlines.twelveMonths} today={today} />
              </div>
            </>
          )}
          {appeal && (
            <div className={deadlines ? "mt-5 border-t border-white/10 pt-4" : ""}>
              <p className="text-sm text-white/70">Appeal to the Labour Court by</p>
              <p className="mt-1 text-lg" data-testid="wrc-appeal">
                {formatIeDate(appeal)}
              </p>
              <DaysLeft date={appeal} today={today} />
            </div>
          )}
          <ul className="mt-5 space-y-1.5 text-xs text-white/75">
            <li>• We show the day before each limit ends, to be on the safe side.</li>
            <li>• An extension to 12 months is not automatic — the WRC decides whether your reason is good enough.</li>
            <li>• Some claims have different rules. If a deadline is close, get advice now.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] p-5">
        <p className="font-medium text-[#10233D]">Thinking about a WRC complaint?</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/ie/guides/how-to-make-a-wrc-complaint" className="inline-flex items-center gap-1 text-[#B8863B] hover:underline">
            How to make a WRC complaint <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <Link href="/ie/solicitors/employment" className="inline-flex items-center gap-1 text-[#B8863B] hover:underline">
            Employment solicitors <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </div>
  );
}
