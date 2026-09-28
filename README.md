# Lawvoo — UK Solicitor Directory (informational site)

No database. Solicitor listings live in a plain TypeScript file
(`lib/data/static-lawyers.ts`), and the lead form writes straight to a
Google Sheet. That's the whole backend.

## 1. Install

```bash
npm install
```

## 2. Set up the Google Sheet (5 minutes, no Google Cloud account needed)

1. Create a new Google Sheet. Add a header row to **Sheet1** (leads):
   ```
   Lead ID | Submitted At | Practice Area | Sub-Category | Case Title | Description | Urgency | Postcode | City | Full Name | Email | Phone | Requested Solicitor
   ```
   A second tab called **Clicks** is created automatically the first time
   someone clicks "Request a callback" while the form is switched off.
2. Make up a long random secret (e.g. from a password generator). You'll put
   the same value in the script below and in `GOOGLE_SHEETS_WEBHOOK_SECRET`.
3. In the Sheet, go to **Extensions → Apps Script**. Delete the placeholder
   code and paste this in its place, filling in the three settings at the top:

   ```javascript
   var SECRET = "PASTE-YOUR-SECRET-HERE";      // same as GOOGLE_SHEETS_WEBHOOK_SECRET
   var NOTIFY_EMAIL = "you@example.com";        // where the click alert goes
   var CLICK_ALERT_AT = 15;                     // email me when clicks reach this number

   function doPost(e) {
     var data = JSON.parse(e.postData.contents);
     if (data.secret !== SECRET) return reply({ status: "forbidden" });

     var lock = LockService.getScriptLock();
     lock.waitLock(10000);
     try {
       var ss = SpreadsheetApp.getActiveSpreadsheet();

       // Anonymous "wanted to enquire" clicks while the form is off.
       if (data.type === "click") {
         var clicks = ss.getSheetByName("Clicks") || ss.insertSheet("Clicks");
         if (clicks.getLastRow() === 0) clicks.appendRow(["Clicked At", "Source", "Solicitor", "City"]);
         clicks.appendRow([data.clickedAt, data.source, data.solicitor || "", data.citySlug || ""]);
         var total = clicks.getLastRow() - 1;
         if (total === CLICK_ALERT_AT) {
           MailApp.sendEmail(
             NOTIFY_EMAIL,
             "Lawvoo: " + total + " people tried to enquire",
             total + " visitors have clicked 'Request a callback' or 'Find a solicitor'.\n\n" +
               "(Clicks are only counted while LEADS_ENABLED=false.)\n\n" + ss.getUrl()
           );
         }
         return reply({ status: "success" });
       }

       // A real enquiry from the form.
       ss.getSheetByName("Sheet1").appendRow([
         data.leadId,
         data.submittedAt,
         data.practiceArea,
         data.subCategory,
         data.caseTitle,
         data.description,
         data.urgency,
         data.postcode,
         data.city,
         data.fullName,
         data.email,
         data.phone,
         data.requestedSolicitor || "",
       ]);
       return reply({ status: "success" });
     } finally {
       lock.releaseLock();
     }
   }

   function reply(obj) {
     return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Click **Deploy → New deployment**. Type: **Web app**. Execute as:
   **Me**. Who has access: **Anyone**. Click **Deploy**, authorize it when
   prompted (it'll warn "Google hasn't verified this app" — that's normal
   for your own script; click Advanced → Go to project (unsafe) → Allow).
   It also asks for permission to send email — that's the click alert.
5. Copy the **Web app URL** it gives you — looks like
   `https://script.google.com/macros/s/AKfycb.../exec`.

> **Already set up the sheet before?** Replace the whole script with the
> one above, then **Deploy → Manage deployments → Edit (pencil) → Version:
> New version → Deploy**. The URL stays the same.

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill it in. In production, add the
same variables in Vercel → Settings → Environment Variables.

| Variable | What it does |
|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | The Apps Script web app URL from step 2 |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | The secret from step 2 — the script rejects anything without it |
| `NEXT_PUBLIC_SITE_URL` | Your real domain, e.g. `https://lawvoo.com` |
| `LEADS_ENABLED` | Enquiry form is **on** unless this is `false`. Set `false` to switch it off (pay the ICO data protection fee while it's on) |
| `NEXT_PUBLIC_BUSINESS_NAME` / `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on Privacy/Terms (default Lawvoo / lawvoo12@gmail.com) |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Postal address for Privacy/Terms — add before launch (a virtual office is fine) |
| `NEXT_PUBLIC_ICO_NUMBER` | Your ICO registration number, once the fee is paid |
| `NEXT_PUBLIC_LISTINGS_EMAIL` | Where solicitors send listing update/removal requests |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile spam protection — see step 4 |
| `RESEND_API_KEY` / `LEAD_NOTIFY_EMAIL` | Optional email alert per lead — see step 5 |

**Changing a variable only takes effect after a redeploy** (Vercel →
Deployments → ⋯ → Redeploy), because most pages are built ahead of time.

### The enquiry form switch (`LEADS_ENABLED`)

- **On (default):** the full form appears everywhere and leads go to
  **Sheet1**. The form collects personal data, so pay the ICO data
  protection fee (ico.org.uk) while it's on.
- **Off (`LEADS_ENABLED=false`):** "Request a callback" and "Find a
  solicitor" show an "Online enquiries are opening soon" notice with a link
  to the firm's own website. Each visit is counted — anonymously, no names,
  IPs or cookies — in the **Clicks** tab, and you get one email when it
  reaches `CLICK_ALERT_AT` (15).

## 4. Spam protection (Cloudflare Turnstile — free)

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** → **Add widget**.
2. Add your domain (and your `*.vercel.app` URL for testing). Mode: **Managed**.
3. Copy the **Site key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the
   **Secret key** into `TURNSTILE_SECRET_KEY`.

Without the keys the form still works (handy locally), protected only by a
hidden honeypot field and a minimum fill-in time. Set both keys before
switching the form on in production.

## 5. (Optional) Email notification per lead

Free account at [resend.com](https://resend.com/api-keys), grab an API key,
add it plus the address you want alerts sent to:

```bash
RESEND_API_KEY="re_..."
LEAD_NOTIFY_EMAIL="you@example.com"
```

If you skip this, `lib/email.ts` silently no-ops — the Sheet write still
happens, you just won't get an email ping.

## 6. Run it

```bash
npm run dev
```

- `/` — homepage
- `/uk` — browse by category/city
- `/uk/locations` and `/uk/locations/[city]` — solicitors by location
- `/uk/solicitors/[category]` and `/uk/solicitors/[category]/[city]` — by practice area
- `/uk/lawyer/[id]` — individual profile
- `/uk/leads/new` — the enquiry form (→ your Google Sheet), or the "opening soon" notice while `LEADS_ENABLED` is off
- `/uk/listings` — for solicitors: update or remove a listing
- `/uk/terms`, `/uk/privacy` — legal pages

## Managing solicitor listings

Edit `lib/data/static-lawyers.ts` directly — it's a plain array, each entry
is one solicitor. Save the file, refresh (dev) or redeploy (production). No
database, no seed command, no migration.

```ts
{
  id: "leeds-jane-smith",          // URL: /uk/lawyer/[id] — unique, lowercase, hyphens
  firmName: "Example Solicitors LLP",
  lawyerName: "Jane Smith",
  role: "Partner, Family",
  regulator: "SRA",                // "SRA" | "LSS" (Scotland) | "LSNI" (Northern Ireland)
  sraNumber: "123456",             // the firm's SRA number, or null outside England & Wales
  registerUrl: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=123456",
  citySlug: "leeds",               // must match lib/seo/uk-cities.ts
  practiceAreaSlugs: ["family", "wills-probate"],
  primaryPracticeArea: "family",   // pre-selected when someone clicks "Request a callback"
  bio: "One or two lines on what they do.",
  addressLine1: "1 Example Street, Leeds LS1 1AA",
  yearsExperience: 12,             // or null if not published
  experienceNote: "12 (qualified 2014)",
  profileUrl: "https://www.example-solicitors.co.uk/people/jane-smith",
  // ratingAverage / ratingCount: only with real reviews — never made up
}
```

## lawvoo.com/uk on Netlify (how the live site is wired)

lawvoo.com itself is hosted on **Netlify**. This app runs on **Vercel** and
Netlify proxies three paths to it, so visitors only ever see lawvoo.com/uk:

| Path on lawvoo.com | Goes to |
|---|---|
| `/uk`, `/uk/*` | this app's pages |
| `/uk-static/*` | this app's JS/CSS (`assetPrefix` in `next.config.ts`) |
| everything else | the Netlify site, unchanged |

1. **Don't add lawvoo.com to this Vercel project.** It stays on Netlify.
2. In the **Netlify** site's repo, add the rules from `deploy/netlify.toml`
   (or `deploy/_redirects`), replacing `lawvoo-uk.vercel.app` with this
   project's Vercel domain. Push, and Netlify redeploys.
3. In Vercel set `NEXT_PUBLIC_SITE_URL=https://lawvoo.com` and redeploy, so
   canonical links and the sitemap use lawvoo.com.
4. The sitemap is at **lawvoo.com/uk/sitemap.xml**. Submit that URL in Google
   Search Console, and add `Sitemap: https://lawvoo.com/uk/sitemap.xml` to the
   Netlify site's robots.txt.
5. If you use Cloudflare Turnstile, add `lawvoo.com` to the widget's domains.

The enquiry form is a Server Action, so `lawvoo.com` is listed in
`experimental.serverActions.allowedOrigins` in `next.config.ts`. Add any
other public domain there too.

## Deploying (Vercel)

1. Push to a Git repo, import it into Vercel.
2. Add the env vars from step 3 in the Vercel project's Environment
   Variables. The enquiry form is on by default; set `LEADS_ENABLED=false` to switch it off.
3. Deploy. No database to provision — that's the point of this setup.

## Legal pages

`/terms` and `/privacy` carry a visible "template, not legal advice" notice
(`components/legal/legal-review-notice.tsx`). Replace the `[bracketed]`
placeholders with real company details and get them reviewed by a solicitor
before this goes live publicly — it's collecting UK personal data (GDPR
applies) even without a database behind it.

## Design tokens

| Token | Hex | Use |
|---|---|---|
| Ink (navy) | `#10233D` | Headings, primary text, primary button |
| Ink hover | `#1C3A5E` | Primary button hover |
| Accent (brass) | `#B8863B` | Progress, selected states, focus ring, CTA |
| Accent hover | `#A47730` | CTA hover |
| Background | `#F8F7F4` | Page background |
| Border | `#DCD8D0` | Card/input borders |
| Muted text | `#5B6472` | Secondary copy |
| Faint text | `#A8A398` | Tertiary/helper copy |
| Success | `#2F6844` | Confirmation state |

Two font families: `font-serif` (Source Serif 4) for headings, `font-sans`
(Inter) for everything functional — both wired up in `app/layout.tsx` and
`app/globals.css` (Tailwind v4 — `@theme` in CSS, no `tailwind.config.ts`).
