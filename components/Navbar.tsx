"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Scale } from "lucide-react";

import { COUNTRY_BASE, countryFromPath } from "@/lib/country";

// No auth, no dashboard: the site shows solicitor listings and collects
// enquiries through a form. A client component only so it can tell from the
// URL whether you're on the UK (/uk), Ireland (/ie) or Canada (/ca) pages and
// show that country's links. The UK links are exactly what they were before.
const LINKS = {
  uk: [
    { href: "/uk/solicitors", label: "Browse solicitors" },
    { href: "/uk/locations", label: "Locations" },
    { href: "/uk/guides", label: "Guides" },
  ],
  ie: [
    { href: "/ie/solicitors", label: "Browse solicitors" },
    { href: "/ie/locations", label: "Locations" },
    { href: "/ie/guides", label: "Guides" },
  ],
  ca: [
    { href: "/ca/lawyers", label: "Browse lawyers" },
    { href: "/ca/locations", label: "Locations" },
  ],
  us: [
    { href: "/us/lawyers", label: "Browse lawyers" },
    { href: "/us/locations", label: "Locations" },
    { href: "/us/guides", label: "Guides" },
  ],
} as const;

const BADGE = { uk: null, ie: "Ireland", ca: "Canada", us: "US" } as const;

export function Navbar() {
  const country = countryFromPath(usePathname());
  const home = COUNTRY_BASE[country];
  const findHref = `${home}/leads/new`;
  const links = LINKS[country];
  const findLabel = country === "ca" || country === "us" ? "Find a lawyer" : "Find a solicitor";

  return (
    <header className="border-b border-[#DCD8D0] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href={home} className="flex items-center gap-2 font-serif text-lg text-[#10233D]">
          <Scale className="h-5 w-5 text-[#B8863B]" strokeWidth={1.75} />
          Lawvoo
          {BADGE[country] && <span className="font-sans text-xs font-medium uppercase tracking-wide text-[#B8863B]">{BADGE[country]}</span>}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#5B6472] md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#10233D]">
              {link.label}
            </Link>
          ))}
          <Link
            href={findHref}
            className="rounded-lg bg-[#10233D] px-4 py-2 text-white transition-colors hover:bg-[#1C3A5E]"
          >
            {findLabel}
          </Link>
        </nav>

        {/* Mobile nav — native <details> disclosure */}
        <details className="relative md:hidden">
          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-[#DCD8D0] marker:content-none">
            <Menu className="h-5 w-5 text-[#10233D]" strokeWidth={1.75} />
          </summary>
          <nav
            aria-label="Primary"
            className="absolute right-0 top-11 z-10 flex w-52 flex-col gap-1 rounded-xl border border-[#DCD8D0] bg-white p-2 text-sm font-medium text-[#5B6472] shadow-lg"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 hover:bg-[#F8F7F4] hover:text-[#10233D]">
                {link.label}
              </Link>
            ))}
            <Link href={findHref} className="rounded-lg px-3 py-2 hover:bg-[#F8F7F4] hover:text-[#10233D]">
              {findLabel}
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
