import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, MapPin, Users } from "lucide-react";

import { getLawyersByCategory } from "@/lib/data/lawyers";
import { NZ_PRACTICE_AREAS, getNzAreaByUrlSlug } from "@/lib/nz/practice-areas";
import { getNzCitiesGroupedByIsland, getNzCityBySlug } from "@/lib/nz/cities";
import { NZ_AREAS, NZ_AREA_INTROS, NZ_CHECKED_SENTENCE, getNzCategoryFaqs } from "@/lib/nz/content";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerCard } from "@/components/solicitors/lawyer-card";
import { FAQSection } from "@/components/solicitors/faq-section";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";

interface PageProps {
  params: Promise<{ category: string }>;
}

// URL names: immigration, family, acc-injury, employment, property, wills-estates.
export function generateStaticParams() {
  return NZ_PRACTICE_AREAS.map((area) => ({ category: area.urlSlug }));
}

export const dynamicParams = false;
export const revalidate = 3600;


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getNzAreaByUrlSlug(categorySlug);
  if (!category) return {};
  const lawyers = getLawyersByCategory(category.slug, "nz");

  const title = `${category.name} Lawyers in New Zealand | Browse by City`;
  const description = `Find ${category.lower} lawyers in New Zealand — listed by city, each checked on the NZ Law Society register, with a plain-English guide to the rules. Free to use.`;

  return {
    title,
    description,
    alternates: { canonical: `/nz/lawyers/${category.urlSlug}` },
    // An area with no listings yet stays out of the index (and out of the sitemap).
    ...(lawyers.length === 0 ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, url: `/nz/lawyers/${category.urlSlug}`, siteName: SITE_NAME, locale: "en_NZ", type: "website" },
  };
}

export default async function NzCategoryHubPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getNzAreaByUrlSlug(categorySlug);
  if (!category) notFound();

  const lawyers = getLawyersByCategory(category.slug, "nz");
  // "Lawyers whose own practice focuses on…" — only where the source says so.
  const specialists = lawyers.filter((l) => l.primaryPracticeArea === category.slug && !l.focusNotStated);
  const countByCity: Record<string, number> = {};
  for (const l of lawyers) countByCity[l.citySlug] = (countByCity[l.citySlug] ?? 0) + 1;
  const cityCount = Object.keys(countByCity).length;
  const groups = getNzCitiesGroupedByIsland();
  const otherAreas = NZ_PRACTICE_AREAS.filter((a) => a.slug !== category.slug);
  const canonicalUrl = `${SITE_URL}/nz/lawyers/${category.urlSlug}`;

  // New Zealand law is national, so there is one guide for the whole country.
  const guide = NZ_AREAS[category.slug];
  const faqs = getNzCategoryFaqs(category.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/nz` },
      { "@type": "ListItem", position: 2, name: "Lawyers", item: `${SITE_URL}/nz/lawyers` },
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
          items={[{ label: "Home", href: "/nz" }, { label: "Lawyers", href: "/nz/lawyers" }, { label: category.name }]}
        />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">{category.name} lawyers in New Zealand</h1>
          <p className="mt-3 text-[#5B6472]">{NZ_AREA_INTROS[category.slug]}</p>
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
                  <div key={group.island}>
                    <h3 className="text-sm font-medium text-[#10233D]">{group.island}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.cities.map((city) => {
                        const count = countByCity[city.slug] ?? 0;
                        return (
                          <li key={city.slug}>
                            <Link
                              href={`/nz/lawyers/${category.urlSlug}/${city.slug}`}
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

            {/* What to know — national */}
            <section aria-labelledby="guide-h" className="mt-12 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
              <h2 id="guide-h" className="font-serif text-2xl text-[#10233D]">
                {category.name} law in New Zealand: what to know
              </h2>
              {[guide].map((guide) => (
                <div key={category.slug} className="mt-4">
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
                  Lawyers whose own published profile focuses on {category.lower} work. {NZ_CHECKED_SENTENCE}
                </p>
                <div className="flex flex-col gap-4">
                  {specialists.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      contextLabel={getNzCityBySlug(lawyer.citySlug)?.name}
                      categorySlug={category.urlSlug}
                      country="nz"
                    />
                  ))}
                </div>
              </section>
            )}

            <FAQSection faqs={faqs} categoryName={category.name} cityName="New Zealand" heading={`Common questions about ${category.lower} lawyers in New Zealand`} />

            <section aria-labelledby="other-h" className="mt-12">
              <h2 id="other-h" className="font-serif text-xl text-[#10233D]">
                Other areas of law
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otherAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/nz/lawyers/${area.urlSlug}`}
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

          <LeadCaptureSidebar categoryName={category.name} cityName="New Zealand" mobileFirst={false} country="nz" />
        </div>
      </div>
    </main>
  );
}
