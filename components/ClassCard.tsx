import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/data/classes";

export function ClassCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col border border-bone bg-pure-white">
      <div className="flex aspect-[16/9] items-center justify-center bg-cloud p-6 text-center text-sm font-normal text-silver">
        {course.thumbnailLabel}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.28px]">
          <span className="rounded bg-cloud px-2 py-1 text-slate">{course.level}</span>
          <span className="rounded bg-cloud px-2 py-1 text-slate">{course.format}</span>
        </div>
        <h3 className="mt-4 text-xl font-medium leading-snug tracking-[-0.12px] text-ink-black">{course.title}</h3>
        <p className="mt-2 text-sm font-normal leading-relaxed text-slate">{course.shortDescription}</p>
        <dl className="mt-4 space-y-1 border-t border-bone pt-4 text-[13px] font-normal text-steel">
          <div className="flex justify-between"><dt>Duration</dt><dd className="text-slate">{course.duration}</dd></div>
          <div className="flex justify-between"><dt>Schedule</dt><dd className="text-slate">{course.schedule}</dd></div>
          <div className="flex justify-between"><dt>Price</dt><dd className="text-slate">{course.price}</dd></div>
        </dl>
        <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-black underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-cobalt-signal" aria-label={`Enquire about ${course.title}`}>
          Enquire <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
