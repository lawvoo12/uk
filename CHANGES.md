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

## Update 9 — runs at lawvoo.com/uk behind Netlify
- `assetPrefix: "/uk-static"`: JS/CSS load from `/uk-static/_next/...` rather than `/_next/...`, so they don't clash with the Netlify site.
- `experimental.serverActions.allowedOrigins` includes lawvoo.com, so the enquiry form works through the proxy.
- The sitemap moved to `/uk/sitemap.xml`; `/sitemap.xml` on lawvoo.com belongs to the Netlify site. robots.txt points to the new path.
- `vercel.json` pins the framework to Next.js. This fixes the "No Output Directory named public" build error.
- `deploy/netlify.toml` and `deploy/_redirects` hold the proxy rules for the Netlify site. See README, "lawvoo.com/uk on Netlify".
- Tested through a local proxy that behaves like Netlify: pages, assets, in-app navigation, the calculator and a form submission to the Sheet all work, and non-/uk paths still reach the other site.

## Update 10 — Ireland directory at /ie (28 Sep 2026)
- **New Irish section at `/ie`** in the same app: home, locations (20 towns by province), town pages, solicitors hub, 6 practice-area pages, 120 area × town pages, solicitor profiles, enquiry form, listings, privacy, terms, tools, and `/ie/sitemap.xml`.
- **Towns:** Dublin, Cork, Limerick, Galway, Waterford, Drogheda, Dundalk, Swords, Navan, Kilkenny, Ennis, Carlow, Tralee, Naas, Athlone, Sligo, Letterkenny, Wexford, Mullingar, Castlebar.
- **Data:** 40 solicitors from 38 firms, 2 per town, in `lib/ie/lawyers.ts`, each from the firm's own website, with a `verification` note. Six firms were also confirmed on the LSRA Register of LLPs. The Law Society of Ireland register only works in a browser, so **you must still check each firm there** and then set `IE_REGISTER_CHECKED = true`. Until then, the page copy asks visitors to check the register and doesn't claim "checked". No ratings, reviews or experience figures were made up.
- **Irish-law content** (`lib/ie/content.ts`), checked against courts.ie, WRC, ISD, Citizens Information and the Law Society Gazette:
  - courts, the Probate Office and District Probate Registries;
  - WRC offices and time limits;
  - ISD registration at Burgh Quay (since 13 Jan 2025);
  - the Injuries Resolution Board;
  - the Family Law Act 2019 divorce rule, and the family courts starting from Jan 2027;
  - Succession Act rights, conveyancing steps, Tailte Éireann and the RTB.
  - Every town page has its own local paragraph, a court list, the right probate registry, the nearest WRC office and 5 FAQs (FAQPage schema).
- **Personal injury (Ireland):** listings only.
  - PI pages have no form; they show a "How injury claims work in Ireland" panel, and each card has **Visit firm website** instead of "Request a callback".
  - The Irish form has no PI option, and the server rejects an Irish PI enquiry even if it is posted directly.
- **Enquiry form is country-aware.**
  - Irish version: optional Eircode, Irish phone numbers, Irish sub-categories, GDPR wording, `/ie/privacy` link.
  - Every lead sends `country: "UK" | "IE"` to the Sheet. Click tracking sends it too.
  - **Action:** add a 14th column **Country** to Sheet1 and a 5th column **Country** to the Clicks tab. Paste the new Apps Script from README step 2, which now also emails every lead to `NOTIFY_EMAIL`. Then Deploy → Manage deployments → Edit → New version.
- **Irish Stamp Duty Calculator** at `/ie/tools/stamp-duty-calculator`, in the Ireland footer only.
  - Rates: 1% up to €1m, 2% up to €1.5m, 6% above. For new homes it removes VAT first (13.5% for houses, 9% for qualifying apartments from 8 Oct 2025). It also shows a Help to Buy estimate.
  - Rates were checked on 28 Sep 2026 against Revenue and Citizens Information, and the page links both sources.
- **Navbar/footer** read the URL and show Irish links on /ie pages; the UK ones are unchanged. They're now client components.
- **SEO:**
  - canonical URLs on www.lawvoo.com/ie/…;
  - noindex on the form, and on area × town pages with no solicitors (these are also left out of the sitemap);
  - robots.txt lists both sitemaps.
  - `hreflang` en-GB ↔ en-IE only on truly equivalent pages: home, solicitors hub, the 6 practice-area pages, locations index, tools, stamp duty calculator and listings. City and profile pages are different content, so they have none.
- **New switches:** `IE_LEADS_ENABLED` (turns off the Irish form only) and `NEXT_PUBLIC_EU_REPRESENTATIVE` (shown on /ie/privacy).
- **UK unchanged:** all 375 UK URLs were compared before and after, covering text, links, JSON-LD and meta tags. The only differences are the new hreflang tags on the pages listed above and the extra robots.txt lines. The UK sitemap is byte-identical, apart from its dates.

## Update 11 — more for Ireland (30 Sep 2026)
- **UK footer:** a "Lawvoo Ireland →" link was added under Company. This is the only change on UK pages: all 375 UK URLs were re-compared, and nothing else differs.
- **Guides to Irish law** at `/ie/guides`, with 6 guides in `lib/ie/guides.ts`. Each guide has official sources, "next step" links, and Article + Breadcrumb schema:
  - divorce;
  - making a WRC complaint;
  - buying a home;
  - probate;
  - immigration registration (IRP);
  - the Injuries Resolution Board. The PI guide has no enquiry button.
  - Each practice-area page links to its guide, and "Guides" is now in the Ireland navbar.
- **3 new free tools** (Ireland footer and `/ie/tools` only):
  - `/ie/tools/who-inherits-without-a-will`: intestacy shares under the Succession Act 1965, including a deceased child's or sibling's share passing to their children.
  - `/ie/tools/inheritance-tax-calculator`: CAT at 33% above Group A €400,000 / B €40,000 / C €20,000, with aggregation, the €3,000 small gift exemption, and spouses exempt. Budget 2026 made no change. `lib/ie/cat.ts` — **re-check after each October Budget.**
  - `/ie/tools/wrc-time-limit-calculator`: 6-month and 12-month WRC deadlines and the 42-day Labour Court appeal. It shows the day before each limit, to be safe.
- **`/ie/irish-language-solicitors`:** explains Clár na Gaeilge and the right to use Irish in court, and lists 12 solicitors from the Law Society register dated 13 March 2026 in Galway, Dundalk, Tralee, Athlone, Ennis and Letterkenny (`lib/ie/irish-language.ts`). In-house lawyers are left out, and for Dublin and Cork the page links to the full register.
- **`/ie/free-legal-help`:** covers the Legal Aid Board, FLAC (01 906 10 10), Citizens Information (0818 07 4000), MABS (0818 07 2000), the WRC, the Injuries Resolution Board and the RTB. It lists the nearest law centre for all 20 towns (`lib/ie/free-help.ts`). Every town page now has a "Free legal help nearby" line.
- All new pages are in `/ie/sitemap.xml`, which now has 184 URLs.

## Update 12 — 3-5 UK firms per city (1 Oct 2026)
- New file `lib/data/uk-lawyers-extra.ts` holds 129 extra UK firms (179 UK listings in total). The original 50 entries in `lib/data/static-lawyers.ts` are unchanged; that file now joins both lists into `STATIC_LAWYERS`, so city pages, category/city pages, location counts, profiles, the sitemap and the form all pick them up.
- Every city now has 3-5 firms, except Chester (2 — no other verifiable local firm with a named solicitor).
- Verification: England & Wales firms on the SRA register (same firm name, office in that city, no published disciplinary decisions or settlements); NI firms on the Law Society of NI directory; Scottish firms searched by name on lawscot.org.uk and confirmed by the site owner. Firms with recent AML settlements were left out.
- Ireland: lawyer profiles and the Irish enquiry form no longer show a "Visit firm website" link, so visitors use "Request a callback". Personal-injury-only listings (no Irish PI form) and the "enquiries closed" notice still link to the firm. No other /ie change.
- No change to design, URLs, SEO settings, .gitignore, vercel.json or next.config.ts.

## Update 13 — Canada directory at /ca, Batch 1: Ontario (2 Oct 2026)
- **New Canadian section at `/ca`** in the same app, built the same way as `/ie`: home, locations, city pages, lawyers hub, 6 practice-area pages, area × city pages, lawyer profiles, enquiry form, listings, privacy (PIPEDA and CASL), terms and `/ca/sitemap.xml`.
- **Cities so far (Batch 1):** Toronto, Ottawa, Mississauga, Brampton, Hamilton. The plan is 20 cities in 9 provinces (no Quebec), added in batches of 5; a city only gets pages once its lawyers are confirmed.
- **Data:** 14 lawyers from 14 firms in `lib/ca/lawyers.ts`.
  - Name, role, address, practice areas and bio come from each firm's own website. Experience is only shown where the firm publishes a call-to-the-bar year.
  - Each lawyer was confirmed by you on the Law Society of Ontario's public directory on 2 Oct 2026, and the profile shows that date.
  - **Dropped:** Kate Wright (Mann Lawyers, Ottawa) — the directory shows her at another firm. Ottawa has 2 firms until a replacement is confirmed.
  - **Not used:** Vasim Shaikh at Nanda & Associate Lawyers is an immigration consultant, not a lawyer; Batra Law Offices (Brampton) could not be read; Kania Lawyers and Simmons da Silva have no individual profile pages that could be read; Minhas Lawyers' office is in Mississauga, not Brampton.
  - No firm was skipped for a discipline decision: a web search for tribunal decisions found nothing for the 15 names, and the directory entry (which shows discipline history) was checked by you.
- **Words and URLs:** "lawyer" everywhere, never "solicitor". Area URLs are `/ca/lawyers/real-estate` and `/ca/lawyers/wills-estates`; the Google Sheet still receives the same six practice-area values, shown as "Real Estate" and "Wills & Estates". CAD and `en_CA`.
- **IDs:** Canadian ids carry the province (`toronto-on-…`); London, Ontario will be `london-on-…` with the city slug `london-ontario`. `npm run check:ids` fails if any id is used twice across UK, Ireland and Canada (233 ids, all unique).
- **Ontario-law content** (`lib/ca/content.ts`), with sources and the date checked listed at the top of the file: court structure and the $50,000 Small Claims limit; divorce and property division; employment standards and human rights time limits; land transfer tax, the first-time buyer refund, Toronto's municipal tax and the Non-Resident Speculation Tax; probate, Estate Administration Tax and intestacy; accident benefits and limitation periods; citizenship and Federal Court deadlines. Every city page has its own courts (with links), family court, probate and FAQs.
  - A few rules were taken from the statutes without re-reading them online, because Ontario's e-Laws site and the federal Justice Laws site could not be opened. They are listed at the top of `lib/ca/content.ts`.
- **Personal injury (Canada):** listings only, as in Ireland — no form on PI pages, no PI option on the form, and the server rejects a Canadian PI enquiry.
- **Enquiry form:** country-aware (`CA`): optional postal code, North American phone numbers, Canadian sub-categories, PIPEDA consent wording, `/ca/privacy` link. It sends `country: "CA"` to the Sheet, and click tracking sends it too.
  - **The Canadian form is OFF by default.** It opens only when `CA_LEADS_ENABLED=true` is set in Vercel. Read `deploy/canada-referral-fee-note.md` first. Nothing on the site promises paid referrals.
  - **Action:** paste the updated Apps Script from README step 2 (it now writes `CA` in the Country column — the old script would have written `UK`), then Deploy → Manage deployments → Edit → New version. No new column is needed.
- **Footers:** "Lawvoo Canada →" added to the UK and Ireland footers; the Canada footer links to UK and Ireland.
- **SEO:** canonical URLs on https://lawvoo.com/ca/… (no www); noindex on the form and on area × city pages with no lawyers; `/ca/sitemap.xml` has 60 URLs; robots.txt lists it. `hreflang` `en-CA` was added on the matching UK and Ireland pages (home, hub, the 6 practice-area pages, locations index, listings) and those Canada pages point back. City and profile pages have none.
- **UK and Ireland unchanged:** all 755 UK and Ireland pages were compared with the build from before this change. After removing the new footer link and the `en-CA` tag, the HTML is identical on every page. Both sitemaps are identical apart from their dates. The UK and Irish forms were re-tested and still send `UK` and `IE`.
- **Not done yet:** the land transfer tax calculator (comes with the later batches, once every province's rates are checked), and the other 15 cities.
- No change to `.gitignore`, `vercel.json` or `next.config.ts`.

## Update 14 — Canada Batch 2: London, Kitchener-Waterloo, Vancouver, Surrey, Victoria (3 Oct 2026)
- **10 cities, 29 lawyers.** British Columbia is now live alongside Ontario.
  - New Ontario cities: London (`/ca/locations/london-ontario`, ids `london-on-…`) and Kitchener-Waterloo. Searching "London", "Kitchener" or "Waterloo" finds them.
  - New BC cities: Vancouver, Surrey, Victoria. Regulator code `LSBC`, checked on the Law Society of British Columbia's Lawyer Directory.
  - Ottawa: Alison Boyce (Mann Lawyers LLP) added, so Ottawa has 3 firms.
  - **Dropped:** John P. Murray (Giffen LLP, Waterloo) — the directory has several lawyers with that name and the right one could not be told apart. Kitchener-Waterloo has 2 firms until a replacement is confirmed.
  - **Not used:** Mark & Company Law (Surrey immigration) — its address is a P.O. box; Ng Sidhu Law (Surrey) — "an association of independent law firms" with no street address shown; Brij Mohan & Associates (Surrey) — no named lawyer page could be read.
- **Legal numbers rule.** A time limit, amount or rate only appears on the /ca pages if it was read on an official source. Where the official source could not be read, the number was removed and the page links to the official source. `deploy/canada-legal-sources.md` lists every number, its source, and the four that are still unverified.
  - Removed from Ontario pages: the $350,000 intestacy share and its split, the 30-day accident benefits deadline, and the general 10-day municipal notice (Toronto's 10 days stays — verified on toronto.ca).
  - Newly verified for Ontario: the two-year limit, notice of termination and severance pay, the Federal Court 15/60 days, the Canada Labour Code 90 days, the seven-day insurer notice, and the list of Family Court branch locations.
  - The privacy page no longer gives an age of majority.
- **British Columbia content** (`lib/ca/provinces/british-columbia.ts`): property transfer tax, first-time buyer exemption, the 20% foreign buyer tax, the three-day rescission period, family property rules for married and unmarried couples, which court hears what, employment standards and human rights time limits, ICBC's Enhanced Care, intestacy, and courts for each city.
- **Code layout:** province content moved into `lib/ca/provinces/ontario.ts` and `british-columbia.ts`; federal text shared by all provinces is in `lib/ca/content-shared.ts`. The Canada-wide practice-area pages now show one section per province.
- `/ca/sitemap.xml` has 109 URLs. UK and Ireland pages were compared again with the original build: still identical apart from the footer link and the `en-CA` tag.

## Update 15 — Canada Batch 3: Kelowna, Calgary, Edmonton, Saskatoon, Regina (3 Oct 2026)
- **15 cities, 44 lawyers.** Alberta and Saskatchewan are now live.
  - Kitchener-Waterloo: Jorden P. Gregory (Giffen LLP) added, so it has 3 firms.
  - New BC city: Kelowna. New Alberta cities: Calgary, Edmonton (regulator code `LSA`). New Saskatchewan cities: Saskatoon, Regina (regulator code `LSSK` — not `LSS`, which is the Law Society of Scotland).
  - **Regina has 2 firms.** Susan B. Barber (McDougall Gauley LLP) was confirmed on the directory but **not added**: the firm's employment group acts only for employers, so she does not fit the Employment page. A replacement from the same firm (Jyoti S. Haeusler, immigration and family) is waiting for the directory check.
  - **Skipped:** Scharfstein LLP (Saskatoon) — the Law Society of Saskatchewan's published discipline decisions include a 2020 decision about a lawyer of that name who was then at the firm.
  - A firm is only listed under an area its own website says it handles for individuals. Left out for that reason: employment at OWZW and Kanuka Thuringer (employer side); personal injury at Robertson Stromberg, McKercher and Kanuka Thuringer (insurer side) and at Bishop & McKenzie and OWZW (side not stated); immigration, employment and real estate at McKercher.
- **Alberta content** (`lib/ca/provinces/alberta.ts`) and **Saskatchewan content** (`lib/ca/provinces/saskatchewan.ts`), from official sources only: which court hears what, family property rules for married and unmarried couples, employment standards and human rights time limits, notice of termination, Land Titles registration fees, tenancy tribunals, probate fees, auto injury insurance (Alberta's Care-First system from 1 Jan 2027; SGI's No Fault and Tort coverage), and the courts for each city.
- **Left out because the official source could not be read:** in Alberta, the intestacy shares, the time limit for married spouses to divide property, the minor injury cap amount and the 10-year ultimate limitation period; in Saskatchewan, which court centre a probate application goes to. See `deploy/canada-legal-sources.md`.
- The pages do not say that Alberta or Saskatchewan "has no land transfer tax" — no official page says so in words. They describe the registration fees that are charged.
- The Law Society of British Columbia directory link now uses the address the Law Society's own website links to (`…/lkup/directory/mbr-search.cfm`).
- Search accepts "Calgary, Alberta", "Regina, Saskatchewan" and postal codes starting T2/T3 (Calgary), T5/T6 (Edmonton), S7 (Saskatoon), S4 (Regina) and V1Y (Kelowna).
- `/ca/sitemap.xml` has 156 URLs. City pages for an area with no listed firm (for example immigration in Saskatoon) are `noindex` and left out of the sitemap. UK and Ireland pages were compared again with the original build: still identical apart from the footer link and the `en-CA` tag.

## Update 16 — Canada Batch 4, gap-fill round and the land transfer tax calculator (4 Oct 2026)
- **20 cities, 65 lawyers, 9 provinces.** Manitoba, Nova Scotia, New Brunswick, Newfoundland and Labrador and Prince Edward Island are now live.
  - New cities: Winnipeg (`LSM`), Halifax (`NSBS`), Moncton (`LSNB`), St. John's (`LSNL`, slug `st-johns`), Charlottetown (`LSPEI`).
  - The Nova Scotia regulator is still called the Nova Scotia Barristers' Society (checked on nsbs.org and in the Legal Profession Act).
  - Regina: Jyoti S. Haeusler (McDougall Gauley LLP) added.
  - **Halifax has 2 firms.** Not added: Tara Miller, K.C. (MDW Law) — a link between another partner at the firm and a regulator notice could not be ruled out; Janice E. Beaton, KC (Patterson Law LLP) — not confirmed by the site owner. BOYNECLARKE's office is in Dartmouth, which is part of Halifax Regional Municipality.
  - **Skipped for discipline:** Haller Law (Moncton) — a current case on the Law Society of New Brunswick's list; Kang & Company (Surrey) — a 2021 suspension of its founder; Daniel Tapp (Regina) — a 2011 decision.
  - **Skipped as virtual or appointment-only:** Resolute Legal (Moncton), Veeman Law (Saskatoon), Crest Attorneys (Saskatoon).
- **Gap-fill round** (one lawyer each, all confirmed on the directory): immigration in Brampton (Anita Perera), London (Elena Ashford, Siskinds), Surrey (Puneet Khaira, CityLaw Group) and Saskatoon (Omer Khayyam, Omni Law); employee-side employment in Regina (Samuel I. Schonhoffer, Gerrand Rath Johnson LLP); claimant-side personal injury in Regina (Tim Stodalka, MacLean Keith LLP).
- **Land transfer tax calculator** at `/ca/tools/land-transfer-tax-calculator` (and a `/ca/tools` page): all nine provinces, Toronto's municipal tax, first-time buyer relief for Ontario, Toronto, BC and PEI, registration fees where the province publishes them, and the official source for every figure. Logic is in `lib/ca/land-transfer-tax.ts`; 28 hand-worked examples were checked. It does not calculate foreign or non-resident buyer taxes, or BC's partial first-time exemption between $835,000 and $860,000.
- The Canada footer now has a "Free tools" column. The UK and Ireland tools page and stamp duty calculator pages each gained one `en-CA` hreflang line (option A); nothing else on them changed.
- **Content for the five new provinces** is in `lib/ca/provinces/` (one file each), from official sources only. Left out because the official source could not be read: Manitoba first-time buyer relief, the Nova Scotia time limit to divide property, the New Brunswick employment standards complaint deadline, and the PEI probate fee table. See `deploy/canada-legal-sources.md`.
- Search accepts the new cities, "Dartmouth" and "Bedford" (Halifax), "St Johns" spellings, province names, and postal codes starting R2/R3, B3, E1, A1 and C1.

## Update 17 — United States section at /us, Alabama first (17 Oct 2026)

- New `/us` section built like `/ca`: homepage, practice areas (Immigration,
  Family, Personal Injury, Employment, Real Estate, Estate Planning &
  Probate), locations, 5 Alabama cities (Birmingham — slug
  `birmingham-alabama`, Montgomery, Huntsville, Mobile, Dothan), city ×
  area pages, lawyer profiles, privacy, terms, `/us/sitemap.xml`.
- Data in `lib/us/` (states, regulators — Alabama State Bar `ASB`, cities
  with ZIP prefixes, content, lawyers). Alabama law content in
  `lib/us/states/alabama.ts`, official sources only; see
  `deploy/us-legal-sources.md` for what is verified and what was left out.
- No US lawyers yet: candidates waiting for the owner's ✅/❌ are in
  `deploy/us-batch1-candidates.md`. The plan is one lawyer per practice area
  per state to start.
- US enquiry form added (ZIP code, US phone numbers, US sub-categories, US
  consent wording) but OFF unless `US_LEADS_ENABLED="true"`. Personal injury
  is not on the form.
- `US_SECTION_LIVE = false` (lib/config.ts) keeps every `/us` page noindex.
  Netlify has no `/us` rule yet, so lawvoo.com/us does not exist.
- UK, Ireland and Canada pages unchanged (978 built pages compared).
- Apps Script: accepts country "US" (paste the new `deploy/lawvoo-apps-script.js`).
- Added US guides (`lib/us/guides.ts`, `/us/guides`): Alabama child support
  (Rule 32), Alabama deed and mortgage tax, filing an EEOC charge, and the
  US citizenship five-year and three-year rules — official sources only.
- Added the Alabama Deed & Mortgage Tax Calculator
  (`/us/tools/alabama-deed-mortgage-tax-calculator`, `lib/us/recordation-tax.ts`),
  including the deduction when the mortgage is recorded with the deed.
- US navbar now has Guides; US footer has Free tools and Guides & advice.

## Update 18 — First US lawyers: Alabama, one per practice area (18 Oct 2026)

- Added six lawyers to `lib/us/lawyers.ts`, each confirmed by the site owner
  on the Alabama State Bar's Find a Member search on 18 Oct 2026: Stephen
  Davis (Butler Snow, Huntsville — immigration), John Tyler Winans (The
  Harris Firm, Montgomery — family), Lucy E. Tufts (Cunningham Bounds,
  Mobile — personal injury), Rocco Calamusa Jr. (Wiggins Childs,
  Birmingham — employment), Ashton Holmes Ott (FarmerPrice, Dothan — real
  estate) and Christopher R. Owens (The Harris Firm, Birmingham — estate
  planning & probate).
- US homepage "Popular searches" now point at the city and area pages that
  have these lawyers.
- `/us` is still noindex and not proxied from Netlify.

## Update 19 — US section goes live (18 Oct 2026)

- `US_SECTION_LIVE = true`: /us pages are indexable (city and area pages
  with no lawyers stay noindex, as in the other sections).
- `en-US` hreflang added to the matching UK, Ireland and Canada pages, and
  the US pages now link back to them.
- UK, Ireland and Canada footers get a "Lawvoo US →" link.
- `app/robots.ts` (vercel.app only) lists the US sitemap and disallows /us/api/.
- Netlify (repo lawvoo12/law): /us and /us/* rules and the robots.txt lines
  are in a separate PR — merge that one after this one has deployed.

## Update 20 — US enquiry form switched on (18 Oct 2026)

- `US_LEADS_ENABLED` is now on unless set to "false" (site owner's request).
  Personal injury stays off the US form. Paste the updated
  `deploy/lawvoo-apps-script.js` so US leads are saved with country "US".
- US privacy policy: added "Where your information is stored" and
  "Security" sections, to match the other countries.

