import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Sheet } from "@/components/ui/sheet";
import {
  COURSE_TINTS,
  TINT_CLASS,
  type Assignment,
  type ClassSlot,
  type Course,
  type Deck,
  type Exam,
  type ExamType,
  type FlashCard,
  type Goal,
  type Note,
  type Priority,
} from "@/lib/types";
import { WEEKDAYS } from "@/lib/format";
import {
  makeAssignment,
  makeCourse,
  makeDeck,
  makeExam,
  makeFlash,
  makeGoal,
  makeNote,
  makeSlot,
  useFolio,
} from "@/lib/store";
import { cn } from "@/lib/utils";

export type ComposerKind =
  | { type: "course"; value?: Course }
  | { type: "assignment"; value?: Assignment; courseId?: string }
  | { type: "exam"; value?: Exam; courseId?: string }
  | { type: "slot"; value?: ClassSlot; courseId?: string }
  | { type: "note"; value?: Note; courseId?: string }
  | { type: "deck"; value?: Deck; courseId?: string }
  | { type: "card"; value?: FlashCard; deckId: string }
  | { type: "goal"; value?: Goal };

const TITLES: Record<ComposerKind["type"], string> = {
  course: "Course",
  assignment: "Assignment",
  exam: "Exam",
  slot: "Class block",
  note: "Note",
  deck: "Deck",
  card: "Card",
  goal: "Goal",
};

function isoToLocal(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function Composer({ kind, onClose }: { kind: ComposerKind | null; onClose: () => void }) {
  if (!kind) return null;
  return (
    <Sheet
      open
      onOpenChange={(o) => !o && onClose()}
      title={
        kind.value
          ? `Edit ${TITLES[kind.type].toLowerCase()}`
          : `New ${TITLES[kind.type].toLowerCase()}`
      }
    >
      {kind.type === "course" ? <CourseForm initial={kind.value} onDone={onClose} /> : null}
      {kind.type === "assignment" ? (
        <AssignmentForm initial={kind.value} courseId={kind.courseId} onDone={onClose} />
      ) : null}
      {kind.type === "exam" ? (
        <ExamForm initial={kind.value} courseId={kind.courseId} onDone={onClose} />
      ) : null}
      {kind.type === "slot" ? (
        <SlotForm initial={kind.value} courseId={kind.courseId} onDone={onClose} />
      ) : null}
      {kind.type === "note" ? (
        <NoteForm initial={kind.value} courseId={kind.courseId} onDone={onClose} />
      ) : null}
      {kind.type === "deck" ? (
        <DeckForm initial={kind.value} courseId={kind.courseId} onDone={onClose} />
      ) : null}
      {kind.type === "card" ? (
        <CardForm initial={kind.value} deckId={kind.deckId} onDone={onClose} />
      ) : null}
      {kind.type === "goal" ? <GoalForm initial={kind.value} onDone={onClose} /> : null}
    </Sheet>
  );
}

function Actions({
  onSave,
  onDelete,
  saveLabel = "Save",
}: {
  onSave: () => void;
  onDelete?: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="mt-5 flex gap-2 pb-2">
      {onDelete ? (
        <Button type="button" variant="ghost" className="text-danger" onClick={onDelete}>
          Delete
        </Button>
      ) : null}
      <Button type="button" className="ml-auto min-w-28" onClick={onSave}>
        {saveLabel}
      </Button>
    </div>
  );
}

function CourseSelect({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const courses = useFolio((s) => s.courses);
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {courses.map((c) => (
        <option key={c.id} value={c.id}>
          {c.code} — {c.name}
        </option>
      ))}
    </Select>
  );
}

function CourseForm({ initial, onDone }: { initial?: Course; onDone: () => void }) {
  const save = useFolio((s) => s.saveCourse);
  const remove = useFolio((s) => s.removeCourse);
  const [c, setC] = useState(() => initial ?? makeCourse());
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Code" className="col-span-1">
          <Input
            value={c.code}
            onChange={(e) => setC({ ...c, code: e.target.value })}
            placeholder="CS 301"
          />
        </Field>
        <Field label="Name" className="col-span-2">
          <Input
            value={c.name}
            onChange={(e) => setC({ ...c, name: e.target.value })}
            placeholder="Design of Algorithms"
          />
        </Field>
      </div>
      <Field label="Instructor">
        <Input value={c.instructor} onChange={(e) => setC({ ...c, instructor: e.target.value })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Credits">
          <Input
            type="number"
            min={1}
            max={8}
            value={c.credits}
            onChange={(e) => setC({ ...c, credits: Number(e.target.value) || 0 })}
          />
        </Field>
        <Field label="Room">
          <Input value={c.room} onChange={(e) => setC({ ...c, room: e.target.value })} />
        </Field>
      </div>
      <Field label="Target grade %">
        <Input
          type="number"
          min={0}
          max={100}
          value={c.targetGrade}
          onChange={(e) => setC({ ...c, targetGrade: Number(e.target.value) || 0 })}
        />
      </Field>
      <Field label="Color">
        <div className="flex flex-wrap gap-2">
          {COURSE_TINTS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setC({ ...c, tint: t })}
              className={cn(
                "size-9 rounded-full border-2",
                TINT_CLASS[t].solid,
                c.tint === t ? "border-fg" : "border-transparent",
              )}
              aria-label={t}
            />
          ))}
        </div>
      </Field>
      <Actions
        onSave={() => {
          if (!c.name.trim() && !c.code.trim()) return;
          save(c);
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(c.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}

function AssignmentForm({
  initial,
  courseId,
  onDone,
}: {
  initial?: Assignment;
  courseId?: string;
  onDone: () => void;
}) {
  const courses = useFolio((s) => s.courses);
  const save = useFolio((s) => s.saveAssignment);
  const remove = useFolio((s) => s.removeAssignment);
  const fallback = courses[0]?.id ?? "";
  const [a, setA] = useState(() => initial ?? makeAssignment(courseId || fallback));
  return (
    <div className="space-y-3">
      <Field label="Title">
        <Input value={a.title} onChange={(e) => setA({ ...a, title: e.target.value })} />
      </Field>
      <Field label="Course">
        <CourseSelect value={a.courseId} onChange={(id) => setA({ ...a, courseId: id })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Due">
          <Input
            type="datetime-local"
            value={isoToLocal(a.dueAt)}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) return;
              const d = new Date(val);
              if (!isNaN(d.getTime())) setA({ ...a, dueAt: d.toISOString() });
            }}
          />
        </Field>
        <Field label="Weight %">
          <Input
            type="number"
            min={0}
            max={100}
            value={a.weight}
            onChange={(e) => setA({ ...a, weight: Number(e.target.value) || 0 })}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Priority">
          <Select
            value={a.priority}
            onChange={(e) => setA({ ...a, priority: e.target.value as Priority })}
          >
            <option value="low">Low</option>
            <option value="med">Medium</option>
            <option value="high">High</option>
          </Select>
        </Field>
        <Field label="Status">
          <Select
            value={a.status}
            onChange={(e) => setA({ ...a, status: e.target.value as Assignment["status"] })}
          >
            <option value="todo">To do</option>
            <option value="doing">In progress</option>
            <option value="done">Done</option>
          </Select>
        </Field>
      </div>
      <Field label="Score (optional)">
        <Input
          type="number"
          min={0}
          max={100}
          placeholder="Ungraded"
          value={a.score ?? ""}
          onChange={(e) =>
            setA({ ...a, score: e.target.value === "" ? undefined : Number(e.target.value) })
          }
        />
      </Field>
      <Field label="Notes">
        <Textarea value={a.notes} onChange={(e) => setA({ ...a, notes: e.target.value })} />
      </Field>
      <Actions
        onSave={() => {
          if (!a.title.trim()) return;
          save(a);
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(a.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}

function ExamForm({
  initial,
  courseId,
  onDone,
}: {
  initial?: Exam;
  courseId?: string;
  onDone: () => void;
}) {
  const courses = useFolio((s) => s.courses);
  const save = useFolio((s) => s.saveExam);
  const remove = useFolio((s) => s.removeExam);
  const fallback = courses[0]?.id ?? "";
  const [e, setE] = useState(() => initial ?? makeExam(courseId || fallback));
  return (
    <div className="space-y-3">
      <Field label="Title">
        <Input value={e.title} onChange={(ev) => setE({ ...e, title: ev.target.value })} />
      </Field>
      <Field label="Course">
        <CourseSelect value={e.courseId} onChange={(id) => setE({ ...e, courseId: id })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Type">
          <Select
            value={e.type}
            onChange={(ev) => setE({ ...e, type: ev.target.value as ExamType })}
          >
            <option value="quiz">Quiz</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
            <option value="lab">Lab exam</option>
            <option value="presentation">Presentation</option>
          </Select>
        </Field>
        <Field label="Weight %">
          <Input
            type="number"
            value={e.weight}
            onChange={(ev) => setE({ ...e, weight: Number(ev.target.value) || 0 })}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Starts">
          <Input
            type="datetime-local"
            value={isoToLocal(e.startsAt)}
            onChange={(ev) => {
              const val = ev.target.value;
              if (!val) return;
              const d = new Date(val);
              if (!isNaN(d.getTime())) setE({ ...e, startsAt: d.toISOString() });
            }}
          />
        </Field>
        <Field label="Location">
          <Input value={e.location} onChange={(ev) => setE({ ...e, location: ev.target.value })} />
        </Field>
      </div>
      <Field label="Score (optional)">
        <Input
          type="number"
          placeholder="Ungraded"
          value={e.score ?? ""}
          onChange={(ev) =>
            setE({ ...e, score: ev.target.value === "" ? undefined : Number(ev.target.value) })
          }
        />
      </Field>
      <Field label="Notes">
        <Textarea value={e.notes} onChange={(ev) => setE({ ...e, notes: ev.target.value })} />
      </Field>
      <Actions
        onSave={() => {
          if (!e.title.trim()) return;
          save(e);
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(e.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}

function SlotForm({
  initial,
  courseId,
  onDone,
}: {
  initial?: ClassSlot;
  courseId?: string;
  onDone: () => void;
}) {
  const courses = useFolio((s) => s.courses);
  const save = useFolio((s) => s.saveSlot);
  const remove = useFolio((s) => s.removeSlot);
  const fallback = courses[0]?.id ?? "";
  const [s, setS] = useState(() => initial ?? makeSlot(courseId || fallback));
  return (
    <div className="space-y-3">
      <Field label="Course">
        <CourseSelect value={s.courseId} onChange={(id) => setS({ ...s, courseId: id })} />
      </Field>
      <Field label="Day">
        <Select value={String(s.day)} onChange={(e) => setS({ ...s, day: Number(e.target.value) })}>
          {WEEKDAYS.map((d, i) => (
            <option key={d} value={i}>
              {d}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start">
          <Input
            type="time"
            value={s.start}
            onChange={(e) => setS({ ...s, start: e.target.value })}
          />
        </Field>
        <Field label="End">
          <Input type="time" value={s.end} onChange={(e) => setS({ ...s, end: e.target.value })} />
        </Field>
      </div>
      <Field label="Room">
        <Input value={s.room} onChange={(e) => setS({ ...s, room: e.target.value })} />
      </Field>
      <Actions
        onSave={() => {
          save(s);
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(s.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}

function NoteForm({
  initial,
  courseId,
  onDone,
}: {
  initial?: Note;
  courseId?: string;
  onDone: () => void;
}) {
  const save = useFolio((s) => s.saveNote);
  const remove = useFolio((s) => s.removeNote);
  const courses = useFolio((s) => s.courses);
  const [n, setN] = useState(() => initial ?? makeNote(courseId));
  return (
    <div className="space-y-3">
      <Field label="Title">
        <Input value={n.title} onChange={(e) => setN({ ...n, title: e.target.value })} />
      </Field>
      <Field label="Course">
        <Select
          value={n.courseId ?? ""}
          onChange={(e) => setN({ ...n, courseId: e.target.value || undefined })}
        >
          <option value="">None</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Body">
        <Textarea
          className="min-h-40"
          value={n.body}
          onChange={(e) => setN({ ...n, body: e.target.value })}
        />
      </Field>
      <Actions
        onSave={() => {
          if (!n.title.trim()) return;
          save({ ...n, updatedAt: new Date().toISOString() });
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(n.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}

function DeckForm({
  initial,
  courseId,
  onDone,
}: {
  initial?: Deck;
  courseId?: string;
  onDone: () => void;
}) {
  const save = useFolio((s) => s.saveDeck);
  const remove = useFolio((s) => s.removeDeck);
  const courses = useFolio((s) => s.courses);
  const [d, setD] = useState(() => initial ?? makeDeck(courseId));
  return (
    <div className="space-y-3">
      <Field label="Name">
        <Input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
      </Field>
      <Field label="Course">
        <Select
          value={d.courseId ?? ""}
          onChange={(e) => setD({ ...d, courseId: e.target.value || undefined })}
        >
          <option value="">None</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}
            </option>
          ))}
        </Select>
      </Field>
      <Actions
        onSave={() => {
          if (!d.name.trim()) return;
          save(d);
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(d.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}

function CardForm({
  initial,
  deckId,
  onDone,
}: {
  initial?: FlashCard;
  deckId: string;
  onDone: () => void;
}) {
  const save = useFolio((s) => s.saveCard);
  const remove = useFolio((s) => s.removeCard);
  const [c, setC] = useState(() => initial ?? makeFlash(deckId));
  return (
    <div className="space-y-3">
      <Field label="Front">
        <Textarea value={c.front} onChange={(e) => setC({ ...c, front: e.target.value })} />
      </Field>
      <Field label="Back">
        <Textarea value={c.back} onChange={(e) => setC({ ...c, back: e.target.value })} />
      </Field>
      <Actions
        onSave={() => {
          if (!c.front.trim() || !c.back.trim()) return;
          save(c);
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(c.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}

function GoalForm({ initial, onDone }: { initial?: Goal; onDone: () => void }) {
  const save = useFolio((s) => s.saveGoal);
  const remove = useFolio((s) => s.removeGoal);
  const courses = useFolio((s) => s.courses);
  const [g, setG] = useState(() => initial ?? makeGoal());
  return (
    <div className="space-y-3">
      <Field label="Title">
        <Input value={g.title} onChange={(e) => setG({ ...g, title: e.target.value })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Kind">
          <Select
            value={g.kind}
            onChange={(e) => setG({ ...g, kind: e.target.value as Goal["kind"] })}
          >
            <option value="hours">Study hours</option>
            <option value="grade">Course grade</option>
            <option value="cards">Cards reviewed</option>
          </Select>
        </Field>
        <Field label="Target">
          <Input
            type="number"
            value={g.target}
            onChange={(e) => setG({ ...g, target: Number(e.target.value) || 0 })}
          />
        </Field>
      </div>
      <Field label="Period">
        <Select
          value={g.period}
          onChange={(e) => setG({ ...g, period: e.target.value as Goal["period"] })}
        >
          <option value="week">This week</option>
          <option value="term">This term</option>
        </Select>
      </Field>
      {g.kind === "grade" ? (
        <Field label="Course">
          <Select
            value={g.courseId ?? ""}
            onChange={(e) => setG({ ...g, courseId: e.target.value || undefined })}
          >
            <option value="">Select</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}
              </option>
            ))}
          </Select>
        </Field>
      ) : null}
      <Actions
        onSave={() => {
          if (!g.title.trim()) return;
          save(g);
          onDone();
        }}
        onDelete={
          initial
            ? () => {
                remove(g.id);
                onDone();
              }
            : undefined
        }
      />
    </div>
  );
}
