import type { Metadata } from "next";
import Link from "next/link";
import { Mail, PencilLine, Trash2 } from "lucide-react";

import { LISTINGS_EMAIL } from "@/lib/config";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

export const metadata: Metadata = {
  title: "For solicitors — update or remove your listing",
  description:
    "Are you a solicitor or law firm listed on Lawvoo? Ask us to correct your details or remove your listing — we'll act on it promptly.",
  alternates: { canonical: "/uk/listings" },
};

function mailto(subject: string, body: string) {
  return `mailto:${LISTINGS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ListingsPage() {
  const removeHref = mailto(
    "Please remove my listing",
    "Listing page (URL):\nYour name and role:\nFirm name:\n\nPlease remove this listing from Lawvoo."
  );
  const updateHref = mailto(
    "Please update my listing",
    "Listing page (URL):\nYour name and role:\nFirm name:\n\nWhat should we change?\n"
  );

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <BreadcrumbNav items={[{ label: "Home", href: "/uk" }, { label: "For solicitors" }]} />

        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Update or remove your listing</h1>
        <p className="mt-3 text-[#5B6472]">
          Lawvoo lists solicitors using publicly available professional information — the regulator&apos;s register
          (SRA, Law Society of Scotland or Law Society of Northern Ireland) and the firm&apos;s own website. Listed firms
          are <strong className="font-medium text-[#10233D]">not Lawvoo partners</strong> and haven&apos;t paid to appear.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={removeHref}
            className="rounded-2xl border border-[#DCD8D0] bg-white p-6 transition-colors hover:border-[#B8A488]"
          >
            <Trash2 className="h-5 w-5 text-[#B8863B]" strokeWidth={1.5} />
            <h2 className="mt-3 font-serif text-xl text-[#10233D]">Remove my listing</h2>
            <p className="mt-1 text-sm text-[#5B6472]">
              Email us the page link. We aim to take the listing down within 2 working days — no questions asked.
            </p>
          </a>
          <a
            href={updateHref}
            className="rounded-2xl border border-[#DCD8D0] bg-white p-6 transition-colors hover:border-[#B8A488]"
          >
            <PencilLine className="h-5 w-5 text-[#B8863B]" strokeWidth={1.5} />
            <h2 className="mt-3 font-serif text-xl text-[#10233D]">Correct my details</h2>
            <p className="mt-1 text-sm text-[#5B6472]">
              Wrong role, office or practice areas, or moved firm? Tell us what to change and we&apos;ll update it.
            </p>
          </a>
        </div>

        <section className="mt-8 rounded-2xl border border-[#DCD8D0] bg-white p-6 text-sm text-[#5B6472] sm:p-8">
          <h2 className="font-serif text-xl text-[#10233D]">How it works</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Send your request from an email address at your firm&apos;s domain, so we can confirm it comes from the
              firm.
            </li>
            <li>Include the link to your listing page (it looks like lawvoo.com/uk/lawyer/…).</li>
            <li>
              Removal requests are actioned without argument. We&apos;ll reply to confirm once it&apos;s done.
            </li>
          </ul>
          <p className="mt-4 flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#B8863B]" strokeWidth={1.75} />
            Email:{" "}
            <a href={`mailto:${LISTINGS_EMAIL}`} className="font-medium text-[#10233D] underline underline-offset-2">
              {LISTINGS_EMAIL}
            </a>
          </p>
        </section>

        <p className="mt-8 text-sm text-[#5B6472]">
          <Link href="/uk/locations" className="underline underline-offset-2 hover:text-[#10233D]">
            ← Back to the directory
          </Link>
        </p>
      </div>
    </main>
  );
}
