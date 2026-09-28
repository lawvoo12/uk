import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Star, Users } from "lucide-react";

import { PRACTICE_AREAS, getPracticeAreaBySlug } from "@/lib/validations/lead-intake";
import { TOP_UK_CITIES, getCityBySlug } from "@/lib/seo/uk-cities";
import { getFAQsForCategory } from "@/lib/seo/faq-content";
import { getLawyersByCategoryAndCity } from "@/lib/data/lawyers";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { REGULATORS, regulatedPhrase, regulatorForRegion } from "@/lib/seo/regulators";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerGrid } from "@/components/solicitors/lawyer-grid";
import { FAQSection } from "@/components/solicitors/faq-section";
import { StampDutyCard } from "@/components/tools/stamp-duty-card";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";

interface PageProps {
  params: Promise<{ category: string; city: string }>;
}

// ----------------------------------------------------------------------------
// Static generation: pre-render every PracticeArea × top-50-city combination
// (6 × 50 = 300 pages) at build time. Combinations outside this set (a UK
// town not in TOP_UK_CITIES, or added later) still render on-demand thanks to
// `dynamicParams = true`, then get cached — classic ISR "long tail" pattern
// for programmatic SEO at any scale beyond the initial seed list.
//
// This is now the ONLY route doing this — the legacy
// app/solicitors/[practiceArea]/[city] route has been retired in favour of
// this one (see next.config.ts for the permanent redirect that replaces it).
// ----------------------------------------------------------------------------
export function generateStaticParams() {
  return PRACTICE_AREAS.flatMap((area) =>
    TOP_UK_CITIES.map((city) => ({
      category: area.slug,
      city: city.slug,
    }))
  );
}

export const dynamicParams = true;
export const revalidate = 3600; // re-check ratings/lawyer counts hourly

function resolveParams(categorySlug: string, citySlug: string) {
  const category = getPracticeAreaBySlug(categorySlug);
  const city = getCityBySlug(citySlug);
  if (!category || !city) return null;
  return { category, city };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) return {};
  const { category, city } = resolved;

  const title = `Best ${category.name} Solicitors in ${city.name} | UK Lawyer Directory`;
  const description = `Compare ${regulatedPhrase(city.region)} ${category.name.toLowerCase()} solicitors in ${city.name}, ${city.region}. Checked firm details, solicitor profiles and free case matching — no obligation to instruct.`;
  const canonicalPath = `/uk/solicitors/${category.slug}/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function UkSolicitorsCategoryCityPage({ params }: PageProps) {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) notFound();
  const { category, city } = resolved;

  // Reads from the static lib/data/static-lawyers.ts file (lib/data/lawyers.ts)
  // — no database involved.
  const lawyers = await getLawyersByCategoryAndCity(category.slug, city.slug);
  const faqs = getFAQsForCategory(category.slug, city.name, city.region);

  const canonicalUrl = `${SITE_URL}/uk/solicitors/${category.slug}/${city.slug}`;
  const regulator = REGULATORS[regulatorForRegion(city.region)];
  const regulated = regulatedPhrase(city.region);
  const firmCount = new Set(lawyers.map((l) => l.firmName)).size;
  // Only real reviews count — listings without reviews are left out of the
  // average rather than treated as zero stars.
  const reviewed = lawyers.filter((l) => l.ratingAverage !== null);
  const totalReviews = reviewed.reduce((sum, l) => sum + l.ratingCount, 0);
  const avgRating =
    totalReviews > 0
      ? Math.round((reviewed.reduce((sum, l) => sum + l.ratingAverage! * l.ratingCount, 0) / totalReviews) * 10) / 10
      : undefined;

  // --------------------------------------------------------------------
  // JSON-LD: LegalService (drives the local-business style rich result)
  // --------------------------------------------------------------------
  const legalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${category.name} Solicitors in ${city.name}`,
    description: `Directory of ${regulated} ${category.name.toLowerCase()} solicitors serving ${city.name}, ${city.region}.`,
    url: canonicalUrl,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.region },
    },
    ...(avgRating && lawyers.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating,
            reviewCount: totalReviews,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  // --------------------------------------------------------------------
  // JSON-LD: BreadcrumbList
  // --------------------------------------------------------------------
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/uk` },
      { "@type": "ListItem", position: 2, name: "Solicitors", item: `${SITE_URL}/uk/solicitors` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${SITE_URL}/uk/solicitors/${category.slug}`,
      },
      { "@type": "ListItem", position: 4, name: city.name, item: canonicalUrl },
    ],
  };

  // --------------------------------------------------------------------
  // JSON-LD: ItemList — tells Google this page IS a listing of N distinct
  // solicitor profiles (each with its own URL), separate from LegalService
  // above (which describes the page's own aggregate business identity).
  // Omitted entirely when there are no listings — an empty ItemList is
  // meaningless structured data, not a graceful empty state.
  // --------------------------------------------------------------------
  const itemListJsonLd =
    lawyers.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: lawyers.map((lawyer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/uk/lawyer/${lawyer.id}`,
            name: lawyer.firmName,
          })),
        }
      : null;

  // Bonus: FAQPage JSON-LD — reuses the FAQ content already on the page for
  // a low-cost shot at an FAQ rich result alongside the others.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/uk" },
            { label: "Solicitors", href: "/uk/solicitors" },
            { label: category.name, href: `/uk/solicitors/${category.slug}` },
            { label: city.name },
          ]}
        />

        {/* Hero */}
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">
            Find the Best {category.name} Lawyers in {city.name}
          </h1>
          <p className="mt-3 text-[#5B6472]">
            Compare {lawyers.length > 0 ? `${lawyers.length} ` : ""}{regulated} {category.name.toLowerCase()} solicitors
            covering {city.name} and the surrounding {city.region} area.{" "}
            {regulatorForRegion(city.region) === "LSS"
              ? `Firms here are regulated by the ${regulator.name} — check them on its register before instructing.`
              : `Every firm listed has been checked on the ${regulator.name} register.`}{" "}
            Get in touch for free, no obligation.
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2 text-[#10233D]">
              <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Checked firms</dt>
              <dd>
                {firmCount} {firmCount === 1 ? "firm" : "firms"} regulated by the {regulator.shortName}
              </dd>
            </div>
            {avgRating && (
              <div className="flex items-center gap-2 text-[#10233D]">
                <Star className="h-4 w-4 fill-[#B8863B] text-[#B8863B]" />
                <dt className="sr-only">Average rating</dt>
                <dd>
                  {avgRating} average rating ({totalReviews} reviews)
                </dd>
              </div>
            )}
            <div className="flex items-center gap-2 text-[#10233D]">
              <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
              <dt className="sr-only">Lawyers listed</dt>
              <dd>{lawyers.length} solicitors listed</dd>
            </div>
          </dl>
        </div>

        {/* Content + sidebar */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-serif text-2xl text-[#10233D]">
              {category.name} solicitors serving {city.name}
            </h2>
            <p className="mt-1 mb-5 text-sm text-[#5B6472]">
              {lawyers.length > 0 ? "Sorted by years of experience." : "No verified listings here yet."}{" "}
              <Link href={`/uk/locations/${city.slug}`} className="underline underline-offset-2 hover:text-[#10233D]">
                See all solicitors in {city.name}
              </Link>
            </p>

            {/* LawyerGrid renders a graceful empty state itself — a dashed
                card inviting a submitted case instead of a dead end — so
                no extra empty-state branching is needed at this level. */}
            <LawyerGrid lawyers={lawyers} categoryName={category.name} categorySlug={category.slug} cityName={city.name} />

            {category.slug === "property" && <StampDutyCard region={city.region} cityName={city.name} />}

            <FAQSection faqs={faqs} categoryName={category.name} cityName={city.name} />

            <p className="mt-10 text-xs leading-relaxed text-[#A8A398]">
              Listings are provided for information only and do not constitute legal advice or a recommendation.
              Always verify a solicitor&apos;s credentials on the{" "}
              <a
                href={regulator.registerUrl}
                className="underline underline-offset-2 hover:text-[#5B6472]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {regulator.registerLabel}
              </a>{" "}
              before instructing them. Looking for a different area?{" "}
              <Link href="/uk/solicitors" className="underline underline-offset-2 hover:text-[#5B6472]">
                Browse all practice areas
              </Link>
              .
            </p>
          </div>

          <LeadCaptureSidebar categoryName={category.name} cityName={city.name} />
        </div>
      </div>
    </main>
  );
}
