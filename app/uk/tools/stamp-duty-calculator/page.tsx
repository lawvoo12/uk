import type { Metadata } from "next";
import Link from "next/link";

import { StampDutyCalculator, type PropertyCityOption } from "@/components/tools/stamp-duty-calculator";
import { FAQSection } from "@/components/solicitors/faq-section";
import { getLawyersByCategory } from "@/lib/data/lawyers";
import { SITE_URL } from "@/lib/seo/site";
import { TOP_UK_CITIES } from "@/lib/seo/uk-cities";
import { LBTT, LTT, LTT_HIGHER, RATES_CHECKED, SDLT, type Band, type Nation } from "@/lib/tools/stamp-duty";

const PATH = "/uk/tools/stamp-duty-calculator";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator 2026 — England, Scotland, Wales & NI",
  description:
    "Work out Stamp Duty (SDLT), Scottish LBTT or Welsh LTT on a home purchase — first-time buyer relief, second homes and non-resident surcharge included. Free, 2026 rates.",
  alternates: { canonical: PATH, languages: { "en-GB": PATH, "en-IE": "/ie/tools/stamp-duty-calculator" } },
};

function nationOf(region: string): Nation {
  if (region === "Scotland") return "scotland";
  if (region === "Wales") return "wales";
  if (region === "Northern Ireland") return "northern-ireland";
  return "england";
}

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

function RateTable({ title, bands, note }: { title: string; bands: Band[]; note?: string }) {
  let from = 0;
  return (
    <div className="rounded-xl border border-[#DCD8D0] bg-white p-5">
      <h3 className="font-medium text-[#10233D]">{title}</h3>
      <table className="mt-3 w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#A8A398]">
            <th className="pb-2 font-normal">Part of the price</th>
            <th className="pb-2 text-right font-normal">Rate</th>
          </tr>
        </thead>
        <tbody className="text-[#5B6472]">
          {bands.map((b) => {
            const label =
              b.upTo === Infinity
                ? `Over ${gbp.format(from)}`
                : from === 0
                  ? `Up to ${gbp.format(b.upTo)}`
                  : `${gbp.format(from + 1)} – ${gbp.format(b.upTo)}`;
            from = b.upTo;
            return (
              <tr key={label} className="border-t border-[#EFECE6]">
                <td className="py-1.5">{label}</td>
                <td className="py-1.5 text-right">{b.rate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {note && <p className="mt-3 text-xs text-[#5B6472]">{note}</p>}
    </div>
  );
}

const FAQS = [
  {
    question: "When do I pay stamp duty?",
    answer:
      "Within 14 days of completion in England and Northern Ireland, and within 30 days in Scotland and Wales. Your conveyancing solicitor normally files the return and pays the tax for you from the funds you send before completion.",
  },
  {
    question: "Who counts as a first-time buyer?",
    answer:
      "Someone who has never owned a home — or a share of one — anywhere in the world, including one they inherited. If you're buying jointly, everyone buying must be a first-time buyer for the relief to apply.",
  },
  {
    question: "Do I pay the higher rate if I'm replacing my home?",
    answer:
      "Not if you sell your old main home before or on the same day you complete. If you buy first, you usually pay the higher rate and can claim the extra back if you sell your old main home within 3 years (36 months) — the same period in England, NI, Scotland and Wales.",
  },
  {
    question: "Is there stamp duty in Scotland and Wales?",
    answer:
      "Not Stamp Duty itself. Scotland has Land and Buildings Transaction Tax (LBTT), paid to Revenue Scotland, and Wales has Land Transaction Tax (LTT), paid to the Welsh Revenue Authority. Northern Ireland uses the same Stamp Duty Land Tax as England.",
  },
  {
    question: "Is this calculator's figure final?",
    answer:
      "It's an estimate for a straightforward residential purchase. Shared ownership, new-build leases, buying through a company, mixed-use property and several homes at once are taxed differently. Your solicitor will confirm the exact amount.",
  },
];

export default function StampDutyCalculatorPage() {
  // Cities that have at least one property solicitor listed, for the "next step" links.
  const counts: Record<string, number> = {};
  for (const l of getLawyersByCategory("property")) counts[l.citySlug] = (counts[l.citySlug] ?? 0) + 1;
  const cities: PropertyCityOption[] = TOP_UK_CITIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    nation: nationOf(c.region),
    count: counts[c.slug] ?? 0,
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Stamp Duty Calculator",
      url: `${SITE_URL}${PATH}`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/uk` },
        { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE_URL}/uk/tools` },
        { "@type": "ListItem", position: 3, name: "Stamp Duty Calculator", item: `${SITE_URL}${PATH}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      {jsonLd.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />
      ))}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-[#A8A398]">
          <Link href="/uk" className="hover:text-[#5B6472]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/uk/tools" className="hover:text-[#5B6472]">
            Free tools
          </Link>{" "}
          / <span className="text-[#5B6472]">Stamp Duty Calculator</span>
        </nav>

        <h1 className="mt-4 font-serif text-3xl text-[#10233D] sm:text-4xl">Stamp Duty Calculator</h1>
        <p className="mt-3 max-w-2xl text-[#5B6472]">
          Work out the tax on buying a home anywhere in the UK — Stamp Duty in England and Northern Ireland, LBTT in
          Scotland and LTT in Wales. Includes first-time buyer relief and the extra rates for second homes.
        </p>
        <p className="mt-2 text-xs text-[#A8A398]">Rates checked {RATES_CHECKED}.</p>

        <div className="mt-8">
          <StampDutyCalculator cities={cities} />
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[#10233D]">Current rates</h2>
          <p className="mt-2 text-sm text-[#5B6472]">
            Each rate applies only to the part of the price inside that band, not the whole price.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <RateTable
              title="England & Northern Ireland — SDLT"
              bands={SDLT}
              note="First-time buyers: 0% up to £300,000 and 5% up to £500,000 (no relief above £500,000). Second homes: +5% on every band. Non-UK residents: +2% on every band."
            />
            <RateTable
              title="Scotland — LBTT"
              bands={LBTT}
              note="First-time buyers: 0% band raised to £175,000. Second homes: Additional Dwelling Supplement of 8% of the whole price."
            />
            <RateTable title="Wales — LTT (main rates)" bands={LTT} note="No separate first-time buyer relief." />
            <RateTable title="Wales — LTT (higher rates, second homes)" bands={LTT_HIGHER} />
          </div>
          <p className="mt-4 text-xs text-[#A8A398]">
            Sources:{" "}
            <a className="underline" href="https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" target="_blank" rel="noopener noreferrer">
              GOV.UK
            </a>
            ,{" "}
            <a className="underline" href="https://revenue.scot/taxes/land-buildings-transaction-tax" target="_blank" rel="noopener noreferrer">
              Revenue Scotland
            </a>
            ,{" "}
            <a className="underline" href="https://www.gov.wales/land-transaction-tax-rates-and-bands" target="_blank" rel="noopener noreferrer">
              Welsh Revenue Authority
            </a>
            . Surcharges and higher rates don&apos;t apply to homes under £40,000.
          </p>
        </section>

        <FAQSection faqs={FAQS} categoryName="" cityName="" heading="Stamp duty questions" />

        <p className="mt-10 rounded-xl border border-[#DCD8D0] bg-white p-4 text-xs text-[#5B6472]">
          This calculator gives an estimate for a standard residential purchase and isn&apos;t tax or legal advice.
          Ask your solicitor or the tax authority to confirm the amount for your purchase.
        </p>
      </div>
    </main>
  );
}
