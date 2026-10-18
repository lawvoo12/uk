import type { Metadata } from "next";

import { US_SECTION_LIVE } from "@/lib/config";

// United States section. The root layout (app/layout.tsx) supplies <html>, the
// navbar and the footer; the navbar/footer switch to US links on /us URLs.
export const metadata: Metadata = {
  title: {
    default: "Lawvoo US",
    template: "%s | Lawvoo US",
  },
  description: "Find lawyers in the United States by area of law and city — free to use.",
  openGraph: { locale: "en_US", siteName: "Lawvoo" },
  // Not live yet (lib/config.ts): keep every /us page out of search results.
  ...(US_SECTION_LIVE ? {} : { robots: { index: false, follow: true } }),
};

export default function UsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
