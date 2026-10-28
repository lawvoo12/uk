import type { Metadata } from "next";

import { TrustVerifyPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "How We Check Listings (NZ)",
  description: "How Lawvoo checks lawyers in New Zealand on the regulator's register, where listing details come from, and how to report a mistake.",
  alternates: { canonical: "/nz/how-we-verify" },
};

export default function NzHowWeVerifyPage() {
  return <TrustVerifyPage c={TRUST.nz} />;
}
