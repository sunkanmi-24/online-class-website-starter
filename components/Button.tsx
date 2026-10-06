import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "whatsapp";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-slate-300 bg-white text-slate-800 hover:border-blue-500 hover:text-blue-700",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    whatsapp: "bg-green-600 text-white hover:bg-green-700",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
