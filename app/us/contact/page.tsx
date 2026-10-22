import type { Metadata } from "next";
import Link from "next/link";
import { Mail, PencilLine, Scale } from "lucide-react";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL, LISTINGS_EMAIL, US_LEADS_ENABLED } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";

// The postal address only appears when NEXT_PUBLIC_BUSINESS_ADDRESS is set.
export const metadata: Metadata = {
  title: "Contact Lawvoo US",
  description:
    "How to contact Lawvoo about the US directory — general questions, corrections, and listing updates for lawyers. Lawvoo is a directory, not a law firm, and can't give legal advice.",
  alternates: { canonical: "/us/contact" },
};

const link = "underline underline-offset-2 hover:text-[#10233D]";

export default function UsContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/us/contact`,
    inLanguage: "en-US",
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      ...(BUSINESS_ADDRESS ? { address: BUSINESS_ADDRESS } : {}),
    },
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/us" }, { label: "Contact" }]} />

        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Contact us</h1>
        <p className="mt-3 text-[#5B6472]">
          {BUSINESS_NAME} runs this directory from the United Kingdom. The quickest way to reach us is by email.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-2xl border border-[#DCD8D0] bg-white p-6 transition-colors hover:border-[#B8A488]">
            <Mail className="h-5 w-5 text-[#B8863B]" strokeWidth={1.5} />
            <h2 className="mt-3 font-serif text-xl text-[#10233D]">General questions and corrections</h2>
            <p className="mt-1 text-sm text-[#5B6472]">{CONTACT_EMAIL}</p>
          </a>
          <Link href="/us/listings" className="rounded-2xl border border-[#DCD8D0] bg-white p-6 transition-colors hover:border-[#B8A488]">
            <PencilLine className="h-5 w-5 text-[#B8863B]" strokeWidth={1.5} />
            <h2 className="mt-3 font-serif text-xl text-[#10233D]">Lawyers: update or remove your listing</h2>
            <p className="mt-1 text-sm text-[#5B6472]">{LISTINGS_EMAIL}</p>
          </Link>
        </div>

        {BUSINESS_ADDRESS && (
          <p className="mt-6 text-sm text-[#5B6472]">
            Postal address: {BUSINESS_NAME}, {BUSINESS_ADDRESS}
          </p>
        )}

        <section className="mt-8 flex items-start gap-3 rounded-2xl border border-[#DCD8D0] bg-white p-6 text-sm leading-relaxed text-[#5B6472]">
          <Scale className="mt-0.5 h-5 w-5 shrink-0 text-[#B8863B]" strokeWidth={1.5} />
          <p>
            <strong className="font-medium text-[#10233D]">Looking for legal help?</strong> We&apos;re a directory, not a
            law firm, so we can&apos;t advise on your case by email.{" "}
            {US_LEADS_ENABLED ? (
              <>
                <Link href="/us/leads/new" className={link}>
                  Tell us about your case
                </Link>{" "}
                (not personal injury), or{" "}
              </>
            ) : null}
            <Link href="/us/lawyers" className={link}>
              browse lawyers by area of law
            </Link>{" "}
            and contact a firm directly.
          </p>
        </section>

        <p className="mt-6 text-xs text-[#A8A398]">
          See also:{" "}
          <Link href="/us/about" className={link}>
            About Lawvoo US
          </Link>{" "}
          ·{" "}
          <Link href="/us/how-we-verify" className={link}>
            How we check listings
          </Link>{" "}
          ·{" "}
          <Link href="/us/privacy" className={link}>
            Privacy
          </Link>
        </p>
      </div>
    </main>
  );
}
