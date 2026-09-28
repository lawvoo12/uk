import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free legal tools and calculators",
  description: "Free UK calculators for property and legal costs — including a Stamp Duty, LBTT and LTT calculator.",
  alternates: { canonical: "/uk/tools" },
};


export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Free legal tools</h1>
        <p className="mt-3 text-[#5B6472]">Quick calculators to help you plan before you speak to a solicitor.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group rounded-2xl border border-[#DCD8D0] bg-white p-6 transition-colors hover:border-[#B8863B]"
            >
              <Calculator className="h-6 w-6 text-[#B8863B]" strokeWidth={1.75} />
              <h2 className="mt-3 font-serif text-xl text-[#10233D]">{t.name}</h2>
              <p className="mt-2 text-sm text-[#5B6472]">{t.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#B8863B]">
                Open calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
