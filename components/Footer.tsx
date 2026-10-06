import Link from "next/link";
import { navLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-studio-black text-pure-white">
      <div className="container grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-tight">YourClass</p>
          <p className="mt-3 max-w-xs text-sm font-normal leading-relaxed text-pure-white/70">
            Online classes and teaching videos. Placeholder footer — add branding, social links, and contact details before production.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="caps-label text-ash-mid">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm font-normal">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="caps-label text-ash-mid">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm font-normal text-pure-white/80">
            <li>Email: Add email address</li>
            <li>Phone: Add phone number</li>
            <li>WhatsApp: Add WhatsApp number</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-charcoal-surface">
        <div className="container flex flex-col gap-2 py-5 text-[11px] tracking-[0.1em] text-ash-mid sm:flex-row sm:justify-between">
          <p>© 2026 YourClass. All rights reserved.</p>
          <p>Learn. Practice. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
