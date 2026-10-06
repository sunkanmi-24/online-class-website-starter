import { Play } from "lucide-react";
import type { Video } from "@/data/videos";

export function VideoCard({ video, dark = false }: { video: Video; dark?: boolean }) {
  return (
    <article className={`rounded p-4 ${dark ? "bg-charcoal-surface" : "bg-pure-white shadow-[rgba(0,0,0,0.1)_0px_2px_4px_0px]"}`}>
      <div className="relative flex aspect-video items-center justify-center rounded-t bg-studio-black">
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
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pure-white text-studio-black" aria-hidden>
              <Play size={20} />
            </span>
            <span className="sr-only">Placeholder — {video.title}</span>
          </>
        )}
      </div>
      <div className="pt-4">
        <p className="caps-label text-ash-mid">{video.category} · {video.date}</p>
        <h3 className={`mt-2 text-xl font-bold leading-snug ${dark ? "text-pure-white" : "text-deep-ink"}`}>{video.title}</h3>
        <p className={`mt-2 text-sm font-normal leading-relaxed ${dark ? "text-pure-white/70" : "text-deep-ink/70"}`}>{video.description}</p>
      </div>
    </article>
  );
}
