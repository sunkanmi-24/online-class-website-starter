import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ClassCard } from "@/components/ClassCard";
import { VideoCard } from "@/components/VideoCard";
import { ScheduleCard } from "@/components/ScheduleCard";
import { CTASection } from "@/components/CTASection";
import { instructor } from "@/data/instructor";
import { getCourses, getVideos, getSchedule } from "@/lib/content";

export const metadata: Metadata = { title: "Home", description: "Meet the instructor, explore online classes, watch teaching videos, and see the upcoming schedule." };

const steps = [
  { n: "01", title: "Pick a class", text: "Browse classes and choose the level that fits. Placeholder — replace with enrolment steps." },
  { n: "02", title: "Learn online", text: "Join live sessions or watch teaching videos. Embeds support YouTube and Vimeo." },
  { n: "03", title: "Keep practising", text: "Follow the schedule, ask questions, and track your progress." },
];

export default async function Home() {
  const [{ data: classes }, { data: videos }, { data: schedule }] = await Promise.all([
    getCourses(),
    getVideos(),
    getSchedule(),
  ]);
  return (
    <main>
      {/* Hero — near-empty white canvas, editorial statement */}
      <section className="border-b border-bone" aria-labelledby="hero-heading">
        <div className="container py-20 md:py-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Online Classes · {instructor.role}</p>
          <h1 id="hero-heading" className="display-headline mt-5 max-w-4xl text-5xl text-ink-black md:text-[64px]">
            Learn. Practice. Grow.
          </h1>
          <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-slate">
            {instructor.bioShort}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/classes">Explore Classes</Button>
            <Button href="/videos" variant="ghost">Watch videos <ArrowRight size={15} aria-hidden /></Button>
          </div>
          <p className="mt-10 border-t border-bone pt-5 text-[13px] font-normal text-silver">For: Add target audience (e.g. beginners, students, professionals).</p>
        </div>
      </section>

      {/* Classes — 2-column image card grid */}
      <section className="container py-20 md:py-28" aria-labelledby="teach-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What he teaches" title="Practical classes for real progress" text="Placeholder subjects — replace with the instructor's real topics, levels, and audience." />
          <Button href="/classes" variant="ghost">All classes <ArrowRight size={15} aria-hidden /></Button>
        </div>
        <h2 id="teach-heading" className="sr-only">What he teaches</h2>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {classes.slice(0, 4).map((c) => <ClassCard key={c.slug} course={c} />)}
        </div>
      </section>

      {/* Feature row — video library, alternating rhythm */}
      <section className="border-y border-bone bg-pure-white" aria-labelledby="videos-heading">
        <div className="container grid items-center gap-10 py-20 md:py-28 lg:grid-cols-2">
          <div className="flex aspect-video items-center justify-center bg-carbon">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pure-white text-ink-black" aria-hidden>▶</span>
            <span className="sr-only">Featured teaching video placeholder</span>
          </div>
          <div>
            <SectionHeading eyebrow="Teaching videos" title="Lessons you can watch anytime" text="Embeds are ready for YouTube/Vimeo — add real video URLs from the admin panel." />
            <h2 id="videos-heading" className="sr-only">Latest videos</h2>
            <div className="mt-8">
              <Button href="/videos">Browse the library</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest videos grid */}
      <section className="container py-20 md:py-28">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 3).map((v) => <VideoCard key={v.slug} video={v} />)}
        </div>
      </section>

      {/* How learning works — hairline-separated rows */}
      <section className="border-t border-bone" aria-labelledby="how-heading">
        <div className="container py-20 md:py-28">
          <SectionHeading eyebrow="How learning works" title="Three steps to get started" />
          <h2 id="how-heading" className="sr-only">How learning works</h2>
          <ol className="mt-12 divide-y divide-bone border-y border-bone">
            {steps.map((s) => (
              <li key={s.n} className="grid gap-2 py-8 sm:grid-cols-[80px_220px_1fr] sm:gap-6">
                <span className="text-[13px] font-medium text-silver">{s.n}</span>
                <h3 className="text-xl font-medium tracking-[-0.12px] text-ink-black">{s.title}</h3>
                <p className="max-w-xl text-base font-normal leading-relaxed text-slate">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Upcoming schedule */}
      <section className="border-t border-bone" aria-labelledby="schedule-heading">
        <div className="container py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Upcoming" title="Next on the schedule" text="Sample schedule entries — replace with real dates before production." />
            <Button href="/schedule" variant="ghost">Full schedule <ArrowRight size={15} aria-hidden /></Button>
          </div>
          <h2 id="schedule-heading" className="sr-only">Upcoming schedule</h2>
          <div className="mt-12 grid gap-px border border-bone bg-bone">
            {schedule.slice(0, 2).map((item) => <ScheduleCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
