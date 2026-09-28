import type { NextConfig } from "next";

// ============================================================================
// MULTI-ZONE DEPLOY: this whole app is the "/uk" zone of lawvoo.com.
// It's deployed as its own separate project (own repo, own Vercel project,
// own env vars) — completely independent from the US Lawvoo app at the
// domain root. Every route here already lives under /uk/... on purpose, so
// it can be mounted at lawvoo.com/uk/* without colliding with the US app's
// own routes at the same paths (e.g. its own /terms, /leads, etc.).
//
// To actually connect the two under one domain, add this to the US app's
// (the one that owns the domain root) next.config — NOT here:
//
//   async rewrites() {
//     return [
//       { source: "/uk", destination: "https://<this-uk-app>.vercel.app/uk" },
//       { source: "/uk/:path*", destination: "https://<this-uk-app>.vercel.app/uk/:path*" },
//     ];
//   }
//
// That's the standard Next.js "Multi Zones" pattern — see
// https://nextjs.org/docs/app/guides/multi-zones. Until that rewrite is
// added, this app is simply reachable at its own Vercel URL (e.g.
// https://lawvoo-uk.vercel.app/uk), which is exactly what testing/staging
// needs before the domain is wired up.
// ============================================================================
const nextConfig: NextConfig = {
  // Explicitly pins the project root instead of letting Turbopack guess it
  // by searching upward for a lockfile — fixes the "ignored package-lock.json
  // outside the current Git repository" warning when a stray lockfile exists
  // in a parent folder (e.g. C:\Users\sahab\Desktop\package-lock.json).
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        // Bare domain → the UK homepage, permanently, so Google indexes /uk.
        source: "/",
        destination: "/uk",
        permanent: true,
      },
      {
        // /solicitors/[practiceArea]/[city] was the original route for this
        // page; /uk/solicitors/[category]/[city] replaced it as the primary
        // scalable route (see app/uk/solicitors/[category]/[city]/page.tsx).
        // A 308 permanent redirect (not a deleted route returning 404)
        // preserves any inbound links/search rankings the old path earned
        // and consolidates SEO authority onto the new URL instead of
        // splitting it across two live routes serving the same content.
        source: "/solicitors/:category/:city",
        destination: "/uk/solicitors/:category/:city",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
