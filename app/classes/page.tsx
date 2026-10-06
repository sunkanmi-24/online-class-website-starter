import type { Metadata } from "next";
import { ClassCard } from "@/components/ClassCard";
import { CTASection } from "@/components/CTASection";
import { getCourses } from "@/lib/content";

export const metadata: Metadata = { title: "Classes", description: "Browse online classes: levels, formats, durations, and how to join." };

export default async function Classes() {
  const { data: classes, live } = await getCourses();
  return (
    <main>
      <section className="bg-studio-black py-16 md:py-24">
        <div className="container">
          <p className="caps-label text-ash-mid">Classes</p>
          <h1 className="poster-headline mt-4 max-w-3xl text-5xl text-pure-white">Learn with structured classes</h1>
          <p className="mt-4 max-w-2xl font-normal leading-relaxed text-pure-white/70">
            {live ? "Live catalogue from the database." : "Placeholder catalogue — connect Supabase and publish courses to go live."}
          </p>
        </div>
      </section>
      <section className="container py-16 md:py-24">
        {classes.length === 0 ? (
          <p role="status" className="rounded bg-pure-white p-8 font-normal text-deep-ink/70 shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]">No classes published yet. Check back soon.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => <ClassCard key={c.slug} course={c} />)}
          </div>
        )}
        <div className="mt-16">
          <h2 className="text-[28px] font-bold text-deep-ink">Full descriptions</h2>
          {classes.map((c) => (
            <details key={c.slug} className="mt-3 rounded border border-fog-border bg-pure-white px-5 py-4">
              <summary className="cursor-pointer text-sm font-semibold text-deep-ink">{c.title}</summary>
              <p className="mt-2 text-sm font-normal leading-relaxed text-deep-ink/70">{c.fullDescription}</p>
              <p className="caps-label mt-2 text-ash-mid">Level: {c.level} · {c.duration} · {c.format} · {c.price}</p>
            </details>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
