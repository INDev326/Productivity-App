import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LineChart as LineChartIcon,
  MessageSquare,
  Settings as SettingsIcon,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CourseDot, Empty, Metric, Section } from "./bits";
import { formatHours, formatMinutes } from "@/lib/format";
import {
  coursePercent,
  formatGpa,
  letterFromPercent,
  neededForTarget,
  percentToGpa,
  remainingWeight,
  termGpa,
  courseItems,
} from "@/lib/gpa";
import { heatmap, lastNDays, minutesByCourse, minutesThisWeek, streakDays } from "@/lib/stats";
import { makeFlash, useFolio } from "@/lib/store";
import { askTutor, parseCardsJson, type ChatTurn } from "@/lib/tutor";
import { cn } from "@/lib/utils";
import type { Screen } from "./nav";
import { UserButton } from "@/lib/auth/gates";

export function More({ go }: { go: (s: Screen) => void }) {
  const settings = useFolio((s) => s.settings);
  const items = [
    {
      name: "grades" as const,
      label: "Gradebook",
      hint: "GPA, weights, what-if",
      icon: GraduationCap,
    },
    {
      name: "analytics" as const,
      label: "Analytics",
      hint: "Hours, streak, heatmap",
      icon: LineChartIcon,
    },
    {
      name: "assistant" as const,
      label: "Tutor",
      hint: "Explain, quiz, make cards",
      icon: MessageSquare,
    },
    {
      name: "settings" as const,
      label: "Settings",
      hint: "Profile, theme, data",
      icon: SettingsIcon,
    },
  ];
  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">More</p>
        <h1 className="font-display text-3xl">{settings.name || "Folio"}</h1>
        <p className="text-sm text-muted">
          {[settings.major, settings.school].filter(Boolean).join(" · ") || "Your academic OS"}
        </p>
      </header>
      <div className="space-y-2">
        {items.map((it) => (
          <Card key={it.name} onClick={() => go({ name: it.name })}>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <it.icon className="size-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{it.label}</p>
                <p className="text-xs text-muted">{it.hint}</p>
              </div>
              <ChevronRight className="size-4 text-subtle" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Grades({ go }: { go: (s: Screen) => void }) {
  const courses = useFolio((s) => s.courses);
  const assignments = useFolio((s) => s.assignments);
  const exams = useFolio((s) => s.exams);
  const settings = useFolio((s) => s.settings);
  const gpa = termGpa(courses, assignments, exams, settings.gpaScale);
  const [whatIf, setWhatIf] = useState<Record<string, number>>({});

  const rows = courses.map((c) => {
    const items = courseItems(c.id, assignments, exams);
    const pct = coursePercent(c.id, assignments, exams);
    const rem = remainingWeight(items);
    const guess = whatIf[c.id] ?? c.targetGrade;
    const projected = rem > 0 ? ((pct ?? 0) * (100 - rem) + guess * rem) / 100 : pct;
    return { c, pct, rem, projected, need: neededForTarget(pct, rem, c.targetGrade) };
  });

  const projectedGpa = (() => {
    let pts = 0;
    let cr = 0;
    for (const r of rows) {
      if (r.projected == null) continue;
      pts += percentToGpa(r.projected, settings.gpaScale) * r.c.credits;
      cr += r.c.credits;
    }
    return cr ? Math.round((pts / cr) * 100) / 100 : null;
  })();

  return (
    <div className="space-y-5">
      <Back go={go} label="Gradebook" />
      <div className="grid grid-cols-2 gap-2.5">
        <Metric
          label="Term GPA"
          value={formatGpa(gpa, settings.gpaScale)}
          hint={`${settings.gpaScale}.0 scale`}
        />
        <Metric
          label="What-if"
          value={formatGpa(projectedGpa, settings.gpaScale)}
          hint="with remaining work"
        />
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <Card key={r.c.id} onClick={() => go({ name: "course", id: r.c.id })}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <CourseDot tint={r.c.tint} />
                <div>
                  <p className="text-sm font-medium">{r.c.code}</p>
                  <p className="text-xs text-muted">
                    {r.c.credits} cr · target {r.c.targetGrade}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium tabular">
                  {r.pct == null ? "—" : `${Math.round(r.pct)}% ${letterFromPercent(r.pct)}`}
                </p>
                <p className="text-[11px] text-muted">
                  {r.pct == null
                    ? "ungraded"
                    : formatGpa(percentToGpa(r.pct, settings.gpaScale), settings.gpaScale)}
                </p>
              </div>
            </div>
            {r.rem > 0 ? (
              <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                <div className="mb-1 flex justify-between text-[11px] text-muted">
                  <span>
                    Remaining {r.rem}% — need{" "}
                    {r.need == null ? "—" : `${Math.max(0, r.need).toFixed(0)}%`}
                  </span>
                  <span className="tabular">{whatIf[r.c.id] ?? ""}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={whatIf[r.c.id] ?? r.c.targetGrade}
                  onChange={(e) => setWhatIf((w) => ({ ...w, [r.c.id]: Number(e.target.value) }))}
                  className="w-full accent-accent"
                />
              </div>
            ) : (
              <Progress className="mt-3" value={(r.pct ?? 0) / 100} />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsView({ go }: { go: (s: Screen) => void }) {
  const sessions = useFolio((s) => s.sessions);
  const courses = useFolio((s) => s.courses);
  const days = lastNDays(sessions, 7);
  const week = minutesThisWeek(sessions);
  const streak = streakDays(sessions);
  const term = sessions.reduce((n, s) => n + s.durationMin, 0);
  const byCourse = minutesByCourse(sessions);
  const cells = heatmap(sessions, 8);
  const max = Math.max(1, ...cells.map((c) => c.minutes));
  const chart = days.map((d) => ({
    name: format(d.date, "EEE"),
    hours: Math.round((d.minutes / 60) * 10) / 10,
  }));

  return (
    <div className="space-y-6">
      <Back go={go} label="Analytics" />
      <div className="grid grid-cols-3 gap-2.5">
        <Metric label="Streak" value={`${streak}d`} />
        <Metric label="Week" value={formatHours(week)} />
        <Metric label="Term" value={formatHours(term)} />
      </div>
      <Section title="Last 7 days">
        <div className="h-44 rounded-2xl border border-border bg-surface p-2 shadow-card">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart} barSize={18}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "var(--color-surface-2)" }}
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="hours" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
      <Section title="By course">
        <div className="space-y-2">
          {courses.map((c) => {
            const m = byCourse.get(c.id) ?? 0;
            const ratio = term ? m / term : 0;
            return (
              <div key={c.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <CourseDot tint={c.tint} />
                    {c.code}
                  </span>
                  <span className="tabular text-muted">{formatMinutes(m)}</span>
                </div>
                <Progress value={ratio} />
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Eight-week map">
        <div className="grid grid-cols-7 gap-1">
          {cells.map((c) => (
            <div
              key={c.key}
              title={`${format(c.date, "d MMM")} · ${formatMinutes(c.minutes)}`}
              className="aspect-square rounded-sm"
              style={{
                background:
                  c.minutes === 0
                    ? "var(--color-surface-2)"
                    : `color-mix(in oklab, var(--color-accent) ${Math.max(22, (c.minutes / max) * 100)}%, var(--color-surface-2))`,
              }}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

const PROMPTS = [
  "Explain the Master theorem with one worked example.",
  "Quiz me on eigenvalues until I miss one.",
  "Build a 5-day plan for my algorithms midterm.",
  "Tighten these notes into an exam sheet.",
];

export function Assistant({ go }: { go: (s: Screen) => void }) {
  const courses = useFolio((s) => s.courses);
  const decks = useFolio((s) => s.decks);
  const saveDeck = useFolio((s) => s.saveDeck);
  const saveCard = useFolio((s) => s.saveCard);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");

  async function send(text: string, mode: "chat" | "cards" = "chat") {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await askTutor({ data: { messages: next, mode } });
      if (!res.ok) {
        toast.error(res.error);
        setMessages([...next, { role: "assistant", content: res.error }]);
        return;
      }
      if (mode === "cards") {
        const parsed = parseCardsJson(res.text);
        if (!parsed.length) {
          setMessages([
            ...next,
            {
              role: "assistant",
              content: "I couldn't parse cards from that. Try a narrower topic.",
            },
          ]);
          return;
        }
        const name = `Tutor · ${trimmed.slice(0, 32)}`;
        const deck = { id: crypto.randomUUID(), courseId: courseId || undefined, name };
        saveDeck(deck);
        for (const c of parsed) saveCard(makeFlash(deck.id, c.front, c.back));
        toast.success(`${parsed.length} cards saved to “${name}”.`);
        setMessages([
          ...next,
          {
            role: "assistant",
            content: `Saved ${parsed.length} cards to “${name}”. Open Library → Cards to study.`,
          },
        ]);
      } else {
        setMessages([...next, { role: "assistant", content: res.text }]);
      }
    } catch {
      toast.error("The tutor could not be reached.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] flex-col">
      <Back go={go} label="Tutor" />
      <p className="mt-1 text-sm text-muted">
        Explanations, quizzes, and generated decks. Calls are on you.
      </p>
      <Field label="Attach course" className="mt-4">
        <Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">None</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}
            </option>
          ))}
        </Select>
      </Field>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            className="rounded-full bg-surface-2 px-3 py-1.5 text-left text-xs text-fg"
            onClick={() => send(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="folio-scroll mt-4 flex-1 space-y-3">
        {messages.length === 0 ? (
          <Empty
            title="Ask Folio"
            body="Paste a theorem, a prompt, or a messy note. Keep it specific."
          />
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                m.role === "user"
                  ? "ml-6 bg-accent text-accent-fg"
                  : "mr-6 border border-border bg-surface",
              )}
            >
              {m.content}
            </div>
          ))
        )}
        {busy ? <p className="text-xs uppercase tracking-[0.14em] text-muted">Thinking…</p> : null}
      </div>
      <form
        className="mt-4 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask, paste notes, or describe a deck…"
          className="min-h-24"
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            disabled={busy}
            onClick={() => void send(input, "cards")}
          >
            <Sparkles className="size-4" />
            Make cards
          </Button>
          <Button type="submit" className="flex-1" disabled={busy}>
            Send
          </Button>
        </div>
      </form>
      {decks.length > 0 ? (
        <button
          type="button"
          className="mt-3 text-xs font-medium text-accent"
          onClick={() => go({ name: "library", tab: "cards" })}
        >
          {decks.length} decks in the library
        </button>
      ) : null}
    </div>
  );
}

export function SettingsView({ go }: { go: (s: Screen) => void }) {
  const settings = useFolio((s) => s.settings);
  const patch = useFolio((s) => s.patchSettings);
  const loadSeed = useFolio((s) => s.loadSeed);
  const resetAll = useFolio((s) => s.resetAll);

  return (
    <div className="space-y-5">
      <Back go={go} label="Settings" />
      <Field label="Name">
        <Input value={settings.name} onChange={(e) => patch({ name: e.target.value })} />
      </Field>
      <Field label="School">
        <Input value={settings.school} onChange={(e) => patch({ school: e.target.value })} />
      </Field>
      <Field label="Major">
        <Input value={settings.major} onChange={(e) => patch({ major: e.target.value })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="GPA scale">
          <Select
            value={String(settings.gpaScale)}
            onChange={(e) => patch({ gpaScale: Number(e.target.value) as 4 | 5 | 10 })}
          >
            <option value="4">4.0</option>
            <option value="5">5.0</option>
            <option value="10">10.0</option>
          </Select>
        </Field>
        <Field label="Theme">
          <Select
            value={settings.theme}
            onChange={(e) => patch({ theme: e.target.value as typeof settings.theme })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </Select>
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Focus min">
          <Input
            type="number"
            value={settings.pomodoroMin}
            onChange={(e) => patch({ pomodoroMin: Number(e.target.value) || 25 })}
          />
        </Field>
        <Field label="Break min">
          <Input
            type="number"
            value={settings.breakMin}
            onChange={(e) => patch({ breakMin: Number(e.target.value) || 5 })}
          />
        </Field>
        <Field label="Week hours">
          <Input
            type="number"
            value={settings.weeklyHourGoal}
            onChange={(e) => patch({ weeklyHourGoal: Number(e.target.value) || 10 })}
          />
        </Field>
      </div>
      <Section title="Account Identity">
        <Card>
          <UserButton />
        </Card>
      </Section>
      <div className="space-y-2 pt-2">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            loadSeed();
            toast.success("Loaded the sample Northridge term.");
          }}
        >
          Load sample term
        </Button>
        <Button
          variant="ghost"
          className="w-full text-danger"
          onClick={() => {
            if (confirm("Erase all local Folio data?")) {
              resetAll();
              toast("Cleared. Add a course to begin.");
            }
          }}
        >
          Erase all data
        </Button>
      </div>
      <p className="text-xs text-subtle">Everything stays on this device. No account required.</p>
    </div>
  );
}

function Back({ go, label }: { go: (s: Screen) => void; label: string }) {
  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-muted"
        onClick={() => go({ name: "more" })}
      >
        <ChevronLeft className="size-4" /> More
      </button>
      <h1 className="mt-2 font-display text-3xl">{label}</h1>
    </div>
  );
}
