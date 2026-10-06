import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ScheduleItem } from "@/data/schedule";

export function ScheduleCard({ item, dark = false }: { item: ScheduleItem; dark?: boolean }) {
  return (
    <article className={`grid gap-4 rounded p-6 md:grid-cols-[1fr_auto] md:items-center ${dark ? "bg-charcoal-surface" : "bg-pure-white shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]"}`}>
      <div>
        <p className="caps-label text-ash-mid">{item.day} · {item.date}</p>
        <h3 className={`mt-2 text-xl font-bold ${dark ? "text-pure-white" : "text-deep-ink"}`}>{item.classTitle}</h3>
        <p className={`mt-1 text-sm font-normal ${dark ? "text-pure-white/70" : "text-deep-ink/70"}`}>{item.time} · {item.platform}</p>
        <p className="mt-1 text-[11px] tracking-[0.1em] text-ash-mid">{item.note}</p>
      </div>
      <Link href="/contact" className="inline-flex items-center justify-center gap-1.5 rounded bg-skill-green px-4 py-2 text-sm font-semibold text-deep-ink transition hover:brightness-95">
        Register <ArrowRight size={15} aria-hidden />
      </Link>
    </article>
  );
}
