import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, ImageIcon, Loader2, LogOut, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES } from "@/data/services";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Author's Word" },
      { name: "description", content: "Review book submissions, Book-to-Film enquiries, consultations and messages." },
      { property: "og:title", content: "Admin Dashboard — Author's Word" },
      { property: "og:description", content: "Author's Word administration." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

const selectCls = "h-9 rounded-sm border border-input bg-card px-2 text-sm";

function useIsAdmin() {
  const { user } = Route.useRouteContext();
  return useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (error) throw error;
      return data === true;
    },
  });
}

function AdminPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isAdmin = useIsAdmin();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <section className="bg-background">
      <div className="container-page py-12 md:py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="mt-3 text-5xl text-ink">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="inkOutline" onClick={() => qc.invalidateQueries()}>
              <RefreshCw /> Refresh
            </Button>
            <Button variant="ink" onClick={signOut}>
              <LogOut /> Sign out
            </Button>
          </div>
        </div>

        {isAdmin.isLoading ? (
          <div className="py-24 text-center text-muted-foreground">
            <Loader2 className="mx-auto animate-spin" />
          </div>
        ) : !isAdmin.data ? (
          <div className="mt-12 rounded-sm border bg-card p-10 text-center shadow-card">
            <h2 className="text-3xl text-ink">This account doesn&rsquo;t have admin access</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Admin access is given to the official Author&rsquo;s Word email once it&rsquo;s confirmed. If you just
              confirmed your email, sign out and sign in again.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="submissions" className="mt-10">
            <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-sm bg-cream p-1">
              <TabsTrigger value="submissions" className="rounded-sm">Book submissions</TabsTrigger>
              <TabsTrigger value="film" className="rounded-sm">Book-to-Film</TabsTrigger>
              <TabsTrigger value="consultations" className="rounded-sm">Consultations</TabsTrigger>
              <TabsTrigger value="messages" className="rounded-sm">Messages</TabsTrigger>
              <TabsTrigger value="prices" className="rounded-sm">Service prices</TabsTrigger>
            </TabsList>
            <TabsContent value="submissions" className="mt-8"><Submissions /></TabsContent>
            <TabsContent value="film" className="mt-8"><FilmEnquiries /></TabsContent>
            <TabsContent value="consultations" className="mt-8"><Consultations /></TabsContent>
            <TabsContent value="messages" className="mt-8"><Messages /></TabsContent>
            <TabsContent value="prices" className="mt-8"><Prices /></TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-sm border border-dashed bg-card p-10 text-center text-muted-foreground">{text}</p>;
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  const isUrl = /^https?:\/\//.test(value);
  return (
    <div className="grid gap-1 sm:grid-cols-[10rem_1fr]">
      <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</dt>
      <dd className="whitespace-pre-wrap break-words text-sm">
        {isUrl ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink underline decoration-gold underline-offset-4">
            {value} <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function StatusSelect({
  table,
  id,
  value,
  options,
  queryKey,
}: {
  table: "book_submissions" | "film_enquiries" | "consultations" | "contact_messages";
  id: string;
  value: string;
  options: string[];
  queryKey: string;
}) {
  const qc = useQueryClient();
  const [saving, setSaving] = useState(false);
  return (
    <select
      aria-label="Status"
      className={selectCls}
      value={value}
      disabled={saving}
      onChange={async (e) => {
        setSaving(true);
        const { error } = await supabase.from(table).update({ status: e.target.value }).eq("id", id);
        setSaving(false);
        if (error) toast.error("Couldn't update status.");
        else {
          toast.success("Status updated.");
          qc.invalidateQueries({ queryKey: [queryKey] });
        }
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}

function Card({ title, meta, status, children }: { title: string; meta: string; status: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="rounded-sm border bg-card p-6 shadow-card">
      <div className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-start">
        <div>
          <h3 className="text-2xl text-ink">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
        </div>
        {status}
      </div>
      <dl className="mt-4 space-y-3">{children}</dl>
    </article>
  );
}

function CoverButton({ path }: { path: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      size="sm"
      variant="inkOutline"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const { data, error } = await supabase.storage.from("book-covers").createSignedUrl(path, 300);
        setBusy(false);
        if (error || !data) toast.error("Couldn't open the cover.");
        else window.open(data.signedUrl, "_blank", "noopener");
      }}
    >
      <ImageIcon /> View cover
    </Button>
  );
}

function Submissions() {
  const q = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("book_submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  if (q.isLoading) return <Loader2 className="animate-spin" />;
  if (q.error) return <Empty text="Couldn't load submissions." />;
  if (!q.data?.length) return <Empty text="No book submissions yet." />;
  return (
    <div className="grid gap-5">
      {q.data.map((s) => (
        <Card
          key={s.id}
          title={s.book_title}
          meta={`${s.author_name} · ${s.email} · ${fmt(s.created_at)}`}
          status={<StatusSelect table="book_submissions" id={s.id} value={s.status} options={["new", "reviewing", "proposal_sent", "closed"]} queryKey="admin-submissions" />}
        >
          <Row label="Genre" value={s.genre} />
          <Row label="Services" value={s.services.join(", ")} />
          <Row label="Synopsis" value={s.synopsis} />
          <Row label="Book link" value={s.book_link} />
          <Row label="Website" value={s.author_website} />
          <Row label="Social" value={s.social_links} />
          <Row label="Budget" value={s.budget} />
          <Row label="Additional" value={s.additional_info} />
          {s.cover_path && <div className="pt-2"><CoverButton path={s.cover_path} /></div>}
        </Card>
      ))}
    </div>
  );
}

function FilmEnquiries() {
  const q = useQuery({
    queryKey: ["admin-film"],
    queryFn: async () => {
      const { data, error } = await supabase.from("film_enquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  if (q.isLoading) return <Loader2 className="animate-spin" />;
  if (q.error) return <Empty text="Couldn't load enquiries." />;
  if (!q.data?.length) return <Empty text="No Book-to-Film enquiries yet." />;
  return (
    <div className="grid gap-5">
      {q.data.map((s) => (
        <Card
          key={s.id}
          title={s.book_title}
          meta={`${s.author_name} · ${s.email} · ${fmt(s.created_at)}`}
          status={<StatusSelect table="film_enquiries" id={s.id} value={s.status} options={["new", "reviewing", "proposal_sent", "closed"]} queryKey="admin-film" />}
        >
          <Row label="Genre" value={s.genre} />
          <Row label="Synopsis" value={s.synopsis} />
          <Row label="Book link" value={s.book_link} />
          <Row label="Rights" value={s.rights_info} />
          <Row label="Materials" value={s.adaptation_materials} />
          <Row label="Details" value={s.additional_details} />
        </Card>
      ))}
    </div>
  );
}

function Consultations() {
  const q = useQuery({
    queryKey: ["admin-consultations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("consultations").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  if (q.isLoading) return <Loader2 className="animate-spin" />;
  if (q.error) return <Empty text="Couldn't load consultations." />;
  if (!q.data?.length) return <Empty text="No consultation requests yet." />;
  return (
    <div className="grid gap-5">
      {q.data.map((s) => (
        <Card
          key={s.id}
          title={`${s.project_title}`}
          meta={`${s.name} · ${s.email} · requested ${fmt(s.created_at)}`}
          status={<StatusSelect table="consultations" id={s.id} value={s.status} options={["requested", "confirmed", "declined", "completed"]} queryKey="admin-consultations" />}
        >
          <Row label="Preferred" value={`${s.preferred_date} at ${s.preferred_time} (${s.timezone})`} />
          <Row label="Interest" value={s.interest} />
          <Row label="Details" value={s.details} />
          <div className="pt-2">
            <Button asChild size="sm" variant="inkOutline">
              <a href={`mailto:${s.email}?subject=${encodeURIComponent("Your Author's Word consultation")}`}>Reply by email</a>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Messages() {
  const q = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  if (q.isLoading) return <Loader2 className="animate-spin" />;
  if (q.error) return <Empty text="Couldn't load messages." />;
  if (!q.data?.length) return <Empty text="No messages yet." />;
  return (
    <div className="grid gap-5">
      {q.data.map((s) => (
        <Card
          key={s.id}
          title={s.subject}
          meta={`${s.name} · ${s.email} · ${fmt(s.created_at)}`}
          status={<StatusSelect table="contact_messages" id={s.id} value={s.status} options={["new", "read", "replied"]} queryKey="admin-messages" />}
        >
          <Row label="Message" value={s.message} />
        </Card>
      ))}
    </div>
  );
}

function Prices() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin-overrides"],
    queryFn: async () => {
      const { data, error } = await supabase.from("service_overrides").select("*");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.slug, r]));
    },
  });
  if (q.isLoading) return <Loader2 className="animate-spin" />;
  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Change how a service&rsquo;s price or short description appears across the website. Leave a field empty to use
        the original text. Detailed tier prices on each service page stay as published.
      </p>
      <div className="grid gap-4">
        {SERVICES.map((s) => (
          <PriceRow
            key={s.slug}
            slug={s.slug}
            name={s.name}
            defaultPrice={s.price}
            defaultSummary={s.summary}
            current={q.data?.[s.slug]}
            onSaved={() => {
              qc.invalidateQueries({ queryKey: ["admin-overrides"] });
              qc.invalidateQueries({ queryKey: ["service-overrides"] });
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PriceRow({
  slug,
  name,
  defaultPrice,
  defaultSummary,
  current,
  onSaved,
}: {
  slug: string;
  name: string;
  defaultPrice: string;
  defaultSummary: string;
  current?: { price_label: string | null; summary: string | null } | undefined;
  onSaved: () => void;
}) {
  const [price, setPrice] = useState(current?.price_label ?? "");
  const [summary, setSummary] = useState(current?.summary ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const p = price.trim() || null;
    const sm = summary.trim() || null;
    const { error } =
      p === null && sm === null
        ? await supabase.from("service_overrides").delete().eq("slug", slug)
        : await supabase
            .from("service_overrides")
            .upsert({ slug, price_label: p, summary: sm, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) toast.error("Couldn't save.");
    else {
      toast.success(`${name} updated.`);
      onSaved();
    }
  }

  return (
    <div className="grid gap-3 rounded-sm border bg-card p-5 lg:grid-cols-[1fr_14rem_1.5fr_auto] lg:items-start">
      <div>
        <p className="font-display text-xl text-ink">{name}</p>
        <p className="text-xs text-muted-foreground">Original: {defaultPrice}</p>
      </div>
      <Input aria-label={`${name} price label`} placeholder={defaultPrice} value={price} maxLength={120} onChange={(e) => setPrice(e.target.value)} />
      <Textarea aria-label={`${name} summary`} placeholder={defaultSummary} value={summary} maxLength={600} className="min-h-10" onChange={(e) => setSummary(e.target.value)} />
      <Button variant="gold" onClick={save} disabled={saving}>
        {saving && <Loader2 className="animate-spin" />} Save
      </Button>
    </div>
  );
}
