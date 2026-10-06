import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { instructor } from "@/data/instructor";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = { title: "About", description: "About the instructor: background, teaching philosophy, and areas of expertise." };

export default function About() {
  return (
    <main>
      <section className="container py-14 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">About the instructor</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{instructor.name}</h1>
        <p className="mt-3 text-lg text-slate-600">{instructor.role}</p>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-8 text-center text-sm font-medium text-slate-400">
            {instructor.photoAlt}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Biography</h2>
            {instructor.bioLong.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 leading-8 text-slate-600">{p}</p>
            ))}
            <h2 className="mt-8 text-2xl font-bold">Teaching philosophy</h2>
            <p className="mt-4 leading-8 text-slate-600">Add teaching philosophy here — how lessons are structured, how students get feedback, and what success looks like.</p>
            <h2 className="mt-8 text-xl font-bold">Areas of expertise</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {instructor.expertise.map((e) => (
                <li key={e} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-blue-600" aria-hidden /> {e}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-xl font-bold">Connect</h2>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {instructor.socials.map((s) => (
                <li key={s.label}>{s.label}: {s.note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
