"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CAT_GROUP_LABEL, calculateCat, type CatRelationship } from "@/lib/ie/cat";
import { MoneyInput, Toggle, eur, parseMoney } from "@/components/tools/ie-tool-ui";

const RELATIONSHIPS: CatRelationship[] = ["A", "B", "C", "spouse"];

export function IeCatCalculator() {
  const [relationship, setRelationship] = useState<CatRelationship>("A");
  const [kind, setKind] = useState<"gift" | "inheritance">("inheritance");
  const [valueText, setValueText] = useState("500,000");
  const [previousText, setPreviousText] = useState("0");

  const result = useMemo(
    () => calculateCat({ relationship, kind, value: parseMoney(valueText), previous: parseMoney(previousText) }),
    [relationship, kind, valueText, previousText]
  );

  return (
    <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <fieldset>
            <legend className="text-sm font-medium text-[#10233D]">Who is it from?</legend>
            <div className="mt-1.5 space-y-2">
              {RELATIONSHIPS.map((r) => (
                <label
                  key={r}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                    relationship === r ? "border-[#B8863B] bg-[#FBF7F0]" : "border-[#DCD8D0] hover:border-[#B8863B]"
                  }`}
                >
                  <input
                    type="radio"
                    name="cat-rel"
                    checked={relationship === r}
                    onChange={() => setRelationship(r)}
                    className="mt-1 accent-[#10233D]"
                  />
                  <span>
                    <span className="block text-sm font-medium text-[#10233D]">{CAT_GROUP_LABEL[r].title}</span>
                    <span className="block text-xs text-[#5B6472]">{CAT_GROUP_LABEL[r].who}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Toggle
            legend="Is it a gift or an inheritance?"
            options={[
              { value: "inheritance" as const, label: "Inheritance" },
              { value: "gift" as const, label: "Gift (while alive)" },
            ]}
            value={kind}
            onChange={setKind}
          />
          <MoneyInput id="cat-value" label="Value you're receiving" value={valueText} onChange={setValueText} />
          {relationship !== "spouse" && (
            <MoneyInput
              id="cat-prev"
              label="Earlier gifts/inheritances in the same group"
              hint="Anything you've received since 5 December 1991 from anyone in this group"
              value={previousText}
              onChange={setPreviousText}
            />
          )}
        </div>

        <div aria-live="polite" className="rounded-xl bg-[#10233D] p-5 text-white sm:p-6">
          <p className="text-sm text-white/70">Estimated CAT to pay</p>
          <p className="mt-1 font-serif text-4xl sm:text-5xl">{eur.format(result.tax)}</p>
          {!result.exempt && result.threshold !== null && (
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between border-t border-white/10 pt-2">
                <dt className="text-white/70">Taxable value</dt>
                <dd>{eur.format(result.taxableValue)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <dt className="text-white/70">Group threshold</dt>
                <dd>{eur.format(result.threshold)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <dt className="text-white/70">Threshold already used</dt>
                <dd>{eur.format(result.thresholdUsedBefore)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <dt className="text-white/70">Threshold left afterwards</dt>
                <dd>{eur.format(result.thresholdLeftAfter)}</dd>
              </div>
            </dl>
          )}
          <ul className="mt-4 space-y-1.5 text-xs text-white/75">
            {result.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] p-5">
        <p className="font-medium text-[#10233D]">Inheriting or planning an estate?</p>
        <p className="mt-1 text-sm text-[#5B6472]">
          A wills and probate solicitor can check which reliefs apply and file the return with Revenue.
        </p>
        <Link href="/ie/solicitors/wills-probate" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#B8863B] hover:underline">
          Wills &amp; probate solicitors in Ireland <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
