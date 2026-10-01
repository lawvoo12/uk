"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { calculateIntestacy } from "@/lib/ie/intestacy";
import { MoneyInput, Stepper, Toggle, eur, parseMoney } from "@/components/tools/ie-tool-ui";

export function IeIntestacyCalculator() {
  const [estateText, setEstateText] = useState("300,000");
  const [spouse, setSpouse] = useState(true);
  const [childrenAlive, setChildrenAlive] = useState(2);
  const [childrenDeceased, setChildrenDeceased] = useState(0);
  const [parents, setParents] = useState<0 | 1 | 2>(0);
  const [siblings, setSiblings] = useState(0);
  const [siblingsDeceased, setSiblingsDeceased] = useState(0);

  const estate = parseMoney(estateText);
  const result = useMemo(
    () =>
      calculateIntestacy({
        estate,
        spouse,
        childrenAlive,
        childrenDeceasedWithIssue: childrenDeceased,
        parentsAlive: parents,
        siblingsAlive: siblings,
        siblingsDeceasedWithIssue: siblingsDeceased,
      }),
    [estate, spouse, childrenAlive, childrenDeceased, parents, siblings, siblingsDeceased]
  );
  const needsParents = !spouse && childrenAlive + childrenDeceased === 0;
  const needsSiblings = needsParents && parents === 0;

  return (
    <div className="rounded-2xl border border-[#DCD8D0] bg-white p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <MoneyInput
            id="int-estate"
            label="Value of the estate"
            hint="After debts, funeral and administration costs"
            value={estateText}
            onChange={setEstateText}
          />
          <Toggle
            legend="Did they leave a spouse or civil partner?"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            value={spouse}
            onChange={setSpouse}
          />
          <div className="space-y-3 rounded-xl border border-[#DCD8D0] p-4">
            <p className="text-sm font-medium text-[#10233D]">Children</p>
            <Stepper id="int-kids" label="Children still alive" value={childrenAlive} onChange={setChildrenAlive} />
            <Stepper
              id="int-kids-dec"
              label="Children who died before them, leaving children"
              hint="Their share goes to their own children"
              value={childrenDeceased}
              onChange={setChildrenDeceased}
            />
          </div>
          {needsParents && (
            <Toggle
              legend="Parents still alive"
              options={[
                { value: 0 as 0 | 1 | 2, label: "None" },
                { value: 1 as 0 | 1 | 2, label: "One" },
                { value: 2 as 0 | 1 | 2, label: "Both" },
              ]}
              value={parents}
              onChange={setParents}
            />
          )}
          {needsSiblings && (
            <div className="space-y-3 rounded-xl border border-[#DCD8D0] p-4">
              <p className="text-sm font-medium text-[#10233D]">Brothers and sisters</p>
              <Stepper id="int-sibs" label="Brothers and sisters still alive" value={siblings} onChange={setSiblings} />
              <Stepper
                id="int-sibs-dec"
                label="Brothers/sisters who died before them, leaving children"
                value={siblingsDeceased}
                onChange={setSiblingsDeceased}
              />
            </div>
          )}
        </div>

        <div aria-live="polite" className="rounded-xl bg-[#10233D] p-5 text-white sm:p-6">
          <p className="text-sm text-white/70">Who inherits (no will)</p>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-white/60">
                <th className="pb-2 font-normal">Who</th>
                <th className="pb-2 text-right font-normal">Share</th>
                <th className="pb-2 text-right font-normal">Amount</th>
              </tr>
            </thead>
            <tbody>
              {result.shares.map((s, i) => (
                <tr key={i} className="border-t border-white/10 align-top">
                  <td className="py-2 pr-2">{s.who}</td>
                  <td className="py-2 text-right">{s.fraction}</td>
                  <td className="py-2 pl-2 text-right">{s.amount === null ? "—" : eur.format(s.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="mt-4 space-y-1.5 text-xs text-white/75">
            {result.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#DCD8D0] bg-[#FAF9F6] p-5">
        <p className="font-medium text-[#10233D]">Dealing with an estate?</p>
        <p className="mt-1 text-sm text-[#5B6472]">
          A wills and probate solicitor can apply for the grant, trace relatives and handle tax. Inheritances may also be
          subject to Capital Acquisitions Tax.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/ie/solicitors/wills-probate" className="inline-flex items-center gap-1 text-[#B8863B] hover:underline">
            Wills &amp; probate solicitors <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <Link href="/ie/tools/inheritance-tax-calculator" className="inline-flex items-center gap-1 text-[#B8863B] hover:underline">
            Inheritance tax calculator <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </div>
  );
}
