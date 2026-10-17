import type { Metadata } from "next";

// Canada section. The root layout (app/layout.tsx) supplies <html>, the
// navbar and the footer; the navbar/footer switch to Canadian links on /ca URLs.
export const metadata: Metadata = {
  title: {
    default: "Lawvoo Canada",
    template: "%s | Lawvoo Canada",
  },
  description: "Find lawyers across Canada by area of law and city — free to use.",
  openGraph: { locale: "en_CA", siteName: "Lawvoo" },
};

export default function CanadaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
