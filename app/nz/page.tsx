import type { Metadata } from "next";
import { MapPin, ShieldCheck, Users } from "lucide-react";

import { HeroSearch } from "@/components/home/hero-search";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { PopularSearches } from "@/components/home/popular-searches";
import { NzHowItWorks } from "@/components/nz/how-it-works";
import { NZ_CITIES } from "@/lib/nz/cities";
import { NZ_LAWYERS } from "@/lib/nz/lawyers";
import { NZ_LEADS_ENABLED } from "@/lib/config";

const cityNames = NZ_CITIES.slice(0, 4)
  .map((c) => c.name)
  .join(", ");

// No hreflang links to the other countries until the /nz section is live.
export const metadata: Metadata = {
  // "absolute": a layout's title template doesn't apply to the page in its own segment.
  title: { absolute: "Find a Lawyer in New Zealand — Compare Law Firms by City | Lawvoo New Zealand" },
  description: `Find lawyers in New Zealand — ${cityNames} and more. Immigration, family, ACC and injury, employment, property, and wills and estates. Every lawyer checked on the NZ Law Society register. Free to use.`,
  alternates: { canonical: "/nz" },
};

export default function NewZealandHomePage() {
  const firms = new Set(NZ_LAWYERS.map((l) => l.firmName)).size;

  return (
    <main className="bg-[#F8F7F4]">
      <section className="px-4 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-5xl">Find the right lawyer in New Zealand</h1>
          <p className="mx-auto mt-4 max-w-xl text-[#5B6472]">
            Compare {firms} law firms in {NZ_CITIES.length} New Zealand cities by area of law
            {NZ_LEADS_ENABLED ? ", or tell us about your case — free, with no obligation." : " and contact them directly — free to use."}
          </p>
        </div>

        <div className="mt-8">
          <HeroSearch country="nz" />
        </div>

        <dl className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#5B6472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Register check</dt>
            <dd>Checked on the NZ Law Society register</dd>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">No account needed</dt>
            <dd>No account needed</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Coverage</dt>
            <dd>{NZ_CITIES.length} cities on the North and South Islands</dd>
          </div>
        </dl>
      </section>

      <PracticeAreaGrid country="nz" />
      <NzHowItWorks />
      <PopularSearches country="nz" />
    </main>
  );
}
