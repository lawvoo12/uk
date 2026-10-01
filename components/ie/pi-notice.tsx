import { ExternalLink, Info } from "lucide-react";

import { IE_LINKS } from "@/lib/ie/content";

/**
 * Shown instead of the enquiry form on Irish personal injury pages. Lawvoo
 * doesn't take PI enquiries in Ireland — visitors contact firms directly.
 */
export function PiNotice({ cityName }: { cityName?: string }) {
  return (
    <aside className="lg:sticky lg:top-8">
      <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#B8863B]" strokeWidth={1.5} />
          <div>
            <h2 className="font-serif text-lg text-[#10233D]">How injury claims work in Ireland</h2>
            <p className="mt-1 text-sm text-[#5B6472]">
              We don&apos;t take personal injury enquiries in Ireland. To talk to a firm{cityName ? ` in ${cityName}` : ""},
              use &ldquo;Visit firm website&rdquo; on any listing.
            </p>
          </div>
        </div>
        <ol className="mt-5 space-y-3 text-sm text-[#5B6472]">
          <li>
            <span className="font-medium text-[#10233D]">1. Get medical care and keep records</span> — reports, photos,
            receipts and witness details.
          </li>
          <li>
            <span className="font-medium text-[#10233D]">2. Apply to the Injuries Resolution Board</span> — most road,
            workplace and public liability claims start here (not medical negligence). The usual time limit is two years.
          </li>
          <li>
            <span className="font-medium text-[#10233D]">3. Assessment or mediation</span> — the Board assesses the claim
            using the Personal Injuries Guidelines, or offers mediation.
          </li>
          <li>
            <span className="font-medium text-[#10233D]">4. Court only if needed</span> — if the claim isn&apos;t resolved,
            the Board issues an &lsquo;authorisation&rsquo; to go to court.
          </li>
        </ol>
        <div className="mt-5 flex flex-col gap-2 text-sm">
          <a
            href={IE_LINKS.irb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-[#10233D] underline underline-offset-2"
          >
            Injuries Resolution Board <ExternalLink className="h-3.5 w-3.5 text-[#A8A398]" />
          </a>
          <a
            href={IE_LINKS.irbCitizensInfo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#5B6472] underline underline-offset-2"
          >
            Citizens Information guide <ExternalLink className="h-3.5 w-3.5 text-[#A8A398]" />
          </a>
        </div>
      </div>
    </aside>
  );
}
