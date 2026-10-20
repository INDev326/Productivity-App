import { addDays, isSameDay, parseISO, startOfDay } from "date-fns";
import type { Assignment, ClassSlot, Course, Exam, FlashCard, Goal, StudySession } from "./types";
import { dayKey, jsDayToMonIndex, mondayOf, todayKey } from "./format";
import { isDue } from "./srs";

export function minutesOnDay(sessions: StudySession[], day: Date) {
  return sessions
    .filter((s) => isSameDay(parseISO(s.startedAt), day))
    .reduce((n, s) => n + s.durationMin, 0);
}

export function minutesThisWeek(sessions: StudySession[], from = mondayOf()) {
  const end = addDays(from, 7);
  return sessions
    .filter((s) => {
      const t = parseISO(s.startedAt);
      return t >= from && t < end;
    })
    .reduce((n, s) => n + s.durationMin, 0);
}

export function streakDays(sessions: StudySession[], now = new Date()) {
  const keys = new Set(sessions.map((s) => dayKey(parseISO(s.startedAt))));
  let cursor = startOfDay(now);
  if (!keys.has(dayKey(cursor))) {
    cursor = addDays(cursor, -1);
  }
  let n = 0;
  while (keys.has(dayKey(cursor))) {
    n += 1;
    cursor = addDays(cursor, -1);
  }
  return n;
}

export function lastNDays(sessions: StudySession[], n = 7, now = new Date()) {
  return Array.from({ length: n }, (_, i) => {
    const d = addDays(startOfDay(now), -(n - 1 - i));
    return { date: d, minutes: minutesOnDay(sessions, d), key: dayKey(d) };
  });
}

export function minutesByCourse(sessions: StudySession[]) {
  const map = new Map<string, number>();
  for (const s of sessions) {
    const k = s.courseId ?? "_none";
    map.set(k, (map.get(k) ?? 0) + s.durationMin);
  }
  return map;
}

export function upcomingAssignments(assignments: Assignment[], withinDays = 14) {
  const now = Date.now();
  const until = now + withinDays * 86400000;
  return assignments
    .filter((a) => a.status !== "done")
    .filter((a) => {
      const t = new Date(a.dueAt).getTime();
      return t <= until;
    })
    .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt));
}

export function upcomingExams(exams: Exam[], withinDays = 45) {
  const now = Date.now();
  const until = now + withinDays * 86400000;
  return exams
    .filter((e) => typeof e.score !== "number")
    .filter((e) => {
      const t = new Date(e.startsAt).getTime();
      return t >= now - 86400000 && t <= until;
    })
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

export function overdueCount(assignments: Assignment[]) {
  const now = Date.now();
  return assignments.filter((a) => a.status !== "done" && +new Date(a.dueAt) < now).length;
}

export function todaySlots(slots: ClassSlot[]) {
  const idx = jsDayToMonIndex(new Date().getDay());
  return slots.filter((s) => s.day === idx).sort((a, b) => a.start.localeCompare(b.start));
}

export function courseById(courses: Course[], id?: string) {
  return courses.find((c) => c.id === id);
}

export function dueCards(cards: FlashCard[], deckId?: string) {
  return cards.filter((c) => (!deckId || c.deckId === deckId) && isDue(c));
}

export function goalProgress(
  goal: Goal,
  sessions: StudySession[],
  cards: FlashCard[],
  coursePct: number | null,
) {
  if (goal.kind === "hours") {
    const mins =
      goal.period === "week"
        ? minutesThisWeek(sessions)
        : sessions.reduce((n, s) => n + s.durationMin, 0);
    const hours = mins / 60;
    return { current: hours, ratio: Math.min(1, hours / goal.target) };
  }
  if (goal.kind === "cards") {
    const reviewed = cards.filter((c) => c.reps > 0).length;
    return { current: reviewed, ratio: Math.min(1, reviewed / goal.target) };
  }
  const pct = coursePct ?? 0;
  return { current: pct, ratio: goal.target ? Math.min(1, pct / goal.target) : 0 };
}

export function heatmap(sessions: StudySession[], weeks = 8, now = new Date()) {
  const end = startOfDay(now);
  const start = addDays(end, -(weeks * 7 - 1));
  const cells: { key: string; date: Date; minutes: number }[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = addDays(start, i);
    cells.push({ key: dayKey(d), date: d, minutes: minutesOnDay(sessions, d) });
  }
  return cells;
}

export function isTodayKey(key: string) {
  return key === todayKey();
}
