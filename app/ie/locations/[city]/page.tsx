import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, Building2, ExternalLink, Landmark, MapPin, ScrollText, ShieldCheck, Users } from "lucide-react";

import { IE_CITIES, getIeCityBySlug } from "@/lib/ie/cities";
import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { getLawyersByCity, type LawyerListing } from "@/lib/data/lawyers";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerCard } from "@/components/solicitors/lawyer-card";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { FAQSection } from "@/components/solicitors/faq-section";
import {
  IE_CHECKED_SENTENCE,
  IE_CITY_INFO,
  IE_JURISDICTION_NOTE,
  IE_LINKS,
  getIeLocationFaqs,
} from "@/lib/ie/content";
import { NEAREST_LAW_CENTRE } from "@/lib/ie/free-help";
import { CLAR_ENTRIES } from "@/lib/ie/irish-language";

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return IE_CITIES.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

const areaName = (slug: string) => PRACTICE_AREAS.find((a) => a.slug === slug)?.name ?? slug;

/** A short summary built only from what the listings say — different on every page. */
function summarise(lawyers: LawyerListing[]): string | null {
  if (lawyers.length === 0) return null;
  return lawyers
    .map((l) => {
      if (l.focusNotStated) {
        return `${l.lawyerName} is ${/^[AEIOU]/i.test(l.role) ? "an" : "a"} ${l.role.toLowerCase()} at ${l.firmName}, which covers ${l.practiceAreaSlugs
          .map(areaName)
          .join(", ")
          .toLowerCase()}.`;
      }
      const others = l.practiceAreaSlugs.filter((a) => a !== l.primaryPracticeArea).map(areaName);
      return `${l.lawyerName} at ${l.firmName} focuses on ${areaName(l.primaryPracticeArea).toLowerCase()} work${
        others.length ? `, and the firm also covers ${others.join(", ").toLowerCase()}` : ""
      }.`;
    })
    .join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getIeCityBySlug(citySlug);
  if (!city) return {};
  const lawyers = getLawyersByCity(city.slug, "ie");

  const title = `Solicitors in ${city.name}, Co. ${city.county} | Family, Property, Probate & More`;
  const description = `${lawyers.length > 0 ? `${lawyers.length} solicitors` : "Solicitors"} in ${city.name}, Co. ${city.county} — named solicitors, office addresses and practice areas, plus local courts, probate registry and WRC information.`;
  const canonicalPath = `/ie/locations/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_IE", type: "website" },
  };
}

export default async function IeLocationPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getIeCityBySlug(citySlug);
  if (!city) notFound();

  const lawyers = getLawyersByCity(city.slug, "ie");
  const local = IE_CITY_INFO[city.slug];
  const firmCount = new Set(lawyers.map((l) => l.firmName)).size;
  const areaCounts = PRACTICE_AREAS.map((area) => ({
    ...area,
    count: lawyers.filter((l) => l.practiceAreaSlugs.includes(area.slug)).length,
  }));
  const nearby = IE_CITIES.filter((c) => c.province === city.province && c.slug !== city.slug);
  const faqs = getIeLocationFaqs(city, lawyers[0]?.firmName);
  const summary = summarise(lawyers);
  const canonicalUrl = `${SITE_URL}/ie/locations/${city.slug}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/ie/locations` },
      { "@type": "ListItem", position: 3, name: city.name, item: canonicalUrl },
    ],
  };
  const itemListJsonLd =
    lawyers.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: lawyers.map((lawyer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/ie/lawyer/${lawyer.id}`,
            name: `${lawyer.lawyerName}, ${lawyer.firmName}`,
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/ie" },
            { label: "Locations", href: "/ie/locations" },
            { label: city.name },
          ]}
        />

        <div className="max-w-2xl">
          <p className="flex items-center gap-1.5 text-sm text-[#B8863B]">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            Co. {city.county} · {city.province}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-[#10233D] sm:text-4xl">Solicitors in {city.name}</h1>
          <p className="mt-3 text-[#5B6472]">
            {lawyers.length > 0
              ? `Every solicitor we list in ${city.name}, across all practice areas. ${IE_CHECKED_SENTENCE}`
              : `We haven't listed any solicitors in ${city.name} yet — tell us about your case and we'll look for a firm covering the area.`}
          </p>

          {lawyers.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#10233D]">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                <dt className="sr-only">Solicitors listed</dt>
                <dd>
                  {lawyers.length} {lawyers.length === 1 ? "solicitor" : "solicitors"}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                <dt className="sr-only">Firms</dt>
                <dd>
                  {firmCount} {firmCount === 1 ? "firm" : "firms"}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                <dt className="sr-only">Register</dt>
                <dd>Law Society of Ireland register</dd>
              </div>
            </dl>
          )}
        </div>

        <section aria-labelledby="areas-h" className="mt-8">
          <h2 id="areas-h" className="text-sm font-medium text-[#10233D]">
            Browse by practice area in {city.name}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {areaCounts.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/ie/solicitors/${area.slug}/${city.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#DCD8D0] bg-white px-3.5 py-1.5 text-sm text-[#5B6472] transition-colors hover:border-[#B8A488] hover:text-[#10233D]"
                >
                  {area.name}
                  <span className="rounded-full bg-[#F8F7F4] px-1.5 text-xs text-[#10233D]">{area.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="mb-5 font-serif text-2xl text-[#10233D]">All solicitors in {city.name}</h2>
            {lawyers.length > 0 ? (
              <div className="flex flex-col gap-4">
                {lawyers.map((lawyer) => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} showPracticeAreas country="ie" />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#DCD8D0] bg-white p-8 text-center">
                <p className="font-medium text-[#10233D]">No solicitors listed in {city.name} yet</p>
                <p className="mt-1 text-sm text-[#5B6472]">Use the form to tell us about your case.</p>
              </div>
            )}

            {/* Local information */}
            <section aria-labelledby="local-h" className="mt-12 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
              <h2 id="local-h" className="font-serif text-2xl text-[#10233D]">
                Legal help in {city.name}: what to know
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{local.local}</p>
              {summary && <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{summary}</p>}

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                {IE_JURISDICTION_NOTE.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">{IE_JURISDICTION_NOTE.body}</p>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Landmark className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Courts serving {city.name}
              </h3>
              {local.courtNote && <p className="mt-1 text-sm text-[#5B6472]">{local.courtNote}</p>}
              <ul className="mt-3 divide-y divide-[#EFECE6] rounded-lg border border-[#DCD8D0]">
                {local.courts.map((court) => (
                  <li
                    key={court.name}
                    className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    {court.slug ? (
                      <a
                        href={IE_LINKS.courtOffice(court.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-[#10233D] underline-offset-2 hover:underline"
                      >
                        {court.name}
                        <ExternalLink className="h-3 w-3 text-[#A8A398]" />
                      </a>
                    ) : (
                      <span className="font-medium text-[#10233D]">{court.name}</span>
                    )}
                    <span className="text-xs text-[#5B6472] sm:text-right">{court.use}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <ScrollText className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Probate
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
                Grants of probate for {city.name} are issued by {local.probate}.{" "}
                <a href={IE_LINKS.probateOffices} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Probate offices
                </a>
              </p>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Briefcase className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Employment complaints (WRC)
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
                {local.wrc} Complaints are made online, usually within six months.{" "}
                <a href={IE_LINKS.wrc} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Workplace Relations Commission
                </a>
              </p>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Free legal help nearby
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
                The nearest Legal Aid Board centre for {city.name} is {NEAREST_LAW_CENTRE[city.slug]}. Legal aid is
                means-tested.{" "}
                <Link href="/ie/free-legal-help" className="underline underline-offset-2">
                  More free legal help
                </Link>
                {CLAR_ENTRIES.some((e) => e.citySlug === city.slug) && (
                  <>
                    {" · "}
                    <Link href="/ie/irish-language-solicitors" className="underline underline-offset-2">
                      Solicitors in {city.name} who work through Irish
                    </Link>
                  </>
                )}
              </p>

              <p className="mt-4 text-xs text-[#A8A398]">
                Court details from the{" "}
                <a href={IE_LINKS.courtsOffices} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#5B6472]">
                  Courts Service of Ireland
                </a>
                ; hearing dates and venues are in the{" "}
                <a href={IE_LINKS.legalDiary} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#5B6472]">
                  Legal Diary
                </a>
                . Most cases settle without a hearing — your solicitor will tell you if you need to attend.
              </p>
            </section>

            <FAQSection faqs={faqs} categoryName="" cityName={city.name} heading={`Common questions about solicitors in ${city.name}`} />

            {nearby.length > 0 && (
              <section aria-labelledby="nearby-h" className="mt-12">
                <h2 id="nearby-h" className="font-serif text-xl text-[#10233D]">
                  Other towns in {city.province}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {nearby.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/ie/locations/${c.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD8D0] bg-white px-3.5 py-1.5 text-sm text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
                      >
                        <MapPin className="h-3.5 w-3.5 text-[#B8863B]" strokeWidth={1.75} />
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="mt-10 text-xs leading-relaxed text-[#A8A398]">
              Listings are provided for information only and are not legal advice or a recommendation. Always check a
              solicitor on the{" "}
              <a href={IE_LINKS.lsiRegister} className="underline underline-offset-2 hover:text-[#5B6472]" target="_blank" rel="noopener noreferrer">
                Law Society of Ireland&apos;s Find a Solicitor register
              </a>{" "}
              before instructing them.{" "}
              <Link href="/ie/locations" className="underline underline-offset-2 hover:text-[#5B6472]">
                Browse all locations
              </Link>
              .
            </p>
          </div>

          <LeadCaptureSidebar categoryName="local" cityName={city.name} mobileFirst={false} country="ie" />
        </div>
      </div>
    </main>
  );
}
