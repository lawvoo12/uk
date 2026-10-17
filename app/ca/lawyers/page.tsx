import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { CA_PRACTICE_AREAS } from "@/lib/ca/practice-areas";
import { CA_CITIES } from "@/lib/ca/cities";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Browse Lawyers in Canada by Area of Law & City",
  description:
    "Browse Canadian lawyers by practice area and city: immigration, family, personal injury, employment, real estate, and wills and estates lawyers, each checked on a law society directory.",
  alternates: {
    canonical: "/ca/lawyers",
    languages: { "en-GB": "/uk/solicitors", "en-IE": "/ie/solicitors", "en-CA": "/ca/lawyers" },
  },
};

export default function CaLawyersHubPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ca` },
      { "@type": "ListItem", position: 2, name: "Lawyers", item: `${SITE_URL}/ca/lawyers` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Browse lawyers in Canada by area of law &amp; city</h1>
          <p className="mt-3 text-[#5B6472]">
            {CA_PRACTICE_AREAS.length} practice areas across {CA_CITIES.length} Canadian cities. Lawyers in Canada are
            licensed by the law society of the province where they practise, and each law society has a public directory
            where you can check a lawyer&apos;s status.
          </p>
        </div>

        <PracticeAreaGrid country="ca" />

        <div className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="mb-1 text-center font-serif text-2xl text-[#10233D] sm:text-3xl">Browse by city</h2>
          <p className="mx-auto mb-6 max-w-lg text-center text-sm text-[#5B6472]">
            See every lawyer we list in a city, across all practice areas.{" "}
            <Link href="/ca/locations" className="underline underline-offset-2 hover:text-[#10233D]">
              View cities by province
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CA_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/ca/locations/${city.slug}`}
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
