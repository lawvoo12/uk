import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { CONTACT_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";
import { US_CONTENT_CHECKED } from "@/lib/us/content";
import { US_PAGE_UPDATED } from "@/lib/us/page-dates";
import { checkedDateIso } from "@/lib/us/indexing";
import { US_STATE_ORDER, US_STATES } from "@/lib/us/states";

// The method described here must match what is actually done when a lawyer
// or a guide is added (see the header comments in lib/us/lawyers.ts and
// lib/us/guides.ts). Change both together.
export const metadata: Metadata = {
  title: "How We Check Listings and Guides (US)",
  description:
    "How Lawvoo checks US lawyers on the state bar directory, where listing details come from, how legal facts in guides are checked against official sources, and how to report a mistake.",
  alternates: { canonical: "/us/how-we-verify" },
};

const link = "underline underline-offset-2 hover:text-[#10233D]";

export default function UsHowWeVerifyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How we check listings and guides",
    url: `${SITE_URL}/us/how-we-verify`,
    inLanguage: "en-US",
    dateModified: checkedDateIso(US_PAGE_UPDATED["how-we-verify"]),
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/us" }, { label: "How we check listings" }]} />

        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">How we check listings and guides</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {US_PAGE_UPDATED["how-we-verify"]}</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">1. Where listing details come from</h2>
            <p>
              Each lawyer&apos;s name, role, office address, practice areas and short description come from the
              lawyer&apos;s profile on their firm&apos;s own website. Every profile on Lawvoo links to that source page,
              marked &quot;Source profile&quot;. We don&apos;t list virtual, co-working or appointment-only offices.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">2. The state bar check</h2>
            <p>
              Lawyers in each state are licensed through the state bar or the state&apos;s highest court. Before a
              lawyer is added, we look them up on the state&apos;s public lawyer directory:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {US_STATE_ORDER.flatMap((c) => US_STATES[c] ?? []).map((s) => (
                <li key={s.code}>
                  {s.name}:{" "}
                  <a href={s.directoryUrl} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.directoryLabel}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              A lawyer is only listed if they can be found there. Each profile shows the date of the check. A listing
              is a snapshot — lawyers move firms and their status can change — so please check the lawyer on the
              state bar directory yourself before you hire them.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">3. What we don&apos;t publish</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>No star ratings, reviews or testimonials — and we never write them.</li>
              <li>No &quot;best&quot; or &quot;top-rated&quot; badges. We don&apos;t rank lawyers by quality.</li>
              <li>Years of experience only when the firm publishes the figure; otherwise &quot;Not published&quot;.</li>
              <li>No paid placement. Listed firms haven&apos;t paid to appear and can&apos;t pay to be shown higher.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">4. Legal facts in our guides and pages</h2>
            <p>
              Legal facts on our US pages — deadlines, fees, tax rates, which court handles what — are read on official
              sources such as federal agencies (USCIS, the EEOC, the Department of Labor, the Justice Department&apos;s
              immigration courts), state courts and agencies, and county probate offices. Each guide and tool lists its
              sources and the date it was checked; the state pages were last checked on {US_CONTENT_CHECKED}.
            </p>
            <p className="mt-3">
              If a figure can&apos;t be confirmed on an official source, we leave it out and link to the official page
              instead. Our guides are general information, not legal advice.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">5. Reporting a mistake</h2>
            <p>
              If you spot something wrong, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Correction (US)")}`} className={link}>
                {CONTACT_EMAIL}
              </a>{" "}
              with the page link and we&apos;ll check it and correct it. Lawyers can{" "}
              <Link href="/us/listings" className={link}>
                update or remove their listing
              </Link>{" "}
              at any time.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
