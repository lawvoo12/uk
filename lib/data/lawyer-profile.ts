import { STATIC_LAWYERS, type Regulator } from "@/lib/data/static-lawyers";
import { getCityBySlug } from "@/lib/seo/uk-cities";
import { getPracticeAreaBySlug } from "@/lib/validations/lead-intake";

export interface LawyerProfileDetail {
  id: string;
  slug: string;
  firmName: string;
  lawyerName: string;
  role: string;
  bio: string | null;
  regulator: Regulator;
  sraNumber: string | null;
  registerUrl: string;
  profileUrl: string;
  citySlug: string;
  cityName: string | null;
  addressLine1: string;
  ratingAverage: number | null;
  ratingCount: number;
  yearsExperience: number | null;
  experienceNote: string;
  practiceAreas: { name: string; slug: string }[];
}

export function getLawyerProfileById(id: string): LawyerProfileDetail | null {
  const lawyer = STATIC_LAWYERS.find((l) => l.id === id);
  if (!lawyer) return null;

  const city = getCityBySlug(lawyer.citySlug);
  const hasReviews = (lawyer.ratingCount ?? 0) > 0 && typeof lawyer.ratingAverage === "number";

  return {
    id: lawyer.id,
    slug: lawyer.id,
    firmName: lawyer.firmName,
    lawyerName: lawyer.lawyerName,
    role: lawyer.role,
    bio: lawyer.bio,
    regulator: lawyer.regulator,
    sraNumber: lawyer.sraNumber,
    registerUrl: lawyer.registerUrl,
    profileUrl: lawyer.profileUrl,
    citySlug: lawyer.citySlug,
    cityName: city?.name ?? null,
    addressLine1: lawyer.addressLine1,
    ratingAverage: hasReviews ? lawyer.ratingAverage! : null,
    ratingCount: hasReviews ? lawyer.ratingCount! : 0,
    yearsExperience: lawyer.yearsExperience,
    experienceNote: lawyer.experienceNote,
    practiceAreas: lawyer.practiceAreaSlugs.flatMap((slug) => {
      const area = getPracticeAreaBySlug(slug);
      return area ? [{ name: area.name, slug: area.slug }] : [];
    }),
  };
}
