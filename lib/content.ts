import { createClient } from "@/lib/supabase/server";
import { classes as fallbackClasses, type Course } from "@/data/classes";
import { videos as fallbackVideos, type Video } from "@/data/videos";
import { schedule as fallbackSchedule, type ScheduleItem } from "@/data/schedule";

function configured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getCourses(): Promise<{ data: Course[]; live: boolean }> {
  if (!configured()) return { data: fallbackClasses, live: false };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("courses").select("*").eq("published", true).order("created_at");
    if (error || !data?.length) return { data: fallbackClasses, live: false };
    return {
      live: true,
      data: data.map((r) => ({
        slug: r.slug, title: r.title, shortDescription: r.short_description ?? "",
        fullDescription: r.full_description ?? "", level: r.level ?? "All levels",
        duration: r.duration ?? "", format: r.format ?? "Live online",
        schedule: r.schedule ?? "", price: r.price ?? "",
        thumbnailLabel: r.thumbnail_label ?? "",
      })) as Course[],
    };
  } catch {
    return { data: fallbackClasses, live: false };
  }
}

export async function getVideos(): Promise<{ data: Video[]; live: boolean }> {
  if (!configured()) return { data: fallbackVideos, live: false };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("videos").select("*").eq("published", true).order("created_at");
    if (error || !data?.length) return { data: fallbackVideos, live: false };
    return {
      live: true,
      data: data.map((r) => ({
        slug: r.slug, title: r.title, description: r.description ?? "",
        category: r.category ?? "Lesson", date: r.date ?? "",
        duration: r.duration ?? "", embedUrl: r.embed_url ?? "",
      })) as Video[],
    };
  } catch {
    return { data: fallbackVideos, live: false };
  }
}

export async function getSchedule(): Promise<{ data: ScheduleItem[]; live: boolean }> {
  if (!configured()) return { data: fallbackSchedule, live: false };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("schedules").select("*").eq("published", true).order("created_at");
    if (error || !data?.length) return { data: fallbackSchedule, live: false };
    return {
      live: true,
      data: data.map((r) => ({
        id: r.id, day: r.day, date: r.date ?? "", time: r.time ?? "",
        classTitle: r.class_title, platform: r.platform ?? "", note: r.note ?? "",
      })) as ScheduleItem[],
    };
  } catch {
    return { data: fallbackSchedule, live: false };
  }
}
