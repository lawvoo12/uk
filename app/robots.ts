import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";

// Served at /robots.txt. Lets search engines crawl the whole site except the
// API routes, and points them to the sitemap.
// (If this app is ever mounted under another app's domain as the /uk zone,
// that app's robots.txt must list this sitemap instead.)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/uk/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
