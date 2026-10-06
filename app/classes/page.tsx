import type { Metadata } from "next";
import { ClassCard } from "@/components/ClassCard";
import { CTASection } from "@/components/CTASection";
import { getCourses } from "@/lib/content";

export const metadata: Metadata = { title: "Classes", description: "Browse online classes: levels, formats, durations, and how to join." };

export default async function Classes() {
  const { data: classes, live } = await getCourses();
  return (
    <main>
      <section className="container py-14 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Classes</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Learn with structured classes</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          {live ? "Live catalogue from the database." : "Placeholder catalogue — connect Supabase and publish courses to go live."}
        </p>
        {classes.length === 0 ? (
          <p role="status" className="mt-10 rounded-2xl border bg-white p-8 text-slate-600">No classes published yet. Check back soon.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => <ClassCard key={c.slug} course={c} />)}
          </div>
        )}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600">
          <h2 className="font-bold text-slate-900">Full descriptions</h2>
          {classes.map((c) => (
            <details key={c.slug} className="mt-3 rounded-xl bg-slate-50 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-slate-800">{c.title}</summary>
              <p className="mt-2">{c.fullDescription}</p>
              <p className="mt-1 text-xs text-slate-400">Level: {c.level} · {c.duration} · {c.format} · {c.price}</p>
            </details>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
