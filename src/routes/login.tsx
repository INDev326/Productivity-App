import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setBusy(true);
    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });
      if (res.error) {
        toast.error(res.error.message || "Sign-in failed");
      } else {
        toast.success("Signed in successfully!");
        void navigate({ to: "/" });
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Authentication error");
    } finally {
      setBusy(false);
    }
  }

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password || !name.trim()) return;
    setBusy(true);
    try {
      const res = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (res.error) {
        toast.error(res.error.message || "Sign-up failed");
      } else {
        toast.success("Account created successfully!");
        void navigate({ to: "/" });
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Account creation error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-bg p-6 text-fg">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8">
        <div className="text-center">
          <p className="font-display text-4xl">Folio</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">Academic OS Account</p>
        </div>

        {authEnabled ? (
          <>
            <div className="space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => void signIn(p.providerId, { callbackURL: "/" })}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2/80 active:scale-[0.99]"
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-border" />
              <span className="absolute bg-surface px-3 text-xs uppercase tracking-wider text-subtle">
                or email
              </span>
            </div>

            <div className="flex rounded-xl bg-surface-2 p-1">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className={cn(
                  "h-9 flex-1 rounded-lg text-xs font-medium transition-all",
                  tab === "signin" ? "bg-surface text-fg shadow-card" : "text-muted",
                )}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={cn(
                  "h-9 flex-1 rounded-lg text-xs font-medium transition-all",
                  tab === "signup" ? "bg-surface text-fg shadow-card" : "text-muted",
                )}
              >
                Create Account
              </button>
            </div>

            {tab === "signin" ? (
              <form onSubmit={handleEmailSignIn} className="space-y-3">
                <Field label="Email address">
                  <Input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field label="Password">
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? "Signing in…" : "Sign In with Email"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleEmailSignUp} className="space-y-3">
                <Field label="Full name">
                  <Input
                    type="text"
                    required
                    placeholder="Maya Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field label="Email address">
                  <Input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field label="Password">
                  <Input
                    type="password"
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? "Creating account…" : "Create Account"}
                </Button>
              </form>
            )}
          </>
        ) : (
          <p className="text-center text-sm text-muted">Authentication is currently disabled.</p>
        )}
      </div>
    </main>
  );
}
