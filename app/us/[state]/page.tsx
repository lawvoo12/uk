import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator, ExternalLink, MapPin, ScrollText, ShieldCheck, Users } from "lucide-react";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { HeroSearch } from "@/components/home/hero-search";
import { US_LEADS_ENABLED } from "@/lib/config";
import { FAQSection } from "@/components/solicitors/faq-section";
import { US_CITIES } from "@/lib/us/cities";
import { US_CHECKED_SENTENCE, getUsStateContent } from "@/lib/us/content";
import { US_GUIDES } from "@/lib/us/guides";
import { US_LAWYERS } from "@/lib/us/lawyers";
import { US_PRACTICE_AREAS } from "@/lib/us/practice-areas";
import { getUsStateBySlug, liveUsStates } from "@/lib/us/states";
import { US_TOOLS } from "@/lib/tools";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

// State hub: /us/alabama. One page per live state (lib/us/states.ts), built
// only from that state's checked content file (lib/us/states/*.ts) and its
// listings — no new facts are written here.

interface PageProps {
  params: Promise<{ state: string }>;
}

export function generateStaticParams() {
  return liveUsStates().map((s) => ({ state: s.slug }));
}

export const dynamicParams = false;

function load(slug: string) {
  const state = getUsStateBySlug(slug);
  if (!state) return null;
  const content = getUsStateContent(state.code);
  const cities = US_CITIES.filter((c) => c.state === state.code);
  const lawyers = US_LAWYERS.filter((l) => l.state === state.code);
  return { state, content, cities, lawyers };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = load((await params).state);
  if (!data) return {};
  const { state, cities } = data;
  const title = `Find a Lawyer in ${state.name} | Lawyers by City and Practice Area`;
  const description = `Lawyers in ${cities.length} ${state.name} cities — family, immigration, employment, real estate, estate planning and personal injury. Each lawyer checked on the ${state.regulatorName}'s directory. Free to use.`;
  const path = `/us/${state.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, locale: "en_US", type: "website" },
  };
}

export default async function UsStateHubPage({ params }: PageProps) {
  const data = load((await params).state);
  if (!data) notFound();
  const { state, content, cities, lawyers } = data;
  const url = `${SITE_URL}/us/${state.slug}`;

  const countByCity: Record<string, number> = {};
  for (const l of lawyers) countByCity[l.citySlug] = (countByCity[l.citySlug] ?? 0) + 1;
  const citiesWithLawyers = cities.filter((c) => (countByCity[c.slug] ?? 0) > 0).length;
  const firms = new Set(lawyers.map((l) => l.firmName)).size;
  // Guides about this state first, then the federal ones (they apply everywhere).
  const stateGuides = US_GUIDES.filter((g) => `${g.title} ${g.description}`.includes(state.name));
  const federalGuides = US_GUIDES.filter((g) => !stateGuides.includes(g));

  const faqs = [
    { question: `How do I check a lawyer is licensed in ${state.name}?`, answer: content.regulationAnswer },
    { question: `Which courts handle cases in ${state.name}?`, answer: content.courtsSummary },
    { question: `Where can I get free legal help in ${state.name}?`, answer: content.freeHelp.text },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Lawyers in ${state.name}`,
      url,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/us` },
      about: { "@type": "State", name: state.name, containedInPlace: { "@type": "Country", name: "United States" } },
      hasPart: cities.map((c) => ({ "@type": "WebPage", name: `Lawyers in ${c.name}, ${state.name}`, url: `${SITE_URL}/us/locations/${c.slug}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/us` },
        { "@type": "ListItem", position: 2, name: state.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      {jsonLd.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />
      ))}
      {/* Hero — same look as the /us homepage: heading, search box, trust row. */}
      <section className="px-4 pb-14 pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <BreadcrumbNav items={[{ label: "Home", href: "/us" }, { label: state.name }]} />
        </div>
        <div className="mx-auto mt-6 max-w-3xl text-center sm:mt-10">
          <h1 className="font-serif text-3xl text-[#10233D] sm:text-5xl">Find the right lawyer in {state.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-[#5B6472]">
            {firms > 0
              ? `Compare ${firms} law ${firms === 1 ? "firm" : "firms"} in ${citiesWithLawyers} ${citiesWithLawyers === 1 ? "city" : "cities"} in ${state.name} by area of law`
              : `Browse lawyers in ${state.name} by area of law`}
            {US_LEADS_ENABLED ? ", or tell us about your case — free, with no obligation." : " and contact them directly — free to use."}
          </p>
        </div>

        <div className="mt-8">
          <HeroSearch country="us" />
        </div>

        <dl className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#5B6472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Directory check</dt>
            <dd>
              Checked on the{" "}
              <a href={state.directoryUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#10233D]">
                {state.regulatorName} directory
              </a>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">No account needed</dt>
            <dd>No account needed</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Coverage</dt>
            <dd>
              {cities.length} {cities.length === 1 ? "city" : "cities"} in {state.name}
            </dd>
          </div>
        </dl>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-14">
        <p className="max-w-2xl text-sm text-[#5B6472]">{US_CHECKED_SENTENCE}</p>

        {/* Cities */}
        <section aria-labelledby="cities-h" className="mt-10">
          <h2 id="cities-h" className="font-serif text-2xl text-[#10233D]">
            Lawyers by city in {state.name}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/us/locations/${c.slug}`}
                  className="flex items-center justify-between rounded-xl border border-[#DCD8D0] bg-white px-4 py-3 transition-colors hover:border-[#B8A488]"
                >
                  <span className="flex items-center gap-2 font-medium text-[#10233D]">
                    <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                    {c.name}
                  </span>
                  <span className="text-xs text-[#5B6472]">
                    {(countByCity[c.slug] ?? 0) > 0
                      ? `${countByCity[c.slug]} ${countByCity[c.slug] === 1 ? "lawyer" : "lawyers"}`
                      : c.county}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Practice areas, each with the cities that have a lawyer for it */}
        <section aria-labelledby="areas-h" className="mt-12">
          <h2 id="areas-h" className="font-serif text-2xl text-[#10233D]">
            Lawyers by practice area in {state.name}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {US_PRACTICE_AREAS.map((area) => {
              const areaCities = cities.filter((c) =>
                lawyers.some((l) => l.citySlug === c.slug && l.practiceAreaSlugs.includes(area.slug))
              );
              return (
                <div key={area.slug} className="rounded-xl border border-[#DCD8D0] bg-white p-5">
                  <Link href={`/us/lawyers/${area.urlSlug}`} className="font-serif text-lg text-[#10233D] hover:underline">
                    {area.name} lawyers
                  </Link>
                  <p className="mt-1 text-sm text-[#5B6472]">{content.areas[area.slug].intro}</p>
                  {areaCities.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {areaCities.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/us/lawyers/${area.urlSlug}/${c.slug}`}
                            className="inline-flex rounded-full border border-[#DCD8D0] bg-[#FAF9F6] px-2.5 py-0.5 text-xs text-[#5B6472] hover:border-[#B8A488] hover:text-[#10233D]"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Law and courts — from the state's checked content file */}
        <section aria-labelledby="law-h" className="mt-12 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
          <h2 id="law-h" className="font-serif text-2xl text-[#10233D]">
            {content.jurisdiction.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{content.jurisdiction.body}</p>
          <h3 className="mt-6 font-medium text-[#10233D]">Free legal help</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">{content.freeHelp.text}</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {content.freeHelp.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#B8863B] underline underline-offset-2">
                  {l.label} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#A8A398]">Checked {content.checked} against official sources.</p>
        </section>

        {/* Guides and tools */}
        {(stateGuides.length > 0 || federalGuides.length > 0 || US_TOOLS.length > 0) && (
          <section aria-labelledby="guides-h" className="mt-12 grid gap-6 md:grid-cols-2">
            <div>
              <h2 id="guides-h" className="flex items-center gap-2 font-serif text-xl text-[#10233D]">
                <ScrollText className="h-5 w-5 text-[#B8863B]" strokeWidth={1.75} />
                Guides
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {[...stateGuides, ...federalGuides].map((g) => (
                  <li key={g.slug}>
                    <Link href={`/us/guides/${g.slug}`} className="inline-flex items-center gap-1 text-[#10233D] hover:underline">
                      {g.title} <ArrowRight className="h-3.5 w-3.5 text-[#B8863B]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl text-[#10233D]">
                <Calculator className="h-5 w-5 text-[#B8863B]" strokeWidth={1.75} />
                Free tools
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {US_TOOLS.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="inline-flex items-center gap-1 text-[#10233D] hover:underline">
                      {t.name} <ArrowRight className="h-3.5 w-3.5 text-[#B8863B]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <FAQSection faqs={faqs} categoryName="" cityName={state.name} heading={`Common questions about lawyers in ${state.name}`} />

        <p className="mt-10 text-xs leading-relaxed text-[#A8A398]">
          Listings are provided for information only and are not legal advice or a recommendation. Always check a lawyer
          in the{" "}
          <a href={state.directoryUrl} className="underline underline-offset-2 hover:text-[#5B6472]" target="_blank" rel="noopener noreferrer">
            {state.directoryLabel}
          </a>{" "}
          before hiring them.
        </p>
      </div>
    </main>
  );
}
