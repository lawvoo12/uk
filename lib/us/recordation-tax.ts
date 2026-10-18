// ============================================================================
// Alabama recordation tax (deed tax and mortgage tax) — the maths behind
// /us/tools/alabama-deed-mortgage-tax-calculator.
//
// Rules read on official sources on 17 Oct 2026:
//  - Deeds: $.50 per $500 of value or fraction thereof; mortgages: $.15 per
//    $100 of indebtedness or fraction thereof; two-thirds to the state General
//    Fund, one-third to the county — Alabama Department of Revenue,
//    "Recordation Tax" (Code of Alabama §§ 40-22-1 to 40-22-12)
//  - When a mortgage is recorded at the same time as the deed, "the deed tax
//    will be figured on the amount of the sales price exceeding the amount of
//    the mortgage", if the mortgage is made to a taxable concern and the
//    mortgage tax is collected — Baldwin County Probate Office, "Recording
//    Fees" (worked example: $125,000 sale, $50,000 mortgage → deed tax on
//    $75,000)
//
// NOT included: recording (page) fees and other county charges, which differ
// by county; exemptions.
// ============================================================================

export const US_RECORDATION_CHECKED = "17 October 2026";

export const AL_RECORDATION_SOURCES = {
  revenue: { label: "Alabama Department of Revenue: Recordation Tax", href: "https://www.revenue.alabama.gov/?p=56784" },
  baldwin: {
    label: "Baldwin County Probate Office: Recording Fees",
    href: "https://baldwincountyal.gov/government/probate-office/recording/recording-fees",
  },
  probateDirectory: {
    label: "County probate office directory",
    href: "https://www.revenue.alabama.gov/business-license/county-probate-office-directory/",
  },
};

export interface AlRecordationInput {
  /** Purchase price (or value) on the deed, in dollars. */
  price: number;
  /** Mortgage amount, in dollars (0 = no mortgage). */
  mortgage: number;
  /** The mortgage is recorded at the same time as the deed (and mortgage tax is paid on it). */
  simultaneous: boolean;
}

export interface AlRecordationResult {
  deedTaxBase: number;
  deedTax: number;
  mortgageTax: number;
  total: number;
  /** Deed tax if the mortgage were not deducted — shown for comparison. */
  deedTaxWithoutDeduction: number;
}

/** $.50 for every $500 or part of $500. */
export function alDeedTax(value: number): number {
  if (!(value > 0)) return 0;
  return Math.ceil(value / 500) * 0.5;
}

/** $.15 for every $100 or part of $100. */
export function alMortgageTax(amount: number): number {
  if (!(amount > 0)) return 0;
  // Work in cents so 0.15 × n doesn't pick up floating-point noise.
  return (Math.ceil(amount / 100) * 15) / 100;
}

export function calculateAlRecordationTax(input: AlRecordationInput): AlRecordationResult {
  const price = Math.max(0, input.price || 0);
  const mortgage = Math.max(0, input.mortgage || 0);
  const deedTaxBase = input.simultaneous && mortgage > 0 ? Math.max(0, price - mortgage) : price;
  const deedTax = alDeedTax(deedTaxBase);
  const mortgageTax = alMortgageTax(mortgage);
  return {
    deedTaxBase,
    deedTax,
    mortgageTax,
    total: Math.round((deedTax + mortgageTax) * 100) / 100,
    deedTaxWithoutDeduction: alDeedTax(price),
  };
}
