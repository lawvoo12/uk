import { ExternalLink, Info } from "lucide-react";

import type { UsAreaContent } from "@/lib/us/content";

/**
 * Shown instead of the enquiry form on US personal injury pages. Lawvoo
 * doesn't take personal injury enquiries in the US — visitors contact firms
 * directly. `guide` is the state's personal injury content, when the page
 * is about one state.
 */
export function UsPiNotice({
  cityName,
  stateName,
  guide,
}: {
  cityName?: string;
  stateName?: string;
  guide?: UsAreaContent;
}) {
  return (
    <aside className="lg:sticky lg:top-8">
      <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#B8863B]" strokeWidth={1.5} />
          <div>
            <h2 className="font-serif text-lg text-[#10233D]">
              {stateName ? `How injury claims work in ${stateName}` : "Personal injury: contact firms directly"}
            </h2>
            <p className="mt-1 text-sm text-[#5B6472]">
              We don&apos;t take personal injury enquiries in the US. To talk to a firm{cityName ? ` in ${cityName}` : ""},
              use &ldquo;Visit firm website&rdquo; on any listing.
            </p>
          </div>
        </div>
        {guide ? (
          <>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm text-[#5B6472]">
              {guide.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              {guide.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#10233D] underline underline-offset-2"
                >
                  {link.label} <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#A8A398]" />
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm text-[#5B6472]">
            Time limits and the rules on fault are set by each state, and some deadlines are short. Pick your city to
            see what we know about the rules where you live, and speak to a lawyer early.
          </p>
        )}
      </div>
    </aside>
  );
}
