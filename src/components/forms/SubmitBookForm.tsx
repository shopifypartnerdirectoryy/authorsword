import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConsentField, Field, SuccessPanel, flattenErrors, inputCls, textareaCls } from "@/components/site/form-bits";
import { FORM_SERVICES, type FormService } from "@/data/services";
import { bookSubmissionSchema } from "@/lib/form-schemas";
import { submitBook } from "@/lib/forms.functions";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const MAX_COVER = 10 * 1024 * 1024;
const COVER_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function SubmitBookForm({ initialService }: { initialService?: FormService | undefined }) {
  const [v, setV] = useState({
    author_name: "",
    email: "",
    book_title: "",
    genre: "",
    synopsis: "",
    book_link: "",
    author_website: "",
    social_links: "",
    budget: "",
    additional_info: "",
    privacy_consent: false,
  });
  const [services, setServices] = useState<FormService[]>(initialService ? [initialService] : []);
  const [cover, setCover] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const send = useServerFn(submitBook);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  const toggle = (s: FormService) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (!f) return;
    if (!COVER_TYPES.includes(f.type)) {
      setErrors((p) => ({ ...p, cover: "Please upload a JPG, PNG or WebP image." }));
      return;
    }
    if (f.size > MAX_COVER) {
      setErrors((p) => ({ ...p, cover: "Please upload an image under 10 MB." }));
      return;
    }
    setErrors(({ cover: _c, ...rest }) => rest);
    setCover(f);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const candidate = { ...v, services };
    const pre = bookSubmissionSchema.safeParse(candidate);
    if (!pre.success) {
      setErrors(flattenErrors(pre.error.issues));
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      let cover_path: string | undefined;
      if (cover) {
        const ext = cover.type === "image/png" ? "png" : cover.type === "image/webp" ? "webp" : "jpg";
        const path = `submissions/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("book-covers").upload(path, cover, {
          contentType: cover.type,
          upsert: false,
        });
        if (upErr) {
          console.error(upErr);
          toast.error("Your cover couldn't be uploaded. Please try again, or submit without it.");
          setBusy(false);
          return;
        }
        cover_path = path;
      }
      const res = await send({ data: { ...pre.data, ...(cover_path ? { cover_path } : {}) } });
      if (res.ok) {
        setDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else toast.error(res.error);
    } catch {
      toast.error("We couldn't send this just now. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <SuccessPanel
        title="Thank you — your book has been received."
        action={
          <>
            <Button asChild variant="gold">
              <Link to="/services">Explore services</Link>
            </Button>
            <Button asChild variant="inkOutline">
              <Link to="/">Return home</Link>
            </Button>
          </>
        }
      >
        <p>
          We&rsquo;ll review your submission and reply to <strong className="text-ink">{v.email}</strong> with suitable
          options and, where relevant, a clear proposal. Nothing is published or charged without your approval.
        </p>
      </SuccessPanel>
    );
  }

  const err = (k: string) => errors[k];
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-12">
      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="mb-6 font-display text-3xl text-ink">About you</legend>
        <Field id="s-name" label="Author's full name" required error={err("author_name")}>
          <Input id="s-name" className={inputCls} value={v.author_name} onChange={set("author_name")} autoComplete="name" aria-invalid={!!err("author_name")} />
        </Field>
        <Field id="s-email" label="Email address" required error={err("email")}>
          <Input id="s-email" type="email" className={inputCls} value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err("email")} />
        </Field>
        <Field id="s-website" label="Author website" error={err("author_website")}>
          <Input id="s-website" type="url" placeholder="https://" className={inputCls} value={v.author_website} onChange={set("author_website")} />
        </Field>
        <Field id="s-social" label="Social media links" error={err("social_links")}>
          <Input id="s-social" className={inputCls} value={v.social_links} onChange={set("social_links")} placeholder="Instagram, TikTok…" />
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="mb-6 font-display text-3xl text-ink">About your book</legend>
        <Field id="s-title" label="Book title" required error={err("book_title")}>
          <Input id="s-title" className={inputCls} value={v.book_title} onChange={set("book_title")} aria-invalid={!!err("book_title")} />
        </Field>
        <Field id="s-genre" label="Book genre" required error={err("genre")}>
          <Input id="s-genre" className={inputCls} value={v.genre} onChange={set("genre")} aria-invalid={!!err("genre")} />
        </Field>
        <Field id="s-synopsis" label="Book description or synopsis" required error={err("synopsis")} className="md:col-span-2">
          <Textarea id="s-synopsis" className={textareaCls} value={v.synopsis} onChange={set("synopsis")} aria-invalid={!!err("synopsis")} />
        </Field>
        <Field id="s-link" label="Book purchase or reading link" error={err("book_link")}>
          <Input id="s-link" type="url" placeholder="https://" className={inputCls} value={v.book_link} onChange={set("book_link")} />
        </Field>
        <Field id="s-cover" label="Book cover" error={err("cover")} hint="JPG, PNG or WebP, up to 10 MB">
          {cover ? (
            <div className="flex h-12 items-center justify-between gap-3 rounded-sm border border-gold/60 bg-card px-4 text-sm">
              <span className="truncate">{cover.name}</span>
              <button type="button" onClick={() => setCover(null)} aria-label="Remove cover" className="text-muted-foreground hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="s-cover"
              className="flex h-12 cursor-pointer items-center gap-3 rounded-sm border border-dashed border-input bg-card px-4 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-ink"
            >
              <ImagePlus className="h-4 w-4 text-gold" /> Choose a cover image
              <input id="s-cover" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={onCover} />
            </label>
          )}
        </Field>
      </fieldset>

      <fieldset>
        <legend className="font-display text-3xl text-ink">Services of interest</legend>
        <p className="mt-2 text-sm text-muted-foreground">Choose as many as you like.</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FORM_SERVICES.map((s) => {
            const on = services.includes(s);
            return (
              <label
                key={s}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-colors",
                  on ? "border-gold bg-gold/10 text-ink" : "bg-card text-foreground/80 hover:border-gold/60",
                )}
              >
                <input type="checkbox" checked={on} onChange={() => toggle(s)} className="h-4 w-4 accent-[var(--gold)]" />
                {s}
              </label>
            );
          })}
        </div>
        {err("services") && <p role="alert" className="mt-3 text-sm text-destructive">{err("services")}</p>}
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="mb-6 font-display text-3xl text-ink">Anything else</legend>
        <Field id="s-budget" label="Estimated budget (USD)" error={err("budget")}>
          <Input id="s-budget" className={inputCls} value={v.budget} onChange={set("budget")} placeholder="e.g. $100–$300" />
        </Field>
        <Field id="s-info" label="Additional information" error={err("additional_info")} className="md:col-span-2">
          <Textarea id="s-info" className="min-h-24 rounded-sm bg-card" value={v.additional_info} onChange={set("additional_info")} />
        </Field>
      </fieldset>

      <div className="space-y-6 border-t pt-8">
        <ConsentField checked={v.privacy_consent} onChange={(c) => setV((p) => ({ ...p, privacy_consent: c }))} error={err("privacy_consent")} />
        <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full md:w-auto">
          {busy && <Loader2 className="animate-spin" />} Submit Your Book
        </Button>
      </div>
    </form>
  );
}
