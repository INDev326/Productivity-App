import { BookOpen, CalendarDays, House, Menu, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Composer, type ComposerKind } from "./forms";
import { Focus } from "./focus";
import { Home } from "./home";
import { CourseDetail, DeckStudy, Library } from "./library";
import { AnalyticsView, Assistant, Grades, More, SettingsView } from "./more";
import type { LibraryTab, PlannerTab, Screen } from "./nav";
import { Planner } from "./planner";
import { useFolio, useHydratedFolio } from "@/lib/store";
import { cn } from "@/lib/utils";

import { UserButton } from "@/lib/auth/gates";

const NAV: { name: Screen["name"]; label: string; icon: typeof House }[] = [
  { name: "home", label: "Home", icon: House },
  { name: "planner", label: "Planner", icon: CalendarDays },
  { name: "focus", label: "Focus", icon: Timer },
  { name: "library", label: "Library", icon: BookOpen },
  { name: "more", label: "More", icon: Menu },
];

function applyTheme(theme: "light" | "dark" | "system") {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export function FolioApp() {
  const ready = useHydratedFolio();
  const theme = useFolio((s) => s.settings.theme);
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [plannerTab, setPlannerTab] = useState<PlannerTab>("agenda");
  const [libraryTab, setLibraryTab] = useState<LibraryTab>("courses");
  const [composer, setComposer] = useState<ComposerKind | null>(null);

  useEffect(() => {
    if (!ready) return;
    applyTheme(theme);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(useFolio.getState().settings.theme);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme, ready]);

  function go(s: Screen) {
    if (s.name === "planner" && s.tab) setPlannerTab(s.tab);
    if (s.name === "library" && s.tab) setLibraryTab(s.tab);
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg text-fg">
        <div className="text-center">
          <p className="font-display text-4xl">Folio</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">Opening the term</p>
        </div>
      </div>
    );
  }

  const tabName = ["home", "planner", "focus", "library", "more"].includes(screen.name)
    ? screen.name
    : screen.name === "course" || screen.name === "deck"
      ? "library"
      : "more";

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-border px-3 py-6 lg:flex">
          <div>
            <p className="px-3 font-display text-3xl">Folio</p>
            <p className="mt-1 px-3 text-xs text-muted">Academic OS</p>
            <nav className="mt-8 space-y-1">
              {NAV.map((n) => (
                <button
                  key={n.name}
                  type="button"
                  onClick={() => go({ name: n.name } as Screen)}
                  className={cn(
                    "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium",
                    tabName === n.name
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-surface-2",
                  )}
                >
                  <n.icon className="size-4" />
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-3 shadow-card">
            <UserButton />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="folio-scroll flex-1 px-4 pb-28 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 lg:px-10 lg:pb-10">
            <div className="mx-auto w-full max-w-xl lg:max-w-2xl">
              {screen.name === "home" ? <Home go={go} compose={setComposer} /> : null}
              {screen.name === "planner" ? (
                <Planner tab={plannerTab} setTab={setPlannerTab} go={go} compose={setComposer} />
              ) : null}
              {screen.name === "focus" ? <Focus /> : null}
              {screen.name === "library" ? (
                <Library tab={libraryTab} setTab={setLibraryTab} go={go} compose={setComposer} />
              ) : null}
              {screen.name === "course" ? (
                <CourseDetail id={screen.id} go={go} compose={setComposer} />
              ) : null}
              {screen.name === "deck" ? (
                <DeckStudy id={screen.id} go={go} compose={setComposer} />
              ) : null}
              {screen.name === "more" ? <More go={go} /> : null}
              {screen.name === "grades" ? <Grades go={go} /> : null}
              {screen.name === "analytics" ? <AnalyticsView go={go} /> : null}
              {screen.name === "assistant" ? <Assistant go={go} /> : null}
              {screen.name === "settings" ? <SettingsView go={go} /> : null}
            </div>
          </main>

          <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
            <div className="mx-auto grid max-w-lg grid-cols-5">
              {NAV.map((n) => {
                const on = tabName === n.name;
                return (
                  <button
                    key={n.name}
                    type="button"
                    onClick={() => go({ name: n.name } as Screen)}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                      on ? "text-accent" : "text-subtle",
                    )}
                  >
                    <n.icon className="size-5" strokeWidth={on ? 2.2 : 1.7} />
                    {n.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
      <Composer kind={composer} onClose={() => setComposer(null)} />
      <Toaster position="top-center" theme={theme === "dark" ? "dark" : "light"} />
    </div>
  );
}
