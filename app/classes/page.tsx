import type { Metadata } from "next";
import { ClassCard } from "@/components/ClassCard";
import { CTASection } from "@/components/CTASection";
import { getCourses } from "@/lib/content";

export const metadata: Metadata = { title: "Classes", description: "Browse online classes: levels, formats, durations, and how to join." };

export default async function Classes() {
  const { data: classes, live } = await getCourses();
  return (
    <main>
      <section className="container py-20 md:py-28">
        <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Classes</p>
        <h1 className="display-headline mt-4 max-w-3xl text-5xl text-ink-black">Learn with structured classes</h1>
        <p className="mt-4 max-w-2xl font-normal leading-relaxed text-slate">
          {live ? "Live catalogue from the database." : "Placeholder catalogue — connect Supabase and publish courses to go live."}
        </p>
        {classes.length === 0 ? (
          <p role="status" className="mt-12 border border-bone bg-pure-white p-8 font-normal text-slate">No classes published yet. Check back soon.</p>
        ) : (
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {classes.map((c) => <ClassCard key={c.slug} course={c} />)}
          </div>
        )}
        <div className="mt-16 border-t border-bone pt-10">
          <h2 className="text-2xl font-medium tracking-[-0.24px] text-ink-black">Full descriptions</h2>
          {classes.map((c) => (
            <details key={c.slug} className="mt-4 border border-bone px-5 py-4">
              <summary className="cursor-pointer text-sm font-medium text-ink-black">{c.title}</summary>
              <p className="mt-2 text-sm font-normal leading-relaxed text-slate">{c.fullDescription}</p>
              <p className="mt-2 text-[11px] tracking-[0.28px] text-silver">Level: {c.level} · {c.duration} · {c.format} · {c.price}</p>
            </details>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
