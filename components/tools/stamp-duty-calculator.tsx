"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  calculateStampDuty,
  NATION_LABEL,
  type BuyerType,
  type Nation,
} from "@/lib/tools/stamp-duty";

export interface PropertyCityOption {
  slug: string;
  name: string;
  nation: Nation;
  count: number;
}

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const NATIONS: Nation[] = ["england", "scotland", "wales", "northern-ireland"];
const BUYERS: { value: BuyerType; label: string; hint: string }[] = [
  { value: "home-mover", label: "Moving home", hint: "Buying your only or next main home" },
  { value: "first-time", label: "First-time buyer", hint: "Never owned a home anywhere" },
  { value: "additional", label: "Additional property", hint: "Second home or buy-to-let" },
];

function bandLabel(from: number, to: number, isWholePrice: boolean) {
  if (isWholePrice) return "ADS on whole price";
  return `${gbp.format(from === 0 ? 0 : from + 1)} – ${gbp.format(to)}`;
}

export function StampDutyCalculator({
  cities,
  initialNation = "england",
}: {
  cities: PropertyCityOption[];
  initialNation?: Nation;
}) {
  const [priceText, setPriceText] = useState("300,000");
  const [nation, setNation] = useState<Nation>(initialNation);
  const [buyer, setBuyer] = useState<BuyerType>("home-mover");
  const [nonResident, setNonResident] = useState(false);

  // Links like /uk/tools/stamp-duty-calculator?nation=scotland pre-select the nation
  // (read on the client so the page itself stays static).
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get("nation");
    if (n && (NATIONS as string[]).includes(n)) setNation(n as Nation);
  }, []);

  const price = Number(priceText.replace(/[^0-9.]/g, "")) || 0;
  const sdltNation = nation === "england" || nation === "northern-ireland";

  const result = useMemo(
    () => calculateStampDuty({ price, nation, buyer, nonResident: sdltNation && nonResident }),
    [price, nation, buyer, nonResident, sdltNation]
  );

  const nationCities = cities.filter((c) => c.nation === nation && c.count > 0);

  return (
    <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label htmlFor="sd-price" className="text-sm font-medium text-[#10233D]">
              Property price
            </label>
            <div className="mt-1.5 flex items-center rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] focus-within:border-[#B8863B]">
              <span className="pl-4 text-[#5B6472]">£</span>
              <input
                id="sd-price"
                inputMode="numeric"
                autoComplete="off"
                value={priceText}
                onChange={(e) => setPriceText(e.target.value)}
                onBlur={() => price && setPriceText(price.toLocaleString("en-GB"))}
                className="w-full bg-transparent px-2 py-3 text-lg text-[#10233D] outline-none"
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-[#10233D]">Where is the property?</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {NATIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={nation === n}
                  onClick={() => setNation(n)}
                  className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                    nation === n
                      ? "border-[#10233D] bg-[#10233D] text-white"
                      : "border-[#DCD8D0] bg-white text-[#10233D] hover:border-[#B8863B]"
                  }`}
                >
                  {NATION_LABEL[n]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-[#10233D]">Who is buying?</legend>
            <div className="mt-1.5 space-y-2">
              {BUYERS.map((b) => (
                <label
                  key={b.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                    buyer === b.value ? "border-[#B8863B] bg-[#FBF7F0]" : "border-[#DCD8D0] hover:border-[#B8863B]"
                  }`}
                >
                  <input
                    type="radio"
                    name="sd-buyer"
                    value={b.value}
                    checked={buyer === b.value}
                    onChange={() => setBuyer(b.value)}
                    className="mt-1 accent-[#10233D]"
                  />
                  <span>
                    <span className="block text-sm font-medium text-[#10233D]">{b.label}</span>
                    <span className="block text-xs text-[#5B6472]">{b.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {sdltNation && (
            <label className="flex cursor-pointer items-start gap-3 text-sm text-[#10233D]">
              <input
                type="checkbox"
                checked={nonResident}
                onChange={(e) => setNonResident(e.target.checked)}
                className="mt-1 accent-[#10233D]"
              />
              <span>
                I&apos;m not a UK resident
                <span className="block text-xs text-[#5B6472]">
                  In the UK for fewer than 183 days in the last 12 months (adds 2%)
                </span>
              </span>
            </label>
          )}
        </div>

        {/* Result */}
        <div aria-live="polite" className="rounded-xl bg-[#10233D] p-5 text-white sm:p-6">
          <p className="text-sm text-white/70">{result.taxName} to pay</p>
          <p className="mt-1 font-serif text-4xl sm:text-5xl">{gbp.format(result.total)}</p>
          <p className="mt-1 text-sm text-white/70">
            Effective rate {result.effectiveRate.toFixed(2)}% of {gbp.format(price)}
          </p>

          {result.bands.length > 0 && (
            <table className="mt-5 w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-white/60">
                  <th className="pb-2 font-normal">Band</th>
                  <th className="pb-2 text-right font-normal">Rate</th>
                  <th className="pb-2 text-right font-normal">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.bands.map((b, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="py-1.5 pr-2">{bandLabel(b.from, b.to, !!b.supplement)}</td>
                    <td className="py-1.5 text-right">{b.rate}%</td>
                    <td className="py-1.5 text-right">{gbp.format(b.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {result.notes.length > 0 && (
            <ul className="mt-4 space-y-1 text-xs text-white/75">
              {result.notes.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Next step: property solicitors in this nation */}
      <div className="mt-6 rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] p-5">
        <p className="font-medium text-[#10233D]">Need a conveyancing solicitor in {NATION_LABEL[nation]}?</p>
        <p className="mt-1 text-sm text-[#5B6472]">
          A property solicitor handles the legal work and files the {result.taxName.split(" (")[0]} return for you.
        </p>
        {nationCities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {nationCities.slice(0, 12).map((c) => (
              <Link
                key={c.slug}
                href={`/uk/solicitors/property/${c.slug}`}
                className="rounded-full border border-[#DCD8D0] bg-white px-3 py-1 text-sm text-[#10233D] hover:border-[#B8863B]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
        <Link
          href="/uk/solicitors/property"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#B8863B] hover:underline"
        >
          All property solicitors <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
