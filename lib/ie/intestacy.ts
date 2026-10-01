// ============================================================================
// Who inherits if someone dies without a will in Ireland (intestacy),
// under Part VI of the Succession Act 1965 (civil partners: s.67A, added by
// the Civil Partnership Act 2010). Checked 30 Sep 2026 against Citizens
// Information, "What happens to a deceased person's money and possessions?":
// https://www.citizensinformation.ie/en/death/the-deceaseds-estate/what-happens-the-deceaseds-estate/
//
//  - spouse/civil partner, no children  → spouse takes everything
//  - spouse/civil partner and children  → spouse 2/3, children share 1/3
//  - children only                      → children share equally
//  - parents (no spouse/children)       → parents equally, or all to one
//  - brothers and sisters               → equally; a deceased sibling's
//                                         children take that sibling's share
//  - nieces and nephews only            → equally
//  - otherwise nearest relatives equally, and if none, the State
// A child who died before the deceased, leaving children, is a "branch":
// that child's share passes to their own children.
// ============================================================================

export interface IntestacyInput {
  /** Net estate after debts, funeral and administration costs. */
  estate: number;
  spouse: boolean;
  childrenAlive: number;
  /** Children who died before the deceased but left children of their own. */
  childrenDeceasedWithIssue: number;
  parentsAlive: 0 | 1 | 2;
  siblingsAlive: number;
  /** Brothers/sisters who died before the deceased but left children. */
  siblingsDeceasedWithIssue: number;
}

export interface IntestacyShare {
  who: string;
  fraction: string;
  amount: number | null;
}

export interface IntestacyResult {
  shares: IntestacyShare[];
  notes: string[];
}

const pct = (n: number, d: number) => (d === 1 ? "all" : n === 1 ? `1/${d}` : `${n}/${d}`);

export function calculateIntestacy(input: IntestacyInput): IntestacyResult {
  const estate = Math.max(0, Math.floor(input.estate));
  const shares: IntestacyShare[] = [];
  const notes: string[] = [];
  const kids = Math.max(0, Math.floor(input.childrenAlive));
  const kidBranches = Math.max(0, Math.floor(input.childrenDeceasedWithIssue));
  const sibs = Math.max(0, Math.floor(input.siblingsAlive));
  const sibBranches = Math.max(0, Math.floor(input.siblingsDeceasedWithIssue));
  const hasIssue = kids + kidBranches > 0;

  const issueShares = (pot: number, potLabel: string, denominatorOfPot: number) => {
    if (kids > 0) {
      const branches = kids + kidBranches;
      for (let i = 0; i < kids; i++) {
        shares.push({
          who: `Child ${i + 1}`,
          fraction: denominatorOfPot === 1 ? pct(1, branches) : `1/${branches} of ${potLabel}`,
          amount: Math.floor(pot / branches),
        });
      }
      for (let i = 0; i < kidBranches; i++) {
        shares.push({
          who: `Children of deceased child ${i + 1} (shared equally between them)`,
          fraction: denominatorOfPot === 1 ? pct(1, branches) : `1/${branches} of ${potLabel}`,
          amount: Math.floor(pot / branches),
        });
      }
    } else {
      shares.push({ who: "All grandchildren, in equal shares", fraction: potLabel, amount: pot });
      notes.push("When none of the children are alive, the grandchildren share equally, whichever child they descend from.");
    }
  };

  if (input.spouse && !hasIssue) {
    shares.push({ who: "Spouse or civil partner", fraction: "all", amount: estate });
  } else if (input.spouse && hasIssue) {
    const spouseShare = Math.floor((estate * 2) / 3);
    shares.push({ who: "Spouse or civil partner", fraction: "2/3", amount: spouseShare });
    issueShares(estate - spouseShare, "1/3", 3);
  } else if (hasIssue) {
    issueShares(estate, "all", 1);
  } else if (input.parentsAlive > 0) {
    if (input.parentsAlive === 2) {
      shares.push({ who: "Parent 1", fraction: "1/2", amount: Math.floor(estate / 2) });
      shares.push({ who: "Parent 2", fraction: "1/2", amount: Math.floor(estate / 2) });
    } else {
      shares.push({ who: "Surviving parent", fraction: "all", amount: estate });
    }
  } else if (sibs > 0) {
    const branches = sibs + sibBranches;
    for (let i = 0; i < sibs; i++) {
      shares.push({ who: `Brother or sister ${i + 1}`, fraction: pct(1, branches), amount: Math.floor(estate / branches) });
    }
    for (let i = 0; i < sibBranches; i++) {
      shares.push({
        who: `Children of deceased brother/sister ${i + 1} (shared equally between them)`,
        fraction: pct(1, branches),
        amount: Math.floor(estate / branches),
      });
    }
  } else if (sibBranches > 0) {
    shares.push({ who: "All nieces and nephews, in equal shares", fraction: "all", amount: estate });
    notes.push("With no brothers or sisters alive, nieces and nephews share equally.");
  } else {
    shares.push({ who: "Nearest relatives of equal degree (e.g. aunts, uncles, cousins)", fraction: "all", amount: null });
    notes.push("If there are no relatives at all, the estate passes to the State. A solicitor will need to trace the next of kin.");
  }

  notes.push(
    "Cohabitants have no automatic share, but a qualified cohabitant can apply to court for provision from the estate (Cohabitants Act 2010) — time limits are short.",
    "A divorced former spouse has no automatic share. Debts, funeral and administration costs come out before anything is shared.",
    "The person who applies for the grant (usually the next of kin) needs letters of administration from the Probate Office or a District Probate Registry."
  );
  return { shares, notes };
}
