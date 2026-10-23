import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { UsToolPage } from "@/components/us/tool-page";
import { UsEeocDeadlineCalculator } from "@/components/tools/us-eeoc-deadline-calculator";
import { getLawyersByCategory } from "@/lib/data/lawyers";
import { US_CITIES } from "@/lib/us/cities";
import { EEOC_CHECKED, EEOC_SOURCES } from "@/lib/us/eeoc-deadline";

const PATH = "/us/tools/eeoc-deadline-calculator";
const NAME = "EEOC Deadline Calculator";

// Every rule on this page is from the sources in lib/us/eeoc-deadline.ts.
export const metadata: Metadata = {
  title: "EEOC Deadline Calculator: 180 or 300 Days to File a Charge",
  description:
    "Work out the last day to file a job discrimination charge with the EEOC — 180 calendar days, or 300 where a state or local agency covers your claim. Weekends and federal holidays handled. Official sources linked. Free.",
  alternates: { canonical: PATH },
};

const FAQS = [
  {
    question: "How long do I have to file an EEOC charge?",
    answer:
      "In general, 180 calendar days from the day the discrimination took place. The deadline is extended to 300 calendar days if a state or local agency enforces a law that prohibits employment discrimination on the same basis.",
  },
  {
    question: "Is the deadline 180 or 300 days in Alabama?",
    answer:
      "180 days. The EEOC's Birmingham District Office says that in Alabama an individual has 180 days from the date of alleged harm to file a charge — including age discrimination charges.",
  },
  {
    question: "Is the deadline 180 or 300 days in Mississippi?",
    answer:
      "180 days. The same EEOC page says that in Mississippi an individual has 180 days from the date of alleged harm to file a charge.",
  },
  {
    question: "What if the deadline falls on a weekend or holiday?",
    answer:
      "Weekends and holidays count towards the 180 or 300 days, but if the last day falls on a weekend or holiday, you have until the next business day.",
  },
  {
    question: "What date do I count from for harassment?",
    answer:
      "For ongoing harassment, you must file within 180 or 300 days of the last incident of harassment. If there were several separate discriminatory events, the deadline usually applies to each one.",
  },
  {
    question: "Is it different for age discrimination?",
    answer:
      "Yes, slightly. For age discrimination, the deadline is only extended to 300 days if there is a state law and a state agency against age discrimination. It is not extended if only a local law prohibits age discrimination.",
  },
  {
    question: "I'm a federal employee. Does this apply to me?",
    answer:
      "No. Federal employees and job applicants have a different process: you generally must contact an EEO Counselor at your agency within 45 days.",
  },
  {
    question: "What about unequal pay?",
    answer:
      "Under the Equal Pay Act you can go straight to court without filing an EEOC charge. The deadline is two years from the last discriminatory paycheck, or three years if the discrimination was willful.",
  },
];

export default function EeocDeadlineCalculatorPage() {
  const counts: Record<string, number> = {};
  for (const l of getLawyersByCategory("employment", "us")) counts[l.citySlug] = (counts[l.citySlug] ?? 0) + 1;
  const alabamaCities = US_CITIES.filter((c) => c.state === "AL");

  return (
    <UsToolPage
      path={PATH}
      name={NAME}
      heading="EEOC deadline calculator"
      intro="Enter the date of the discrimination to see the last day to file a charge with the U.S. Equal Employment Opportunity Commission (EEOC)."
      checked={EEOC_CHECKED}
      sources={[EEOC_SOURCES.timeLimits, EEOC_SOURCES.birmingham]}
      faqs={FAQS}
      applicationCategory="UtilitiesApplication"
      disclaimer="This calculator gives an estimate based on the EEOC's general time limits. Some claims and situations have different rules, and it isn't legal advice. If your deadline is close, contact the EEOC or an employment lawyer now."
      extra={
        <section aria-labelledby="emp-lawyers-h" className="mt-12 rounded-2xl border border-[#DCD8D0] bg-white p-6">
          <h2 id="emp-lawyers-h" className="font-serif text-xl text-[#10233D]">
            Employment lawyers in Alabama
          </h2>
          <p className="mt-1 text-sm text-[#5B6472]">
            An employment lawyer can check your deadline and help with the charge.{" "}
            <Link href="/us/lawyers/employment" className="underline underline-offset-2 hover:text-[#10233D]">
              All employment lawyers
            </Link>
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {alabamaCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/us/lawyers/employment/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD8D0] bg-white px-3.5 py-1.5 text-sm text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#B8863B]" strokeWidth={1.75} />
                  {c.name}
                  {(counts[c.slug] ?? 0) > 0 && (
                    <span className="rounded-full bg-[#F8F7F4] px-1.5 text-xs text-[#10233D]">{counts[c.slug]}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      }
    >
      <UsEeocDeadlineCalculator />
    </UsToolPage>
  );
}
