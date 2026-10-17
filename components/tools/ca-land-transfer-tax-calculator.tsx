"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  CA_LTT_PROVINCES,
  NS_MUNICIPAL_RATES,
  calculateCaLandTransferTax,
} from "@/lib/ca/land-transfer-tax";
import { CA_PROVINCE_ORDER, type CaProvinceCode } from "@/lib/ca/provinces";

export interface CaPropertyCityOption {
  slug: string;
  name: string;
  province: CaProvinceCode;
  count: number;
}

/** Provinces where the mortgage amount changes a registration fee. */
const MORTGAGE_PROVINCES: CaProvinceCode[] = ["AB", "SK", "MB", "NS", "NB", "NL", "PE"];

function cad(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function parseMoney(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function MoneyField({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const n = parseMoney(value);
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-[#10233D]">
        {label}
      </label>
      {hint && <p className="text-xs text-[#5B6472]">{hint}</p>}
      <div className="mt-1.5 flex items-center rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] focus-within:border-[#B8863B]">
        <span className="pl-4 text-[#5B6472]">$</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => n && onChange(n.toLocaleString("en-CA"))}
          className="w-full bg-transparent px-2 py-3 text-lg text-[#10233D] outline-none"
        />
      </div>
    </div>
  );
}

export function CaLandTransferTaxCalculator({ cities }: { cities: CaPropertyCityOption[] }) {
  const [province, setProvince] = useState<CaProvinceCode>("ON");
  const [priceText, setPriceText] = useState("600,000");
  const [assessedText, setAssessedText] = useState("");
  const [mortgageText, setMortgageText] = useState("");
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);
  const [toronto, setToronto] = useState(false);
  const [nsRate, setNsRate] = useState<number>(NS_MUNICIPAL_RATES[0]);

  const info = CA_LTT_PROVINCES[province];
  const price = parseMoney(priceText);
  const showMortgage = MORTGAGE_PROVINCES.includes(province);

  const result = useMemo(
    () =>
      calculateCaLandTransferTax({
        province,
        price,
        assessedValue: info.usesAssessedValue ? parseMoney(assessedText) : undefined,
        mortgage: showMortgage ? parseMoney(mortgageText) : undefined,
        firstTimeBuyer: info.hasFirstTimeRelief && firstTimeBuyer,
        toronto: province === "ON" && toronto,
        nsRate,
      }),
    [province, price, assessedText, mortgageText, firstTimeBuyer, toronto, nsRate, info, showMortgage]
  );

  const provinceCities = cities.filter((c) => c.province === province && c.count > 0);

  return (
    <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label htmlFor="ca-ltt-province" className="text-sm font-medium text-[#10233D]">
              Province
            </label>
            <select
              id="ca-ltt-province"
              value={province}
              onChange={(e) => setProvince(e.target.value as CaProvinceCode)}
              className="mt-1.5 w-full rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3 text-lg text-[#10233D] outline-none focus:border-[#B8863B]"
            >
              {CA_PROVINCE_ORDER.map((code) => (
                <option key={code} value={code}>
                  {CA_LTT_PROVINCES[code].name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-[#5B6472]">{info.summary}</p>
          </div>

          <MoneyField id="ca-ltt-price" label="Purchase price" value={priceText} onChange={setPriceText} />

          {info.usesAssessedValue && (
            <MoneyField
              id="ca-ltt-assessed"
              label="Assessed value (optional)"
              hint="The tax uses whichever is greater: the price or the assessed value."
              value={assessedText}
              onChange={setAssessedText}
            />
          )}

          {showMortgage && (
            <MoneyField
              id="ca-ltt-mortgage"
              label="Mortgage amount (optional)"
              hint="Used for the fee to register your mortgage."
              value={mortgageText}
              onChange={setMortgageText}
            />
          )}

          {province === "ON" && (
            <label className="flex cursor-pointer items-start gap-3 text-sm text-[#10233D]">
              <input type="checkbox" checked={toronto} onChange={(e) => setToronto(e.target.checked)} className="mt-1 accent-[#10233D]" />
              <span>
                The home is in the City of Toronto
                <span className="block text-xs text-[#5B6472]">Adds Toronto&apos;s municipal land transfer tax</span>
              </span>
            </label>
          )}

          {province === "NS" && (
            <div>
              <label htmlFor="ca-ltt-ns-rate" className="text-sm font-medium text-[#10233D]">
                Municipality&apos;s deed transfer tax rate
              </label>
              <select
                id="ca-ltt-ns-rate"
                value={nsRate}
                onChange={(e) => setNsRate(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3 text-[#10233D] outline-none focus:border-[#B8863B]"
              >
                {NS_MUNICIPAL_RATES.map((r) => (
                  <option key={r} value={r}>
                    {r}%{r === 1.5 ? " — Halifax Regional Municipality and many others" : ""}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-[#5B6472]">Not Halifax? Check the province&apos;s rate list, linked below.</p>
            </div>
          )}

          {info.hasFirstTimeRelief && (
            <label className="flex cursor-pointer items-start gap-3 text-sm text-[#10233D]">
              <input
                type="checkbox"
                checked={firstTimeBuyer}
                onChange={(e) => setFirstTimeBuyer(e.target.checked)}
                className="mt-1 accent-[#10233D]"
              />
              <span>
                I&apos;m a first-time home buyer
                <span className="block text-xs text-[#5B6472]">Applies the province&apos;s first-time buyer relief, if you qualify</span>
              </span>
            </label>
          )}
        </div>

        {/* Result */}
        <div aria-live="polite" className="rounded-xl bg-[#10233D] p-5 text-white sm:p-6">
          <p className="text-sm text-white/70">{result.taxLines.length > 0 && result.feeLines.length > 0 ? "Tax and registration fees" : info.taxName}</p>
          <p className="mt-1 font-serif text-4xl sm:text-5xl">{cad(result.total)}</p>
          <p className="mt-1 text-sm text-white/70">
            {info.name} · on a price of {cad(price)}
          </p>

          <table className="mt-5 w-full text-sm">
            <tbody>
              {result.taxLines.map((l) => (
                <tr key={l.label} className="border-t border-white/10">
                  <td className="py-1.5 pr-2">{l.label}</td>
                  <td className="py-1.5 text-right">{cad(l.amount)}</td>
                </tr>
              ))}
              {result.reliefLines.map((l) => (
                <tr key={l.label} className="border-t border-white/10">
                  <td className="py-1.5 pr-2">{l.label}</td>
                  <td className="py-1.5 text-right">−{cad(l.amount)}</td>
                </tr>
              ))}
              {result.feeLines.map((l) => (
                <tr key={l.label} className="border-t border-white/10">
                  <td className="py-1.5 pr-2">{l.label}</td>
                  <td className="py-1.5 text-right">{cad(l.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {result.notes.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-xs text-white/75">
              {result.notes.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-xs text-white/75">
            Official sources:{" "}
            {info.sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 && " · "}
                <a className="underline" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Next step: real estate lawyers */}
      <div className="mt-6 rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] p-5">
        <p className="font-medium text-[#10233D]">Need a real estate lawyer in {info.name}?</p>
        <p className="mt-1 text-sm text-[#5B6472]">
          Your lawyer works out the exact amount, collects it from you before closing and registers the transfer.
        </p>
        {provinceCities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {provinceCities.map((c) => (
              <Link
                key={c.slug}
                href={`/ca/lawyers/real-estate/${c.slug}`}
                className="rounded-full border border-[#DCD8D0] bg-white px-3 py-1 text-sm text-[#10233D] hover:border-[#B8863B]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
        <Link href="/ca/lawyers/real-estate" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#B8863B] hover:underline">
          All real estate lawyers in Canada <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
