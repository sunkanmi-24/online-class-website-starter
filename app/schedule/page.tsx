import type { Metadata } from "next";
import { ScheduleCard } from "@/components/ScheduleCard";
import { getSchedule } from "@/lib/content";

export const metadata: Metadata = { title: "Schedule", description: "Upcoming class schedule: dates, times, platforms, and registration." };

export default async function Schedule() {
  const { data: schedule, live } = await getSchedule();
  return (
    <main>
      <section className="bg-studio-black py-16 md:py-24">
        <div className="container">
          <p className="caps-label text-ash-mid">Schedule</p>
          <h1 className="poster-headline mt-4 max-w-3xl text-5xl text-pure-white">Upcoming classes</h1>
          <p className="mt-4 max-w-2xl font-normal leading-relaxed text-pure-white/70">
            {live ? "Live schedule from the database." : "Sample data only — publish schedules from the admin panel to go live."}
          </p>
        </div>
      </section>
      <section className="container py-16 md:py-24">
        <div className="grid gap-3 md:grid-cols-2">
          {schedule.map((item) => <ScheduleCard key={item.id} item={item} />)}
        </div>
      </section>
    </main>
  );
}
