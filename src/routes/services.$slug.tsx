import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckList, ClosingCta, Disclaimer } from "@/components/site/blocks";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CATEGORIES, getService, servicesInCategory } from "@/data/services";
import { applyOverride, serviceOverridesQuery, useServiceOverrides } from "@/lib/service-overrides";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params, context }) => {
    if (params.slug === "book-to-film") throw redirect({ to: "/book-to-film", statusCode: 301 });
    if (!getService(params.slug)) throw notFound();
    await context.queryClient.ensureQueryData(serviceOverridesQuery);
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const s = getService(params.slug);
    if (!s) {
      return { meta: [{ title: "Service not found — Author's Word" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${s.name} — Author's Word`;
    return {
      meta: [
        { title },
        { name: "description", content: s.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: s.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <h1 className="text-5xl text-ink">We couldn&rsquo;t find that service</h1>
      <Button asChild variant="gold" className="mt-8">
        <Link to="/services">See all services</Link>
      </Button>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const overrides = useServiceOverrides();
  const base = getService(slug);
  if (!base) return null;
  const s = applyOverride(base, overrides[slug]);
  const category = CATEGORIES.find((c) => c.id === s.category);
  const related = servicesInCategory(s.category)
    .filter((r) => r.slug !== s.slug)
    .map((r) => applyOverride(r, overrides[r.slug]));
  const isQuote = s.priceKind === "quote";

  return (
    <>
      <section className="surface-ink relative overflow-hidden">
        <div className="glow-gold absolute inset-0" aria-hidden="true" />
        <div className="container-page relative py-16 md:py-24">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-gold-bright">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 animate-rise">
              <p className="eyebrow">
                {category?.letter}. {category?.name}
              </p>
              <h1 className="mt-5 text-5xl text-ivory md:text-6xl">{s.name}</h1>
              <p className="mt-6 max-w-2xl text-lg text-ivory/75">{s.summary}</p>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-sm border border-gold/40 bg-ink/60 p-7">
                <p className="text-xs uppercase tracking-[0.25em] text-ivory/50">{isQuote ? "Pricing" : "Price (USD)"}</p>
                <p className="mt-2 font-display text-4xl text-gold-bright">{isQuote ? "Custom Quote" : s.price}</p>
                <div className="mt-6 flex flex-col gap-2">
                  <Button asChild variant="gold" size="lg">
                    <Link to="/submit" search={{ service: s.formService }}>
                      {isQuote ? "Request a Custom Quote" : "Submit Your Book"}
                    </Link>
                  </Button>
                  <Button asChild variant="ivoryOutline" size="lg">
                    <Link to="/consultation">Book a Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-14 py-20 md:py-24 lg:grid-cols-12">
          <div className="space-y-5 text-lg text-foreground/85 lg:col-span-7">
            {s.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.notes?.map((n) => (
              <Disclaimer key={n} className="mt-8">
                {n}
              </Disclaimer>
            ))}
          </div>
          {s.includes && (
            <aside className="lg:col-span-5">
              <div className="rounded-sm border bg-card p-8 shadow-card">
                <h2 className="text-2xl text-ink">{s.includesHeading ?? "What’s included"}</h2>
                <span className="gold-rule mt-4 mb-6" />
                <CheckList items={s.includes} />
              </div>
            </aside>
          )}
        </div>

        {s.tiers && (
          <div className="container-page pb-24">
            <h2 className="text-3xl text-ink md:text-4xl">{s.tiersHeading ?? "Options & pricing"}</h2>
            <span className="gold-rule mt-4" />
            <div className={"mt-10 grid gap-5 sm:grid-cols-2 " + (s.tiers.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-3")}>
              {s.tiers.map((t, i) => (
                <div
                  key={t.name}
                  className={
                    "flex flex-col rounded-sm border p-7 shadow-card " +
                    (s.tiers && s.tiers.length === 3 && i === 1 ? "border-gold bg-ink text-ivory" : "bg-card")
                  }
                >
                  <p className={"text-sm uppercase tracking-[0.2em] " + (s.tiers && s.tiers.length === 3 && i === 1 ? "text-gold" : "text-muted-foreground")}>
                    {t.name}
                  </p>
                  <p className="mt-3 font-display text-4xl">{t.price === "Custom Quote" ? "Custom Quote" : t.price}</p>
                  {t.details && (
                    <ul className="mt-5 space-y-2 text-sm opacity-80">
                      {t.details.map((d) => (
                        <li key={d}>— {d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="bg-cream">
          <div className="container-page py-20">
            <h2 className="text-3xl text-ink">More in {category?.name}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ServiceCard key={r.slug} slug={r.slug} title={r.name} summary={r.summary} price={r.price} />
              ))}
            </div>
            <Link to="/services" className="mt-10 inline-flex items-center gap-2 text-ink hover:text-gold">
              Browse every service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      <ClosingCta />
    </>
  );
}

