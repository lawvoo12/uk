import type { Metadata } from "next";

import { TrustVerifyPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "How We Check Listings (UK)",
  description: "How Lawvoo checks solicitors in the UK on the regulator's register, where listing details come from, and how to report a mistake.",
  alternates: { canonical: "/uk/how-we-verify" },
};

export default function UkHowWeVerifyPage() {
  return <TrustVerifyPage c={TRUST.uk} />;
}
