import type { StaticLawyer } from "@/lib/data/static-lawyers";

// profileUrl usually points at the firm's own site. Where it points at a
// directory or news site instead, this map gives the firm's homepage.
const FIRM_SITE_OVERRIDES: Record<string, string> = {
  "brighton-and-hove-joanna-potbury": "https://www.dmhstallard.com/",
  "bradford-kanika-sohpal": "https://www.schofieldsweeney.co.uk/",
  "edinburgh-elaine-motion": "https://www.balfour-manson.co.uk/",
  "derby-melanie-bridgen": "https://www.nelsonslaw.co.uk/",
  "newport-leah-thomas": "https://www.hardingevans.com/",
  "norwich-dan-chapman": "https://www.leathesprior.co.uk/",
  "cambridge-carmel-brown": "https://www.irwinmitchell.com/",
  "aberdeen-ruth-aberdein": "https://www.acandco.com/",
  "portsmouth-stephanie-bellchambers": "https://www.biscoes-law.co.uk/",
  "exeter-anna-garde-evans": "https://www.stephens-scown.co.uk/",
  "lisburn-peter-graham": "https://mgmsolicitors.com/",
  "londonderry-robert-andrew-lyttle": "https://dickson-mcnulty.co.uk/",
};

/** The firm's own website (homepage), for "contact the firm directly" links. */
export function getFirmWebsite(lawyer: Pick<StaticLawyer, "id" | "profileUrl">): string {
  if (FIRM_SITE_OVERRIDES[lawyer.id]) return FIRM_SITE_OVERRIDES[lawyer.id];
  try {
    return `${new URL(lawyer.profileUrl).origin}/`;
  } catch {
    return lawyer.profileUrl;
  }
}
