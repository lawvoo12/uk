import type { Metadata } from "next";

import { IeToolPage } from "@/components/ie/tool-page";
import { IeCatCalculator } from "@/components/tools/ie-cat-calculator";
import { CAT_CHECKED, CAT_THRESHOLDS } from "@/lib/ie/cat";

const PATH = "/ie/tools/inheritance-tax-calculator";
const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export const metadata: Metadata = {
  title: "Inheritance Tax Calculator Ireland (CAT) 2026",
  description:
    "Estimate Capital Acquisitions Tax (CAT) on an inheritance or gift in Ireland: 33% above the Group A €400,000, Group B €40,000 and Group C €20,000 thresholds. Free.",
  alternates: { canonical: PATH },
};

const FAQS = [
  {
    question: "What are the CAT thresholds in Ireland?",
    answer: `Group A (from a parent): ${eur.format(CAT_THRESHOLDS.A)}. Group B (brothers, sisters, grandparents, grandchildren, nieces and nephews, and some parents): ${eur.format(CAT_THRESHOLDS.B)}. Group C (everyone else): ${eur.format(CAT_THRESHOLDS.C)}. These apply to gifts and inheritances taken on or after 2 October 2024. Tax is 33% of the amount above the threshold.`,
  },
  {
    question: "Do I pay inheritance tax on what my spouse leaves me?",
    answer: "No. Gifts and inheritances between spouses or civil partners are completely exempt from CAT.",
  },
  {
    question: "What does 'aggregation' mean?",
    answer:
      "Each threshold is a lifetime limit. Everything you've received from anyone in the same group since 5 December 1991 counts towards it, so earlier gifts or inheritances reduce what's left.",
  },
  {
    question: "When do I pay CAT?",
    answer:
      "Generally you file a return and pay by 31 October — in the same year if the valuation date is between 1 January and 31 August, or the following year if it's between 1 September and 31 December.",
  },
  {
    question: "Is there tax-free giving?",
    answer:
      "Yes. The small gift exemption lets anyone receive up to €3,000 a year from each person tax-free, and it doesn't count towards the thresholds.",
  },
];

export default function CatPage() {
  return (
    <IeToolPage
      path={PATH}
      name="Inheritance Tax (CAT) Calculator"
      heading="Inheritance & gift tax (CAT) calculator"
      intro="Estimate the Capital Acquisitions Tax on an inheritance or gift in the Republic of Ireland, taking into account your group threshold and anything you've already received."
      checked={CAT_CHECKED}
      sources={[
        {
          label: "Revenue",
          href: "https://www.revenue.ie/en/gains-gifts-and-inheritance/cat-thresholds-rates-and-aggregation-rules/cat-thresholds.aspx",
        },
        {
          label: "Citizens Information",
          href: "https://www.citizensinformation.ie/en/money-and-tax/tax/capital-taxes/capital-acquisitions-tax/",
        },
      ]}
      faqs={FAQS}
      disclaimer="This is an estimate for a single straightforward gift or inheritance and isn't tax or legal advice. Reliefs (dwelling house, agricultural, business, favourite nephew/niece) and special cases can change the result a lot. Thresholds can change in each October Budget — ask a solicitor or tax adviser, or Revenue."
    >
      <IeCatCalculator />
    </IeToolPage>
  );
}
