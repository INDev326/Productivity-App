import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Card, Section } from "./bits";
import { formatMinutes, formatTimer } from "@/lib/format";
import { minutesOnDay } from "@/lib/stats";
import { useFolio } from "@/lib/store";
import { uid } from "@/lib/utils";

type Mode = "work" | "break";

function chime() {
  try {
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 528;
    g.gain.value = 0.05;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
    o.stop(ctx.currentTime + 0.9);
  } catch {
    /* ignore */
  }
}

export function Focus() {
  const settings = useFolio((s) => s.settings);
  const courses = useFolio((s) => s.courses);
  const sessions = useFolio((s) => s.sessions);
  const logSession = useFolio((s) => s.logSession);
  const [courseId, setCourseId] = useState<string>(courses[0]?.id ?? "");
  const [preset, setPreset] = useState(settings.pomodoroMin);
  const [mode, setMode] = useState<Mode>("work");
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(settings.pomodoroMin * 60);
  const [total, setTotal] = useState(settings.pomodoroMin * 60);
  const startedAt = useRef<number | null>(null);
  const finishing = useRef(false);

  const todayMin = minutesOnDay(sessions, new Date());

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining !== 0 || !running || !startedAt.current || finishing.current) return;
    finishing.current = true;
    const elapsedMin = Math.max(1, Math.round((Date.now() - startedAt.current) / 60000));
    if (mode === "work") {
      logSession({
        id: uid(),
        courseId: courseId || undefined,
        startedAt: new Date(startedAt.current).toISOString(),
        durationMin: elapsedMin,
        kind: "focus",
      });
      toast.success("Block complete. Logged to your week.");
      chime();
      setMode("break");
      const b = settings.breakMin * 60;
      setTotal(b);
      setRemaining(b);
      startedAt.current = Date.now();
    } else {
      toast("Break over. Ready when you are.");
      chime();
      setMode("work");
      setRunning(false);
      startedAt.current = null;
      const w = preset * 60;
      setTotal(w);
      setRemaining(w);
    }
    finishing.current = false;
  }, [remaining, running, mode, courseId, logSession, preset, settings.breakMin]);

  function applyPreset(min: number) {
    setPreset(min);
    setMode("work");
    setRunning(false);
    startedAt.current = null;
    const s = min * 60;
    setTotal(s);
    setRemaining(s);
  }

  function toggle() {
    if (running) {
      setRunning(false);
      return;
    }
    if (!startedAt.current) startedAt.current = Date.now();
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    startedAt.current = null;
    setMode("work");
    const s = preset * 60;
    setTotal(s);
    setRemaining(s);
  }

  const ratio = total ? remaining / total : 0;
  const r = 54;
  const c = 2 * Math.PI * r;
  const labels = useMemo(() => [25, 50, 90].filter((n, i, a) => a.indexOf(n) === i), []);

  const todaySessions = sessions
    .filter((s) => new Date(s.startedAt).toDateString() === new Date().toDateString())
    .sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt));

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Focus</p>
        <h1 className="font-display text-3xl text-fg">
          {mode === "work" ? "Deep work." : "Rest a moment."}
        </h1>
      </header>

      <div className="flex justify-center">
        <div className="relative size-64">
          <svg viewBox="0 0 140 140" className="size-full -rotate-90">
            <circle
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke="currentColor"
              className="text-surface-2"
              strokeWidth="8"
            />
            <circle
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke="currentColor"
              className="text-accent"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - ratio)}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="font-display text-5xl tabular leading-none text-fg">
                {formatTimer(remaining)}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
                {mode === "work" ? "focus" : "break"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {labels.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => applyPreset(n)}
            className={`h-9 rounded-full px-3 text-sm font-medium ${preset === n && mode === "work" ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted"}`}
          >
            {n}m
          </button>
        ))}
      </div>

      <Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">No course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.code} — {c.name}
          </option>
        ))}
      </Select>

      <div className="flex justify-center gap-3">
        <Button size="lg" className="min-w-36" onClick={toggle}>
          {running ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button size="lg" variant="secondary" onClick={reset}>
          <RotateCcw className="size-4" />
          Reset
        </Button>
      </div>

      <Section title="Today">
        <Card>
          <p className="font-display text-3xl tabular">{formatMinutes(todayMin)}</p>
          <p className="text-xs text-muted">logged in focus sessions</p>
          <div className="mt-4 space-y-2">
            {todaySessions.length === 0 ? (
              <p className="text-sm text-muted">No blocks yet.</p>
            ) : (
              todaySessions.map((s) => {
                const c = courses.find((x) => x.id === s.courseId);
                return (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted">{c?.code ?? "Open study"}</span>
                    <span className="tabular">{formatMinutes(s.durationMin)}</span>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </Section>
    </div>
  );
}
