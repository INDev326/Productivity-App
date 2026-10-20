import type { Assignment, Course, Exam, GpaScale } from "./types";

const LETTERS_4: { min: number; letter: string; gpa: number }[] = [
  { min: 93, letter: "A", gpa: 4.0 },
  { min: 90, letter: "A-", gpa: 3.7 },
  { min: 87, letter: "B+", gpa: 3.3 },
  { min: 83, letter: "B", gpa: 3.0 },
  { min: 80, letter: "B-", gpa: 2.7 },
  { min: 77, letter: "C+", gpa: 2.3 },
  { min: 73, letter: "C", gpa: 2.0 },
  { min: 70, letter: "C-", gpa: 1.7 },
  { min: 67, letter: "D+", gpa: 1.3 },
  { min: 63, letter: "D", gpa: 1.0 },
  { min: 60, letter: "D-", gpa: 0.7 },
  { min: 0, letter: "F", gpa: 0 },
];

export function letterFromPercent(pct: number) {
  return LETTERS_4.find((r) => pct >= r.min)?.letter ?? "F";
}

export function percentToGpa(pct: number, scale: GpaScale) {
  if (scale === 10) return Math.round((pct / 10) * 10) / 10;
  const base = LETTERS_4.find((r) => pct >= r.min)?.gpa ?? 0;
  if (scale === 5) return Math.round(base * 1.25 * 100) / 100;
  return base;
}

export type GradedItem = { weight: number; score?: number };

export function weightedPercent(items: GradedItem[]): number | null {
  const scored = items.filter((i) => typeof i.score === "number");
  if (!scored.length) return null;
  const w = scored.reduce((s, i) => s + i.weight, 0);
  if (w <= 0) return null;
  return scored.reduce((s, i) => s + i.weight * (i.score as number), 0) / w;
}

export function remainingWeight(items: GradedItem[]) {
  const used = items.filter((i) => typeof i.score === "number").reduce((s, i) => s + i.weight, 0);
  return Math.max(0, 100 - used);
}

export function courseItems(
  courseId: string,
  assignments: Assignment[],
  exams: Exam[],
): GradedItem[] {
  return [
    ...assignments.filter((a) => a.courseId === courseId),
    ...exams.filter((e) => e.courseId === courseId),
  ];
}

export function coursePercent(courseId: string, assignments: Assignment[], exams: Exam[]) {
  return weightedPercent(courseItems(courseId, assignments, exams));
}

export function termGpa(
  courses: Course[],
  assignments: Assignment[],
  exams: Exam[],
  scale: GpaScale,
): number | null {
  let points = 0;
  let credits = 0;
  for (const c of courses) {
    const pct = coursePercent(c.id, assignments, exams);
    if (pct == null) continue;
    points += percentToGpa(pct, scale) * c.credits;
    credits += c.credits;
  }
  if (!credits) return null;
  return Math.round((points / credits) * 100) / 100;
}

export function formatGpa(n: number | null, scale: GpaScale) {
  if (n == null) return "—";
  const digits = scale === 10 ? 1 : 2;
  return n.toFixed(digits);
}

export function neededForTarget(
  current: number | null,
  remaining: number,
  target: number,
): number | null {
  if (remaining <= 0) return current;
  const have = current ?? 0;
  const haveW = 100 - remaining;
  const need = (target * 100 - have * haveW) / remaining;
  return Math.round(need * 10) / 10;
}
