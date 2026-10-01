import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Users } from "lucide-react";

import { PRACTICE_AREAS, getPracticeAreaBySlug } from "@/lib/validations/lead-intake";
import { getLawyersByCategory } from "@/lib/data/lawyers";
import { getCitiesGroupedByRegion } from "@/lib/seo/regions";
import { getCityBySlug } from "@/lib/seo/uk-cities";
import { getFAQsForCategory } from "@/lib/seo/faq-content";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerCard } from "@/components/solicitors/lawyer-card";
import { FAQSection } from "@/components/solicitors/faq-section";
import { StampDutyCard } from "@/components/tools/stamp-duty-card";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return PRACTICE_AREAS.map((area) => ({ category: area.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

// One or two lines on what each area covers, shown under the page heading.
const AREA_INTROS: Record<string, string> = {
  immigration:
    "Visa applications, settlement (ILR), British citizenship, asylum and appeals. Immigration law is UK-wide, so a solicitor anywhere in the UK can usually help, but local knowledge of tribunal venues can matter for appeals.",
  family:
    "Divorce and separation, financial settlements, child arrangements and pre-nuptial agreements. Family law differs between England & Wales, Scotland and Northern Ireland, so choose a solicitor who practises in the part of the UK where your case will be heard.",
  "personal-injury":
    "Road traffic accidents, accidents at work, clinical negligence and serious injury claims. Many personal injury solicitors work on a no win, no fee basis.",
  employment:
    "Unfair dismissal, discrimination, redundancy, settlement agreements and tribunal claims. Time limits for tribunal claims are short — usually three months — so it pays to get advice early.",
  property:
    "Buying and selling homes (conveyancing), landlord and tenant issues, and boundary or neighbour disputes. The buying process is different in Scotland, where offers are made through solicitors and deals are bound by 'missives'.",
  "wills-probate":
    "Writing a will, lasting powers of attorney, estate administration and inheritance disputes. In Scotland the equivalent of probate is called confirmation.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getPracticeAreaBySlug(categorySlug);
  if (!category) return {};

  const title = `${category.name} Solicitors in the UK | Browse by City`;
  const description = `Find ${category.name.toLowerCase()} solicitors across the UK — checked firms in 50 cities, from London to Glasgow and Belfast. ${category.description}. Free, no-obligation case matching.`;
  const canonicalPath = `/uk/solicitors/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      // The Irish page for the same area of law (hreflang).
      languages: { "en-GB": canonicalPath, "en-IE": `/ie/solicitors/${category.slug}` },
    },
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_GB", type: "website" },
  };
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getPracticeAreaBySlug(categorySlug);
  if (!category) notFound();

  const lawyers = getLawyersByCategory(category.slug);
  const specialists = lawyers.filter((l) => l.primaryPracticeArea === category.slug);
  const countByCity: Record<string, number> = {};
  for (const l of lawyers) countByCity[l.citySlug] = (countByCity[l.citySlug] ?? 0) + 1;
  const cityCount = Object.keys(countByCity).length;
  const groups = getCitiesGroupedByRegion();
  const faqs = getFAQsForCategory(category.slug, "your area");
  const otherAreas = PRACTICE_AREAS.filter((a) => a.slug !== category.slug);
  const canonicalUrl = `${SITE_URL}/uk/solicitors/${category.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/uk` },
      { "@type": "ListItem", position: 2, name: "Solicitors", item: `${SITE_URL}/uk/solicitors` },
      { "@type": "ListItem", position: 3, name: category.name, item: canonicalUrl },
    ],
  };
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/uk" },
            { label: "Solicitors", href: "/uk/solicitors" },
            { label: category.name },
          ]}
        />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">{category.name} solicitors across the UK</h1>
          <p className="mt-3 text-[#5B6472]">{AREA_INTROS[category.slug] ?? category.description}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#10233D]">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Firms</dt>
              <dd>
                {lawyers.length} listed {lawyers.length === 1 ? "firm covers" : "firms cover"} {category.name.toLowerCase()}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Cities</dt>
              <dd>in {cityCount} cities</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {/* Cities, by region */}
            <section aria-labelledby="cities-h">
              <h2 id="cities-h" className="font-serif text-2xl text-[#10233D]">
                Find a {category.name.toLowerCase()} solicitor near you
              </h2>
              <div className="mt-5 space-y-6">
                {groups.map((group) => (
                  <div key={group.region}>
                    <h3 className="text-sm font-medium text-[#10233D]">{group.region}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.cities.map((city) => {
                        const count = countByCity[city.slug] ?? 0;
                        return (
                          <li key={city.slug}>
                            <Link
                              href={`/uk/solicitors/${category.slug}/${city.slug}`}
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

            {/* Specialists */}
            {specialists.length > 0 && (
              <section aria-labelledby="specialists-h" className="mt-12">
                <h2 id="specialists-h" className="font-serif text-2xl text-[#10233D]">
                  {category.name} specialists
                </h2>
                <p className="mt-1 mb-5 text-sm text-[#5B6472]">
                  Solicitors whose own practice focuses on {category.name.toLowerCase()} work.
                </p>
                <div className="flex flex-col gap-4">
                  {specialists.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      contextLabel={getCityBySlug(lawyer.citySlug)?.name}
                      categorySlug={category.slug}
                    />
                  ))}
                </div>
              </section>
            )}

            {category.slug === "property" && <StampDutyCard />}

            <FAQSection faqs={faqs} categoryName={category.name} cityName="the UK" />

            <section aria-labelledby="other-h" className="mt-12">
              <h2 id="other-h" className="font-serif text-xl text-[#10233D]">
                Other areas of law
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otherAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/uk/solicitors/${area.slug}`}
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

          <LeadCaptureSidebar categoryName={category.name} cityName="the UK" mobileFirst={false} />
        </div>
      </div>
    </main>
  );
}
