"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Promotional announcement bar — the single cobalt moment */}
      <div className="bg-cobalt-signal text-pure-white">
        <p className="container flex items-center justify-center gap-3 py-2 text-center text-[13px] font-normal tracking-[0.025em]">
          <span>Enrollment open — reserve a seat in the next session.</span>
          <Link href="/contact" className="underline underline-offset-2 hover:opacity-80">
            Join a class
          </Link>
        </p>
      </div>
      <header className="sticky top-0 z-50 border-b border-bone bg-pure-white">
        <div className="container flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="text-xl font-medium tracking-tight text-ink-black" aria-label="YourClass home">
            YourClass<span aria-hidden>.</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium uppercase text-ink-black md:flex" aria-label="Primary">
            {navLinks
              .filter((l) => l.label !== "Home")
              .map((l) => (
                <Link key={l.href} href={l.href} className="transition hover:text-slate">
                  {l.label}
                </Link>
              ))}
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="hidden text-[13px] font-medium text-ink-black hover:text-slate sm:inline">
              Contact
            </Link>
            <Link href="/contact" className="hidden rounded-lg bg-ink-black px-5 py-2.5 text-sm font-medium text-pure-white transition hover:bg-graphite sm:inline-flex">
              Join a Class
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-bone text-ink-black md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-bone bg-pure-white px-5 py-4 md:hidden" aria-label="Mobile">
            <ul className="space-y-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium uppercase text-ink-black hover:bg-cloud">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-lg bg-ink-black px-5 py-3 text-center text-sm font-medium text-pure-white">
                  Join a Class
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
