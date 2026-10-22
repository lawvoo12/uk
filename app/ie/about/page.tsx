import type { Metadata } from "next";

import { TrustAboutPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "About Lawvoo Ireland",
  description: "Lawvoo is a free directory of solicitors in Ireland. Who runs it, how listings are chosen and checked, and how Lawvoo is paid for — no paid rankings, no made-up reviews.",
  alternates: { canonical: "/ie/about" },
};

export default function IeAboutPage() {
  return <TrustAboutPage c={TRUST.ie} />;
}
