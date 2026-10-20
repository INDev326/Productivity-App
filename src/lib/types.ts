export const COURSE_TINTS = ["forest", "ocean", "slate", "moss", "clay", "dusk"] as const;

export type CourseTint = (typeof COURSE_TINTS)[number];

export type AssignmentStatus = "todo" | "doing" | "done";
export type Priority = "low" | "med" | "high";
export type ExamType = "quiz" | "midterm" | "final" | "lab" | "presentation";
export type SessionKind = "focus" | "review" | "class";
export type GoalKind = "hours" | "grade" | "cards";
export type GoalPeriod = "week" | "term";
export type GpaScale = 4 | 5 | 10;
export type ThemeMode = "light" | "dark" | "system";

export type Course = {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  tint: CourseTint;
  room: string;
  targetGrade: number;
};

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  notes: string;
  dueAt: string;
  status: AssignmentStatus;
  priority: Priority;
  weight: number;
  score?: number;
};

export type Exam = {
  id: string;
  courseId: string;
  title: string;
  type: ExamType;
  startsAt: string;
  location: string;
  notes: string;
  weight: number;
  score?: number;
};

export type ClassSlot = {
  id: string;
  courseId: string;
  day: number;
  start: string;
  end: string;
  room: string;
};

export type StudySession = {
  id: string;
  courseId?: string;
  startedAt: string;
  durationMin: number;
  kind: SessionKind;
};

export type Note = {
  id: string;
  courseId?: string;
  title: string;
  body: string;
  updatedAt: string;
};

export type Deck = {
  id: string;
  courseId?: string;
  name: string;
};

export type FlashCard = {
  id: string;
  deckId: string;
  front: string;
  back: string;
  ease: number;
  interval: number;
  dueAt: string;
  reps: number;
  lapses: number;
};

export type Goal = {
  id: string;
  title: string;
  kind: GoalKind;
  target: number;
  courseId?: string;
  period: GoalPeriod;
};

export type Settings = {
  name: string;
  school: string;
  major: string;
  gpaScale: GpaScale;
  pomodoroMin: number;
  breakMin: number;
  weeklyHourGoal: number;
  theme: ThemeMode;
};

export type FolioData = {
  courses: Course[];
  assignments: Assignment[];
  exams: Exam[];
  slots: ClassSlot[];
  sessions: StudySession[];
  notes: Note[];
  decks: Deck[];
  cards: FlashCard[];
  goals: Goal[];
  settings: Settings;
};

export const TINT_CLASS: Record<CourseTint, { text: string; soft: string; solid: string }> = {
  forest: {
    text: "text-tint-forest",
    soft: "bg-tint-forest/12",
    solid: "bg-tint-forest",
  },
  ocean: {
    text: "text-tint-ocean",
    soft: "bg-tint-ocean/12",
    solid: "bg-tint-ocean",
  },
  slate: {
    text: "text-tint-slate",
    soft: "bg-tint-slate/12",
    solid: "bg-tint-slate",
  },
  moss: {
    text: "text-tint-moss",
    soft: "bg-tint-moss/12",
    solid: "bg-tint-moss",
  },
  clay: {
    text: "text-tint-clay",
    soft: "bg-tint-clay/12",
    solid: "bg-tint-clay",
  },
  dusk: {
    text: "text-tint-dusk",
    soft: "bg-tint-dusk/12",
    solid: "bg-tint-dusk",
  },
};
