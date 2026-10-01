import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { FAQSection } from "@/components/solicitors/faq-section";
import { IE_CITIES } from "@/lib/ie/cities";
import { CLAR_DATE, CLAR_ENTRIES, CLAR_PAGE, CLAR_PDF, CLAR_TOTAL } from "@/lib/ie/irish-language";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Solicitors Who Work Through Irish (Clár na Gaeilge)",
  description:
    "Find a solicitor who can act for you as Gaeilge. How the Law Society's Clár na Gaeilge works, your right to use Irish in court, and registered solicitors in Galway, Dundalk, Tralee, Athlone, Ennis and Letterkenny.",
  alternates: { canonical: "/ie/irish-language-solicitors" },
};

const FAQS = [
  {
    question: "What is Clár na Gaeilge?",
    answer:
      "It's the Law Society of Ireland's register of solicitors who have passed its advanced course in legal practice through Irish, and can provide legal services as Gaeilge. It's kept under the Solicitors Act 1954 and the Legal Practitioners (Irish Language) Act 2008, and updated monthly.",
  },
  {
    question: "Can I use Irish in an Irish court?",
    answer:
      "Yes. Under the Official Languages Act 2003 you can use Irish (or English) in any court case, and be heard in it. Tell the court office early so arrangements can be made, and ask your solicitor to do it for you.",
  },
  {
    question: "Does a solicitor on Clár na Gaeilge cost more?",
    answer: "Not because of the language. Fees are set by each firm — ask for a written estimate, as you would with any solicitor.",
  },
];

export default function IrishLanguageSolicitorsPage() {
  const towns = IE_CITIES.filter((c) => CLAR_ENTRIES.some((e) => e.citySlug === c.slug));
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ie` },
      { "@type": "ListItem", position: 2, name: "Irish-language solicitors", item: `${SITE_URL}/ie/irish-language-solicitors` },
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
        <BreadcrumbNav items={[{ label: "Home", href: "/ie" }, { label: "Irish-language solicitors" }]} />
        <h1 className=" font-serif text-3xl text-[#10233D] sm:text-4xl">Solicitors who work through Irish</h1>
        <p className="mt-3 max-w-2xl text-[#5B6472]">
          If you&apos;d like to deal with your legal matter as Gaeilge, look for a solicitor on the Law Society of
          Ireland&apos;s <span lang="ga">Clár na Gaeilge</span> — the official register of solicitors who can provide
          legal services through Irish. It lists {CLAR_TOTAL} people (register of {CLAR_DATE}), many of them in Dublin
          and Cork.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <a
            href={CLAR_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#10233D] px-4 py-2 font-medium text-white hover:bg-[#1C3A5E]"
          >
            Full register (PDF) <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={CLAR_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCD8D0] bg-white px-4 py-2 font-medium text-[#10233D] hover:border-[#B8A488]"
          >
            About Clár na Gaeilge <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <section aria-labelledby="towns-h" className="mt-12">
          <h2 id="towns-h" className="font-serif text-2xl text-[#10233D]">
            On the register in our towns outside Dublin and Cork
          </h2>
          <p className="mt-2 text-sm text-[#5B6472]">
            Copied from the register of {CLAR_DATE}. In-house company lawyers are left out. People move firms, so check
            the latest register and contact the firm before relying on this. For Dublin and Cork, see the full register.
          </p>
          <div className="mt-5 space-y-5">
            {towns.map((town) => (
              <div key={town.slug} className="rounded-2xl border border-[#DCD8D0] bg-white p-5">
                <h3 className="flex items-center gap-1.5 font-medium text-[#10233D]">
                  <MapPin className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
                  <Link href={`/ie/locations/${town.slug}`} className="hover:underline">
                    {town.name}
                  </Link>
                </h3>
                <ul className="mt-3 divide-y divide-[#EFECE6] text-sm">
                  {CLAR_ENTRIES.filter((e) => e.citySlug === town.slug).map((e) => (
                    <li key={e.name} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:justify-between sm:gap-4">
                      <span className="font-medium text-[#10233D]">{e.name}</span>
                      <span className="text-[#5B6472] sm:text-right">
                        {e.firm} · {e.address}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#A8A398]">
            Lawvoo isn&apos;t connected to these solicitors, and listing here isn&apos;t a recommendation. Source:{" "}
            <a href={CLAR_PDF} target="_blank" rel="noopener noreferrer" className="underline">
              Law Society of Ireland, Clár na Gaeilge
            </a>
            . Is this you and you&apos;d like it removed?{" "}
            <Link href="/ie/listings" className="underline">
              Contact us
            </Link>
            .
          </p>
        </section>

        <FAQSection faqs={FAQS} categoryName="" cityName="" heading="Questions about using Irish" />
      </div>
    </main>
  );
}
