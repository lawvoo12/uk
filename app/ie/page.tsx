import type { Metadata } from "next";
import { MapPin, ShieldCheck, Users } from "lucide-react";

import { HeroSearch } from "@/components/home/hero-search";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { PopularSearches } from "@/components/home/popular-searches";
import { IE_CITIES } from "@/lib/ie/cities";
import { IE_LAWYERS } from "@/lib/ie/lawyers";
import { IE_LINKS } from "@/lib/ie/content";

export const metadata: Metadata = {
  // "absolute": a layout's title template doesn't apply to the page in its own segment.
  title: { absolute: "Find a Solicitor in Ireland — Compare Firms by Town | Lawvoo Ireland" },
  description:
    "Find solicitors across Ireland — Dublin, Cork, Limerick, Galway and 16 more towns. Family, immigration, employment, property and probate. Free to use, no obligation.",
  alternates: { canonical: "/ie", languages: { "en-GB": "/uk", "en-IE": "/ie" } },
};

export default function IrelandHomePage() {
  const firms = new Set(IE_LAWYERS.map((l) => l.firmName)).size;

  return (
    <main className="bg-[#F8F7F4]">
      <section className="px-4 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-5xl">Find the right solicitor in Ireland</h1>
          <p className="mx-auto mt-4 max-w-xl text-[#5B6472]">
            Compare {firms} solicitor firms in {IE_CITIES.length} Irish towns by area of law, or tell us about your case
            — free, with no obligation.
          </p>
        </div>

        <div className="mt-8">
          <HeroSearch country="ie" />
        </div>

        <dl className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#5B6472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Register</dt>
            <dd>
              Check firms on the{" "}
              <a href={IE_LINKS.lsiRegister} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Law Society register
              </a>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">No account needed</dt>
            <dd>No account needed</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Coverage</dt>
            <dd>{IE_CITIES.length} towns, all four provinces</dd>
          </div>
        </dl>
      </section>

      <PracticeAreaGrid country="ie" />
      <HowItWorks />
      <PopularSearches country="ie" />
    </main>
  );
}
