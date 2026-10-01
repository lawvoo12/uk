// ============================================================================
// Ireland guides (/ie/guides). Same block format as the UK guides
// (lib/data/blog-posts.ts), plus official `sources` and internal `related`
// links. Facts checked 28–30 Sep 2026 against the sources listed on each
// guide. Update `updatedAt` whenever you revise one.
// ============================================================================

import type { BlogPost } from "@/lib/data/blog-posts";

export interface IeGuide extends BlogPost {
  sources: { label: string; href: string }[];
  related: { label: string; href: string }[];
}

export const IE_GUIDES: IeGuide[] = [
  {
    slug: "how-divorce-works-in-ireland",
    title: "How Divorce Works in Ireland: Steps, Timeline and Costs to Expect",
    description:
      "The two-of-three-years rule, judicial separation, which court hears your case, mediation, and what changes when the new family courts open in 2027.",
    practiceAreaSlug: "family",
    publishedAt: "2026-09-30",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "Divorce in the Republic of Ireland is granted by a court. There's no online divorce process like the one in England and Wales, and the court must be satisfied about the arrangements for both spouses and any children before it grants one.",
      },
      { type: "heading", text: "Who can apply" },
      {
        type: "list",
        items: [
          "You must have lived apart from your spouse for at least two of the previous three years when the case starts (Family Law Act 2019). You can have lived under the same roof and still be 'living apart' in some cases — a solicitor can advise.",
          "There must be no reasonable prospect of reconciliation.",
          "Proper provision must exist, or be made, for each spouse and any dependent children.",
          "One of you must live in Ireland (there are residence rules for the court to have jurisdiction).",
        ],
      },
      { type: "heading", text: "Judicial separation: the other option" },
      {
        type: "paragraph",
        text: "If you've been apart for less than two years, or don't want a divorce, you can ask for a judicial separation. It can be granted after one year of living apart, or on other grounds such as a marriage where a normal marital relationship hasn't existed for at least a year. The court can make the same kinds of orders about property, maintenance and children, but you stay legally married. Many couples instead sign a separation agreement without going to court.",
      },
      { type: "heading", text: "Which court" },
      {
        type: "paragraph",
        text: "Divorce and judicial separation are currently Circuit Court cases. Maintenance, guardianship, custody, access and safety or barring orders usually start in the District Court. Family cases are heard in private. Under the Family Courts Act 2024, specialist family court divisions start in phases from January 2027, and divorce applications will then also be possible in the District Court.",
      },
      { type: "heading", text: "Mediation and legal advice" },
      {
        type: "paragraph",
        text: "Before starting proceedings, your solicitor must discuss reconciliation, mediation and a negotiated agreement with you. The Legal Aid Board's Family Mediation Service is free. If you can't afford a solicitor, you can apply for means-tested civil legal aid at a Legal Aid Board law centre.",
      },
      { type: "heading", text: "Costs" },
      {
        type: "paragraph",
        text: "Your solicitor must give you a written notice of costs (under section 150 of the Legal Services Regulation Act 2015) setting out what they'll charge or how they'll calculate it. Agreed divorces cost far less than contested ones, so settling property, pensions and children's arrangements by agreement usually saves money.",
      },
    ],
    sources: [
      { label: "Law Society Gazette — first family courts from January 2027", href: "https://www.lawsociety.ie/gazette/top-stories/2026/april/first-family-courts-to-start-next-january/" },
      { label: "Legal Aid Board", href: "https://www.legalaidboard.ie/" },
      { label: "Courts Service — courthouses and offices", href: "https://www.courts.ie/offices" },
    ],
    related: [
      { label: "Family law solicitors in Ireland", href: "/ie/solicitors/family" },
      { label: "Free legal help in Ireland", href: "/ie/free-legal-help" },
    ],
  },
  {
    slug: "how-to-make-a-wrc-complaint",
    title: "How to Make a WRC Complaint in Ireland: Time Limits and What Happens Next",
    description:
      "The 6-month deadline, how to complain online, what happens at a WRC hearing, and how to appeal to the Labour Court within 42 days.",
    practiceAreaSlug: "employment",
    publishedAt: "2026-09-30",
    readingTimeMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "Most complaints about employment rights in Ireland — unfair dismissal, discrimination, pay, working hours, redundancy — go to the Workplace Relations Commission (WRC). It's free to complain and you don't need a solicitor, though many people use one for complex cases.",
      },
      { type: "heading", text: "1. Check your deadline first" },
      {
        type: "paragraph",
        text: "You must complain within 6 months of the alleged breach, such as the date you were dismissed. The WRC can extend this by a further 6 months only if you show reasonable cause for the delay — don't count on it. Use our WRC time limit calculator to see your dates.",
      },
      { type: "heading", text: "2. Try to raise it with your employer" },
      {
        type: "paragraph",
        text: "Use your employer's grievance procedure where you can, and keep copies of emails, letters, payslips, rosters and your contract. Write down dates while you remember them.",
      },
      { type: "heading", text: "3. Complain online" },
      {
        type: "paragraph",
        text: "Make the complaint on the WRC's website. You must choose the specific employment law each complaint is made under, so take care — a complaint under the wrong Act can fail. Unfair dismissal generally needs 12 months' continuous service; discrimination complaints have no minimum.",
      },
      { type: "heading", text: "4. The hearing" },
      {
        type: "list",
        items: [
          "An adjudication officer hears the case, in person at a WRC venue or remotely.",
          "Hearings are generally held in public, and decisions are published, except where there are special circumstances.",
          "Evidence may be given under oath or affirmation, so prepare as you would for court.",
        ],
      },
      { type: "heading", text: "5. Appeal" },
      {
        type: "paragraph",
        text: "Either side can appeal to the Labour Court within 42 days of the decision. After that, the decision is binding and can be enforced through the District Court.",
      },
    ],
    sources: [
      {
        label: "Citizens Information — adjudication of employment complaints",
        href: "https://www.citizensinformation.ie/en/employment/enforcement-and-redress/adjudication-employment-rights-disputes-and-complaints/",
      },
      { label: "Workplace Relations Commission", href: "https://www.workplacerelations.ie/" },
    ],
    related: [
      { label: "WRC time limit calculator", href: "/ie/tools/wrc-time-limit-calculator" },
      { label: "Employment solicitors in Ireland", href: "/ie/solicitors/employment" },
    ],
  },
  {
    slug: "buying-a-home-in-ireland-step-by-step",
    title: "Buying a Home in Ireland: The Conveyancing Process Step by Step",
    description:
      "From 'sale agreed' to getting the keys: booking deposits, contracts, stamp duty, Help to Buy and registering with Tailte Éireann.",
    practiceAreaSlug: "property",
    publishedAt: "2026-09-30",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "In Ireland, agreeing a price doesn't make a sale binding. Either side can walk away until both buyer and seller have signed the contract — which is why it pays to have your solicitor and mortgage ready early.",
      },
      { type: "heading", text: "The main steps" },
      {
        type: "list",
        items: [
          "Get mortgage approval in principle, and appoint a solicitor before you go sale agreed.",
          "Sale agreed: you usually pay a refundable booking deposit to the estate agent.",
          "The seller's solicitor sends the contract and title documents. Your solicitor checks the title, planning and any issues, and raises questions.",
          "Get a survey or structural report, and your lender's valuation.",
          "Sign the contract and pay the contract deposit (often 10%, less the booking deposit). The seller then signs, and the deal is binding.",
          "Closing: your mortgage funds and the balance are paid, you get the keys, and the deed is signed.",
          "Your solicitor pays the stamp duty and files the return with Revenue, and registers you as owner with Tailte Éireann.",
        ],
      },
      { type: "heading", text: "Stamp duty" },
      {
        type: "paragraph",
        text: "Residential stamp duty is 1% on the first €1 million, 2% on the part between €1 million and €1.5 million, and 6% above that. On a new home it's charged on the price excluding VAT. Revenue expects the return to be filed and the duty paid within 44 days of the deed being signed; after that, surcharges and interest apply. There's no stamp duty relief for first-time buyers.",
      },
      { type: "heading", text: "Help for first-time buyers" },
      {
        type: "paragraph",
        text: "The Help to Buy scheme refunds income tax you paid in the previous four years, up to the lesser of €30,000 or 10% of the price, for a new home costing €500,000 or less, if you have a mortgage of at least 70%. It runs until the end of 2029.",
      },
    ],
    sources: [
      { label: "Revenue — stamp duty rates", href: "https://www.revenue.ie/en/property/stamp-duty/property/stamp-duty-property/rates.aspx" },
      { label: "Revenue — late filing and paying", href: "https://www.revenue.ie/en/property/stamp-duty/paying-the-duty/late-filing-and-paying.aspx" },
      {
        label: "Citizens Information — Help to Buy",
        href: "https://www.citizensinformation.ie/en/housing/owning-a-home/help-with-buying-a-home/help-to-buy-incentive/",
      },
    ],
    related: [
      { label: "Irish stamp duty calculator", href: "/ie/tools/stamp-duty-calculator" },
      { label: "Property solicitors in Ireland", href: "/ie/solicitors/property" },
    ],
  },
  {
    slug: "how-probate-works-in-ireland",
    title: "How Probate Works in Ireland: A Plain-English Guide for Executors",
    description:
      "What an executor does, where to apply for a grant, the Probate Office and District Probate Registries, inheritance tax, and what happens if there's no will.",
    practiceAreaSlug: "wills-probate",
    publishedAt: "2026-09-30",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "When someone dies, a grant of representation usually has to be taken out before their property can be sold or their money released. If there's a will, the executor applies for a grant of probate; if there isn't, the next of kin applies for letters of administration.",
      },
      { type: "heading", text: "Where to apply" },
      {
        type: "paragraph",
        text: "Applications go to the Probate Office in Phoenix House, Smithfield, Dublin 7 (for Dublin, Meath, Kildare and Wicklow) or to one of 14 District Probate Registries — for example Cork, Limerick (which also covers Clare), Galway (with Roscommon), Kilkenny (with Carlow and Laois) and Dundalk (with Monaghan). Each town page on Lawvoo shows the right office.",
      },
      { type: "heading", text: "The executor's main jobs" },
      {
        type: "list",
        items: [
          "Find the original will, and list and value everything the person owned and owed at the date of death.",
          "File the Statement of Affairs (Probate) with Revenue, and apply for the grant — through a solicitor, or yourself as a personal applicant.",
          "Collect the assets, pay debts, funeral costs and any tax.",
          "Distribute the estate. Executors aren't obliged to pay out before the first anniversary of the death (the 'executor's year').",
        ],
      },
      { type: "heading", text: "Rights a will can't override" },
      {
        type: "paragraph",
        text: "A spouse or civil partner is entitled to a 'legal right share' — half the estate if there are no children, a third if there are. Children can apply to court under section 117 of the Succession Act if a parent failed to provide for them properly; this must be brought within six months of the grant.",
      },
      { type: "heading", text: "Inheritance tax (CAT)" },
      {
        type: "paragraph",
        text: "Beneficiaries — not the estate — pay Capital Acquisitions Tax at 33% on anything above their lifetime threshold: €400,000 from a parent (Group A), €40,000 from a brother, sister, grandparent or aunt/uncle (Group B), and €20,000 from anyone else (Group C). Spouses and civil partners pay none.",
      },
    ],
    sources: [
      { label: "Courts Service — probate registry offices", href: "https://www.courts.ie/guides/probate-offices" },
      { label: "Courts Service — probate", href: "https://www.courts.ie/hubs/probate" },
      {
        label: "Revenue — CAT thresholds",
        href: "https://www.revenue.ie/en/gains-gifts-and-inheritance/cat-thresholds-rates-and-aggregation-rules/cat-thresholds.aspx",
      },
    ],
    related: [
      { label: "Who inherits without a will? calculator", href: "/ie/tools/who-inherits-without-a-will" },
      { label: "Inheritance tax (CAT) calculator", href: "/ie/tools/inheritance-tax-calculator" },
      { label: "Wills & probate solicitors in Ireland", href: "/ie/solicitors/wills-probate" },
    ],
  },
  {
    slug: "registering-your-immigration-permission-in-ireland",
    title: "Registering Your Immigration Permission in Ireland (IRP): What Changed in 2025",
    description:
      "First-time registration now happens only at ISD's Burgh Quay office in Dublin. Who needs to register, renewals, employment permits and citizenship basics.",
    practiceAreaSlug: "immigration",
    publishedAt: "2026-09-30",
    readingTimeMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "If you're not an EU/EEA, Swiss or UK citizen and you plan to stay in Ireland for more than 90 days, you generally need to register your immigration permission and get an Irish Residence Permit (IRP) card.",
      },
      { type: "heading", text: "The 2025 change: one registration office" },
      {
        type: "paragraph",
        text: "Since 13 January 2025, all first-time registrations nationwide are handled by Immigration Service Delivery (ISD), part of the Department of Justice, at the Registration Office, 13-14 Burgh Quay, Dublin 2. Local Garda stations no longer register people, so if you live in Cork, Galway or Donegal you'll need an appointment in Dublin. Renewals are generally done online.",
      },
      { type: "heading", text: "Who decides what" },
      {
        type: "list",
        items: [
          "Residence permissions, visas and citizenship: Immigration Service Delivery (Department of Justice).",
          "Employment permits, such as the Critical Skills and General Employment Permits: the Department of Enterprise.",
          "International protection (asylum): the International Protection Office, with appeals to the International Protection Appeals Tribunal.",
        ],
      },
      { type: "heading", text: "Citizenship by naturalisation" },
      {
        type: "paragraph",
        text: "You usually need five years' reckonable residence in the last nine, including one year's continuous residence just before applying (limited absences are allowed). Spouses and civil partners of Irish citizens can apply after three years. Not every permission counts as reckonable residence — check before you apply.",
      },
      { type: "heading", text: "When to get a solicitor" },
      {
        type: "paragraph",
        text: "Straightforward applications can often be made without legal help. A solicitor is worth it if you've been refused, your permission has lapsed, you've had a deportation notice, or you're making an international protection claim.",
      },
    ],
    sources: [
      {
        label: "ISD — transfer of registration to ISD (9 January 2025)",
        href: "https://www.irishimmigration.ie/transfer-of-responsibility-for-irish-immigration-residence-permission-for-all-remaining-counties-to-immigration-service-delivery-isd-of-the-department-of-justice/",
      },
      { label: "Immigration Service Delivery", href: "https://www.irishimmigration.ie/" },
    ],
    related: [{ label: "Immigration solicitors in Ireland", href: "/ie/solicitors/immigration" }],
  },
  {
    slug: "injury-claims-and-the-injuries-resolution-board",
    title: "Injury Claims in Ireland and the Injuries Resolution Board Explained",
    description:
      "How the Injuries Resolution Board (formerly PIAB) process works, the two-year time limit, mediation, and when a claim goes to court.",
    practiceAreaSlug: "personal-injury",
    publishedAt: "2026-09-30",
    readingTimeMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "Most personal injury claims in Ireland don't start in court. They go first to the Injuries Resolution Board, an independent state body that was called PIAB until it was renamed. This guide explains the process; it isn't encouragement to make a claim.",
      },
      { type: "heading", text: "Which claims go to the Board" },
      {
        type: "paragraph",
        text: "Road traffic, workplace and public liability accidents. Medical negligence claims don't go through the Board, and nor do some air and sea travel claims.",
      },
      { type: "heading", text: "Time limit" },
      {
        type: "paragraph",
        text: "Generally two years from the date of the injury, or from when you knew about it. Applying to the Board stops the clock for a period. Claims for children can be brought on their behalf, and they have two years from turning 18.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "list",
        items: [
          "You apply online or by post, with a medical report. There's an application fee.",
          "The other side (the respondent) has 90 days to agree to an assessment.",
          "The Board may offer mediation, or assesses the claim using the Personal Injuries Guidelines.",
          "You have 28 days to accept or reject an assessment; the respondent has 21 days.",
          "If the claim isn't resolved, the Board issues an 'authorisation' so the case can go to court.",
        ],
      },
      { type: "heading", text: "Do you need a solicitor?" },
      {
        type: "paragraph",
        text: "No, you can apply yourself. Many people use a solicitor, especially for serious injuries or disputed fault. Your solicitor must give you a written notice of their likely costs, and in Ireland a solicitor can't charge a fee calculated as a percentage of any damages awarded.",
      },
    ],
    sources: [
      {
        label: "Citizens Information — Injuries Resolution Board",
        href: "https://www.citizensinformation.ie/en/justice/civil-law/injuries-resolution-board/",
      },
      { label: "Courts Service — understanding personal injuries", href: "https://www.courts.ie/guides/understanding-personal-injuries" },
      { label: "Injuries Resolution Board", href: "https://www.injuries.ie/" },
    ],
    related: [{ label: "Personal injury solicitors in Ireland", href: "/ie/solicitors/personal-injury" }],
  },
];

export function getIeGuideBySlug(slug: string) {
  return IE_GUIDES.find((g) => g.slug === slug);
}
