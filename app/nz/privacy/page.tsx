import type { Metadata } from "next";
import Link from "next/link";

import { BUSINESS_ADDRESS, BUSINESS_NAME, NZ_LEADS_ENABLED, CONTACT_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";
import { NZ_DATES } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Privacy Policy (New Zealand)",
  description: `How ${BUSINESS_NAME} collects, uses and protects personal information from its New Zealand pages under New Zealand's Privacy Act 2020.`,
  alternates: { canonical: "/nz/privacy" },
};

const LAST_UPDATED = NZ_DATES.privacy;
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

export default function NzPrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#10233D]">Privacy Policy — New Zealand</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {LAST_UPDATED}</p>
        <p className="mt-4 text-sm text-[#5B6472]">
          This policy covers the New Zealand pages of {SITE_HOST} (addresses starting {SITE_HOST}/nz). For the UK pages see
          our{" "}
          <Link href="/uk/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
            UK privacy policy
          </Link>
          , and for Ireland our{" "}
          <Link href="/ie/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
            Ireland privacy policy
          </Link>
          .
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">1. Who we are</h2>
            <p>
              {BUSINESS_NAME} (&quot;we&quot;, &quot;us&quot;) runs a directory of law firms and lawyers in New Zealand
              {NZ_LEADS_ENABLED ? ", with an enquiry form that puts members of the public in touch with a firm" : ""}. We
              are based in the United Kingdom. Because we offer this service to people in New Zealand, we follow New
              Zealand&apos;s Privacy Act 2020 and its information privacy principles when we handle your personal
              information.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Our privacy officer is responsible for this policy and can be reached at <Mail />.
              </li>
              {BUSINESS_ADDRESS && <li>Postal address: {BUSINESS_ADDRESS}</li>}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">2. What we collect</h2>
            {!NZ_LEADS_ENABLED && (
              <p className="mb-3">
                <strong>Our enquiry form is not open in New Zealand at the moment</strong>, so we are not collecting
                enquiries from the New Zealand pages. The points about enquiries below describe what will happen once it opens.
              </p>
            )}
            <p>
              <strong>If you send an enquiry</strong> through our form, we collect:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>your name, email address and phone number;</li>
              <li>your city or town, and your postcode if you choose to give it;</li>
              <li>the area of law, a short title and a description of your legal matter, and how urgent it is;</li>
              <li>the lawyer you asked about, if you came from a &quot;Request a callback&quot; button;</li>
              <li>the date and time you sent it, and that it came from the New Zealand pages.</li>
            </ul>
            <p className="mt-3">
              <strong>If you just browse the site</strong>, we don&apos;t ask for any personal information. While the
              enquiry form is closed, we count clicks on &quot;Request a callback&quot; and &quot;Find a lawyer&quot; —
              this records only the time, which button was used and which listing it was for. It does not record your
              name, IP address or any cookie.
            </p>
            <p className="mt-3">
              Our hosting provider automatically handles technical data such as your IP address and browser type so that
              pages can be delivered and protected against attacks.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">3. Why we collect it, and your consent</h2>
            <p>We collect your information only for these purposes, which we tell you about before you send the form:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>to pass your enquiry to a law firm so it can contact you</strong> about your legal matter;
              </li>
              <li>
                <strong>to contact you about your enquiry</strong> — for example, to tell you which firm will receive it;
              </li>
              <li>
                <strong>to stop spam and misuse of the form</strong>, and to keep the site secure.
              </li>
            </ul>
            <p className="mt-3">
              We ask for your <strong>consent</strong>, which you give by ticking the box on the form. We collect
              only what is needed for these purposes, we don&apos;t use your enquiry for marketing, and we don&apos;t
              make automated decisions about you. You can withdraw your consent at any time (see section 8).
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">4. Sensitive information</h2>
            <p>
              A description of a legal matter can include sensitive information — for example about your health, your
              immigration status, your finances or your family. We use it only to pass your enquiry to a law firm, and
              only with your express consent. Please include only what a lawyer needs to understand your situation. We
              don&apos;t take ACC or injury enquiries through the New Zealand pages.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">5. Who we share it with</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>One law firm.</strong> If you chose a firm (&quot;Request a callback&quot;), we send your enquiry
                to that firm only. If you didn&apos;t choose one, we email you first with the name of a listed firm that
                covers your matter, and only pass your enquiry on if you agree. The firm is then responsible for your
                information under its own privacy policy and the Law Society&apos;s rules.
              </li>
              <li>
                <strong>Service providers that work for us:</strong> Google (enquiries are stored in a Google Sheet and
                our email runs on Gmail), Vercel (website hosting), Cloudflare (its Turnstile check helps stop automated
                spam) and Resend (if switched on, an email alert to us when an enquiry arrives). They may use your
                information only to provide their service to us.
              </li>
              <li>Courts, police or regulators, only where the law requires it.</li>
            </ul>
            <p className="mt-3">We do not sell your personal information, and we never share it for marketing.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">6. Your information is stored outside New Zealand</h2>
            <p>
              We are based in the United Kingdom, and our service providers store and process information in the United
              States and other countries. This means your information is handled outside New Zealand and is subject to
              the laws of those countries, where courts, law enforcement and national security authorities may be able
              to obtain access to it. We remain responsible for your information wherever it is processed, and our
              providers are bound by contract to protect it. You can ask our privacy officer about this at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">7. How long we keep it</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Enquiries: 12 months from when you send them, then deleted — sooner if you ask.</li>
              <li>Emails you send us: up to 2 years, so we can deal with any follow-up.</li>
              <li>Click counts: kept as long as useful; they contain no personal information.</li>
            </ul>
            <p className="mt-2">A firm that receives your enquiry keeps its own copy for as long as its own rules require.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">8. Your rights</h2>
            <p>Under the Privacy Act 2020 you can:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>ask whether we hold personal information about you and get access to it;</li>
              <li>ask which organisations it has been shared with;</li>
              <li>have it corrected if it is inaccurate or incomplete;</li>
              <li>withdraw your consent, and ask us to delete your enquiry.</li>
            </ul>
            <p className="mt-2">
              Email <Mail /> to make a request. We reply within 20 working days, at no cost. Withdrawing consent stops any further
              use but doesn&apos;t undo what was done before, and a firm that already has your enquiry must be asked
              separately (we&apos;ll tell you which firm it is).
            </p>
            <p className="mt-2">
              If you&apos;re unhappy with how we handle your information, please tell our privacy officer first. You can
              also complain to the{" "}
              <Ext href="https://www.privacy.org.nz/">Office of the Privacy Commissioner</Ext>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">9. Emails, texts and calls</h2>
            <p>
              We contact you only about an enquiry you sent us. We don&apos;t send newsletters, promotions or other
              marketing messages, and we don&apos;t add you to a mailing list. If we ever want to send commercial
              electronic messages, we will ask for your consent first, and every message will say who we are and include
              a way to unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">10. Cookies</h2>
            <p>
              We don&apos;t use advertising or analytics cookies. Cloudflare Turnstile may use strictly necessary
              technical data to check the form isn&apos;t being sent by a bot. If we ever add optional cookies, we will
              ask first and update this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">11. Security</h2>
            <p>
              The site is served over HTTPS, access to enquiries is limited to us, and our accounts use strong passwords
              and two-step verification. If a privacy breach is likely to cause you serious harm, we will report it to the
              Office of the Privacy Commissioner and tell you, as the Privacy Act requires.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">12. Children</h2>
            <p>
              The enquiry form is for adults. We don&apos;t knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">13. Lawyers listed on this site</h2>
            <p>
              Our New Zealand listings use business and professional information that firms and lawyers publish on their
              own websites, and we check each lawyer on the New Zealand Law Society&apos;s register. We don&apos;t
              publish ratings or reviews. Lawyers can ask us to correct or remove a listing at any time — see{" "}
              <Link href="/nz/listings" className="underline underline-offset-2 hover:text-[#10233D]">
                update or remove a listing
              </Link>
              .
            </p>
            <p className="mt-3">
              If a lawyer or firm contacts us about a listing — by email or through the listing request form — we use
              what they send (name, firm, contact details and the request) only to deal with the request and keep the
              listing accurate, and keep it for up to 2 years.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">14. Changes to this policy</h2>
            <p>We&apos;ll update this page if anything changes, and change the &quot;last updated&quot; date above.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">15. Contact us</h2>
            <p>
              Privacy officer, {BUSINESS_NAME}
              {BUSINESS_ADDRESS && <>, {BUSINESS_ADDRESS}</>} — <Mail />
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
