import type { Metadata } from "next";

import { IeToolPage } from "@/components/ie/tool-page";
import { IeIntestacyCalculator } from "@/components/tools/ie-intestacy-calculator";

const PATH = "/ie/tools/who-inherits-without-a-will";

export const metadata: Metadata = {
  title: "Who Inherits If There's No Will in Ireland? Calculator",
  description:
    "Free intestacy calculator for Ireland: see how an estate is shared under the Succession Act 1965 when someone dies without a will — spouse, children, parents, siblings.",
  alternates: { canonical: PATH },
};

const FAQS = [
  {
    question: "What happens if someone dies without a will in Ireland?",
    answer:
      "Their estate is shared under the Succession Act 1965. A spouse or civil partner with no children takes everything; with children, the spouse takes two-thirds and the children share one-third. With no spouse, the children share everything equally. After that come parents, then brothers and sisters, then nieces and nephews, then the nearest relatives, and finally the State.",
  },
  {
    question: "What if one of the children has already died?",
    answer:
      "If a child died before the parent and left children of their own, that child's share passes to their children, split equally between them.",
  },
  {
    question: "Does a cohabiting partner inherit if there's no will?",
    answer:
      "Not automatically. A qualified cohabitant can apply to court for provision from the estate under the Cohabitants Act 2010, and strict time limits apply, so get legal advice quickly.",
  },
  {
    question: "Who deals with the estate when there's no will?",
    answer:
      "Usually the next of kin applies for a grant of letters of administration from the Probate Office or a District Probate Registry. They then collect the assets, pay debts and tax, and share out the rest.",
  },
];

export default function IntestacyPage() {
  return (
    <IeToolPage
      path={PATH}
      name="Who Inherits Without a Will?"
      heading="Who inherits if there's no will?"
      intro="See how an estate is shared in the Republic of Ireland when someone dies without a valid will (intestacy), under the Succession Act 1965."
      checked="30 September 2026"
      sources={[
        {
          label: "Citizens Information",
          href: "https://www.citizensinformation.ie/en/death/the-deceaseds-estate/what-happens-the-deceaseds-estate/",
        },
        { label: "the Succession Act 1965", href: "https://www.irishstatutebook.ie/eli/1965/act/27/enacted/en/html" },
      ]}
      faqs={FAQS}
      disclaimer="This calculator shows the general rules for a straightforward estate and isn't legal advice. Property held jointly, pensions and life policies with named beneficiaries, and assets outside Ireland can pass outside these rules. Ask a solicitor about a real estate."
    >
      <IeIntestacyCalculator />
    </IeToolPage>
  );
}
