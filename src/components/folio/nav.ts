export type PlannerTab = "agenda" | "calendar" | "timetable";
export type LibraryTab = "courses" | "notes" | "cards";

export type Screen =
  | { name: "home" }
  | { name: "planner"; tab?: PlannerTab }
  | { name: "focus" }
  | { name: "library"; tab?: LibraryTab }
  | { name: "course"; id: string }
  | { name: "deck"; id: string }
  | { name: "more" }
  | { name: "grades" }
  | { name: "analytics" }
  | { name: "assistant" }
  | { name: "settings" };

export const TABS: { name: Screen["name"]; label: string }[] = [
  { name: "home", label: "Home" },
  { name: "planner", label: "Planner" },
  { name: "focus", label: "Focus" },
  { name: "library", label: "Library" },
  { name: "more", label: "More" },
];
