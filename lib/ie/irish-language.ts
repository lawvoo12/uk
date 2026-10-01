// ============================================================================
// Solicitors who can work through Irish — from the Law Society of Ireland's
// Clár na Gaeilge (Irish Language Register), kept under section 40 of the
// Solicitors Act 1954 and section 2 of the Legal Practitioners (Irish
// Language) Act 2008.
//   Page:  https://www.lawsociety.ie/find-a-solicitor/clar-na-gaeilge/
//   PDF:   https://www.lawsociety.ie/globalassets/documents/findasolicitor/clar/clarnagaeilge-irishlanguageregister.pdf
// Entries below are copied from the register dated 13 March 2026 (304
// entries), for the towns Lawvoo covers outside Dublin and Cork. Only
// solicitors in private practice or at the Legal Aid Board are included
// (in-house company lawyers are left out). The Law Society updates the
// register monthly — re-check before relying on it.
// ============================================================================

export const CLAR_PAGE = "https://www.lawsociety.ie/find-a-solicitor/clar-na-gaeilge/";
export const CLAR_PDF =
  "https://www.lawsociety.ie/globalassets/documents/findasolicitor/clar/clarnagaeilge-irishlanguageregister.pdf";
export const CLAR_DATE = "13 March 2026";
export const CLAR_TOTAL = 304;

export interface ClarEntry {
  name: string;
  firm: string;
  address: string;
  citySlug: string;
}

export const CLAR_ENTRIES: ClarEntry[] = [
  { name: "Siobhan Folan", firm: "R.G. Emerson & Co., Solicitors", address: "13 Cross Street, Galway", citySlug: "galway" },
  { name: "Peter Keane", firm: "EP Keane & Company", address: "4th Floor Queensgate, Dock Road, Galway", citySlug: "galway" },
  { name: "John Martin", firm: "John F. Martin & Co.", address: "28 Woodquay, Galway", citySlug: "galway" },
  { name: "Rosemary Crowley", firm: "Swaine Solicitors", address: "14 Radharc na Farraige, Ballymoreen Road, Galway", citySlug: "galway" },
  { name: "Owen Swaine", firm: "Swaine Solicitors", address: "14 Radharc na Farraige, Ballymoreen Road, Galway", citySlug: "galway" },
  { name: "Laoise Ní Chonaill", firm: "Legal Aid Board, Law Centre (Galway)", address: "Galway", citySlug: "galway" },
  { name: "James MacGuill", firm: "MacGuill & Co., Solicitors", address: "5 Seatown, Dundalk, Co. Louth", citySlug: "dundalk" },
  { name: "Aoife O'Carroll", firm: "MacGuill & Co., Solicitors", address: "5 Seatown, Dundalk, Co. Louth", citySlug: "dundalk" },
  { name: "Karen Tess", firm: "Mannix & Co LLP", address: "12 Castle Street, Tralee, Co. Kerry", citySlug: "tralee" },
  { name: "Maeve Grealy", firm: "Tormeys Solicitors LLP", address: "Castle Street, Athlone, Co. Westmeath", citySlug: "athlone" },
  { name: "Edel Ryan", firm: "Michael Houlihan & Partners Solicitors", address: "9/10/11 Bindon Street, Ennis, Co. Clare", citySlug: "ennis" },
  { name: "Sorcha Ní Dhubhtaigh", firm: "Gibson & Associates", address: "LK House, Port House, Letterkenny, Co. Donegal", citySlug: "letterkenny" },
];
