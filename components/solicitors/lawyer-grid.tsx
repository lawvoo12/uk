import type { LawyerListing } from "@/lib/data/lawyers";
import { LawyerCard } from "@/components/solicitors/lawyer-card";

export function LawyerGrid({
  lawyers,
  categoryName,
  categorySlug,
  cityName,
}: {
  lawyers: LawyerListing[];
  categoryName: string;
  categorySlug?: string;
  cityName: string;
}) {
  if (lawyers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#DCD8D0] bg-white p-8 text-center">
        <p className="font-medium text-[#10233D]">
          No {categoryName.toLowerCase()} solicitors listed in {cityName} yet
        </p>
        <p className="mt-1 text-sm text-[#5B6472]">
          Submit your case below and we&apos;ll reach out to solicitors covering this area on your behalf.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {lawyers.map((lawyer) => (
        <LawyerCard
          key={lawyer.id}
          lawyer={lawyer}
          contextLabel={`${categoryName} · ${cityName}`}
          categorySlug={categorySlug}
        />
      ))}
    </div>
  );
}
