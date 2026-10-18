import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

import { US_CITIES, getUsCitiesGroupedByState } from "@/lib/us/cities";
import { getLawyerCountsByCity } from "@/lib/data/lawyers";
import { regionSlug } from "@/lib/seo/regions";
import { SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

export const metadata: Metadata = {
  title: `Lawyers by Location in the US | ${US_CITIES.length} Cities`,
  description: `Browse lawyers in ${US_CITIES.length} US cities — named lawyers, office addresses and practice areas, grouped by state, with local court information.`,
  alternates: { canonical: "/us/locations" },
};

export default function UsLocationsIndexPage() {
  const groups = getUsCitiesGroupedByState();
  const counts = getLawyerCountsByCity("us");
  const totalListings = Object.values(counts).reduce((a, b) => a + b, 0);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/us` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/us/locations` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-6xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/us" }, { label: "Locations" }]} />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Find a lawyer by location in the US</h1>
          <p className="mt-3 text-[#5B6472]">
            {totalListings > 0 ? `${totalListings} lawyers in ${US_CITIES.length} US cities.` : `${US_CITIES.length} US cities.`} Pick your city to see every lawyer we list
            there, their office address, and local information on courts, divorce and probate.
          </p>
        </div>

        {groups.length > 1 && (
          <nav aria-label="Jump to state" className="mt-6 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a
                key={group.state}
                href={`#${regionSlug(group.stateName)}`}
                className="rounded-full border border-[#DCD8D0] bg-white px-3 py-1 text-xs text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
              >
                {group.stateName}
              </a>
            ))}
          </nav>
        )}

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section
              key={group.state}
              id={regionSlug(group.stateName)}
              aria-labelledby={`${regionSlug(group.stateName)}-h`}
              className="scroll-mt-6"
            >
              <h2 id={`${regionSlug(group.stateName)}-h`} className="font-serif text-2xl text-[#10233D]">
                {group.stateName}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.cities.map((city) => {
                  const count = counts[city.slug] ?? 0;
                  return (
                    <li key={city.slug}>
                      <Link
                        href={`/us/locations/${city.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#DCD8D0] bg-white px-4 py-3 transition-colors hover:border-[#B8A488]"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                          <span className="font-medium text-[#10233D]">{city.name}</span>
                          <span className="text-xs text-[#A8A398]">{city.state}</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#5B6472]">
                          {count > 0 ? `${count} ${count === 1 ? "lawyer" : "lawyers"}` : "Coming soon"}
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
