import type { Metadata } from "next";

import { IeToolPage } from "@/components/ie/tool-page";
import { IeWrcCalculator } from "@/components/tools/ie-wrc-calculator";
import { WRC_CHECKED } from "@/lib/ie/wrc-deadline";

const PATH = "/ie/tools/wrc-time-limit-calculator";

export const metadata: Metadata = {
  title: "WRC Time Limit Calculator — 6-Month Deadline",
  description:
    "Work out your Workplace Relations Commission (WRC) complaint deadline in Ireland: 6 months from the dismissal or breach, up to 12 with reasonable cause, and the 42-day Labour Court appeal.",
  alternates: { canonical: PATH },
};

const FAQS = [
  {
    question: "How long do I have to make a WRC complaint?",
    answer:
      "Usually 6 months from the date of the breach — for example the date you were dismissed. The WRC can extend this by a further 6 months (to 12 in total) only if you show reasonable cause for the delay.",
  },
  {
    question: "What counts as 'reasonable cause' for a late complaint?",
    answer:
      "It's decided case by case. You need to explain why you couldn't complain in time and show that the reason actually caused the delay. Don't rely on getting an extension — aim for the 6-month date.",
  },
  {
    question: "How long do I have to appeal a WRC decision?",
    answer:
      "An appeal to the Labour Court must be made within 42 days of the adjudication officer's decision. After that, the decision becomes binding.",
  },
  {
    question: "How do I make the complaint?",
    answer:
      "Complaints are made online on the Workplace Relations Commission's website. Choose the right employment law for each complaint, and keep copies of everything you send.",
  },
];

export default function WrcPage() {
  return (
    <IeToolPage
      path={PATH}
      name="WRC Time Limit Calculator"
      heading="WRC time limit calculator"
      intro="Enter the date of your dismissal or workplace problem to see the deadline for a Workplace Relations Commission complaint, and the Labour Court appeal date if you already have a decision."
      checked={WRC_CHECKED}
      sources={[
        {
          label: "Citizens Information",
          href: "https://www.citizensinformation.ie/en/employment/enforcement-and-redress/adjudication-employment-rights-disputes-and-complaints/",
        },
        { label: "the WRC", href: "https://www.workplacerelations.ie/" },
      ]}
      faqs={FAQS}
      disclaimer="This calculator gives general guidance on the standard WRC time limits and isn't legal advice. Some claims have different rules, and the date a time limit starts can be disputed. If your deadline is close, contact the WRC or an employment solicitor now."
    >
      <IeWrcCalculator />
    </IeToolPage>
  );
}
