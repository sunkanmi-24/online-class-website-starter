import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/data/classes";

export function ClassCard({ course, dark = false }: { course: Course; dark?: boolean }) {
  return (
    <article
      className={`flex flex-col rounded p-4 ${
        dark ? "bg-charcoal-surface" : "bg-pure-white shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]"
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t bg-studio-black">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm font-normal text-pure-white/50">
            {course.thumbnailLabel}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="caps-label text-ash-mid">{course.level} · {course.format}</p>
        <h3 className={`mt-2 text-[22px] font-bold leading-tight ${dark ? "text-pure-white" : "text-deep-ink"}`}>{course.title}</h3>
        <p className={`mt-2 text-sm font-normal leading-relaxed ${dark ? "text-pure-white/70" : "text-deep-ink/70"}`}>{course.shortDescription}</p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.1em] text-ash-mid">{course.duration} · {course.price}</p>
        <Link href="/contact" className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-pure-white" : "text-deep-ink"} underline-offset-4 hover:underline`} aria-label={`Enquire about ${course.title}`}>
          Enquire <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
