import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConsentField, Field, SuccessPanel, flattenErrors, inputCls, textareaCls } from "@/components/site/form-bits";
import { contactSchema } from "@/lib/form-schemas";
import { sendContactMessage } from "@/lib/forms.functions";

const EMPTY = { name: "", email: "", subject: "", message: "", privacy_consent: false };

export function ContactForm() {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const send = useServerFn(sendContactMessage);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(v);
    if (!parsed.success) {
      setErrors(flattenErrors(parsed.error.issues));
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
      <SuccessPanel title="Message sent.">
        <p>Thank you for writing to us. We&rsquo;ll reply to {v.email} as soon as we can.</p>
      </SuccessPanel>
    );
  }

  const err = (k: string) => errors[k];
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      <Field id="m-name" label="Name" required error={err("name")}>
        <Input id="m-name" className={inputCls} value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err("name")} />
      </Field>
      <Field id="m-email" label="Email" required error={err("email")}>
        <Input id="m-email" type="email" className={inputCls} value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err("email")} />
      </Field>
      <Field id="m-subject" label="Subject" required error={err("subject")} className="md:col-span-2">
        <Input id="m-subject" className={inputCls} value={v.subject} onChange={set("subject")} aria-invalid={!!err("subject")} />
      </Field>
      <Field id="m-message" label="Message" required error={err("message")} className="md:col-span-2">
        <Textarea id="m-message" className={textareaCls} value={v.message} onChange={set("message")} aria-invalid={!!err("message")} />
      </Field>
      <div className="md:col-span-2">
        <ConsentField checked={v.privacy_consent} onChange={(c) => setV((p) => ({ ...p, privacy_consent: c }))} error={err("privacy_consent")} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full md:w-auto">
          {busy && <Loader2 className="animate-spin" />} Send Message
        </Button>
      </div>
    </form>
  );
}
