# US (/us) — legal facts and their sources

Rule: a legal number only appears if it was read on an official source.
Otherwise the page links to the official source instead. Checked 17 Oct 2026.

## Verified (shown on the pages)
| Fact | Source |
|---|---|
| Naturalization: 18+, permanent resident 5 years, physically present 30 months, 3 months in state/district | uscis.gov "I am a lawful permanent resident of 5 years" |
| Spouses of US citizens: permanent resident 3 years, marital union 3 years | uscis.gov "I am married to a U.S. citizen" |
| Accredited representatives may represent before DHS/EOIR only through recognized non-profit organizations | justice.gov/eoir Recognition and Accreditation Program (upd. 29 Apr 2026) |
| EOIR conducts immigration court proceedings | justice.gov/eoir About the Office |
| EEOC charge: 180 days, 300 with a state/local agency; age: state law only; Equal Pay Act 2 years (3 willful); federal employees 45 days | eeoc.gov Time Limits For Filing A Charge |
| EEOC Birmingham District Office address | eeoc.gov/field-office/birmingham |
| Wage and Hour Division complaints: 1-866-487-9243 | dol.gov/agencies/whd |
| Alabama: no state minimum wage law; federal $7.25 | dol.gov State Minimum Wage Laws (upd. 1 Jul 2026) |
| Alabama recordation tax: deeds $.50 per $500; mortgages $.15 per $100; 2/3 General Fund, 1/3 county | revenue.alabama.gov Recordation Tax (upd. 14 Aug 2023) |
| Alabama court structure (circuit / district / probate / municipal) | AOC Annual Report 2023 (alacourt.gov) |
| Child Support Guidelines (Rule 32) revised effective 1 May 2022 | alacourt.gov Child Support Guidelines Review |
| Legal Services Alabama phone numbers and hours | legalservicesalabama.org |
| Volunteer Lawyers Program (888) 857-8571; Justice4AL run by the State Bar | alabar.org, justice4al.com |
| Mortgage recorded with the deed: deed tax only on the price above the mortgage (taxable lender, mortgage tax paid) | Baldwin County Probate Office, Recording Fees |
| Rule 32 details: combined adjusted gross income, schedule to $30,000 and 1–6 children, child care cap, $250 medical, $981 self-support reserve, 85%, $50 minimum, zero-dollar presumptions | Alabama Supreme Court order amending Rule 32 (effective 1 May 2022) |
| Shared 50% custody adjustment, Form CS-42-S, × 150% (cases from 1 June 2023) | Alabama Supreme Court order of 3 Mar 2023 |
| EEOC filing methods, 1-800-669-4000, TTY 1-800-669-6820, office hours, signature required, charge needed before suing (except EPA) | eeoc.gov How to File a Charge |
| Probate court addresses (Jefferson, Montgomery, Madison, Mobile, Houston) | revenue.alabama.gov county probate office directory; county probate court websites |

## Not verified — left out, official link shown instead
1. Alabama personal-injury time limit (Code of Alabama § 6-2-38) — official code site could not be read.
2. Alabama divorce residency period.
3. Alabama intestacy shares and probate deadlines.
4. Dollar limits of Alabama district/circuit courts and small claims (only a 2023 report was readable).

## Before the US section goes live
- US_SECTION_LIVE = true (lib/config.ts), Netlify /us rules, robots.txt sitemap line, en-US hreflang on UK/IE/CA pages.
- Lead form stays off until a sourced US referral-fee note is read; then set US_LEADS_ENABLED="true" in Vercel and redeploy.
