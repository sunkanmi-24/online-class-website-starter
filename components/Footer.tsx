import Link from "next/link";
import { navLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">YourClass<span className="text-blue-600">.</span></p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
            Online classes and teaching videos. Placeholder footer — add branding, social links, and contact details before production.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-900">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-blue-700">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-slate-900">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Email: Add email address</li>
            <li>Phone: Add phone number</li>
            <li>WhatsApp: Add WhatsApp number</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="container flex flex-col gap-2 py-5 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <p>© 2026 YourClass. All rights reserved.</p>
          <p>Learn. Practice. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
