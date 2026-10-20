import { format } from "date-fns";
import { ArrowRight, Flame, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CourseChip, Metric, Section } from "./bits";
import { formatHours, formatMinutes, relativeDue } from "@/lib/format";
import { coursePercent, formatGpa, termGpa } from "@/lib/gpa";
import {
  courseById,
  goalProgress,
  lastNDays,
  minutesThisWeek,
  streakDays,
  todaySlots,
  upcomingAssignments,
  upcomingExams,
} from "@/lib/stats";
import { useFolio } from "@/lib/store";
import type { Screen } from "./nav";
import type { ComposerKind } from "./forms";

export function Home({
  go,
  compose,
}: {
  go: (s: Screen) => void;
  compose: (k: ComposerKind) => void;
}) {
  const courses = useFolio((s) => s.courses);
  const assignments = useFolio((s) => s.assignments);
  const exams = useFolio((s) => s.exams);
  const sessions = useFolio((s) => s.sessions);
  const slots = useFolio((s) => s.slots);
  const goals = useFolio((s) => s.goals);
  const cards = useFolio((s) => s.cards);
  const settings = useFolio((s) => s.settings);

  const name = settings.name.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const gpa = termGpa(courses, assignments, exams, settings.gpaScale);
  const weekMin = minutesThisWeek(sessions);
  const streak = streakDays(sessions);
  const due = upcomingAssignments(assignments, 10).slice(0, 5);
  const nextExams = upcomingExams(exams, 40).slice(0, 3);
  const today = todaySlots(slots);
  const days = lastNDays(sessions, 7);
  const maxMin = Math.max(1, ...days.map((d) => d.minutes));
  const weekGoal = settings.weeklyHourGoal * 60;

  return (
    <div className="space-y-7">
      <header className="pt-1">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
          {format(new Date(), "EEEE d MMMM")}
        </p>
        <h1 className="mt-1 font-display text-[2.15rem] leading-[1.1] text-fg">
          {hello}, {name}.
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          {streak > 0
            ? `${streak}-day streak. ${formatHours(weekMin)} logged this week.`
            : "Start a focus block to open the week."}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-2.5">
        <Metric label="Streak" value={`${streak}d`} hint="consecutive days" />
        <Metric
          label="This week"
          value={formatHours(weekMin)}
          hint={`of ${settings.weeklyHourGoal}h`}
        />
        <Metric
          label="GPA"
          value={formatGpa(gpa, settings.gpaScale)}
          hint={`${settings.gpaScale}.0 scale`}
        />
      </div>

      <button
        type="button"
        onClick={() => go({ name: "focus" })}
        className="flex w-full items-center gap-4 rounded-2xl bg-accent px-4 py-3.5 text-left text-accent-fg transition-transform duration-150 active:scale-[0.99]"
      >
        <span className="grid size-11 place-items-center rounded-xl bg-accent-fg/10">
          <Play className="size-5 fill-current" />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium">Start a focus block</span>
          <span className="block text-xs opacity-80">
            {settings.pomodoroMin} minutes · keep the streak
          </span>
        </span>
        <Flame className="size-4 opacity-80" />
      </button>

      <Section title="This week">
        <Card>
          <div className="flex items-end gap-1.5">
            {days.map((d) => (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-20 w-full items-end rounded-md bg-surface-2">
                  <div
                    className="w-full rounded-md bg-accent"
                    style={{
                      height: `${Math.max(d.minutes ? 8 : 0, (d.minutes / maxMin) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-wide text-subtle">
                  {format(d.date, "EEEEE")}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-muted">
              <span>Weekly goal</span>
              <span className="tabular">
                {formatMinutes(weekMin)} / {settings.weeklyHourGoal}h
              </span>
            </div>
            <Progress value={weekGoal ? weekMin / weekGoal : 0} />
          </div>
        </Card>
      </Section>

      <Section
        title="Today's classes"
        action={
          <button
            type="button"
            className="text-xs font-medium text-accent"
            onClick={() => go({ name: "planner", tab: "timetable" })}
          >
            Timetable
          </button>
        }
      >
        {today.length === 0 ? (
          <p className="text-sm text-muted">No classes on the grid today.</p>
        ) : (
          <div className="space-y-2">
            {today.map((slot) => {
              const c = courseById(courses, slot.courseId);
              if (!c) return null;
              return (
                <Card key={slot.id} onClick={() => go({ name: "course", id: c.id })}>
                  <div className="flex items-center gap-3">
                    <div className="w-16 shrink-0">
                      <p className="text-sm font-medium tabular">{slot.start}</p>
                      <p className="text-[11px] text-subtle tabular">{slot.end}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted">
                        {c.code} · {slot.room || c.room}
                      </p>
                    </div>
                    <CourseChip course={c} />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      <Section
        title="Due soon"
        action={
          <button
            type="button"
            className="text-xs font-medium text-accent"
            onClick={() => go({ name: "planner", tab: "agenda" })}
          >
            Planner
          </button>
        }
      >
        {due.length === 0 ? (
          <p className="text-sm text-muted">Nothing open in the next ten days.</p>
        ) : (
          <div className="space-y-2">
            {due.map((a) => {
              const c = courseById(courses, a.courseId);
              const late = +new Date(a.dueAt) < Date.now();
              return (
                <Card key={a.id} onClick={() => compose({ type: "assignment", value: a })}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{a.title}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {c?.code} · {relativeDue(a.dueAt)}
                      </p>
                    </div>
                    <Badge tone={late ? "danger" : a.priority === "high" ? "warn" : "muted"}>
                      {a.status === "doing" ? "Doing" : late ? "Late" : a.priority}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      <Section title="Upcoming exams">
        {nextExams.length === 0 ? (
          <p className="text-sm text-muted">No exams on the horizon.</p>
        ) : (
          <div className="space-y-2">
            {nextExams.map((e) => {
              const c = courseById(courses, e.courseId);
              const daysOut = Math.max(
                0,
                Math.ceil((+new Date(e.startsAt) - Date.now()) / 86400000),
              );
              return (
                <Card key={e.id} onClick={() => compose({ type: "exam", value: e })}>
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft">
                      <span className="font-display text-xl tabular leading-none text-accent">
                        {daysOut}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-muted">
                        {c?.code} ·{" "}
                        {daysOut === 0 ? "today" : daysOut === 1 ? "tomorrow" : `${daysOut} days`}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-subtle" />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      {goals.length > 0 ? (
        <Section
          title="Goals"
          action={
            <button
              type="button"
              className="text-xs font-medium text-accent"
              onClick={() => compose({ type: "goal" })}
            >
              Add
            </button>
          }
        >
          <div className="space-y-2">
            {goals.map((g) => {
              const pct =
                g.kind === "grade" ? coursePercent(g.courseId ?? "", assignments, exams) : null;
              const p = goalProgress(g, sessions, cards, pct);
              return (
                <Card key={g.id} onClick={() => compose({ type: "goal", value: g })}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{g.title}</p>
                    <span className="text-xs tabular text-muted">
                      {g.kind === "hours" ? formatHours(p.current * 60) : Math.round(p.current)}
                      <span className="text-subtle"> / {g.target}</span>
                    </span>
                  </div>
                  <Progress value={p.ratio} />
                </Card>
              );
            })}
          </div>
        </Section>
      ) : null}

      <Button variant="secondary" className="w-full" onClick={() => go({ name: "assistant" })}>
        Ask the tutor
      </Button>
    </div>
  );
}
