import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const styles = {
    // Primary Dark Button (Filled) — the only filled style in the system
    primary: "bg-ink-black text-pure-white hover:bg-graphite",
    // Hairline outline button
    outline: "border border-bone bg-pure-white text-ink-black hover:bg-cloud",
    // Ghost Text Link with momentum
    ghost: "text-ink-black hover:text-slate underline-offset-4 hover:underline",
  }[variant];
  const shape = variant === "ghost" ? "px-0 py-2" : "rounded-lg px-5 py-2.5";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-signal ${shape} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
