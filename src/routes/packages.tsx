import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckList, ClosingCta, Disclaimer, PageHero, SectionHeading } from "@/components/site/blocks";
import mockupImg from "@/assets/book-mockups.jpg";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Author Promotion Packages — Author's Word" },
      {
        name: "description",
        content:
          "The Debut Visibility Suite, The Bestseller Momentum Campaign and The Complete Author Brand & Launch — tailored proposals for coordinated book promotion.",
      },
      { property: "og:title", content: "Author Promotion Packages — Author's Word" },
      {
        property: "og:description",
        content: "Three coordinated promotion packages, each prepared as a personalised proposal.",
      },
    ],
  }),
  component: PackagesPage,
});

const PACKAGES = [
  {
    name: "The Debut Visibility Suite",
    intro: "A tailored promotional package for authors introducing a book to new audiences.",
    items: [
      "Editorial 3D Book Mock-up Suite",
      "15-second cinematic book trailer",
      "TikTok Book Feature",
      "Instagram Book Feature",
      "Two Goodreads Listopia placements",
    ],
  },
  {
    name: "The Bestseller Momentum Campaign",
    intro: "A broader promotional package for authors seeking a coordinated visibility campaign.",
    items: [
      "30-second cinematic trailer",
      "30-day social media management",
      "30 social media content pieces",
      "1,000-contact email campaign",
      "Five Goodreads Listopia placements",
      "Standard Interactive Reader Book Challenge",
    ],
    highlight: true,
  },
  {
    name: "The Complete Author Brand & Launch",
    intro: "A comprehensive author-brand and launch package.",
    items: [
      "Bespoke author website",
      "60-second cinematic trailer",
      "30-day social media management",
      "2,500-contact email campaign",
      "Premium Interactive Reader Book Challenge",
    ],
  },
];

function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Coordinated campaigns, prepared around your book."
        intro={
          <p>
            Each package brings several services together into one considered plan. Because every book is different,
            each is prepared as a personalised proposal.
          </p>
        }
        image={mockupImg}
      />

      <section className="bg-background">
        <div className="container-page py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <article
                key={p.name}
                className={
                  "flex flex-col rounded-sm border p-9 shadow-card " +
                  (p.highlight ? "border-gold bg-ink text-ivory lg:-translate-y-4" : "bg-card")
                }
              >
                <p className="font-display text-lg italic text-gold">Package {["I", "II", "III"][i]}</p>
                <h2 className={"mt-3 text-3xl md:text-4xl " + (p.highlight ? "text-ivory" : "text-ink")}>{p.name}</h2>
                <p className={"mt-4 " + (p.highlight ? "text-ivory/70" : "text-muted-foreground")}>{p.intro}</p>
                <div className={"my-8 h-px " + (p.highlight ? "bg-line-dark" : "bg-border")} />
                <p className="text-xs uppercase tracking-[0.25em] text-gold">Includes</p>
                <div className="mt-4 flex-1">
                  <CheckList items={p.items} tone={p.highlight ? "dark" : "light"} />
                </div>
                <div className="mt-10">
                  <p className={"text-xs uppercase tracking-[0.25em] " + (p.highlight ? "text-ivory/50" : "text-muted-foreground")}>
                    Price
                  </p>
                  <p className={"mt-1 font-display text-3xl " + (p.highlight ? "text-gold-bright" : "text-ink")}>Custom Proposal</p>
                  <Button asChild variant={p.highlight ? "gold" : "ink"} size="lg" className="mt-6 w-full">
                    <Link to="/consultation" search={{ interest: "Packages / custom combination" }}>
                      Request a Personalised Proposal
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <Disclaimer className="mx-auto mt-14 max-w-3xl">
            Package names are branding and service names, not promises of bestseller results. Final deliverables,
            timelines and pricing are set out in your proposal.
          </Disclaimer>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-page grid items-center gap-10 py-24 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Build your own"
            title="Prefer a custom combination?"
            intro="Mix any services you need — including Book-to-Film & Screen Adaptation — and we’ll prepare a package around your goals."
          />
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild variant="gold" size="lg">
              <Link to="/submit">
                Submit Your Book <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="inkOutline" size="lg">
              <Link to="/consultation" search={{ interest: "Packages / custom combination" }}>
                Get a Custom Proposal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
