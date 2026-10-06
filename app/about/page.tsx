import type { Metadata } from "next";
import { Check } from "lucide-react";
import { instructor } from "@/data/instructor";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = { title: "About", description: "About the instructor: background, teaching philosophy, and areas of expertise." };

export default function About() {
  return (
    <main>
      {/* Instructor portrait hero — photo block + statement */}
      <section className="grid lg:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center bg-studio-black p-10 text-center text-sm font-normal text-pure-white/50">
          {instructor.photoAlt}
        </div>
        <div className="bg-pure-white">
          <div className="container py-16 md:py-24">
            <p className="caps-label text-ash-mid">About the instructor</p>
            <h1 className="poster-headline mt-4 text-5xl text-deep-ink">{instructor.name}</h1>
            <p className="mt-4 text-base font-normal text-deep-ink/70">{instructor.role}</p>
          </div>
        </div>
      </section>

      <section className="container grid gap-12 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <p className="caps-label text-ash-mid">Biography</p>
          {instructor.bioLong.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 font-normal leading-relaxed text-deep-ink/80">{p}</p>
          ))}
          <h2 className="mt-10 text-[28px] font-bold text-deep-ink">Teaching philosophy</h2>
          <p className="mt-4 font-normal leading-relaxed text-deep-ink/80">Add teaching philosophy here — how lessons are structured, how students get feedback, and what success looks like.</p>
        </div>
        <div>
          <p className="caps-label text-ash-mid">Areas of expertise</p>
          <ul className="mt-4 space-y-3">
            {instructor.expertise.map((e) => (
              <li key={e} className="flex items-center gap-3 rounded bg-pure-white p-4 text-base font-normal text-deep-ink shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]">
                <Check size={20} aria-hidden className="shrink-0 text-skill-green" /> {e}
              </li>
            ))}
          </ul>
          <p className="caps-label mt-10 text-ash-mid">Connect</p>
          <ul className="mt-3 space-y-1.5 text-sm font-normal text-deep-ink/70">
            {instructor.socials.map((s) => (
              <li key={s.label}>{s.label}: <span className="text-ash-mid">{s.note}</span></li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
