import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

import { TOP_UK_CITIES } from "@/lib/seo/uk-cities";
import { getCitiesGroupedByRegion, regionSlug } from "@/lib/seo/regions";
import { getLawyerCountsByCity } from "@/lib/data/lawyers";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

export const metadata: Metadata = {
  title: "Find Solicitors by Location | UK Cities",
  description:
    "Browse checked UK solicitors by location — every city we cover across England, Wales, Scotland and Northern Ireland, with named solicitors, office addresses and practice areas.",
  alternates: { canonical: "/uk/locations", languages: { "en-GB": "/uk/locations", "en-IE": "/ie/locations" } },
};

export default function LocationsIndexPage() {
  const groups = getCitiesGroupedByRegion();
  const counts = getLawyerCountsByCity();
  const totalListings = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/uk" }, { label: "Locations" }]} />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Find a solicitor by location</h1>
          <p className="mt-3 text-[#5B6472]">
            {totalListings} checked solicitors across {TOP_UK_CITIES.length} UK cities. Pick your city to see every
            solicitor we list there, their office address and the areas of law their firm covers.
          </p>
        </div>

        {/* Region jump links */}
        <nav aria-label="Jump to region" className="mt-6 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.region}
              href={`#${regionSlug(group.region)}`}
              className="rounded-full border border-[#DCD8D0] bg-white px-3 py-1 text-xs text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
            >
              {group.region}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section key={group.region} id={regionSlug(group.region)} aria-labelledby={`${regionSlug(group.region)}-h`} className="scroll-mt-6">
              <h2 id={`${regionSlug(group.region)}-h`} className="font-serif text-2xl text-[#10233D]">
                {group.region}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.cities.map((city) => {
                  const count = counts[city.slug] ?? 0;
                  return (
                    <li key={city.slug}>
                      <Link
                        href={`/uk/locations/${city.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#DCD8D0] bg-white px-4 py-3 transition-colors hover:border-[#B8A488]"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                          <span className="font-medium text-[#10233D]">{city.name}</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#5B6472]">
                          {count > 0 ? `${count} ${count === 1 ? "solicitor" : "solicitors"}` : "Coming soon"}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
