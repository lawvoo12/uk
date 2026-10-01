import type { Metadata } from "next";
import { ShieldCheck, Star, Users } from "lucide-react";

import { HeroSearch } from "@/components/home/hero-search";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { PopularSearches } from "@/components/home/popular-searches";

export const metadata: Metadata = {
  title: "Compare Regulated Solicitors Across the UK",
  description:
    "Find and compare verified UK solicitors by practice area and location. Free to search, no obligation — tell us about your case and we'll be in touch.",
  alternates: { canonical: "/uk", languages: { "en-GB": "/uk", "en-IE": "/ie" } },
};

// This is the marketing homepage for the /uk zone — the root of this app
// once it's mounted at lawvoo.com/uk/* (see README's "Multi-zone deploy"
// section). The "Browse by category & city" hub used to live here; it's
// now at /uk/solicitors (app/uk/solicitors/page.tsx) so this route can be
// the actual front door instead of a directory-listing page.
export default function UkHomePage() {
  return (
    <main className="bg-[#F8F7F4]">
      <section className="px-4 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-5xl">
            Find the right UK solicitor for your case
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[#5B6472]">
            Compare regulated solicitors by practice area and location, or tell us about your case and
            we&apos;ll be in touch — free, with no obligation.
          </p>
        </div>

        <div className="mt-8">
          <HeroSearch />
        </div>

        <dl className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#5B6472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Verification</dt>
            <dd>Firms checked on the regulator&apos;s register</dd>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">No account needed</dt>
            <dd>No account needed</dd>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-[#B8863B] text-[#B8863B]" />
            <dt className="sr-only">Cost</dt>
            <dd>Free, no obligation</dd>
          </div>
        </dl>
      </section>

      <PracticeAreaGrid />
      <HowItWorks />
      <PopularSearches />
    </main>
  );
}
