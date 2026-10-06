export interface ScheduleItem {
  id: string;
  day: string;
  date: string;
  time: string;
  classTitle: string;
  platform: string;
  note: string;
}

export const schedule: ScheduleItem[] = [
  { id: "s1", day: "Monday", date: "Sample date", time: "Add time + timezone", classTitle: "Class Title — Foundations", platform: "Add platform (e.g. Zoom)", note: "Sample entry — replace with real schedule." },
  { id: "s2", day: "Wednesday", date: "Sample date", time: "Add time + timezone", classTitle: "Class Title — Intermediate", platform: "Add platform", note: "Sample entry — replace with real schedule." },
  { id: "s3", day: "Saturday", date: "Sample date", time: "Add time + timezone", classTitle: "Class Title — Workshop", platform: "Add platform", note: "Sample entry — replace with real schedule." },
];
