"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale } from "lucide-react";

import { PRACTICE_AREAS } from "@/lib/validations/lead-intake";
import { IE_TOOLS, TOOLS } from "@/lib/tools";
import { countryFromPath } from "@/lib/country";

// A client component only so it can read the URL and show UK (/uk) or
// Ireland (/ie) links. The UK footer is exactly what it was before.

const POPULAR_CITIES = [
  { slug: "london", name: "London" },
  { slug: "manchester", name: "Manchester" },
  { slug: "birmingham", name: "Birmingham" },
  { slug: "leeds", name: "Leeds" },
  { slug: "glasgow", name: "Glasgow" },
  { slug: "bristol", name: "Bristol" },
];

const IE_POPULAR_CITIES = [
  { slug: "dublin", name: "Dublin" },
  { slug: "cork", name: "Cork" },
  { slug: "limerick", name: "Limerick" },
  { slug: "galway", name: "Galway" },
  { slug: "waterford", name: "Waterford" },
  { slug: "kilkenny", name: "Kilkenny" },
];

export function Footer() {
  const country = countryFromPath(usePathname());
  return country === "ie" ? <IrelandFooter /> : <UkFooter />;
}

function UkFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#DCD8D0] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/uk" className="flex items-center gap-2 font-serif text-lg text-[#10233D]">
              <Scale className="h-5 w-5 text-[#B8863B]" strokeWidth={1.75} />
              Lawvoo
            </Link>
            <p className="mt-3 text-sm text-[#5B6472]">
              Compare regulated UK solicitors and get in touch about your case, free.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Practice areas</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              {PRACTICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link href={`/uk/solicitors/${area.slug}`} className="hover:text-[#10233D]">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Popular cities</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              {POPULAR_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link href={`/uk/locations/${city.slug}`} className="hover:text-[#10233D]">
                    Solicitors in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Free tools</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              {TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="hover:text-[#10233D]">
                    {tool.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/uk/tools" className="hover:text-[#10233D]">
                  All tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              <li>
                <Link href="/uk/leads/new" className="hover:text-[#10233D]">
                  Find a solicitor
                </Link>
              </li>
              <li>
                <Link href="/uk/locations" className="hover:text-[#10233D]">
                  All locations
                </Link>
              </li>
              <li>
                <Link href="/uk/guides" className="hover:text-[#10233D]">
                  Guides & advice
                </Link>
              </li>
              <li>
                <Link href="/uk/listings" className="hover:text-[#10233D]">
                  For solicitors: update or remove a listing
                </Link>
              </li>
              <li>
                <Link href="/ie" className="hover:text-[#10233D]">
                  Lawvoo Ireland →
                </Link>
              </li>
              <li>
                <Link href="/uk/terms" className="hover:text-[#10233D]">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/uk/privacy" className="hover:text-[#10233D]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://www.sra.org.uk/consumers/register/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10233D]"
                >
                  SRA public register ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#DCD8D0] pt-6 text-xs text-[#A8A398]">
          <p>
            © {year} Lawvoo UK. We are an introducer platform, not a law firm — we don&apos;t provide legal
            advice, and using this site doesn&apos;t create a solicitor-client relationship with us.
          </p>
        </div>
      </div>
    </footer>
  );
}

function IrelandFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#DCD8D0] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/ie" className="flex items-center gap-2 font-serif text-lg text-[#10233D]">
              <Scale className="h-5 w-5 text-[#B8863B]" strokeWidth={1.75} />
              Lawvoo Ireland
            </Link>
            <p className="mt-3 text-sm text-[#5B6472]">
              Find solicitors across Ireland by area of law and town — free to use.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Practice areas</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              {PRACTICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link href={`/ie/solicitors/${area.slug}`} className="hover:text-[#10233D]">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Popular towns</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              {IE_POPULAR_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link href={`/ie/locations/${city.slug}`} className="hover:text-[#10233D]">
                    Solicitors in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Free tools</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              {IE_TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="hover:text-[#10233D]">
                    {tool.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ie/tools" className="hover:text-[#10233D]">
                  All tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#10233D]">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5B6472]">
              <li>
                <Link href="/ie/leads/new" className="hover:text-[#10233D]">
                  Find a solicitor
                </Link>
              </li>
              <li>
                <Link href="/ie/locations" className="hover:text-[#10233D]">
                  All locations
                </Link>
              </li>
              <li>
                <Link href="/ie/guides" className="hover:text-[#10233D]">
                  Guides to Irish law
                </Link>
              </li>
              <li>
                <Link href="/ie/free-legal-help" className="hover:text-[#10233D]">
                  Free legal help
                </Link>
              </li>
              <li>
                <Link href="/ie/irish-language-solicitors" className="hover:text-[#10233D]">
                  Solicitors who work through Irish
                </Link>
              </li>
              <li>
                <Link href="/ie/listings" className="hover:text-[#10233D]">
                  For solicitors: update or remove a listing
                </Link>
              </li>
              <li>
                <Link href="/ie/terms" className="hover:text-[#10233D]">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/ie/privacy" className="hover:text-[#10233D]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://www.lawsociety.ie/find-a-solicitor/Solicitor-Firm-Search/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10233D]"
                >
                  Law Society of Ireland register ↗
                </a>
              </li>
              <li>
                <Link href="/uk" className="hover:text-[#10233D]">
                  Lawvoo UK →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#DCD8D0] pt-6 text-xs text-[#A8A398]">
          <p>
            © {year} Lawvoo Ireland. We are a directory, not a law firm — we don&apos;t provide legal advice, and
            using this site doesn&apos;t create a solicitor-client relationship with us.
          </p>
        </div>
      </div>
    </footer>
  );
}
