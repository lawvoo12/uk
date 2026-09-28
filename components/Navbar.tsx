import Link from "next/link";
import { Menu, Scale } from "lucide-react";

// A plain Server Component now — no auth check, no dashboard link, no
// wallet badge. Simplified deliberately: this site collects leads via a
// form (/leads/new) and shows solicitor listings for browsing; there's no
// lawyer account system to be signed in to.
export function Navbar() {
  return (
    <header className="border-b border-[#DCD8D0] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/uk" className="flex items-center gap-2 font-serif text-lg text-[#10233D]">
          <Scale className="h-5 w-5 text-[#B8863B]" strokeWidth={1.75} />
          Lawvoo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#5B6472] md:flex" aria-label="Primary">
          <Link href="/uk/solicitors" className="hover:text-[#10233D]">
            Browse solicitors
          </Link>
          <Link href="/uk/locations" className="hover:text-[#10233D]">
            Locations
          </Link>
          <Link href="/uk/guides" className="hover:text-[#10233D]">
            Guides
          </Link>
          <Link
            href="/uk/leads/new"
            className="rounded-lg bg-[#10233D] px-4 py-2 text-white transition-colors hover:bg-[#1C3A5E]"
          >
            Find a solicitor
          </Link>
        </nav>

        {/* Mobile nav — native <details> disclosure, no client JS needed */}
        <details className="relative md:hidden">
          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-[#DCD8D0] marker:content-none">
            <Menu className="h-5 w-5 text-[#10233D]" strokeWidth={1.75} />
          </summary>
          <nav
            aria-label="Primary"
            className="absolute right-0 top-11 z-10 flex w-52 flex-col gap-1 rounded-xl border border-[#DCD8D0] bg-white p-2 text-sm font-medium text-[#5B6472] shadow-lg"
          >
            <Link href="/uk/solicitors" className="rounded-lg px-3 py-2 hover:bg-[#F8F7F4] hover:text-[#10233D]">
              Browse solicitors
            </Link>
            <Link href="/uk/locations" className="rounded-lg px-3 py-2 hover:bg-[#F8F7F4] hover:text-[#10233D]">
              Locations
            </Link>
            <Link href="/uk/guides" className="rounded-lg px-3 py-2 hover:bg-[#F8F7F4] hover:text-[#10233D]">
              Guides
            </Link>
            <Link href="/uk/leads/new" className="rounded-lg px-3 py-2 hover:bg-[#F8F7F4] hover:text-[#10233D]">
              Find a solicitor
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
