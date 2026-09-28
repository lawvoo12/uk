// ============================================================================
// EDIT THIS FILE to add, remove, or change blog/guide posts.
// Same philosophy as lib/data/static-lawyers.ts — no CMS, no database,
// just a plain array. Add a new object, save, redeploy. Done.
//
// `body` is an array of simple content blocks so posts render with real
// headings/lists (better for SEO + readability) without pulling in a full
// markdown/MDX pipeline just for a handful of posts. If you outgrow this
// (20+ posts, multiple authors, etc.) switch to MDX files under
// app/blog/(posts)/ or a headless CMS — this file is intentionally simple
// so you can start today.
//
// practiceAreaSlug (optional) must match a slug in
// lib/validations/lead-intake.ts (PRACTICE_AREAS) — set it when a post is
// clearly about one practice area, so it can be cross-linked from the
// matching /uk/solicitors/[category]/[city] pages. Leave it undefined for
// general posts.
// ============================================================================

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string; // used in the URL /guides/[slug] — short, unique, URL-safe
  title: string;
  description: string; // used as the meta description AND the card summary — keep it under ~160 chars
  practiceAreaSlug?: string;
  publishedAt: string; // ISO date, e.g. "2026-09-20"
  updatedAt?: string; // set this when you revise an older post — Google favours freshness
  readingTimeMinutes: number;
  body: BlogContentBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-an-immigration-solicitor-uk",
    title: "How to Choose an Immigration Solicitor in the UK: A Complete Guide",
    description:
      "What to check before instructing a UK immigration solicitor — SRA registration, fixed-fee pricing, specialism, and red flags to avoid.",
    practiceAreaSlug: "immigration",
    publishedAt: "2026-09-15",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "Choosing the wrong immigration solicitor can cost you months of delay and thousands of pounds in wasted fees — or worse, a refused application. Here's what to actually check before you instruct one.",
      },
      { type: "heading", text: "1. Confirm they're SRA-regulated" },
      {
        type: "paragraph",
        text: "Every solicitor practising in England and Wales must be registered with the Solicitors Regulation Authority (SRA). Ask for their SRA number and look it up yourself on the SRA's public register — never take it on trust from a website.",
      },
      { type: "heading", text: "2. Ask for a fixed fee, not an hourly estimate" },
      {
        type: "paragraph",
        text: "Most straightforward visa applications (spouse visas, work visas, ILR) should come with a fixed fee quoted upfront. An open-ended hourly rate is a common source of bill shock, especially if your case gets complicated.",
      },
      { type: "heading", text: "3. Check they specialise in your visa route" },
      {
        type: "paragraph",
        text: "Immigration law covers very different processes — a solicitor who mostly handles asylum claims isn't necessarily the right fit for a straightforward spouse visa, and vice versa. Ask how many cases like yours they've handled in the last 12 months.",
      },
      { type: "heading", text: "4. Red flags to walk away from" },
      {
        type: "list",
        items: [
          "Guarantees of visa approval — no solicitor can guarantee a Home Office decision",
          "Pressure to pay the full fee immediately, before a consultation",
          "No written engagement letter or client care letter",
          "Reluctance to give you their SRA number",
        ],
      },
      {
        type: "paragraph",
        text: "If you'd rather skip the research and just describe your situation, our free enquiry form gets your case in front of a verified UK immigration solicitor with no obligation to instruct them.",
      },
    ],
  },
  {
    slug: "uk-conveyancing-timeline-what-to-expect",
    title: "UK Conveyancing Timeline: What to Expect When Buying or Selling a Home",
    description:
      "A realistic week-by-week breakdown of the UK conveyancing process, from offer accepted to completion day.",
    practiceAreaSlug: "property",
    publishedAt: "2026-09-10",
    readingTimeMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "Conveyancing in England and Wales typically takes 8-12 weeks from offer accepted to completion — but chains, mortgage delays, and slow local searches can push that well past three months. Here's what actually happens at each stage.",
      },
      { type: "heading", text: "Weeks 1-2: Instruction and initial paperwork" },
      {
        type: "paragraph",
        text: "Your solicitor opens the file, carries out identity and anti-money-laundering checks, and sends out the draft contract (if you're selling) or requests it (if you're buying).",
      },
      { type: "heading", text: "Weeks 3-6: Searches, enquiries, and mortgage offer" },
      {
        type: "paragraph",
        text: "Local authority, drainage, and environmental searches are ordered for the buyer. Your solicitor raises enquiries based on the results and the seller's property information forms. This is usually the slowest stage — some local authorities take 3-4 weeks just to return searches.",
      },
      { type: "heading", text: "Weeks 7-9: Exchange of contracts" },
      {
        type: "paragraph",
        text: "Once enquiries are resolved, the mortgage offer is in, and both sides are ready, contracts are exchanged and a completion date is fixed. This is the point of no legal return — pulling out after exchange has financial consequences.",
      },
      { type: "heading", text: "Weeks 9-12: Completion" },
      {
        type: "paragraph",
        text: "Funds transfer, keys are released, and the property is registered with the Land Registry in your name (this last step can take weeks or months to formally complete, though it doesn't affect your ability to move in).",
      },
      {
        type: "paragraph",
        text: "Want a property solicitor quote for your own move? Use our free enquiry form and we'll pass your details to a verified conveyancing solicitor in your area.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByPracticeArea(practiceAreaSlug: string) {
  return BLOG_POSTS.filter((post) => post.practiceAreaSlug === practiceAreaSlug);
}
