export interface Video {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
  /** YouTube/Vimeo embed URL — leave empty until real videos are provided. */
  embedUrl: string;
}

export const videos: Video[] = [
  { slug: "intro", title: "Video Title — Introduction to the Subject", description: "Add video description here.", category: "Intro", date: "Sample date", duration: "Add duration", embedUrl: "" },
  { slug: "practical", title: "Video Title — A Practical Lesson", description: "Add video description here.", category: "Lesson", date: "Sample date", duration: "Add duration", embedUrl: "" },
  { slug: "mistakes", title: "Video Title — Common Mistakes to Avoid", description: "Add video description here.", category: "Tips", date: "Sample date", duration: "Add duration", embedUrl: "" },
  { slug: "highlight", title: "Video Title — Live Class Highlight", description: "Add video description here.", category: "Live", date: "Sample date", duration: "Add duration", embedUrl: "" },
  { slug: "qa", title: "Video Title — Student Q&A", description: "Add video description here.", category: "Q&A", date: "Sample date", duration: "Add duration", embedUrl: "" },
  { slug: "latest", title: "Video Title — Latest Teaching Session", description: "Add video description here.", category: "Lesson", date: "Sample date", duration: "Add duration", embedUrl: "" },
];

export const videoCategories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];
