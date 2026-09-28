import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import { SITE_URL } from "@/lib/seo/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export const metadata: Metadata = {
  // Makes canonical and social-share URLs absolute on your real domain
  // (set NEXT_PUBLIC_SITE_URL in Vercel) instead of the vercel.app address.
  metadataBase: new URL(SITE_URL),
  // Google Search Console "HTML tag" verification — paste only the content="..." value.
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
  title: {
    default: "Lawvoo UK",
    template: "%s | Lawvoo UK",
  },
  description: "Compare regulated UK solicitors and get in touch about your case, free.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
