import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Landmark, MapPin, ScrollText, ShieldCheck, Users } from "lucide-react";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { FAQSection } from "@/components/solicitors/faq-section";
import { HeroSearch } from "@/components/home/hero-search";
import { PracticeAreaGrid } from "@/components/home/practice-area-grid";
import { IE_CITIES } from "@/lib/ie/cities";
import { IE_COUNTIES, getIeCountyBySlug } from "@/lib/ie/counties";
import { IE_CHECKED_SENTENCE, IE_CITY_INFO, IE_LINKS, IE_REGULATION_ANSWER } from "@/lib/ie/content";
import { LAW_CENTRE_FINDER } from "@/lib/ie/free-help";
import { IE_LAWYERS, LSI_REGISTER_URL } from "@/lib/ie/lawyers";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

// County hub: /ie/county/cork. Built only from checked data — the county's
// towns and their courts (lib/ie/cities.ts, lib/ie/content.ts), the probate
// office and law centres (lib/ie/counties.ts) and the listed solicitors.
// Indexed only when at least one solicitor is listed in the county.

interface PageProps {
  params: Promise<{ county: string }>;
}

export function generateStaticParams() {
  return IE_COUNTIES.map((c) => ({ county: c.slug }));
}

export const dynamicParams = false;

function load(slug: string) {
  const county = getIeCountyBySlug(slug);
  if (!county) return null;
  const towns = IE_CITIES.filter((c) => c.county === county.name).sort((a, b) => a.name.localeCompare(b.name));
  const lawyers = IE_LAWYERS.filter((l) => towns.some((t) => t.slug === l.citySlug));
  // Courts named on the county's town pages, once each.
  const seen = new Set<string>();
  const courts = towns.flatMap((t) =>
    (IE_CITY_INFO[t.slug]?.courts ?? []).filter((c) => {
      const key = c.slug ?? c.name;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
  );
  return { county, towns, lawyers, courts };
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = load((await params).county);
  if (!data) return {};
  const { county, towns, lawyers } = data;
  const title = `Solicitors in County ${county.name} | Find a Solicitor by Town`;
  const description = `${lawyers.length > 0 ? `${lawyers.length} solicitors` : "Solicitors"} in Co. ${county.name} — ${list(towns.map((t) => t.name))}. Family, property, wills and probate, employment and more, plus the county's courts, probate office and free legal help.`;
  const path = `/ie/county/${county.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(lawyers.length === 0 ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, url: path, siteName: SITE_NAME, locale: "en_IE", type: "website" },
  };
}

export default async function IeCountyPage({ params }: PageProps) {
  const data = load((await params).county);
  if (!data) notFound();
  const { county, towns, lawyers, courts } = data;
  const url = `${SITE_URL}/ie/county/${county.slug}`;

  const countByTown: Record<string, number> = {};
  for (const l of lawyers) countByTown[l.citySlug] = (countByTown[l.citySlug] ?? 0) + 1;
  const firms = new Set(lawyers.map((l) => l.firmName)).size;
  const wrc = IE_CITY_INFO[towns[0]?.slug]?.wrc;

  const probateAnswer = `Grants of probate for people who lived in Co. ${county.name} are issued by ${county.probate.name}, ${county.probate.address}. It covers ${county.probate.covers}.`;
  const lawCentreAnswer =
    county.lawCentres.length > 0
      ? `The Legal Aid Board lists ${list(county.lawCentres)} for Co. ${county.name}. Civil legal aid is means-tested.`
      : `The Legal Aid Board doesn't list a law centre in Co. ${county.name}; use its law centre finder to find the nearest one. Civil legal aid is means-tested.`;
  const faqs = [
    { question: `Where do I apply for probate in County ${county.name}?`, answer: probateAnswer },
    ...(courts.length > 0
      ? [{ question: `Which courts are in County ${county.name}?`, answer: `${courts.map((c) => `${c.name} (${c.use})`).join("; ")}.` }]
      : []),
    { question: `Where can I get free legal help in County ${county.name}?`, answer: lawCentreAnswer },
    { question: `Are the solicitors listed in County ${county.name} regulated?`, answer: IE_REGULATION_ANSWER },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Solicitors in County ${county.name}`,
      url,
      inLanguage: "en-IE",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/ie` },
      about: { "@type": "AdministrativeArea", name: `County ${county.name}`, containedInPlace: { "@type": "Country", name: "Ireland" } },
      hasPart: towns.map((t) => ({ "@type": "WebPage", name: `Solicitors in ${t.name}`, url: `${SITE_URL}/ie/locations/${t.slug}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/ie/locations` },
        { "@type": "ListItem", position: 3, name: `County ${county.name}`, item: url },
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

      {/* Hero — same look as the /ie homepage */}
      <section className="px-4 pb-14 pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <BreadcrumbNav items={[{ label: "Home", href: "/ie" }, { label: "Locations", href: "/ie/locations" }, { label: `County ${county.name}` }]} />
        </div>
        <div className="mx-auto mt-6 max-w-3xl text-center sm:mt-10">
          <p className="text-sm text-[#B8863B]">{county.province}</p>
          <h1 className="mt-1 font-serif text-3xl text-[#10233D] sm:text-5xl">Find a solicitor in County {county.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-[#5B6472]">
            {lawyers.length > 0
              ? `${lawyers.length} ${lawyers.length === 1 ? "solicitor" : "solicitors"} from ${firms} ${firms === 1 ? "firm" : "firms"} in ${list(towns.filter((t) => countByTown[t.slug]).map((t) => t.name))}. ${IE_CHECKED_SENTENCE}`
              : `We haven't listed a solicitor in Co. ${county.name} yet. Below are the county's courts, probate office and free legal help.`}
          </p>
        </div>

        <div className="mt-8">
          <HeroSearch country="ie" />
        </div>

        <dl className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#5B6472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Register</dt>
            <dd>
              <a href={LSI_REGISTER_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#10233D]">
                Law Society of Ireland register
              </a>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            <dt className="sr-only">Towns</dt>
            <dd>
              {towns.length} {towns.length === 1 ? "town" : "towns"} in Co. {county.name}
            </dd>
          </div>
        </dl>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-14">
        {/* Towns */}
        <section aria-labelledby="towns-h">
          <h2 id="towns-h" className="font-serif text-2xl text-[#10233D]">
            Solicitors by town in County {county.name}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {towns.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/ie/locations/${t.slug}`}
                  className="flex items-center justify-between rounded-xl border border-[#DCD8D0] bg-white px-4 py-3 transition-colors hover:border-[#B8A488]"
                >
                  <span className="flex items-center gap-2 font-medium text-[#10233D]">
                    <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                    {t.name}
                  </span>
                  <span className="text-xs text-[#5B6472]">
                    {(countByTown[t.slug] ?? 0) > 0
                      ? `${countByTown[t.slug]} ${countByTown[t.slug] === 1 ? "solicitor" : "solicitors"}`
                      : "Coming soon"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="-mx-4 mt-4">
          <PracticeAreaGrid country="ie" heading={`Popular practice areas in County ${county.name}`} />
        </div>

        {/* Courts, probate and free help */}
        <section aria-labelledby="local-h" className="mt-8 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
          <h2 id="local-h" className="font-serif text-2xl text-[#10233D]">
            Courts, probate and free legal help in County {county.name}
          </h2>

          {courts.length > 0 && (
            <>
              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Landmark className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Courts
              </h3>
              <ul className="mt-2 divide-y divide-[#EDEAE4] rounded-xl border border-[#EDEAE4]">
                {courts.map((c) => (
                  <li key={c.slug ?? c.name} className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                    {c.slug ? (
                      <a
                        href={IE_LINKS.courtOffice(c.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-[#10233D] underline-offset-2 hover:underline"
                      >
                        {c.name}
                        <ExternalLink className="h-3 w-3 text-[#A8A398]" />
                      </a>
                    ) : (
                      <span className="font-medium text-[#10233D]">{c.name}</span>
                    )}
                    <span className="text-xs text-[#5B6472] sm:text-right">{c.use}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
            <ScrollText className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            Probate
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
            {probateAnswer}{" "}
            <a href={IE_LINKS.probateOffices} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              Probate offices
            </a>
          </p>

          {wrc && (
            <>
              <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
                <Landmark className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                Employment complaints (WRC)
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
                {wrc}{" "}
                <a href={IE_LINKS.wrc} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Workplace Relations Commission
                </a>
              </p>
            </>
          )}

          <h3 className="mt-6 flex items-center gap-2 text-sm font-medium text-[#10233D]">
            <Users className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            Free legal help
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
            {lawCentreAnswer}{" "}
            <a href={LAW_CENTRE_FINDER} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              Find a law centre
            </a>
            {" · "}
            <Link href="/ie/free-legal-help" className="underline underline-offset-2">
              More free legal help
            </Link>
          </p>

          <p className="mt-4 text-xs text-[#A8A398]">
            Court details from the Courts Service of Ireland; law centres from the Legal Aid Board. Both checked 23 October 2026.
          </p>
        </section>

        <FAQSection faqs={faqs} categoryName="" cityName={`County ${county.name}`} heading={`Common questions about solicitors in County ${county.name}`} />

        <p className="mt-10 text-xs leading-relaxed text-[#A8A398]">
          Listings are provided for information only and are not legal advice or a recommendation. Always check a solicitor on
          the{" "}
          <a href={LSI_REGISTER_URL} className="underline underline-offset-2 hover:text-[#5B6472]" target="_blank" rel="noopener noreferrer">
            Law Society of Ireland&apos;s Find a Solicitor register
          </a>{" "}
          before instructing them.
        </p>
      </div>
    </main>
  );
}
