// ============================================================================
// Property purchase tax on residential homes, for each UK nation.
//
//   England & Northern Ireland — Stamp Duty Land Tax (SDLT), HMRC
//   Scotland                   — Land and Buildings Transaction Tax (LBTT), Revenue Scotland
//   Wales                      — Land Transaction Tax (LTT), Welsh Revenue Authority
//
// Rates checked 28 Sep 2026 against:
//   https://www.gov.uk/stamp-duty-land-tax/residential-property-rates  (from 1 Apr 2025; surcharge 5% from 31 Oct 2024)
//   https://www.gov.scot/publications/scottish-budget-2026-2027-scottish-tax-ready-reckoners/pages/4/  (2026-27; ADS 8%)
//   https://www.gov.wales/land-transaction-tax-rates-and-bands  (main from 10 Oct 2022; higher from 11 Dec 2024)
// When a government changes a rate, update RATES_CHECKED and the tables below.
// ============================================================================

export const RATES_CHECKED = "28 September 2026";

export type Nation = "england" | "northern-ireland" | "scotland" | "wales";
export type BuyerType = "home-mover" | "first-time" | "additional";

export interface Band {
  /** Upper limit of the band in £ (Infinity for the top band). */
  upTo: number;
  /** Rate as a percentage, e.g. 5 for 5%. */
  rate: number;
}

export interface BandResult {
  from: number;
  to: number;
  rate: number;
  taxable: number;
  tax: number;
  /** True for Scotland's ADS, charged on the whole price rather than a band. */
  supplement?: boolean;
}

export interface StampDutyResult {
  taxName: string;
  total: number;
  effectiveRate: number;
  bands: BandResult[];
  notes: string[];
}

export const NATION_LABEL: Record<Nation, string> = {
  england: "England",
  "northern-ireland": "Northern Ireland",
  scotland: "Scotland",
  wales: "Wales",
};

export const SDLT: Band[] = [
  { upTo: 125_000, rate: 0 },
  { upTo: 250_000, rate: 2 },
  { upTo: 925_000, rate: 5 },
  { upTo: 1_500_000, rate: 10 },
  { upTo: Infinity, rate: 12 },
];
const SDLT_FTB: Band[] = [
  { upTo: 300_000, rate: 0 },
  { upTo: 500_000, rate: 5 },
];
const SDLT_FTB_MAX_PRICE = 500_000;
const SDLT_SURCHARGE = 5; // additional dwellings, on every band
const SDLT_NON_RESIDENT = 2; // on every band

export const LBTT: Band[] = [
  { upTo: 145_000, rate: 0 },
  { upTo: 250_000, rate: 2 },
  { upTo: 325_000, rate: 5 },
  { upTo: 750_000, rate: 10 },
  { upTo: Infinity, rate: 12 },
];
const LBTT_FTB_NIL_BAND = 175_000;
const LBTT_ADS = 8; // Additional Dwelling Supplement, % of the whole price

export const LTT: Band[] = [
  { upTo: 225_000, rate: 0 },
  { upTo: 400_000, rate: 6 },
  { upTo: 750_000, rate: 7.5 },
  { upTo: 1_500_000, rate: 10 },
  { upTo: Infinity, rate: 12 },
];
export const LTT_HIGHER: Band[] = [
  { upTo: 180_000, rate: 5 },
  { upTo: 250_000, rate: 8.5 },
  { upTo: 400_000, rate: 10 },
  { upTo: 750_000, rate: 12.5 },
  { upTo: 1_500_000, rate: 15 },
  { upTo: Infinity, rate: 17 },
];

/** Surcharges / higher rates don't apply to homes under this price (all three taxes). */
const SURCHARGE_MIN_PRICE = 40_000;

function applyBands(price: number, bands: Band[], extraRate = 0): BandResult[] {
  const out: BandResult[] = [];
  let from = 0;
  for (const band of bands) {
    if (price <= from) break;
    const to = Math.min(price, band.upTo);
    const taxable = to - from;
    const rate = band.rate + extraRate;
    out.push({ from, to, rate, taxable, tax: Math.floor((taxable * rate) / 100) });
    from = band.upTo;
  }
  return out;
}

function sum(bands: BandResult[]) {
  return bands.reduce((t, b) => t + b.tax, 0);
}

export function calculateStampDuty(input: {
  price: number;
  nation: Nation;
  buyer: BuyerType;
  /** England & NI only: 2% surcharge for buyers not in the UK for 183+ days in the last year. */
  nonResident?: boolean;
}): StampDutyResult {
  const price = Math.max(0, Math.floor(input.price));
  const { nation, buyer } = input;
  const notes: string[] = [];
  const surchargeApplies = buyer === "additional" && price >= SURCHARGE_MIN_PRICE;
  if (buyer === "additional" && !surchargeApplies) {
    notes.push("Homes under £40,000 don't pay the extra rate for additional properties.");
  }

  let taxName: string;
  let bands: BandResult[];

  if (nation === "england" || nation === "northern-ireland") {
    taxName = "Stamp Duty Land Tax (SDLT)";
    const extra = (surchargeApplies ? SDLT_SURCHARGE : 0) + (input.nonResident ? SDLT_NON_RESIDENT : 0);
    if (buyer === "first-time" && price <= SDLT_FTB_MAX_PRICE) {
      bands = applyBands(price, SDLT_FTB, extra);
      notes.push("First-time buyer relief applied: no SDLT up to £300,000 and 5% on the part up to £500,000.");
    } else {
      if (buyer === "first-time") {
        notes.push("First-time buyer relief isn't available above £500,000, so standard rates apply.");
      }
      bands = applyBands(price, SDLT, extra);
    }
    if (surchargeApplies) notes.push("Includes the 5% surcharge for owning more than one home.");
    if (input.nonResident) notes.push("Includes the 2% surcharge for non-UK residents.");
  } else if (nation === "scotland") {
    taxName = "Land and Buildings Transaction Tax (LBTT)";
    const table =
      buyer === "first-time"
        ? [{ upTo: LBTT_FTB_NIL_BAND, rate: 0 }, ...LBTT.filter((b) => b.upTo > LBTT_FTB_NIL_BAND)]
        : LBTT;
    bands = applyBands(price, table);
    if (buyer === "first-time") {
      notes.push("First-time buyer relief applied: the 0% band is raised to £175,000 (saves up to £600).");
    }
    if (surchargeApplies) {
      const ads = Math.floor((price * LBTT_ADS) / 100);
      bands.push({ from: 0, to: price, rate: LBTT_ADS, taxable: price, tax: ads, supplement: true });
      notes.push("Includes the 8% Additional Dwelling Supplement (ADS) on the whole price.");
    }
  } else {
    taxName = "Land Transaction Tax (LTT)";
    bands = applyBands(price, surchargeApplies ? LTT_HIGHER : LTT);
    if (buyer === "first-time") notes.push("Wales has no separate first-time buyer relief; main rates apply.");
    if (surchargeApplies) notes.push("Higher residential rates applied for owning more than one home.");
  }

  const total = sum(bands);
  return {
    taxName,
    total,
    effectiveRate: price > 0 ? (total / price) * 100 : 0,
    bands,
    notes,
  };
}
