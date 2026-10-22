import { Clock } from "lucide-react";

import { LeadIntakeForm } from "@/components/LeadIntakeForm";
import { leadsEnabledFor } from "@/lib/config";
import type { Country } from "@/lib/country";
import { cfg } from "@/lib/countries/registry";

export function LeadCaptureSidebar({
  categoryName,
  cityName,
  mobileFirst = true,
  country = "uk",
}: {
  categoryName: string;
  cityName: string;
  /** Show the form above the listings on small screens (default). */
  mobileFirst?: boolean;
  country?: Country;
}) {
  const c = cfg(country);
  const enabled = leadsEnabledFor(country);
  // Form switched off (see lib/config.ts): a short note instead, placed after
  // the listings on mobile so it doesn't push them down.
  if (!enabled) {
    return (
      <aside id="get-matched" className="lg:sticky lg:top-8">
        <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#B8863B]" strokeWidth={1.5} />
            <div>
              <h2 className="font-serif text-lg text-[#10233D]">Online enquiries opening soon</h2>
              <p className="mt-1 text-sm text-[#5B6472]">{c.closedSidebarNote}</p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside id="get-matched" className={`${mobileFirst ? "order-first" : ""} lg:order-last lg:sticky lg:top-8`}>
      <div className="mb-4">
        <h2 className="font-serif text-xl text-[#10233D]">
          Get in touch about {categoryName.toLowerCase()} {c.word}s in {cityName}
        </h2>
        <p className="mt-1 text-sm text-[#5B6472]">Free, no-obligation — takes about 2 minutes.</p>
      </div>
      <LeadIntakeForm
        {...(country !== "uk" ? { country: c.code } : {})}
      />
    </aside>
  );
}
