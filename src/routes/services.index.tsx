import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClosingCta, Disclaimer, PageHero } from "@/components/site/blocks";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CATEGORIES, servicesInCategory } from "@/data/services";
import { applyOverride, serviceOverridesQuery, useServiceOverrides } from "@/lib/service-overrides";
import mockupImg from "@/assets/book-mockups.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Our Services & Pricing — Author's Word" },
      {
        name: "description",
        content:
          "Book promotion, social media features, cover design, cinematic trailers, audiobooks, author websites, Amazon, SEO, AI search and Book-to-Film. Prices in USD.",
      },
      { property: "og:title", content: "Our Services & Pricing — Author's Word" },
      {
        property: "og:description",
        content: "Every Author's Word service with clear USD pricing where available, and custom quotes where not.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(serviceOverridesQuery),
  component: ServicesPage,
});

function ServicesPage() {
  const overrides = useServiceOverrides();

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Creative support for every stage of your book’s journey."
        intro={
          <p>
            Choose a single service, combine several, or ask for a tailored package. All prices are in USD; where a
            service depends on your project, we prepare a custom quote rather than guess.
          </p>
        }
        image={mockupImg}
      >
        <Button asChild variant="gold" size="lg">
          <Link to="/submit">Submit Your Book</Link>
        </Button>
        <Button asChild variant="ivoryOutline" size="lg">
          <Link to="/consultation">Book a Consultation</Link>
        </Button>
      </PageHero>

      {/* Category index */}
      <nav aria-label="Service categories" className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container-page flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-ink/70 transition-colors hover:border-gold hover:text-ink"
            >
              {c.letter}. {c.name.split(" & ")[0]?.split(" for ")[0]}
            </a>
          ))}
        </div>
      </nav>

      <div className="bg-background">
        {CATEGORIES.map((cat, ci) => {
          const items = servicesInCategory(cat.id).map((s) => applyOverride(s, overrides[s.slug]));
          return (
            <section
              key={cat.id}
              id={cat.id}
              className={ci % 2 === 1 ? "scroll-mt-36 bg-cream" : "scroll-mt-36 bg-background"}
            >
              <div className="container-page grid gap-10 py-20 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="font-display text-6xl italic text-gold/70">{cat.letter}</p>
                  <h2 className="mt-2 text-3xl text-ink md:text-4xl">{cat.name}</h2>
                  <span className="gold-rule mt-5" />
                  <p className="mt-5 text-muted-foreground">{cat.intro}</p>
                  {cat.id === "film" && (
                    <Button asChild variant="ink" className="mt-6">
                      <Link to="/book-to-film">
                        Explore Book-to-Film <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                  {items.map((s) => (
                    <ServiceCard
                      key={s.slug}
                      slug={s.slug}
                      title={s.name}
                      summary={s.summary}
                      price={s.price}
                      featured={s.slug === "book-to-film"}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Custom requests */}
        <section className="surface-charcoal">
          <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-display text-6xl italic text-gold/70">M</p>
              <h2 className="mt-2 text-3xl text-ivory md:text-4xl">Custom Service Requests</h2>
              <p className="mt-5 max-w-2xl text-ivory/70">
                Have something in mind that doesn&rsquo;t fit neatly into a category? Tell us about it. We&rsquo;ll let
                you know honestly whether it&rsquo;s something we can help with, and prepare a proposal if it is.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Button asChild variant="gold" size="lg">
                <Link to="/submit" search={{ service: "Other / Not Sure Yet" }}>
                  Discuss Your Project
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container-page py-14">
          <Disclaimer>
            All prices are in USD. Final deliverables, timelines, revisions and any additional costs are stated in your
            proposal. Results depend on many factors — including the book, audience, market, platform and campaign
            execution — so we never guarantee sales, rankings, reviews, followers, views, reader numbers, AI citations
            or film and television deals.
          </Disclaimer>
        </div>
      </div>

      <ClosingCta />
    </>
  );
}
