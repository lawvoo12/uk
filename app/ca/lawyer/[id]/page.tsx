import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ExternalLink, MapPin, ShieldCheck, Star } from "lucide-react";

import { getLawyerProfileById } from "@/lib/data/lawyer-profile";
import { REGULATOR_LABEL } from "@/lib/data/static-lawyers";
import { CA_LAWYERS } from "@/lib/ca/lawyers";
import { getCaProvince } from "@/lib/ca/provinces";
import { caAreaPath } from "@/lib/ca/practice-areas";
import { getFirmWebsite } from "@/lib/data/firm-website";
import { CA_LEADS_ENABLED, LISTINGS_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return CA_LAWYERS.map((lawyer) => ({ id: lawyer.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const lawyer = getLawyerProfileById(id, "ca");
  if (!lawyer) return {};

  const title = `${lawyer.lawyerName}, ${lawyer.firmName} — Lawyer in ${lawyer.cityName ?? "Canada"}`;
  const description =
    lawyer.bio ?? `${lawyer.lawyerName} is a lawyer at ${lawyer.firmName}${lawyer.cityName ? ` in ${lawyer.cityName}` : ""}.`;

  return {
    title,
    description,
    alternates: { canonical: `/ca/lawyer/${lawyer.id}` },
    openGraph: { title, description, url: `/ca/lawyer/${lawyer.id}`, siteName: "Lawvoo", locale: "en_CA", type: "profile" },
  };
}

export default async function CaLawyerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const lawyer = getLawyerProfileById(id, "ca");
  const entry = CA_LAWYERS.find((l) => l.id === id);
  if (!lawyer || !entry) notFound();

  const province = getCaProvince(entry.province);
  // Canadian enquiries can't be about personal injury: pre-select the lawyer's
  // own area, or the first non-PI area their firm covers.
  const primaryPracticeArea =
    lawyer.primaryPracticeArea !== "personal-injury"
      ? lawyer.primaryPracticeArea
      : lawyer.practiceAreas.find((a) => a.slug !== "personal-injury")?.slug;
  const piOnly = lawyer.practiceAreas.every((a) => a.slug === "personal-injury");
  // experienceNote looks like "22 (called to the bar 2004)" — show the bracketed basis.
  const experienceBasis = lawyer.experienceNote.match(/\((.+)\)/)?.[1] ?? null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/ca` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/ca/locations` },
      ...(lawyer.cityName
        ? [{ "@type": "ListItem", position: 3, name: lawyer.cityName, item: `${SITE_URL}/ca/locations/${lawyer.citySlug}` }]
        : []),
      { "@type": "ListItem", position: lawyer.cityName ? 4 : 3, name: lawyer.lawyerName, item: `${SITE_URL}/ca/lawyer/${lawyer.id}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-3xl">
        {lawyer.cityName && (
          <p className="mb-4 text-sm text-[#5B6472]">
            <Link href={`/ca/locations/${lawyer.citySlug}`} className="underline underline-offset-2 hover:text-[#10233D]">
              ← All lawyers in {lawyer.cityName}
            </Link>
          </p>
        )}

        {/* Header */}
        <div className="rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#10233D] font-serif text-xl text-white"
                aria-hidden
              >
                {lawyer.lawyerName.charAt(0)}
              </div>
              <div>
                <h1 className="font-serif text-2xl text-[#10233D] sm:text-3xl">{lawyer.lawyerName}</h1>
                <p className="mt-1 text-sm text-[#5B6472]">
                  {lawyer.role} · <span className="font-medium text-[#10233D]">{lawyer.firmName}</span>
                </p>
                <p className="mt-1 flex items-start gap-1 text-sm text-[#5B6472]">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  {lawyer.addressLine1}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF3EC] px-2.5 py-1 text-xs font-medium text-[#2F6844]">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {REGULATOR_LABEL[lawyer.regulator]}
                  </span>
                  {lawyer.ratingAverage !== null && (
                    <span className="flex items-center gap-1 text-sm text-[#10233D]">
                      <Star className="h-3.5 w-3.5 fill-[#B8863B] text-[#B8863B]" />
                      <span className="font-medium">{lawyer.ratingAverage.toFixed(1)}</span>
                      <span className="text-[#A8A398]">({lawyer.ratingCount} reviews)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              {!piOnly && (
                <Link
                  href={`/ca/leads/new?lawyer=${encodeURIComponent(lawyer.id)}${
                    primaryPracticeArea ? `&category=${primaryPracticeArea}` : ""
                  }`}
                  className="inline-flex items-center justify-center rounded-lg bg-[#B8863B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#A47730]"
                >
                  Request a callback
                </Link>
              )}
              {/* Personal-injury-only listings (no enquiry form) link to the firm's website. */}
              {piOnly && (
                <a
                  href={getFirmWebsite(lawyer)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#DCD8D0] px-5 py-2.5 text-sm font-medium text-[#10233D] transition-colors hover:border-[#B8A488]"
                >
                  Visit firm website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          <p className="mt-2 text-xs text-[#A8A398]">
            {piOnly
              ? "For personal injury, contact the firm directly."
              : CA_LEADS_ENABLED
                ? "Requesting a callback sends your details to Lawvoo — it doesn't guarantee this firm will respond."
                : "Online enquiries aren't open in Canada yet — the next page links to the firm's own website."}
          </p>
        </div>

        {/* Bio + experience */}
        <section className="mt-6 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl text-[#10233D]">About {lawyer.lawyerName}</h2>
          {lawyer.bio && <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{lawyer.bio}</p>}
          <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3">
              <dt className="text-xs text-[#A8A398]">Experience</dt>
              <dd className="mt-0.5 font-medium text-[#10233D]">
                {lawyer.yearsExperience ? `${lawyer.yearsExperience}+ years` : "Not published"}
                {experienceBasis && <span className="block text-xs font-normal text-[#5B6472]">{experienceBasis}</span>}
              </dd>
            </div>
            <div className="rounded-lg border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3">
              <dt className="text-xs text-[#A8A398]">Firm</dt>
              <dd className="mt-0.5 font-medium text-[#10233D]">{lawyer.firmName}</dd>
            </div>
          </dl>
          <a
            href={lawyer.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-xs text-[#5B6472] underline underline-offset-2 hover:text-[#10233D]"
          >
            Source profile <ExternalLink className="h-3 w-3" />
          </a>
        </section>

        {/* Practice areas */}
        {lawyer.practiceAreas.length > 0 && (
          <section className="mt-6 rounded-2xl border border-[#DCD8D0] bg-white p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[#10233D]">Practice areas at {lawyer.firmName}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lawyer.practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={caAreaPath(area.slug, lawyer.citySlug)}
                    className="flex items-center justify-between rounded-lg border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3 text-sm font-medium text-[#10233D] hover:border-[#B8A488]"
                  >
                    {area.name}
                    <span className="text-xs font-normal text-[#5B6472]">in {lawyer.cityName} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Regulator note */}
        <section className="mt-6 flex items-start gap-3 rounded-2xl border border-[#DCD8D0] bg-white p-6 text-sm text-[#5B6472] sm:p-8">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#B8863B]" strokeWidth={1.5} />
          <p>
            Lawyers in {province.name} are licensed by the {province.regulatorName}, which also deals with complaints
            about them. We checked {lawyer.lawyerName} in the law society&apos;s public directory on{" "}
            {entry.registerChecked}. People move firms, so check again in the{" "}
            <a href={lawyer.registerUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#10233D]">
              {province.directoryLabel}
            </a>{" "}
            before hiring them. Listings on this site are provided for information only and aren&apos;t a
            recommendation.
          </p>
        </section>

        {/* Not a partner + update/remove route */}
        <p className="mt-6 text-center text-xs leading-relaxed text-[#A8A398]">
          {lawyer.firmName} is listed from public professional information, isn&apos;t a Lawvoo partner and hasn&apos;t
          paid to appear.{" "}
          <a
            href={`mailto:${LISTINGS_EMAIL}?subject=${encodeURIComponent(`Listing request: ${lawyer.lawyerName}, ${lawyer.firmName}`)}&body=${encodeURIComponent(`Listing page: ${SITE_URL}/ca/lawyer/${lawyer.id}\n\nPlease remove / update this listing:\n`)}`}
            className="underline underline-offset-2 hover:text-[#5B6472]"
          >
            Is this you? Update or remove this listing
          </a>
          {" · "}
          <Link href="/ca/listings" className="underline underline-offset-2 hover:text-[#5B6472]">
            For lawyers
          </Link>
        </p>
      </div>
    </main>
  );
}
