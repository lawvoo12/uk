"use client";

// Small shared inputs for the Irish calculators, styled like the stamp duty calculator.

export const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function MoneyInput({
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
  const n = Number(value.replace(/[^0-9.]/g, "")) || 0;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-[#10233D]">
        {label}
      </label>
      {hint && <p className="text-xs text-[#5B6472]">{hint}</p>}
      <div className="mt-1.5 flex items-center rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] focus-within:border-[#B8863B]">
        <span className="pl-4 text-[#5B6472]">€</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => n && onChange(n.toLocaleString("en-IE"))}
          className="w-full bg-transparent px-2 py-3 text-lg text-[#10233D] outline-none"
        />
      </div>
    </div>
  );
}

export function parseMoney(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

export function Stepper({
  id,
  label,
  hint,
  value,
  onChange,
  max = 20,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm text-[#10233D]">
        {label}
        {hint && <span className="block text-xs text-[#5B6472]">{hint}</span>}
      </label>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label={`Fewer: ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="h-9 w-9 rounded-lg border border-[#DCD8D0] text-lg text-[#10233D] hover:border-[#B8863B]"
        >
          −
        </button>
        <input
          id={id}
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(0, Number(e.target.value.replace(/\D/g, "")) || 0)))}
          className="h-9 w-12 rounded-lg border border-[#DCD8D0] bg-[#FAF9F6] text-center text-[#10233D]"
        />
        <button
          type="button"
          aria-label={`More: ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-9 w-9 rounded-lg border border-[#DCD8D0] text-lg text-[#10233D] hover:border-[#B8863B]"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function Toggle<T extends string | boolean | number>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-[#10233D]">{legend}</legend>
      <div className={`mt-1.5 grid gap-2 ${options.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
              value === o.value
                ? "border-[#10233D] bg-[#10233D] text-white"
                : "border-[#DCD8D0] bg-white text-[#10233D] hover:border-[#B8863B]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
