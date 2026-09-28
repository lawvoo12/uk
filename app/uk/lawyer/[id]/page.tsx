import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ExternalLink, MapPin, ShieldCheck, Star } from "lucide-react";

import { getLawyerProfileById } from "@/lib/data/lawyer-profile";
import { STATIC_LAWYERS, REGULATOR_LABEL } from "@/lib/data/static-lawyers";
import { REGULATORS } from "@/lib/seo/regulators";
import { LISTINGS_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/site";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600;

export function generateStaticParams() {
  return STATIC_LAWYERS.map((lawyer) => ({ id: lawyer.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const lawyer = getLawyerProfileById(id);
  if (!lawyer) return {};

  const title = `${lawyer.lawyerName}, ${lawyer.firmName} — ${lawyer.cityName ?? "UK"} Solicitor`;
  const description =
    lawyer.bio ?? `${lawyer.lawyerName} is a solicitor at ${lawyer.firmName}${lawyer.cityName ? ` in ${lawyer.cityName}` : ""}.`;

  return {
    title,
    description,
    alternates: { canonical: `/uk/lawyer/${lawyer.id}` },
  };
}

export default async function LawyerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const lawyer = getLawyerProfileById(id);
  if (!lawyer) notFound();

  const primaryPracticeArea = lawyer.practiceAreas[0]?.slug;
  const regulator = REGULATORS[lawyer.regulator];
  // experienceNote looks like "22 (qualified 2004)" — show the bracketed basis.
  const experienceBasis = lawyer.experienceNote.match(/\((.+)\)/)?.[1] ?? null;

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {lawyer.cityName && (
          <p className="mb-4 text-sm text-[#5B6472]">
            <Link href={`/uk/locations/${lawyer.citySlug}`} className="underline underline-offset-2 hover:text-[#10233D]">
              ← All solicitors in {lawyer.cityName}
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

            <Link
              href={`/uk/leads/new?lawyer=${encodeURIComponent(lawyer.id)}${
                primaryPracticeArea ? `&category=${primaryPracticeArea}` : ""
              }`}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#B8863B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#A47730]"
            >
              Request a callback
            </Link>
          </div>

          <p className="mt-2 text-xs text-[#A8A398]">
            Requesting a callback sends your case details to us — it doesn&apos;t guarantee this specific firm will
            respond.
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
                    href={`/uk/solicitors/${area.slug}/${lawyer.citySlug}`}
                    className="flex items-center justify-between rounded-lg border border-[#DCD8D0] bg-[#FAF9F6] px-4 py-3 text-sm font-medium text-[#10233D] hover:border-[#B8A488]"
                  >
                    {area.name}
                    <span className="text-xs font-normal text-[#5B6472]">
                      in {lawyer.cityName} →
                    </span>
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
            {lawyer.sraNumber ? (
              <>
                Firm SRA number <span className="font-medium text-[#10233D]">{lawyer.sraNumber}</span>.{" "}
              </>
            ) : null}
            {lawyer.regulator !== "SRA" && <>This firm is regulated by the {regulator.name}. </>}
            You can independently check this firm on the{" "}
            <a
              href={lawyer.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[#10233D]"
            >
              {regulator.registerLabel}
            </a>{" "}
            before instructing them. Listings on this site are provided for information only and don&apos;t
            constitute a recommendation.
          </p>
        </section>
        {/* Not a partner + update/remove route */}
        <p className="mt-6 text-center text-xs leading-relaxed text-[#A8A398]">
          {lawyer.firmName} is listed from public professional information and isn&apos;t a Lawvoo partner.{" "}
          <a
            href={`mailto:${LISTINGS_EMAIL}?subject=${encodeURIComponent(`Listing request: ${lawyer.lawyerName}, ${lawyer.firmName}`)}&body=${encodeURIComponent(`Listing page: ${SITE_URL}/uk/lawyer/${lawyer.id}\n\nPlease remove / update this listing:\n`)}`}
            className="underline underline-offset-2 hover:text-[#5B6472]"
          >
            Is this you? Update or remove this listing
          </a>
          {" · "}
          <Link href="/uk/listings" className="underline underline-offset-2 hover:text-[#5B6472]">
            For solicitors
          </Link>
        </p>
      </div>
    </main>
  );
}
