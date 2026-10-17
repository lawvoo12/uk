import { ExternalLink, ListChecks, MapPin } from "lucide-react";

import { HowItWorks } from "@/components/home/how-it-works";
import { CA_LEADS_ENABLED } from "@/lib/config";

// While the Canadian enquiry form is switched off (CA_LEADS_ENABLED), the
// homepage explains how to use the directory instead of describing a form
// visitors can't use yet. Once the form is on, the shared steps are shown.
const DIRECTORY_STEPS = [
  { icon: MapPin, title: "Pick an area of law and a city", body: "Search by city or postal code, or browse the cities we cover." },
  {
    icon: ListChecks,
    title: "Compare lawyers",
    body: "See a named lawyer, the office address and practice areas for each firm — taken from the firm's own website.",
  },
  {
    icon: ExternalLink,
    title: "Check, then contact the firm",
    body: "Look the lawyer up in the law society's directory, then contact the firm directly through its own website.",
  },
];

export function CaHowItWorks() {
  if (CA_LEADS_ENABLED) return <HowItWorks />;

  return (
    <section aria-labelledby="how-it-works-heading" className="border-y border-[#DCD8D0] bg-white py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="how-it-works-heading" className="text-center font-serif text-2xl text-[#10233D] sm:text-3xl">
          How it works
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {DIRECTORY_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex flex-col items-start gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF6EC] text-[#B8863B]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <p className="text-xs font-medium text-[#A8A398]">Step {index + 1}</p>
                <p className="font-medium text-[#10233D]">{step.title}</p>
                <p className="text-sm text-[#5B6472]">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
