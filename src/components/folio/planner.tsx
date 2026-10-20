import {
  addDays,
  addMonths,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CourseChip, Empty, Section } from "./bits";
import { formatClock, formatDay, relativeDue, WEEKDAYS } from "@/lib/format";
import { courseById, upcomingAssignments, upcomingExams } from "@/lib/stats";
import { useFolio } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ComposerKind } from "./forms";
import type { PlannerTab, Screen } from "./nav";

export function Planner({
  tab,
  setTab,
  go,
  compose,
}: {
  tab: PlannerTab;
  setTab: (t: PlannerTab) => void;
  go: (s: Screen) => void;
  compose: (k: ComposerKind) => void;
}) {
  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Planner</p>
          <h1 className="font-display text-3xl text-fg">The week, in order.</h1>
        </div>
        <Button
          size="icon-sm"
          onClick={() =>
            compose({
              type: tab === "timetable" ? "slot" : tab === "agenda" ? "assignment" : "exam",
            })
          }
        >
          <Plus className="size-4" />
        </Button>
      </header>
      <div className="flex gap-1 rounded-xl bg-surface-2 p-1">
        {(["agenda", "calendar", "timetable"] as const).map((t) => (
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
      {tab === "agenda" ? <Agenda compose={compose} go={go} /> : null}
      {tab === "calendar" ? <Month compose={compose} /> : null}
      {tab === "timetable" ? <Timetable compose={compose} /> : null}
    </div>
  );
}

function Agenda({ compose, go }: { compose: (k: ComposerKind) => void; go: (s: Screen) => void }) {
  const assignments = useFolio((s) => s.assignments);
  const exams = useFolio((s) => s.exams);
  const courses = useFolio((s) => s.courses);
  const [filter, setFilter] = useState<"open" | "all" | "done">("open");

  const items = useMemo(() => {
    const a = (
      filter === "done"
        ? assignments.filter((x) => x.status === "done")
        : filter === "open"
          ? upcomingAssignments(assignments, 60)
          : assignments
    ).map((x) => ({ kind: "assignment" as const, at: x.dueAt, id: x.id, data: x }));
    const e = (
      filter === "done"
        ? exams.filter((x) => typeof x.score === "number")
        : upcomingExams(exams, 90)
    ).map((x) => ({
      kind: "exam" as const,
      at: x.startsAt,
      id: x.id,
      data: x,
    }));
    return [...a, ...e].sort((x, y) => +new Date(x.at) - +new Date(y.at));
  }, [assignments, exams, filter]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const it of items) {
      const k = formatDay(it.at);
      const list = map.get(k) ?? [];
      list.push(it);
      map.set(k, list);
    }
    return [...map.entries()];
  }, [items]);

  return (
    <div className="space-y-5">
      <div className="flex gap-1.5">
        {(["open", "all", "done"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "h-8 rounded-full px-3 text-xs font-medium capitalize",
              filter === f ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      {groups.length === 0 ? (
        <Empty title="Quiet calendar" body="Add an assignment or exam to fill the agenda." />
      ) : (
        groups.map(([day, list]) => (
          <Section key={day} title={day}>
            <div className="space-y-2">
              {list.map((it) => {
                if (it.kind === "assignment") {
                  const a = it.data;
                  const c = courseById(courses, a.courseId);
                  const late = a.status !== "done" && +new Date(a.dueAt) < Date.now();
                  return (
                    <Card key={a.id} onClick={() => compose({ type: "assignment", value: a })}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{a.title}</p>
                          <p className="mt-0.5 text-xs text-muted">
                            {c?.code} · {relativeDue(a.dueAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {c ? <CourseChip course={c} /> : null}
                          <Badge
                            tone={
                              late
                                ? "danger"
                                : a.status === "done"
                                  ? "ok"
                                  : a.priority === "high"
                                    ? "warn"
                                    : "muted"
                            }
                          >
                            {a.status === "done" ? "Done" : late ? "Late" : a.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  );
                }
                const e = it.data;
                const c = courseById(courses, e.courseId);
                return (
                  <Card key={e.id} onClick={() => compose({ type: "exam", value: e })}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{e.title}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {c?.code} · {formatClock(e.startsAt)} · {e.location}
                        </p>
                      </div>
                      <Badge tone="accent">{e.type}</Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Section>
        ))
      )}
      <Button variant="secondary" className="w-full" onClick={() => go({ name: "grades" })}>
        Open gradebook
      </Button>
    </div>
  );
}

function Month({ compose }: { compose: (k: ComposerKind) => void }) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const assignments = useFolio((s) => s.assignments);
  const exams = useFolio((s) => s.exams);
  const courses = useFolio((s) => s.courses);
  const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
  const end = addDays(start, 41);
  const days = eachDayOfInterval({ start, end });
  const [selected, setSelected] = useState(() => new Date());

  const marks = (d: Date) => {
    const a = assignments.filter((x) => isSameDay(new Date(x.dueAt), d));
    const e = exams.filter((x) => isSameDay(new Date(x.startsAt), d));
    return { a, e };
  };

  const sel = marks(selected);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">{format(cursor, "MMMM yyyy")}</h2>
        <div className="flex gap-1">
          <Button size="icon-sm" variant="ghost" onClick={() => setCursor(addMonths(cursor, -1))}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button size="icon-sm" variant="ghost" onClick={() => setCursor(addMonths(cursor, 1))}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-subtle">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const m = marks(d);
          const on = isSameDay(d, selected);
          const today = isSameDay(d, new Date());
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => setSelected(d)}
              className={cn(
                "flex h-12 flex-col items-center justify-center rounded-xl text-sm tabular",
                !isSameMonth(d, cursor) && "text-subtle",
                on && "bg-accent text-accent-fg",
                !on && today && "bg-accent-soft text-accent",
              )}
            >
              {format(d, "d")}
              <span className="mt-0.5 flex gap-0.5">
                {m.a.slice(0, 2).map((x) => (
                  <span
                    key={x.id}
                    className={cn("size-1 rounded-full", on ? "bg-accent-fg" : "bg-warn")}
                  />
                ))}
                {m.e.slice(0, 2).map((x) => (
                  <span
                    key={x.id}
                    className={cn("size-1 rounded-full", on ? "bg-accent-fg" : "bg-accent")}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>
      <Section title={format(selected, "EEEE d MMMM")}>
        {sel.a.length + sel.e.length === 0 ? (
          <p className="text-sm text-muted">Nothing scheduled.</p>
        ) : (
          <div className="space-y-2">
            {sel.e.map((e) => {
              const c = courseById(courses, e.courseId);
              return (
                <Card key={e.id} onClick={() => compose({ type: "exam", value: e })}>
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-muted">
                    {c?.code} · {formatClock(e.startsAt)}
                  </p>
                </Card>
              );
            })}
            {sel.a.map((a) => {
              const c = courseById(courses, a.courseId);
              return (
                <Card key={a.id} onClick={() => compose({ type: "assignment", value: a })}>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted">
                    {c?.code} · {a.status}
                  </p>
                </Card>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8);

function timeToMin(t: string) {
  if (!t) return 0;
  const parts = t.split(":").map(Number);
  const h = parts[0] || 0;
  const m = parts[1] || 0;
  return h * 60 + m;
}

function Timetable({ compose }: { compose: (k: ComposerKind) => void }) {
  const slots = useFolio((s) => s.slots);
  const courses = useFolio((s) => s.courses);
  const today = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const hasWeekend = slots.some((s) => s.day >= 5);
  const dayCount = hasWeekend ? 7 : 5;
  const startMin = 8 * 60;
  const endMin = 19 * 60;
  const span = endMin - startMin;

  return (
    <div className="space-y-3">
      <div className="-mx-1 overflow-x-auto folio-scroll">
        <div
          className="grid min-w-[640px] gap-1"
          style={{ gridTemplateColumns: `40px repeat(${dayCount}, 1fr)` }}
        >
          <div />
          {WEEKDAYS.slice(0, dayCount).map((d, i) => (
            <div
              key={d}
              className={cn(
                "rounded-lg py-1.5 text-center text-[11px] font-medium uppercase tracking-wide",
                i === today ? "bg-accent text-accent-fg" : "text-muted",
              )}
            >
              {d}
            </div>
          ))}
          <div className="relative h-[520px]" style={{ gridColumn: `span ${dayCount + 1}` }}>
            <div
              className="absolute inset-0 grid"
              style={{ gridTemplateColumns: `40px repeat(${dayCount}, 1fr)` }}
            >
              <div className="relative">
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="absolute right-1 text-[10px] tabular text-subtle"
                    style={{ top: `${((h * 60 - startMin) / span) * 100}%` }}
                  >
                    {h}
                  </div>
                ))}
              </div>
              {Array.from({ length: dayCount }, (_, day) => (
                <div key={day} className="relative border-l border-border">
                  {HOURS.map((h) => (
                    <div
                      key={h}
                      className="absolute inset-x-0 border-t border-border/70"
                      style={{ top: `${((h * 60 - startMin) / span) * 100}%` }}
                    />
                  ))}
                  {slots
                    .filter((s) => s.day === day)
                    .map((s) => {
                      const c = courseById(courses, s.courseId);
                      const top = Math.max(
                        0,
                        Math.min(100, ((timeToMin(s.start) - startMin) / span) * 100),
                      );
                      const height = Math.max(
                        4,
                        Math.min(100 - top, ((timeToMin(s.end) - timeToMin(s.start)) / span) * 100),
                      );
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => compose({ type: "slot", value: s })}
                          className="absolute inset-x-1 overflow-hidden rounded-lg bg-accent-soft px-1.5 py-1 text-left"
                          style={{ top: `${top}%`, height: `${height}%` }}
                        >
                          <p className="truncate text-[11px] font-medium text-accent">
                            {c?.code ?? "Class"}
                          </p>
                          <p className="truncate text-[10px] text-muted">{s.start}</p>
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button variant="secondary" className="w-full" onClick={() => compose({ type: "slot" })}>
        Add class block
      </Button>
    </div>
  );
}
