import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

/** Nudge on Irish Property pages, linking to /ie/tools/stamp-duty-calculator. */
export function IeStampDutyCard({ cityName }: { cityName?: string }) {
  return (
    <Link
      href="/ie/tools/stamp-duty-calculator"
      className="group mt-10 flex items-center gap-4 rounded-2xl border border-[#DCD8D0] bg-white p-5 transition-colors hover:border-[#B8863B]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FBF7F0]">
        <Calculator className="h-5 w-5 text-[#B8863B]" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-[#10233D]">
          Buying a home{cityName ? ` in ${cityName}` : " in Ireland"}? Work out your stamp duty
        </span>
        <span className="block text-sm text-[#5B6472]">Free calculator — new homes (VAT), €1m and €1.5m bands, Help to Buy estimate.</span>
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-[#B8863B] transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
    </Link>
  );
}
