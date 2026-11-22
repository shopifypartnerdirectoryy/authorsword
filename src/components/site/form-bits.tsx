import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-gold" aria-hidden="true">*</span> : <span className="ml-2 text-xs font-normal text-muted-foreground">Optional</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputCls =
  "h-12 rounded-sm border-input bg-card text-base shadow-none focus-visible:border-gold focus-visible:ring-gold/40";
export const textareaCls =
  "min-h-32 rounded-sm border-input bg-card text-base shadow-none focus-visible:border-gold focus-visible:ring-gold/40";

export function ConsentField({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string | undefined;
}) {
  return (
    <div className="space-y-2">
      <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground/85">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--gold)]"
          aria-invalid={!!error}
        />
        <span>
          I agree that Author&rsquo;s Word may store and use the details I&rsquo;ve shared to respond to my request, as
          described in the{" "}
          <Link to="/privacy" className="text-ink underline decoration-gold underline-offset-4">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function SuccessPanel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div role="status" className="rounded-sm border border-gold/50 bg-card p-10 text-center shadow-card">
      <CheckCircle2 className="mx-auto h-12 w-12 text-gold" aria-hidden="true" />
      <h2 className="mt-5 text-4xl text-ink">{title}</h2>
      <div className="mx-auto mt-4 max-w-lg text-muted-foreground">{children}</div>
      {action && <div className="mt-8 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}

/** Turns a ZodError's field errors into a flat record keyed by field. */
export function flattenErrors(issues: { path: (string | number)[]; message: string }[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}
