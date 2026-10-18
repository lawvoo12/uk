import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";

import { US_GUIDES, getUsGuideBySlug } from "@/lib/us/guides";
import { getUsArea } from "@/lib/us/practice-areas";
import { US_REGULATORS } from "@/lib/us/regulators";
import { US_LEADS_ENABLED } from "@/lib/config";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return US_GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getUsGuideBySlug(slug);
  if (!guide) return {};
  const path = `/us/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt ?? guide.publishedAt,
    },
  };
}

export default async function UsGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getUsGuideBySlug(slug);
  if (!guide) notFound();

  const area = guide.practiceAreaSlug ? getUsArea(guide.practiceAreaSlug) : undefined;
  const isPi = guide.practiceAreaSlug === "personal-injury";
  const url = `${SITE_URL}/us/guides/${guide.slug}`;
  const others = US_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt ?? guide.publishedAt,
    inLanguage: "en-US",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/us` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/us/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-2xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/us" }, { label: "Guides", href: "/us/guides" }, { label: guide.title }]} />
        {area && (
          <span className="mb-3 inline-block rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-[#5B6472]">
            {area.name} · United States
          </span>
        )}
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">{guide.title}</h1>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#A8A398]">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
          {guide.readingTimeMinutes} min read · Updated{" "}
          {new Date(guide.updatedAt ?? guide.publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 text-[#333B45]">
          {guide.body.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2 key={i} className="mt-4 font-serif text-xl text-[#10233D]">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="list-disc space-y-1.5 pl-5 text-[#5B6472]">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="leading-relaxed text-[#5B6472]">
                {block.text}
              </p>
            );
          })}
        </div>

        <section className="mt-10 rounded-xl border border-[#DCD8D0] bg-white p-5">
          <h2 className="text-sm font-medium text-[#10233D]">Useful next steps</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {guide.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="inline-flex items-center gap-1 font-medium text-[#B8863B] hover:underline">
                  {r.label} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
          {!isPi && US_LEADS_ENABLED && (
            <Link
              href={`/us/leads/new${guide.practiceAreaSlug ? `?category=${guide.practiceAreaSlug}` : ""}`}
              className="mt-4 inline-flex rounded-lg bg-[#10233D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]"
            >
              Tell us about your case
            </Link>
          )}
        </section>

        <section className="mt-6 text-xs text-[#5B6472]">
          <h2 className="font-medium text-[#10233D]">Sources</h2>
          <ul className="mt-2 space-y-1">
            {guide.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2">
                  {s.label} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 text-xs leading-relaxed text-[#A8A398]">
          This guide is general information, not legal advice. In Alabama, check any lawyer on the{" "}
          <a
            href={US_REGULATORS.ASB.directoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#5B6472]"
          >
            Alabama State Bar&apos;s Find a Member search
          </a>{" "}
          before hiring them.
        </p>

        <section className="mt-10">
          <h2 className="font-serif text-lg text-[#10233D]">More guides</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {others.map((g) => (
              <li key={g.slug}>
                <Link href={`/us/guides/${g.slug}`} className="underline underline-offset-2 hover:text-[#10233D]">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
