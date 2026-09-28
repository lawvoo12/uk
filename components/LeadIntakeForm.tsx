"use client";

import { useEffect, useState, useTransition, type ComponentType } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Home,
  Plane,
  ScrollText,
  Search,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  leadIntakeSchema,
  STEP_FIELDS,
  PRACTICE_AREAS,
  SUB_CATEGORIES,
  type LeadIntakeInput,
  type PracticeAreaSlug,
} from "@/lib/validations/lead-intake";
import { submitLeadIntake } from "@/lib/actions/lead-intake";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Turnstile } from "@/components/leads/turnstile";
import { TURNSTILE_SITE_KEY } from "@/lib/config";

const TOTAL_STEPS = 4;

const STEP_LABELS = ["Practice area", "Case & location", "Your situation", "Your details"];

const PRACTICE_AREA_ICONS: Record<PracticeAreaSlug, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  immigration: Plane,
  family: Users,
  "personal-injury": HeartPulse,
  employment: Briefcase,
  property: Home,
  "wills-probate": ScrollText,
};

const URGENCY_OPTIONS = [
  { value: "URGENT", label: "Urgent", helper: "I need to speak to someone today", icon: Zap },
  { value: "WITHIN_WEEK", label: "Within a week", helper: "I'd like this moving soon", icon: CalendarClock },
  { value: "EXPLORING", label: "Exploring options", helper: "Just gathering information for now", icon: Search },
] as const;

// `consent` is typed as a plain boolean by Zod (z.boolean().refine(v => v
// === true)) — that lets the checkbox toggle both ways while still failing
// validation until it's checked.
const defaultValues: Partial<LeadIntakeInput> = {
  postcode: "",
  city: "",
  caseTitle: "",
  description: "",
  fullName: "",
  email: "",
  phone: "",
  consent: false,
};

// ============================================================================
// Step 1 — Practice area
// ============================================================================

function StepPracticeArea() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LeadIntakeInput>();

  const selected = watch("practiceArea");

  return (
    <fieldset>
      <legend className="mb-1 font-serif text-2xl text-[#10233D]">What kind of legal help do you need?</legend>
      <p className="mb-6 text-sm text-[#5B6472]">
        Choose the area that best matches your situation — you&apos;ll narrow it down on the next step.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PRACTICE_AREAS.map((area) => {
          const Icon = PRACTICE_AREA_ICONS[area.slug];
          const isSelected = selected === area.slug;
          return (
            <button
              key={area.slug}
              type="button"
              onClick={() => setValue("practiceArea", area.slug, { shouldValidate: true })}
              aria-pressed={isSelected}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863B] focus-visible:ring-offset-2",
                isSelected ? "border-[#B8863B] bg-[#FBF6EC] shadow-sm" : "border-[#DCD8D0] bg-white hover:border-[#B8A488]"
              )}
            >
              <Icon
                className={cn("mt-0.5 h-5 w-5 shrink-0", isSelected ? "text-[#B8863B]" : "text-[#5B6472]")}
                strokeWidth={1.5}
              />
              <span>
                <span className="block font-medium text-[#10233D]">{area.name}</span>
                <span className="mt-0.5 block text-xs text-[#5B6472]">{area.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {errors.practiceArea && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {errors.practiceArea.message}
        </p>
      )}
    </fieldset>
  );
}

// ============================================================================
// Step 2 — Sub-category + UK postcode/city
// ============================================================================

function StepServiceLocation() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LeadIntakeInput>();

  const practiceArea = watch("practiceArea");
  const subCategory = watch("subCategory");
  const options = practiceArea ? SUB_CATEGORIES[practiceArea] : [];

  return (
    <fieldset className="space-y-6">
      <div>
        <legend className="mb-1 font-serif text-2xl text-[#10233D]">Which service fits best?</legend>
        <p className="mb-4 text-sm text-[#5B6472]">This helps us match you with a specialist, not a generalist.</p>

        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Sub-category">
          {options.map((option) => {
            const isSelected = subCategory === option.slug;
            return (
              <button
                key={option.slug}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue("subCategory", option.slug, { shouldValidate: true })}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863B] focus-visible:ring-offset-2",
                  isSelected
                    ? "border-[#10233D] bg-[#10233D] text-white"
                    : "border-[#DCD8D0] bg-white text-[#10233D] hover:border-[#B8A488]"
                )}
              >
                {option.name}
              </button>
            );
          })}
        </div>
        {errors.subCategory && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {errors.subCategory.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="postcode">UK postcode</Label>
          <Input
            id="postcode"
            placeholder="SW1A 1AA"
            autoCapitalize="characters"
            autoComplete="postal-code"
            {...register("postcode")}
            className={cn(errors.postcode && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.postcode && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.postcode.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="city">Town or city</Label>
          <Input
            id="city"
            placeholder="London"
            autoComplete="address-level2"
            {...register("city")}
            className={cn(errors.city && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.city && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.city.message}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-[#5B6472]">We use this to find lawyers who cover your area — it&apos;s never shared without your consent.</p>
    </fieldset>
  );
}

// ============================================================================
// Step 3 — Case description + urgency
// ============================================================================

function StepCaseDetails() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LeadIntakeInput>();

  const urgency = watch("urgency");
  const description = watch("description") ?? "";

  return (
    <fieldset className="space-y-6">
      <div>
        <legend className="mb-1 font-serif text-2xl text-[#10233D]">Tell us what&apos;s going on</legend>
        <p className="mb-4 text-sm text-[#5B6472]">A few sentences is enough — lawyers respond faster with more context.</p>
      </div>

      <div>
        <Label htmlFor="caseTitle">Give your case a short title</Label>
        <Input
          id="caseTitle"
          placeholder="e.g. Spouse visa application for my partner"
          {...register("caseTitle")}
          className={cn(errors.caseTitle && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.caseTitle && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {errors.caseTitle.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Describe your situation</Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="What's happened so far, and what kind of help are you looking for?"
          {...register("description")}
          className={cn(errors.description && "border-red-500 focus-visible:ring-red-500")}
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.description ? (
            <p role="alert" className="text-sm text-red-600">
              {errors.description.message}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-[#A8A398]">{description.length}/2000</span>
        </div>
      </div>

      <div>
        <Label>How soon do you need help?</Label>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Urgency">
          {URGENCY_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = urgency === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue("urgency", option.value, { shouldValidate: true })}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863B] focus-visible:ring-offset-2",
                  isSelected ? "border-[#B8863B] bg-[#FBF6EC]" : "border-[#DCD8D0] bg-white hover:border-[#B8A488]"
                )}
              >
                <Icon className={cn("h-5 w-5", isSelected ? "text-[#B8863B]" : "text-[#5B6472]")} strokeWidth={1.5} />
                <span className="font-medium text-[#10233D]">{option.label}</span>
                <span className="text-xs text-[#5B6472]">{option.helper}</span>
              </button>
            );
          })}
        </div>
        {errors.urgency && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {errors.urgency.message}
          </p>
        )}
      </div>
    </fieldset>
  );
}

// ============================================================================
// Step 4 — Client details + UK GDPR consent
// ============================================================================

function StepClientDetails() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LeadIntakeInput>();

  const consent = watch("consent");

  return (
    <fieldset className="space-y-6">
      <div>
        <legend className="mb-1 font-serif text-2xl text-[#10233D]">Last step — how should lawyers reach you?</legend>
        <p className="mb-4 text-sm text-[#5B6472]">Your details are only used to follow up about your case.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Jordan Smith"
            autoComplete="name"
            {...register("fullName")}
            className={cn(errors.fullName && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.fullName && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="07123 456789"
            autoComplete="tel"
            {...register("phone")}
            className={cn(errors.phone && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.phone && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="jordan@example.com"
          autoComplete="email"
          {...register("email")}
          className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.email && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div
        className={cn(
          "flex gap-3 rounded-xl border p-4",
          errors.consent ? "border-red-400 bg-red-50" : "border-[#DCD8D0] bg-[#FAF9F6]"
        )}
      >
        <Checkbox
          id="consent"
          checked={consent === true}
          onCheckedChange={(checked) => setValue("consent", checked === true, { shouldValidate: true })}
          className="mt-0.5"
        />
        <div>
          <Label htmlFor="consent" className="cursor-pointer text-sm font-normal leading-relaxed text-[#10233D]">
            I agree to Lawvoo reviewing these details and sharing them with a solicitor firm that covers my
            case (the firm I chose, if I picked one), so that they can contact me about it.
          </Label>
          <p className="mt-1 text-xs text-[#5B6472]">
            Required under UK GDPR. Read our{" "}
            <a href="/uk/privacy" className="underline underline-offset-2 hover:text-[#B8863B]">
              privacy policy
            </a>{" "}
            for how your data is used and how to withdraw consent at any time.
          </p>
          {errors.consent && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      <Turnstile
        siteKey={TURNSTILE_SITE_KEY}
        onToken={(token) => setValue("turnstileToken", token || undefined)}
      />
    </fieldset>
  );
}

// ============================================================================
// Step progress indicator
// ============================================================================

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <ol className="mb-8 flex items-start gap-2 sm:gap-4" aria-label="Form progress">
      {STEP_LABELS.map((label, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;
        return (
          <li key={label} className="flex flex-1 flex-col gap-2" aria-current={isActive ? "step" : undefined}>
            <div
              className={cn(
                "h-1.5 w-full rounded-full transition-colors duration-300",
                isComplete || isActive ? "bg-[#B8863B]" : "bg-[#E4E0D8]"
              )}
              aria-hidden
            />
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                isActive ? "text-[#10233D]" : isComplete ? "text-[#5B6472]" : "text-[#A8A398]"
              )}
            >
              {index + 1}. {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

// ============================================================================
// Orchestrator — exported component
// ============================================================================

export function LeadIntakeForm({
  initialPracticeArea,
  initialCity,
  requestedSolicitorId,
}: {
  initialPracticeArea?: PracticeAreaSlug;
  initialCity?: string;
  /** Listing id from lib/data/static-lawyers.ts when opened via "Request a callback". */
  requestedSolicitorId?: string;
} = {}) {
  const [step, setStep] = useState(initialPracticeArea ? 1 : 0);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const methods = useForm<LeadIntakeInput>({
    resolver: zodResolver(leadIntakeSchema),
    defaultValues: {
      ...defaultValues,
      practiceArea: initialPracticeArea,
      city: initialCity ?? "",
      requestedSolicitorId,
      website: "",
    },
    mode: "onTouched",
  });

  const { trigger, handleSubmit, setError, setValue, register } = methods;

  // Record when the visitor started, for the server's "too fast = bot" check.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = await trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: LeadIntakeInput) => {
    setSubmitError(null);
    if (TURNSTILE_SITE_KEY && !data.turnstileToken) {
      setSubmitError("Please complete the security check above the Submit button.");
      return;
    }
    startTransition(async () => {
      const result = await submitLeadIntake(data);
      if (result.status === "success") {
        setSubmittedId(result.leadId);
        return;
      }
      setSubmitError(result.message);
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          setError(field as keyof LeadIntakeInput, { message });
        }
      }
    });
  };

  if (submittedId) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-[#DCD8D0] bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#2F6844]" strokeWidth={1.5} />
        <h2 className="mt-4 font-serif text-2xl text-[#10233D]">Your case has been submitted</h2>
        <p className="mt-2 text-sm text-[#5B6472]">
          We&apos;ve received your details and will be in touch to discuss your case and the right next step.
        </p>
        <p className="mt-4 text-xs text-[#A8A398]">Reference: {submittedId}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex items-center gap-2 text-xs font-medium text-[#5B6472]">
        <ShieldCheck className="h-4 w-4 text-[#B8863B]" strokeWidth={1.5} />
        Free to use · No obligation to instruct · Regulated solicitors only
      </div>

      <StepIndicator currentStep={step} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-[#DCD8D0] bg-white p-6 shadow-sm sm:p-8" noValidate>
          {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
          <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>
          {step === 0 && <StepPracticeArea />}
          {step === 1 && <StepServiceLocation />}
          {step === 2 && <StepCaseDetails />}
          {step === 3 && <StepClientDetails />}

          {submitError && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {submitError}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={step === 0 || isPending}
              className={cn(step === 0 && "invisible")}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>

            {step < TOTAL_STEPS - 1 ? (
              <Button type="button" onClick={goNext} className="bg-[#10233D] text-white hover:bg-[#1C3A5E]">
                Continue
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isPending} className="bg-[#B8863B] text-white hover:bg-[#A47730]">
                {isPending ? "Submitting…" : "Submit your case"}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
