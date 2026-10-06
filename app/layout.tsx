import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "YourClass — Online Classes", template: "%s · YourClass" },
  description: "Online classes, teaching videos, schedules and contact information. Placeholder content — replace with real instructor details before production.",
  openGraph: {
    title: "YourClass — Online Classes",
    description: "Learn online with structured classes, teaching videos, and live schedules.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pure-white text-ink-black antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-ink-black focus:px-4 focus:py-2 focus:text-pure-white">
          Skip to content
        </a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
