import type { Metadata } from "next";

import { TrustContactPage } from "@/components/trust/trust-pages";
import { TRUST } from "@/lib/seo/trust-content";

// Words: lib/seo/trust-content.ts. Layout: components/trust/trust-pages.tsx.
export const metadata: Metadata = {
  title: "Contact Lawvoo Canada",
  description: "How to contact Lawvoo about the Canada directory — general questions, corrections and listing updates. Lawvoo is a directory, not a law firm, and can't give legal advice.",
  alternates: { canonical: "/ca/contact" },
};

export default function CaContactPage() {
  return <TrustContactPage c={TRUST.ca} />;
}
