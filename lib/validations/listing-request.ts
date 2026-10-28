import { z } from "zod";

// The listing request form (/uk|ie|ca|us/listings). A lawyer either already
// has a listing ("listed": keep it, update it or remove it) or asks to be
// added ("add"). Nothing is published from this form directly — the site
// owner checks the regulator's register first.

export const LISTING_ACTIONS = ["keep", "update", "remove"] as const;

export const listingRequestSchema = z
  .object({
    country: z.enum(["UK", "IE", "CA", "US", "NZ"]),
    kind: z.enum(["listed", "add"]),
    action: z.enum(LISTING_ACTIONS).optional(),
    /** Listing id from ?lawyer=… or the listing page link, for "listed". */
    listingRef: z.string().trim().max(300).optional().default(""),
    fullName: z.string().trim().min(2, "Please enter your full name").max(120),
    role: z.string().trim().max(120).optional().default(""),
    firmName: z.string().trim().min(2, "Please enter your firm's name").max(160),
    email: z.string().trim().email("Please enter a valid email address").max(200),
    phone: z.string().trim().max(40).optional().default(""),
    registrationNumber: z.string().trim().max(60).optional().default(""),
    profileUrl: z
      .string()
      .trim()
      .max(300)
      .optional()
      .default("")
      .refine((v) => v === "" || /^https?:\/\/\S+\.\S+/i.test(v), "Please enter a full web address, starting https://"),
    officeAddress: z.string().trim().max(300).optional().default(""),
    city: z.string().trim().max(120).optional().default(""),
    practiceAreas: z.array(z.string().max(60)).max(10).optional().default([]),
    details: z.string().trim().max(3000).optional().default(""),
    willLink: z.boolean().optional().default(false),
    confirm: z.boolean(),
    // Spam checks
    website: z.string().max(0).optional().default(""),
    startedAt: z.number().optional(),
    turnstileToken: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.confirm !== true) {
      ctx.addIssue({ code: "custom", path: ["confirm"], message: "Please confirm this to send your request" });
    }
    if (v.kind === "listed" && !v.action) {
      ctx.addIssue({ code: "custom", path: ["action"], message: "Please choose what you'd like us to do" });
    }
    if (v.kind === "listed" && !v.listingRef) {
      ctx.addIssue({ code: "custom", path: ["listingRef"], message: "Please paste the link to your listing page" });
    }
    if (v.kind === "add") {
      if (!v.profileUrl) ctx.addIssue({ code: "custom", path: ["profileUrl"], message: "Please add your profile page on your firm's website" });
      if (!v.officeAddress) ctx.addIssue({ code: "custom", path: ["officeAddress"], message: "Please enter your office address" });
      if (!v.city) ctx.addIssue({ code: "custom", path: ["city"], message: "Please enter your town or city" });
      if (v.practiceAreas.length === 0) ctx.addIssue({ code: "custom", path: ["practiceAreas"], message: "Please choose at least one area" });
    }
    if (v.kind === "listed" && v.action === "update" && !v.details) {
      ctx.addIssue({ code: "custom", path: ["details"], message: "Please tell us what to change" });
    }
  });

export type ListingRequestInput = z.input<typeof listingRequestSchema>;
export type ListingRequest = z.output<typeof listingRequestSchema>;
