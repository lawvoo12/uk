import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";

import { LeadIntakeForm } from "@/components/LeadIntakeForm";
import { getPracticeAreaBySlug, type PracticeAreaSlug } from "@/lib/validations/lead-intake";
import { STATIC_LAWYERS, REGULATOR_LABEL } from "@/lib/data/static-lawyers";
import { findCityByNameOrSlug, getCityBySlug } from "@/lib/seo/uk-cities";
import { LEADS_ENABLED } from "@/lib/config";
import { EnquiriesClosedNotice } from "@/components/leads/enquiries-closed-notice";
import { TrackVisit } from "@/components/leads/track-visit";

export const metadata: Metadata = {
  title: "Find a solicitor — tell us about your case",
  description: "Tell us about your case and we'll be in touch about the right solicitor for you.",
  // Query-string variants (?lawyer=, ?category=) shouldn't be indexed separately.
  alternates: { canonical: "/uk/leads/new" },
  // A form, not content — keep it out of search results (links from it are still followed).
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ category?: string; city?: string; lawyer?: string }>;
}

export default async function NewLeadPage({ searchParams }: PageProps) {
  const { category, city, lawyer: lawyerId } = await searchParams;

  // Arrived via a solicitor's "Request a callback" button?
  const lawyer = lawyerId ? STATIC_LAWYERS.find((l) => l.id === lawyerId) : undefined;
  const lawyerCity = lawyer ? getCityBySlug(lawyer.citySlug) : undefined;

  // Practice area, so a "Request a callback" visitor skips step 1: the one
  // from the page they came from if this firm covers it, otherwise the
  // solicitor's own specialism. They can still go Back and change it.
  const requestedArea = category ? getPracticeAreaBySlug(category)?.slug : undefined;
  let initialPracticeArea: PracticeAreaSlug | undefined = requestedArea;
  if (lawyer) {
    initialPracticeArea =
      requestedArea && lawyer.practiceAreaSlugs.includes(requestedArea)
        ? requestedArea
        : getPracticeAreaBySlug(lawyer.primaryPracticeArea)?.slug;
  }

  const initialCity = lawyerCity?.name ?? (city ? findCityByNameOrSlug(city)?.name : undefined);

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">
          {lawyer ? "Request a callback" : "Find the right solicitor for your case"}
        </h1>
        {LEADS_ENABLED && (
          <p className="mt-3 text-[#5B6472]">
            Answer a few questions about your case — free, with no obligation, and we&apos;ll be in touch.
          </p>
        )}
      </div>

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
            {LEADS_ENABLED && (
              <>
                Your details come to Lawvoo first. We&apos;ll pass your case on and ask this firm to get in touch, but
                we can&apos;t guarantee they&apos;ll respond.{" "}
              </>
            )}
            <Link href={`/uk/lawyer/${lawyer.id}`} className="underline underline-offset-2 hover:text-[#5B6472]">
              View profile
            </Link>
          </p>
        </div>
      )}

      {LEADS_ENABLED ? (
        <LeadIntakeForm
          initialPracticeArea={initialPracticeArea}
          initialCity={initialCity}
          requestedSolicitorId={lawyer?.id}
        />
      ) : (
        <>
          {/* Form is off until the ICO fee is paid — count the visit instead. */}
          <TrackVisit
            key={lawyer?.id ?? "general"}
            source={lawyer ? "callback" : "find-a-solicitor"}
            lawyerId={lawyer?.id}
          />
          <EnquiriesClosedNotice lawyer={lawyer} />
        </>
      )}
    </main>
  );
}
