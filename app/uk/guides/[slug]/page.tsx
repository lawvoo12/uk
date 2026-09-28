import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";

import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/data/blog-posts";
import { getPracticeAreaBySlug } from "@/lib/validations/lead-intake";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { BreadcrumbNav } from "@/components/solicitors/breadcrumb-nav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/uk/guides/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/uk/guides/${post.slug}`,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function GuidePostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const category = post.practiceAreaSlug ? getPracticeAreaBySlug(post.practiceAreaSlug) : undefined;
  const canonicalUrl = `${SITE_URL}/uk/guides/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/uk` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/uk/guides` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-2xl">
        <BreadcrumbNav
          items={[{ label: "Home", href: "/uk" }, { label: "Guides", href: "/uk/guides" }, { label: post.title }]}
        />

        {category && (
          <span className="mb-3 inline-block rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-[#5B6472]">
            {category.name}
          </span>
        )}
        <h1 className="font-serif text-3xl text-[#10233D] sm:text-4xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#A8A398]">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
          {post.readingTimeMinutes} min read · Updated{" "}
          {new Date(post.updatedAt ?? post.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="prose-content mt-8 flex flex-col gap-4 text-[#333B45]">
          {post.body.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="mt-4 font-serif text-xl text-[#10233D]">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={index} className="list-disc space-y-1.5 pl-5 text-[#5B6472]">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="leading-relaxed text-[#5B6472]">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-[#DCD8D0] bg-white p-5">
          <p className="text-sm text-[#5B6472]">
            Have a case in mind? Tell us about it and we&apos;ll put you in touch with a verified UK solicitor —
            free, no obligation.
          </p>
          <Link
            href="/uk/leads/new"
            className="mt-3 inline-flex rounded-lg bg-[#10233D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]"
          >
            Get in touch
          </Link>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[#A8A398]">
          This guide is for general information only and does not constitute legal advice. Always verify a
          solicitor&apos;s credentials on the{" "}
          <a
            href="https://www.sra.org.uk/consumers/register/"
            className="underline underline-offset-2 hover:text-[#5B6472]"
            target="_blank"
            rel="noopener noreferrer"
          >
            SRA&apos;s public register
          </a>{" "}
          before instructing them.
        </p>

        <p className="mt-4 text-sm">
          <Link href="/uk/guides" className="underline underline-offset-2 hover:text-[#10233D]">
            ← Back to all guides
          </Link>
        </p>
      </article>
    </main>
  );
}
