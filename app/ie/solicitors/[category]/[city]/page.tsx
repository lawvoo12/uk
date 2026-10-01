import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Users } from "lucide-react";

import { PRACTICE_AREAS, getPracticeAreaBySlug } from "@/lib/validations/lead-intake";
import { IE_CITIES, getIeCityBySlug } from "@/lib/ie/cities";
import { getLawyersByCategoryAndCity } from "@/lib/data/lawyers";
import { IE_AREA_INTROS, IE_CHECKED_SENTENCE, IE_LINKS, getIeCategoryFaqs } from "@/lib/ie/content";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { LawyerGrid } from "@/components/solicitors/lawyer-grid";
import { FAQSection } from "@/components/solicitors/faq-section";
import { LeadCaptureSidebar } from "@/components/solicitors/lead-capture-sidebar";
import { IeStampDutyCard } from "@/components/ie/ie-stamp-duty-card";
import { PiNotice } from "@/components/ie/pi-notice";

interface PageProps {
  params: Promise<{ category: string; city: string }>;
}

// 6 practice areas × 20 towns = 120 pages, all built ahead of time. Only
// combinations with at least one solicitor are in /ie/sitemap.xml.
export function generateStaticParams() {
  return PRACTICE_AREAS.flatMap((area) => IE_CITIES.map((city) => ({ category: area.slug, city: city.slug })));
}

export const dynamicParams = false;
export const revalidate = 3600;

function resolveParams(categorySlug: string, citySlug: string) {
  const category = getPracticeAreaBySlug(categorySlug);
  const city = getIeCityBySlug(citySlug);
  if (!category || !city) return null;
  return { category, city };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) return {};
  const { category, city } = resolved;
  const lawyers = getLawyersByCategoryAndCity(category.slug, city.slug, "ie");

  const title = `${category.name} Solicitors in ${city.name}, Co. ${city.county}`;
  const description =
    category.slug === "personal-injury"
      ? `Personal injury solicitors in ${city.name}, Co. ${city.county}, and how the Injuries Resolution Board process works. Firm details and addresses — contact firms directly.`
      : `Compare ${category.name.toLowerCase()} solicitors in ${city.name}, Co. ${city.county} — named solicitors, office addresses and Irish-law FAQs. Free, no obligation to instruct.`;
  const canonicalPath = `/ie/solicitors/${category.slug}/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    // Pages without listings stay reachable but out of the index (and out of the sitemap).
    ...(lawyers.length === 0 ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, url: canonicalPath, siteName: SITE_NAME, locale: "en_IE", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function IeCategoryCityPage({ params }: PageProps) {
  const { category: categorySlug, city: citySlug } = await params;
  const resolved = resolveParams(categorySlug, citySlug);
  if (!resolved) notFound();
  const { category, city } = resolved;

  const isPi = category.slug === "personal-injury";
  const lawyers = getLawyersByCategoryAndCity(category.slug, city.slug, "ie");
  const faqs = getIeCategoryFaqs(category.slug, city);
  const canonicalUrl = `${SITE_URL}/ie/solicitors/${category.slug}/${city.slug}`;
  const firmCount = new Set(lawyers.map((l) => l.firmName)).size;
  const otherTowns = IE_CITIES.filter((c) => c.province === city.province && c.slug !== city.slug);

  const legalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${category.name} Solicitors in ${city.name}`,
    description: `Directory of ${category.name.toLowerCase()} solicitors serving ${city.name}, Co. ${city.county}, Ireland.`,
    url: canonicalUrl,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: `County ${city.county}, Ireland` },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
      { "@type": "ListItem", position: 2, name: "Solicitors", item: `${SITE_URL}/ie/solicitors` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/ie/solicitors/${category.slug}` },
      { "@type": "ListItem", position: 4, name: city.name, item: canonicalUrl },
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
            name: lawyer.firmName,
          })),
        }
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

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/ie" },
            { label: "Solicitors", href: "/ie/solicitors" },
            { label: category.name, href: `/ie/solicitors/${category.slug}` },
            { label: city.name },
          ]}
        />

        <div className="max-w-2xl">
          <p className="flex items-center gap-1.5 text-sm text-[#B8863B]">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            Co. {city.county}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-[#10233D] sm:text-4xl">
            {category.name} solicitors in {city.name}
          </h1>
          <p className="mt-3 text-[#5B6472]">
            {lawyers.length > 0
              ? `${lawyers.length} ${lawyers.length === 1 ? "solicitor" : "solicitors"} whose firms cover ${category.name.toLowerCase()} work in and around ${city.name}. ${IE_CHECKED_SENTENCE}`
              : `We don't list a ${category.name.toLowerCase()} solicitor in ${city.name} yet.`}{" "}
            {isPi ? "Contact firms directly — Lawvoo doesn't take personal injury enquiries in Ireland." : "Getting in touch through Lawvoo is free, with no obligation."}
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
                <dt className="sr-only">Solicitors listed</dt>
                <dd>{lawyers.length} solicitors listed</dd>
              </div>
            </dl>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-serif text-2xl text-[#10233D]">
              {category.name} solicitors serving {city.name}
            </h2>
            <p className="mt-1 mb-5 text-sm text-[#5B6472]">
              {lawyers.length > 0 ? "Sorted by years of experience." : "No listings here yet."}{" "}
              <Link href={`/ie/locations/${city.slug}`} className="underline underline-offset-2 hover:text-[#10233D]">
                See all solicitors in {city.name}
              </Link>
            </p>

            <LawyerGrid
              lawyers={lawyers}
              categoryName={category.name}
              categorySlug={category.slug}
              cityName={city.name}
              country="ie"
              linkFirmInstead={isPi}
              emptyHint={
                isPi
                  ? "Search the Law Society of Ireland's Find a Solicitor register for firms near you."
                  : "Use the form to tell us about your case, or search the Law Society of Ireland register."
              }
            />

            <section aria-labelledby="about-h" className="mt-10 rounded-2xl border border-[#DCD8D0] bg-white p-6">
              <h2 id="about-h" className="font-serif text-xl text-[#10233D]">
                About {category.name.toLowerCase()} law in Ireland
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">{IE_AREA_INTROS[category.slug]}</p>
              <Link
                href={`/ie/solicitors/${category.slug}`}
                className="mt-3 inline-block text-sm font-medium text-[#B8863B] underline underline-offset-2"
              >
                {category.name} solicitors across Ireland
              </Link>
            </section>

            {category.slug === "property" && <IeStampDutyCard cityName={city.name} />}

            <FAQSection faqs={faqs} categoryName={category.name} cityName={city.name} />

            {otherTowns.length > 0 && (
              <section aria-labelledby="towns-h" className="mt-12">
                <h2 id="towns-h" className="font-serif text-xl text-[#10233D]">
                  {category.name} solicitors in other {city.province} towns
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {otherTowns.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/ie/solicitors/${category.slug}/${c.slug}`}
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
              before instructing them. Looking for a different area?{" "}
              <Link href="/ie/solicitors" className="underline underline-offset-2 hover:text-[#5B6472]">
                Browse all practice areas
              </Link>
              .
            </p>
          </div>

          {isPi ? (
            <PiNotice cityName={city.name} />
          ) : (
            <LeadCaptureSidebar categoryName={category.name} cityName={city.name} country="ie" />
          )}
        </div>
      </div>
    </main>
  );
}
