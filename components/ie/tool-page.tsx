import Link from "next/link";

import { FAQSection } from "@/components/solicitors/faq-section";
import type { FAQItem } from "@/lib/seo/faq-content";
import { SITE_URL } from "@/lib/seo/site";

/** Page frame shared by the Irish calculators: breadcrumb, JSON-LD, sources, FAQs, disclaimer. */
export function IeToolPage({
  path,
  name,
  heading,
  intro,
  checked,
  sources,
  faqs,
  disclaimer,
  children,
  extra,
}: {
  path: string;
  name: string;
  heading: string;
  intro: string;
  checked: string;
  sources: { label: string; href: string }[];
  faqs: FAQItem[];
  disclaimer: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name,
      url: `${SITE_URL}${path}`,
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
        { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${path}` },
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
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-[#A8A398]">
          <Link href="/ie" className="hover:text-[#5B6472]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/ie/tools" className="hover:text-[#5B6472]">
            Free tools
          </Link>{" "}
          / <span className="text-[#5B6472]">{name}</span>
        </nav>

        <h1 className="mt-4 font-serif text-3xl text-[#10233D] sm:text-4xl">{heading}</h1>
        <p className="mt-3 max-w-2xl text-[#5B6472]">{intro}</p>
        <p className="mt-2 text-xs text-[#A8A398]">
          Rules checked {checked} against{" "}
          {sources.map((s, i) => (
            <span key={s.href}>
              {i > 0 && (i === sources.length - 1 ? " and " : ", ")}
              <a className="underline" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </span>
          ))}
          .
        </p>

        <div className="mt-8">{children}</div>

        {extra}

        <FAQSection faqs={faqs} categoryName="" cityName="" heading="Questions" />

        <p className="mt-10 rounded-xl border border-[#DCD8D0] bg-white p-4 text-xs text-[#5B6472]">{disclaimer}</p>
      </div>
    </main>
  );
}
