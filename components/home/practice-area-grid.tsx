import Link from "next/link";
import { Briefcase, HeartPulse, Home, Plane, ScrollText, Users, type LucideIcon } from "lucide-react";

import { PRACTICE_AREAS, type PracticeAreaSlug } from "@/lib/validations/lead-intake";

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

export function PracticeAreaGrid() {
  return (
    <section aria-labelledby="practice-areas-heading" className="mx-auto max-w-5xl px-4 py-14">
      <h2 id="practice-areas-heading" className="text-center font-serif text-2xl text-[#10233D] sm:text-3xl">
        Popular practice areas
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-sm text-[#5B6472]">
        Every firm listed has been checked on its regulator&apos;s register.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRACTICE_AREAS.map((area) => {
          const Icon = ICONS[area.slug];
          return (
            <Link
              key={area.slug}
              href={`/uk/solicitors/${area.slug}`}
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
