import type { Metadata } from "next";
import Link from "next/link";

import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL, ICO_NUMBER } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BUSINESS_NAME} collects, uses and protects your personal data.`,
  alternates: { canonical: "/uk/privacy" },
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#10233D]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">1. Who we are</h2>
            <p>
              {BUSINESS_NAME} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) runs {SITE_HOST}, a directory of
              solicitor firms in England, Wales, Scotland and Northern Ireland, with an enquiry form that puts
              members of the public in touch with solicitor firms. We are the <strong>data controller</strong> for
              the personal data described in this policy under the UK GDPR and the Data Protection Act 2018.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Email: <Mail />
              </li>
              {BUSINESS_ADDRESS && <li>Postal address: {BUSINESS_ADDRESS}</li>}
              {ICO_NUMBER && <li>ICO registration number: {ICO_NUMBER}</li>}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">2. What data we collect</h2>
            <p>
              <strong>If you send an enquiry</strong> through our form, we collect:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>your name, email address and phone number;</li>
              <li>your postcode or town;</li>
              <li>the area of law, a short title and a description of your legal matter, and how urgent it is;</li>
              <li>the solicitor you asked about, if you came from a &quot;Request a callback&quot; button;</li>
              <li>the date and time you sent it.</li>
            </ul>
            <p className="mt-3">
              <strong>If you just browse the site</strong>, we don&apos;t ask for any personal details. When the
              enquiry form is closed, we count clicks on &quot;Request a callback&quot; and &quot;Find a
              solicitor&quot; — this records only the time, which button was used and which listing it was for.
              It does not record your name, IP address or any cookie.
            </p>
            <p className="mt-3">
              Like any website, our hosting provider automatically handles technical data such as your IP address
              and browser type so that pages can be delivered and protected against attacks.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">3. How we use your data, and our legal basis</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>To pass your enquiry to a solicitor firm and let them contact you</strong> — basis: your{" "}
                <strong>consent</strong> (Article 6(1)(a) UK GDPR), which you give by ticking the box on the form.
              </li>
              <li>
                <strong>To contact you about your enquiry</strong> (for example, to check details or tell you it
                has been passed on) — basis: your consent.
              </li>
              <li>
                <strong>To stop spam and misuse of the form, and keep the site secure</strong> — basis: our{" "}
                <strong>legitimate interests</strong> (Article 6(1)(f)).
              </li>
              <li>
                <strong>To keep records we are required to keep by law</strong> — basis:{" "}
                <strong>legal obligation</strong> (Article 6(1)(c)).
              </li>
            </ul>
            <p className="mt-3">
              We do not use your enquiry for marketing, and we don&apos;t make automated decisions about you.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">4. Sensitive information</h2>
            <p>
              Case descriptions can include sensitive (&quot;special category&quot;) information — for example about
              your health after an injury, your immigration status, or family matters. We only use it to pass your
              enquiry to a solicitor firm, and we rely on your <strong>explicit consent</strong> (Article 9(2)(a)
              UK GDPR), given when you tick the box and send the form. Please include only what a solicitor needs to
              understand your situation.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">5. Who we share your data with</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>A solicitor firm.</strong> We send your enquiry to one solicitor firm that covers your area
                of law — the firm you asked about if you chose one, or otherwise a firm that subscribes to{" "}
                {BUSINESS_NAME} to receive enquiries. That firm becomes a separate data controller for your details
                and will handle them under its own privacy notice and professional rules. We tell you which firm has
                your details if you ask. We don&apos;t send your enquiry to a different firm without asking you
                first.
              </li>
              <li>
                <strong>Google</strong> — enquiries are stored in a Google Sheet and our email runs on Gmail.
              </li>
              <li>
                <strong>Vercel</strong> — hosts the website.
              </li>
              <li>
                <strong>Cloudflare</strong> — its Turnstile check helps stop automated spam on the form.
              </li>
              <li>
                <strong>Resend</strong> — if switched on, sends us an email alert when an enquiry arrives.
              </li>
              <li>
                Police, courts or regulators, only if the law requires it.
              </li>
            </ul>
            <p className="mt-3">
              Solicitor firms that subscribe to {BUSINESS_NAME} pay us for the service; you never pay us anything.
              We do not sell your data to anyone for marketing.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">6. International transfers</h2>
            <p>
              Google, Vercel, Cloudflare and Resend may process data outside the UK, including in the USA. Where they
              do, the transfer is protected by the UK&apos;s adequacy regulations (such as the UK–US data bridge) or
              by standard contractual clauses in their data processing terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">7. How long we keep your data</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Enquiries: 12 months from when you send them, then deleted — sooner if you ask.</li>
              <li>Emails you send us: up to 2 years, so we can deal with any follow-up.</li>
              <li>Click counts: kept as long as useful; they contain no personal data.</li>
            </ul>
            <p className="mt-2">
              A solicitor firm that receives your enquiry keeps its own copy for as long as its own rules require.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">8. Your rights</h2>
            <p>Under the UK GDPR you can ask us to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>give you a copy of the data we hold about you;</li>
              <li>correct anything that is wrong;</li>
              <li>delete your data;</li>
              <li>restrict how we use it, or object to our use of it;</li>
              <li>give your data to you in a portable format.</li>
            </ul>
            <p className="mt-2">
              You can <strong>withdraw your consent at any time</strong> by emailing <Mail />. This stops any further
              use but doesn&apos;t undo what was done before, and a firm that already has your enquiry must be asked
              separately (we&apos;ll tell you which firm it is). We reply within one month, free of charge.
            </p>
            <p className="mt-2">
              If you&apos;re unhappy with how we handle your data, please tell us first. You can also complain to the{" "}
              <Ext href="https://ico.org.uk/make-a-complaint/">Information Commissioner&apos;s Office (ICO)</Ext>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">9. Cookies</h2>
            <p>
              We don&apos;t use advertising or analytics cookies, so there is no cookie banner. Cloudflare Turnstile
              may use strictly necessary technical data to check the form isn&apos;t being sent by a bot. If we
              ever add optional cookies, we will ask for your consent first and update this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">10. Security</h2>
            <p>
              The site is served over HTTPS, access to enquiries is limited to us, and our accounts use strong
              passwords and two-step verification. No system is perfectly secure; if a breach puts your data at
              risk, we will tell you and the ICO where the law requires it.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">11. Children</h2>
            <p>The enquiry form is for people aged 18 or over. We don&apos;t knowingly collect data from children.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">12. Solicitors listed on this site</h2>
            <p>
              Our listings use information that firms and solicitors publish themselves, and public regulator
              registers (the SRA, the Law Society of Scotland and the Law Society of Northern Ireland). We rely on
              our legitimate interest in helping the public find regulated legal help. Solicitors can ask us to
              correct or remove a listing at any time — see{" "}
              <Link href="/uk/listings" className="underline underline-offset-2 hover:text-[#10233D]">
                update or remove a listing
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">13. Changes to this policy</h2>
            <p>
              We&apos;ll update this page if anything changes, and change the &quot;last updated&quot; date above.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">14. Contact us</h2>
            <p>
              {BUSINESS_NAME}
              {BUSINESS_ADDRESS && <>, {BUSINESS_ADDRESS}</>} — <Mail />
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
