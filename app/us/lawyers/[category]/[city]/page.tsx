import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Users } from "lucide-react";

import { US_PRACTICE_AREAS, getUsAreaByUrlSlug } from "@/lib/us/practice-areas";
import { US_CITIES, getUsCityBySlug, stateName } from "@/lib/us/cities";
import { getUsState } from "@/lib/us/states";
import { getLawyersByCategoryAndCity } from "@/lib/data/lawyers";
import { US_CHECKED_SENTENCE, US_CITY_INFO, getUsStateContent } from "@/lib/us/content";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerGrid } from "@/components/solicitors/lawyer-grid";
import { FAQSection } from "@/components/solicitors/faq-section";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { UsPiNotice } from "@/components/us/pi-notice";
import { US_LEADS_ENABLED } from "@/lib/config";
import { getUsLocalBlock, shouldIndexUsAreaCity } from "@/lib/us/indexing";

interface PageProps {
  params: Promise<{ category: string; city: string }>;
}

// 6 practice areas × every city, all built ahead of time. Only pages with
// city-specific substance (lib/us/indexing.ts) are indexed and in
// /us/sitemap.xml; the rest stay reachable but noindex.
export function generateStaticParams() {
  return US_PRACTICE_AREAS.flatMap((area) => US_CITIES.map((city) => ({ category: area.urlSlug, city: city.slug })));
}

export const dynamicParams = false;
export const revalidate = 3600;

function resolveParams(categorySlug: string, citySlug: string) {
  const category = getUsAreaByUrlSlug(categorySlug);
  const city = getUsCityBySlug(citySlug);
  if (!category || !city) return null;
  return { category, city };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) return {};
  const { category, city } = resolved;
  const lawyers = getLawyersByCategoryAndCity(category.slug, city.slug, "us");
  const state = stateName(city.state);

  const title = `${category.name} Lawyers in ${city.name}, ${state}`;
  const description =
    category.slug === "personal-injury"
      ? `Personal injury lawyers in ${city.name}, ${state}, with the courts and rules that apply in ${state}. Firm details and addresses — contact firms directly.`
      : `Compare ${category.lower} lawyers in ${city.name}, ${state} — named lawyers, office addresses and ${state}-law FAQs. Each lawyer checked on the state bar directory.`;
  const canonicalPath = `/us/lawyers/${category.urlSlug}/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    // Same rule as /us/sitemap.xml — see lib/us/indexing.ts.
    ...(shouldIndexUsAreaCity(lawyers.length, getUsLocalBlock(category.slug, city))
      ? {}
      : { robots: { index: false, follow: true } }),
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function UsCategoryCityPage({ params }: PageProps) {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) notFound();
  const { category, city } = resolved;

  const isPi = category.slug === "personal-injury";
  const state = getUsState(city.state);
  const content = getUsStateContent(city.state);
  const guide = content.areas[category.slug];
  const lawyers = getLawyersByCategoryAndCity(category.slug, city.slug, "us");
  const faqs = content.categoryFaqs(category.slug, city, US_CITY_INFO[city.slug]);
  const canonicalUrl = `${SITE_URL}/us/lawyers/${category.urlSlug}/${city.slug}`;
  const firmCount = new Set(lawyers.map((l) => l.firmName)).size;
  const otherCities = US_CITIES.filter((c) => c.state === city.state && c.slug !== city.slug);
  const localBlock = getUsLocalBlock(category.slug, city);

  // The page is a directory listing, not a law firm — so CollectionPage, with
  // each listed firm as a LegalService in the ItemList.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Lawyers in ${city.name}, ${state.name}`,
    description: `Directory of ${category.lower} lawyers serving ${city.name}, ${state.name}, United States.`,
    url: canonicalUrl,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/us` },
    about: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: `${state.name}, United States` },
    },
    ...(lawyers.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: lawyers.length,
            itemListElement: lawyers.map((lawyer, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "LegalService",
                name: lawyer.firmName,
                url: `${SITE_URL}/us/lawyer/${lawyer.id}`,
                address: { "@type": "PostalAddress", streetAddress: lawyer.addressLine1, addressRegion: city.state, addressCountry: "US" },
              },
            })),
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/us` },
      { "@type": "ListItem", position: 2, name: "Lawyers", item: `${SITE_URL}/us/lawyers` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/us/lawyers/${category.urlSlug}` },
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
            { label: "Home", href: "/us" },
            { label: "Lawyers", href: "/us/lawyers" },
            { label: category.name, href: `/us/lawyers/${category.urlSlug}` },
            { label: city.name },
          ]}
        />

        <div className="max-w-2xl">
          <Link href={`/us/${state.slug}`} className="flex w-fit items-center gap-1.5 text-sm text-[#B8863B] hover:underline">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            {state.name}
          </Link>
          <h1 className="mt-1 font-serif text-3xl text-[#10233D] sm:text-4xl">
            {category.name} lawyers in {city.name}
          </h1>
          <p className="mt-3 text-[#5B6472]">
            {lawyers.length > 0
              ? `${lawyers.length} ${lawyers.length === 1 ? "lawyer whose firm covers" : "lawyers whose firms cover"} ${category.lower} work in ${city.name}. ${US_CHECKED_SENTENCE}`
              : `We don't list ${/^[aeiou]/i.test(category.lower) ? "an" : "a"} ${category.lower} lawyer in ${city.name} yet.`}{" "}
            {isPi
              ? "Contact firms directly — Lawvoo doesn't take personal injury enquiries in the US."
              : US_LEADS_ENABLED
                ? "Getting in touch through Lawvoo is free, with no obligation."
                : "Browsing Lawvoo is free."}
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

        {localBlock && (
          <section aria-labelledby="local-h" className="mt-8 max-w-2xl rounded-2xl border border-[#DCD8D0] bg-white p-5">
            <h2 id="local-h" className="font-serif text-lg text-[#10233D]">
              {localBlock.heading}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5B6472]">{localBlock.body}</p>
            {localBlock.link && (
              <a
                href={localBlock.link.href}
                className="mt-2 inline-block text-sm font-medium text-[#B8863B] underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {localBlock.link.label} — official site
              </a>
            )}
          </section>
        )}

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-serif text-2xl text-[#10233D]">
              {category.name} lawyers serving {city.name}
            </h2>
            <p className="mt-1 mb-5 text-sm text-[#5B6472]">
              {lawyers.length > 0 ? "Sorted by years of experience." : "No listings here yet."}{" "}
              <Link href={`/us/locations/${city.slug}`} className="underline underline-offset-2 hover:text-[#10233D]">
                See all lawyers in {city.name}
              </Link>
            </p>

            <LawyerGrid
              lawyers={lawyers}
              categoryName={category.name}
              categorySlug={category.urlSlug}
              cityName={city.name}
              country="us"
              linkFirmInstead={isPi}
              emptyHint={`Search the ${state.directoryLabel} for lawyers near you.`}
            />

            <section aria-labelledby="about-h" className="mt-10 rounded-2xl border border-[#DCD8D0] bg-white p-6">
              <h2 id="about-h" className="font-serif text-xl text-[#10233D]">
                About {category.lower} law in {state.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">{guide.intro}</p>
              {!isPi && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5B6472]">
                  {guide.points.slice(0, 3).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              <Link
                href={`/us/lawyers/${category.urlSlug}`}
                className="mt-3 inline-block text-sm font-medium text-[#B8863B] underline underline-offset-2"
              >
                {category.name} lawyers across the US
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
                  {category.name} lawyers in other {state.name} cities
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/us/lawyers/${category.urlSlug}/${c.slug}`}
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
              <a href={state.directoryUrl} className="underline underline-offset-2 hover:text-[#5B6472]" target="_blank" rel="noopener noreferrer">
                {state.directoryLabel}
              </a>{" "}
              before hiring them. Looking for a different area?{" "}
              <Link href="/us/lawyers" className="underline underline-offset-2 hover:text-[#5B6472]">
                Browse all practice areas
              </Link>
              .
            </p>
          </div>

          {isPi ? (
            <UsPiNotice cityName={city.name} stateName={state.name} guide={guide} />
          ) : (
            <LeadCaptureSidebar categoryName={category.name} cityName={city.name} country="us" />
          )}
        </div>
      </div>
    </main>
  );
}
