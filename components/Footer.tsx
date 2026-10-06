import Link from "next/link";
import { navLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-bone bg-pure-white">
      <div className="container grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="text-lg font-medium tracking-tight text-ink-black">YourClass<span aria-hidden>.</span></p>
          <p className="mt-3 max-w-xs text-sm font-normal leading-relaxed text-slate">
            Online classes and teaching videos. Placeholder footer — add branding, social links, and contact details before production.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm font-normal text-slate">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:text-ink-black hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm font-normal text-slate">
            <li>Email: Add email address</li>
            <li>Phone: Add phone number</li>
            <li>WhatsApp: Add WhatsApp number</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bone">
        <div className="container flex flex-col gap-2 py-5 text-[11px] tracking-[0.28px] text-silver sm:flex-row sm:justify-between">
          <p>© 2026 YourClass. All rights reserved.</p>
          <p>Learn. Practice. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
