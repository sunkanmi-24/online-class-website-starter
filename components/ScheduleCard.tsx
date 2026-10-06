import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ScheduleItem } from "@/data/schedule";

export function ScheduleCard({ item }: { item: ScheduleItem }) {
  return (
    <article className="grid gap-4 border border-bone bg-pure-white p-6 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">{item.day} · {item.date}</p>
        <h3 className="mt-2 text-xl font-medium tracking-[-0.12px] text-ink-black">{item.classTitle}</h3>
        <p className="mt-1 text-sm font-normal text-slate">{item.time} · {item.platform}</p>
        <p className="mt-1 text-[11px] tracking-[0.28px] text-silver">{item.note}</p>
      </div>
      <Link href="/contact" className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink-black px-5 py-2.5 text-sm font-medium text-pure-white transition hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-signal">
        Register <ArrowRight size={15} aria-hidden />
      </Link>
    </article>
  );
}
