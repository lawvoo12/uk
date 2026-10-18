import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

import { CA_CITIES, getCaCitiesGroupedByProvince } from "@/lib/ca/cities";
import { getLawyerCountsByCity } from "@/lib/data/lawyers";
import { regionSlug } from "@/lib/seo/regions";
import { SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

export const metadata: Metadata = {
  title: `Lawyers by Location in Canada | ${CA_CITIES.length} Cities`,
  description: `Browse lawyers in ${CA_CITIES.length} Canadian cities — named lawyers, office addresses and practice areas, grouped by province, with local court information.`,
  alternates: {
    canonical: "/ca/locations",
    languages: { "en-GB": "/uk/locations", "en-IE": "/ie/locations", "en-CA": "/ca/locations", "en-US": "/us/locations" },
  },
};

export default function CaLocationsIndexPage() {
  const groups = getCaCitiesGroupedByProvince();
  const counts = getLawyerCountsByCity("ca");
  const totalListings = Object.values(counts).reduce((a, b) => a + b, 0);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ca` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/ca/locations` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-6xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/ca" }, { label: "Locations" }]} />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Find a lawyer by location in Canada</h1>
          <p className="mt-3 text-[#5B6472]">
            {totalListings} lawyers in {CA_CITIES.length} Canadian cities. Pick your city to see every lawyer we list
            there, their office address, and local information on courts, family cases and probate.
          </p>
        </div>

        {groups.length > 1 && (
          <nav aria-label="Jump to province" className="mt-6 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a
                key={group.province}
                href={`#${regionSlug(group.provinceName)}`}
                className="rounded-full border border-[#DCD8D0] bg-white px-3 py-1 text-xs text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
              >
                {group.provinceName}
              </a>
            ))}
          </nav>
        )}

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section
              key={group.province}
              id={regionSlug(group.provinceName)}
              aria-labelledby={`${regionSlug(group.provinceName)}-h`}
              className="scroll-mt-6"
            >
              <h2 id={`${regionSlug(group.provinceName)}-h`} className="font-serif text-2xl text-[#10233D]">
                {group.provinceName}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.cities.map((city) => {
                  const count = counts[city.slug] ?? 0;
                  return (
                    <li key={city.slug}>
                      <Link
                        href={`/ca/locations/${city.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#DCD8D0] bg-white px-4 py-3 transition-colors hover:border-[#B8A488]"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                          <span className="font-medium text-[#10233D]">{city.name}</span>
                          <span className="text-xs text-[#A8A398]">{city.province}</span>
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
