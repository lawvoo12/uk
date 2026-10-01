import Link from "next/link";

import type { Country } from "@/lib/country";

const POPULAR_SEARCHES: { category: string; categoryName: string; city: string; cityName: string }[] = [
  { category: "immigration", categoryName: "Immigration", city: "london", cityName: "London" },
  { category: "family", categoryName: "Family", city: "manchester", cityName: "Manchester" },
  { category: "personal-injury", categoryName: "Personal Injury", city: "birmingham", cityName: "Birmingham" },
  { category: "employment", categoryName: "Employment", city: "leeds", cityName: "Leeds" },
  { category: "property", categoryName: "Property", city: "glasgow", cityName: "Glasgow" },
  { category: "wills-probate", categoryName: "Wills & Probate", city: "bristol", cityName: "Bristol" },
  { category: "immigration", categoryName: "Immigration", city: "birmingham", cityName: "Birmingham" },
  { category: "family", categoryName: "Family", city: "london", cityName: "London" },
];

const IE_POPULAR_SEARCHES: typeof POPULAR_SEARCHES = [
  { category: "family", categoryName: "Family", city: "dublin", cityName: "Dublin" },
  { category: "immigration", categoryName: "Immigration", city: "cork", cityName: "Cork" },
  { category: "property", categoryName: "Property", city: "galway", cityName: "Galway" },
  { category: "employment", categoryName: "Employment", city: "limerick", cityName: "Limerick" },
  { category: "wills-probate", categoryName: "Wills & Probate", city: "kilkenny", cityName: "Kilkenny" },
  { category: "family", categoryName: "Family", city: "waterford", cityName: "Waterford" },
  { category: "property", categoryName: "Property", city: "naas", cityName: "Naas" },
  { category: "wills-probate", categoryName: "Wills & Probate", city: "mullingar", cityName: "Mullingar" },
];

export function PopularSearches({ country = "uk" }: { country?: Country } = {}) {
  const searches = country === "ie" ? IE_POPULAR_SEARCHES : POPULAR_SEARCHES;
  return (
    <section aria-labelledby="popular-searches-heading" className="mx-auto max-w-5xl px-4 py-14">
      <h2 id="popular-searches-heading" className="text-center font-serif text-2xl text-[#10233D] sm:text-3xl">
        Popular searches
      </h2>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {searches.map((item) => (
          <Link
            key={`${item.category}-${item.city}`}
            href={`/${country}/solicitors/${item.category}/${item.city}`}
            className="rounded-full border border-[#DCD8D0] bg-white px-4 py-2 text-sm text-[#5B6472] transition-colors hover:border-[#B8A488] hover:text-[#10233D]"
          >
            {item.categoryName} solicitors in {item.cityName}
          </Link>
        ))}
      </div>
    </section>
  );
}
