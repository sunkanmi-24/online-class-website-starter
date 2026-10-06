import type { Metadata } from "next";
import { ScheduleCard } from "@/components/ScheduleCard";
import { getSchedule } from "@/lib/content";

export const metadata: Metadata = { title: "Schedule", description: "Upcoming class schedule: dates, times, platforms, and registration." };

export default async function Schedule() {
  const { data: schedule, live } = await getSchedule();
  return (
    <main className="container py-14 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Schedule</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Upcoming classes</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        {live ? "Live schedule from the database." : "Sample data only — publish schedules from the admin panel to go live."}
      </p>
      <div className="mt-10 grid gap-4">
        {schedule.map((item) => <ScheduleCard key={item.id} item={item} />)}
      </div>
    </main>
  );
}
