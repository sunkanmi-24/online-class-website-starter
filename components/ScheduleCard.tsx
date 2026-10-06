import Link from "next/link";
import { CalendarDays, Clock, MonitorPlay } from "lucide-react";
import type { ScheduleItem } from "@/data/schedule";

export function ScheduleCard({ item }: { item: ScheduleItem }) {
  return (
    <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <CalendarDays size={14} aria-hidden /> {item.day} · {item.date}
        </div>
        <h3 className="mt-2 text-lg font-bold text-slate-900">{item.classTitle}</h3>
        <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5"><Clock size={14} aria-hidden />{item.time}</span>
          <span className="inline-flex items-center gap-1.5"><MonitorPlay size={14} aria-hidden />{item.platform}</span>
        </p>
        <p className="mt-1 text-xs text-slate-400">{item.note}</p>
      </div>
      <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        Register
      </Link>
    </article>
  );
}
