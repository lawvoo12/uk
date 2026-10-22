import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ShieldCheck, Users } from "lucide-react";

import { HeroSearch } from "@/components/home/hero-search";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { PopularSearches } from "@/components/home/popular-searches";
import { UsHowItWorks } from "@/components/us/how-it-works";
import { US_CITIES, getUsCitiesGroupedByState } from "@/lib/us/cities";
import { US_LAWYERS } from "@/lib/us/lawyers";
import { US_LEADS_ENABLED } from "@/lib/config";
import { getUsState } from "@/lib/us/states";

const cityNames = US_CITIES.slice(0, 4)
  .map((c) => c.name)
  .join(", ");

export const metadata: Metadata = {
  // "absolute": a layout's title template doesn't apply to the page in its own segment.
  title: { absolute: "Find a Lawyer in the US — Compare Law Firms by City | Lawvoo US" },
  description: `Find lawyers in ${cityNames} and more. Immigration, family, personal injury, employment, real estate, and estate planning and probate. Every lawyer checked on a state bar directory. Free to use.`,
  alternates: { canonical: "/us", languages: { "en-GB": "/uk", "en-IE": "/ie", "en-CA": "/ca", "en-US": "/us" } },
};

export default function UsHomePage() {
  const firms = new Set(US_LAWYERS.map((l) => l.firmName)).size;
  const states = getUsCitiesGroupedByState();
  const where = states.length === 1 ? states[0].stateName : `${states.length} states`;

  return (
    <main className="bg-[#F8F7F4]">
      <section className="px-4 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-5xl">Find the right lawyer in the US</h1>
          <p className="mx-auto mt-4 max-w-xl text-[#5B6472]">
            {firms > 0
              ? `Compare ${firms} law ${firms === 1 ? "firm" : "firms"} in ${US_CITIES.length} cities in ${where} by area of law`
              : `Browse lawyers by area of law in ${US_CITIES.length} cities in ${where}`}
            {US_LEADS_ENABLED ? ", or tell us about your case — free, with no obligation." : " and contact them directly — free to use."}
          </p>
        </div>

        <div className="mt-8">
          <HeroSearch country="us" />
        </div>

        <dl className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#5B6472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Directory check</dt>
            <dd>Checked on a state bar directory</dd>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">No account needed</dt>
            <dd>No account needed</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Coverage</dt>
            <dd>
              {US_CITIES.length} cities in{" "}
              {states.map((g, i) => (
                <span key={g.state}>
                  {i > 0 ? ", " : ""}
                  <Link href={`/us/${getUsState(g.state).slug}`} className="underline underline-offset-2 hover:text-[#10233D]">
                    {g.stateName}
                  </Link>
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <PracticeAreaGrid country="us" />
      <UsHowItWorks />
      <PopularSearches country="us" />
    </main>
  );
}
