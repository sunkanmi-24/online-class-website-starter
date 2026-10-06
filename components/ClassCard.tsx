import Link from "next/link";
import { Clock, BarChart3, Video } from "lucide-react";
import type { Course } from "@/data/classes";

export function ClassCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex aspect-[16/9] items-center justify-center bg-slate-100 p-6 text-center text-sm font-medium text-slate-400">
        {course.thumbnailLabel}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{course.level}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{course.format}</span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{course.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{course.shortDescription}</p>
        <dl className="mt-4 space-y-1.5 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Clock size={15} aria-hidden /><dt className="sr-only">Duration</dt><dd>{course.duration}</dd></div>
          <div className="flex items-center gap-2"><BarChart3 size={15} aria-hidden /><dt className="sr-only">Schedule</dt><dd>{course.schedule}</dd></div>
          <div className="flex items-center gap-2"><Video size={15} aria-hidden /><dt className="sr-only">Price</dt><dd>{course.price}</dd></div>
        </dl>
        <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-600" aria-label={`Enquire about ${course.title}`}>
          Enquire about this class →
        </Link>
      </div>
    </article>
  );
}
