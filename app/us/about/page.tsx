import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL, US_LEADS_ENABLED } from "@/lib/config";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { US_PAGE_UPDATED } from "@/lib/us/page-dates";
import { US_STATE_ORDER, US_STATES } from "@/lib/us/states";

// Only true statements about Lawvoo go on this page — no invented team,
// history, awards or numbers. Keep it in step with /us/how-we-verify.
export const metadata: Metadata = {
  title: "About Lawvoo US",
  description:
    "Lawvoo is a free directory of lawyers in the United States. Who runs it, how listings are chosen and checked, and how Lawvoo is paid for — no paid rankings, no made-up reviews.",
  alternates: { canonical: "/us/about" },
};

const link = "underline underline-offset-2 hover:text-[#10233D]";

export default function UsAboutPage() {
  const states = US_STATE_ORDER.flatMap((c) => US_STATES[c]?.name ?? []).join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/us/about`,
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
        <BreadcrumbNav items={[{ label: "Home", href: "/us" }, { label: "About" }]} />

        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">About {SITE_NAME} US</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {US_PAGE_UPDATED.about}</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">What Lawvoo is</h2>
            <p>
              {SITE_NAME} is a free directory of lawyers. It helps you find a lawyer by area of law and city, see where
              their office is and what they work on, and check them on the state bar&apos;s public directory before you
              get in touch. In the United States we currently list lawyers in {states}, and we add states and lawyers
              over time.
            </p>
            <p className="mt-3">
              {SITE_NAME} is not a law firm. We don&apos;t give legal advice, we don&apos;t recommend one lawyer over
              another, and using the site doesn&apos;t create a lawyer-client relationship with us.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">Who runs it</h2>
            <p>
              {BUSINESS_NAME === SITE_NAME ? `${SITE_NAME} is run from the United Kingdom.` : `${SITE_NAME} is run by ${BUSINESS_NAME}, based in the United Kingdom.`} Lawvoo also runs
              directories for the{" "}
              <Link href="/uk" className={link}>
                UK
              </Link>
              ,{" "}
              <Link href="/ie" className={link}>
                Ireland
              </Link>{" "}
              and{" "}
              <Link href="/ca" className={link}>
                Canada
              </Link>
              . You can reach us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
                {CONTACT_EMAIL}
              </a>
              {BUSINESS_ADDRESS ? <>, or by post at {BUSINESS_ADDRESS}</> : null} — see{" "}
              <Link href="/us/contact" className={link}>
                Contact
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">How listings work</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Names, roles, office addresses and practice areas come from each firm&apos;s own website.</li>
              <li>
                Before a lawyer is added, we look them up on the state bar&apos;s public directory, and each profile
                shows the date of that check.
              </li>
              <li>We don&apos;t publish star ratings or reviews, and we never write them ourselves.</li>
              <li>
                Years of experience are shown only when the firm publishes them; otherwise the profile says &quot;Not
                published&quot;.
              </li>
              <li>
                Lists are sorted by published years of experience, then by firm name. No one can pay to be listed
                higher.
              </li>
            </ul>
            <p className="mt-3">
              The full method is on{" "}
              <Link href="/us/how-we-verify" className={link}>
                How we check listings and guides
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">How Lawvoo is paid for</h2>
            <p>
              Listed lawyers and firms are not Lawvoo partners. They haven&apos;t paid to appear, and they don&apos;t pay
              us for enquiries or referrals. {US_LEADS_ENABLED ? "Sending an enquiry through Lawvoo is free for you. " : ""}
              We don&apos;t take personal injury enquiries in the United States — for those, contact the firm directly.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">Corrections</h2>
            <p>
              If something on a listing or a guide is wrong, email us and we&apos;ll fix it. Lawyers can ask us to
              update or remove their listing at any time —{" "}
              <Link href="/us/listings" className={link}>
                update or remove a listing
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
