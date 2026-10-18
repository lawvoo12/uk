"use client";

import { useMemo, useState } from "react";

import { calculateAlRecordationTax } from "@/lib/us/recordation-tax";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

function parseMoney(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function DollarInput({
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
          onBlur={() => onChange(n ? n.toLocaleString("en-US") : "")}
          className="w-full bg-transparent px-2 py-3 text-lg text-[#10233D] outline-none"
        />
      </div>
    </div>
  );
}

/** Alabama deed tax and mortgage tax — figures from lib/us/recordation-tax.ts. */
export function UsRecordationTaxCalculator() {
  const [price, setPrice] = useState("300,000");
  const [mortgage, setMortgage] = useState("240,000");
  const [simultaneous, setSimultaneous] = useState(true);

  const result = useMemo(
    () => calculateAlRecordationTax({ price: parseMoney(price), mortgage: parseMoney(mortgage), simultaneous }),
    [price, mortgage, simultaneous]
  );
  const hasMortgage = parseMoney(mortgage) > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5 rounded-2xl border border-[#DCD8D0] bg-white p-6">
        <DollarInput id="al-price" label="Purchase price" hint="The value on the deed." value={price} onChange={setPrice} />
        <DollarInput
          id="al-mortgage"
          label="Mortgage amount"
          hint="Leave blank if you're not taking out a mortgage."
          value={mortgage}
          onChange={setMortgage}
        />
        <label className={`flex items-start gap-3 text-sm ${hasMortgage ? "text-[#10233D]" : "text-[#A8A398]"}`}>
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[#10233D]"
            checked={simultaneous}
            disabled={!hasMortgage}
            onChange={(e) => setSimultaneous(e.target.checked)}
          />
          <span>
            The mortgage is recorded at the same time as the deed
            <span className="block text-xs text-[#5B6472]">
              Deed tax is then worked out only on the part of the price above the mortgage, if the lender is a taxable
              concern and mortgage tax is paid.
            </span>
          </span>
        </label>
      </div>

      <div aria-live="polite" className="rounded-2xl border border-[#10233D] bg-[#10233D] p-6 text-white">
        <p className="text-sm text-white/70">Recordation tax due</p>
        <p className="mt-1 font-serif text-4xl">{usd.format(result.total)}</p>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-white/70">
              Deed tax
              <span className="block text-xs">on {usd.format(result.deedTaxBase).replace(/\.00$/, "")}</span>
            </dt>
            <dd>{usd.format(result.deedTax)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/70">Mortgage tax</dt>
            <dd>{usd.format(result.mortgageTax)}</dd>
          </div>
        </dl>
        {hasMortgage && simultaneous && result.deedTaxWithoutDeduction > result.deedTax && (
          <p className="mt-4 text-xs text-white/70">
            Without the mortgage deduction the deed tax would be {usd.format(result.deedTaxWithoutDeduction)}.
          </p>
        )}
        <p className="mt-5 border-t border-white/20 pt-4 text-xs text-white/70">
          Recording fees charged by the county probate office are extra and differ by county.
        </p>
      </div>
    </div>
  );
}
