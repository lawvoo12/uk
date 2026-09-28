import type { PracticeAreaSlug } from "@/lib/validations/lead-intake";

export interface FAQItem {
  question: string;
  answer: string;
}

type FAQBuilder = (cityName: string) => FAQItem[];

const FAQ_BUILDERS: Record<PracticeAreaSlug, FAQBuilder> = {
  immigration: (city) => [
    {
      question: `How much does an immigration solicitor in ${city} cost?`,
      answer: `Fixed fees for straightforward applications, such as a spouse visa or ILR, typically start from a few hundred pounds and rise for complex or refused cases. Most solicitors in ${city} will quote a fixed price once they've reviewed your circumstances, rather than charging by the hour.`,
    },
    {
      question: "Do I need a solicitor for a visa application, or can I apply myself?",
      answer:
        "You can apply directly through the Home Office yourself, and many straightforward cases succeed without legal help. A solicitor becomes worth it when your case has a complication — a previous refusal, a gap in evidence, a criminal record, or a tight deadline — where a mistake could mean losing your application fee and months of waiting.",
    },
    {
      question: "How long does an immigration case usually take?",
      answer:
        "Straightforward visa applications are often decided within 8-12 weeks. Asylum claims, appeals, and cases involving a refusal typically take considerably longer, sometimes over a year, depending on the complexity and current Home Office processing times.",
    },
    {
      question: `Are the immigration lawyers listed for ${city} regulated?`,
      answer:
        "Every solicitor on this directory holds a current SRA (Solicitors Regulation Authority) practising certificate, which you can independently verify using their SRA number on the SRA's public register.",
    },
  ],
  family: (city) => [
    {
      question: `How much does a family lawyer in ${city} charge?`,
      answer: `Family solicitors in ${city} usually charge an hourly rate, often between £150 and £350 depending on seniority, with an initial consultation sometimes offered free or at a fixed low fee. Divorces handled by agreement cost considerably less than contested cases that go to court.`,
    },
    {
      question: "Do I have to go to court for a divorce or child arrangement?",
      answer:
        "No — most divorces in England and Wales are now handled through the online no-fault divorce process without a court hearing. Child arrangements and financial settlements can often be agreed through mediation or solicitor negotiation, with court reserved for cases where an agreement can't be reached.",
    },
    {
      question: "What's the difference between a solicitor and a mediator for family matters?",
      answer:
        "A mediator is a neutral third party who helps both sides reach an agreement together and cannot give either of you legal advice. A solicitor represents your interests specifically and can advise you on your legal position — many people use both at different stages.",
    },
    {
      question: `Can I get free or reduced-cost family law advice in ${city}?`,
      answer:
        "Legal aid for family matters is limited in England and Wales but may still be available if domestic abuse is involved, or if you're on a low income for certain case types. Some solicitors also offer a free or fixed-fee initial consultation — this is worth asking about directly.",
    },
  ],
  "personal-injury": (city) => [
    {
      question: `How much does a personal injury solicitor in ${city} cost?`,
      answer:
        "Most personal injury solicitors work on a 'no win, no fee' basis, meaning you pay nothing upfront and a success fee (capped by law) is deducted from your compensation only if the claim succeeds. Ask any solicitor to confirm this arrangement in writing before you sign anything.",
    },
    {
      question: "How long do I have to make a personal injury claim?",
      answer:
        "In most cases, you have three years from the date of the accident (or from when you became aware of the injury) to start a claim in England and Wales. Some exceptions apply, particularly for claims involving children or certain workplace exposures, so it's worth checking your specific situation early.",
    },
    {
      question: "Will my case go to court?",
      answer:
        "The large majority of personal injury claims are settled through negotiation between solicitors and insurers without a court hearing. Court is typically only needed when liability or the compensation amount is seriously disputed.",
    },
    {
      question: `What should I bring to a first meeting with a ${city} personal injury solicitor?`,
      answer:
        "Bring any accident report, photos of injuries or the scene, medical records or GP letters, witness contact details, and evidence of any financial losses such as time off work. The more documentation you have, the faster a solicitor can assess your claim's strength.",
    },
  ],
  employment: (city) => [
    {
      question: `How much does an employment solicitor in ${city} charge?`,
      answer:
        "Many employment solicitors offer a fixed fee for an initial advice session, then either an hourly rate or a fixed fee for tribunal representation depending on complexity. Some unfair dismissal and discrimination cases can also be taken on a no win, no fee basis.",
    },
    {
      question: "How long do I have to bring an employment tribunal claim?",
      answer:
        "You generally have just three months minus one day from the date of dismissal or the incident to start early conciliation with ACAS, which is a required first step before most tribunal claims. This deadline is strict and rarely extended, so it's important to act quickly.",
    },
    {
      question: "Can my employer fire me for seeking legal advice?",
      answer:
        "No — taking legal advice about your employment rights is protected activity, and being disciplined or dismissed for it could itself form the basis of a further claim. You're also under no obligation to tell your employer you've spoken to a solicitor.",
    },
    {
      question: `Do I need to have worked somewhere for a set time before claiming in ${city}?`,
      answer:
        "For most unfair dismissal claims you generally need at least two years' continuous service, but claims involving discrimination, whistleblowing, or certain automatic unfair dismissal reasons have no minimum length of service requirement.",
    },
  ],
  property: (city) => [
    {
      question: `How much does conveyancing cost in ${city}?`,
      answer:
        "Conveyancing fees typically range from around £500 to £1,500 plus disbursements (search fees, Land Registry fees, and Stamp Duty where applicable), depending on the property's value and whether it's freehold or leasehold. Most solicitors will provide a fixed-fee quote upfront.",
    },
    {
      question: "How long does buying or selling a house typically take?",
      answer:
        "A straightforward chain-free transaction can complete in 6-8 weeks, but the UK average including chains is closer to 12-20 weeks. Leasehold properties, mortgage delays, and slow searches are the most common causes of delay.",
    },
    {
      question: "What's the difference between a solicitor and a licensed conveyancer?",
      answer:
        "Both can legally handle a property transaction. A solicitor is a fully qualified lawyer who can also advise on related legal issues (such as a dispute arising during the sale), while a licensed conveyancer specialises specifically in property transactions, often at a lower cost.",
    },
    {
      question: `Do I need a local ${city} solicitor, or can I use one based elsewhere?`,
      answer:
        "Conveyancing is largely done remotely by phone, email, and online portals, so many buyers and sellers successfully use a solicitor outside their immediate area. Local knowledge can help with unusual issues specific to the area, but it isn't a requirement for most transactions.",
    },
  ],
  "wills-probate": (city) => [
    {
      question: `How much does a will cost with a solicitor in ${city}?`,
      answer:
        "A straightforward single will typically costs between £150 and £350, with mirror wills for couples costing somewhat more. More complex estate planning — trusts, business assets, or blended families — will cost more and is usually quoted after an initial discussion.",
    },
    {
      question: "What is probate and do I always need it?",
      answer:
        "Probate is the legal process of administering someone's estate after death — collecting assets, paying debts, and distributing what remains according to the will (or intestacy rules if there isn't one). Smaller estates, or those held entirely in joint names, can sometimes be dealt with without a formal grant of probate.",
    },
    {
      question: "Can I write my own will without a solicitor?",
      answer:
        "Yes, DIY wills are legally valid if correctly signed and witnessed, but mistakes in wording or execution are a common cause of disputes and can invalidate a will entirely. A solicitor is particularly worth using if you have children from a previous relationship, own a business, or have a larger or more complex estate.",
    },
    {
      question: `How long does probate take in ${city} and the wider UK?`,
      answer:
        "Probate typically takes 6-12 months from application to full estate distribution, though simple estates can be quicker and estates involving property sales, disputes, or Inheritance Tax can take considerably longer.",
    },
  ],
};

type Jurisdiction = "england-wales" | "scotland" | "northern-ireland";

function jurisdictionForRegion(region?: string): Jurisdiction {
  if (region === "Scotland") return "scotland";
  if (region === "Northern Ireland") return "northern-ireland";
  return "england-wales";
}

const REGULATION_ANSWER: Record<Jurisdiction, string> = {
  "england-wales":
    "Every firm listed here has been checked on the SRA (Solicitors Regulation Authority) register. You can check any firm yourself using its SRA number on the SRA's public register.",
  scotland:
    "Solicitors in Scotland are regulated by the Law Society of Scotland, not the SRA. You can check a solicitor on the Law Society of Scotland's Find a Solicitor service before instructing them.",
  "northern-ireland":
    "Solicitors in Northern Ireland are regulated by the Law Society of Northern Ireland, not the SRA. Every firm listed here appears on the Law Society of Northern Ireland's solicitor directory.",
};

// Answers that change outside England & Wales, keyed by the English question
// they replace. Anything not listed here holds UK-wide (or already says
// "in England and Wales").
const OVERRIDES: Record<Exclude<Jurisdiction, "england-wales">, Partial<Record<PracticeAreaSlug, Record<string, FAQItem>>>> = {
  scotland: {
    family: {
      "Do I have to go to court for a divorce or child arrangement?": {
        question: "How does divorce work in Scotland?",
        answer:
          "Scotland has its own divorce law. You can divorce after one year's separation if you both agree, or two years if not. A simplified 'do-it-yourself' procedure is available when there are no children under 16 and no financial claims. Otherwise a solicitor raises the action in the sheriff court or the Court of Session.",
      },
      "Can I get free or reduced-cost family law advice in __CITY__?": {
        question: "Can I get legal aid for a family case in Scotland?",
        answer:
          "Civil legal aid in Scotland is run by the Scottish Legal Aid Board and can cover family cases, depending on your income and the merits of the case. Ask any solicitor whether they take legal aid work before your first appointment.",
      },
    },
    property: {
      "How much does conveyancing cost in __CITY__?": {
        question: "How is buying a house different in Scotland?",
        answer:
          "In Scotland the seller provides a Home Report, offers are usually made through a solicitor, and the deal becomes binding once 'missives' are concluded. Land and Buildings Transaction Tax (LBTT) replaces Stamp Duty. Solicitors usually quote a fixed fee plus outlays such as registration dues.",
      },
    },
    "wills-probate": {
      "What is probate and do I always need it?": {
        question: "Is there probate in Scotland?",
        answer:
          "Scotland doesn't use the word probate. The executor applies to the sheriff court for 'confirmation', which gives them authority to collect and distribute the estate. Small estates can use a simpler procedure.",
      },
    },
  },
  "northern-ireland": {
    family: {
      "Do I have to go to court for a divorce or child arrangement?": {
        question: "How does divorce work in Northern Ireland?",
        answer:
          "Northern Ireland has its own divorce law and hasn't adopted the online no-fault divorce used in England and Wales. A divorce petition goes through the courts, and a solicitor can explain which grounds apply to you. Children and financial issues can often still be agreed through negotiation or mediation.",
      },
      "Can I get free or reduced-cost family law advice in __CITY__?": {
        question: "Can I get legal aid for a family case in Northern Ireland?",
        answer:
          "Civil legal aid in Northern Ireland is administered by the Legal Services Agency and may cover family cases, depending on your income and the case. Ask any solicitor whether they take legal aid work.",
      },
    },
    employment: {
      "How long do I have to bring an employment tribunal claim?": {
        question: "How long do I have to bring an industrial tribunal claim in Northern Ireland?",
        answer:
          "Most claims must be started within three months of the dismissal or incident, and you usually need to go through early conciliation with the Labour Relations Agency first (not ACAS, which covers Great Britain). The deadline is strict, so get advice quickly.",
      },
      "Do I need to have worked somewhere for a set time before claiming in __CITY__?": {
        question: `Do I need to have worked somewhere for a set time before claiming?`,
        answer:
          "In Northern Ireland you generally need one year's continuous service to claim unfair dismissal (it's two years in Great Britain). Discrimination and whistleblowing claims have no minimum service requirement.",
      },
    },
  },
};

export function getFAQsForCategory(categorySlug: PracticeAreaSlug, cityName: string, region?: string): FAQItem[] {
  const builder = FAQ_BUILDERS[categorySlug];
  if (!builder) return [];
  const jurisdiction = jurisdictionForRegion(region);
  const overrides = jurisdiction === "england-wales" ? {} : (OVERRIDES[jurisdiction][categorySlug] ?? {});
  const templates = builder("__CITY__");

  return builder(cityName).map((faq, i) => {
    const templateQuestion = templates[i].question;
    // The immigration regulation question names the SRA — swap in the right regulator.
    if (templateQuestion.startsWith("Are the immigration lawyers listed for")) {
      return { question: faq.question, answer: REGULATION_ANSWER[jurisdiction] };
    }
    const override = overrides[templateQuestion];
    return override
      ? { question: override.question.split("__CITY__").join(cityName), answer: override.answer }
      : faq;
  });
}

/** General FAQs for a city's location page (all practice areas). */
export function getFAQsForLocation(cityName: string, region: string, firmName?: string): FAQItem[] {
  const jurisdiction = jurisdictionForRegion(region);
  return [
    {
      question: `How do I choose a solicitor in ${cityName}?`,
      answer: `Start with a firm that handles your type of case — each listing on this page shows the practice areas the firm covers. Check the firm on its regulator's register, ask for a fee estimate in writing, and ask who will actually handle your matter day to day.`,
    },
    {
      question: `Are the solicitors listed in ${cityName} regulated?`,
      answer: REGULATION_ANSWER[jurisdiction],
    },
    {
      question: "Is it free to use Lawvoo?",
      answer:
        "Yes. Searching the directory and sending your case details is free, and there's no obligation to instruct any solicitor. Any fees are agreed directly between you and the firm you choose.",
    },
    {
      question: `What happens when I request a callback${firmName ? ` from ${firmName}` : ""}?`,
      answer:
        "Your details come to Lawvoo first. We pass your case on and ask the firm — or another suitable firm covering the area — to get in touch. We can't guarantee a particular firm will respond.",
    },
  ];
}
