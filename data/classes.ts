export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All levels";
export type ClassFormat = "Live online" | "Recorded" | "Workshop" | "1-on-1";

export interface Course {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  level: CourseLevel;
  duration: string;
  format: ClassFormat;
  schedule: string;
  price: string;
  thumbnailLabel: string;
  /** Image URL shown on the class card — replace with real class artwork. */
  thumbnailUrl: string;
}

export const classes: Course[] = [
  {
    slug: "foundations-class",
    title: "Class Title — Foundations",
    shortDescription: "Add class description: what students learn and who it is for.",
    fullDescription:
      "Add full class description here. Replace with curriculum, outcomes, session structure, and prerequisites once provided.",
    level: "Beginner",
    duration: "Add duration (e.g. 6 weeks)",
    format: "Live online",
    schedule: "Add schedule (e.g. sample: Mon & Wed)",
    price: "Add price",
    thumbnailLabel: "Sample thumbnail — replace with real class artwork",
    thumbnailUrl: "https://picsum.photos/seed/online-class-foundations/800/450",
  },
  {
    slug: "intermediate-class",
    title: "Class Title — Intermediate",
    shortDescription: "Add class description: skills covered and expected progress.",
    fullDescription:
      "Add full class description here. Replace with weekly topics, practice material, and assessment approach.",
    level: "Intermediate",
    duration: "Add duration",
    format: "Live online",
    schedule: "Add schedule",
    price: "Add price",
    thumbnailLabel: "Sample thumbnail — replace with real class artwork",
    thumbnailUrl: "https://picsum.photos/seed/online-class-intermediate/800/450",
  },
  {
    slug: "practical-workshop",
    title: "Class Title — Practical Workshop",
    shortDescription: "Add workshop description: focused practice and hands-on guidance.",
    fullDescription:
      "Add full workshop description here. Replace with agenda, materials needed, and format details.",
    level: "All levels",
    duration: "Add duration (e.g. single session)",
    format: "Workshop",
    schedule: "Add schedule",
    price: "Add price",
    thumbnailLabel: "Sample thumbnail — replace with real class artwork",
    thumbnailUrl: "https://picsum.photos/seed/online-class-workshop/800/450",
  },
];
