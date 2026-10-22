"use client";

import { useEffect, useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Turnstile } from "@/components/leads/turnstile";
import { TURNSTILE_SITE_KEY } from "@/lib/config";
import type { Country } from "@/lib/country";
import { cfg } from "@/lib/countries/registry";
import { submitListingRequest } from "@/lib/actions/listing-request";
import type { ListingRequestInput } from "@/lib/validations/listing-request";

type Kind = "listed" | "add";
type Action = "keep" | "update" | "remove";
type Errors = Partial<Record<keyof ListingRequestInput, string>>;

const input =
  "mt-1.5 w-full rounded-lg border border-[#DCD8D0] bg-white px-3 py-2.5 text-sm text-[#10233D] outline-none placeholder:text-[#A8A398] focus:border-[#B8863B]";

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-[#10233D]">
        {label}
      </label>
      {hint && <p className="text-xs text-[#5B6472]">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Pills<T extends string>({
  label,
  value,
  options,
  onChange,
  error,
}: {
  label: string;
  value: T | undefined;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-[#10233D]">{label}</p>
      <div role="radiogroup" aria-label={label} className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              value === o.value ? "border-[#10233D] bg-[#10233D] text-white" : "border-[#DCD8D0] bg-white text-[#10233D] hover:border-[#B8A488]"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Listing request form for lawyers: keep, update or remove an existing
 * listing, or ask to be added. Opening /xx/listings?lawyer=<id> (the link in
 * outreach emails) pre-fills the listing. Requests go to the "Listings" tab
 * of the Google Sheet; nothing is published until the site owner checks it.
 */
export function ListingRequestForm({ country }: { country: Country }) {
  const c = cfg(country);
  const Word = c.word === "lawyer" ? "Lawyer" : "Solicitor";
  const [kind, setKind] = useState<Kind>("listed");
  const [action, setAction] = useState<Action | undefined>();
  const [values, setValues] = useState({
    listingRef: "",
    fullName: "",
    role: "",
    firmName: "",
    email: "",
    phone: "",
    registrationNumber: "",
    profileUrl: "",
    officeAddress: "",
    city: "",
    details: "",
    website: "",
  });
  const [areas, setAreas] = useState<string[]>([]);
  const [willLink, setWillLink] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [token, setToken] = useState("");
  const [startedAt, setStartedAt] = useState<number | undefined>();
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [doneRef, setDoneRef] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setStartedAt(Date.now());
    // ?lawyer=<id> from an outreach email: pre-fill that listing.
    const id = new URLSearchParams(window.location.search).get("lawyer");
    if (id && /^[a-z0-9-]{3,120}$/i.test(id)) {
      setKind("listed");
      setValues((v) => ({ ...v, listingRef: `lawvoo.com${c.base}/lawyer/${id}` }));
    }
  }, [c.base]);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const needsDetails = kind === "add" || action === "update";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (TURNSTILE_SITE_KEY && !token) {
      setMessage("Please complete the security check above the Send button.");
      return;
    }
    startTransition(async () => {
      const result = await submitListingRequest({
        ...values,
        country: c.code,
        kind,
        action: kind === "listed" ? action : undefined,
        practiceAreas: needsDetails ? areas : [],
        willLink: action !== "remove" && willLink,
        confirm,
        startedAt,
        turnstileToken: token || undefined,
      });
      if (result.status === "success") {
        setDoneRef(result.ref);
        return;
      }
      setMessage(result.message);
      setErrors(result.fieldErrors ?? {});
    });
  };

  if (doneRef) {
    return (
      <div className="rounded-2xl border border-[#DCD8D0] bg-white p-6 text-center sm:p-8">
        <CheckCircle2 className="mx-auto h-9 w-9 text-[#2F6844]" strokeWidth={1.5} />
        <h3 className="mt-3 font-serif text-xl text-[#10233D]">Thanks — we&apos;ve got your request</h3>
        <p className="mt-2 text-sm text-[#5B6472]">
          We&apos;ll check it and reply by email. Nothing on your listing changes until we&apos;ve done that.
        </p>
        <p className="mt-3 text-xs text-[#A8A398]">Reference: {doneRef}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
      {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="lr-website">Leave this field empty</label>
        <input id="lr-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <Pills
        label="Are you already listed on Lawvoo?"
        value={kind}
        onChange={setKind}
        options={[
          { value: "listed", label: "Yes, I'm listed" },
          { value: "add", label: "No, please add me" },
        ]}
      />

      {kind === "listed" && (
        <>
          <Field id="lr-listing" label="Link to your listing" hint={`It looks like lawvoo.com${c.base}/lawyer/…`} error={errors.listingRef}>
            <input id="lr-listing" className={input} value={values.listingRef} onChange={set("listingRef")} />
          </Field>
          <Pills
            label="What would you like us to do?"
            value={action}
            onChange={setAction}
            error={errors.action}
            options={[
              { value: "keep", label: "Keep it — the details are right" },
              { value: "update", label: "Update my details" },
              { value: "remove", label: "Remove my listing" },
            ]}
          />
        </>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="lr-name" label="Your full name" error={errors.fullName}>
          <input id="lr-name" autoComplete="name" className={input} value={values.fullName} onChange={set("fullName")} />
        </Field>
        <Field id="lr-role" label="Your role (optional)" error={errors.role}>
          <input id="lr-role" placeholder="e.g. Partner" className={input} value={values.role} onChange={set("role")} />
        </Field>
        <Field id="lr-firm" label="Firm name" error={errors.firmName}>
          <input id="lr-firm" autoComplete="organization" className={input} value={values.firmName} onChange={set("firmName")} />
        </Field>
        <Field id="lr-email" label="Work email" hint="Please use your address at the firm, so we can confirm the request" error={errors.email}>
          <input id="lr-email" type="email" autoComplete="email" className={input} value={values.email} onChange={set("email")} />
        </Field>
        <Field id="lr-phone" label="Phone (optional)" error={errors.phone}>
          <input id="lr-phone" type="tel" autoComplete="tel" className={input} value={values.phone} onChange={set("phone")} />
        </Field>
        <Field id="lr-reg" label="Registration or bar number (optional)" hint={c.registrationHint} error={errors.registrationNumber}>
          <input id="lr-reg" className={input} value={values.registrationNumber} onChange={set("registrationNumber")} />
        </Field>
      </div>

      {needsDetails && (
        <>
          <Field
            id="lr-profile"
            label={kind === "add" ? "Your profile page on the firm's website" : "Your profile page on the firm's website (optional)"}
            hint="We take listing details from the firm's own website"
            error={errors.profileUrl}
          >
            <input id="lr-profile" type="url" placeholder="https://" className={input} value={values.profileUrl} onChange={set("profileUrl")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="lr-address" label={kind === "add" ? "Office address" : "Office address (optional)"} error={errors.officeAddress}>
              <input id="lr-address" autoComplete="street-address" className={input} value={values.officeAddress} onChange={set("officeAddress")} />
            </Field>
            <Field id="lr-city" label={kind === "add" ? "Town or city" : "Town or city (optional)"} error={errors.city}>
              <input id="lr-city" autoComplete="address-level2" className={input} value={values.city} onChange={set("city")} />
            </Field>
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-[#10233D]">
              {kind === "add" ? "Areas of law you practise" : "Areas of law you practise (if they've changed)"}
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {c.areas.map((a) => (
                <label key={a.slug} className="flex items-center gap-2 text-sm text-[#10233D]">
                  <input
                    type="checkbox"
                    checked={areas.includes(a.name)}
                    onChange={(e) => setAreas((list) => (e.target.checked ? [...list, a.name] : list.filter((n) => n !== a.name)))}
                  />
                  {a.name}
                </label>
              ))}
            </div>
            {errors.practiceAreas && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.practiceAreas}
              </p>
            )}
          </fieldset>
        </>
      )}

      <Field
        id="lr-details"
        label={action === "update" && kind === "listed" ? "What should we change?" : "Anything else? (optional)"}
        error={errors.details}
      >
        <textarea id="lr-details" rows={4} className={input} value={values.details} onChange={set("details")} />
      </Field>

      {action !== "remove" && (
        <label className="flex items-start gap-2 text-sm text-[#10233D]">
          <input type="checkbox" checked={willLink} onChange={(e) => setWillLink(e.target.checked)} className="mt-1" />
          <span>I&apos;m happy to add a link to my Lawvoo profile on my firm&apos;s website (optional)</span>
        </label>
      )}

      <div>
        <label className="flex items-start gap-2 text-sm text-[#10233D]">
          <input
            type="checkbox"
            checked={confirm}
            onChange={(e) => {
              setConfirm(e.target.checked);
              setErrors((er) => ({ ...er, confirm: undefined }));
            }}
            className="mt-1"
          />
          <span>
            I&apos;m the {c.word} named above, or I&apos;m authorised by the firm to make this request. Lawvoo can keep
            these details to deal with it (see the{" "}
            <a href={`${c.base}/privacy`} className="underline underline-offset-2 hover:text-[#B8863B]">
              privacy policy
            </a>
            ).
          </span>
        </label>
        {errors.confirm && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {errors.confirm}
          </p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} onToken={setToken} />}

      {message && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-[#10233D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]",
          isPending && "opacity-70"
        )}
      >
        {isPending ? "Sending…" : "Send request"}
      </button>
      <p className="text-xs text-[#5B6472]">
        {Word}s don&apos;t pay to be listed. We check every request before changing a listing.
      </p>
    </form>
  );
}
