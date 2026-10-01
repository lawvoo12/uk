import type { Metadata } from "next";

// Ireland section. The root layout (app/layout.tsx) supplies <html>, the
// navbar and the footer; the navbar/footer switch to Irish links on /ie URLs.
export const metadata: Metadata = {
  title: {
    default: "Lawvoo Ireland",
    template: "%s | Lawvoo Ireland",
  },
  description: "Find solicitors across Ireland by area of law and town — free to use.",
  openGraph: { locale: "en_IE", siteName: "Lawvoo" },
};

export default function IrelandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
