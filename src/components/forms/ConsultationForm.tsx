import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConsentField, Field, SuccessPanel, flattenErrors, inputCls } from "@/components/site/form-bits";
import { CONSULTATION_INTERESTS } from "@/data/services";
import { consultationSchema } from "@/lib/form-schemas";
import { requestConsultation } from "@/lib/forms.functions";

const selectCls =
  "h-12 w-full rounded-sm border border-input bg-card px-3 text-base focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40";

const TIMES = Array.from({ length: 25 }, (_, i) => {
  const mins = 8 * 60 + i * 30;
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
});

const COMMON_ZONES = [
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Africa/Lagos",
  "Africa/Johannesburg",
  "Africa/Nairobi",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
];

export function ConsultationForm({ initialInterest }: { initialInterest?: string | undefined }) {
  const [v, setV] = useState({
    name: "",
    email: "",
    project_title: "",
    interest: initialInterest ?? "",
    preferred_date: "",
    preferred_time: "",
    timezone: "",
    details: "",
    privacy_consent: false,
  });
  const [zones, setZones] = useState<string[]>(COMMON_ZONES);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const send = useServerFn(requestConsultation);

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const all = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : COMMON_ZONES;
    setZones(Array.from(new Set(["UTC", ...all])));
    setV((p) => (p.timezone ? p : { ...p, timezone: detected || "UTC" }));
    const t = new Date();
    t.setDate(t.getDate() + 1);
    setMinDate(t.toISOString().slice(0, 10));
  }, []);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  const zoneOptions = useMemo(() => (v.timezone && !zones.includes(v.timezone) ? [v.timezone, ...zones] : zones), [zones, v.timezone]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = consultationSchema.safeParse(v);
    if (!parsed.success) {
      setErrors(flattenErrors(parsed.error.issues));
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) setDone(true);
      else toast.error(res.error);
    } catch {
      toast.error("We couldn't send this just now. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <SuccessPanel
        title="Your request has been received."
        action={
          <Button asChild variant="ink">
            <Link to="/">Return home</Link>
          </Button>
        }
      >
        <p>
          Thank you. Your consultation is <strong className="text-ink">not yet confirmed</strong> — we&rsquo;ll check
          availability for {v.preferred_date} at {v.preferred_time} ({v.timezone}) and email you to confirm a time or
          suggest an alternative.
        </p>
      </SuccessPanel>
    );
  }

  const err = (k: string) => errors[k];
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      <Field id="c-name" label="Name" required error={err("name")}>
        <Input id="c-name" className={inputCls} value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err("name")} />
      </Field>
      <Field id="c-email" label="Email" required error={err("email")}>
        <Input id="c-email" type="email" className={inputCls} value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err("email")} />
      </Field>
      <Field id="c-title" label="Book or project title" required error={err("project_title")}>
        <Input id="c-title" className={inputCls} value={v.project_title} onChange={set("project_title")} aria-invalid={!!err("project_title")} />
      </Field>
      <Field id="c-interest" label="Main area of interest" required error={err("interest")}>
        <select id="c-interest" className={selectCls} value={v.interest} onChange={set("interest")} aria-invalid={!!err("interest")}>
          <option value="" disabled>
            Choose one…
          </option>
          {CONSULTATION_INTERESTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </Field>
      <Field id="c-date" label="Preferred date" required error={err("preferred_date")}>
        <Input id="c-date" type="date" min={minDate} className={inputCls} value={v.preferred_date} onChange={set("preferred_date")} aria-invalid={!!err("preferred_date")} />
      </Field>
      <Field id="c-time" label="Preferred time" required error={err("preferred_time")}>
        <select id="c-time" className={selectCls} value={v.preferred_time} onChange={set("preferred_time")} aria-invalid={!!err("preferred_time")}>
          <option value="" disabled>
            Choose a time…
          </option>
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field id="c-tz" label="Time zone" required error={err("timezone")} className="md:col-span-2">
        <select id="c-tz" className={selectCls} value={v.timezone} onChange={set("timezone")} aria-invalid={!!err("timezone")}>
          <option value="" disabled>
            Choose your time zone…
          </option>
          {zoneOptions.map((z) => (
            <option key={z} value={z}>
              {z.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </Field>
      <Field id="c-details" label="Additional details" error={err("details")} className="md:col-span-2">
        <Textarea id="c-details" className="min-h-28 rounded-sm bg-card" value={v.details} onChange={set("details")} />
      </Field>
      <div className="md:col-span-2">
        <ConsentField checked={v.privacy_consent} onChange={(c) => setV((p) => ({ ...p, privacy_consent: c }))} error={err("privacy_consent")} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full md:w-auto">
          {busy && <Loader2 className="animate-spin" />} Request a Consultation
        </Button>
      </div>
    </form>
  );
}
