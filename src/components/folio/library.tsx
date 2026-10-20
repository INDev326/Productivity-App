import { ChevronLeft, Layers, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CourseChip, CourseDot, Empty, Ring, Section } from "./bits";
import { formatHours, formatShortDate } from "@/lib/format";
import {
  courseItems,
  coursePercent,
  formatGpa,
  letterFromPercent,
  neededForTarget,
  percentToGpa,
  remainingWeight,
} from "@/lib/gpa";
import { dueCards, minutesByCourse } from "@/lib/stats";
import { useFolio } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { RecallQuality } from "@/lib/srs";
import type { ComposerKind } from "./forms";
import type { LibraryTab, Screen } from "./nav";

export function Library({
  tab,
  setTab,
  go,
  compose,
}: {
  tab: LibraryTab;
  setTab: (t: LibraryTab) => void;
  go: (s: Screen) => void;
  compose: (k: ComposerKind) => void;
}) {
  const [q, setQ] = useState("");
  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Library</p>
          <h1 className="font-display text-3xl text-fg">Courses, notes, cards.</h1>
        </div>
        <Button
          size="icon-sm"
          onClick={() =>
            compose(
              tab === "notes"
                ? { type: "note" }
                : tab === "cards"
                  ? { type: "deck" }
                  : { type: "course" },
            )
          }
        >
          <Plus className="size-4" />
        </Button>
      </header>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the term" />
      <div className="flex gap-1 rounded-xl bg-surface-2 p-1">
        {(["courses", "notes", "cards"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "h-9 flex-1 rounded-lg text-sm font-medium capitalize",
              tab === t ? "bg-surface text-fg shadow-card" : "text-muted",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "courses" ? <Courses q={q} go={go} /> : null}
      {tab === "notes" ? <Notes q={q} compose={compose} /> : null}
      {tab === "cards" ? <Decks q={q} go={go} compose={compose} /> : null}
    </div>
  );
}

function Courses({ q, go }: { q: string; go: (s: Screen) => void }) {
  const courses = useFolio((s) => s.courses);
  const assignments = useFolio((s) => s.assignments);
  const exams = useFolio((s) => s.exams);
  const sessions = useFolio((s) => s.sessions);
  const settings = useFolio((s) => s.settings);
  const hours = minutesByCourse(sessions);
  const query = q.trim().toLowerCase();
  const list = courses.filter(
    (c) => !query || `${c.name} ${c.code} ${c.instructor}`.toLowerCase().includes(query),
  );

  if (!list.length) {
    return <Empty title="No courses" body="Add a course to start tracking the term." />;
  }

  return (
    <div className="space-y-2">
      {list.map((c) => {
        const pct = coursePercent(c.id, assignments, exams);
        return (
          <Card key={c.id} onClick={() => go({ name: "course", id: c.id })}>
            <div className="flex items-center gap-3">
              <CourseDot tint={c.tint} className="size-3" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted">
                  {c.code} · {c.credits} cr · {formatHours(hours.get(c.id) ?? 0)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium tabular">
                  {pct == null ? "—" : `${Math.round(pct)}%`}
                </p>
                <p className="text-[11px] text-muted">
                  {pct == null
                    ? "no grades"
                    : formatGpa(percentToGpa(pct, settings.gpaScale), settings.gpaScale)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function Notes({ q, compose }: { q: string; compose: (k: ComposerKind) => void }) {
  const notes = useFolio((s) => s.notes);
  const courses = useFolio((s) => s.courses);
  const query = q.trim().toLowerCase();
  const list = notes
    .filter((n) => !query || `${n.title} ${n.body}`.toLowerCase().includes(query))
    .slice()
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

  if (!list.length) return <Empty title="No notes" body="Capture a lecture, a proof, a draft." />;

  return (
    <div className="space-y-2">
      {list.map((n) => {
        const c = courses.find((x) => x.id === n.courseId);
        return (
          <Card key={n.id} onClick={() => compose({ type: "note", value: n })}>
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium">{n.title}</p>
              {c ? <CourseChip course={c} /> : null}
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{n.body}</p>
            <p className="mt-2 text-[11px] text-subtle">{formatShortDate(n.updatedAt)}</p>
          </Card>
        );
      })}
    </div>
  );
}

function Decks({
  q,
  go,
  compose,
}: {
  q: string;
  go: (s: Screen) => void;
  compose: (k: ComposerKind) => void;
}) {
  const decks = useFolio((s) => s.decks);
  const cards = useFolio((s) => s.cards);
  const courses = useFolio((s) => s.courses);
  const query = q.trim().toLowerCase();
  const list = decks.filter((d) => !query || d.name.toLowerCase().includes(query));
  if (!list.length)
    return (
      <Empty title="No decks" body="Make a deck, then add cards or ask the tutor to draft them." />
    );
  return (
    <div className="space-y-2">
      {list.map((d) => {
        const n = cards.filter((c) => c.deckId === d.id);
        const due = dueCards(n).length;
        const c = courses.find((x) => x.id === d.courseId);
        return (
          <Card key={d.id} onClick={() => go({ name: "deck", id: d.id })}>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <Layers className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{d.name}</p>
                <p className="text-xs text-muted">
                  {n.length} cards · {due} due {c ? `· ${c.code}` : ""}
                </p>
              </div>
              <button
                type="button"
                className="text-xs font-medium text-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  compose({ type: "card", deckId: d.id });
                }}
              >
                Add card
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function CourseDetail({
  id,
  go,
  compose,
}: {
  id: string;
  go: (s: Screen) => void;
  compose: (k: ComposerKind) => void;
}) {
  const course = useFolio((s) => s.courses.find((c) => c.id === id));
  const assignments = useFolio((s) => s.assignments.filter((a) => a.courseId === id));
  const exams = useFolio((s) => s.exams.filter((e) => e.courseId === id));
  const notes = useFolio((s) => s.notes.filter((n) => n.courseId === id));
  const decks = useFolio((s) => s.decks.filter((d) => d.courseId === id));
  const sessions = useFolio((s) => s.sessions);
  const settings = useFolio((s) => s.settings);
  if (!course) {
    return (
      <Empty
        title="Course missing"
        body="It may have been removed."
        action={
          <Button variant="secondary" onClick={() => go({ name: "library" })}>
            Back
          </Button>
        }
      />
    );
  }
  const pct = coursePercent(id, assignments, exams);
  const items = courseItems(id, assignments, exams);
  const rem = remainingWeight(items);
  const need = neededForTarget(pct, rem, course.targetGrade);
  const hours = (minutesByCourse(sessions).get(id) ?? 0) / 60;

  return (
    <div className="space-y-6">
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-muted"
        onClick={() => go({ name: "library", tab: "courses" })}
      >
        <ChevronLeft className="size-4" /> Library
      </button>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {course.code}
          </p>
          <h1 className="font-display text-3xl text-fg">{course.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {course.instructor} · {course.credits} credits · {course.room}
          </p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => compose({ type: "course", value: course })}
        >
          Edit
        </Button>
      </header>
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card">
        <Ring value={(pct ?? 0) / 100} size={72}>
          <span className="text-sm font-medium tabular">
            {pct == null ? "—" : `${Math.round(pct)}`}
          </span>
        </Ring>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">
            {pct == null
              ? "No graded work yet"
              : `${letterFromPercent(pct)} · ${formatGpa(percentToGpa(pct, settings.gpaScale), settings.gpaScale)} GPA`}
          </p>
          <p className="mt-1 text-xs text-muted">
            Target {course.targetGrade}%
            {need != null && rem > 0
              ? ` · need ${Math.max(0, need).toFixed(0)}% on remaining ${rem}%`
              : ""}
          </p>
          <p className="mt-1 text-xs text-subtle">{hours.toFixed(1)}h focused this term</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => compose({ type: "assignment", courseId: id })}
        >
          Assignment
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => compose({ type: "exam", courseId: id })}
        >
          Exam
        </Button>
      </div>
      <Section title="Work">
        <div className="space-y-2">
          {[...assignments, ...exams]
            .map((x) =>
              "dueAt" in x
                ? { at: x.dueAt, kind: "a" as const, x }
                : { at: x.startsAt, kind: "e" as const, x },
            )
            .sort((a, b) => +new Date(a.at) - +new Date(b.at))
            .map((row) =>
              row.kind === "a" ? (
                <Card key={row.x.id} onClick={() => compose({ type: "assignment", value: row.x })}>
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-medium">{row.x.title}</p>
                    <span className="text-xs tabular text-muted">
                      {typeof row.x.score === "number" ? `${row.x.score}%` : `${row.x.weight}%`}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{row.x.status}</p>
                </Card>
              ) : (
                <Card key={row.x.id} onClick={() => compose({ type: "exam", value: row.x })}>
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-medium">{row.x.title}</p>
                    <Badge tone="accent">{row.x.type}</Badge>
                  </div>
                </Card>
              ),
            )}
        </div>
      </Section>
      <Section
        title="Notes"
        action={
          <button
            type="button"
            className="text-xs font-medium text-accent"
            onClick={() => compose({ type: "note", courseId: id })}
          >
            Add
          </button>
        }
      >
        {notes.length === 0 ? (
          <p className="text-sm text-muted">No notes for this course.</p>
        ) : (
          <div className="space-y-2">
            {notes.map((n) => (
              <Card key={n.id} onClick={() => compose({ type: "note", value: n })}>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="line-clamp-2 text-sm text-muted">{n.body}</p>
              </Card>
            ))}
          </div>
        )}
      </Section>
      {decks.length > 0 ? (
        <Section title="Decks">
          <div className="space-y-2">
            {decks.map((d) => (
              <Card key={d.id} onClick={() => go({ name: "deck", id: d.id })}>
                <p className="text-sm font-medium">{d.name}</p>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}

export function DeckStudy({
  id,
  go,
  compose,
}: {
  id: string;
  go: (s: Screen) => void;
  compose: (k: ComposerKind) => void;
}) {
  const deck = useFolio((s) => s.decks.find((d) => d.id === id));
  const cards = useFolio((s) => s.cards.filter((c) => c.deckId === id));
  const review = useFolio((s) => s.review);
  const queue = useMemo(() => dueCards(cards), [cards]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = queue[i];

  function grade(q: RecallQuality) {
    if (!card) return;
    review(card.id, q);
    setFlipped(false);
    setI(0);
  }

  if (!deck) {
    return (
      <Empty
        title="Deck missing"
        body="It may have been removed."
        action={
          <Button variant="secondary" onClick={() => go({ name: "library", tab: "cards" })}>
            Back
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-muted"
        onClick={() => go({ name: "library", tab: "cards" })}
      >
        <ChevronLeft className="size-4" /> Library
      </button>
      <header className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Flashcards</p>
          <h1 className="font-display text-3xl">{deck.name}</h1>
          <p className="text-sm text-muted">
            {queue.length} due · {cards.length} total
          </p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => compose({ type: "card", deckId: id })}>
          Add
        </Button>
      </header>
      <Progress value={cards.length ? (cards.length - queue.length) / cards.length : 0} />
      {!card ? (
        <Empty
          title="Caught up"
          body="No cards are due. Add more, or come back tomorrow."
          action={
            <Button variant="secondary" onClick={() => compose({ type: "card", deckId: id })}>
              New card
            </Button>
          }
        />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="flex min-h-56 w-full flex-col justify-center rounded-3xl border border-border bg-surface p-6 text-left shadow-card"
          >
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
              {flipped ? "Answer" : "Prompt"}
            </p>
            <p className="mt-3 font-display text-2xl leading-snug">
              {flipped ? card.back : card.front}
            </p>
            <p className="mt-6 text-xs text-subtle">Tap to flip</p>
          </button>
          {flipped ? (
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  [1, "Again"],
                  [3, "Hard"],
                  [4, "Good"],
                  [5, "Easy"],
                ] as const
              ).map(([q, label]) => (
                <Button
                  key={q}
                  variant={q === 4 || q === 5 ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => grade(q)}
                >
                  {label}
                </Button>
              ))}
            </div>
          ) : (
            <Button variant="secondary" className="w-full" onClick={() => setFlipped(true)}>
              Show answer
            </Button>
          )}
        </>
      )}
      <Section title="All cards">
        <div className="space-y-2">
          {cards.map((c) => (
            <Card key={c.id} onClick={() => compose({ type: "card", value: c, deckId: id })}>
              <p className="text-sm font-medium line-clamp-1">{c.front}</p>
              <p className="text-xs text-muted">
                {c.reps} reviews · due {formatShortDate(c.dueAt)}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
