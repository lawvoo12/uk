import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { NZ_PRACTICE_AREAS } from "@/lib/nz/practice-areas";
import { NZ_CITIES } from "@/lib/nz/cities";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Browse Lawyers in New Zealand by Area of Law & City",
  description:
    "Browse New Zealand lawyers by practice area and city: immigration, family, ACC and injury, employment, property, and wills and estates lawyers, each checked on the NZ Law Society register.",
  alternates: { canonical: "/nz/lawyers" },
};

export default function NzLawyersHubPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/nz` },
      { "@type": "ListItem", position: 2, name: "Lawyers", item: `${SITE_URL}/nz/lawyers` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Browse lawyers in New Zealand by area of law &amp; city</h1>
          <p className="mt-3 text-[#5B6472]">
            {NZ_PRACTICE_AREAS.length} practice areas across {NZ_CITIES.length} New Zealand cities. Lawyers in New Zealand
            must hold a practising certificate from the New Zealand Law Society, and its public register shows whether a
            lawyer currently holds one.
          </p>
        </div>

        <PracticeAreaGrid country="nz" />

        <div className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="mb-1 text-center font-serif text-2xl text-[#10233D] sm:text-3xl">Browse by city</h2>
          <p className="mx-auto mb-6 max-w-lg text-center text-sm text-[#5B6472]">
            See every lawyer we list in a city, across all practice areas.{" "}
            <Link href="/nz/locations" className="underline underline-offset-2 hover:text-[#10233D]">
              View cities by island
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {NZ_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/nz/locations/${city.slug}`}
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
