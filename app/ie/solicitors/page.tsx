import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { IE_CITIES } from "@/lib/ie/cities";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Browse Solicitors in Ireland by Area of Law & Town",
  description:
    "Browse Irish solicitors by practice area and town: immigration, family, personal injury, employment, property and wills & probate solicitors in 20 cities and towns.",
  alternates: { canonical: "/ie/solicitors", languages: { "en-GB": "/uk/solicitors", "en-IE": "/ie/solicitors" } },
};

export default function IeSolicitorsHubPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
      { "@type": "ListItem", position: 2, name: "Solicitors", item: `${SITE_URL}/ie/solicitors` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Browse solicitors in Ireland by area of law &amp; town</h1>
          <p className="mt-3 text-[#5B6472]">
            {PRACTICE_AREAS.length} practice areas across {IE_CITIES.length} Irish cities and towns. Solicitors in Ireland
            are on the Roll kept by the Law Society of Ireland, and complaints about them go to the Legal Services
            Regulatory Authority (LSRA).
          </p>
        </div>

        <PracticeAreaGrid country="ie" />

        <div className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="mb-1 text-center font-serif text-2xl text-[#10233D] sm:text-3xl">Browse by town</h2>
          <p className="mx-auto mb-6 max-w-lg text-center text-sm text-[#5B6472]">
            See every solicitor we list in a town, across all practice areas.{" "}
            <Link href="/ie/locations" className="underline underline-offset-2 hover:text-[#10233D]">
              View towns by province
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {IE_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/ie/locations/${city.slug}`}
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
