import { z } from "zod";

// ============================================================================
// STATIC REFERENCE DATA
// In production, fetch PracticeArea / SubCategory from the DB (see the
// LawyerProfile/PracticeArea Prisma schema) and hydrate these at build/request
// time — this static version keeps the form self-contained for now.
// ============================================================================

export const PRACTICE_AREAS = [
  { slug: "immigration", name: "Immigration", description: "Visas, asylum, and settlement" },
  { slug: "family", name: "Family", description: "Divorce, custody, and separation" },
  { slug: "personal-injury", name: "Personal Injury", description: "Accidents and compensation claims" },
  { slug: "employment", name: "Employment", description: "Workplace disputes and rights" },
  { slug: "property", name: "Property", description: "Conveyancing and property disputes" },
  { slug: "wills-probate", name: "Wills & Probate", description: "Estates, wills, and inheritance" },
] as const;

export type PracticeAreaSlug = (typeof PRACTICE_AREAS)[number]["slug"];

export function getPracticeAreaBySlug(slug: string) {
  return PRACTICE_AREAS.find((a) => a.slug === slug);
}

export const SUB_CATEGORIES: Record<PracticeAreaSlug, { slug: string; name: string }[]> = {
  immigration: [
    { slug: "spouse-visa", name: "Spouse Visa" },
    { slug: "work-visa", name: "Work Visa" },
    { slug: "ilr", name: "Indefinite Leave to Remain" },
    { slug: "asylum", name: "Asylum & Protection" },
    { slug: "citizenship", name: "British Citizenship" },
  ],
  family: [
    { slug: "divorce", name: "Divorce & Separation" },
    { slug: "child-custody", name: "Child Custody & Arrangements" },
    { slug: "financial-settlement", name: "Financial Settlement" },
    { slug: "prenuptial", name: "Prenuptial Agreements" },
  ],
  "personal-injury": [
    { slug: "road-traffic", name: "Road Traffic Accident" },
    { slug: "workplace-injury", name: "Workplace Injury" },
    { slug: "medical-negligence", name: "Medical Negligence" },
    { slug: "public-liability", name: "Public Liability" },
  ],
  employment: [
    { slug: "unfair-dismissal", name: "Unfair Dismissal" },
    { slug: "discrimination", name: "Workplace Discrimination" },
    { slug: "redundancy", name: "Redundancy" },
    { slug: "contract-dispute", name: "Employment Contract Dispute" },
  ],
  property: [
    { slug: "conveyancing", name: "Conveyancing" },
    { slug: "landlord-tenant", name: "Landlord & Tenant Disputes" },
    { slug: "boundary-dispute", name: "Boundary Disputes" },
    { slug: "commercial-lease", name: "Commercial Lease" },
  ],
  "wills-probate": [
    { slug: "will-writing", name: "Will Writing" },
    { slug: "probate", name: "Probate Administration" },
    { slug: "contested-will", name: "Contested Wills" },
  ],
};

export const URGENCY_VALUES = ["URGENT", "WITHIN_WEEK", "EXPLORING"] as const;

// ============================================================================
// VALIDATION
// ============================================================================

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

// Zod v4: pass a plain readonly string-literal array to z.enum (not a cast
// tuple), and use `{ error: "..." }` in place of the removed
// `required_error` / `errorMap` options.
const PRACTICE_AREA_SLUGS = PRACTICE_AREAS.map((a) => a.slug) as PracticeAreaSlug[];

export const stepOneSchema = z.object({
  practiceArea: z.enum(PRACTICE_AREA_SLUGS, {
    error: "Select the area of law that matches your case",
  }),
});

export const stepTwoSchema = z.object({
  subCategory: z
    .string({ error: "Select the closest match for your case" })
    .min(1, "Select the closest match for your case"),
  postcode: z
    .string({ error: "Enter your UK postcode" })
    .trim()
    .min(1, "Enter your UK postcode")
    .regex(UK_POSTCODE_REGEX, "Enter a valid UK postcode, e.g. SW1A 1AA")
    .transform((val) => val.toUpperCase()),
  city: z.string({ error: "Enter your town or city" }).trim().min(2, "Enter your town or city").max(85),
});

export const stepThreeSchema = z.object({
  caseTitle: z
    .string({ error: "Give your case a short title" })
    .trim()
    .min(5, "Give your case a short title (min 5 characters)")
    .max(120),
  description: z
    .string({ error: "Tell us a little about your situation" })
    .trim()
    .min(30, "Please add a little more detail (min 30 characters)")
    .max(2000, "Keep it under 2,000 characters"),
  urgency: z.enum(URGENCY_VALUES, {
    error: "Let us know how soon you need help",
  }),
});

export const stepFourSchema = z.object({
  fullName: z.string({ error: "Enter your full name" }).trim().min(2, "Enter your full name").max(100),
  email: z
    .string({ error: "Enter your email address" })
    .trim()
    .min(1, "Enter your email address")
    .email("Enter a valid email address"),
  phone: z
    .string({ error: "Enter your phone number" })
    .trim()
    .min(1, "Enter your phone number")
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^(?:\+44|0)\d{9,10}$/.test(val), "Enter a valid UK phone number, e.g. 07123 456789"),
  consent: z.boolean().refine((val) => val === true, {
    error: "You must agree to share your details to continue",
  }),
});

// Set when the visitor arrived via a solicitor's "Request a callback" button.
// Only the listing id travels from the browser; the server looks the
// solicitor up itself rather than trusting a client-sent name.
export const requestedSolicitorSchema = z.object({
  requestedSolicitorId: z.string().trim().max(100).optional(),
});

// Anti-spam fields — never shown to real visitors. `website` is a honeypot
// (bots fill every field), `startedAt` lets the server reject forms
// submitted inhumanly fast, and `turnstileToken` is Cloudflare's check.
export const antiSpamSchema = z.object({
  website: z.string().max(200).optional(),
  startedAt: z.number().optional(),
  turnstileToken: z.string().max(4096).optional(),
});

export const leadIntakeSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema)
  .merge(requestedSolicitorSchema)
  .merge(antiSpamSchema);

export type LeadIntakeInput = z.infer<typeof leadIntakeSchema>;

// Field groups used to run partial (per-step) validation with
// react-hook-form's `trigger()` while keeping one combined resolver schema.
export const STEP_FIELDS: Record<number, (keyof LeadIntakeInput)[]> = {
  0: ["practiceArea"],
  1: ["subCategory", "postcode", "city"],
  2: ["caseTitle", "description", "urgency"],
  3: ["fullName", "email", "phone", "consent"],
};
