import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { getVideos } from "@/lib/content";

export const metadata: Metadata = { title: "Videos", description: "Watch teaching videos and lessons. YouTube and Vimeo embeds supported." };

export default async function Videos() {
  const { data: videos, live } = await getVideos();
  return (
    <main className="container py-20 md:py-28">
      <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">Video Library</p>
      <h1 className="display-headline mt-4 max-w-3xl text-5xl text-ink-black">Watch and learn</h1>
      <p className="mt-4 max-w-2xl font-normal leading-relaxed text-slate">
        {live ? "Live library from the database." : "Placeholder videos — publish videos from the admin panel to go live."}
      </p>
      {videos.length === 0 ? (
        <p role="status" className="mt-12 border border-bone bg-pure-white p-8 font-normal text-slate">No videos published yet.</p>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {videos.map((v) => <VideoCard key={v.slug} video={v} />)}
        </div>
      )}
    </main>
  );
}
