import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { getVideos } from "@/lib/content";

export const metadata: Metadata = { title: "Videos", description: "Watch teaching videos and lessons. YouTube and Vimeo embeds supported." };

export default async function Videos() {
  const { data: videos, live } = await getVideos();
  return (
    <main>
      <section className="bg-studio-black py-16 md:py-24">
        <div className="container">
          <p className="caps-label text-ash-mid">Video Library</p>
          <h1 className="poster-headline mt-4 max-w-3xl text-5xl text-pure-white">Watch and learn</h1>
          <p className="mt-4 max-w-2xl font-normal leading-relaxed text-pure-white/70">
            {live ? "Live library from the database." : "Placeholder videos — publish videos from the admin panel to go live."}
          </p>
        </div>
      </section>
      <section className="container py-16 md:py-24">
        {videos.length === 0 ? (
          <p role="status" className="rounded bg-pure-white p-8 font-normal text-deep-ink/70 shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]">No videos published yet.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => <VideoCard key={v.slug} video={v} />)}
          </div>
        )}
      </section>
    </main>
  );
}
