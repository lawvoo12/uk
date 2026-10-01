import type { Metadata } from "next";
import Link from "next/link";

import { IeStampDutyCalculator, type IePropertyCityOption } from "@/components/tools/ie-stamp-duty-calculator";
import { FAQSection } from "@/components/solicitors/faq-section";
import { getLawyersByCategory } from "@/lib/data/lawyers";
import { SITE_URL } from "@/lib/seo/site";
import { IE_CITIES } from "@/lib/ie/cities";
import { IE_LINKS } from "@/lib/ie/content";
import {
  IE_BULK_HOUSES_RATE,
  IE_NON_RESIDENTIAL_RATE,
  IE_RATES_CHECKED,
  IE_RESIDENTIAL,
  VAT_RATES,
} from "@/lib/ie/stamp-duty";

const PATH = "/ie/tools/stamp-duty-calculator";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator Ireland 2026 — Residential Property",
  description:
    "Work out stamp duty on a home in Ireland: 1% up to €1m, 2% to €1.5m and 6% above, VAT removed for new homes, plus a Help to Buy estimate for first-time buyers. Free.",
  alternates: {
    canonical: PATH,
    languages: { "en-GB": "/uk/tools/stamp-duty-calculator", "en-IE": PATH },
  },
};

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const FAQS = [
  {
    question: "When is stamp duty paid on a house in Ireland?",
    answer:
      "Your solicitor files a stamp duty return with Revenue (through ROS) and pays the duty after the sale closes, using money you provide beforehand. Revenue says both are due within 44 days of the date the deed is signed; after that, surcharges and interest apply.",
  },
  {
    question: "Is there stamp duty relief for first-time buyers in Ireland?",
    answer:
      "No. First-time buyers pay the same residential rates as everyone else. First-time buyers of new homes may qualify for Help to Buy — a refund of income tax paid in the previous four years, up to the lesser of €30,000 or 10% of the price, on homes up to €500,000 with a mortgage of at least 70%.",
  },
  {
    question: "How does VAT affect stamp duty on a new home?",
    answer:
      "Stamp duty is charged on the price excluding VAT. New houses carry VAT at 13.5%. The VAT rate on qualifying new apartments was cut to 9% from 8 October 2025 until the end of 2030. The calculator removes the VAT before working out the duty.",
  },
  {
    question: "What is the 6% stamp duty rate?",
    answer:
      "Since 2 October 2024, the part of a residential price above €1.5 million is charged at 6%. It only applies to the portion above €1.5 million — the first €1 million is still 1% and the next €500,000 is 2%.",
  },
  {
    question: "Is this calculator's figure final?",
    answer:
      "It's an estimate for buying one home. Mixed-use or non-residential property (7.5%), buying 10 or more houses within 12 months (15%), farm transfers and other reliefs are taxed differently. Your solicitor will confirm the exact amount.",
  },
];

export default function IeStampDutyCalculatorPage() {
  const counts: Record<string, number> = {};
  for (const l of getLawyersByCategory("property", "ie")) counts[l.citySlug] = (counts[l.citySlug] ?? 0) + 1;
  const cities: IePropertyCityOption[] = IE_CITIES.map((c) => ({ slug: c.slug, name: c.name, count: counts[c.slug] ?? 0 }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Irish Stamp Duty Calculator",
      url: `${SITE_URL}${PATH}`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
        { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE_URL}/ie/tools` },
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

  let from = 0;
  const rows = IE_RESIDENTIAL.map((b) => {
    const label =
      b.upTo === Infinity
        ? `Over ${eur.format(from)}`
        : from === 0
          ? `Up to ${eur.format(b.upTo)}`
          : `${eur.format(from + 1)} – ${eur.format(b.upTo)}`;
    from = b.upTo;
    return { label, rate: b.rate };
  });

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      {jsonLd.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />
      ))}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-[#A8A398]">
          <Link href="/ie" className="hover:text-[#5B6472]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/ie/tools" className="hover:text-[#5B6472]">
            Free tools
          </Link>{" "}
          / <span className="text-[#5B6472]">Stamp Duty Calculator</span>
        </nav>

        <h1 className="mt-4 font-serif text-3xl text-[#10233D] sm:text-4xl">Irish Stamp Duty Calculator</h1>
        <p className="mt-3 max-w-2xl text-[#5B6472]">
          Work out the stamp duty on buying a home in the Republic of Ireland — second-hand or new (with VAT removed),
          including the €1 million and €1.5 million bands and a Help to Buy estimate for first-time buyers.
        </p>
        <p className="mt-2 text-xs text-[#A8A398]">
          Rates checked {IE_RATES_CHECKED} against{" "}
          <a className="underline" href={IE_LINKS.revenueStampDuty} target="_blank" rel="noopener noreferrer">
            Revenue
          </a>{" "}
          and{" "}
          <a className="underline" href={IE_LINKS.citizensInfoStampDuty} target="_blank" rel="noopener noreferrer">
            Citizens Information
          </a>
          .
        </p>

        <div className="mt-8">
          <IeStampDutyCalculator cities={cities} />
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[#10233D]">Current residential rates</h2>
          <p className="mt-2 text-sm text-[#5B6472]">
            Each rate applies only to the part of the price inside that band, not the whole price.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#DCD8D0] bg-white p-5">
              <h3 className="font-medium text-[#10233D]">Residential property (from 2 October 2024)</h3>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[#A8A398]">
                    <th className="pb-2 font-normal">Part of the price</th>
                    <th className="pb-2 text-right font-normal">Rate</th>
                  </tr>
                </thead>
                <tbody className="text-[#5B6472]">
                  {rows.map((r) => (
                    <tr key={r.label} className="border-t border-[#EFECE6]">
                      <td className="py-1.5">{r.label}</td>
                      <td className="py-1.5 text-right">{r.rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-[#5B6472]">
                New homes: charged on the price excluding VAT ({VAT_RATES.house}% on houses; {VAT_RATES.apartment}% on
                qualifying new apartments from 8 Oct 2025 to 31 Dec 2030). No separate first-time buyer rate.
              </p>
            </div>
            <div className="rounded-xl border border-[#DCD8D0] bg-white p-5">
              <h3 className="font-medium text-[#10233D]">Other rates and schemes</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
                <li>
                  <span className="font-medium text-[#10233D]">Non-residential property:</span> {IE_NON_RESIDENTIAL_RATE}%
                </li>
                <li>
                  <span className="font-medium text-[#10233D]">Buying 10+ houses in 12 months:</span> {IE_BULK_HOUSES_RATE}%
                  (apartments are treated differently)
                </li>
                <li>
                  <span className="font-medium text-[#10233D]">Help to Buy (first-time buyers, new homes):</span> up to the
                  lesser of €30,000 or 10% of the price, homes up to €500,000, 70%+ mortgage, until 31 Dec 2029.{" "}
                  <a className="underline" href={IE_LINKS.helpToBuy} target="_blank" rel="noopener noreferrer">
                    Revenue
                  </a>{" "}
                  ·{" "}
                  <a className="underline" href={IE_LINKS.helpToBuyCitizensInfo} target="_blank" rel="noopener noreferrer">
                    Citizens Information
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-[#A8A398]">
            Sources:{" "}
            <a className="underline" href={IE_LINKS.revenueStampDuty} target="_blank" rel="noopener noreferrer">
              Revenue — Stamp Duty rates
            </a>
            ,{" "}
            <a className="underline" href={IE_LINKS.citizensInfoStampDuty} target="_blank" rel="noopener noreferrer">
              Citizens Information — Stamp duty on property
            </a>
            ,{" "}
            <a className="underline" href={IE_LINKS.helpToBuyCitizensInfo} target="_blank" rel="noopener noreferrer">
              Citizens Information — Help to Buy
            </a>
            . Rates can change in each October Budget.
          </p>
        </section>

        <FAQSection faqs={FAQS} categoryName="" cityName="" heading="Stamp duty questions (Ireland)" />

        <p className="mt-10 rounded-xl border border-[#DCD8D0] bg-white p-4 text-xs text-[#5B6472]">
          This calculator gives an estimate for buying one residential property and isn&apos;t tax or legal advice. Ask
          your solicitor or Revenue to confirm the amount for your purchase. Looking for the UK version?{" "}
          <Link href="/uk/tools/stamp-duty-calculator" className="underline">
            UK stamp duty calculator
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
