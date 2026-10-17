// ============================================================================
// Canada — tax and registration fees when you buy a home, province by
// province. Used by /ca/tools/land-transfer-tax-calculator.
//
// Every rate below was read on the official source linked in
// CA_LTT_PROVINCES on 2-4 Oct 2026. Nothing here comes from a third-party
// calculator. deploy/canada-legal-sources.md has the full list.
//
//  ON  Land transfer tax bands and the first-time buyer refund (max $4,000):
//      ontario.ca. Toronto municipal land transfer tax bands (from
//      1 Apr 2026) and first-time rebate (max $4,475): toronto.ca
//  BC  Property transfer tax bands and the first time home buyers' program
//      (first $500,000 exempt up to $835,000; partial to $860,000): gov.bc.ca
//  AB  Land Titles fees, $50 + $5 per $5,000: alberta.ca fee schedule
//      (effective 1 Oct 2026)
//  SK  Land Titles fees (effective 15 Apr 2026): saskregistries.ca (ISC)
//  MB  Land transfer tax bands: gov.mb.ca/finance. Registration fee $137
//      (electronic, from 4 Jan 2026): teranetmanitoba.ca
//  NS  Deed transfer tax is municipal; Halifax 1.5%: halifax.ca; other
//      municipalities 1% to 1.5%: novascotia.ca rate list (July 2026).
//      Land registry $100 per document: novascotia.ca
//  NB  Real property transfer tax, 1% of the greater of price and assessed
//      value, to the nearest dollar: Real Property Transfer Tax Act, s. 2.
//      Land titles registration $85 per parcel: Regulation 83-130
//  NL  Registry of Deeds fees, $100 + $0.40 per $100 above $500; mortgages
//      capped at $5,000: gov.nl.ca schedule of fees
//  PE  Real property transfer tax, 1% of the greater of price and assessed
//      value, none at $30,000 or less, first-time buyers exempt; Registry
//      fees by value band: princeedwardisland.ca
//
// NOT calculated (shown as a note with a link instead):
//  - BC's partial first-time buyer exemption between $835,000 and $860,000
//    (the official page gives no formula)
//  - taxes on foreign or non-resident buyers (Ontario 25% plus Toronto 10%,
//    BC 20% in some regions, Nova Scotia 10%) — who pays depends on the
//    buyer's status
//  - Alberta rounding: the schedule says "$5/$5000 of value"; this file
//    rounds a part of $5,000 up, so the result can be up to $5 high
// Re-check after each provincial budget (and Toronto's) and update
// CA_LTT_CHECKED.
// ============================================================================

import type { CaProvinceCode } from "@/lib/ca/provinces";

export const CA_LTT_CHECKED = "4 October 2026";

export interface LttBand {
  /** Upper limit of the band (Infinity for the last one). */
  upTo: number;
  /** Per cent. */
  rate: number;
}

export interface LttSource {
  label: string;
  href: string;
}

export interface LttProvinceInfo {
  code: CaProvinceCode;
  name: string;
  /** What the charge is called in this province. */
  taxName: string;
  /** One sentence shown under the province picker. */
  summary: string;
  /** True if the tax is worked out on the greater of the price and the assessed value. */
  usesAssessedValue: boolean;
  /** True if a first-time buyer option changes the result. */
  hasFirstTimeRelief: boolean;
  sources: LttSource[];
}

// ----------------------------------------------------------------- Ontario
export const ON_BANDS: LttBand[] = [
  { upTo: 55_000, rate: 0.5 },
  { upTo: 250_000, rate: 1 },
  { upTo: 400_000, rate: 1.5 },
  { upTo: 2_000_000, rate: 2 },
  { upTo: Infinity, rate: 2.5 },
];
export const ON_FIRST_TIME_REFUND_MAX = 4_000;

/** City of Toronto municipal land transfer tax, one or two single family residences, from 1 Apr 2026. */
export const TORONTO_BANDS: LttBand[] = [
  { upTo: 55_000, rate: 0.5 },
  { upTo: 250_000, rate: 1 },
  { upTo: 400_000, rate: 1.5 },
  { upTo: 2_000_000, rate: 2 },
  { upTo: 3_000_000, rate: 2.5 },
  { upTo: 4_000_000, rate: 4.4 },
  { upTo: 5_000_000, rate: 5.45 },
  { upTo: 10_000_000, rate: 6.5 },
  { upTo: 20_000_000, rate: 7.55 },
  { upTo: Infinity, rate: 8.6 },
];
export const TORONTO_FIRST_TIME_REBATE_MAX = 4_475;

// -------------------------------------------------------- British Columbia
export const BC_BANDS: LttBand[] = [
  { upTo: 200_000, rate: 1 },
  { upTo: 2_000_000, rate: 2 },
  { upTo: Infinity, rate: 3 },
];
/** A further 2% on residential value above $3 million. */
export const BC_LUXURY_THRESHOLD = 3_000_000;
export const BC_LUXURY_RATE = 2;
export const BC_FTB_EXEMPT_AMOUNT = 500_000;
export const BC_FTB_FULL_LIMIT = 835_000;
export const BC_FTB_PARTIAL_LIMIT = 860_000;

// ---------------------------------------------------------------- Manitoba
export const MB_BANDS: LttBand[] = [
  { upTo: 30_000, rate: 0 },
  { upTo: 90_000, rate: 0.5 },
  { upTo: 150_000, rate: 1 },
  { upTo: 200_000, rate: 1.5 },
  { upTo: Infinity, rate: 2 },
];
/** Land titles registration, electronic filing, from 4 Jan 2026 (transfer or mortgage). */
export const MB_REGISTRATION_FEE = 137;

// ------------------------------------------------------------- Nova Scotia
/** Municipal deed transfer tax rates in use (per cent). Halifax is 1.5. */
export const NS_MUNICIPAL_RATES = [1.5, 1.25, 1] as const;
export const NS_HALIFAX_RATE = 1.5;
export const NS_REGISTRY_FEE = 100;

// ----------------------------------------------------------- New Brunswick
export const NB_RATE = 1;
/** Land titles: $84 plus a $1 assurance fee, per parcel, for a transfer or a mortgage. */
export const NB_REGISTRATION_FEE = 85;

// ---------------------------------------------------- Prince Edward Island
export const PE_RATE = 1;
export const PE_EXEMPT_UP_TO = 30_000;
/** Registry of Deeds fee for a deed (by value) or a mortgage (by principal). */
export const PE_REGISTRY_FEES: { below: number; fee: number }[] = [
  { below: 10_000, fee: 77.25 },
  { below: 20_000, fee: 103 },
  { below: 50_000, fee: 154.55 },
  { below: 100_000, fee: 231.8 },
  { below: 150_000, fee: 309.1 },
  { below: 200_000, fee: 386.4 },
  { below: Infinity, fee: 463.65 },
];

// ----------------------------------------------------------- Saskatchewan
export const SK_RATE = 0.4;
export const SK_FREE_UP_TO = 500;
export const SK_FLAT_UP_TO = 6_300;
export const SK_FLAT_FEE = 25;
/** Mortgage registration (first four titles), effective 15 Apr 2026. */
export const SK_MORTGAGE_FEES: { upTo: number; fee: number }[] = [
  { upTo: 249_999.99, fee: 200 },
  { upTo: 500_000, fee: 275 },
  { upTo: 750_000, fee: 525 },
  { upTo: 1_000_000, fee: 775 },
  { upTo: Infinity, fee: 1_000 },
];

// ----------------------------------------------------------------- Alberta
export const AB_BASE_FEE = 50;
export const AB_FEE_PER_UNIT = 5;
export const AB_UNIT = 5_000;

// ----------------------------------------------- Newfoundland and Labrador
export const NL_BASE_FEE = 100;
export const NL_BASE_UP_TO = 500;
export const NL_FEE_PER_100 = 0.4;
export const NL_MORTGAGE_FEE_MAX = 5_000;

export const CA_LTT_PROVINCES: Record<CaProvinceCode, LttProvinceInfo> = {
  ON: {
    code: "ON",
    name: "Ontario",
    taxName: "Land transfer tax",
    summary:
      "Ontario charges land transfer tax on the purchase price. Homes in the City of Toronto pay Toronto's municipal land transfer tax as well.",
    usesAssessedValue: false,
    hasFirstTimeRelief: true,
    sources: [
      { label: "Ontario: calculating land transfer tax", href: "https://www.ontario.ca/document/land-transfer-tax/calculating-land-transfer-tax" },
      {
        label: "Ontario: refunds for first-time homebuyers",
        href: "https://www.ontario.ca/document/land-transfer-tax/land-transfer-tax-refunds-first-time-homebuyers",
      },
      {
        label: "City of Toronto: municipal land transfer tax rates",
        href: "https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-land-transfer-tax-mltt/municipal-land-transfer-tax-mltt-rates-and-fees/",
      },
      { label: "Ontario: Non-Resident Speculation Tax", href: "https://www.ontario.ca/document/non-resident-speculation-tax" },
    ],
  },
  BC: {
    code: "BC",
    name: "British Columbia",
    taxName: "Property transfer tax",
    summary: "British Columbia charges property transfer tax on the fair market value when the transfer is registered at the Land Title Office.",
    usesAssessedValue: false,
    hasFirstTimeRelief: true,
    sources: [
      { label: "BC: property transfer tax", href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax" },
      {
        label: "BC: first time home buyers' program",
        href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/exemptions/first-time-home-buyers",
      },
      {
        label: "BC: additional property transfer tax (foreign buyers)",
        href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/additional-property-transfer-tax",
      },
    ],
  },
  AB: {
    code: "AB",
    name: "Alberta",
    taxName: "Land Titles registration fees",
    summary:
      "In Alberta the buyer pays Land Titles registration fees: one for the transfer, based on the property's value, and one for the mortgage, based on the amount borrowed.",
    usesAssessedValue: false,
    hasFirstTimeRelief: false,
    sources: [
      {
        label: "Alberta: Land Titles fee schedule",
        href: "https://www.alberta.ca/system/files/sartr-land-titles-and-surveys-common-documents-fee-schedule.pdf",
      },
      { label: "Alberta: registering a land title document", href: "https://www.alberta.ca/register-land-title-document-plan" },
    ],
  },
  SK: {
    code: "SK",
    name: "Saskatchewan",
    taxName: "Land Titles registration fees",
    summary:
      "In Saskatchewan the buyer pays Land Titles registration fees to ISC: a title transfer fee based on the property's value, and a mortgage registration fee.",
    usesAssessedValue: false,
    hasFirstTimeRelief: false,
    sources: [{ label: "ISC: Land Titles fees", href: "https://www.saskregistries.ca/Fees/LandTitlesFees" }],
  },
  MB: {
    code: "MB",
    name: "Manitoba",
    taxName: "Land transfer tax",
    summary:
      "Manitoba charges land transfer tax on the property's fair market value when the transfer is registered, plus a land titles registration fee.",
    usesAssessedValue: false,
    hasFirstTimeRelief: false,
    sources: [
      { label: "Manitoba Finance: land transfer tax", href: "https://www.gov.mb.ca/finance/other/landtransfertax.html" },
      { label: "Teranet Manitoba: land titles fees", href: "https://teranetmanitoba.ca/land-titles/land-titles-fees/" },
    ],
  },
  NS: {
    code: "NS",
    name: "Nova Scotia",
    taxName: "Deed transfer tax",
    summary:
      "In Nova Scotia deed transfer tax is municipal: each municipality sets its own rate. Halifax Regional Municipality charges 1.5% of the purchase price.",
    usesAssessedValue: false,
    hasFirstTimeRelief: false,
    sources: [
      { label: "Nova Scotia: municipal deed transfer tax", href: "https://www.novascotia.ca/municipal-deed-transfer-and-property-tax" },
      { label: "Nova Scotia: deed transfer tax rate for each municipality", href: "https://novascotia.ca/sns/pdf/ans-property-dtt-rates.pdf" },
      { label: "Halifax: deed transfer tax", href: "https://www.halifax.ca/home-property/property-taxes/taxes-halifax" },
      { label: "Nova Scotia: Non-resident Provincial Deed Transfer Tax", href: "https://www.novascotia.ca/non-resident-provincial-deed-transfer-tax" },
      { label: "Nova Scotia: land registry fees", href: "https://www.novascotia.ca/land-registry-fees" },
    ],
  },
  NB: {
    code: "NB",
    name: "New Brunswick",
    taxName: "Real property transfer tax",
    summary: "New Brunswick charges 1% of the purchase price or the property's assessed value, whichever is greater.",
    usesAssessedValue: true,
    hasFirstTimeRelief: false,
    sources: [
      { label: "New Brunswick: Real Property Transfer Tax Act", href: "https://laws.gnb.ca/en/document/cs/R-2.1" },
      { label: "New Brunswick: land titles fees (Regulation 83-130)", href: "https://laws.gnb.ca/en/document/cr/83-130" },
    ],
  },
  NL: {
    code: "NL",
    name: "Newfoundland and Labrador",
    taxName: "Registry of Deeds registration fees",
    summary:
      "In Newfoundland and Labrador the buyer pays Registry of Deeds registration fees: one for the deed, based on the property's value, and one for the mortgage.",
    usesAssessedValue: false,
    hasFirstTimeRelief: false,
    sources: [
      { label: "Registry of Deeds: registering a deed", href: "https://www.gov.nl.ca/dgsnl/registries/deeds/deed-reg/" },
      { label: "Registry of Deeds: schedule of fees", href: "https://www.gov.nl.ca/dgsnl/files/forms-files-fees-deed.pdf" },
      { label: "Registry of Deeds: official fee calculator", href: "https://cado.eservices.gov.nl.ca/Deeds/DeedsCompliance.aspx" },
    ],
  },
  PE: {
    code: "PE",
    name: "Prince Edward Island",
    taxName: "Real property transfer tax",
    summary:
      "Prince Edward Island charges 1% of the purchase price or the property's assessed value, whichever is greater. First-time home buyers who qualify are exempt.",
    usesAssessedValue: true,
    hasFirstTimeRelief: true,
    sources: [
      {
        label: "PEI: real property transfer tax",
        href: "https://www.princeedwardisland.ca/en/information/finance-and-affordability/real-property-transfer-tax-introduction",
      },
      {
        label: "PEI: first-time home buyers exemption",
        href: "https://www.princeedwardisland.ca/en/information/finance/real-property-transfer-tax-first-time-home-buyers-exemption",
      },
      { label: "PEI: Registry of Deeds fees", href: "https://www.princeedwardisland.ca/sites/default/files/publications/registry_fee_summary.pdf" },
    ],
  },
};

export interface LttLine {
  label: string;
  amount: number;
}

export interface LttResult {
  province: CaProvinceCode;
  /** Tax lines, before any first-time buyer relief. Empty where the province has no transfer tax line. */
  taxLines: LttLine[];
  /** Refunds, rebates and exemptions (positive numbers, taken off the tax). */
  reliefLines: LttLine[];
  /** Registration fees paid on top of any tax. */
  feeLines: LttLine[];
  tax: number;
  relief: number;
  fees: number;
  /** tax - relief + fees. */
  total: number;
  notes: string[];
}

export interface LttInput {
  province: CaProvinceCode;
  /** Purchase price. */
  price: number;
  /** Assessed value, where the province uses the greater of the two (NB, PE). */
  assessedValue?: number;
  /** Amount borrowed, for mortgage registration fees. */
  mortgage?: number;
  firstTimeBuyer?: boolean;
  /** Ontario only: the home is in the City of Toronto. */
  toronto?: boolean;
  /** Nova Scotia only: the municipality's rate in per cent (Halifax is 1.5). */
  nsRate?: number;
}

function cents(n: number): number {
  return Math.round(n * 100) / 100;
}

function cad(n: number): string {
  return `$${n.toLocaleString("en-CA", { maximumFractionDigits: 2 })}`;
}

/** Tax on `value` using marginal bands. */
export function bandTax(value: number, bands: LttBand[]): number {
  let from = 0;
  let tax = 0;
  for (const band of bands) {
    if (value <= from) break;
    const to = Math.min(value, band.upTo);
    tax += ((to - from) * band.rate) / 100;
    from = band.upTo;
  }
  return cents(tax);
}

function peRegistryFee(amount: number): number {
  return PE_REGISTRY_FEES.find((b) => amount < b.below)!.fee;
}

function nlRegistryFee(amount: number): number {
  if (amount <= NL_BASE_UP_TO) return NL_BASE_FEE;
  return cents(NL_BASE_FEE + NL_FEE_PER_100 * Math.ceil((amount - NL_BASE_UP_TO) / 100));
}

function abFee(amount: number): number {
  return AB_BASE_FEE + AB_FEE_PER_UNIT * Math.ceil(amount / AB_UNIT);
}

export function calculateCaLandTransferTax(input: LttInput): LttResult {
  const price = Math.max(0, Math.floor(input.price || 0));
  const assessed = Math.max(0, Math.floor(input.assessedValue || 0));
  const mortgage = Math.max(0, Math.floor(input.mortgage || 0));
  const firstTime = input.firstTimeBuyer === true;

  const taxLines: LttLine[] = [];
  const reliefLines: LttLine[] = [];
  const feeLines: LttLine[] = [];
  const notes: string[] = [];

  if (price > 0) {
    switch (input.province) {
      case "ON": {
        const provincial = bandTax(price, ON_BANDS);
        taxLines.push({ label: "Ontario land transfer tax", amount: provincial });
        if (firstTime) {
          reliefLines.push({ label: "Ontario first-time homebuyer refund", amount: Math.min(provincial, ON_FIRST_TIME_REFUND_MAX) });
        }
        if (input.toronto) {
          const municipal = bandTax(price, TORONTO_BANDS);
          taxLines.push({ label: "Toronto municipal land transfer tax", amount: municipal });
          if (firstTime) {
            reliefLines.push({ label: "Toronto first-time purchaser rebate", amount: Math.min(municipal, TORONTO_FIRST_TIME_REBATE_MAX) });
          }
        }
        if (firstTime) {
          notes.push(
            "The refund is for Canadian citizens and permanent residents aged 18 or over who have never owned a home anywhere and will live in this one within nine months."
          );
        }
        notes.push(
          "The 2.5% rate above $2 million applies to homes with one or two single-family residences. Foreign nationals and foreign corporations also pay Ontario's 25% Non-Resident Speculation Tax, and 10% more in Toronto — not included here."
        );
        break;
      }
      case "BC": {
        const basic = bandTax(price, BC_BANDS);
        const luxury = price > BC_LUXURY_THRESHOLD ? cents(((price - BC_LUXURY_THRESHOLD) * BC_LUXURY_RATE) / 100) : 0;
        taxLines.push({ label: "Property transfer tax", amount: basic });
        if (luxury > 0) taxLines.push({ label: "Further 2% on residential value above $3 million", amount: luxury });
        if (firstTime) {
          if (price <= BC_FTB_FULL_LIMIT) {
            reliefLines.push({
              label: "First time home buyers' exemption",
              amount: Math.min(basic, bandTax(Math.min(price, BC_FTB_EXEMPT_AMOUNT), BC_BANDS)),
            });
          } else if (price < BC_FTB_PARTIAL_LIMIT) {
            notes.push(
              "A partial first-time buyer exemption applies between $835,000 and $860,000. It is not worked out here — see the BC government's page for the amount."
            );
          } else {
            notes.push("The first time home buyers' exemption does not apply to homes worth $860,000 or more.");
          }
          notes.push(
            "The exemption is for Canadian citizens and permanent residents who meet the BC residency test, have never owned a principal residence anywhere, and move in within 92 days."
          );
        }
        notes.push(
          "The tax is based on fair market value, which is usually the purchase price. Foreign entities pay an additional 20% in Metro Vancouver, the Capital Regional District, and the Fraser Valley, Central Okanagan and Nanaimo regional districts — not included here."
        );
        break;
      }
      case "AB": {
        feeLines.push({ label: "Transfer of land ($50 + $5 per $5,000 of value)", amount: abFee(price) });
        if (mortgage > 0) feeLines.push({ label: "Mortgage ($50 + $5 per $5,000 borrowed)", amount: abFee(mortgage) });
        notes.push(
          "These are Alberta Land Titles registration fees. A part of $5,000 is rounded up here, so the Land Titles Office's figure may be a few dollars lower."
        );
        break;
      }
      case "SK": {
        const transfer = price <= SK_FREE_UP_TO ? 0 : price <= SK_FLAT_UP_TO ? SK_FLAT_FEE : cents((price * SK_RATE) / 100);
        feeLines.push({ label: "Title transfer (0.4% of the value)", amount: transfer });
        if (mortgage > 0) {
          feeLines.push({ label: "Mortgage registration", amount: SK_MORTGAGE_FEES.find((t) => mortgage <= t.upTo)!.fee });
        }
        notes.push("These are Land Titles registration fees paid to ISC, in effect from 15 April 2026. The mortgage fee covers the first four titles.");
        break;
      }
      case "MB": {
        taxLines.push({ label: "Manitoba land transfer tax", amount: bandTax(price, MB_BANDS) });
        feeLines.push({ label: "Registering the transfer (electronic)", amount: MB_REGISTRATION_FEE });
        if (mortgage > 0) feeLines.push({ label: "Registering the mortgage (electronic)", amount: MB_REGISTRATION_FEE });
        notes.push(
          "The tax is based on the property's fair market value on the day the transfer is registered. Registration fees are the 2026 fees for documents filed electronically; paper filing costs a little more."
        );
        break;
      }
      case "NS": {
        const rate = input.nsRate ?? NS_HALIFAX_RATE;
        taxLines.push({ label: `Municipal deed transfer tax (${rate}%)`, amount: cents((price * rate) / 100) });
        feeLines.push({ label: "Land registry: recording the deed", amount: NS_REGISTRY_FEE });
        if (mortgage > 0) feeLines.push({ label: "Land registry: recording the mortgage", amount: NS_REGISTRY_FEE });
        notes.push(
          "Each municipality sets its own rate — Halifax charges 1.5%. Check the province's rate list for yours. Buyers who are not residents of Nova Scotia also pay a 10% provincial deed transfer tax on residential property, unless they move to the province within six months — not included here."
        );
        break;
      }
      case "NB": {
        const base = Math.max(price, assessed);
        taxLines.push({ label: "Real property transfer tax (1%)", amount: Math.round((base * NB_RATE) / 100) });
        feeLines.push({ label: "Land titles: registering the transfer", amount: NB_REGISTRATION_FEE });
        if (mortgage > 0) feeLines.push({ label: "Land titles: registering the mortgage", amount: NB_REGISTRATION_FEE });
        notes.push(
          assessed > price
            ? `The assessed value is higher than the price, so the tax is worked out on ${cad(assessed)}.`
            : "The tax is 1% of the purchase price or the assessed value, whichever is greater. Enter the assessed value if you know it."
        );
        notes.push("Registration fees are per parcel, under the land titles system.");
        break;
      }
      case "NL": {
        feeLines.push({ label: "Registering the deed", amount: nlRegistryFee(price) });
        if (mortgage > 0) {
          feeLines.push({ label: "Registering the mortgage", amount: Math.min(NL_MORTGAGE_FEE_MAX, nlRegistryFee(mortgage)) });
        }
        notes.push(
          "These are Registry of Deeds fees: $100 for the first $500 of value, plus 40 cents for each further $100 or part of $100. The fee for a mortgage is capped at $5,000. The Registry has its own calculator — use it to confirm."
        );
        break;
      }
      case "PE": {
        const base = Math.max(price, assessed);
        const tax = base <= PE_EXEMPT_UP_TO ? 0 : cents((base * PE_RATE) / 100);
        taxLines.push({ label: "Real property transfer tax (1%)", amount: tax });
        if (firstTime && tax > 0) {
          reliefLines.push({ label: "First-time home buyer exemption", amount: tax });
          notes.push(
            "The exemption is for Canadian citizens and permanent residents who have lived in PEI for at least six months (or filed PEI income tax returns in two of the last six years), have never owned a principal residence, and will live in the home for at least 183 days in a row."
          );
        }
        feeLines.push({ label: "Registry of Deeds: deed", amount: peRegistryFee(price) });
        if (mortgage > 0) feeLines.push({ label: "Registry of Deeds: mortgage", amount: peRegistryFee(mortgage) });
        if (base <= PE_EXEMPT_UP_TO) notes.push("No tax is payable when the price and the assessed value are both $30,000 or less.");
        if (assessed > price) notes.push(`The assessed value is higher than the price, so the tax is worked out on ${cad(assessed)}.`);
        notes.push(
          "People who are not residents of PEI need government permission to own more than five acres of land or more than 165 feet of shore frontage."
        );
        break;
      }
    }
  }

  const tax = cents(taxLines.reduce((t, l) => t + l.amount, 0));
  const relief = cents(reliefLines.reduce((t, l) => t + l.amount, 0));
  const fees = cents(feeLines.reduce((t, l) => t + l.amount, 0));
  return {
    province: input.province,
    taxLines,
    reliefLines,
    feeLines,
    tax,
    relief,
    fees,
    total: cents(tax - relief + fees),
    notes,
  };
}
