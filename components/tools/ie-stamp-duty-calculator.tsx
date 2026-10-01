"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { calculateIeStampDuty, VAT_RATES, type NewHomeType } from "@/lib/ie/stamp-duty";

export interface IePropertyCityOption {
  slug: string;
  name: string;
  count: number;
}

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

function bandLabel(from: number, to: number) {
  return `${eur.format(from === 0 ? 0 : from + 1)} – ${eur.format(to)}`;
}

export function IeStampDutyCalculator({ cities }: { cities: IePropertyCityOption[] }) {
  const [priceText, setPriceText] = useState("400,000");
  const [newHome, setNewHome] = useState(false);
  const [newHomeType, setNewHomeType] = useState<NewHomeType>("house");
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);

  const price = Number(priceText.replace(/[^0-9.]/g, "")) || 0;
  const result = useMemo(
    () => calculateIeStampDuty({ price, newHome, newHomeType, firstTimeBuyer }),
    [price, newHome, newHomeType, firstTimeBuyer]
  );
  const withProperty = cities.filter((c) => c.count > 0);

  return (
    <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label htmlFor="ie-sd-price" className="text-sm font-medium text-[#10233D]">
              Purchase price
            </label>
            <div className="mt-1.5 flex items-center rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] focus-within:border-[#B8863B]">
              <span className="pl-4 text-[#5B6472]">€</span>
              <input
                id="ie-sd-price"
                inputMode="numeric"
                autoComplete="off"
                value={priceText}
                onChange={(e) => setPriceText(e.target.value)}
                onBlur={() => price && setPriceText(price.toLocaleString("en-IE"))}
                className="w-full bg-transparent px-2 py-3 text-lg text-[#10233D] outline-none"
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-[#10233D]">What are you buying?</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {[
                { value: false, label: "Second-hand home" },
                { value: true, label: "New home (price incl. VAT)" },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  aria-pressed={newHome === o.value}
                  onClick={() => setNewHome(o.value)}
                  className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                    newHome === o.value
                      ? "border-[#10233D] bg-[#10233D] text-white"
                      : "border-[#DCD8D0] bg-white text-[#10233D] hover:border-[#B8863B]"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>

          {newHome && (
            <fieldset>
              <legend className="text-sm font-medium text-[#10233D]">Type of new home</legend>
              <div className="mt-1.5 space-y-2">
                {(
                  [
                    { value: "house", label: `House — VAT ${VAT_RATES.house}%`, hint: "Standard VAT rate on new homes" },
                    {
                      value: "apartment",
                      label: `Apartment — VAT ${VAT_RATES.apartment}%`,
                      hint: "Reduced rate on qualifying new apartments from 8 Oct 2025 to end-2030 — check with your solicitor",
                    },
                  ] as const
                ).map((o) => (
                  <label
                    key={o.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                      newHomeType === o.value ? "border-[#B8863B] bg-[#FBF7F0]" : "border-[#DCD8D0] hover:border-[#B8863B]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="ie-sd-type"
                      value={o.value}
                      checked={newHomeType === o.value}
                      onChange={() => setNewHomeType(o.value)}
                      className="mt-1 accent-[#10233D]"
                    />
                    <span>
                      <span className="block text-sm font-medium text-[#10233D]">{o.label}</span>
                      <span className="block text-xs text-[#5B6472]">{o.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <label className="flex cursor-pointer items-start gap-3 text-sm text-[#10233D]">
            <input
              type="checkbox"
              checked={firstTimeBuyer}
              onChange={(e) => setFirstTimeBuyer(e.target.checked)}
              className="mt-1 accent-[#10233D]"
            />
            <span>
              I&apos;m a first-time buyer
              <span className="block text-xs text-[#5B6472]">Shows whether Help to Buy could apply (new homes only)</span>
            </span>
          </label>
        </div>

        {/* Result */}
        <div aria-live="polite" className="rounded-xl bg-[#10233D] p-5 text-white sm:p-6">
          <p className="text-sm text-white/70">Stamp duty to pay</p>
          <p className="mt-1 font-serif text-4xl sm:text-5xl">{eur.format(result.total)}</p>
          <p className="mt-1 text-sm text-white/70">
            Effective rate {result.effectiveRate.toFixed(2)}% of {eur.format(price)}
          </p>

          {result.bands.length > 0 && (
            <table className="mt-5 w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-white/60">
                  <th className="pb-2 font-normal">Band</th>
                  <th className="pb-2 text-right font-normal">Rate</th>
                  <th className="pb-2 text-right font-normal">Duty</th>
                </tr>
              </thead>
              <tbody>
                {result.bands.map((b, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="py-1.5 pr-2">{bandLabel(b.from, b.to)}</td>
                    <td className="py-1.5 text-right">{b.rate}%</td>
                    <td className="py-1.5 text-right">{eur.format(b.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {result.helpToBuyMax !== null && (
            <p className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-sm">
              Help to Buy: up to <strong>{eur.format(result.helpToBuyMax)}</strong>, depending on the income tax you
              paid in the last four years.
            </p>
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

      {/* Next step: property solicitors in Ireland */}
      <div className="mt-6 rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] p-5">
        <p className="font-medium text-[#10233D]">Need a conveyancing solicitor in Ireland?</p>
        <p className="mt-1 text-sm text-[#5B6472]">
          Your solicitor files the stamp duty return with Revenue and registers the property with Tailte Éireann.
        </p>
        {withProperty.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {withProperty.slice(0, 12).map((c) => (
              <Link
                key={c.slug}
                href={`/ie/solicitors/property/${c.slug}`}
                className="rounded-full border border-[#DCD8D0] bg-white px-3 py-1 text-sm text-[#10233D] hover:border-[#B8863B]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
        <Link
          href="/ie/solicitors/property"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#B8863B] hover:underline"
        >
          All property solicitors in Ireland <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
