import type { Metadata } from "next";

import { TrustContactPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "Contact Lawvoo New Zealand",
  description: "How to contact Lawvoo about the New Zealand directory — general questions, corrections and listing updates. Lawvoo is a directory, not a law firm, and can't give legal advice.",
  alternates: { canonical: "/nz/contact" },
};

export default function NzContactPage() {
  return <TrustContactPage c={TRUST.nz} />;
}
