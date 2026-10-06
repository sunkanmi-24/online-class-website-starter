import type { Metadata } from "next";
import { instructor } from "@/data/instructor";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = { title: "About", description: "About the instructor: background, teaching philosophy, and areas of expertise." };

export default function About() {
  return (
    <main>
      <section className="container py-20 md:py-28">
        <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">About the instructor</p>
        <h1 className="display-headline mt-4 max-w-3xl text-5xl text-ink-black">{instructor.name}</h1>
        <p className="mt-4 text-base font-normal text-slate">{instructor.role}</p>
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex aspect-square items-center justify-center border border-dashed border-bone bg-cloud p-8 text-center text-sm font-normal text-silver">
            {instructor.photoAlt}
          </div>
          <div>
            <h2 className="text-2xl font-medium tracking-[-0.24px] text-ink-black">Biography</h2>
            {instructor.bioLong.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 font-normal leading-relaxed text-slate">{p}</p>
            ))}
            <h2 className="mt-12 border-t border-bone pt-8 text-2xl font-medium tracking-[-0.24px] text-ink-black">Teaching philosophy</h2>
            <p className="mt-4 font-normal leading-relaxed text-slate">Add teaching philosophy here — how lessons are structured, how students get feedback, and what success looks like.</p>
            <h2 className="mt-12 border-t border-bone pt-8 text-xl font-medium tracking-[-0.12px] text-ink-black">Areas of expertise</h2>
            <ul className="mt-5 divide-y divide-bone border-y border-bone">
              {instructor.expertise.map((e, i) => (
                <li key={e} className="flex items-baseline gap-4 py-3.5 text-sm font-normal text-slate">
                  <span className="text-[11px] text-silver">0{i + 1}</span> {e}
                </li>
              ))}
            </ul>
            <h2 className="mt-12 text-xl font-medium tracking-[-0.12px] text-ink-black">Connect</h2>
            <ul className="mt-3 space-y-1.5 text-sm font-normal text-slate">
              {instructor.socials.map((s) => (
                <li key={s.label}>{s.label}: <span className="text-steel">{s.note}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
