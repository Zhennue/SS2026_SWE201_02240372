import { MenuItem, PlannerItem, ProfileSetting } from "../navigation/types";

export const QUICK_STATS = [
  { label: "Tasks", value: "08", tone: "#e76f51" },
  { label: "Classes", value: "05", tone: "#2a9d8f" },
  { label: "Focus", value: "92%", tone: "#264653" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "checklist",
    title: "Assignment Checklist",
    subtitle: "What to finish before the deadline",
    details:
      "Keep the remaining steps visible so nothing disappears into the background when the week gets busy.",
    time: "Due tonight",
    accent: "#2a9d8f",
    icon: "checkbox-outline",
    checklist: [
      "Revise requirements",
      "Capture screenshots",
      "Export PDF report",
    ],
  },
  {
    id: "study",
    title: "Study Sprint",
    subtitle: "A short focus session for SWE201",
    details:
      "Break the work into one clean 25-minute session and one 10-minute review so the app feels like a real routine tool.",
    time: "25 min",
    accent: "#e76f51",
    icon: "timer-outline",
    checklist: [
      "Open notes",
      "Draft the next section",
      "Mark one progress win",
    ],
  },
  {
    id: "campus",
    title: "Campus Support",
    subtitle: "The people you tap first when you are stuck",
    details:
      "This item keeps the app grounded in real student life by showing who to contact and what they help with.",
    time: "Always available",
    accent: "#264653",
    icon: "people-outline",
    checklist: ["IT help", "Library desk", "Student office"],
  },
];

export const PLANNER_ITEMS: PlannerItem[] = [
  {
    id: "monday",
    day: "Monday",
    title: "Lecture review and planning",
    time: "09:00 - 11:00",
    location: "Library lounge",
    accent: "#264653",
  },
  {
    id: "wednesday",
    day: "Wednesday",
    title: "Assignment drafting session",
    time: "13:30 - 15:00",
    location: "Project room 2",
    accent: "#2a9d8f",
  },
  {
    id: "friday",
    day: "Friday",
    title: "Submission polish and export",
    time: "16:00 - 17:00",
    location: "Dorm desk",
    accent: "#e76f51",
  },
];

export const PROFILE_SETTINGS: ProfileSetting[] = [
  {
    label: "Study mode",
    value: "Focus blocks on",
    note: "Keeps the interface quiet when you open the app at night.",
  },
  {
    label: "Reminder style",
    value: "Gentle nudges",
    note: "A soft approach instead of noisy alerts.",
  },
  {
    label: "Theme",
    value: "Warm campus",
    note: "A calmer visual system that feels like a product, not a template.",
  },
];

export const PROFILE_TAGS = [
  "SWE201",
  "Semester 4",
  "Productivity",
  "On track",
];
