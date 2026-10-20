import {
  format,
  formatDistanceToNowStrict,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
} from "date-fns";

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const WEEKDAYS_LONG = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function parse(iso: string) {
  return parseISO(iso);
}

export function dayKey(d: Date) {
  return format(d, "yyyy-MM-dd");
}

export function todayKey() {
  return dayKey(new Date());
}

export function formatDay(iso: string) {
  const d = parseISO(iso);
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "EEE, d MMM");
}

export function formatLongDay(iso: string) {
  return format(parseISO(iso), "EEEE d MMMM");
}

export function formatClock(iso: string) {
  return format(parseISO(iso), "h:mm a");
}

export function formatShortDate(iso: string) {
  return format(parseISO(iso), "d MMM");
}

export function relativeDue(iso: string) {
  const d = parseISO(iso);
  const now = new Date();
  if (d.getTime() < now.getTime() - 60_000) {
    return `overdue ${formatDistanceToNowStrict(d)}`;
  }
  if (isToday(d)) return `today ${format(d, "h:mm a")}`;
  if (isTomorrow(d)) return `tomorrow ${format(d, "h:mm a")}`;
  return formatDistanceToNowStrict(d, { addSuffix: true });
}

export function formatMinutes(min: number) {
  if (min < 60) return `${Math.round(min)}m`;
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function formatHours(min: number) {
  const h = min / 60;
  return h >= 10 ? `${Math.round(h)}h` : `${h.toFixed(1).replace(/\.0$/, "")}h`;
}

export function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatTimer(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  if (h > 0) return `${h}:${pad2(m)}:${pad2(r)}`;
  return `${pad2(m)}:${pad2(r)}`;
}

export function mondayOf(d = new Date()) {
  const copy = new Date(d);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function jsDayToMonIndex(jsDay: number) {
  return jsDay === 0 ? 6 : jsDay - 1;
}
