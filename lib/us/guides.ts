// ============================================================================
// United States guides (/us/guides). Same block format as the UK and Ireland
// guides, with official `sources` and internal `related` links. Every fact
// was read on the sources listed on each guide on 17 Oct 2026 — numbers that
// couldn't be confirmed on an official page are left out. Update `updatedAt`
// whenever you revise one.
// ============================================================================

import type { BlogPost } from "@/lib/data/blog-posts";

export interface UsGuide extends BlogPost {
  sources: { label: string; href: string }[];
  related: { label: string; href: string }[];
}

export const US_GUIDES: UsGuide[] = [
  {
    slug: "how-child-support-is-calculated-in-alabama",
    title: "How Child Support Is Calculated in Alabama (Rule 32 Guidelines)",
    description:
      "How Alabama's Rule 32 guidelines work: combined income, the support schedule, health insurance and child care, low-income rules and the 50/50 custody adjustment.",
    practiceAreaSlug: "family",
    publishedAt: "2026-10-17",
    readingTimeMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "In Alabama, child support is worked out under Rule 32 of the Alabama Rules of Judicial Administration — the Child Support Guidelines set by the Alabama Supreme Court. The current guidelines were revised for cases filed on or after May 1, 2022, and amended again for cases filed on or after June 1, 2023, when an adjustment for shared (50/50) custody was added.",
      },
      { type: "heading", text: "Step 1: both parents' income" },
      {
        type: "paragraph",
        text: "The starting point is the parents' combined adjusted gross income. Adjusted gross income is gross income less any child support already being paid for other children and any periodic alimony already being paid. If a court finds a parent is voluntarily unemployed or underemployed, it can treat them as earning income they could have earned.",
      },
      { type: "heading", text: "Step 2: the support schedule" },
      {
        type: "paragraph",
        text: "The combined income is looked up in the Schedule of Basic Child-Support Obligations, which covers combined monthly gross income from $0 to $30,000 and one to six children. If the income falls between two amounts on the schedule, the lower one is used unless the income is at least halfway to the next amount. Where combined income is above the top of the schedule, the amount is up to the court, and the guidelines say it should not simply be extrapolated from the schedule.",
      },
      { type: "heading", text: "Step 3: each parent's share" },
      {
        type: "paragraph",
        text: "Each parent's share of the total is their percentage of the combined income. The calculation is set out on the court's Child-Support Guidelines worksheet (Form CS-42).",
      },
      { type: "heading", text: "Health insurance and child care" },
      {
        type: "list",
        items: [
          "The cost of health care coverage for the children and work-related child-care costs are added to the basic obligation.",
          "Child care is added only if it is needed because of a parent's job or job search, and it can't be more than the amount for licensed care in the Department of Human Resources schedule.",
          "The parent who actually pays these costs has them taken off their share.",
          "The schedule already assumes unreimbursed medical costs of up to $250 per child per year.",
        ],
      },
      { type: "heading", text: "Low incomes" },
      {
        type: "list",
        items: [
          "A self-support reserve of $981 is taken off the paying parent's monthly adjusted gross income, and 85% of what is left is the income available for support. The recommended order is the lower of that figure and the calculated support.",
          "If the income available for support is below $50, there is a presumption that a $50 minimum order should be made.",
          "There is a presumption of a zero-dollar order where the paying parent has no gross income and receives only means-tested assistance, or has no gross income and is incarcerated or institutionalized for more than 180 consecutive days.",
        ],
      },
      { type: "heading", text: "Shared (50/50) custody" },
      {
        type: "paragraph",
        text: "For cases filed on or after June 1, 2023, where a court order gives each parent physical custody about 50% of the time, a shared physical-custody adjustment applies. It uses a separate worksheet (Form CS-42-S), and the basic obligation is multiplied by 150% before it is split between the parents. The self-support reserve, the $50 minimum and the zero-dollar presumption don't apply when that worksheet is used.",
      },
      { type: "heading", text: "Getting an order" },
      {
        type: "paragraph",
        text: "Divorce, custody and child support cases are heard by the circuit court of the county. The court's child support forms are published by the Alabama Administrative Office of Courts. A family lawyer can check the figures and explain when a court might order a different amount.",
      },
    ],
    sources: [
      { label: "Alabama Judicial System — Child Support Guidelines review (Rule 32)", href: "https://www.alacourt.gov/ChildSupportReview.aspx" },
      { label: "Alabama Supreme Court order amending Rule 32, effective May 1, 2022", href: "https://www.alacourt.gov/docs/Rule%2032%20Ala.%20R.%20Jud.%20Admin.%20Order.pdf" },
      { label: "Alabama Supreme Court order amending Rule 32, effective June 1, 2023", href: "https://www.alacourt.gov/docs/Order%20on%20Rule%2032%20-%20March%203,%202023.pdf" },
      { label: "Alabama child support forms", href: "https://eforms.alacourt.gov/child-support-forms/" },
    ],
    related: [
      { label: "Family lawyers in Alabama", href: "/us/lawyers/family" },
      { label: "Lawyers by city", href: "/us/locations" },
    ],
  },
  {
    slug: "alabama-deed-tax-and-mortgage-tax",
    title: "Alabama Deed Tax and Mortgage Tax: What You Pay When You Buy a Home",
    description:
      "How Alabama's recordation tax works — $.50 per $500 on the deed and $.15 per $100 on the mortgage — with worked examples and the mortgage deduction.",
    practiceAreaSlug: "property",
    publishedAt: "2026-10-17",
    readingTimeMinutes: 4,
    body: [
      {
        type: "paragraph",
        text: "When a home is bought in Alabama, the deed — and any mortgage — is recorded with the probate office of the county where the property is. Alabama charges a recordation tax when these documents are recorded, under sections 40-22-1 to 40-22-12 of the Code of Alabama.",
      },
      { type: "heading", text: "The rates" },
      {
        type: "list",
        items: [
          "Deed tax: $.50 for every $500 of value, or part of $500.",
          "Mortgage tax: $.15 for every $100 of the debt, or part of $100.",
          "Two-thirds of the tax goes to the state's General Fund and one-third to the county.",
        ],
      },
      { type: "heading", text: "When the mortgage is recorded with the deed" },
      {
        type: "paragraph",
        text: "If the mortgage is recorded at the same time as the deed, the deed tax is worked out only on the part of the sales price above the mortgage — as long as the mortgage is made to a taxable concern and the mortgage tax is collected. Baldwin County's probate office gives this example: on a $125,000 sale with a $50,000 mortgage, deed tax is charged on $75,000.",
      },
      { type: "heading", text: "Worked examples" },
      {
        type: "list",
        items: [
          "Cash purchase for $300,000: deed tax $300 (600 × $.50). No mortgage tax.",
          "$300,000 purchase with a $240,000 mortgage recorded at the same time: deed tax on $60,000 = $60, plus mortgage tax on $240,000 = $360. Total $420.",
          "$125,000 purchase with a $50,000 mortgage recorded at the same time: deed tax on $75,000 = $75, plus mortgage tax on $50,000 = $75. Total $150.",
        ],
      },
      { type: "heading", text: "What else you pay" },
      {
        type: "paragraph",
        text: "Each county probate office also charges recording fees, usually per page and per document, and these differ from county to county. Your closing attorney or the probate office will give you the exact figure. The Alabama Department of Revenue publishes a directory of county probate offices.",
      },
    ],
    sources: [
      { label: "Alabama Department of Revenue — Recordation Tax", href: "https://www.revenue.alabama.gov/?p=56784" },
      { label: "Baldwin County Probate Office — Recording Fees", href: "https://baldwincountyal.gov/government/probate-office/recording/recording-fees" },
      { label: "Alabama Department of Revenue — County Probate Office Directory", href: "https://www.revenue.alabama.gov/business-license/county-probate-office-directory/" },
    ],
    related: [
      { label: "Alabama deed & mortgage tax calculator", href: "/us/tools/alabama-deed-mortgage-tax-calculator" },
      { label: "Real estate lawyers in Alabama", href: "/us/lawyers/real-estate" },
    ],
  },
  {
    slug: "how-to-file-an-eeoc-discrimination-charge",
    title: "How to File an EEOC Discrimination Charge From Alabama: Deadlines and Steps",
    description:
      "The 180- and 300-day deadlines, how to file online, by phone or in person, what to include, and why you need a charge before you can sue.",
    practiceAreaSlug: "employment",
    publishedAt: "2026-10-17",
    readingTimeMinutes: 4,
    body: [
      {
        type: "paragraph",
        text: "Most workplace discrimination claims under federal law start with a charge to the U.S. Equal Employment Opportunity Commission (EEOC). Except for Equal Pay Act claims, the laws the EEOC enforces require you to file a charge before you can file a lawsuit for unlawful discrimination.",
      },
      { type: "heading", text: "The deadline" },
      {
        type: "list",
        items: [
          "Generally 180 calendar days from the discrimination.",
          "This becomes 300 days where a state or local agency enforces a law against the same kind of discrimination. For age discrimination, only a state law and state agency extend it.",
          "Equal Pay Act claims don't need a charge: you have two years from the last discriminatory paycheck, or three years if the discrimination was willful.",
          "Federal employees and job applicants use a different process and generally must contact their agency's EEO counselor within 45 days.",
        ],
      },
      { type: "heading", text: "How to file" },
      {
        type: "list",
        items: [
          "Online: submit an inquiry through the EEOC Public Portal, then schedule an interview by phone, video or in person.",
          "In person: visit an EEOC office (open 8:00 a.m. to 4:30 p.m., Monday to Friday). The Birmingham District Office is at Ridge Park Place, 1130 22nd Street South, Suite 2000, Birmingham.",
          "By phone: call 1-800-669-4000 (TTY 1-800-669-6820). The EEOC doesn't take charges by phone, but it can start the process. If your deadline is close, ask for an immediate interview.",
          "By mail: send a signed letter with the details below. An unsigned charge can't be investigated.",
        ],
      },
      { type: "heading", text: "What to include" },
      {
        type: "list",
        items: [
          "Your contact details, and the employer's (or employment agency's or union's).",
          "How many employees the employer has, if you know.",
          "What happened, when it happened, and why you believe it was discrimination.",
          "Your signature.",
        ],
      },
      { type: "heading", text: "Wage problems" },
      {
        type: "paragraph",
        text: "Alabama has no state minimum wage law, so employers covered by the Fair Labor Standards Act must pay the federal minimum wage of $7.25 an hour. Complaints about wages under federal law go to the U.S. Department of Labor's Wage and Hour Division on 1-866-487-9243.",
      },
    ],
    sources: [
      { label: "EEOC — How to File a Charge of Employment Discrimination", href: "https://www.eeoc.gov/how-file-charge-employment-discrimination" },
      { label: "EEOC — Time Limits for Filing a Charge", href: "https://www.eeoc.gov/time-limits-filing-charge" },
      { label: "EEOC — Birmingham District Office", href: "https://www.eeoc.gov/field-office/birmingham" },
      { label: "U.S. Department of Labor — State Minimum Wage Laws", href: "https://www.dol.gov/agencies/whd/minimum-wage/state" },
      { label: "U.S. Department of Labor — Wage and Hour Division complaints", href: "https://www.dol.gov/agencies/whd/contact/complaints" },
    ],
    related: [
      { label: "Employment lawyers in Alabama", href: "/us/lawyers/employment" },
      { label: "Lawyers by city", href: "/us/locations" },
    ],
  },
  {
    slug: "us-citizenship-five-year-and-three-year-rules",
    title: "Applying for US Citizenship: The Five-Year and Three-Year Rules",
    description:
      "Who can apply to naturalize after five years as a green card holder, the three-year rule for spouses of US citizens, and who can help with an application.",
    practiceAreaSlug: "immigration",
    publishedAt: "2026-10-17",
    readingTimeMinutes: 3,
    body: [
      {
        type: "paragraph",
        text: "Naturalization is how a lawful permanent resident (green card holder) becomes a US citizen. Applications are made on Form N-400 to U.S. Citizenship and Immigration Services (USCIS). Immigration is federal law, so the rules are the same in Alabama as in every other state.",
      },
      { type: "heading", text: "The usual rule: five years" },
      {
        type: "list",
        items: [
          "Be at least 18 when you file Form N-400.",
          "Have been a lawful permanent resident for at least five years.",
          "Have been physically present in the US for at least 30 months of those five years.",
          "Have lived continuously in the US for at least five years immediately before filing.",
          "Have lived for at least three months in the state or USCIS district where you apply.",
        ],
      },
      { type: "heading", text: "Spouses of US citizens: three years" },
      {
        type: "paragraph",
        text: "If you are married to a US citizen, you can apply after being a lawful permanent resident for at least three years, as long as you have lived with your citizen spouse in marital union for those three years and continue to do so while the application is processed. Other exceptions exist — check USCIS for the rule that fits you.",
      },
      { type: "heading", text: "Who can help" },
      {
        type: "paragraph",
        text: "You can file yourself. If you want help, use a licensed attorney or a Department of Justice accredited representative. Accredited representatives are non-attorneys who may represent people before USCIS and the immigration courts, but only through a non-profit organization recognized by the Department of Justice.",
      },
    ],
    sources: [
      {
        label: "USCIS — I am a lawful permanent resident of 5 years",
        href: "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization/i-am-a-lawful-permanent-resident-of-5-years",
      },
      {
        label: "USCIS — I am married to a U.S. citizen",
        href: "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization/i-am-married-to-a-us-citizen",
      },
      { label: "Department of Justice (EOIR) — Recognition and Accreditation Program", href: "https://www.justice.gov/eoir/recognition-and-accreditation-program" },
    ],
    related: [
      { label: "Immigration lawyers in Alabama", href: "/us/lawyers/immigration" },
      { label: "Lawyers by city", href: "/us/locations" },
    ],
  },
];

export function getUsGuideBySlug(slug: string): UsGuide | undefined {
  return US_GUIDES.find((g) => g.slug === slug);
}
