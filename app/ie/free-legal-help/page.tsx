import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, Phone } from "lucide-react";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { FAQSection } from "@/components/solicitors/faq-section";
import { IE_CITIES } from "@/lib/ie/cities";
import { FREE_HELP, LAW_CENTRE_FINDER, NEAREST_LAW_CENTRE } from "@/lib/ie/free-help";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Free Legal Help in Ireland — Legal Aid, FLAC & More",
  description:
    "Where to get free or low-cost legal help in Ireland: Legal Aid Board law centres, FLAC, Citizens Information, MABS, the WRC and the RTB — with the nearest law centre for 20 towns.",
  alternates: { canonical: "/ie/free-legal-help" },
};

const FAQS = [
  {
    question: "Can I get free legal aid in Ireland?",
    answer:
      "Civil legal aid comes from the Legal Aid Board. It's means-tested: your income and assets are assessed, and most people pay a contribution towards the cost. It mainly covers family law, but also some other civil cases. Criminal legal aid is granted separately by the courts.",
  },
  {
    question: "Where can I get free legal advice?",
    answer:
      "FLAC runs a free telephone information line (01 906 10 10) and free legal advice appointments with Citizens Information services. Citizens Information (0818 07 4000) can explain your rights and point you to the right service.",
  },
  {
    question: "Do I need a solicitor for a WRC complaint or an injury claim?",
    answer:
      "No. You can make a complaint to the Workplace Relations Commission, or apply to the Injuries Resolution Board, yourself. Many people still use a solicitor for complex cases — ask for a written estimate of fees first.",
  },
];

export default function FreeLegalHelpPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
      { "@type": "ListItem", position: 2, name: "Free legal help", item: `${SITE_URL}/ie/free-legal-help` },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-4xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/ie" }, { label: "Free legal help" }]} />
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Free and low-cost legal help in Ireland</h1>
        <p className="mt-3 max-w-2xl text-[#5B6472]">
          Can&apos;t afford a solicitor, or not sure you need one yet? These public and not-for-profit services give free
          information, advice or legal aid. Lawvoo isn&apos;t connected to any of them.
        </p>
        <p className="mt-2 text-xs text-[#A8A398]">Details checked 30 September 2026.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FREE_HELP.map((s) => (
            <section key={s.name} className="rounded-2xl border border-[#DCD8D0] bg-white p-5">
              <h2 className="font-serif text-lg text-[#10233D]">{s.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">{s.what}</p>
              <div className="mt-3 flex flex-col gap-1 text-sm">
                {s.phone && (
                  <span className="inline-flex items-center gap-1.5 text-[#10233D]">
                    <Phone className="h-3.5 w-3.5 text-[#B8863B]" strokeWidth={1.75} />
                    {s.phone}
                  </span>
                )}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#10233D] underline underline-offset-2"
                >
                  Website <ExternalLink className="h-3 w-3 text-[#A8A398]" />
                </a>
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="centres-h" className="mt-12">
          <h2 id="centres-h" className="font-serif text-2xl text-[#10233D]">
            Nearest Legal Aid Board law centre
          </h2>
          <p className="mt-2 text-sm text-[#5B6472]">
            For the towns we cover. Check opening times and how to apply on the{" "}
            <a href={LAW_CENTRE_FINDER} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              Legal Aid Board&apos;s law centre finder
            </a>
            .
          </p>
          <ul className="mt-4 divide-y divide-[#EFECE6] rounded-xl border border-[#DCD8D0] bg-white">
            {IE_CITIES.map((c) => (
              <li key={c.slug} className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:gap-4">
                <Link
                  href={`/ie/locations/${c.slug}`}
                  className="inline-flex w-36 shrink-0 items-center gap-1.5 font-medium text-[#10233D] hover:underline"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#B8863B]" strokeWidth={1.75} />
                  {c.name}
                </Link>
                <span className="text-[#5B6472]">{NEAREST_LAW_CENTRE[c.slug]}</span>
              </li>
            ))}
          </ul>
        </section>

        <FAQSection faqs={FAQS} categoryName="" cityName="" heading="Questions about free legal help" />

        <p className="mt-10 text-sm text-[#5B6472]">
          Prefer a private solicitor?{" "}
          <Link href="/ie/solicitors" className="underline underline-offset-2">
            Browse solicitors in Ireland
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
