import type { Metadata } from "next";
import Link from "next/link";

import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Terms of Use (Ireland)",
  description: `Terms for using ${BUSINESS_NAME}'s Ireland solicitor directory and enquiry form.`,
  alternates: { canonical: "/ie/terms" },
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

export default function IeTermsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#10233D]">Terms of Use — Ireland</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">1. About these terms</h2>
            <p>
              These terms apply when you use the Ireland pages of {SITE_HOST} (addresses starting {SITE_HOST}/ie) or send
              an enquiry through them. The site is run by {BUSINESS_NAME} (&quot;we&quot;, &quot;us&quot;), a business
              based in the United Kingdom. Please read them with our{" "}
              <Link href="/ie/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
                Privacy Policy
              </Link>
              . Contact: <Mail />
              {BUSINESS_ADDRESS && <>, {BUSINESS_ADDRESS}</>}.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">2. What we are — and what we are not</h2>
            <p>
              {BUSINESS_NAME} is a directory and enquiry service.{" "}
              <strong>
                We are not a firm of solicitors, we don&apos;t give legal advice, and we are not regulated by the Legal
                Services Regulatory Authority or the Law Society of Ireland.
              </strong>{" "}
              Nothing on the site is legal advice. Any legal work is agreed directly between you and a solicitor firm, on
              that firm&apos;s own terms and fees.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">3. The listings</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Listings are based on information the firms publish themselves. Details can change — always check a firm
                on the{" "}
                <Ext href="https://www.lawsociety.ie/find-a-solicitor/Solicitor-Firm-Search/">
                  Law Society of Ireland&apos;s Find a Solicitor register
                </Ext>{" "}
                before you instruct it.
              </li>
              <li>
                A firm appearing on the site does not mean it has partnered with us or endorsed us. We don&apos;t judge
                the quality of any firm&apos;s work, and we don&apos;t describe any solicitor as a specialist.
              </li>
              <li>Listings are free and are not ranked by payment. Firms do not pay us to appear.</li>
              <li>
                Firms can ask us to correct or remove a listing — see{" "}
                <Link href="/ie/listings" className="underline underline-offset-2 hover:text-[#10233D]">
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
                If you chose a firm, we pass your enquiry to that firm only. If you didn&apos;t, we name a listed firm to
                you first and only pass it on if you agree.
              </li>
              <li>We do not receive any fee, commission or other reward from solicitors in Ireland for passing on your enquiry.</li>
              <li>
                We don&apos;t take personal injury enquiries in Ireland. For an injury matter, contact a firm directly or
                apply to the <Ext href="https://www.injuries.ie/">Injuries Resolution Board</Ext>.
              </li>
              <li>
                We can&apos;t promise a firm will contact you, take on your case or reply within a set time. Time limits
                can be short — for example, usually six months for Workplace Relations Commission complaints and two years
                for most injury claims — so don&apos;t rely on us to meet a deadline. Contact a solicitor directly.
              </li>
              <li>
                Please give accurate details, and don&apos;t send an enquiry on someone else&apos;s behalf without their
                permission.
              </li>
            </ul>
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
              available or error-free. We are not responsible for the advice, work, fees or conduct of any solicitor firm
              — that is between you and the firm.
            </p>
            <p className="mt-2">
              Nothing in these terms limits our liability where it would be unlawful to do so, including for death or
              personal injury caused by our negligence, or for fraud. Your statutory rights as a consumer in Ireland,
              including under the Consumer Rights Act 2022, are not affected.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">7. Complaints</h2>
            <p>
              For complaints about the site or how we handled your enquiry, email <Mail />. For a complaint about a
              solicitor, use the firm&apos;s own complaints procedure first. If it isn&apos;t resolved:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                the <Ext href="https://www.lsra.ie/">Legal Services Regulatory Authority (LSRA)</Ext> deals with
                complaints about solicitors&apos; services, excessive costs and misconduct;
              </li>
              <li>
                the <Ext href="https://www.lawsociety.ie/">Law Society of Ireland</Ext> keeps the Roll of Solicitors and
                the Find a Solicitor register, where you can check that someone is a practising solicitor;
              </li>
              <li>
                for data protection complaints, the <Ext href="https://www.dataprotection.ie/">Data Protection Commission</Ext>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">8. Law and courts</h2>
            <p>
              These terms are governed by the law of England and Wales. If you live in Ireland, you keep the protection of
              the mandatory consumer laws of Ireland, and you can bring a claim in the Irish courts.
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
