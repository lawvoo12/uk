import Link from "next/link";
import { Briefcase, HeartPulse, Home, Plane, ScrollText, Users, type LucideIcon } from "lucide-react";

import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";
import type { Country } from "@/lib/country";
import { cfg } from "@/lib/countries/registry";

const ICONS: Record<PracticeAreaSlug, LucideIcon> = {
  immigration: Plane,
  family: Users,
  "personal-injury": HeartPulse,
  employment: Briefcase,
  property: Home,
  "wills-probate": ScrollText,
};

// Each card opens that practice area's UK-wide page (/uk/solicitors/[category]),
// which lists every city with a solicitor covering it.

export function PracticeAreaGrid({
  country = "uk",
  heading = "Popular practice areas",
}: {
  country?: Country;
  /** Defaults to "Popular practice areas" (the home pages); the US state page passes its own. */
  heading?: string;
} = {}) {
  // Canada and the US have their own area names and URLs ("Real Estate" → /ca/lawyers/real-estate).
  const c = cfg(country);
  const areas = c.areas;
  return (
    <section aria-labelledby="practice-areas-heading" className="mx-auto max-w-5xl px-4 py-14">
      <h2 id="practice-areas-heading" className="text-center font-serif text-2xl text-[#10233D] sm:text-3xl">
        {heading}
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-sm text-[#5B6472]">
        {c.practiceAreaGridNote}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => {
          const Icon = ICONS[area.slug];
          return (
            <Link
              key={area.slug}
              href={`${c.listingsBase}/${area.urlSlug ?? area.slug}`}
              className="flex items-start gap-3 rounded-xl border border-[#DCD8D0] bg-white p-5 transition-all hover:border-[#B8A488] hover:shadow-sm"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#B8863B]" strokeWidth={1.5} />
              <span>
                <span className="block font-medium text-[#10233D]">{area.name}</span>
                <span className="mt-0.5 block text-sm text-[#5B6472]">{area.description}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
