import type { Metadata } from "next";

import { TrustContactPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "Contact Lawvoo Ireland",
  description: "How to contact Lawvoo about the Ireland directory — general questions, corrections and listing updates. Lawvoo is a directory, not a law firm, and can't give legal advice.",
  alternates: { canonical: "/ie/contact" },
};

export default function IeContactPage() {
  return <TrustContactPage c={TRUST.ie} />;
}
