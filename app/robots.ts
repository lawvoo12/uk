import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";

// Served at /robots.txt (only on the vercel.app address — lawvoo.com/robots.txt
// belongs to the Netlify site). Lets search engines crawl everything except the
// API routes, and points them to the UK and Ireland sitemaps.
// (If this app is ever mounted under another app's domain as the /uk zone,
// that app's robots.txt must list this sitemap instead.)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/uk/api/", "/ie/api/"] },
    sitemap: [`${SITE_URL}/uk/sitemap.xml`, `${SITE_URL}/ie/sitemap.xml`],
    host: SITE_URL,
  };
}
