import type { Metadata } from "next";

import { TrustVerifyPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "How We Check Listings (IE)",
  description: "How Lawvoo checks solicitors in Ireland on the regulator's register, where listing details come from, and how to report a mistake.",
  alternates: { canonical: "/ie/how-we-verify" },
};

export default function IeHowWeVerifyPage() {
  return <TrustVerifyPage c={TRUST.ie} />;
}
