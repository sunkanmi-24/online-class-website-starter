"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-pure-white">
      <div className="container flex min-h-14 items-center gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-deep-ink" aria-label="YourClass home">
          YourClass
        </Link>
        <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks
            .filter((l) => l.label !== "Home")
            .map((l) => (
              <Link key={l.href} href={l.href} className="caps-label text-deep-ink hover:text-graphite-stroke">
                {l.label}
              </Link>
            ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <label className="relative hidden md:block">
            <span className="sr-only">Search classes</span>
            <Search size={18} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ash-mid" />
            <input
              type="search"
              placeholder="Search classes"
              className="w-44 rounded border border-fog-border bg-transparent py-2 pl-9 pr-3 text-sm placeholder:text-ash-mid focus:border-deep-ink focus:outline-none lg:w-56"
            />
          </label>
          <Link href="/login" className="hidden text-sm font-medium text-deep-ink hover:underline sm:inline">
            Log in
          </Link>
          <Link href="/contact" className="hidden rounded bg-skill-green px-4 py-2 text-sm font-semibold text-deep-ink transition hover:brightness-95 sm:inline-flex">
            Join a Class
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-fog-border text-deep-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-fog-border bg-pure-white px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="caps-label block px-3 py-2.5 text-deep-ink hover:bg-pure-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 px-3 pt-3">
              <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded border border-graphite-stroke px-4 py-2.5 text-center text-sm font-medium text-deep-ink">
                Log in
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="flex-1 rounded bg-skill-green px-4 py-2.5 text-center text-sm font-semibold text-deep-ink">
                Join a Class
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
