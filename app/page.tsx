import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ClassCard } from "@/components/ClassCard";
import { VideoCard } from "@/components/VideoCard";
import { ScheduleCard } from "@/components/ScheduleCard";
import { CTASection } from "@/components/CTASection";
import { instructor } from "@/data/instructor";
import { getCourses, getVideos, getSchedule } from "@/lib/content";

export const metadata: Metadata = { title: "Home", description: "Meet the instructor, explore online classes, watch teaching videos, and see the upcoming schedule." };

const checklist = [
  "Structured classes matched to your level",
  "Teaching videos you can rewatch anytime",
  "Live sessions on a clear weekly schedule",
  "Direct contact with the instructor",
];

export default async function Home() {
  const [{ data: classes }, { data: videos }, { data: schedule }] = await Promise.all([
    getCourses(),
    getVideos(),
    getSchedule(),
  ]);
  return (
    <main>
      {/* Split hero — chalk-white headline left, black join panel right */}
      <section aria-labelledby="hero-heading" className="grid lg:grid-cols-[55%_45%]">
        <div className="bg-pure-white">
          <div className="container py-16 md:py-24">
            <p className="caps-label text-ash-mid">Online Classes · {instructor.role}</p>
            <h1 id="hero-heading" className="poster-headline mt-5 text-5xl text-deep-ink md:text-[64px]">
              Learn.<br />Practice.<br />Grow.
            </h1>
            <p className="mt-6 max-w-md text-base font-normal leading-relaxed text-deep-ink/70">
              {instructor.bioShort}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/classes">Explore Classes</Button>
              <Link href="/videos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-ink underline-offset-4 hover:underline">
                Watch videos <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
            <p className="caps-label mt-10 text-ash-mid">For: Add target audience</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-studio-black px-6 py-16 md:py-24">
          <div className="w-full max-w-sm rounded bg-pure-white p-8">
            <h2 className="text-center text-[22px] font-bold text-deep-ink">Join the next class</h2>
            <p className="mt-2 text-center text-sm font-normal text-deep-ink/70">Reserve a seat — the instructor confirms every request.</p>
            <div className="mt-6 grid gap-2">
              <Button href="/classes">Browse classes</Button>
              <Button href="/schedule" variant="dark">See the schedule</Button>
              <Link href="/contact" className="mt-1 text-center text-sm font-medium text-deep-ink underline-offset-4 hover:underline">
                Or send a message →
              </Link>
            </div>
            <p className="mt-5 text-center text-[11px] leading-relaxed text-ash-mid">Placeholder panel — connect real enrollment once class details are final.</p>
          </div>
        </div>
      </section>

      {/* Classes on white */}
      <section className="container py-20 md:py-28" aria-labelledby="teach-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Classes" title="Practical classes for real progress" text="Placeholder subjects — replace with the instructor's real topics, levels, and audience." />
          <Link href="/classes" className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-ink underline-offset-4 hover:underline">
            All classes <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <h2 id="teach-heading" className="sr-only">What he teaches</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {classes.slice(0, 4).map((c) => <ClassCard key={c.slug} course={c} />)}
        </div>
      </section>

      {/* Dark feature section — poster headline + neon checklist */}
      <section className="bg-studio-black py-20 md:py-28" aria-labelledby="why-heading">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="caps-label text-ash-mid">Why learn here</p>
            <h2 id="why-heading" className="poster-headline mt-4 text-4xl text-pure-white md:text-[46px]">
              Teaching built around the student.
            </h2>
            <p className="mt-4 max-w-md text-base font-normal leading-relaxed text-pure-white/70">
              Clear lessons, honest pacing, and a schedule you can plan around. Placeholder copy — replace with the instructor&apos;s real approach.
            </p>
            <div className="mt-8">
              <Button href="/about">Meet the instructor</Button>
            </div>
          </div>
          <ul className="space-y-3">
            {checklist.map((c) => (
              <li key={c} className="flex items-center gap-3 text-base font-normal text-pure-white">
                <Check size={20} aria-hidden className="shrink-0 text-neon-pulse" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Videos on white */}
      <section className="container py-20 md:py-28" aria-labelledby="videos-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Video library" title="Lessons you can watch anytime" text="Embeds are ready for YouTube/Vimeo — publish real videos from the admin panel." />
          <Link href="/videos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-ink underline-offset-4 hover:underline">
            All videos <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <h2 id="videos-heading" className="sr-only">Latest videos</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 3).map((v) => <VideoCard key={v.slug} video={v} />)}
        </div>
      </section>

      {/* Schedule on black */}
      <section className="bg-studio-black py-20 md:py-28" aria-labelledby="schedule-heading">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading dark eyebrow="Upcoming" title="Next on the schedule" text="Sample schedule entries — replace with real dates before production." />
            <Link href="/schedule" className="inline-flex items-center gap-1.5 text-sm font-semibold text-pure-white underline-offset-4 hover:underline">
              Full schedule <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <h2 id="schedule-heading" className="sr-only">Upcoming schedule</h2>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {schedule.slice(0, 2).map((item) => <ScheduleCard key={item.id} item={item} dark />)}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
