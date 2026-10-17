import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, Building2, ExternalLink, Landmark, MapPin, ScrollText, ShieldCheck, Users } from "lucide-react";

import { CA_CITIES, getCaCityBySlug } from "@/lib/ca/cities";
import { getCaProvince } from "@/lib/ca/provinces";
import { CA_PRACTICE_AREAS, getCaArea } from "@/lib/ca/practice-areas";
import { getLawyersByCity, type LawyerListing } from "@/lib/data/lawyers";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerCard } from "@/components/solicitors/lawyer-card";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { FAQSection } from "@/components/solicitors/faq-section";
import { CA_CHECKED_SENTENCE, CA_CITY_INFO, getCaLocationFaqs, getCaProvinceContent } from "@/lib/ca/content";

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return CA_CITIES.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

const areaLower = (slug: string) => getCaArea(slug)?.lower ?? slug;

/** A short summary built only from what the listings say — different on every page. */
function summarise(lawyers: LawyerListing[]): string | null {
  if (lawyers.length === 0) return null;
  return lawyers
    .map((l) => {
      const others = l.practiceAreaSlugs.filter((a) => a !== l.primaryPracticeArea).map(areaLower);
      if (l.focusNotStated) {
        return `${l.lawyerName} is at ${l.firmName}, which covers ${l.practiceAreaSlugs.map(areaLower).join(", ")}.`;
      }
      return `${l.lawyerName} at ${l.firmName} focuses on ${areaLower(l.primaryPracticeArea)} work${
        others.length ? `, and the firm also covers ${others.join(", ")}` : ""
      }.`;
    })
    .join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCaCityBySlug(citySlug);
  if (!city) return {};
  const lawyers = getLawyersByCity(city.slug, "ca");
  const province = getCaProvince(city.province);

  const title = `Lawyers in ${city.name}, ${province.name} | Family, Real Estate, Immigration & More`;
  const description = `${lawyers.length > 0 ? `${lawyers.length} lawyers` : "Lawyers"} in ${city.name}, ${province.name} — named lawyers, office addresses and practice areas, each checked on the law society directory, plus local court and probate information.`;
  const canonicalPath = `/ca/locations/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    // A city with no listings yet stays out of the index (and out of the sitemap).
    ...(lawyers.length === 0 ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_CA", type: "website" },
  };
}

export default async function CaLocationPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCaCityBySlug(citySlug);
  if (!city) notFound();

  const province = getCaProvince(city.province);
  const content = getCaProvinceContent(city.province);
  const lawyers = getLawyersByCity(city.slug, "ca");
  const local = CA_CITY_INFO[city.slug];
  const firmCount = new Set(lawyers.map((l) => l.firmName)).size;
  const areaCounts = CA_PRACTICE_AREAS.map((area) => ({
    ...area,
    count: lawyers.filter((l) => l.practiceAreaSlugs.includes(area.slug)).length,
  }));
  const nearby = CA_CITIES.filter((c) => c.province === city.province && c.slug !== city.slug);
  const faqs = getCaLocationFaqs(city, lawyers[0]?.firmName);
  const summary = summarise(lawyers);
  const canonicalUrl = `${SITE_URL}/ca/locations/${city.slug}`;

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
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ca` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/ca/locations` },
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
            url: `${SITE_URL}/ca/lawyer/${lawyer.id}`,
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
          items={[{ label: "Home", href: "/ca" }, { label: "Locations", href: "/ca/locations" }, { label: city.name }]}
        />

        <div className="max-w-2xl">
          <p className="flex items-center gap-1.5 text-sm text-[#B8863B]">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            {province.name}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-[#10233D] sm:text-4xl">Lawyers in {city.name}</h1>
          <p className="mt-3 text-[#5B6472]">
            {lawyers.length > 0
              ? `Every lawyer we list in ${city.name}, across all practice areas. ${CA_CHECKED_SENTENCE}`
              : `We haven't listed any lawyers in ${city.name} yet.`}
          </p>

          {lawyers.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#10233D]">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                <dt className="sr-only">Lawyers listed</dt>
                <dd>
                  {lawyers.length} {lawyers.length === 1 ? "lawyer" : "lawyers"}
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
                <dd>Licensed by the {province.regulatorName}</dd>
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
                  href={`/ca/lawyers/${area.urlSlug}/${city.slug}`}
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
            <h2 className="mb-5 font-serif text-2xl text-[#10233D]">All lawyers in {city.name}</h2>
            {lawyers.length > 0 ? (
              <div className="flex flex-col gap-4">
                {lawyers.map((lawyer) => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} showPracticeAreas country="ca" />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#DCD8D0] bg-white p-8 text-center">
                <p className="font-medium text-[#10233D]">No lawyers listed in {city.name} yet</p>
                <p className="mt-1 text-sm text-[#5B6472]">Search the {province.directoryLabel} for lawyers near you.</p>
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
                {content.jurisdiction.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">{content.jurisdiction.body}</p>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Landmark className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Courts serving {city.name}
              </h3>
              {local.courtNote && <p className="mt-1 text-sm text-[#5B6472]">{local.courtNote}</p>}
              <ul className="mt-3 divide-y divide-[#EFECE6] rounded-lg border border-[#DCD8D0]">
                {local.courts.map((court) => (
                  <li key={court.name} className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span>
                      <a
                        href={court.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-[#10233D] underline-offset-2 hover:underline"
                      >
                        {court.name}
                        <ExternalLink className="h-3 w-3 text-[#A8A398]" />
                      </a>
                      <span className="block text-xs text-[#A8A398]">{court.address}</span>
                    </span>
                    <span className="text-xs text-[#5B6472] sm:text-right">{court.use}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Family cases
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">{local.familyCourt}</p>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <ScrollText className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Probate
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">{local.estates}</p>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Briefcase className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Employment complaints
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">{content.employmentComplaints}</p>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Free and low-cost legal help
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
                {content.freeHelp.text}{" "}
                {content.freeHelp.links.map((link, i) => (
                  <span key={link.href}>
                    {i > 0 && " · "}
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                      {link.label}
                    </a>
                  </span>
                ))}
              </p>

              <p className="mt-4 text-xs text-[#A8A398]">
                Court details from{" "}
                <a href={content.courtsSource.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#5B6472]">
                  {content.courtsSource.label}
                </a>
                . Most cases settle without a hearing — your lawyer will tell you if you need to attend.
              </p>
            </section>

            <FAQSection faqs={faqs} categoryName="" cityName={city.name} heading={`Common questions about lawyers in ${city.name}`} />

            {nearby.length > 0 && (
              <section aria-labelledby="nearby-h" className="mt-12">
                <h2 id="nearby-h" className="font-serif text-xl text-[#10233D]">
                  Other cities in {province.name}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {nearby.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/ca/locations/${c.slug}`}
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
              lawyer in the{" "}
              <a href={province.directoryUrl} className="underline underline-offset-2 hover:text-[#5B6472]" target="_blank" rel="noopener noreferrer">
                {province.directoryLabel}
              </a>{" "}
              before hiring them.{" "}
              <Link href="/ca/locations" className="underline underline-offset-2 hover:text-[#5B6472]">
                Browse all locations
              </Link>
              .
            </p>
          </div>

          <LeadCaptureSidebar categoryName="local" cityName={city.name} mobileFirst={false} country="ca" />
        </div>
      </div>
    </main>
  );
}
