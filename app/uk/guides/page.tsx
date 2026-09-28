import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { getPracticeAreaBySlug } from "@/lib/validations/lead-intake";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Guides & Advice",
  description:
    "Free, practical guides on UK legal processes — choosing a solicitor, what to expect from conveyancing, immigration timelines, and more.",
  alternates: { canonical: "/uk/guides" },
};

export default function GuidesIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/uk/guides/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">Guides & Advice</h1>
        <p className="mt-3 text-[#5B6472]">
          Free, practical guides to help you understand UK legal processes before you speak to a solicitor.
        </p>

        <div className="mt-10 flex flex-col gap-5">
          {posts.map((post) => {
            const category = post.practiceAreaSlug ? getPracticeAreaBySlug(post.practiceAreaSlug) : undefined;
            return (
              <Link
                key={post.slug}
                href={`/uk/guides/${post.slug}`}
                className="rounded-xl border border-[#DCD8D0] bg-white p-5 transition-shadow hover:shadow-md"
              >
                {category && (
                  <span className="mb-2 inline-block rounded-full bg-[#F8F7F4] px-2.5 py-0.5 text-xs font-medium text-[#5B6472]">
                    {category.name}
                  </span>
                )}
                <h2 className="font-serif text-xl text-[#10233D]">{post.title}</h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">{post.description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#A8A398]">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {post.readingTimeMinutes} min read
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
