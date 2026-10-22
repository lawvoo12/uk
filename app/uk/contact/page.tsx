import type { Metadata } from "next";

import { TrustContactPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "Contact Lawvoo UK",
  description: "How to contact Lawvoo about the UK directory — general questions, corrections and listing updates. Lawvoo is a directory, not a law firm, and can't give legal advice.",
  alternates: { canonical: "/uk/contact" },
};

export default function UkContactPage() {
  return <TrustContactPage c={TRUST.uk} />;
}
