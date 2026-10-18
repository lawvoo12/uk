import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, MapPin, Users } from "lucide-react";

import { getLawyersByCategory } from "@/lib/data/lawyers";
import { CA_PRACTICE_AREAS, getCaAreaByUrlSlug } from "@/lib/ca/practice-areas";
import { getCaCitiesGroupedByProvince, getCaCityBySlug } from "@/lib/ca/cities";
import { CA_AREA_INTROS, CA_CHECKED_SENTENCE, getCaProvinceContent } from "@/lib/ca/content";
import type { FAQItem } from "@/lib/seo/faq-content";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerCard } from "@/components/solicitors/lawyer-card";
import { FAQSection } from "@/components/solicitors/faq-section";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { CaPiNotice } from "@/components/ca/pi-notice";
import { usAreaPath } from "@/lib/us/practice-areas";

interface PageProps {
  params: Promise<{ category: string }>;
}

// URL names: immigration, family, personal-injury, employment, real-estate, wills-estates.
export function generateStaticParams() {
  return CA_PRACTICE_AREAS.map((area) => ({ category: area.urlSlug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

/** The matching UK / Ireland page uses the shared slug (property, wills-probate). */
function alternates(category: { slug: string; urlSlug: string }) {
  const canonicalPath = `/ca/lawyers/${category.urlSlug}`;
  return {
    canonical: canonicalPath,
    languages: {
      "en-GB": `/uk/solicitors/${category.slug}`,
      "en-IE": `/ie/solicitors/${category.slug}`,
      "en-CA": canonicalPath,
      "en-US": usAreaPath(category.slug),
    },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCaAreaByUrlSlug(categorySlug);
  if (!category) return {};

  const title = `${category.name} Lawyers in Canada | Browse by City`;
  const description =
    category.slug === "personal-injury"
      ? "Personal injury lawyers in Canadian cities, with a plain-English guide to time limits and accident benefits by province. Contact firms directly."
      : `Find ${category.lower} lawyers in Canada — firms listed by city, each checked on a law society directory, with province-by-province guidance. Free to use.`;

  return {
    title,
    description,
    alternates: alternates(category),
    openGraph: { title, description, url: `/ca/lawyers/${category.urlSlug}`, siteName: SITE_NAME, locale: "en_CA", type: "website" },
  };
}

export default async function CaCategoryHubPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCaAreaByUrlSlug(categorySlug);
  if (!category) notFound();

  const isPi = category.slug === "personal-injury";
  const lawyers = getLawyersByCategory(category.slug, "ca");
  // "Lawyers whose own practice focuses on…" — only where the source says so.
  const specialists = lawyers.filter((l) => l.primaryPracticeArea === category.slug && !l.focusNotStated);
  const countByCity: Record<string, number> = {};
  for (const l of lawyers) countByCity[l.citySlug] = (countByCity[l.citySlug] ?? 0) + 1;
  const cityCount = Object.keys(countByCity).length;
  const groups = getCaCitiesGroupedByProvince();
  const otherAreas = CA_PRACTICE_AREAS.filter((a) => a.slug !== category.slug);
  const canonicalUrl = `${SITE_URL}/ca/lawyers/${category.urlSlug}`;

  // One guide per province we cover, because the law differs by province.
  const provinceGuides = groups.map((group) => ({
    ...group,
    guide: getCaProvinceContent(group.province).areas[category.slug],
  }));
  // FAQs from every province, without repeating the federal questions.
  const faqs: FAQItem[] = [];
  for (const group of groups) {
    for (const faq of getCaProvinceContent(group.province).categoryFaqs(category.slug)) {
      if (!faqs.some((f) => f.question === faq.question)) faqs.push(faq);
    }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ca` },
      { "@type": "ListItem", position: 2, name: "Lawyers", item: `${SITE_URL}/ca/lawyers` },
      { "@type": "ListItem", position: 3, name: category.name, item: canonicalUrl },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <BreadcrumbNav
          items={[{ label: "Home", href: "/ca" }, { label: "Lawyers", href: "/ca/lawyers" }, { label: category.name }]}
        />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">{category.name} lawyers in Canada</h1>
          <p className="mt-3 text-[#5B6472]">{CA_AREA_INTROS[category.slug]}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#10233D]">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Lawyers</dt>
              <dd>
                {lawyers.length} listed {lawyers.length === 1 ? "lawyer's firm covers" : "lawyers' firms cover"} {category.lower}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Cities</dt>
              <dd>
                in {cityCount} {cityCount === 1 ? "city" : "cities"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <section aria-labelledby="cities-h">
              <h2 id="cities-h" className="font-serif text-2xl text-[#10233D]">
                Find {/^[aeiou]/i.test(category.lower) ? "an" : "a"} {category.lower} lawyer near you
              </h2>
              <div className="mt-5 space-y-6">
                {groups.map((group) => (
                  <div key={group.province}>
                    <h3 className="text-sm font-medium text-[#10233D]">{group.provinceName}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.cities.map((city) => {
                        const count = countByCity[city.slug] ?? 0;
                        return (
                          <li key={city.slug}>
                            <Link
                              href={`/ca/lawyers/${category.urlSlug}/${city.slug}`}
                              className={
                                count > 0
                                  ? "inline-flex items-center gap-1.5 rounded-full border border-[#DCD8D0] bg-white px-3 py-1.5 text-sm text-[#10233D] hover:border-[#B8A488]"
                                  : "inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#DCD8D0] px-3 py-1.5 text-sm text-[#A8A398] hover:text-[#5B6472]"
                              }
                            >
                              {city.name}
                              {count > 0 && (
                                <span className="rounded-full bg-[#F8F7F4] px-1.5 text-xs text-[#5B6472]">{count}</span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Province-by-province guide */}
            <section aria-labelledby="guide-h" className="mt-12 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
              <h2 id="guide-h" className="font-serif text-2xl text-[#10233D]">
                {category.name} law in Canada: what to know
              </h2>
              <p className="mt-2 text-sm text-[#5B6472]">
                The rules depend on your province, so the points below are set out province by province.
              </p>
              {provinceGuides.map(({ province, provinceName, guide }) => (
                <div key={province} className="mt-6">
                  <h3 className="font-medium text-[#10233D]">{provinceName}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5B6472]">
                    {guide.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {guide.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-[#10233D] underline underline-offset-2"
                        >
                          {l.label}
                          <ExternalLink className="h-3 w-3 text-[#A8A398]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {specialists.length > 0 && (
              <section aria-labelledby="specialists-h" className="mt-12">
                <h2 id="specialists-h" className="font-serif text-2xl text-[#10233D]">
                  Lawyers focusing on {category.lower} work
                </h2>
                <p className="mt-1 mb-5 text-sm text-[#5B6472]">
                  Lawyers whose own published profile focuses on {category.lower} work. {CA_CHECKED_SENTENCE}
                </p>
                <div className="flex flex-col gap-4">
                  {specialists.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      contextLabel={getCaCityBySlug(lawyer.citySlug)?.name}
                      categorySlug={category.urlSlug}
                      country="ca"
                      linkFirmInstead={isPi}
                    />
                  ))}
                </div>
              </section>
            )}

            <FAQSection faqs={faqs} categoryName={category.name} cityName="Canada" heading={`Common questions about ${category.lower} lawyers in Canada`} />

            <section aria-labelledby="other-h" className="mt-12">
              <h2 id="other-h" className="font-serif text-xl text-[#10233D]">
                Other areas of law
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otherAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/ca/lawyers/${area.urlSlug}`}
                      className="inline-flex items-center gap-1 rounded-full border border-[#DCD8D0] bg-white px-3.5 py-1.5 text-sm text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
                    >
                      {area.name}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {isPi ? (
            <CaPiNotice />
          ) : (
            <LeadCaptureSidebar categoryName={category.name} cityName="Canada" mobileFirst={false} country="ca" />
          )}
        </div>
      </div>
    </main>
  );
}
