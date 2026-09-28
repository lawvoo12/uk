import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, ExternalLink, Landmark, MapPin, ShieldCheck, Users } from "lucide-react";

import { TOP_UK_CITIES, getCityBySlug } from "@/lib/seo/uk-cities";
import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { getLawyersByCity } from "@/lib/data/lawyers";
import { REGULATORS, regulatedPhrase, regulatorForRegion } from "@/lib/seo/regulators";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerCard } from "@/components/solicitors/lawyer-card";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { FAQSection } from "@/components/solicitors/faq-section";
import { CITY_COURTS, COURT_SERVICE, GOV_COURT_FINDER, JURISDICTION_NOTE } from "@/lib/seo/city-content";
import { getFAQsForLocation } from "@/lib/seo/faq-content";

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return TOP_UK_CITIES.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const lawyers = getLawyersByCity(city.slug);

  const title = `Solicitors in ${city.name} | Family, Injury, Employment & More`;
  const description = `${lawyers.length > 0 ? `${lawyers.length} checked` : "Find"} ${regulatedPhrase(city.region)} solicitors in ${city.name}, ${city.region} — named solicitors, office addresses and practice areas. Free, no-obligation case matching.`;
  const canonicalPath = `/uk/locations/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_GB", type: "website" },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const lawyers = getLawyersByCity(city.slug);
  const regulator = REGULATORS[regulatorForRegion(city.region)];
  const firmCount = new Set(lawyers.map((l) => l.firmName)).size;
  const areaCounts = PRACTICE_AREAS.map((area) => ({
    ...area,
    count: lawyers.filter((l) => l.practiceAreaSlugs.includes(area.slug)).length,
  }));
  const nearby = TOP_UK_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug);
  const regulatorCode = regulatorForRegion(city.region);
  const jurisdiction = JURISDICTION_NOTE[regulatorCode];
  const localCourts = CITY_COURTS[city.slug];
  const courtService = COURT_SERVICE[regulatorCode];
  const faqs = getFAQsForLocation(city.name, city.region, lawyers[0]?.firmName);
  const areaName = (slug: string) => PRACTICE_AREAS.find((a) => a.slug === slug)?.name ?? slug;
  // A short, city-specific summary built from the listings — different on
  // every page, and only states things the data actually supports.
  const summary =
    lawyers.length > 0
      ? lawyers
          .map((l) => {
            const others = l.practiceAreaSlugs.filter((a) => a !== l.primaryPracticeArea).map(areaName);
            return `${l.lawyerName} at ${l.firmName} focuses on ${areaName(l.primaryPracticeArea).toLowerCase()} work${
              others.length ? `, and the firm also covers ${others.join(", ").toLowerCase()}` : ""
            }.`;
          })
          .join(" ")
      : null;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const canonicalUrl = `${SITE_URL}/uk/locations/${city.slug}`;
  // Scottish listings couldn't be checked on the Law Society of Scotland's
  // register automatically, so don't claim they were.
  const checkedSentence =
    regulatorForRegion(city.region) === "LSS"
      ? `Firms here are regulated by the ${regulator.name} — check them on its register before instructing.`
      : `Each firm has been checked on the ${regulator.name} register.`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/uk` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/uk/locations` },
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
            url: `${SITE_URL}/uk/lawyer/${lawyer.id}`,
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
            { label: "Home", href: "/uk" },
            { label: "Locations", href: "/uk/locations" },
            { label: city.name },
          ]}
        />

        <div className="max-w-2xl">
          <p className="flex items-center gap-1.5 text-sm text-[#B8863B]">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            {city.region}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-[#10233D] sm:text-4xl">Solicitors in {city.name}</h1>
          <p className="mt-3 text-[#5B6472]">
            {lawyers.length > 0
              ? `Every solicitor we list in ${city.name}, across all practice areas. ${checkedSentence}`
              : `We haven't listed any solicitors in ${city.name} yet — tell us about your case and we'll reach out to firms covering the area.`}
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
                <dt className="sr-only">Regulator</dt>
                <dd>Regulated by the {regulator.shortName}</dd>
              </div>
            </dl>
          )}
        </div>

        {/* Practice areas in this city */}
        <section aria-labelledby="areas-h" className="mt-8">
          <h2 id="areas-h" className="text-sm font-medium text-[#10233D]">
            Browse by practice area in {city.name}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {areaCounts.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/uk/solicitors/${area.slug}/${city.slug}`}
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
                  <LawyerCard key={lawyer.id} lawyer={lawyer} showPracticeAreas />
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
              {summary && <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{summary}</p>}

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                {jurisdiction.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">{jurisdiction.body}</p>

              {localCourts && (
                <>
                  <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                    <Landmark className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                    Courts and tribunals serving {city.name}
                  </h3>
                  {localCourts.note && <p className="mt-1 text-sm text-[#5B6472]">{localCourts.note}</p>}
                  {localCourts.courts.length > 0 && (
                    <ul className="mt-3 divide-y divide-[#EFECE6] rounded-lg border border-[#DCD8D0]">
                      {localCourts.courts.map((court) => (
                        <li key={court.name} className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          {court.govPath ? (
                            <a
                              href={`${GOV_COURT_FINDER}${court.govPath}`}
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
                  )}
                  <p className="mt-2 text-xs text-[#A8A398]">
                    Court details from{" "}
                    <a href={courtService.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#5B6472]">
                      {courtService.name}
                    </a>
                    . Most cases settle without a hearing — your solicitor will tell you if you need to attend.
                  </p>
                </>
              )}
            </section>

            <FAQSection faqs={faqs} categoryName="" cityName={city.name} heading={`Common questions about solicitors in ${city.name}`} />

            {nearby.length > 0 && (
              <section aria-labelledby="nearby-h" className="mt-12">
                <h2 id="nearby-h" className="font-serif text-xl text-[#10233D]">
                  Other cities in {city.region}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {nearby.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/uk/locations/${c.slug}`}
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
              Listings are provided for information only and do not constitute legal advice or a recommendation.
              Always check a solicitor on the{" "}
              <a
                href={regulator.registerUrl}
                className="underline underline-offset-2 hover:text-[#5B6472]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {regulator.registerLabel}
              </a>{" "}
              before instructing them.{" "}
              <Link href="/uk/locations" className="underline underline-offset-2 hover:text-[#5B6472]">
                Browse all locations
              </Link>
              .
            </p>
          </div>

          <LeadCaptureSidebar categoryName="local" cityName={city.name} mobileFirst={false} />
        </div>
      </div>
    </main>
  );
}
