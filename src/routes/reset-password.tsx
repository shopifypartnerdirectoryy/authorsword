import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, inputCls } from "@/components/site/form-bits";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a New Password — Author's Word" },
      { name: "description", content: "Choose a new password for your Author's Word admin account." },
      { property: "og:title", content: "Set a New Password — Author's Word" },
      { property: "og:description", content: "Password reset for Author's Word administrators." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Please use at least 8 characters.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated.");
    navigate({ to: "/admin", replace: true });
  }

  return (
    <section className="bg-background">
      <div className="container-page flex justify-center py-24">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-6 rounded-sm border bg-card p-8 shadow-card">
          <h1 className="text-4xl text-ink">Set a new password</h1>
          <Field id="r-pass" label="New password" required hint="At least 8 characters">
            <Input id="r-pass" type="password" autoComplete="new-password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={busy}>
            {busy && <Loader2 className="animate-spin" />} Update password
          </Button>
        </form>
      </div>
    </section>
  );
}
