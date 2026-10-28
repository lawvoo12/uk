import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Users } from "lucide-react";

import { NZ_PRACTICE_AREAS, getNzAreaByUrlSlug } from "@/lib/nz/practice-areas";
import { NZ_CITIES, getNzCityBySlug } from "@/lib/nz/cities";
import { NZ_REGISTER_LABEL, NZ_REGISTER_URL } from "@/lib/nz/regulators";
import { getLawyersByCategoryAndCity } from "@/lib/data/lawyers";
import { NZ_AREAS, NZ_AREA_INTROS, NZ_CHECKED_SENTENCE, getNzCategoryFaqs } from "@/lib/nz/content";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { directoryPageJsonLd } from "@/lib/seo/directory-schema";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerGrid } from "@/components/solicitors/lawyer-grid";
import { FAQSection } from "@/components/solicitors/faq-section";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { NZ_LEADS_ENABLED } from "@/lib/config";

interface PageProps {
  params: Promise<{ category: string; city: string }>;
}

// 6 practice areas × every city, all built ahead of time. Only combinations
// with at least one lawyer are in /nz/sitemap.xml; the rest are noindex.
export function generateStaticParams() {
  return NZ_PRACTICE_AREAS.flatMap((area) => NZ_CITIES.map((city) => ({ category: area.urlSlug, city: city.slug })));
}

export const dynamicParams = false;
export const revalidate = 3600;

function resolveParams(categorySlug: string, citySlug: string) {
  const category = getNzAreaByUrlSlug(categorySlug);
  const city = getNzCityBySlug(citySlug);
  if (!category || !city) return null;
  return { category, city };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) return {};
  const { category, city } = resolved;
  const lawyers = getLawyersByCategoryAndCity(category.slug, city.slug, "nz");

  const title = `${category.name} Lawyers in ${city.name}, New Zealand`;
  const description = `Compare ${category.lower} lawyers in ${city.name} — named lawyers, office addresses, local courts and New Zealand law FAQs. Each lawyer checked on the NZ Law Society register.`;
  const canonicalPath = `/nz/lawyers/${category.urlSlug}/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    // Pages without listings stay reachable but out of the index (and out of the sitemap).
    ...(lawyers.length === 0 ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_NZ", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function NzCategoryCityPage({ params }: PageProps) {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) notFound();
  const { category, city } = resolved;

  const guide = NZ_AREAS[category.slug];
  const lawyers = getLawyersByCategoryAndCity(category.slug, city.slug, "nz");
  const faqs = getNzCategoryFaqs(category.slug, city);
  const canonicalUrl = `${SITE_URL}/nz/lawyers/${category.urlSlug}/${city.slug}`;
  const firmCount = new Set(lawyers.map((l) => l.firmName)).size;
  const otherCities = NZ_CITIES.filter((c) => c.slug !== city.slug);

  // A directory listing, not a law firm — see lib/seo/directory-schema.ts.
  const collectionJsonLd = directoryPageJsonLd({
    name: `${category.name} Lawyers in ${city.name}`,
    description: `Directory of ${category.lower} lawyers serving ${city.name}, New Zealand.`,
    url: canonicalUrl,
    base: "/nz",
    locale: "en-NZ",
    country: "NZ",
    cityName: city.name,
    regionName: `${city.region}, New Zealand`,
    lawyers,
  });
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/nz` },
      { "@type": "ListItem", position: 2, name: "Lawyers", item: `${SITE_URL}/nz/lawyers` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/nz/lawyers/${category.urlSlug}` },
      { "@type": "ListItem", position: 4, name: city.name, item: canonicalUrl },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/nz" },
            { label: "Lawyers", href: "/nz/lawyers" },
            { label: category.name, href: `/nz/lawyers/${category.urlSlug}` },
            { label: city.name },
          ]}
        />

        <div className="max-w-2xl">
          <p className="flex items-center gap-1.5 text-sm text-[#B8863B]">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            {city.region}, {city.island}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-[#10233D] sm:text-4xl">
            {category.name} lawyers in {city.name}
          </h1>
          <p className="mt-3 text-[#5B6472]">
            {lawyers.length > 0
              ? `${lawyers.length} ${lawyers.length === 1 ? "lawyer whose firm covers" : "lawyers whose firms cover"} ${category.lower} work in ${city.name}. ${NZ_CHECKED_SENTENCE}`
              : `We don't list ${/^[aeiou]/i.test(category.lower) ? "an" : "a"} ${category.lower} lawyer in ${city.name} yet.`}{" "}
            {NZ_LEADS_ENABLED ? "Getting in touch through Lawvoo is free, with no obligation." : "Browsing Lawvoo is free."}
          </p>

          {lawyers.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#10233D]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                <dt className="sr-only">Firms</dt>
                <dd>
                  {firmCount} {firmCount === 1 ? "firm" : "firms"}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                <dt className="sr-only">Lawyers listed</dt>
                <dd>
                  {lawyers.length} {lawyers.length === 1 ? "lawyer" : "lawyers"} listed
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-serif text-2xl text-[#10233D]">
              {category.name} lawyers serving {city.name}
            </h2>
            <p className="mt-1 mb-5 text-sm text-[#5B6472]">
              {lawyers.length > 0 ? "Sorted by years of experience." : "No listings here yet."}{" "}
              <Link href={`/nz/locations/${city.slug}`} className="underline underline-offset-2 hover:text-[#10233D]">
                See all lawyers in {city.name}
              </Link>
            </p>

            <LawyerGrid
              lawyers={lawyers}
              categoryName={category.name}
              categorySlug={category.urlSlug}
              cityName={city.name}
              country="nz"
              emptyHint={`Search the ${NZ_REGISTER_LABEL} for lawyers near you.`}
            />

            <section aria-labelledby="about-h" className="mt-10 rounded-2xl border border-[#DCD8D0] bg-white p-6">
              <h2 id="about-h" className="font-serif text-xl text-[#10233D]">
                About {category.lower} law in New Zealand
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">{NZ_AREA_INTROS[category.slug]}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5B6472]">
                {guide.points.slice(0, 3).map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link
                href={`/nz/lawyers/${category.urlSlug}`}
                className="mt-3 inline-block text-sm font-medium text-[#B8863B] underline underline-offset-2"
              >
                {category.name} lawyers across New Zealand
              </Link>
            </section>

            <FAQSection
              faqs={faqs}
              categoryName={category.name}
              cityName={city.name}
              heading={`Common questions about ${category.lower} lawyers in ${city.name}`}
            />

            {otherCities.length > 0 && (
              <section aria-labelledby="cities-h" className="mt-12">
                <h2 id="cities-h" className="font-serif text-xl text-[#10233D]">
                  {category.name} lawyers in other New Zealand cities
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/nz/lawyers/${category.urlSlug}/${c.slug}`}
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
              lawyer on the{" "}
              <a href={NZ_REGISTER_URL} className="underline underline-offset-2 hover:text-[#5B6472]" target="_blank" rel="noopener noreferrer">
                {NZ_REGISTER_LABEL}
              </a>{" "}
              before hiring them. Looking for a different area?{" "}
              <Link href="/nz/lawyers" className="underline underline-offset-2 hover:text-[#5B6472]">
                Browse all practice areas
              </Link>
              .
            </p>
          </div>

          <LeadCaptureSidebar categoryName={category.name} cityName={city.name} country="nz" />
        </div>
      </div>
    </main>
  );
}
