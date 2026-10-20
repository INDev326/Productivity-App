import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { buildSeed, emptyData } from "./seed";
import { newCard, reviewCard, type RecallQuality } from "./srs";
import type {
  Assignment,
  ClassSlot,
  Course,
  Deck,
  Exam,
  FlashCard,
  FolioData,
  Goal,
  Note,
  Settings,
  StudySession,
} from "./types";
import { uid } from "./utils";

const STORAGE_KEY = "folio-v1";

function upsert<T extends { id: string }>(list: T[], item: T): T[] {
  const i = list.findIndex((x) => x.id === item.id);
  if (i === -1) return [...list, item];
  const next = list.slice();
  next[i] = item;
  return next;
}

type Persisted = FolioData & { initialized: boolean };

function readStorage(): Persisted | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Persisted;
  } catch {
    return null;
  }
}

function writeStorage(state: FolioState) {
  const data: Persisted = {
    initialized: state.initialized,
    courses: state.courses,
    assignments: state.assignments,
    exams: state.exams,
    slots: state.slots,
    sessions: state.sessions,
    notes: state.notes,
    decks: state.decks,
    cards: state.cards,
    goals: state.goals,
    settings: state.settings,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota */
  }
}

export type FolioState = FolioData & {
  initialized: boolean;
  saveCourse: (c: Course) => void;
  removeCourse: (id: string) => void;
  saveAssignment: (a: Assignment) => void;
  removeAssignment: (id: string) => void;
  saveExam: (e: Exam) => void;
  removeExam: (id: string) => void;
  saveSlot: (s: ClassSlot) => void;
  removeSlot: (id: string) => void;
  saveNote: (n: Note) => void;
  removeNote: (id: string) => void;
  saveDeck: (d: Deck) => void;
  removeDeck: (id: string) => void;
  saveCard: (c: FlashCard) => void;
  removeCard: (id: string) => void;
  saveGoal: (g: Goal) => void;
  removeGoal: (id: string) => void;
  logSession: (s: Omit<StudySession, "id"> & { id?: string }) => void;
  removeSession: (id: string) => void;
  review: (id: string, q: RecallQuality) => void;
  patchSettings: (p: Partial<Settings>) => void;
  loadSeed: () => void;
  resetAll: () => void;
};

export const useFolio = create<FolioState>()((set) => ({
  ...buildSeed(),
  initialized: true,
  saveCourse: (c) => set((s) => ({ courses: upsert(s.courses, c) })),
  removeCourse: (id) =>
    set((s) => ({
      courses: s.courses.filter((x) => x.id !== id),
      assignments: s.assignments.filter((x) => x.courseId !== id),
      exams: s.exams.filter((x) => x.courseId !== id),
      slots: s.slots.filter((x) => x.courseId !== id),
      notes: s.notes.map((n) => (n.courseId === id ? { ...n, courseId: undefined } : n)),
      decks: s.decks.map((d) => (d.courseId === id ? { ...d, courseId: undefined } : d)),
      sessions: s.sessions.map((x) => (x.courseId === id ? { ...x, courseId: undefined } : x)),
      goals: s.goals.map((g) => (g.courseId === id ? { ...g, courseId: undefined } : g)),
    })),
  saveAssignment: (a) => set((s) => ({ assignments: upsert(s.assignments, a) })),
  removeAssignment: (id) => set((s) => ({ assignments: s.assignments.filter((x) => x.id !== id) })),
  saveExam: (e) => set((s) => ({ exams: upsert(s.exams, e) })),
  removeExam: (id) => set((s) => ({ exams: s.exams.filter((x) => x.id !== id) })),
  saveSlot: (slot) => set((s) => ({ slots: upsert(s.slots, slot) })),
  removeSlot: (id) => set((s) => ({ slots: s.slots.filter((x) => x.id !== id) })),
  saveNote: (n) => set((s) => ({ notes: upsert(s.notes, n) })),
  removeNote: (id) => set((s) => ({ notes: s.notes.filter((x) => x.id !== id) })),
  saveDeck: (d) => set((s) => ({ decks: upsert(s.decks, d) })),
  removeDeck: (id) =>
    set((s) => ({
      decks: s.decks.filter((x) => x.id !== id),
      cards: s.cards.filter((c) => c.deckId !== id),
    })),
  saveCard: (c) => set((s) => ({ cards: upsert(s.cards, c) })),
  removeCard: (id) => set((s) => ({ cards: s.cards.filter((x) => x.id !== id) })),
  saveGoal: (g) => set((s) => ({ goals: upsert(s.goals, g) })),
  removeGoal: (id) => set((s) => ({ goals: s.goals.filter((x) => x.id !== id) })),
  logSession: (sess) =>
    set((s) => ({
      sessions: upsert(s.sessions, { id: sess.id ?? uid(), ...sess }),
    })),
  removeSession: (id) => set((s) => ({ sessions: s.sessions.filter((x) => x.id !== id) })),
  review: (id, q) =>
    set((s) => ({
      cards: s.cards.map((c) => (c.id === id ? reviewCard(c, q) : c)),
    })),
  patchSettings: (p) => set((s) => ({ settings: { ...s.settings, ...p } })),
  loadSeed: () => set(() => ({ ...buildSeed(), initialized: true })),
  resetAll: () => set(() => ({ ...emptyData(), initialized: true })),
}));

let booted = false;
export function bootFolio() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  const saved = readStorage();
  if (saved?.initialized && saved.courses) {
    useFolio.setState({
      courses: saved.courses ?? [],
      assignments: saved.assignments ?? [],
      exams: saved.exams ?? [],
      slots: saved.slots ?? [],
      sessions: saved.sessions ?? [],
      notes: saved.notes ?? [],
      decks: saved.decks ?? [],
      cards: saved.cards ?? [],
      goals: saved.goals ?? [],
      settings: { ...useFolio.getState().settings, ...saved.settings },
      initialized: true,
    });
  }
  useFolio.subscribe((s) => writeStorage(s));
}

export function makeCourse(): Course {
  return {
    id: uid(),
    name: "",
    code: "",
    instructor: "",
    credits: 3,
    tint: "forest",
    room: "",
    targetGrade: 90,
  };
}

export function makeAssignment(courseId: string): Assignment {
  const due = new Date();
  due.setDate(due.getDate() + 7);
  due.setHours(23, 59, 0, 0);
  return {
    id: uid(),
    courseId,
    title: "",
    notes: "",
    dueAt: due.toISOString(),
    status: "todo",
    priority: "med",
    weight: 10,
  };
}

export function makeExam(courseId: string): Exam {
  const starts = new Date();
  starts.setDate(starts.getDate() + 14);
  starts.setHours(9, 0, 0, 0);
  return {
    id: uid(),
    courseId,
    title: "",
    type: "midterm",
    startsAt: starts.toISOString(),
    location: "",
    notes: "",
    weight: 25,
  };
}

export function makeNote(courseId?: string): Note {
  return {
    id: uid(),
    courseId,
    title: "",
    body: "",
    updatedAt: new Date().toISOString(),
  };
}

export function makeDeck(courseId?: string): Deck {
  return { id: uid(), courseId, name: "" };
}

export function makeFlash(deckId: string, front = "", back = ""): FlashCard {
  return newCard({ id: uid(), deckId, front, back });
}

export function makeSlot(courseId: string): ClassSlot {
  return { id: uid(), courseId, day: 0, start: "09:00", end: "10:15", room: "" };
}

export function makeGoal(): Goal {
  return { id: uid(), title: "", kind: "hours", target: 10, period: "week" };
}

const alwaysTrue = () => true;

export function useHydratedFolio(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      bootFolio();
      onStoreChange();
      return useFolio.subscribe(onStoreChange);
    },
    alwaysTrue,
    alwaysTrue,
  );
}
