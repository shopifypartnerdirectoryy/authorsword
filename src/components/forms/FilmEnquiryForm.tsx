import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConsentField, Field, SuccessPanel, flattenErrors, inputCls, textareaCls } from "@/components/site/form-bits";
import { filmEnquirySchema } from "@/lib/form-schemas";
import { submitFilmEnquiry } from "@/lib/forms.functions";

const EMPTY = {
  author_name: "",
  email: "",
  book_title: "",
  genre: "",
  synopsis: "",
  book_link: "",
  rights_info: "",
  adaptation_materials: "",
  additional_details: "",
  privacy_consent: false,
};

export function FilmEnquiryForm() {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const send = useServerFn(submitFilmEnquiry);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = filmEnquirySchema.safeParse(v);
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
        title="Thank you — your enquiry is with us."
        action={
          <Button asChild variant="ink">
            <Link to="/">Return home</Link>
          </Button>
        }
      >
        <p>
          We&rsquo;ll review your story and the details you&rsquo;ve shared, then reply to you by email. Your book and
          its rights remain entirely yours.
        </p>
      </SuccessPanel>
    );
  }

  const err = (k: string) => errors[k];
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      <Field id="f-name" label="Author name" required error={err("author_name")}>
        <Input id="f-name" className={inputCls} value={v.author_name} onChange={set("author_name")} autoComplete="name" aria-invalid={!!err("author_name")} />
      </Field>
      <Field id="f-email" label="Email" required error={err("email")}>
        <Input id="f-email" type="email" className={inputCls} value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err("email")} />
      </Field>
      <Field id="f-title" label="Book title" required error={err("book_title")}>
        <Input id="f-title" className={inputCls} value={v.book_title} onChange={set("book_title")} aria-invalid={!!err("book_title")} />
      </Field>
      <Field id="f-genre" label="Genre" required error={err("genre")}>
        <Input id="f-genre" className={inputCls} value={v.genre} onChange={set("genre")} aria-invalid={!!err("genre")} />
      </Field>
      <Field id="f-synopsis" label="Book description or synopsis" required error={err("synopsis")} className="md:col-span-2">
        <Textarea id="f-synopsis" className={textareaCls} value={v.synopsis} onChange={set("synopsis")} aria-invalid={!!err("synopsis")} />
      </Field>
      <Field id="f-link" label="Published book link" error={err("book_link")} hint="e.g. your Amazon or publisher page">
        <Input id="f-link" type="url" placeholder="https://" className={inputCls} value={v.book_link} onChange={set("book_link")} />
      </Field>
      <Field id="f-rights" label="Rights ownership or availability" required error={err("rights_info")} hint="Who holds the film/TV rights, and are they available?">
        <Input id="f-rights" className={inputCls} value={v.rights_info} onChange={set("rights_info")} aria-invalid={!!err("rights_info")} />
      </Field>
      <Field id="f-materials" label="Current adaptation materials, if any" error={err("adaptation_materials")} className="md:col-span-2">
        <Textarea id="f-materials" className="min-h-24 rounded-sm bg-card" value={v.adaptation_materials} onChange={set("adaptation_materials")} placeholder="Screenplay, treatment, pitch deck, series bible…" />
      </Field>
      <Field id="f-details" label="Additional project details" error={err("additional_details")} className="md:col-span-2">
        <Textarea id="f-details" className="min-h-24 rounded-sm bg-card" value={v.additional_details} onChange={set("additional_details")} />
      </Field>
      <div className="md:col-span-2">
        <ConsentField checked={v.privacy_consent} onChange={(c) => setV((p) => ({ ...p, privacy_consent: c }))} error={err("privacy_consent")} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full md:w-auto">
          {busy && <Loader2 className="animate-spin" />} Explore Book-to-Film Opportunities
        </Button>
      </div>
    </form>
  );
}
