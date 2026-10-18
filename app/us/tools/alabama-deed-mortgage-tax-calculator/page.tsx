import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { UsToolPage } from "@/components/us/tool-page";
import { UsRecordationTaxCalculator } from "@/components/tools/us-recordation-tax-calculator";
import { getLawyersByCategory } from "@/lib/data/lawyers";
import { US_CITIES } from "@/lib/us/cities";
import { AL_RECORDATION_SOURCES, US_RECORDATION_CHECKED } from "@/lib/us/recordation-tax";

const PATH = "/us/tools/alabama-deed-mortgage-tax-calculator";
const NAME = "Alabama Deed & Mortgage Tax Calculator";

export const metadata: Metadata = {
  title: "Alabama Deed Tax & Mortgage Tax Calculator 2026",
  description:
    "Work out Alabama recordation tax on a home purchase: deed tax ($.50 per $500) and mortgage tax ($.15 per $100), including the deduction when the mortgage is recorded with the deed. Official sources linked. Free.",
  alternates: { canonical: PATH },
};

const FAQS = [
  {
    question: "What is recordation tax in Alabama?",
    answer:
      "It is the tax due when documents such as deeds and mortgages are recorded. On a deed it is $.50 for every $500 of value, or part of $500. On a mortgage it is $.15 for every $100 of the debt, or part of $100. Two-thirds goes to the state's General Fund and one-third to the county.",
  },
  {
    question: "Is the mortgage deducted when working out deed tax?",
    answer:
      "When the mortgage is recorded at the same time as the deed, the deed tax is worked out on the part of the sales price above the mortgage — as long as the mortgage is made to a taxable concern and the mortgage tax is collected. Baldwin County's probate office gives the example of a $125,000 sale with a $50,000 mortgage: deed tax is charged on $75,000.",
  },
  {
    question: "What does the calculator leave out?",
    answer:
      "Recording fees (charged per page and per document by the county probate office), other county charges and any exemptions. Those differ by county, so ask the probate office or your closing attorney for the full figure.",
  },
  {
    question: "Where are deeds and mortgages recorded?",
    answer:
      "With the probate office of the county where the property is. The Alabama Department of Revenue publishes a directory of county probate offices with their addresses and phone numbers.",
  },
];

export default function AlabamaRecordationTaxPage() {
  const counts: Record<string, number> = {};
  for (const l of getLawyersByCategory("property", "us")) counts[l.citySlug] = (counts[l.citySlug] ?? 0) + 1;
  const alabamaCities = US_CITIES.filter((c) => c.state === "AL");

  return (
    <UsToolPage
      path={PATH}
      name={NAME}
      heading="Alabama deed tax and mortgage tax calculator"
      intro="Enter the purchase price and any mortgage to see the recordation tax due when the deed and mortgage are recorded in Alabama."
      checked={US_RECORDATION_CHECKED}
      sources={[AL_RECORDATION_SOURCES.revenue, AL_RECORDATION_SOURCES.baldwin]}
      faqs={FAQS}
      disclaimer="This calculator gives an estimate of Alabama recordation tax for buying one home. It doesn't include recording fees, other county charges or exemptions, and it isn't legal or tax advice. Your closing attorney or the county probate office will confirm the exact figure."
      extra={
        <section aria-labelledby="re-lawyers-h" className="mt-12 rounded-2xl border border-[#DCD8D0] bg-white p-6">
          <h2 id="re-lawyers-h" className="font-serif text-xl text-[#10233D]">
            Real estate lawyers in Alabama
          </h2>
          <p className="mt-1 text-sm text-[#5B6472]">
            A closing attorney can confirm the tax and fees on your purchase.{" "}
            <Link href="/us/lawyers/real-estate" className="underline underline-offset-2 hover:text-[#10233D]">
              All real estate lawyers
            </Link>
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {alabamaCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/us/lawyers/real-estate/${c.slug}`}
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
      <UsRecordationTaxCalculator />
    </UsToolPage>
  );
}
