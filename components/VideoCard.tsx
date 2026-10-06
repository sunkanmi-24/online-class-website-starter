import { Play } from "lucide-react";
import type { Video } from "@/data/videos";

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="bg-pure-white">
      <div className="relative flex aspect-video items-center justify-center bg-carbon">
        {video.embedUrl ? (
          <iframe
            src={video.embedUrl}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pure-white text-ink-black" aria-hidden>
              <Play size={20} />
            </span>
            <span className="sr-only">Placeholder — {video.title}</span>
          </>
        )}
      </div>
      <div className="pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.28px] text-steel">{video.category} · {video.date}</p>
        <h3 className="mt-2 text-xl font-medium leading-snug tracking-[-0.12px] text-ink-black">{video.title}</h3>
        <p className="mt-2 text-sm font-normal leading-relaxed text-slate">{video.description}</p>
        <p className="mt-2 text-[11px] tracking-[0.28px] text-silver">Duration: {video.duration}</p>
      </div>
    </article>
  );
}
