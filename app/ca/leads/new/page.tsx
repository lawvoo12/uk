import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ExternalLink, MapPin } from "lucide-react";

import { LeadIntakeForm } from "@/components/LeadIntakeForm";
import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import { REGULATOR_LABEL } from "@/lib/data/static-lawyers";
import { CA_LAWYERS } from "@/lib/ca/lawyers";
import { findCaCityByNameOrSlug, getCaCityBySlug } from "@/lib/ca/cities";
import { getCaArea, resolveCaArea } from "@/lib/ca/practice-areas";
import { getFirmWebsite } from "@/lib/data/firm-website";
import { CA_LEADS_ENABLED } from "@/lib/config";
import { EnquiriesClosedNotice } from "@/components/leads/enquiries-closed-notice";
import { TrackVisit } from "@/components/leads/track-visit";

export const metadata: Metadata = {
  title: "Find a lawyer in Canada — tell us about your case",
  description: "Tell us about your legal matter and we'll pass it to a law firm in Canada that covers it.",
  // Query-string variants (?lawyer=, ?category=) shouldn't be indexed separately.
  alternates: { canonical: "/ca/leads/new" },
  // A form, not content — keep it out of search results (links from it are still followed).
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ category?: string; city?: string; lawyer?: string }>;
}

export default async function CaNewLeadPage({ searchParams }: PageProps) {
  const { category, city, lawyer: lawyerId } = await searchParams;

  const lawyer = lawyerId ? CA_LAWYERS.find((l) => l.id === lawyerId) : undefined;
  const lawyerCity = lawyer ? getCaCityBySlug(lawyer.citySlug) : undefined;

  // ?category= may be the URL name ("real-estate") or the internal one ("property").
  // Personal injury isn't on the Canadian form — ignore it if it's in the URL,
  // and fall back to the lawyer's other areas.
  const requested = resolveCaArea(category);
  const piRequested = requested?.slug === "personal-injury";
  const requestedArea = requested && !piRequested ? requested.slug : undefined;
  let initialPracticeArea: PracticeAreaSlug | undefined = requestedArea;
  if (lawyer) {
    const own = lawyer.primaryPracticeArea !== "personal-injury" ? lawyer.primaryPracticeArea : undefined;
    const fallback = lawyer.practiceAreaSlugs.find((a) => a !== "personal-injury");
    initialPracticeArea =
      requestedArea && lawyer.practiceAreaSlugs.includes(requestedArea) ? requestedArea : getCaArea(own ?? fallback ?? "")?.slug;
  }

  const initialCity = lawyerCity?.name ?? (city ? findCaCityByNameOrSlug(city)?.name : undefined);

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">
          {lawyer ? "Request a callback" : "Find the right lawyer in Canada"}
        </h1>
        {CA_LEADS_ENABLED && (
          <p className="mt-3 text-[#5B6472]">
            Answer a few questions about your legal matter — free, with no obligation, and we&apos;ll be in touch.
          </p>
        )}
      </div>

      {piRequested && (
        <p className="mx-auto mb-6 max-w-xl rounded-xl border border-[#DCD8D0] bg-white p-4 text-sm text-[#5B6472]">
          We don&apos;t take personal injury enquiries in Canada.{" "}
          <Link href="/ca/lawyers/personal-injury" className="font-medium text-[#10233D] underline underline-offset-2">
            See personal injury lawyers
          </Link>{" "}
          and contact a firm directly.
        </p>
      )}

      {lawyer && (
        <div className="mx-auto mb-8 max-w-xl rounded-2xl border border-[#DCD8D0] bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#A8A398]">You&apos;re asking about</p>
          <div className="mt-3 flex gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#10233D] font-serif text-lg text-white"
              aria-hidden
            >
              {lawyer.lawyerName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-[#10233D]">{lawyer.lawyerName}</p>
              <p className="text-sm text-[#5B6472]">
                {lawyer.role} · {lawyer.firmName}
              </p>
              <p className="mt-1 flex items-start gap-1 text-xs text-[#5B6472]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B8863B]" strokeWidth={1.75} />
                {lawyer.addressLine1}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#EAF3EC] px-2 py-0.5 text-xs font-medium text-[#2F6844]">
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                {REGULATOR_LABEL[lawyer.regulator]}
              </span>
            </div>
          </div>
          <p className="mt-4 border-t border-[#EFECE6] pt-3 text-xs text-[#A8A398]">
            {CA_LEADS_ENABLED && (
              <>
                Your details come to Lawvoo first. We&apos;ll pass your enquiry to this firm only and ask them to get in
                touch, but we can&apos;t guarantee they&apos;ll respond.{" "}
              </>
            )}
            <Link href={`/ca/lawyer/${lawyer.id}`} className="underline underline-offset-2 hover:text-[#5B6472]">
              View profile
            </Link>
            {/* The firm's website is only shown when the form is switched off. */}
            {!CA_LEADS_ENABLED && (
              <>
                {" · "}
                <a
                  href={getFirmWebsite(lawyer)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-[#5B6472]"
                >
                  Firm website <ExternalLink className="h-3 w-3" />
                </a>
              </>
            )}
          </p>
        </div>
      )}

      {CA_LEADS_ENABLED ? (
        <LeadIntakeForm
          initialPracticeArea={initialPracticeArea}
          initialCity={initialCity}
          requestedSolicitorId={lawyer?.id}
          country="CA"
        />
      ) : (
        <>
          <TrackVisit
            key={lawyer?.id ?? "general"}
            source={lawyer ? "callback" : "find-a-solicitor"}
            lawyerId={lawyer?.id}
            country="ca"
          />
          <EnquiriesClosedNotice lawyer={lawyer} country="ca" />
        </>
      )}
    </main>
  );
}
