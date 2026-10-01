import Link from "next/link";
import { BadgeCheck, ExternalLink, MapPin, Star } from "lucide-react";

import type { LawyerListing } from "@/lib/data/lawyers";
import { REGULATOR_LABEL } from "@/lib/data/static-lawyers";
import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { getFirmWebsite } from "@/lib/data/firm-website";
import { COUNTRY_BASE, type Country } from "@/lib/country";

export function LawyerCard({
  lawyer,
  contextLabel,
  showPracticeAreas = false,
  categorySlug,
  country = "uk",
  linkFirmInstead = false,
}: {
  lawyer: LawyerListing;
  /** e.g. "Family solicitor in Leeds" — shown after the solicitor's name */
  contextLabel?: string;
  showPracticeAreas?: boolean;
  /** Practice area of the page the card is on — pre-selects it in the callback form. */
  categorySlug?: string;
  /** Which section the card is on — "uk" (default) or "ie". */
  country?: Country;
  /** Show "Visit firm website" instead of "Request a callback" (Irish personal injury pages). */
  linkFirmInstead?: boolean;
}) {
  const base = COUNTRY_BASE[country];
  // Irish enquiries can't be about personal injury, so don't pre-select it.
  const callbackCategory = country === "ie" && categorySlug === "personal-injury" ? undefined : categorySlug;
  const callbackHref = `${base}/leads/new?lawyer=${encodeURIComponent(lawyer.id)}${
    callbackCategory ? `&category=${encodeURIComponent(callbackCategory)}` : ""
  }`;
  const areas = PRACTICE_AREAS.filter((a) => lawyer.practiceAreaSlugs.includes(a.slug));

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-[#DCD8D0] bg-white p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#10233D] font-serif text-lg text-white"
          aria-hidden
        >
          {lawyer.firmName.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="font-medium text-[#10233D]">
              <Link href={`${base}/lawyer/${lawyer.id}`} className="hover:underline underline-offset-2">
                {lawyer.firmName}
              </Link>
            </h3>
            <a
              href={lawyer.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Check this firm on its regulator's register"
              className="inline-flex items-center gap-1 rounded-full bg-[#EAF3EC] px-2 py-0.5 text-xs font-medium text-[#2F6844] hover:underline"
            >
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
              {REGULATOR_LABEL[lawyer.regulator]}
            </a>
          </div>
          <p className="text-sm text-[#5B6472]">
            <span className="font-medium text-[#10233D]">{lawyer.lawyerName}</span> · {lawyer.role}
            {contextLabel ? <span className="text-[#A8A398]"> · {contextLabel}</span> : null}
          </p>
          <p className="mt-1 flex items-start gap-1 text-xs text-[#5B6472]">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B8863B]" strokeWidth={1.75} />
            {lawyer.addressLine1}
          </p>
          {lawyer.ratingAverage !== null && (
            <div className="mt-1.5 flex items-center gap-1 text-sm text-[#10233D]">
              <Star className="h-3.5 w-3.5 fill-[#B8863B] text-[#B8863B]" />
              <span className="font-medium">{lawyer.ratingAverage.toFixed(1)}</span>
              <span className="text-[#A8A398]">({lawyer.ratingCount} reviews)</span>
            </div>
          )}
          {lawyer.bio && <p className="mt-2 max-w-md text-sm text-[#5B6472]">{lawyer.bio}</p>}
          {showPracticeAreas && areas.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Practice areas at this firm">
              {areas.map((area) => (
                <li
                  key={area.slug}
                  className="rounded-full border border-[#DCD8D0] bg-[#FAF9F6] px-2.5 py-0.5 text-xs text-[#5B6472]"
                >
                  {area.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
        <span className="text-xs text-[#A8A398]">
          {lawyer.yearsExperience ? `${lawyer.yearsExperience}+ years experience` : "Experience on request"}
        </span>
        <Link
          href={`${base}/lawyer/${lawyer.id}`}
          className="rounded-lg border border-[#DCD8D0] px-4 py-2 text-sm font-medium text-[#10233D] transition-colors hover:border-[#B8A488]"
        >
          View profile
        </Link>
        {linkFirmInstead ? (
          <a
            href={getFirmWebsite(lawyer)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#10233D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]"
          >
            Visit firm website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <Link
            href={callbackHref}
            className="rounded-lg bg-[#10233D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]"
          >
            Request a callback
          </Link>
        )}
      </div>
    </article>
  );
}
