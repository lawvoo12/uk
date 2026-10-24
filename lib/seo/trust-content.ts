// ============================================================================
// What the About, How we verify and Contact pages say for the UK, Ireland
// and Canada (the US pages live in app/us/). Every line must be TRUE for that
// country today — it mirrors the "how each entry was verified" notes at the
// top of lib/data/static-lawyers.ts, lib/data/uk-lawyers-extra.ts,
// lib/ie/lawyers.ts and lib/ca/lawyers.ts. Change them together.
// ============================================================================

import { CA_LEADS_ENABLED, IE_LEADS_ENABLED, LEADS_ENABLED } from "@/lib/config";
import { CA_LAWYERS } from "@/lib/ca/lawyers";
import { CA_CONTENT_CHECKED } from "@/lib/ca/content";
import { CA_PROVINCE_ORDER, CA_PROVINCES } from "@/lib/ca/provinces";
import { IE_REGISTER_CHECKED, LSI_REGISTER_URL } from "@/lib/ie/lawyers";
import { REGULATORS } from "@/lib/seo/regulators";
import { CA_DATES, IE_DATES, UK_DATES } from "@/lib/seo/page-dates";

export type TrustCountry = "uk" | "ie" | "ca";

export interface TrustLink {
  label: string;
  href: string;
}

export interface TrustSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Shown as a bulleted list of links after the text. */
  links?: TrustLink[];
  /** Shown after the links. */
  after?: string[];
}

export interface TrustConfig {
  code: TrustCountry;
  base: "/uk" | "/ie" | "/ca";
  locale: "en-GB" | "en-IE" | "en-CA";
  /** "Lawvoo UK" */
  brand: string;
  /** "the UK" / "Ireland" / "Canada" */
  where: string;
  /** "solicitor" / "lawyer" */
  word: string;
  /** Where people browse listings: /uk/solicitors, /ca/lawyers… */
  browsePath: string;
  leadsEnabled: boolean;
  /** Personal injury isn't taken through the form here. */
  noPiEnquiries: boolean;
  /** "haven't paid to appear" — plus "and don't pay us for enquiries" where that's what /listings says. */
  paymentSentence: string;
  dates: { about: string; "how-we-verify": string; contact: string };
  /** About page: one paragraph on what the listings cover. */
  coverage: string;
  /** About page: short "how listings work" bullets. */
  listingBullets: string[];
  /** How we verify page sections, in order. */
  verify: TrustSection[];
}

const NO_RATINGS = "We don't publish star ratings, reviews or testimonials, and we never write them ourselves.";
const NO_PAID = "No one can pay to appear or to be shown higher.";

const caProvincesLive = CA_PROVINCE_ORDER.filter((code) => CA_LAWYERS.some((l) => l.province === code)).flatMap(
  (code) => CA_PROVINCES[code] ?? []
);

export const TRUST: Record<TrustCountry, TrustConfig> = {
  uk: {
    code: "uk",
    base: "/uk",
    locale: "en-GB",
    brand: "Lawvoo UK",
    where: "the UK",
    word: "solicitor",
    browsePath: "/uk/solicitors",
    leadsEnabled: LEADS_ENABLED,
    noPiEnquiries: false,
    paymentSentence: "Listed firms are not Lawvoo partners and haven't paid to appear.",
    dates: { about: UK_DATES.about, "how-we-verify": UK_DATES["how-we-verify"], contact: UK_DATES.contact },
    coverage:
      "In the UK we list solicitors in England, Wales, Scotland and Northern Ireland, by area of law and by city, and we add firms over time.",
    listingBullets: [
      "Names, roles, office addresses and practice areas come from each firm's own website.",
      "Every listing links to the regulator's public register — the SRA, the Law Society of Scotland or the Law Society of Northern Ireland — so you can check the firm yourself.",
      "Years of experience are shown only when the firm publishes them; otherwise the profile says \"Not published\".",
      NO_RATINGS,
    ],
    verify: [
      {
        heading: "1. Where listing details come from",
        paragraphs: [
          "Each solicitor's name, role, office address, practice areas and short description come from their profile on the firm's own website. Every profile links to that source page, marked \"Source profile\".",
        ],
      },
      {
        heading: "2. The regulator check",
        paragraphs: [
          "Solicitors in England and Wales are regulated by the Solicitors Regulation Authority (SRA). For each firm in England and Wales we took the firm's SRA number from its website, opened it on the SRA's public register and confirmed the register shows the same firm. The SRA number shown is the firm's number, not the individual solicitor's.",
          "Firms in Scotland are regulated by the Law Society of Scotland, and firms in Northern Ireland by the Law Society of Northern Ireland. Their listings link to that society's directory.",
        ],
        links: [
          { label: REGULATORS.SRA.registerLabel, href: REGULATORS.SRA.registerUrl },
          { label: REGULATORS.LSS.registerLabel, href: REGULATORS.LSS.registerUrl },
          { label: REGULATORS.LSNI.registerLabel, href: REGULATORS.LSNI.registerUrl },
        ],
        after: [
          "A listing is a snapshot — solicitors move firms — so please check the firm on the register yourself before you instruct them.",
        ],
      },
      {
        heading: "3. What we don't publish",
        bullets: [
          NO_RATINGS,
          "No \"best\" or \"top-rated\" badges. We don't rank solicitors by quality.",
          "Years of experience only when the firm publishes a qualification year or a number of years; otherwise \"Not published\".",
          NO_PAID,
        ],
      },
      {
        heading: "4. Guides and tools",
        paragraphs: [
          "Our guides are general information about the law in the UK, not legal advice. The stamp duty calculator shows the date its rates were last checked.",
        ],
      },
    ],
  },

  ie: {
    code: "ie",
    base: "/ie",
    locale: "en-IE",
    brand: "Lawvoo Ireland",
    where: "Ireland",
    word: "solicitor",
    browsePath: "/ie/solicitors",
    leadsEnabled: IE_LEADS_ENABLED,
    noPiEnquiries: true,
    paymentSentence: "Listed firms are not Lawvoo partners, haven't paid to appear, and don't pay us for enquiries.",
    dates: { about: IE_DATES.about, "how-we-verify": IE_DATES["how-we-verify"], contact: IE_DATES.contact },
    coverage:
      "In Ireland we list solicitors in towns and cities across the Republic of Ireland, by area of law, and we add firms over time.",
    listingBullets: [
      "Names, roles, office addresses and practice areas come from each firm's own website.",
      "Every listing links to the Law Society of Ireland's Find a Solicitor register, so you can check the firm yourself.",
      "Years of experience are shown only when the firm publishes them; otherwise the profile says \"Not published\".",
      NO_RATINGS,
    ],
    verify: [
      {
        heading: "1. Where listing details come from",
        paragraphs: [
          `Each solicitor's name, role, office address, practice areas and short description come from their profile on the firm's own website, read in ${IE_DATES.listings.replace(/^\d+ /, "")}. Every profile links to that source page, marked "Source profile".`,
        ],
      },
      {
        heading: "2. The register check",
        paragraphs: [
          "Solicitors in Ireland are listed on the Law Society of Ireland's Find a Solicitor register.",
          IE_REGISTER_CHECKED
            ? `We checked every listed solicitor on that register on ${IE_DATES.registerCheckPeriod}, and each holds a practising certificate.`
            : "We are still completing a check of every listed firm on that register. Until it's done, please check the firm there yourself — every profile links to it.",
        ],
        links: [{ label: REGULATORS.LSI.registerLabel, href: LSI_REGISTER_URL }],
        after: ["A listing is a snapshot — solicitors move firms — so please check the register before you instruct them."],
      },
      {
        heading: "3. What we don't publish",
        bullets: [
          NO_RATINGS,
          "No \"best\" or \"top-rated\" badges. We don't rank solicitors by quality.",
          "Years of experience only when the firm publishes a qualification year or a number of years; otherwise \"Not published\".",
          NO_PAID,
        ],
      },
      {
        heading: "4. Legal facts in our guides and tools",
        paragraphs: [
          "Facts in our Irish guides — deadlines, thresholds, which body handles what — are read on official sources, and each guide lists its sources. Each calculator shows the date its figures were last checked. If a figure can't be confirmed on an official source, we leave it out. Our guides are general information, not legal advice.",
        ],
      },
    ],
  },

  ca: {
    code: "ca",
    base: "/ca",
    locale: "en-CA",
    brand: "Lawvoo Canada",
    where: "Canada",
    word: "lawyer",
    browsePath: "/ca/lawyers",
    leadsEnabled: CA_LEADS_ENABLED,
    noPiEnquiries: true,
    paymentSentence: "Listed firms are not Lawvoo partners, haven't paid to appear, and don't pay us for enquiries or referrals.",
    dates: { about: CA_DATES.about, "how-we-verify": CA_DATES["how-we-verify"], contact: CA_DATES.contact },
    coverage: `In Canada we currently list lawyers in ${caProvincesLive.map((p) => p.name).join(", ")}, by area of law and by city, and we add provinces and lawyers over time.`,
    listingBullets: [
      "Names, roles, office addresses and practice areas come from each firm's own website.",
      "Before a lawyer is added, we look them up on the provincial law society's public directory, and each profile shows the date of that check.",
      "Years of experience are shown only when the firm publishes the lawyer's call-to-the-bar year; otherwise the profile says \"Not published\".",
      NO_RATINGS,
    ],
    verify: [
      {
        heading: "1. Where listing details come from",
        paragraphs: [
          "Each lawyer's name, role, office address, practice areas and short description come from their profile on the firm's own website. Every profile links to that source page, marked \"Source profile\". We don't list virtual or appointment-only offices.",
        ],
      },
      {
        heading: "2. The law society check",
        paragraphs: [
          "Lawyers in Canada are licensed by the law society of their province. Before a lawyer is added, we look them up on that law society's public directory, and only list them if the entry is found. Each profile shows the date of the check.",
        ],
        links: caProvincesLive.map((p) => ({ label: `${p.name}: ${p.directoryLabel}`, href: p.directoryUrl })),
        after: [
          "A listing is a snapshot — lawyers move firms and their status can change — so please check the lawyer on the law society directory yourself before you hire them.",
        ],
      },
      {
        heading: "3. What we don't publish",
        bullets: [
          NO_RATINGS,
          "No \"best\" or \"top-rated\" badges. We don't rank lawyers by quality.",
          "Years of experience only when the firm publishes the call-to-the-bar year; otherwise \"Not published\".",
          NO_PAID,
        ],
      },
      {
        heading: "4. Legal facts on our pages",
        paragraphs: [
          `Legal facts on our Canadian pages — time limits, taxes, which court or tribunal handles what — are read on official provincial and federal sources. The province pages were last checked on ${CA_CONTENT_CHECKED}, and the land transfer tax calculator shows the date its rates were checked. If a figure can't be confirmed on an official source, we leave it out. Nothing on the site is legal advice.`,
        ],
      },
    ],
  },
};
