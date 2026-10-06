import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "cta" | "dark" | "outline" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "cta", className = "" }: Props) {
  const styles = {
    // Primary CTA — skill green fill, the only green moment
    cta: "bg-skill-green text-deep-ink hover:brightness-95",
    // Dark fill for use on white sections
    dark: "bg-studio-black text-pure-white hover:bg-charcoal-surface",
    // White outline for use on black sections
    outline: "border border-graphite-stroke bg-pure-white text-deep-ink hover:bg-pure-white/90",
    // Ghost text link
    ghost: "text-pure-white underline-offset-4 hover:underline",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-skill-green ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
