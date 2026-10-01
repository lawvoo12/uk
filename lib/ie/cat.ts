// ============================================================================
// Capital Acquisitions Tax (CAT) — gift and inheritance tax in Ireland.
// Checked 30 Sep 2026 against:
//   Revenue "CAT group thresholds" (published 24 Sep 2025):
//     https://www.revenue.ie/en/gains-gifts-and-inheritance/cat-thresholds-rates-and-aggregation-rules/cat-thresholds.aspx
//     Group A €400,000 | Group B €40,000 | Group C €20,000 (from 2 Oct 2024), rate 33%.
//   Citizens Information "Capital Acquisitions Tax" (edited 24 Sep 2025):
//     https://www.citizensinformation.ie/en/money-and-tax/tax/capital-taxes/capital-acquisitions-tax/
//     Spouses/civil partners exempt; small gift exemption €3,000 per donor per
//     year; aggregate benefits in the same group since 5 Dec 1991.
//   Budget 2026 (Oct 2025) left CAT unchanged.
// Re-check after every October Budget and update CAT_CHECKED.
// ============================================================================

export const CAT_CHECKED = "30 September 2026";
export const CAT_RATE = 33;
export const SMALL_GIFT_EXEMPTION = 3_000;

export type CatGroup = "A" | "B" | "C";
export type CatRelationship = "spouse" | CatGroup;

export const CAT_THRESHOLDS: Record<CatGroup, number> = { A: 400_000, B: 40_000, C: 20_000 };

/** Labels from the point of view of the person RECEIVING the gift or inheritance. */
export const CAT_GROUP_LABEL: Record<CatRelationship, { title: string; who: string }> = {
  spouse: { title: "My spouse or civil partner", who: "Always exempt from CAT" },
  A: {
    title: "My parent — Group A (€400,000)",
    who: "You're their child, stepchild or certain foster child. Also a parent inheriting from their own child.",
  },
  B: {
    title: "A close relative — Group B (€40,000)",
    who: "Your brother or sister, grandparent, grandchild, aunt or uncle (you're their niece or nephew), or your child giving you a lifetime gift",
  },
  C: {
    title: "Anyone else — Group C (€20,000)",
    who: "Cousins, a cohabiting partner, friends and everyone not in Groups A or B",
  },
};

export interface CatInput {
  relationship: CatRelationship;
  kind: "gift" | "inheritance";
  value: number;
  /** Earlier gifts/inheritances in the SAME group since 5 December 1991. */
  previous: number;
}

export interface CatResult {
  exempt: boolean;
  taxableValue: number;
  threshold: number | null;
  thresholdUsedBefore: number;
  thresholdLeftAfter: number;
  tax: number;
  notes: string[];
}

export function calculateCat(input: CatInput): CatResult {
  const value = Math.max(0, Math.floor(input.value));
  const previous = Math.max(0, Math.floor(input.previous));
  const notes: string[] = [];

  if (input.relationship === "spouse") {
    return {
      exempt: true,
      taxableValue: 0,
      threshold: null,
      thresholdUsedBefore: 0,
      thresholdLeftAfter: 0,
      tax: 0,
      notes: ["Gifts and inheritances between spouses or civil partners are exempt from CAT."],
    };
  }

  let taxableValue = value;
  if (input.kind === "gift") {
    const sge = Math.min(value, SMALL_GIFT_EXEMPTION);
    taxableValue = value - sge;
    if (sge > 0) notes.push(`The first €3,000 of gifts from each person in a calendar year is exempt (small gift exemption).`);
  }

  const threshold = CAT_THRESHOLDS[input.relationship];
  const before = Math.max(0, previous - threshold);
  const after = Math.max(0, previous + taxableValue - threshold);
  const tax = Math.floor(((after - before) * CAT_RATE) / 100);

  if (tax > 0) notes.push(`Tax is 33% of the amount above your remaining Group ${input.relationship} threshold.`);
  notes.push(
    "Reliefs can reduce or remove the tax — for example the dwelling house exemption, agricultural relief, business relief and 'favourite nephew/niece' relief. Ask a solicitor or tax adviser.",
    "Returns are generally filed and paid by 31 October, depending on the valuation date."
  );

  return {
    exempt: false,
    taxableValue,
    threshold,
    thresholdUsedBefore: Math.min(previous, threshold),
    thresholdLeftAfter: Math.max(0, threshold - previous - taxableValue),
    tax,
    notes,
  };
}
