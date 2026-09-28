import type { Metadata } from "next";
import Link from "next/link";

import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using ${BUSINESS_NAME}'s solicitor directory and enquiry form.`,
  alternates: { canonical: "/uk/terms" },
};

const LAST_UPDATED = "28 September 2026";
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#10233D]">Terms of Use</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">1. About these terms</h2>
            <p>
              {SITE_HOST} (the &quot;site&quot;) is run by {BUSINESS_NAME} (&quot;we&quot;, &quot;us&quot;). These
              terms apply when you use the site or send an enquiry. Please read them with our{" "}
              <Link href="/uk/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
                Privacy Policy
              </Link>
              . Contact: <Mail />
              {BUSINESS_ADDRESS && <>, {BUSINESS_ADDRESS}</>}.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">2. What we are — and what we are not</h2>
            <p>
              {BUSINESS_NAME} is a directory and enquiry service. <strong>We are not a law firm, we don&apos;t give
              legal advice, and we are not regulated by the SRA or any law society.</strong> Nothing on the site is
              legal advice. Any legal work is agreed directly between you and a solicitor firm, on that firm&apos;s
              own terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">3. The listings</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Listings are based on information the firms publish and on public registers: the{" "}
                <Ext href="https://www.sra.org.uk/consumers/register/">SRA register</Ext> (England &amp; Wales), the{" "}
                <Ext href="https://www.lawscot.org.uk/find-a-solicitor/">Law Society of Scotland</Ext> and the{" "}
                <Ext href="https://lawsoc-ni.org/using-a-solicitor/find-a-solicitor">Law Society of Northern Ireland</Ext>. We
                check them when we add them, but details can change — always confirm a firm on its regulator&apos;s
                register before you instruct it.
              </li>
              <li>
                A firm appearing on the site does not mean it has partnered with us or recommended us, unless we say
                so. We don&apos;t judge the quality of any firm&apos;s work.
              </li>
              <li>
                Listings are not ranked by payment. If we ever show paid or featured listings, we will label them
                clearly.
              </li>
              <li>
                Firms can ask us to correct or remove a listing — see{" "}
                <Link href="/uk/listings" className="underline underline-offset-2 hover:text-[#10233D]">
                  update or remove a listing
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">4. Sending an enquiry</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Sending an enquiry is free, and you don&apos;t have to instruct any solicitor.</li>
              <li>
                We pass your enquiry to one solicitor firm that covers your case — the firm you chose, if any, or a
                firm that subscribes to {BUSINESS_NAME}. Firms pay us a subscription for this service; it doesn&apos;t
                change what the firm charges you.
              </li>
              <li>
                We can&apos;t promise a firm will contact you, take on your case, or reply within a set time. If a
                deadline applies to your matter (for example a court or tribunal time limit), don&apos;t rely on us —
                contact a solicitor directly.
              </li>
              <li>Please give accurate details, and don&apos;t send an enquiry on someone else&apos;s behalf without their permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">5. Using the site fairly</h2>
            <p>
              Don&apos;t send spam, false or abusive enquiries, try to break the site&apos;s security, or copy or
              scrape the listings in bulk. We may block use that breaks these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">6. Our responsibility to you</h2>
            <p>
              We take reasonable care to keep the site accurate and working, but we can&apos;t guarantee it will
              always be available or error-free. We are not responsible for the advice, work, fees or conduct of any
              solicitor firm — that is between you and the firm.
            </p>
            <p className="mt-2">
              Nothing in these terms limits our liability where it would be unlawful to do so, including for death
              or personal injury caused by our negligence, or for fraud. Your rights as a consumer under the
              Consumer Rights Act 2015 are not affected.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">7. Complaints</h2>
            <p>
              For complaints about the site or how we handled your enquiry, email <Mail />. For a complaint about a
              solicitor firm, use the firm&apos;s own complaints procedure first. If it isn&apos;t resolved:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                England &amp; Wales: the <Ext href="https://www.legalombudsman.org.uk/">Legal Ombudsman</Ext>
              </li>
              <li>
                Scotland: the{" "}
                <Ext href="https://www.scottishlegalcomplaints.org.uk/">Scottish Legal Complaints Commission</Ext>
              </li>
              <li>
                Northern Ireland: the <Ext href="https://lawsoc-ni.org/using-a-solicitor/making-a-complaint">Law Society of Northern Ireland</Ext>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">8. Law and courts</h2>
            <p>
              These terms are governed by the law of England and Wales. If you live in Scotland or Northern Ireland,
              you can also bring a claim in your local courts, and your local consumer law still protects you.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">9. Changes</h2>
            <p>
              We may update these terms. The version on this page, with the date above, is the one that applies.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
