import type { Metadata } from "next";
import Link from "next/link";

import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL, US_LEADS_ENABLED } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";
import { US_STATES } from "@/lib/us/states";
import { US_PAGE_UPDATED } from "@/lib/us/page-dates";

export const metadata: Metadata = {
  title: "Terms of Use (US)",
  description: `Terms for using ${BUSINESS_NAME}'s United States lawyer directory.`,
  alternates: { canonical: "/us/terms" },
};

const LAST_UPDATED = US_PAGE_UPDATED.terms;
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Mail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:text-[#10233D]">
      {CONTACT_EMAIL}
    </a>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#10233D]">
      {children}
    </a>
  );
}

export default function UsTermsPage() {
  const states = Object.values(US_STATES);

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#10233D]">Terms of Use — United States</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">1. About these terms</h2>
            <p>
              These terms apply when you use the United States pages of {SITE_HOST} (addresses starting {SITE_HOST}/us). The site
              is run by {BUSINESS_NAME} (&quot;we&quot;, &quot;us&quot;), a business based in the United Kingdom. Please
              read them with our{" "}
              <Link href="/us/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
                Privacy Policy
              </Link>
              . Contact: <Mail />
              {BUSINESS_ADDRESS && <>, {BUSINESS_ADDRESS}</>}.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">2. What we are — and what we are not</h2>
            <p>
              {BUSINESS_NAME} is a directory.{" "}
              <strong>
                We are not a law firm, we don&apos;t give legal advice, and we are not licensed or regulated by any
                state bar. We are not a lawyer referral service.
              </strong>{" "}
              Nothing on the site is legal advice, and using it doesn&apos;t create a lawyer-client relationship with us.
              Any legal work is agreed directly between you and a law firm, on that firm&apos;s own terms and fees.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">3. The listings</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Listings are based on information the firms publish themselves. Each lawyer was also checked in the
                state bar&apos;s public directory before being listed, and the date is shown on their
                profile. Details change and people move firms — always check a lawyer in the directory yourself before
                you hire them.
              </li>
              <li>
                A firm appearing on the site does not mean it has partnered with us or endorsed us. We don&apos;t judge
                the quality of any firm&apos;s work, we don&apos;t publish ratings or reviews, and we don&apos;t call
                any lawyer a specialist or expert ourselves.
              </li>
              <li>Listings are free and are not ranked by payment. Firms do not pay us to appear.</li>
              <li>
                Firms can ask us to correct or remove a listing — see{" "}
                <Link href="/us/listings" className="underline underline-offset-2 hover:text-[#10233D]">
                  update or remove a listing
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">4. Contacting a firm</h2>
            {US_LEADS_ENABLED ? (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Sending an enquiry is free, and you don&apos;t have to hire any lawyer.</li>
                <li>
                  If you chose a firm, we pass your enquiry to that firm only. If you didn&apos;t, we name a listed firm
                  to you first and only pass it on if you agree.
                </li>
                <li>
                  We do not receive any fee, commission or other reward from lawyers for referring you or for passing on
                  your enquiry.
                </li>
                <li>We don&apos;t take personal injury enquiries in the US. For an injury matter, contact a firm directly.</li>
                <li>We can&apos;t promise a firm will contact you, take on your case or reply within a set time.</li>
                <li>
                  Please give accurate details, and don&apos;t send an enquiry on someone else&apos;s behalf without their
                  permission.
                </li>
              </ul>
            ) : (
              <p>
                Our enquiry form is not open in the US at the moment. Each listing links to the firm&apos;s own website so
                that you can contact the firm directly. We do not receive any fee, commission or other reward from
                lawyers for referring you to them.
              </p>
            )}
            <p className="mt-3">
              <strong>Time limits can be short.</strong> Some legal deadlines are short, and they differ from state to
              state. Don&apos;t rely on this site to meet a deadline — contact a lawyer directly and
              promptly.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">5. Using the site fairly</h2>
            <p>
              Don&apos;t send spam, false or abusive enquiries, try to break the site&apos;s security, or copy or scrape
              the listings in bulk. We may block use that breaks these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">6. Our responsibility to you</h2>
            <p>
              We take reasonable care to keep the site accurate and working, but we can&apos;t guarantee it will always be
              available or error-free. The legal information on the site is general, changes over time and is not a
              substitute for advice about your situation. We are not responsible for the advice, work, fees or conduct of
              any law firm — that is between you and the firm.
            </p>
            <p className="mt-2">
              Nothing in these terms limits our liability where it would be unlawful to do so, or takes away rights you
              have under the consumer protection law of your state.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">7. Complaints</h2>
            <p>
              For complaints about the site or how we handled your information, email <Mail />. For a complaint about a
              lawyer, speak to the firm first. If it isn&apos;t resolved:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {states.map((state) => (
                <li key={state.code}>
                  in {state.name}, {state.termsFragment} —{" "}
                  <Ext href={state.directoryUrl}>check a lawyer in its public directory</Ext>.
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">8. Law and courts</h2>
            <p>
              These terms are governed by the law of England and Wales. If you live in the United States, you keep the
              protection of any consumer protection laws of your state that can&apos;t be excluded by agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">9. Changes</h2>
            <p>We may update these terms. The version on this page, with the date above, is the one that applies.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
