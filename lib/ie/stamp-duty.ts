// ============================================================================
// Republic of Ireland — stamp duty on buying a residential property.
//
// Rates checked 28 Sep 2026 against:
//   Revenue — "Stamp Duty rates" (published 22 Oct 2025):
//     https://www.revenue.ie/en/property/stamp-duty/property/stamp-duty-property/rates.aspx
//     Residential: 1% up to €1m, 2% on €1m–€1.5m, 6% over €1.5m (6% band from 2 Oct 2024).
//     Non-residential: 7.5%. 15% where someone buys 10+ houses in 12 months (s.31E SDCA 1999).
//   Citizens Information — "Stamp duty on property" (edited 29 Apr 2026):
//     https://www.citizensinformation.ie/en/housing/owning-a-home/buying-a-home/stamp-duty/
//     New homes: stamp duty is charged on the price excluding VAT. No first-time buyer relief.
//   VAT on new homes: 13.5%; new apartments 9% from 8 Oct 2025 to 31 Dec 2030 (Budget 2026).
//   Help to Buy — Citizens Information (edited 3 Apr 2025) and revenue.ie:
//     the lesser of €30,000 or 10% of the price, homes up to €500,000,
//     mortgage of at least 70%, scheme runs to 31 Dec 2029.
// A new Budget is announced every October — re-check the rates after it and
// update IE_RATES_CHECKED.
// ============================================================================

export const IE_RATES_CHECKED = "28 September 2026";

export interface IeBand {
  upTo: number;
  rate: number;
}

export const IE_RESIDENTIAL: IeBand[] = [
  { upTo: 1_000_000, rate: 1 },
  { upTo: 1_500_000, rate: 2 },
  { upTo: Infinity, rate: 6 },
];

export const IE_NON_RESIDENTIAL_RATE = 7.5;
export const IE_BULK_HOUSES_RATE = 15;

export const VAT_RATES = {
  house: 13.5,
  apartment: 9,
} as const;

export type NewHomeType = keyof typeof VAT_RATES;

export const HTB_MAX = 30_000;
export const HTB_RATE = 10;
export const HTB_MAX_PRICE = 500_000;

export interface IeBandResult {
  from: number;
  to: number;
  rate: number;
  taxable: number;
  tax: number;
}

export interface IeStampDutyResult {
  /** The amount stamp duty is charged on (VAT removed for new homes). */
  dutiable: number;
  total: number;
  effectiveRate: number;
  bands: IeBandResult[];
  notes: string[];
  /** Estimated maximum Help to Buy refund, or null if not applicable. */
  helpToBuyMax: number | null;
}

export function calculateIeStampDuty(input: {
  /** The price you pay (for a new home, including VAT). */
  price: number;
  newHome: boolean;
  newHomeType?: NewHomeType;
  firstTimeBuyer: boolean;
}): IeStampDutyResult {
  const price = Math.max(0, Math.floor(input.price));
  const notes: string[] = [];
  let dutiable = price;

  if (input.newHome) {
    const vat = VAT_RATES[input.newHomeType ?? "house"];
    dutiable = Math.floor(price / (1 + vat / 100));
    notes.push(
      `New home: stamp duty is charged on the price excluding VAT at ${vat}% — €${dutiable.toLocaleString("en-IE")} here.`
    );
  }

  const bands: IeBandResult[] = [];
  let from = 0;
  for (const band of IE_RESIDENTIAL) {
    if (dutiable <= from) break;
    const to = Math.min(dutiable, band.upTo);
    const taxable = to - from;
    bands.push({ from, to, rate: band.rate, taxable, tax: Math.floor((taxable * band.rate) / 100) });
    from = band.upTo;
  }
  const total = bands.reduce((t, b) => t + b.tax, 0);

  if (input.firstTimeBuyer) {
    notes.push("There's no stamp duty relief for first-time buyers in Ireland — the same rates apply.");
  }

  let helpToBuyMax: number | null = null;
  if (input.firstTimeBuyer && input.newHome) {
    if (price <= HTB_MAX_PRICE) {
      helpToBuyMax = Math.min(HTB_MAX, Math.floor((price * HTB_RATE) / 100));
      notes.push(
        "Help to Buy may refund income tax you paid in the last four years, up to the lesser of €30,000 or 10% of the price. You need a mortgage of at least 70%."
      );
    } else {
      notes.push("Help to Buy only applies to new homes costing €500,000 or less.");
    }
  }

  return {
    dutiable,
    total,
    effectiveRate: price > 0 ? (total / price) * 100 : 0,
    bands,
    notes,
    helpToBuyMax,
  };
}
