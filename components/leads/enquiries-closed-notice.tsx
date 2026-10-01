import Link from "next/link";
import { Clock, ExternalLink, MapPin, ShieldCheck } from "lucide-react";

import type { StaticLawyer } from "@/lib/data/static-lawyers";
import { getFirmWebsite } from "@/lib/data/firm-website";
import { REGULATORS } from "@/lib/seo/regulators";
import { COUNTRY_BASE, type Country } from "@/lib/country";

/**
 * Shown instead of the enquiry form while LEADS_ENABLED is off. Points the
 * visitor at the firm itself, so nobody hits a dead end.
 */
export function EnquiriesClosedNotice({
  lawyer,
  compact = false,
  country = "uk",
}: {
  lawyer?: Pick<StaticLawyer, "id" | "firmName" | "profileUrl" | "registerUrl" | "regulator">;
  compact?: boolean;
  country?: Country;
}) {
  return (
    <div className={compact ? "rounded-2xl border border-[#DCD8D0] bg-white p-5" : "mx-auto max-w-xl rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8"}>
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#B8863B]" strokeWidth={1.5} />
        <div>
          <h2 className={compact ? "font-serif text-lg text-[#10233D]" : "font-serif text-2xl text-[#10233D]"}>
            Online enquiries are opening soon
          </h2>
          <p className="mt-2 text-sm text-[#5B6472]">
            {lawyer
              ? `We're not taking enquiries through Lawvoo just yet. In the meantime you can contact ${lawyer.firmName} directly — they handle their own enquiries.`
              : "We're not taking enquiries through Lawvoo just yet. In the meantime, browse solicitors by location and contact a firm directly."}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {lawyer ? (
          <>
            <a
              href={getFirmWebsite(lawyer)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#10233D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]"
            >
              Visit {lawyer.firmName}&apos;s website
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={lawyer.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCD8D0] px-4 py-2 text-sm font-medium text-[#10233D] hover:border-[#B8A488]"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#B8863B]" />
              Check on the {REGULATORS[lawyer.regulator].shortName} register
            </a>
          </>
        ) : (
          <Link
            href={`${COUNTRY_BASE[country]}/locations`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#10233D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]"
          >
            <MapPin className="h-3.5 w-3.5" />
            Browse solicitors by location
          </Link>
        )}
      </div>
    </div>
  );
}
