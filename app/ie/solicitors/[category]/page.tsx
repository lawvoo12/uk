import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, MapPin, Users } from "lucide-react";

import { PRACTICE_AREAS, getPracticeAreaBySlug } from "@/lib/validations/lead-intake";
import { getLawyersByCategory } from "@/lib/data/lawyers";
import { getIeCitiesGroupedByProvince, getIeCityBySlug } from "@/lib/ie/cities";
import { IE_AREA_GUIDE, IE_AREA_INTROS, getIeCategoryFaqs } from "@/lib/ie/content";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerCard } from "@/components/solicitors/lawyer-card";
import { FAQSection } from "@/components/solicitors/faq-section";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { IeStampDutyCard } from "@/components/ie/ie-stamp-duty-card";
import { PiNotice } from "@/components/ie/pi-notice";
import { IE_GUIDES } from "@/lib/ie/guides";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return PRACTICE_AREAS.map((area) => ({ category: area.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getPracticeAreaBySlug(categorySlug);
  if (!category) return {};

  const title = `${category.name} Solicitors in Ireland | Browse by Town`;
  const description =
    category.slug === "personal-injury"
      ? "Personal injury solicitors in 20 Irish towns, with a plain-English guide to the Injuries Resolution Board process. Contact firms directly."
      : `Find ${category.name.toLowerCase()} solicitors in Ireland — firms in 20 towns from Dublin and Cork to Galway and Letterkenny, with Irish-law guidance. Free to use.`;
  const canonicalPath = `/ie/solicitors/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: { "en-GB": `/uk/solicitors/${category.slug}`, "en-IE": canonicalPath },
    },
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_IE", type: "website" },
  };
}

export default async function IeCategoryHubPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getPracticeAreaBySlug(categorySlug);
  if (!category) notFound();

  const isPi = category.slug === "personal-injury";
  const lawyers = getLawyersByCategory(category.slug, "ie");
  // "Solicitors whose own practice focuses on…" — only where the source says so.
  const specialists = lawyers.filter((l) => l.primaryPracticeArea === category.slug && !l.focusNotStated);
  const countByCity: Record<string, number> = {};
  for (const l of lawyers) countByCity[l.citySlug] = (countByCity[l.citySlug] ?? 0) + 1;
  const cityCount = Object.keys(countByCity).length;
  const groups = getIeCitiesGroupedByProvince();
  const faqs = getIeCategoryFaqs(category.slug);
  const guide = IE_AREA_GUIDE[category.slug];
  const article = IE_GUIDES.find((g) => g.practiceAreaSlug === category.slug);
  const otherAreas = PRACTICE_AREAS.filter((a) => a.slug !== category.slug);
  const canonicalUrl = `${SITE_URL}/ie/solicitors/${category.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
      { "@type": "ListItem", position: 2, name: "Solicitors", item: `${SITE_URL}/ie/solicitors` },
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
          items={[
            { label: "Home", href: "/ie" },
            { label: "Solicitors", href: "/ie/solicitors" },
            { label: category.name },
          ]}
        />

        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">{category.name} solicitors in Ireland</h1>
          <p className="mt-3 text-[#5B6472]">{IE_AREA_INTROS[category.slug]}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#10233D]">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Firms</dt>
              <dd>
                {lawyers.length} listed {lawyers.length === 1 ? "solicitor covers" : "solicitors cover"}{" "}
                {category.name.toLowerCase()}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Towns</dt>
              <dd>in {cityCount} towns</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <section aria-labelledby="cities-h">
              <h2 id="cities-h" className="font-serif text-2xl text-[#10233D]">
                Find a {category.name.toLowerCase()} solicitor near you
              </h2>
              <div className="mt-5 space-y-6">
                {groups.map((group) => (
                  <div key={group.province}>
                    <h3 className="text-sm font-medium text-[#10233D]">{group.province}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.cities.map((city) => {
                        const count = countByCity[city.slug] ?? 0;
                        return (
                          <li key={city.slug}>
                            <Link
                              href={`/ie/solicitors/${category.slug}/${city.slug}`}
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

            {/* Irish-law guide */}
            <section aria-labelledby="guide-h" className="mt-12 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
              <h2 id="guide-h" className="font-serif text-2xl text-[#10233D]">
                {category.name} law in Ireland: what to know
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5B6472]">
                {guide.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {article && (
                <p className="mt-4 text-sm">
                  <Link href={`/ie/guides/${article.slug}`} className="font-medium text-[#B8863B] underline underline-offset-2">
                    Read our guide: {article.title}
                  </Link>
                </p>
              )}
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
            </section>

            {specialists.length > 0 && (
              <section aria-labelledby="specialists-h" className="mt-12">
                <h2 id="specialists-h" className="font-serif text-2xl text-[#10233D]">
                  Solicitors focusing on {category.name.toLowerCase()} work
                </h2>
                <p className="mt-1 mb-5 text-sm text-[#5B6472]">
                  Solicitors whose own published profile focuses on {category.name.toLowerCase()} work.
                </p>
                <div className="flex flex-col gap-4">
                  {specialists.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      contextLabel={getIeCityBySlug(lawyer.citySlug)?.name}
                      categorySlug={category.slug}
                      country="ie"
                      linkFirmInstead={isPi}
                    />
                  ))}
                </div>
              </section>
            )}

            {category.slug === "property" && <IeStampDutyCard />}

            <FAQSection faqs={faqs} categoryName={category.name} cityName="Ireland" />

            <section aria-labelledby="other-h" className="mt-12">
              <h2 id="other-h" className="font-serif text-xl text-[#10233D]">
                Other areas of law
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otherAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/ie/solicitors/${area.slug}`}
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
            <PiNotice />
          ) : (
            <LeadCaptureSidebar categoryName={category.name} cityName="Ireland" mobileFirst={false} country="ie" />
          )}
        </div>
      </div>
    </main>
  );
}
