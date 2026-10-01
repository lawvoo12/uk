import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

import { IE_CITIES, getIeCitiesGroupedByProvince } from "@/lib/ie/cities";
import { getLawyerCountsByCity } from "@/lib/data/lawyers";
import { regionSlug } from "@/lib/seo/regions";
import { SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

export const metadata: Metadata = {
  title: "Solicitors by Location in Ireland | 20 Towns",
  description:
    "Browse solicitors in 20 Irish cities and towns, from Dublin and Cork to Letterkenny and Castlebar — named solicitors, office addresses and practice areas, grouped by province.",
  alternates: { canonical: "/ie/locations", languages: { "en-GB": "/uk/locations", "en-IE": "/ie/locations" } },
};

export default function IeLocationsIndexPage() {
  const groups = getIeCitiesGroupedByProvince();
  const counts = getLawyerCountsByCity("ie");
  const totalListings = Object.values(counts).reduce((a, b) => a + b, 0);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/ie/locations` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-6xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/ie" }, { label: "Locations" }]} />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Find a solicitor by location in Ireland</h1>
          <p className="mt-3 text-[#5B6472]">
            {totalListings} solicitors in {IE_CITIES.length} Irish cities and towns. Pick your town to see every solicitor
            we list there, their office address, and local information on courts, probate and the WRC.
          </p>
        </div>

        <nav aria-label="Jump to province" className="mt-6 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.province}
              href={`#${regionSlug(group.province)}`}
              className="rounded-full border border-[#DCD8D0] bg-white px-3 py-1 text-xs text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
            >
              {group.province}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section
              key={group.province}
              id={regionSlug(group.province)}
              aria-labelledby={`${regionSlug(group.province)}-h`}
              className="scroll-mt-6"
            >
              <h2 id={`${regionSlug(group.province)}-h`} className="font-serif text-2xl text-[#10233D]">
                {group.province}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.cities.map((city) => {
                  const count = counts[city.slug] ?? 0;
                  return (
                    <li key={city.slug}>
                      <Link
                        href={`/ie/locations/${city.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#DCD8D0] bg-white px-4 py-3 transition-colors hover:border-[#B8A488]"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                          <span className="font-medium text-[#10233D]">{city.name}</span>
                          <span className="text-xs text-[#A8A398]">Co. {city.county}</span>
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
