import type { Metadata } from "next";
import { ScheduleCard } from "@/components/ScheduleCard";
import { getSchedule } from "@/lib/content";

export const metadata: Metadata = { title: "Schedule", description: "Upcoming class schedule: dates, times, platforms, and registration." };

export default async function Schedule() {
  const { data: schedule, live } = await getSchedule();
  return (
    <main className="container py-20 md:py-28">
      <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Schedule</p>
      <h1 className="display-headline mt-4 max-w-3xl text-5xl text-ink-black">Upcoming classes</h1>
      <p className="mt-4 max-w-2xl font-normal leading-relaxed text-slate">
        {live ? "Live schedule from the database." : "Sample data only — publish schedules from the admin panel to go live."}
      </p>
      <div className="mt-12 grid gap-px border border-bone bg-bone">
        {schedule.map((item) => <ScheduleCard key={item.id} item={item} />)}
      </div>
    </main>
  );
}
