import type { Metadata } from "next";
import Link from "next/link";

import { CaLandTransferTaxCalculator, type CaPropertyCityOption } from "@/components/tools/ca-land-transfer-tax-calculator";
import { FAQSection } from "@/components/solicitors/faq-section";
import { getLawyersByCategory } from "@/lib/data/lawyers";
import { SITE_URL } from "@/lib/seo/site";
import { CA_CITIES } from "@/lib/ca/cities";
import { CA_PROVINCE_ORDER, type CaProvinceCode } from "@/lib/ca/provinces";
import { CA_LTT_CHECKED, CA_LTT_PROVINCES } from "@/lib/ca/land-transfer-tax";

const PATH = "/ca/tools/land-transfer-tax-calculator";

export const metadata: Metadata = {
  title: "Land Transfer Tax Calculator Canada 2026 — by Province",
  description:
    "Work out land transfer tax, property transfer tax, deed transfer tax or registration fees on a home in nine provinces, with first-time buyer relief for Ontario, Toronto, BC and PEI. Official sources linked. Free.",
  alternates: {
    canonical: PATH,
    languages: { "en-GB": "/uk/tools/stamp-duty-calculator", "en-IE": "/ie/tools/stamp-duty-calculator", "en-CA": PATH },
  },
};

/** What is charged in each province, in one or two plain sentences. Figures come from lib/ca/land-transfer-tax.ts. */
const RATES: Record<CaProvinceCode, string[]> = {
  ON: [
    "Land transfer tax: 0.5% on the first $55,000, 1% to $250,000, 1.5% to $400,000, 2% to $2 million, and 2.5% above $2 million (homes with one or two single-family residences).",
    "City of Toronto: municipal land transfer tax on top, at the same rates up to $3 million and from 4.4% to 8.6% on the part above that (rates from 1 April 2026).",
    "First-time buyers: refund of up to $4,000 from Ontario, and a rebate of up to $4,475 from Toronto.",
  ],
  BC: [
    "Property transfer tax: 1% on the first $200,000, 2% to $2 million, 3% above, and a further 2% on residential value above $3 million.",
    "First time home buyers: no tax on the first $500,000 for homes worth $835,000 or less; a partial exemption up to $860,000.",
  ],
  AB: ["Land Titles fees: $50 plus $5 for every $5,000 of value to register the transfer, and $50 plus $5 for every $5,000 borrowed to register a mortgage."],
  SK: [
    "Land Titles fees (from 15 April 2026): 0.4% of the property's value to transfer the title ($25 for values from $500.01 to $6,300; free up to $500).",
    "Mortgage registration: $200 under $250,000, $275 to $500,000, $525 to $750,000, $775 to $1 million, $1,000 above.",
  ],
  MB: [
    "Land transfer tax: nothing on the first $30,000, 0.5% to $90,000, 1% to $150,000, 1.5% to $200,000, and 2% above $200,000.",
    "Registration: $137 for a transfer and $137 for a mortgage, filed electronically (2026).",
  ],
  NS: [
    "Deed transfer tax is set by each municipality: 1.5% of the purchase price in Halifax Regional Municipality; 1%, 1.25% or 1.5% elsewhere.",
    "Buyers who are not residents of Nova Scotia: a further 10% provincial tax on residential property with three units or less (not calculated here).",
    "Land registry: $100 for each document.",
  ],
  NB: [
    "Real property transfer tax: 1% of the purchase price or the assessed value, whichever is greater.",
    "Land titles registration: $85 per parcel for the transfer, and $85 for a mortgage.",
  ],
  NL: [
    "Registry of Deeds fees: $100 for the first $500 of value plus 40 cents for each further $100 (or part) to register the deed; the same for a mortgage, up to a maximum of $5,000.",
  ],
  PE: [
    "Real property transfer tax: 1% of the purchase price or the assessed value, whichever is greater; nothing where that is $30,000 or less.",
    "First-time home buyers who qualify are exempt.",
    "Registry of Deeds: $77.25 to $463.65 for the deed, and the same scale for the mortgage.",
  ],
};

const FAQS = [
  {
    question: "Which provinces charge a land transfer tax?",
    answer:
      "Ontario and Manitoba charge land transfer tax, British Columbia charges property transfer tax, and New Brunswick and Prince Edward Island charge real property transfer tax. In Nova Scotia the deed transfer tax is set by each municipality. In Alberta, Saskatchewan and Newfoundland and Labrador the buyer pays registration fees based on the property's value. The City of Toronto charges its own tax on top of Ontario's.",
  },
  {
    question: "Who pays land transfer tax, and when?",
    answer:
      "The buyer pays it. It is due when the transfer or deed is registered, which normally happens on closing day. Your lawyer collects the money from you beforehand and pays it when registering the transfer.",
  },
  {
    question: "Do first-time home buyers get a break?",
    answer:
      "In some provinces. Ontario refunds up to $4,000 and Toronto rebates up to $4,475 of its municipal tax. British Columbia exempts the first $500,000 for homes worth $835,000 or less, with a partial exemption up to $860,000. Prince Edward Island exempts first-time buyers who qualify. Each program has its own conditions — check the official page linked in the calculator.",
  },
  {
    question: "Do foreign or out-of-province buyers pay more?",
    answer:
      "Often, yes. Ontario charges foreign nationals a 25% Non-Resident Speculation Tax and Toronto adds 10%. British Columbia charges foreign entities an additional 20% in several regions. Nova Scotia charges buyers who do not live in the province a 10% provincial deed transfer tax on residential property. These are not included in the calculator because they depend on the buyer's status.",
  },
  {
    question: "Is this calculator's figure final?",
    answer:
      "No. It is an estimate for buying one home. Exemptions, mixed-use property, more than one parcel and how a registry rounds its fees can change the amount. Your lawyer will confirm the exact figure before closing.",
  },
];

export default function CaLandTransferTaxCalculatorPage() {
  const counts: Record<string, number> = {};
  for (const l of getLawyersByCategory("property", "ca")) counts[l.citySlug] = (counts[l.citySlug] ?? 0) + 1;
  const cities: CaPropertyCityOption[] = CA_CITIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    province: c.province,
    count: counts[c.slug] ?? 0,
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Canada Land Transfer Tax Calculator",
      url: `${SITE_URL}${PATH}`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ca` },
        { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE_URL}/ca/tools` },
        { "@type": "ListItem", position: 3, name: "Land Transfer Tax Calculator", item: `${SITE_URL}${PATH}` },
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
          <Link href="/ca" className="hover:text-[#5B6472]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/ca/tools" className="hover:text-[#5B6472]">
            Free tools
          </Link>{" "}
          / <span className="text-[#5B6472]">Land Transfer Tax Calculator</span>
        </nav>

        <h1 className="mt-4 font-serif text-3xl text-[#10233D] sm:text-4xl">Land Transfer Tax Calculator</h1>
        <p className="mt-3 max-w-2xl text-[#5B6472]">
          Work out the tax and registration fees on buying a home in nine Canadian provinces — land transfer tax,
          property transfer tax, deed transfer tax or Land Titles fees, depending on where you buy. Quebec is not
          covered.
        </p>
        <p className="mt-2 text-xs text-[#A8A398]">
          Rates checked {CA_LTT_CHECKED} against each province&apos;s official source, linked in the result and in the
          table below.
        </p>

        <div className="mt-8">
          <CaLandTransferTaxCalculator cities={cities} />
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[#10233D]">What each province charges</h2>
          <p className="mt-2 text-sm text-[#5B6472]">
            Where there are bands, each rate applies only to the part of the price inside that band.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {CA_PROVINCE_ORDER.map((code) => {
              const info = CA_LTT_PROVINCES[code];
              return (
                <div key={code} className="rounded-xl border border-[#DCD8D0] bg-white p-5">
                  <h3 className="font-medium text-[#10233D]">{info.name}</h3>
                  <p className="text-xs text-[#A8A398]">{info.taxName}</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
                    {RATES[code].map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-[#5B6472]">
                    Source:{" "}
                    {info.sources.map((s, i) => (
                      <span key={s.href}>
                        {i > 0 && " · "}
                        <a className="underline" href={s.href} target="_blank" rel="noopener noreferrer">
                          {s.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-[#A8A398]">
            Rates can change with each provincial budget, and Toronto&apos;s with the city budget. Registration fees
            usually change once a year.
          </p>
        </section>

        <FAQSection faqs={FAQS} categoryName="" cityName="" heading="Land transfer tax questions (Canada)" />

        <p className="mt-10 rounded-xl border border-[#DCD8D0] bg-white p-4 text-xs text-[#5B6472]">
          This calculator gives an estimate for buying one residential property and isn&apos;t tax or legal advice. It
          does not include taxes on foreign or non-resident buyers, GST or HST on new homes, or your lawyer&apos;s
          fees. Ask your lawyer to confirm the amount for your purchase. Buying elsewhere?{" "}
          <Link href="/uk/tools/stamp-duty-calculator" className="underline">
            UK stamp duty calculator
          </Link>{" "}
          ·{" "}
          <Link href="/ie/tools/stamp-duty-calculator" className="underline">
            Irish stamp duty calculator
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
