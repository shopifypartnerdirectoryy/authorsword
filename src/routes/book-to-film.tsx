import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClosingCta, Disclaimer, SectionHeading } from "@/components/site/blocks";
import { FilmEnquiryForm } from "@/components/forms/FilmEnquiryForm";
import filmImg from "@/assets/book-to-film.jpg";

export const Route = createFileRoute("/book-to-film")({
  head: () => ({
    meta: [
      { title: "Book-to-Film & Screen Adaptation — Author's Word" },
      {
        name: "description",
        content:
          "Professionally assess, position and prepare your book for potential film and television adaptation: assessment, synopsis, pitch deck and presentation materials.",
      },
      { property: "og:title", content: "Book-to-Film & Screen Adaptation — Author's Word" },
      {
        property: "og:description",
        content: "Your story could have a life beyond the page. Explore Book-to-Film services from Author's Word.",
      },
    ],
  }),
  component: BookToFilmPage,
});

const OFFER = [
  { title: "Book-to-Screen Assessment", text: "We review your book’s premise, storyline, characters and adaptation potential." },
  { title: "Story Positioning", text: "We present your story’s distinctive appeal and its potential screen identity." },
  { title: "Adaptation Synopsis Preparation", text: "A professional synopsis suitable for film and television consideration." },
  { title: "Pitch Deck Development", text: "Presentation materials introducing your story, characters, themes and adaptation concept." },
  { title: "Screen Adaptation Presentation Materials", text: "Supporting materials prepared for pitching and industry consideration." },
  { title: "Industry Introductions", text: "Where available and authorised, we facilitate appropriate introductions to relevant industry contacts." },
];

function BookToFilmPage() {
  return (
    <>
      <section className="surface-ink relative overflow-hidden">
        <img src={filmImg} alt="An open book lit by a vintage film projector beam" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <div className="container-page relative flex min-h-[78svh] items-center py-24">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow">Our Services · L. Book-to-Film &amp; Screen Adaptation</p>
            <h1 className="mt-6 text-5xl text-ivory md:text-7xl">
              Your Story Could Have a Life <em className="text-gold-gradient font-normal">Beyond the Page.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-ivory/75">
              Some stories have the potential to reach audiences beyond the pages of a book. Author&rsquo;s Word helps
              authors professionally assess, position and prepare their literary works for potential film and
              television adaptation opportunities.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="gold" size="lg">
                <a href="#enquire">
                  Explore Book-to-Film Opportunities <ArrowDown />
                </a>
              </Button>
              <span className="rounded-full border border-gold/50 px-4 py-2 text-sm text-ivory/80">Pricing: Custom Quote</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-24">
          <SectionHeading eyebrow="Services included" title="From the page to the pitch." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border bg-border md:grid-cols-2 lg:grid-cols-3">
            {OFFER.map((o, i) => (
              <div key={o.title} className="bg-card p-8">
                <p className="font-display text-4xl italic text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl text-ink">{o.title}</h3>
                <p className="mt-3 text-muted-foreground">{o.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Disclaimer>
              We do not promise representation, producer interest, financing, production, distribution or a film or
              television deal. Our role is to help you present your story professionally.
            </Disclaimer>
            <Disclaimer>
              Your literary rights remain yours. We respect your ownership of your work unless a separate agreement
              expressly states otherwise.
            </Disclaimer>
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 bg-cream">
        <div className="container-page grid gap-14 py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Book-to-Film enquiry"
              title="Tell us about your story."
              intro="Share a few details and we’ll reply by email with next steps and a custom quote."
            />
            <p className="mt-8 text-sm text-muted-foreground">
              Prefer to talk first?{" "}
              <Link to="/consultation" search={{ interest: "Book-to-Film & Screen Adaptation" }} className="text-ink underline decoration-gold underline-offset-4">
                Book a consultation
              </Link>
              .
            </p>
          </div>
          <div className="rounded-sm border bg-background p-6 shadow-card md:p-10 lg:col-span-8">
            <FilmEnquiryForm />
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
