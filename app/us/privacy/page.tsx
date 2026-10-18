import type { Metadata } from "next";
import Link from "next/link";

import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL, US_LEADS_ENABLED } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";

// Covers browsing, the anonymous click counter and — once US_LEADS_ENABLED is
// switched on — the enquiry form. Review it before switching the form on.
export const metadata: Metadata = {
  title: "Privacy Policy (US)",
  description: `How ${BUSINESS_NAME} collects, uses and protects personal information from its United States pages. We don't sell personal information and don't use advertising or analytics cookies.`,
  alternates: { canonical: "/us/privacy" },
};

const LAST_UPDATED = "17 October 2026";
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Mail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:text-[#10233D]">
      {CONTACT_EMAIL}
    </a>
  );
}

export default function UsPrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#10233D]">Privacy Policy — United States</h1>
        <p className="mt-2 text-sm text-[#A8A398]">Last updated: {LAST_UPDATED}</p>
        <p className="mt-4 text-sm text-[#5B6472]">
          This policy covers the United States pages of {SITE_HOST} (addresses starting {SITE_HOST}/us). For our other
          pages see the{" "}
          <Link href="/uk/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
            UK
          </Link>
          ,{" "}
          <Link href="/ie/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
            Ireland
          </Link>{" "}
          and{" "}
          <Link href="/ca/privacy" className="underline underline-offset-2 hover:text-[#10233D]">
            Canada
          </Link>{" "}
          privacy policies.
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#5B6472]">
          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">1. Who we are</h2>
            <p>
              {BUSINESS_NAME} (&quot;we&quot;, &quot;us&quot;) runs a directory of law firms and lawyers
              {US_LEADS_ENABLED ? ", with an enquiry form that puts members of the public in touch with a firm" : ""}. We
              are based in the United Kingdom. We are not a law firm and we don&apos;t give legal advice.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Contact: <Mail />
              </li>
              {BUSINESS_ADDRESS && <li>Postal address: {BUSINESS_ADDRESS}</li>}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">2. What we collect</h2>
            {!US_LEADS_ENABLED && (
              <p className="mb-3">
                <strong>Our enquiry form is not open in the US at the moment</strong>, so we are not collecting enquiries
                from the US pages. The points about enquiries below describe what will happen once it opens.
              </p>
            )}
            <p>
              <strong>If you send an enquiry</strong> through our form, we collect:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>your name, email address and phone number;</li>
              <li>your city or town, and your ZIP code if you choose to give it;</li>
              <li>the area of law, a short title and a description of your legal matter, and how urgent it is;</li>
              <li>the lawyer you asked about, if you came from a &quot;Request a callback&quot; button;</li>
              <li>the date and time you sent it, and that it came from the US pages.</li>
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
            <p className="mt-3">If you email us, we keep your email so we can reply and deal with any follow-up.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">3. Why we use it, and your consent</h2>
            <p>We use your enquiry only to:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>pass it to a law firm so it can contact you</strong> about your legal matter;
              </li>
              <li>
                <strong>contact you about your enquiry</strong> — for example, to tell you which firm will receive it;
              </li>
              <li>
                <strong>stop spam and misuse of the form</strong>, and keep the site secure.
              </li>
            </ul>
            <p className="mt-3">
              We only do this with your consent, which you give by ticking the box on the form. We don&apos;t use your
              enquiry for marketing. A description of a legal matter can include sensitive information — please include
              only what a lawyer needs to understand your situation. We don&apos;t take personal injury enquiries through
              the US pages.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">4. Who we share it with</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>One law firm.</strong> If you chose a firm (&quot;Request a callback&quot;), we send your enquiry
                to that firm only. If you didn&apos;t choose one, we email you first with the name of a listed firm that
                covers your matter, and only pass your enquiry on if you agree. The firm is then responsible for your
                information under its own privacy policy and its state bar&apos;s rules.
              </li>
              <li>
                <strong>Service providers that work for us:</strong> Google (enquiries and click counts are stored in a
                Google Sheet, and our email runs on Gmail), Vercel (website hosting), Cloudflare (its Turnstile check
                helps stop automated spam) and Resend (if switched on, an email alert to us when an enquiry arrives).
                They may use your information only to provide their service to us.
              </li>
              <li>Courts, police or regulators, only where the law requires it.</li>
            </ul>
            <p className="mt-3">We do not sell or share personal information for advertising.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">5. How long we keep it</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Enquiries: 12 months from when you send them, then deleted — sooner if you ask.</li>
              <li>Emails you send us: up to 2 years, so we can deal with any follow-up.</li>
              <li>Click counts: kept as long as useful; they contain no personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">6. Your choices</h2>
            <p>
              You can ask what information we hold about you, ask us to correct or delete it, and withdraw your consent,
              by emailing <Mail />. We reply within 30 days, at no cost. A firm that already has your enquiry must be
              asked separately — we&apos;ll tell you which firm it is.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">7. Cookies</h2>
            <p>
              We don&apos;t use advertising or analytics cookies on the US pages. Cloudflare Turnstile may use strictly
              necessary technical data to check the form isn&apos;t being sent by a bot. If we ever add optional cookies,
              we will ask first and update this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">8. Children</h2>
            <p>The enquiry form is for adults (18 or older). We don&apos;t knowingly collect information from children.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">9. Lawyers listed on this site</h2>
            <p>
              Our US listings use business and professional information that firms and lawyers publish on their own
              websites, and we check each lawyer in the state bar&apos;s public directory. We don&apos;t publish ratings
              or reviews. Lawyers can ask us to correct or remove a listing at any time — see{" "}
              <Link href="/us/listings" className="underline underline-offset-2 hover:text-[#10233D]">
                update or remove a listing
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">10. Changes to this policy</h2>
            <p>
              We&apos;ll update this page if anything changes, and change the &quot;last updated&quot; date above.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-[#10233D]">11. Contact us</h2>
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
