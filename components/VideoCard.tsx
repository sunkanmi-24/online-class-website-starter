import { Play } from "lucide-react";
import type { Video } from "@/data/videos";

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative flex aspect-video items-center justify-center bg-slate-900">
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
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-700" aria-hidden>
              <Play size={20} />
            </span>
            <span className="sr-only">Placeholder — {video.title}</span>
          </>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{video.category} · {video.date}</p>
        <h3 className="mt-2 font-bold text-slate-900">{video.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{video.description}</p>
        <p className="mt-2 text-xs text-slate-400">Duration: {video.duration}</p>
      </div>
    </article>
  );
}
