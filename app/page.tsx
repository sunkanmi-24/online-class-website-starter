import type { Metadata } from "next";
import { BookOpen, PlayCircle, CalendarCheck, ArrowRight } from "lucide-react";
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
  { icon: BookOpen, title: "1. Pick a class", text: "Browse classes and choose the level that fits. Placeholder — replace with enrolment steps." },
  { icon: PlayCircle, title: "2. Learn online", text: "Join live sessions or watch teaching videos. Embeds support YouTube and Vimeo." },
  { icon: CalendarCheck, title: "3. Keep practising", text: "Follow the schedule, ask questions, and track your progress." },
];

export default async function Home() {
  const [{ data: classes }, { data: videos }, { data: schedule }] = await Promise.all([
    getCourses(),
    getVideos(),
    getSchedule(),
  ]);
  return (
    <main>
      <section className="bg-slate-950 text-white" aria-labelledby="hero-heading">
        <div className="container grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">Online Classes · {instructor.role}</p>
            <h1 id="hero-heading" className="mt-4 text-4xl font-black leading-[1.1] tracking-tight md:text-6xl">
              Learn. Practice. <span className="text-blue-400">Grow.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              {instructor.bioShort}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/classes">Explore Classes <ArrowRight size={16} aria-hidden /></Button>
              <Button href="/videos" variant="secondary" className="!border-slate-600 !bg-transparent !text-white">Watch Videos</Button>
            </div>
            <p className="mt-6 text-sm text-slate-400">For: Add target audience (e.g. beginners, students, professionals).</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-3 shadow-2xl">
            <div className="flex aspect-video flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950 to-slate-800 px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-blue-700" aria-hidden>▶</span>
              <p className="mt-4 font-semibold">Featured teaching video</p>
              <p className="mt-1 text-sm text-slate-400">Replace with a YouTube/Vimeo embed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24" aria-labelledby="teach-heading">
        <SectionHeading eyebrow="What he teaches" title="Practical classes for real progress" text="Placeholder subjects — replace with the instructor's real topics, levels, and audience." />
        <h2 id="teach-heading" className="sr-only">What he teaches</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {classes.slice(0, 3).map((c) => <ClassCard key={c.slug} course={c} />)}
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" aria-labelledby="videos-heading">
        <div className="container">
          <SectionHeading eyebrow="Teaching videos" title="Latest from the video library" text="Embeds are ready for YouTube/Vimeo — add real video URLs in data/videos.ts." />
          <h2 id="videos-heading" className="sr-only">Latest videos</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.slice(0, 3).map((v) => <VideoCard key={v.slug} video={v} />)}
          </div>
          <div className="mt-8"><Button href="/videos" variant="secondary">Browse all videos</Button></div>
        </div>
      </section>

      <section className="container py-16 md:py-24" aria-labelledby="how-heading">
        <SectionHeading eyebrow="How learning works" title="Simple steps to get started" align="center" />
        <h2 id="how-heading" className="sr-only">How learning works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <s.icon className="text-blue-600" size={28} aria-hidden />
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-blue-50/60 py-16 md:py-24" aria-labelledby="schedule-heading">
        <div className="container">
          <SectionHeading eyebrow="Upcoming" title="Next on the schedule" text="Sample schedule entries — replace with real dates before production." />
          <h2 id="schedule-heading" className="sr-only">Upcoming schedule</h2>
          <div className="mt-10 grid gap-4">
            {schedule.slice(0, 2).map((item) => <ScheduleCard key={item.id} item={item} />)}
          </div>
          <div className="mt-8"><Button href="/schedule" variant="dark">View full schedule</Button></div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
