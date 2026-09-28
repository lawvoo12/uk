import type { FAQItem } from "@/lib/seo/faq-content";

export function FAQSection({
  faqs,
  categoryName,
  cityName,
  heading,
}: {
  faqs: FAQItem[];
  categoryName: string;
  cityName: string;
  heading?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="font-serif text-2xl text-[#10233D]">
        {heading ?? `Common questions about ${categoryName.toLowerCase()} solicitors in ${cityName}`}
      </h2>
      <div className="mt-4 divide-y divide-[#DCD8D0] rounded-xl border border-[#DCD8D0] bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="group p-5 open:bg-[#FAF9F6]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[#10233D] marker:content-none">
              {faq.question}
              <span aria-hidden className="shrink-0 text-lg text-[#B8863B] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
