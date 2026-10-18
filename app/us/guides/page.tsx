import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import { US_GUIDES } from "@/lib/us/guides";
import { getUsArea } from "@/lib/us/practice-areas";
import { SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

export const metadata: Metadata = {
  title: "Guides to US Law — Child Support, EEOC Charges, Deed Tax, Citizenship",
  description:
    "Free plain-English guides to US legal processes: Alabama child support, filing an EEOC charge, Alabama deed and mortgage tax, and applying for US citizenship — with official sources.",
  alternates: { canonical: "/us/guides" },
};

export default function UsGuidesIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: US_GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/us/guides/${g.slug}`,
      name: g.title,
    })),
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/us" }, { label: "Guides" }]} />
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Guides to US law</h1>
        <p className="mt-3 text-[#5B6472]">
          Plain-English guides to legal processes in the United States, starting with Alabama, with links to the
          official sources — so you know what to expect before you speak to a lawyer.
        </p>
        <div className="mt-10 flex flex-col gap-5">
          {US_GUIDES.map((g) => {
            const area = g.practiceAreaSlug ? getUsArea(g.practiceAreaSlug) : undefined;
            return (
              <Link
                key={g.slug}
                href={`/us/guides/${g.slug}`}
                className="rounded-xl border border-[#DCD8D0] bg-white p-5 transition-shadow hover:shadow-md"
              >
                {area && (
                  <span className="mb-2 inline-block rounded-full bg-[#F8F7F4] px-2.5 py-0.5 text-xs font-medium text-[#5B6472]">
                    {area.name}
                  </span>
                )}
                <h2 className="font-serif text-xl text-[#10233D]">{g.title}</h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">{g.description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#A8A398]">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {g.readingTimeMinutes} min read
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-10 text-sm text-[#5B6472]">
          Planning a home purchase?{" "}
          <Link href="/us/tools/alabama-deed-mortgage-tax-calculator" className="underline underline-offset-2">
            Alabama deed &amp; mortgage tax calculator
          </Link>
        </p>
      </div>
    </main>
  );
}
