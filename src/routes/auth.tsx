import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, inputCls } from "@/components/site/form-bits";
import { LogoMark } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Author's Word" },
      { name: "description", content: "Sign in to manage Author's Word submissions, consultations and messages." },
      { property: "og:title", content: "Admin Sign In — Author's Word" },
      { property: "og:description", content: "Administrator access for Author's Word." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function GoogleG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setNotice("Check your inbox to confirm your email address, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setNotice("If an account exists for that email, a reset link is on its way.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (result.error) {
      toast.error("Google sign-in didn't complete. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <section className="surface-ink relative min-h-[80svh] overflow-hidden">
      <div className="glow-gold absolute inset-0" aria-hidden="true" />
      <div className="container-page relative flex justify-center py-20">
        <div className="w-full max-w-md rounded-sm border border-line-dark bg-background p-8 text-foreground shadow-2xl md:p-10">
          <LogoMark className="mx-auto h-12 w-12 text-ink" />
          <h1 className="mt-4 text-center text-4xl text-ink">
            {mode === "signin" ? "Admin sign in" : mode === "signup" ? "Create admin account" : "Reset password"}
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">For the Author&rsquo;s Word team only.</p>

          {notice && <p role="status" className="mt-6 rounded-sm border border-gold/50 bg-gold/10 p-3 text-sm text-ink">{notice}</p>}

          {mode !== "forgot" && (
            <>
              <Button
                type="button"
                onClick={google}
                className="mt-8 h-12 w-full rounded-sm border border-[#747775] bg-[#FFFFFF] font-medium text-[#1F1F1F] hover:bg-[#F7F7F7]"
              >
                <GoogleG /> Continue with Google
              </Button>
              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <Field id="a-email" label="Email" required>
              <Input id="a-email" type="email" required autoComplete="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            {mode !== "forgot" && (
              <Field id="a-pass" label="Password" required>
                <Input
                  id="a-pass"
                  type="password"
                  required
                  minLength={8}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  className={inputCls}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            )}
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={busy}>
              {busy && <Loader2 className="animate-spin" />}
              {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
            </Button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2 text-sm">
            {mode === "signin" && (
              <>
                <button type="button" className="text-muted-foreground hover:text-ink" onClick={() => setMode("forgot")}>
                  Forgot your password?
                </button>
                <button type="button" className="text-ink underline decoration-gold underline-offset-4" onClick={() => setMode("signup")}>
                  First time? Create your account
                </button>
              </>
            )}
            {mode !== "signin" && (
              <button type="button" className="text-ink underline decoration-gold underline-offset-4" onClick={() => setMode("signin")}>
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
