import type { Metadata } from "next";
import { MapPin, ShieldCheck, Users } from "lucide-react";

import { HeroSearch } from "@/components/home/hero-search";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { PopularSearches } from "@/components/home/popular-searches";
import { CaHowItWorks } from "@/components/ca/how-it-works";
import { CA_CITIES, getCaCitiesGroupedByProvince } from "@/lib/ca/cities";
import { CA_LAWYERS } from "@/lib/ca/lawyers";
import { CA_LEADS_ENABLED } from "@/lib/config";

const cityNames = CA_CITIES.slice(0, 4)
  .map((c) => c.name)
  .join(", ");

export const metadata: Metadata = {
  // "absolute": a layout's title template doesn't apply to the page in its own segment.
  title: { absolute: "Find a Lawyer in Canada — Compare Law Firms by City | Lawvoo Canada" },
  description: `Find lawyers in Canada — ${cityNames} and more. Immigration, family, employment, real estate, and wills and estates. Every lawyer checked on a law society directory. Free to use.`,
  alternates: { canonical: "/ca", languages: { "en-GB": "/uk", "en-IE": "/ie", "en-CA": "/ca" } },
};

export default function CanadaHomePage() {
  const firms = new Set(CA_LAWYERS.map((l) => l.firmName)).size;
  const provinces = getCaCitiesGroupedByProvince();

  return (
    <main className="bg-[#F8F7F4]">
      <section className="px-4 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-5xl">Find the right lawyer in Canada</h1>
          <p className="mx-auto mt-4 max-w-xl text-[#5B6472]">
            Compare {firms} law firms in {CA_CITIES.length} Canadian cities by area of law
            {CA_LEADS_ENABLED ? ", or tell us about your case — free, with no obligation." : " and contact them directly — free to use."}
          </p>
        </div>

        <div className="mt-8">
          <HeroSearch country="ca" />
        </div>

        <dl className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#5B6472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Directory check</dt>
            <dd>Checked on a law society directory</dd>
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
              {CA_CITIES.length} cities in {provinces.length === 1 ? provinces[0].provinceName : `${provinces.length} provinces`}
            </dd>
          </div>
        </dl>
      </section>

      <PracticeAreaGrid country="ca" />
      <CaHowItWorks />
      <PopularSearches country="ca" />
    </main>
  );
}
