import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { TOP_UK_CITIES } from "@/lib/seo/uk-cities";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";

export const metadata: Metadata = {
  title: "Browse UK Solicitors by Category & City",
  description:
    "Browse regulated UK solicitors by practice area and city. Immigration, family, personal injury, employment, property, and wills & probate solicitors across the UK's major cities.",
  alternates: { canonical: "/uk/solicitors" },
};

// Cities link to their location page (/uk/locations/[city]), which lists
// every solicitor in that city across all practice areas.

export default function SolicitorsHubPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Browse UK Solicitors by Category & City</h1>
          <p className="mt-3 text-[#5B6472]">
            {PRACTICE_AREAS.length} practice areas across {TOP_UK_CITIES.length} UK cities — every firm listed has
            been checked on its regulator&apos;s register (SRA, Law Society of Scotland or Law Society of NI).
          </p>
        </div>

        <PracticeAreaGrid />

        <div className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="mb-1 text-center font-serif text-2xl text-[#10233D] sm:text-3xl">Browse by city</h2>
          <p className="mx-auto mb-6 max-w-lg text-center text-sm text-[#5B6472]">
            See every solicitor we list in a city, across all practice areas.{" "}
            <Link href="/uk/locations" className="underline underline-offset-2 hover:text-[#10233D]">
              View locations by region
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {TOP_UK_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/uk/locations/${city.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD8D0] bg-white px-3.5 py-1.5 text-sm text-[#5B6472] transition-colors hover:border-[#B8A488] hover:text-[#10233D]"
              >
                <MapPin className="h-3.5 w-3.5 text-[#B8863B]" strokeWidth={1.75} />
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
