import Link from "next/link";
import { Mail, PencilLine, Scale } from "lucide-react";

import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";
import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL, LISTINGS_EMAIL } from "@/lib/config";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { contentDateIso } from "@/lib/seo/dates";
import type { TrustConfig, TrustSection } from "@/lib/seo/trust-content";

// About, How we verify and Contact pages for the UK, Ireland and Canada.
// The words come from lib/seo/trust-content.ts; the layout matches the
// Privacy and Listings pages. The postal address only appears when
// NEXT_PUBLIC_BUSINESS_ADDRESS is set.

const link = "underline underline-offset-2 hover:text-[#10233D]";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function organization() {
  return {
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    ...(BUSINESS_ADDRESS ? { address: BUSINESS_ADDRESS } : {}),
  };
}

function Section({ section }: { section: TrustSection }) {
  return (
    <section>
      <h2 className="mb-2 font-serif text-xl text-[#10233D]">{section.heading}</h2>
      {section.paragraphs?.map((p, i) => (
        <p key={p} className={i > 0 ? "mt-3" : undefined}>
          {p}
        </p>
      ))}
      {section.bullets && (
        <ul className="list-disc space-y-2 pl-5">
          {section.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {section.links && section.links.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {section.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {section.after?.map((p) => (
        <p key={p} className="mt-3">
          {p}
        </p>
      ))}
    </section>
  );
}

function Shell({ c, crumb, children }: { c: TrustConfig; crumb: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <BreadcrumbNav items={[{ label: "Home", href: c.base }, { label: crumb }]} />
        {children}
      </div>
    </main>
  );
}

const OTHER_SITES: { base: string; label: string }[] = [
  { base: "/uk", label: "UK" },
  { base: "/ie", label: "Ireland" },
  { base: "/ca", label: "Canada" },
  { base: "/us", label: "United States" },
];

export function TrustAboutPage({ c }: { c: TrustConfig }) {
  const others = OTHER_SITES.filter((o) => o.base !== c.base);
  const plural = `${c.word}s`;
  return (
    <Shell c={c} crumb="About">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}${c.base}/about`,
          inLanguage: c.locale,
          mainEntity: organization(),
        }}
      />
      <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">About {c.brand}</h1>
      <p className="mt-2 text-sm text-[#A8A398]">Last updated: {c.dates.about}</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[#5B6472]">
        <section>
          <h2 className="mb-2 font-serif text-xl text-[#10233D]">What Lawvoo is</h2>
          <p>
            {SITE_NAME} is a free directory of {plural}. It helps you find a {c.word} by area of law and place, see where
            their office is and what they work on, and check them on the regulator&apos;s public register before you get
            in touch. {c.coverage}
          </p>
          <p className="mt-3">
            {SITE_NAME} is not a law firm. We don&apos;t give legal advice, we don&apos;t recommend one {c.word} over
            another, and using the site doesn&apos;t create a {c.word}-client relationship with us.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl text-[#10233D]">Who runs it</h2>
          <p>
            {BUSINESS_NAME === SITE_NAME ? `${SITE_NAME} is run from the United Kingdom.` : `${SITE_NAME} is run by ${BUSINESS_NAME}, based in the United Kingdom.`} Lawvoo also runs directories for{" "}
            {others.map((o, i) => (
              <span key={o.base}>
                {i > 0 ? (i === others.length - 1 ? " and " : ", ") : ""}
                <Link href={o.base} className={link}>
                  {o.label === "United States" || o.label === "UK" ? `the ${o.label}` : o.label}
                </Link>
              </span>
            ))}
            . You can reach us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
              {CONTACT_EMAIL}
            </a>
            {BUSINESS_ADDRESS ? <>, or by post at {BUSINESS_ADDRESS}</> : null} — see{" "}
            <Link href={`${c.base}/contact`} className={link}>
              Contact
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl text-[#10233D]">How listings work</h2>
          <ul className="list-disc space-y-2 pl-5">
            {c.listingBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3">
            The full method is on{" "}
            <Link href={`${c.base}/how-we-verify`} className={link}>
              How we check listings
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl text-[#10233D]">How Lawvoo is paid for</h2>
          <p>
            {c.paymentSentence} No one can pay to be shown higher.
            {c.leadsEnabled ? ` Sending an enquiry through Lawvoo is free for you.` : ""}
            {c.noPiEnquiries
              ? ` We don't take personal injury enquiries in ${c.where} — for those, contact the firm directly.`
              : ""}
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl text-[#10233D]">Corrections</h2>
          <p>
            If something on a listing or a page is wrong, email us and we&apos;ll fix it. {c.word === "lawyer" ? "Lawyers" : "Solicitors"}{" "}
            can ask us to update or remove their listing at any time —{" "}
            <Link href={`${c.base}/listings`} className={link}>
              update or remove a listing
            </Link>
            .
          </p>
        </section>
      </div>
    </Shell>
  );
}

export function TrustVerifyPage({ c }: { c: TrustConfig }) {
  return (
    <Shell c={c} crumb="How we check listings">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How we check listings",
          url: `${SITE_URL}${c.base}/how-we-verify`,
          inLanguage: c.locale,
          dateModified: contentDateIso(c.dates["how-we-verify"]),
        }}
      />
      <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">How we check listings</h1>
      <p className="mt-2 text-sm text-[#A8A398]">Last updated: {c.dates["how-we-verify"]}</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[#5B6472]">
        {c.verify.map((s) => (
          <Section key={s.heading} section={s} />
        ))}
        <section>
          <h2 className="mb-2 font-serif text-xl text-[#10233D]">{c.verify.length + 1}. Reporting a mistake</h2>
          <p>
            If you spot something wrong, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Correction (${c.code.toUpperCase()})`)}`} className={link}>
              {CONTACT_EMAIL}
            </a>{" "}
            with the page link and we&apos;ll check it and correct it. {c.word === "lawyer" ? "Lawyers" : "Solicitors"} can{" "}
            <Link href={`${c.base}/listings`} className={link}>
              update or remove their listing
            </Link>{" "}
            at any time.
          </p>
        </section>
      </div>
    </Shell>
  );
}

export function TrustContactPage({ c }: { c: TrustConfig }) {
  const plural = `${c.word}s`;
  return (
    <Shell c={c} crumb="Contact">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}${c.base}/contact`,
          inLanguage: c.locale,
          mainEntity: organization(),
        }}
      />
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
        <Link href={`${c.base}/listings`} className="rounded-2xl border border-[#DCD8D0] bg-white p-6 transition-colors hover:border-[#B8A488]">
          <PencilLine className="h-5 w-5 text-[#B8863B]" strokeWidth={1.5} />
          <h2 className="mt-3 font-serif text-xl text-[#10233D]">
            {c.word === "lawyer" ? "Lawyers" : "Solicitors"}: update or remove your listing
          </h2>
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
          {c.leadsEnabled ? (
            <>
              <Link href={`${c.base}/leads/new`} className={link}>
                Tell us about your case
              </Link>
              {c.noPiEnquiries ? " (not personal injury)" : ""}, or{" "}
            </>
          ) : null}
          <Link href={c.browsePath} className={link}>
            {c.leadsEnabled ? "browse" : "Browse"} {plural} by area of law
          </Link>{" "}
          and contact a firm directly.
        </p>
      </section>

      <p className="mt-6 text-xs text-[#A8A398]">
        See also:{" "}
        <Link href={`${c.base}/about`} className={link}>
          About {c.brand}
        </Link>{" "}
        ·{" "}
        <Link href={`${c.base}/how-we-verify`} className={link}>
          How we check listings
        </Link>{" "}
        ·{" "}
        <Link href={`${c.base}/privacy`} className={link}>
          Privacy
        </Link>
      </p>
    </Shell>
  );
}
