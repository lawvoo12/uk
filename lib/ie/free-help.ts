// ============================================================================
// Free and low-cost legal help in Ireland, for /ie/free-legal-help and the
// "Free help nearby" note on each town page.
// Checked 30 Sep 2026:
//   Legal Aid Board law centres: https://legalaidboard.ie/en/contact-us/find-a-law-centre/
//   FLAC: https://www.flac.ie/help/ (information line 01 906 10 10)
//   Citizens Information Phone Service: 0818 07 4000, Mon–Fri 9am–8pm
//     (https://www.citizensinformation.ie/en/about/contact-us/)
//   MABS helpline: 0818 07 2000 (https://www.mabs.ie/)
// Phone numbers and centres change — re-check them now and then.
// ============================================================================

export const LAW_CENTRE_FINDER = "https://legalaidboard.ie/en/contact-us/find-a-law-centre/";

/** Nearest Legal Aid Board law centre(s) for each of the 20 towns. */
export const NEAREST_LAW_CENTRE: Record<string, string> = {
  dublin: "several Dublin law centres, including Smithfield, Chancery Street, Dolphin House and Jervis Street",
  cork: "Law Centre (Popes Quay) and Law Centre (Lapps Quay), Cork",
  limerick: "Limerick Law and Family Mediation Centre",
  galway: "Law Centre (Francis Street) and Galway Law & Family Mediation Centre (Woodquay)",
  waterford: "Law Centre (Waterford)",
  drogheda: "Dundalk Law and Family Mediation Centre (the law centre for Co. Louth), or Law Centre (Navan) for Co. Meath",
  dundalk: "Dundalk Law and Family Mediation Centre",
  swords: "the north Dublin centres, such as Ballymun Law and Family Mediation Centre",
  navan: "Law Centre (Navan)",
  kilkenny: "Kilkenny Law and Family Mediation Centre",
  ennis: "Law Centre (Ennis)",
  carlow: "Kilkenny Law and Family Mediation Centre or Portlaoise Law and Family Mediation Centre (there's no law centre in Carlow)",
  tralee: "Law Centre (Tralee)",
  naas: "Law Centre (Newbridge), Co. Kildare",
  athlone: "Law Centre (Athlone)",
  sligo: "Sligo Law and Family Mediation Centre",
  letterkenny: "Letterkenny Law and Family Mediation Centre",
  wexford: "Law Centre (Wexford)",
  mullingar: "Law Centre (Athlone), or the Longford and Tullamore law centres",
  castlebar: "Castlebar Law and Family Mediation Centre",
};

export const FREE_HELP = [
  {
    name: "Legal Aid Board",
    href: "https://www.legalaidboard.ie/",
    phone: null as string | null,
    what: "Civil legal aid and advice through law centres around the country, mainly family law, but also some other civil cases and international protection. It's means-tested, and most people pay a contribution. It also runs a free Family Mediation Service.",
  },
  {
    name: "FLAC (Free Legal Advice Centres)",
    href: "https://www.flac.ie/help/",
    phone: "01 906 10 10",
    what: "A free telephone information and referral line, plus free legal advice appointments run with Citizens Information services. Good first stop if you can't afford a solicitor.",
  },
  {
    name: "Citizens Information",
    href: "https://www.citizensinformation.ie/",
    phone: "0818 07 4000 (Mon–Fri, 9am–8pm)",
    what: "Free, confidential information on your rights — employment, housing, social welfare, family, immigration and more — by phone, online, or at local Citizens Information Centres in every county.",
  },
  {
    name: "MABS (Money Advice and Budgeting Service)",
    href: "https://www.mabs.ie/",
    phone: "0818 07 2000",
    what: "Free money advice and help with problem debt, including mortgage arrears.",
  },
  {
    name: "Workplace Relations Commission",
    href: "https://www.workplacerelations.ie/",
    phone: null,
    what: "Information on employment rights and the body you complain to about most workplace problems — no fee and no solicitor needed.",
  },
  {
    name: "Injuries Resolution Board",
    href: "https://www.injuries.ie/",
    phone: null,
    what: "You can apply yourself for an assessment of most road, workplace and public liability injury claims, without a solicitor.",
  },
  {
    name: "Residential Tenancies Board (RTB)",
    href: "https://www.rtb.ie/",
    phone: null,
    what: "Resolves most disputes between tenants and landlords in private rented homes.",
  },
];
