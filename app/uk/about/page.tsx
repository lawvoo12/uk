import type { Metadata } from "next";

import { TrustAboutPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "About Lawvoo UK",
  description: "Lawvoo is a free directory of solicitors in the UK. Who runs it, how listings are chosen and checked, and how Lawvoo is paid for — no paid rankings, no made-up reviews.",
  alternates: { canonical: "/uk/about" },
};

export default function UkAboutPage() {
  return <TrustAboutPage c={TRUST.uk} />;
}
