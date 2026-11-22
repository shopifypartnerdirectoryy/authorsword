import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ClosingCta, PageHero } from "@/components/site/blocks";
import deskImg from "@/assets/writers-desk.jpg";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Author's Word" },
      {
        name: "description",
        content:
          "Share your book, tell us your goals, receive a clear proposal, approve and begin, then review your deliverables. Five simple steps.",
      },
      { property: "og:title", content: "How It Works — Author's Word" },
      { property: "og:description", content: "Five clear steps from submitting your book to reviewing your deliverables." },
    ],
  }),
  component: HowItWorksPage,
});

const STEPS = [
  { title: "Share Your Book", text: "Submit your book title, genre, description, cover and relevant links through our simple form." },
  { title: "Understand Your Goals", text: "We review your needs and identify the services that genuinely suit your book and your goals." },
  { title: "Receive Your Proposal", text: "You receive a clear breakdown of deliverables, pricing and timelines — no surprises." },
  { title: "Approve and Begin", text: "Work begins once you approve the proposal and the agreed payment arrangements." },
  { title: "Review Your Deliverables", text: "You receive the completed work for review, or approval where applicable, before anything is published." },
];

function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="A clear, calm process from first message to finished work."
        intro={<p>No pressure, no hidden steps. You stay informed and in control throughout.</p>}
        image={deskImg}
      />
      <section className="bg-background">
        <div className="container-page py-24">
          <ol className="relative mx-auto max-w-4xl">
            <span className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative grid gap-6 pb-16 last:pb-0 md:grid-cols-2 md:gap-16">
                <div className={"pl-20 md:pl-0 " + (i % 2 === 0 ? "md:text-right" : "md:col-start-2")}>
                  <p className="eyebrow">Step {i + 1}</p>
                  <h2 className="mt-3 text-3xl text-ink md:text-4xl">{s.title}</h2>
                  <p className="mt-3 text-lg text-muted-foreground">{s.text}</p>
                </div>
                <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-ink font-display text-2xl text-gold-bright md:left-1/2 md:-translate-x-1/2">
                  {i + 1}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-20 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to="/submit">Start with Step 1</Link>
            </Button>
            <Button asChild variant="inkOutline" size="lg">
              <Link to="/consultation">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
