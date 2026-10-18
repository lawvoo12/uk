import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { US_PRACTICE_AREAS } from "@/lib/us/practice-areas";
import { US_CITIES } from "@/lib/us/cities";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Browse Lawyers in the US by Area of Law & City",
  description:
    "Browse US lawyers by practice area and city: immigration, family, personal injury, employment, real estate, and estate planning and probate lawyers, each checked on a state bar directory.",
  alternates: { canonical: "/us/lawyers" },
};

export default function CaLawyersHubPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/us` },
      { "@type": "ListItem", position: 2, name: "Lawyers", item: `${SITE_URL}/us/lawyers` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Browse lawyers in the US by area of law &amp; city</h1>
          <p className="mt-3 text-[#5B6472]">
            {US_PRACTICE_AREAS.length} practice areas across {US_CITIES.length} US cities. Lawyers in the US are licensed
            state by state, and each state bar has a public directory where you can check a lawyer&apos;s status.
          </p>
        </div>

        <PracticeAreaGrid country="us" />

        <div className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="mb-1 text-center font-serif text-2xl text-[#10233D] sm:text-3xl">Browse by city</h2>
          <p className="mx-auto mb-6 max-w-lg text-center text-sm text-[#5B6472]">
            See every lawyer we list in a city, across all practice areas.{" "}
            <Link href="/us/locations" className="underline underline-offset-2 hover:text-[#10233D]">
              View cities by state
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {US_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/us/locations/${city.slug}`}
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
