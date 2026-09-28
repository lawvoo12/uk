# Changes — 27 Sep 2026

## Data
- `lib/data/static-lawyers.ts` now holds **50 solicitors** (one per city). Every England & Wales firm's SRA number was checked on the SRA register. The NI firms were checked on the Law Society of NI directory. Scottish firms are regulated by the Law Society of Scotland — check them manually.
- The `StaticLawyer` type has new fields:
  - `role` — the solicitor's job title.
  - `regulator` — `SRA` / `LSS` / `LSNI`.
  - `registerUrl` — where to check the firm on its regulator's register.
  - `experienceNote` — how the experience figure was worked out.
  - `profileUrl` — the public source of the solicitor's details.
- `sraNumber` can now be `null` (Scottish/NI firms have no SRA number). `yearsExperience` can now be `null` (not published).
- **Ratings are optional and no longer shown** unless an entry has real reviews (`ratingAverage` + `ratingCount`). Don't invent them — fake reviews on a UK site breach CMA/ASA rules.

## New: location-wise pages
- `/uk/locations` — all 50 cities grouped by region, with a solicitor count for each.
- `/uk/locations/[city]` — every solicitor in that city across all practice areas. It shows address, role, experience and practice-area chips, plus links to each category page for the city, nearby cities in the same region, and the lead form.
- Navbar, footer and the `/uk/solicitors` hub now link cities to their location page (before, they went to `/immigration/<city>`, which was empty for most cities).
- Sitemap includes `/uk/locations` and each city page that has listings.

## Fixes
- The badge on each card now names the right regulator: "SRA regulated", "Law Society of Scotland" or "Law Society of NI". Before, it said "SRA verified" for everyone. The badge links to the firm's register entry.
- Removed the made-up "Mid-tier pricing" tier label and the 0-star ratings from cards.
- Page copy no longer calls every solicitor "SRA-regulated". Scotland and NI pages name their own regulator and register.
- Lawyer profile page:
  - Leads with the solicitor's name and role.
  - Shows how the experience figure was worked out.
  - Links each practice area to its category page for that city.
  - Links back to the city.
  - Pre-renders every profile at build time.
- On the location page on mobile, the listings now come before the enquiry form.

## Still to do (not changed)
- **Consent:** these firms haven't agreed to be listed. Contact them, or at least add a clear "request removal" route, before promoting the pages. The "Request a callback" button can read as if the firm is partnered with Lawvoo.
- `app/uk/terms` and `app/uk/privacy` still describe the site as a directory of "SRA-regulated solicitors". Update them to cover Scotland and NI when the legal pages are reviewed.

## Update 2 — "Request a callback" now opens the Find a solicitor form
- Every **Request a callback** button (listing cards, location pages, profile pages) now opens `/uk/leads/new?lawyer=<id>`. Before, it only scrolled to the general form at the side of the page, and the form never knew which solicitor had been picked.
- That page shows a "You're asking about …" card with the solicitor, firm, address and regulator. The city is pre-filled, and the practice area is pre-selected when the visitor came from a category page.
- The chosen solicitor is saved with the lead. The server looks it up from the listing id, so a visitor can't type in a different name. It goes to the Google Sheet as a new `requestedSolicitor` field, and into the email alert.
- **Action needed in Google Sheets:** add a 13th column header `Requested Solicitor`, and add `data.requestedSolicitor || "",` to the end of the `appendRow([...])` list in Apps Script. Then Deploy → Manage deployments → Edit → New version. See the README, step 2.
- The navbar/footer **Find a solicitor** link still opens the general form, with no solicitor pre-selected.

## Update 3 — category pages, local city content, callback skips step 1
- **New `/uk/solicitors/[category]` pages** (6), e.g. `/uk/solicitors/family`. Each has:
  - a short guide to the area of law;
  - every city grouped by region, with a count of firms covering that area;
  - the solicitors who specialise in it;
  - FAQs and links to the other areas.
  The breadcrumb "Family" on category/city pages now links here. Footer and homepage practice-area links go here, and the pages are in the sitemap.
- **Local content on every city page** — a new "Legal help in <city>: what to know" section:
  - a summary of who is listed and what their firm covers;
  - which legal system applies (England & Wales / Scots law / Northern Ireland law);
  - the courts and tribunals serving the city, linked to GOV.UK "Find a court or tribunal";
  - four city FAQs, with FAQPage structured data.
  Court names are in `lib/seo/city-content.ts` (checked 27 Sep 2026). Criminal-only courts are left out, and St Albans, Chichester and Salford explain where cases go instead.
- **FAQs now follow the right jurisdiction.** Scotland and NI pages no longer show England-only rules, for example:
  - Scottish divorce and legal aid, "confirmation" instead of probate, and missives/LBTT for property;
  - NI: the Labour Relations Agency instead of ACAS, and one year's service for unfair dismissal;
  - the right regulator in every "are they regulated?" answer.
- **"Request a callback" skips the practice-area step.** Each solicitor now has a `primaryPracticeArea` in `static-lawyers.ts`, which the form pre-selects. The visitor can still go Back and change it.

## Update 4 — form switch, click counter, listing removal, spam protection
- **Enquiry form switch (`LEADS_ENABLED`, off by default).** While it's off:
  - "Request a callback" and "Find a solicitor" show an "Online enquiries are opening soon" notice, with buttons to the firm's own website and its register entry;
  - the side panels on listing pages show a short note instead of the form;
  - the server refuses any submission, even one posted directly.
  - Pay the ICO fee, set `LEADS_ENABLED=true` in Vercel, then redeploy. The form never switches itself on.
- **Anonymous click counter.** Each visit to the enquiry page while the form is off is logged in a **Clicks** tab in the Google Sheet. It records the time, whether it came from a callback button or "Find a solicitor", and which solicitor was chosen — no names, IP addresses or cookies. Pages that only link to the enquiry page don't count (Next.js prefetches aren't logged). Apps Script emails you once when clicks reach 15 (`CLICK_ALERT_AT`).
- **Listing removal and updates.** A new `/uk/listings` page explains how solicitors can have a listing removed or corrected, with pre-filled emails. Every profile says the firm "isn't a Lawvoo partner" and links to "Update or remove this listing" (the email includes the listing URL). There's also a footer link. The address comes from `NEXT_PUBLIC_LISTINGS_EMAIL`.
- **Spam protection:**
  - a hidden honeypot field;
  - a minimum 8-second fill time — bots get a fake "success" and nothing is saved;
  - Cloudflare Turnstile, active once `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are set.
- **Webhook secret.** Every call to the Sheet includes `GOOGLE_SHEETS_WEBHOOK_SECRET`. The new Apps Script in the README rejects calls without it, and the site treats a rejection as a failure.
- **Action needed:** replace your Apps Script with the one in README step 2 and deploy a **New version**. Add the new variables from `.env.example` in Vercel.

## Update 5 — enquiry form switched back on
- `LEADS_ENABLED` now defaults to **on**: the form shows on every "Request a callback" / "Find a solicitor" page and in the side panels, with no variable needed.
- To switch it off again, set `LEADS_ENABLED=false` in Vercel and redeploy. The "opening soon" notice and click counter then come back.
- Spam protection (honeypot, 8-second minimum, Turnstile when keys are set) and the webhook secret still apply.

## Update 6 — real Privacy Policy and Terms of Use
- `/uk/privacy` and `/uk/terms` are rewritten for how Lawvoo actually works and no longer show the "Template" warning:
  - Lawvoo is the data controller. Enquiries go to one solicitor firm (the one chosen, or a subscribing firm), and firms pay a subscription — the visitor never pays.
  - Suppliers are named: Google Sheets/Gmail, Vercel, Cloudflare Turnstile, Resend. Transfers outside the UK are covered.
  - Enquiries are kept for 12 months. No analytics or advertising cookies, so no cookie banner.
  - Scotland and NI are covered: registers and complaint bodies (Legal Ombudsman, SLCC, LSNI).
  - The Terms say listings aren't ranked by payment and a listed firm isn't necessarily a partner.
- Business details come from new variables — `NEXT_PUBLIC_BUSINESS_NAME` (Lawvoo), `NEXT_PUBLIC_CONTACT_EMAIL` (lawvoo12@gmail.com), `NEXT_PUBLIC_BUSINESS_ADDRESS` and `NEXT_PUBLIC_ICO_NUMBER`. Address and ICO lines are hidden until set.
- The form's consent tick-box now says the details will be shared with a solicitor firm.

## Update 7 — Stamp Duty Calculator (free tool)
- New `/uk/tools/stamp-duty-calculator`: SDLT (England & NI), LBTT (Scotland) and LTT (Wales), including:
  - first-time buyer relief;
  - second-home / buy-to-let rates (SDLT +5%, Scottish ADS 8%, Welsh higher rates);
  - the 2% non-UK-resident surcharge.
  It shows a band-by-band breakdown, rate tables, FAQs and structured data (WebApplication, BreadcrumbList, FAQPage). After the result it links to property solicitors in the chosen nation.
- Rates are in `lib/tools/stamp-duty.ts`, checked 28 Sep 2026 against GOV.UK, gov.scot and gov.wales. Update the tables and `RATES_CHECKED` when a budget changes them.
- `/uk/tools` lists all tools. The footer has a new **Free tools** column, and there's no navbar link. Both read `lib/tools/index.ts`.
- Property category pages show a "Work out your stamp duty / LBTT / LTT" card, with the right nation pre-selected.
- Both pages are in the sitemap.

## Update 8 — ready for Google indexing
- New `/robots.txt` (`app/robots.ts`): the whole site can be crawled except `/uk/api/`, and it points to `/sitemap.xml`.
- `metadataBase` is set from `NEXT_PUBLIC_SITE_URL`, so every canonical link uses the real domain rather than the vercel.app address.
- Google Search Console verification tag comes from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- `/` now permanently (308) redirects to `/uk`.
- `/uk/leads/new` (the form) is `noindex, follow`: search engines skip it but still follow its links.
