"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import {
  resolveCaSearchDestination,
  resolveIeSearchDestination,
  resolveSearchDestination,
  resolveUsSearchDestination,
} from "@/lib/actions/search";
import { CA_PRACTICE_AREAS } from "@/lib/ca/practice-areas";
import { US_PRACTICE_AREAS } from "@/lib/us/practice-areas";
import type { Country } from "@/lib/country";

export function HeroSearch({ country = "uk" }: { country?: Country } = {}) {
  const isIe = country === "ie";
  const isCa = country === "ca";
  const isUs = country === "us";
  // Canada and the US have their own area names ("Real Estate", "Wills & Estates", "Estate Planning & Probate").
  const areas: readonly { slug: string; name: string }[] = isCa ? CA_PRACTICE_AREAS : isUs ? US_PRACTICE_AREAS : PRACTICE_AREAS;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState<string>(PRACTICE_AREAS[0].slug);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState<{ text: string; fallbackUrl?: string } | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const result = isCa
        ? await resolveCaSearchDestination(category, location)
        : isUs
          ? await resolveUsSearchDestination(category, location)
          : isIe
          ? await resolveIeSearchDestination(category, location)
          : await resolveSearchDestination(category, location);
      if (result.status === "found") {
        router.push(result.url);
      } else if (result.status === "unsupported-area") {
        setMessage({ text: result.message, fallbackUrl: result.fallbackUrl });
      } else {
        setMessage({ text: result.message });
      }
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-[#DCD8D0] bg-white p-3 shadow-sm sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="hero-category">
          Practice area
        </label>
        <select
          id="hero-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-lg border border-[#DCD8D0] bg-white px-3 text-sm text-[#10233D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863B] sm:w-56"
        >
          {areas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="hero-location">
          {isCa ? "City or postal code" : isUs ? "City or ZIP code" : isIe ? "Town or Eircode" : "City or UK postcode"}
        </label>
        <input
          id="hero-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={
            isCa
              ? "City or postal code, e.g. Toronto or M5H"
              : isUs
                ? "City or ZIP code, e.g. Birmingham or 35203"
                : isIe
                ? "Town or Eircode, e.g. Cork or D02"
                : "City or postcode, e.g. Manchester or SW1A 1AA"
          }
          className="h-11 flex-1 rounded-lg border border-[#DCD8D0] bg-white px-3 text-sm text-[#10233D] placeholder:text-[#A8A398] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863B]"
        />

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#10233D] px-5 text-sm font-medium text-white transition-colors hover:bg-[#1C3A5E]",
            isPending && "opacity-70"
          )}
        >
          <Search className="h-4 w-4" strokeWidth={2} />
          {isPending ? "Searching…" : isCa || isUs ? "Find a lawyer" : "Find a solicitor"}
        </button>
      </form>

      {message && (
        <p role="status" className="mt-3 text-center text-sm text-[#5B6472]">
          {message.text}{" "}
          {message.fallbackUrl && (
            <a href={message.fallbackUrl} className="font-medium text-[#B8863B] underline underline-offset-2">
              Submit your case instead
            </a>
          )}
        </p>
      )}
    </div>
  );
}
