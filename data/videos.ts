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
  { slug: "intro", title: "Sample: 3 Tips on How to Study Effectively (TED-Ed)", description: "Sample video — replace with the instructor's own lesson. Explores how the brain learns and stores information.", category: "Study skills", date: "Sample entry", duration: "5:09", embedUrl: "https://www.youtube.com/embed/TjPFZaMe2yw" },
  { slug: "practical", title: "Sample: How to Practice Effectively (TED-Ed)", description: "Sample video — replace with the instructor's own lesson. What practice does to the brain and how to get the most from it.", category: "Practice", date: "Sample entry", duration: "4:49", embedUrl: "https://www.youtube.com/embed/f2O6mQkFiiw" },
  { slug: "mistakes", title: "Sample: Inside the Mind of a Master Procrastinator (TED)", description: "Sample video — replace with the instructor's own lesson. Tim Urban on procrastination and deadlines.", category: "Motivation", date: "Sample entry", duration: "14:03", embedUrl: "https://www.youtube.com/embed/arj7oStGLkU" },
  { slug: "highlight", title: "Video Title — Live Class Highlight", description: "Add video description here.", category: "Live", date: "Sample date", duration: "Add duration", embedUrl: "" },
  { slug: "qa", title: "Video Title — Student Q&A", description: "Add video description here.", category: "Q&A", date: "Sample date", duration: "Add duration", embedUrl: "" },
  { slug: "latest", title: "Video Title — Latest Teaching Session", description: "Add video description here.", category: "Lesson", date: "Sample date", duration: "Add duration", embedUrl: "" },
];

export const videoCategories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];
