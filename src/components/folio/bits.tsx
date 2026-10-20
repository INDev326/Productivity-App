import type { ReactNode } from "react";
import { TINT_CLASS, type Course, type CourseTint } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CourseDot({ tint, className }: { tint: CourseTint; className?: string }) {
  return (
    <span className={cn("inline-block size-2.5 rounded-full", TINT_CLASS[tint].solid, className)} />
  );
}

export function CourseChip({ course }: { course: Course }) {
  const t = TINT_CLASS[course.tint];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
        t.soft,
        t.text,
      )}
    >
      <span className={cn("size-1.5 rounded-full", t.solid)} />
      {course.code}
    </span>
  );
}

export function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Card({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const classes = cn(
    "w-full rounded-2xl border border-border bg-surface p-4 text-left shadow-card",
    onClick && "transition-transform duration-150 active:scale-[0.99]",
    className,
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }
  return <div className={classes}>{children}</div>;
}

export function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border px-5 py-10 text-center">
      <p className="font-display text-xl text-fg">{title}</p>
      <p className="mx-auto mt-1 max-w-xs text-sm text-muted">{body}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3 shadow-card">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl tabular leading-none text-fg">{value}</p>
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}

export function Ring({
  value,
  size = 56,
  children,
}: {
  value: number;
  size?: number;
  children?: ReactNode;
}) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value));
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 44 44" className="size-full -rotate-90">
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-surface-2"
          strokeWidth="4"
        />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-xs font-medium tabular">
        {children}
      </div>
    </div>
  );
}
