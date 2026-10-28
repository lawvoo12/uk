import type { Metadata } from "next";

import { NZ_SECTION_LIVE } from "@/lib/config";

// New Zealand section. The root layout (app/layout.tsx) supplies <html>, the
// navbar and the footer; the navbar/footer switch to New Zealand links on /nz URLs.
//
// Until NZ_SECTION_LIVE is true (lib/config.ts) every /nz page is noindex:
// the section is built but not yet proxied on lawvoo.com or linked from the
// other countries.
export const metadata: Metadata = {
  title: {
    default: "Lawvoo New Zealand",
    template: "%s | Lawvoo New Zealand",
  },
  description: "Find lawyers in New Zealand by area of law and city — free to use.",
  openGraph: { locale: "en_NZ", siteName: "Lawvoo" },
  ...(NZ_SECTION_LIVE ? {} : { robots: { index: false, follow: false } }),
};

export default function NewZealandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
