import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { getVideos } from "@/lib/content";

export const metadata: Metadata = { title: "Videos", description: "Watch teaching videos and lessons. YouTube and Vimeo embeds supported." };

export default async function Videos() {
  const { data: videos, live } = await getVideos();
  return (
    <main className="container py-14 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Video Library</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Watch and learn</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        {live ? "Live library from the database." : "Placeholder videos — publish videos from the admin panel to go live."}
      </p>
      {videos.length === 0 ? (
        <p role="status" className="mt-10 rounded-2xl border bg-white p-8 text-slate-600">No videos published yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => <VideoCard key={v.slug} video={v} />)}
        </div>
      )}
    </main>
  );
}
