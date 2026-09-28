import { FileText, Handshake, MailCheck } from "lucide-react";

const CLIENT_STEPS = [
  { icon: FileText, title: "Describe your case", body: "Tell us what's happened and how soon you need help — takes about 2 minutes." },
  { icon: MailCheck, title: "We review it", body: "Your case details come straight to us — no account or sign-up needed on your end." },
  { icon: Handshake, title: "We're in touch", body: "We follow up to discuss your case and point you toward the right next step." },
];

function StepList({ steps }: { steps: typeof CLIENT_STEPS }) {
  return (
    <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="flex flex-col items-start gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF6EC] text-[#B8863B]">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="text-xs font-medium text-[#A8A398]">Step {index + 1}</p>
            <p className="font-medium text-[#10233D]">{step.title}</p>
            <p className="text-sm text-[#5B6472]">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="border-y border-[#DCD8D0] bg-white py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="how-it-works-heading" className="text-center font-serif text-2xl text-[#10233D] sm:text-3xl">
          How it works
        </h2>
        <div className="mt-10">
          <StepList steps={CLIENT_STEPS} />
        </div>
      </div>
    </section>
  );
}
